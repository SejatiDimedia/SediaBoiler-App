import { pgTable, text, timestamp, integer, serial, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { posts } from './blog';

export const comments = pgTable('comments', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const likes = pgTable('likes', {
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
    pk: primaryKey({ columns: [t.postId, t.userId] }),
}));
