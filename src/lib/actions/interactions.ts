
'use server'

import { auth } from "@/auth"
import { db } from "@/db"
import { likes, comments, posts, users } from "@/db/schema"
import { eq, and, sql, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function toggleLike(slug: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const post = await db.query.posts.findFirst({
        where: eq(posts.slug, slug),
    });

    if (!post) throw new Error("Post not found");

    const existingLike = await db.query.likes.findFirst({
        where: and(
            eq(likes.postId, post.id),
            eq(likes.userId, session.user.id)
        ),
    });

    if (existingLike) {
        await db.delete(likes).where(
            and(
                eq(likes.postId, post.id),
                eq(likes.userId, session.user.id)
            )
        );
    } else {
        await db.insert(likes).values({
            postId: post.id,
            userId: session.user.id,
        });
    }

    revalidatePath(`/blog/${slug}`);
    return !existingLike;
}

export async function addComment(slug: string, content: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const post = await db.query.posts.findFirst({
        where: eq(posts.slug, slug),
    });

    if (!post) throw new Error("Post not found");

    await db.insert(comments).values({
        content,
        postId: post.id,
        userId: session.user.id,
    });

    revalidatePath(`/blog/${slug}`);
}

export async function deleteComment(commentId: number) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    // Check ownership
    const comment = await db.query.comments.findFirst({
        where: eq(comments.id, commentId),
    });

    if (!comment) return;
    if (comment.userId !== session.user.id) throw new Error("Unauthorized");

    await db.delete(comments).where(eq(comments.id, commentId));
}

export async function getPostInteractions(slug: string) {
    const post = await db.query.posts.findFirst({
        where: eq(posts.slug, slug),
    });

    if (!post) return { likeCount: 0, userHasLiked: false, comments: [] };

    const session = await auth();

    // Fetch Like Count
    const [likeCountRes] = await db
        .select({ count: sql<number>`count(*)` })
        .from(likes)
        .where(eq(likes.postId, post.id));

    // Fetch User Like Status
    let userHasLiked = false;
    if (session?.user?.id) {
        const existingLike = await db.query.likes.findFirst({
            where: and(
                eq(likes.postId, post.id),
                eq(likes.userId, session.user.id)
            )
        });
        userHasLiked = !!existingLike;
    }

    // Fetch Comments with User Info
    const postComments = await db
        .select({
            id: comments.id,
            content: comments.content,
            createdAt: comments.createdAt,
            user: {
                name: users.name,
                image: users.image,
            }
        })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(eq(comments.postId, post.id))
        .orderBy(desc(comments.createdAt));

    return {
        likeCount: Number(likeCountRes.count),
        userHasLiked,
        comments: postComments,
    };
}

export async function getMostLikedPosts(limit: number = 4) {
    const topPosts = await db
        .select({
            post: posts,
            likeCount: sql<number>`count(${likes.postId})`.mapWith(Number)
        })
        .from(likes)
        .leftJoin(posts, eq(likes.postId, posts.id))
        .where(eq(posts.isPublished, true))
        .groupBy(posts.id)
        .orderBy(desc(sql`count(${likes.postId})`))
        .limit(limit);

    // If we don't have enough liked posts, fill with recent posts?
    // User requested "Section blog yang paling banyak disukai", so strictly liked posts is better initially.
    // However, if no likes exist, the section might be empty.
    // Let's return what we have. API consumer can decide fallback.

    return topPosts.map(item => ({
        ...item.post,
        likeCount: item.likeCount
    }));
}
