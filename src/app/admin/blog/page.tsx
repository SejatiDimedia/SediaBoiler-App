import { getAllPostsAdmin } from '@/lib/actions/blog';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, Search, FileText } from 'lucide-react';
import { JsonImportModal } from './_components/JsonImportModal';
import { BlogPostsTable } from './_components/BlogPostsTable';

export default async function AdminBlogPage() {
    const { success, data: posts } = await getAllPostsAdmin();

    return (
        <div className="max-w-7xl mx-auto pb-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-primary" />
                        Blog Posts
                    </h1>
                    <p className="text-slate-500 mt-2 max-w-lg">
                        Manage your blog articles and content. Create, edit, and organize posts displayed on your blog.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm w-64 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    <JsonImportModal />

                    <Link
                        href="/admin/blog/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25 font-medium active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Create Post
                    </Link>
                </div>
            </div>

            <BlogPostsTable initialPosts={posts || []} />
        </div>
    );
}
