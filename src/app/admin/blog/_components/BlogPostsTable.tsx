'use client';

import { useState, useTransition } from 'react';
import { Post } from '@/db/schema/blog';
import { Button } from '@/components/ui/Button';
import { Check, X, Trash2, CheckSquare, Pencil } from 'lucide-react';
import Link from 'next/link';
import { bulkDeletePosts, bulkPublishPosts } from '@/lib/actions/blog';
import { useRouter } from 'next/navigation';

interface BlogPostsTableProps {
    initialPosts: Post[];
}

export function BlogPostsTable({ initialPosts }: BlogPostsTableProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Effect to update local state if props change (revalidation)
    // Actually, pure client state might be better, relying on router refresh to update props
    if (initialPosts !== posts) {
        setPosts(initialPosts);
    }

    const toggleSelectAll = () => {
        if (selectedIds.size === posts.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(posts.map(p => p.id)));
        }
    };

    const toggleSelect = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${selectedIds.size} posts?`)) return;

        startTransition(async () => {
            const result = await bulkDeletePosts(Array.from(selectedIds));
            if (result.success) {
                setSelectedIds(new Set());
                router.refresh();
            } else {
                alert('Failed to delete posts');
            }
        });
    };

    const handleBulkPublish = async (isPublished: boolean) => {
        startTransition(async () => {
            const result = await bulkPublishPosts(Array.from(selectedIds), isPublished);
            if (result.success) {
                setSelectedIds(new Set());
                router.refresh();
            } else {
                alert('Failed to update status');
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Bulk Actions Toolbar */}
            {selectedIds.size > 0 && (
                <div className="sticky top-4 z-20 flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 font-medium">
                        <CheckSquare className="w-5 h-5" />
                        <span>{selectedIds.size} selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleBulkPublish(true)}
                            disabled={isPending}
                        >
                            Publish
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleBulkPublish(false)}
                            disabled={isPending}
                        >
                            Unpublish
                        </Button>
                        <div className="w-px h-6 bg-primary-foreground/20 mx-1" />
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white border-transparent"
                            onClick={handleBulkDelete}
                            disabled={isPending}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-4 w-[50px]">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-brand-from focus:ring-brand-from"
                                        checked={posts.length > 0 && selectedIds.size === posts.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className={`group transition-colors ${selectedIds.has(post.id) ? 'bg-primary/5' : 'hover:bg-muted/30'}`}
                                    >
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-brand-from focus:ring-brand-from"
                                                checked={selectedIds.has(post.id)}
                                                onChange={() => toggleSelect(post.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* @ts-ignore */}
                                            <div className="font-medium text-foreground">{post.title.en || post.title.id}</div>
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
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        No posts found. Create your first one!
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
