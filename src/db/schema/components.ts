import { pgTable, serial, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Bilingual content type
export type BilingualContent = {
    id: string;
    en: string;
};

// Component categories
export const componentCategories = [
    'navbar',
    'hero',
    'features',
    'pricing',
    'footer',
    'cta',
    'testimonial',
    'faq',
    'contact',
    'blog',
    'gallery',
    'team',
    'stats',
    'sidebar',
    'modal',
    'card',
    'form',
    'table',
    'chart',
    'landing-page',
    'other',
] as const;
export type ComponentCategory = typeof componentCategories[number];

// Components table
export const components = pgTable('components', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    name: jsonb('name').$type<BilingualContent>().notNull(),
    description: jsonb('description').$type<BilingualContent>().notNull(),
    category: varchar('category', { length: 50 }).$type<ComponentCategory>().notNull(),
    code: text('code').notNull(),
    previewImage: text('preview_image'),
    isPublished: varchar('is_published', { length: 10 }).default('true'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type inference
export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;
