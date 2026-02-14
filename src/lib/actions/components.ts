'use server';

import { db } from '@/db';
import { components, NewComponent, Component } from '@/db/schema';
import { eq, ne, desc, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { broadcastUpdate } from './newsletter';

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
export async function createComponent(data: NewComponent, shouldBroadcast: boolean = false): Promise<Component> {
    if (!db) throw new Error('Database not available');
    const result = await db.insert(components).values(data).returning();

    if (shouldBroadcast) {
        const isTemplate = data.category === 'landing-page';
        const typeLabel = isTemplate ? 'Template' : 'Component';
        const itemUrl = isTemplate
            ? `${process.env.NEXT_PUBLIC_APP_URL}/id/library/template/${data.slug}`
            : `${process.env.NEXT_PUBLIC_APP_URL}/id/library/component/${data.category}/${data.slug}`;

        await broadcastUpdate(
            `New ${typeLabel}: ${data.name.en} 🚀`,
            `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); padding: 32px 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">New ${typeLabel} Arrived! 🚀</h1>
                </div>
                <div style="padding: 32px 24px;">
                    <h2 style="color: #111827; margin-top: 0; font-size: 20px;">We just released <strong>${data.name.en}</strong></h2>
                    <p style="color: #4b5563; line-height: 1.6; font-size: 16px; margin-bottom: 24px;">${data.description.en}</p>
                    
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; font-family: monospace; color: #374151; font-size: 14px; margin-bottom: 24px;">
                        Category: ${data.category}
                    </div>

                    <div style="text-align: center;">
                        <a href="${itemUrl}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View ${typeLabel}</a>
                    </div>
                </div>
                <div style="background-color: #f9fafb; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0;">Sent automatically from SapaUI System</p>
                </div>
            </div>`
        );
    }

    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
    revalidatePath('/[locale]/templates', 'page');
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
    revalidatePath('/[locale]/templates', 'page');
    return result[0];
}

// Delete component
export async function deleteComponent(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(components).where(eq(components.id, id));
    revalidatePath('/admin/components');
    revalidatePath('/admin/templates');
    revalidatePath('/[locale]/library', 'layout');
    revalidatePath('/[locale]/templates', 'page');
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
    revalidatePath('/[locale]/templates', 'page');
}

// Seed initial components from static data
export async function seedComponents(): Promise<{ created: number; skipped: number }> {
    if (!db) throw new Error('Database not available');

    // Static data file deleted, seeding function disabled.
    console.log('Static components data file deleted. Seeding disabled.');

    return { created: 0, skipped: 0 };
}
