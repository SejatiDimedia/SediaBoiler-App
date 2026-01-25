'use server';

import { db } from '@/db';
import { components, NewComponent, Component } from '@/db/schema';
import { eq, ne, desc, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Get all components
export async function getAllComponents(): Promise<Component[]> {
    try {
        if (!db) {
            console.log('Database not available, returning empty array');
            return [];
        }
        return await db.select().from(components).orderBy(components.createdAt);
    } catch (error) {
        console.error('Error fetching components:', error);
        return [];
    }
}

// Get UI components only (excluding landing-page templates)
export async function getUIComponents(): Promise<Component[]> {
    try {
        if (!db) {
            console.log('Database not available, returning empty array');
            return [];
        }
        return await db.select().from(components)
            .where(ne(components.category, 'landing-page'))
            .orderBy(desc(components.createdAt));
    } catch (error) {
        console.error('Error fetching UI components:', error);
        return [];
    }
}

// Get templates only (landing-page category)
export async function getTemplates(): Promise<Component[]> {
    try {
        if (!db) {
            console.log('Database not available, returning empty array');
            return [];
        }
        return await db.select().from(components)
            .where(eq(components.category, 'landing-page'))
            .orderBy(desc(components.createdAt));
    } catch (error) {
        console.error('Error fetching templates:', error);
        return [];
    }
}

// Get only published components
export async function getPublishedComponents(): Promise<Component[]> {
    try {
        if (!db) return [];
        return await db.select().from(components).where(eq(components.isPublished, 'true')).orderBy(components.createdAt);
    } catch (error) {
        console.error('Error fetching published components:', error);
        return [];
    }
}

// Get component search index (lightweight, no code)
export async function getComponentSearchIndex(): Promise<Pick<Component, 'slug' | 'name' | 'description' | 'category'>[]> {
    try {
        if (!db) return [];
        return await db.select({
            slug: components.slug,
            name: components.name,
            description: components.description,
            category: components.category,
        })
            .from(components)
            .where(eq(components.isPublished, 'true'))
            .orderBy(components.createdAt);
    } catch (error) {
        console.error('Error fetching component index:', error);
        return [];
    }
}

// Get component by ID
export async function getComponentById(id: number): Promise<Component | undefined> {
    if (!db) return undefined;
    try {
        const result = await db.select().from(components).where(eq(components.id, id));
        return result[0];
    } catch (error) {
        console.error('Error fetching component by id:', error);
        return undefined;
    }
}

// Get component by slug
export async function getComponentBySlug(slug: string): Promise<Component | undefined> {
    if (!db) return undefined;
    try {
        const result = await db.select().from(components).where(eq(components.slug, slug));
        return result[0];
    } catch (error) {
        console.error('Error fetching component by slug:', error);
        return undefined;
    }
}

// Create component
export async function createComponent(data: NewComponent): Promise<Component> {
    if (!db) throw new Error('Database not available');
    const result = await db.insert(components).values(data).returning();
    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
    return result[0];
}

// Update component
export async function updateComponent(id: number, data: Partial<NewComponent>): Promise<Component> {
    if (!db) throw new Error('Database not available');
    const result = await db
        .update(components)
        .set({ ...data })
        .where(eq(components.id, id))
        .returning();
    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
    return result[0];
}

// Delete component
export async function deleteComponent(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(components).where(eq(components.id, id));
    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
}

// Bulk update publish status
export async function bulkUpdatePublishStatus(ids: number[], isPublished: 'true' | 'false'): Promise<void> {
    if (!db) throw new Error('Database not available');
    if (ids.length === 0) return;

    await db.update(components)
        .set({ isPublished })
        .where(inArray(components.id, ids));

    revalidatePath('/[locale]/library', 'layout');
}

// Bulk delete components
export async function bulkDeleteComponents(ids: number[]): Promise<void> {
    if (!db) throw new Error('Database not available');
    if (ids.length === 0) return;

    await db.delete(components).where(inArray(components.id, ids));

    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
}

// Seed initial components from static data
export async function seedComponents(): Promise<{ created: number; skipped: number }> {
    if (!db) throw new Error('Database not available');

    const { components: staticComponents } = await import('@/lib/components-data');

    let created = 0;
    let skipped = 0;

    for (const comp of staticComponents) {
        const existing = await getComponentBySlug(comp.slug);
        if (existing) {
            skipped++;
            continue;
        }

        await createComponent({
            slug: comp.slug,
            name: comp.name,
            description: comp.description,
            category: comp.category,
            code: comp.code,
            isPublished: 'true',
        });
        created++;

        // Add delay to prevent max client connection errors on Supabase free tier (Transaction Mode)
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return { created, skipped };
}
