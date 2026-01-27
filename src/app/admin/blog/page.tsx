import { getAllPostsAdmin } from '@/lib/actions/blog';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

export default async function AdminBlogPage() {
    const { success, data: posts } = await getAllPostsAdmin();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground mt-2">Manage your blog articles and content.</p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create Post
                    </Button>
                </Link>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-foreground">{post.title.en}</div>
                                            <div className="text-xs text-muted-foreground mt-0.5 font-mono">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.isPublished ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-600/20">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 ring-1 ring-inset ring-yellow-600/20">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/blog/${post.id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                {/* Delete button would go here, maybe with a dialog confirm */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        No posts found. create your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
