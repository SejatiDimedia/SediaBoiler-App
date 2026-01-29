'use server';

import { db } from '@/db';
import { schema } from '@/db';
import { eq, desc, inArray, count } from 'drizzle-orm';
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

        const [totalCountResult] = await db!
            .select({ count: count() })
            .from(schema.posts)
            .where(eq(schema.posts.isPublished, true));

        const totalCount = totalCountResult.count;
        const totalPages = Math.ceil(totalCount / limit);

        const posts = await db!.query.posts.findMany({
            where: (posts, { eq }) => eq(posts.isPublished, true),
            orderBy: (posts, { desc }) => [desc(posts.publishedAt), desc(posts.createdAt)],
            limit: limit,
            offset: offset,
        });

        return {
            success: true,
            data: posts,
            meta: {
                current: page,
                totalPages,
                totalCount
            }
        };
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
        revalidatePath('/', 'layout');
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

export async function importPostsFromJson(jsonData: any) {
    await requireAdminAuth();
    try {
        const postsToImport = Array.isArray(jsonData) ? jsonData : [jsonData];

        for (const postData of postsToImport) {
            // Basic validation
            if (!postData.slug || !postData.title || !postData.content) {
                console.warn(`Skipping invalid post data:`, postData);
                continue;
            }

            const isPublished = postData.isPublished ?? true;
            const now = new Date();

            const newPost: NewPost = {
                slug: postData.slug,
                title: postData.title,
                content: postData.content,
                excerpt: postData.excerpt || null,
                coverImage: postData.coverImage || null,
                isPublished: isPublished,
                publishedAt: isPublished ? (postData.publishedAt ? new Date(postData.publishedAt) : now) : null,
                createdAt: postData.createdAt ? new Date(postData.createdAt) : now,
            };

            await db!.insert(schema.posts)
                .values(newPost)
                .onConflictDoUpdate({
                    target: schema.posts.slug,
                    set: {
                        title: newPost.title,
                        content: newPost.content,
                        excerpt: newPost.excerpt,
                        coverImage: newPost.coverImage,
                        isPublished: newPost.isPublished,
                        publishedAt: newPost.publishedAt,
                        updatedAt: now,
                    }
                });
        }

        revalidatePath('/', 'layout');
        return { success: true, count: postsToImport.length };
    } catch (error) {
        console.error('Import posts error:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to import posts' };
    }
}

export async function bulkDeletePosts(ids: number[]) {
    await requireAdminAuth();
    try {
        if (!ids.length) return { success: true, count: 0 };

        await db!.delete(schema.posts)
            .where(inArray(schema.posts.id, ids));

        revalidatePath('/', 'layout');
        return { success: true, count: ids.length };
    } catch (error) {
        console.error('Bulk delete error:', error);
        return { success: false, error: 'Failed to delete posts' };
    }
}

export async function bulkPublishPosts(ids: number[], isPublished: boolean) {
    await requireAdminAuth();
    try {
        if (!ids.length) return { success: true, count: 0 };

        const now = new Date();
        const updateData: any = {
            isPublished,
            updatedAt: now
        };

        await db!.update(schema.posts)
            .set(updateData)
            .where(inArray(schema.posts.id, ids));

        revalidatePath('/', 'layout');
        return { success: true, count: ids.length };
    } catch (error) {
        console.error('Bulk publish error:', error);
        return { success: false, error: 'Failed to update posts status' };
    }
}
