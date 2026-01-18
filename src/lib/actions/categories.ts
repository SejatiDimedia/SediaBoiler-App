'use server';

import { db } from '@/db';
import { categories, NewCategory, Category } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Get all categories ordered by sortOrder
export async function getAllCategoriesFromDb(): Promise<Category[]> {
    try {
        if (!db) {
            console.log('Database not available for categories');
            return [];
        }
        return await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.name));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    if (!db) return undefined;
    try {
        const result = await db.select().from(categories).where(eq(categories.slug, slug));
        return result[0];
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return undefined;
    }
}

// Get category by ID
export async function getCategoryById(id: number): Promise<Category | undefined> {
    if (!db) return undefined;
    try {
        const result = await db.select().from(categories).where(eq(categories.id, id));
        return result[0];
    } catch (error) {
        console.error('Error fetching category by id:', error);
        return undefined;
    }
}

// Create category
export async function createCategory(data: NewCategory): Promise<Category> {
    if (!db) throw new Error('Database not available');

    // Validate slug uniqueness
    const existing = await getCategoryBySlug(data.slug);
    if (existing) {
        throw new Error(`Category with slug "${data.slug}" already exists`);
    }

    const result = await db.insert(categories).values(data).returning();
    revalidatePath('/admin/categories');
    revalidatePath('/admin/components');
    return result[0];
}

// Update category
export async function updateCategory(id: number, data: Partial<NewCategory>): Promise<Category> {
    if (!db) throw new Error('Database not available');

    // If slug is being updated, check uniqueness
    if (data.slug) {
        const existing = await getCategoryBySlug(data.slug);
        if (existing && existing.id !== id) {
            throw new Error(`Category with slug "${data.slug}" already exists`);
        }
    }

    const result = await db
        .update(categories)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(categories.id, id))
        .returning();

    revalidatePath('/admin/categories');
    revalidatePath('/admin/components');
    return result[0];
}

// Delete category - with safety check
export async function deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    if (!db) throw new Error('Database not available');

    // Import components to check if category is in use
    const { components } = await import('@/db/schema');
    const category = await getCategoryById(id);

    if (!category) {
        return { success: false, message: 'Category not found' };
    }

    // Check if any components use this category
    // Using 'as any' because category.slug is dynamic from DB, but components.category expects enum type
    const componentsUsingCategory = await db
        .select()
        .from(components)
        .where(eq(components.category, category.slug as any));

    if (componentsUsingCategory.length > 0) {
        return {
            success: false,
            message: `Cannot delete: ${componentsUsingCategory.length} component(s) are using this category.`
        };
    }

    await db.delete(categories).where(eq(categories.id, id));
    revalidatePath('/admin/categories');
    return { success: true, message: 'Category deleted successfully' };
}

// Seed initial categories if empty
export async function seedCategories(): Promise<{ created: number; skipped: number }> {
    if (!db) throw new Error('Database not available');

    const existing = await getAllCategoriesFromDb();
    if (existing.length > 0) {
        return { created: 0, skipped: existing.length };
    }

    const defaultCategories: NewCategory[] = [
        { slug: 'navbar', name: 'Navbar', description: 'Navigation bar components', icon: 'Navigation', sortOrder: 1 },
        { slug: 'hero', name: 'Hero', description: 'Hero section components', icon: 'Sparkles', sortOrder: 2 },
        { slug: 'features', name: 'Features', description: 'Feature showcase components', icon: 'Grid3X3', sortOrder: 3 },
        { slug: 'pricing', name: 'Pricing', description: 'Pricing table components', icon: 'CreditCard', sortOrder: 4 },
        { slug: 'testimonial', name: 'Testimonial', description: 'Customer testimonial components', icon: 'Quote', sortOrder: 5 },
        { slug: 'faq', name: 'FAQ', description: 'Frequently asked questions components', icon: 'HelpCircle', sortOrder: 6 },
        { slug: 'cta', name: 'CTA', description: 'Call to action components', icon: 'MousePointerClick', sortOrder: 7 },
        { slug: 'footer', name: 'Footer', description: 'Footer components', icon: 'PanelBottom', sortOrder: 8 },
        { slug: 'card', name: 'Card', description: 'Card components', icon: 'Square', sortOrder: 9 },
        { slug: 'form', name: 'Form', description: 'Form components', icon: 'FormInput', sortOrder: 10 },
        { slug: 'modal', name: 'Modal', description: 'Modal/dialog components', icon: 'Layers', sortOrder: 11 },
        { slug: 'sidebar', name: 'Sidebar', description: 'Sidebar components', icon: 'PanelLeft', sortOrder: 12 },
        { slug: 'other', name: 'Other', description: 'Miscellaneous components', icon: 'MoreHorizontal', sortOrder: 99 },
    ];

    let created = 0;
    for (const cat of defaultCategories) {
        await db.insert(categories).values(cat);
        created++;
    }

    revalidatePath('/admin/categories');
    return { created, skipped: 0 };
}
