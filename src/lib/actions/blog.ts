'use server';

import { db } from '@/db';
import { schema } from '@/db';
import { eq, desc } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/admin-auth';
import { revalidatePath } from 'next/cache';
import { BilingualContent } from '@/db/schema/types'; // Use shared type

// Types
export type Post = typeof schema.posts.$inferSelect;
export type NewPost = typeof schema.posts.$inferInsert;

// --- PUBLIC ACTIONS ---

export async function getPosts(locale: string = 'en', page: number = 1, limit: number = 10) {
    try {
        const offset = (page - 1) * limit;

        const posts = await db!.query.posts.findMany({
            where: (posts, { eq }) => eq(posts.isPublished, true),
            orderBy: (posts, { desc }) => [desc(posts.publishedAt), desc(posts.createdAt)],
            limit: limit,
            offset: offset,
        });

        return { success: true, data: posts };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { success: false, error: 'Failed to fetch posts' };
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await db!.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.slug, slug),
        });

        if (!post) return { success: false, error: 'Post not found' };
        if (!post.isPublished) return { success: false, error: 'Post not found (unpublished)' }; // Or handle preview/draft logic differently

        return { success: true, data: post };
    } catch (error) {
        console.error('Error fetching post:', error);
        return { success: false, error: 'Failed to fetch post' };
    }
}

// --- ADMIN ACTIONS (Protected) ---

export async function getAllPostsAdmin() {
    await requireAdminAuth();
    try {
        const posts = await db!.query.posts.findMany({
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        });
        return { success: true, data: posts };
    } catch (error) {
        return { success: false, error: 'Failed to fetch admin posts' };
    }
}

export async function createPost(data: NewPost) {
    await requireAdminAuth();
    try {
        await db!.insert(schema.posts).values(data);
        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return { success: true };
    } catch (error) {
        console.error('Create post error:', error);
        return { success: false, error: 'Failed to create post' };
    }
}

export async function updatePost(id: number, data: Partial<NewPost>) {
    await requireAdminAuth();
    try {
        await db!.update(schema.posts)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(schema.posts.id, id));

        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        // We might want to revalidate specific slug path too if we had it, but for now this is okay
        return { success: true };
    } catch (error) {
        console.error('Update post error:', error);
        return { success: false, error: 'Failed to update post' };
    }
}

export async function deletePost(id: number) {
    await requireAdminAuth();
    try {
        await db!.delete(schema.posts).where(eq(schema.posts.id, id));
        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return { success: true };
    } catch (error) {
        console.error('Delete post error:', error);
        return { success: false, error: 'Failed to delete post' };
    }
}
