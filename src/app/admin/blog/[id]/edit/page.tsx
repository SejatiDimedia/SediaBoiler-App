import { BlogForm } from '../../_components/BlogForm';
import { db } from '@/db';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postId = parseInt(id);

    // We fetch directly from DB here because it's a server component page
    const post = await db!.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, postId),
    });

    if (!post) {
        notFound();
    }

    // Transform data for the form. The form expects titleEn, titleId etc.
    // Actually the form handles splitting inside its state init, but passing cleaned data is nicer.
    // Let's pass the raw `post` object and let the form parse it.
    // The form interface `initialData` should match the DB shape largely.

    // Mapping DB shape to what the form expects in its state initialization logic:
    const initialData = {
        ...post,
        title: post.title as { en: string; id: string }, // CAST for safety
        content: post.content as { en: string; id: string },
        excerpt: post.excerpt as { en: string; id: string },
    };

    return <BlogForm initialData={initialData} isEdit={true} />;
}
