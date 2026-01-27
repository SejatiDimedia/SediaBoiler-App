import { pgTable, serial, varchar, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';
import { BilingualContent } from './types';

// Posts table
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: jsonb('title').$type<BilingualContent>().notNull(),
    content: jsonb('content').$type<BilingualContent>().notNull(), // Stores MDX/HTML content
    excerpt: jsonb('excerpt').$type<BilingualContent>(),
    coverImage: text('cover_image'),
    isPublished: boolean('is_published').default(false).notNull(),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type inference
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
