import { getAllPostsAdmin } from '@/lib/actions/blog';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { JsonImportModal } from './_components/JsonImportModal';
import { BlogPostsTable } from './_components/BlogPostsTable';

export default async function AdminBlogPage() {
    const { success, data: posts } = await getAllPostsAdmin();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground mt-2">Manage your blog articles and content.</p>
                </div>
                <div className="flex items-center gap-3">
                    <JsonImportModal />
                    <Link href="/admin/blog/new">
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create Post
                        </Button>
                    </Link>
                </div>
            </div>

            <BlogPostsTable initialPosts={posts || []} />
        </div>
    );
}
