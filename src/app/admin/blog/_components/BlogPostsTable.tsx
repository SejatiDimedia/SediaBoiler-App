'use client';

import { useState, useTransition } from 'react';
import { Post } from '@/db/schema/blog';
import { Button } from '@/components/ui/Button';
import { Trash2, CheckSquare, Pencil, Square, CheckCircle2, Circle, Calendar, Loader2, FileText } from 'lucide-react';
import Link from 'next/link';
import { bulkDeletePosts, bulkPublishPosts } from '@/lib/actions/blog';
import { useRouter } from 'next/navigation';
import { DeletePostButton } from './DeletePostButton';

interface BlogPostsTableProps {
    initialPosts: Post[];
}

export function BlogPostsTable({ initialPosts }: BlogPostsTableProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    // Effect to update local state if props change (revalidation)
    if (initialPosts !== posts) {
        setPosts(initialPosts);
    }

    const isAllSelected = posts.length > 0 && selectedIds.size === posts.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
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
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="w-12 px-6 py-4">
                                    <button
                                        onClick={toggleSelectAll}
                                        className="flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {isAllSelected ? (
                                            <CheckSquare className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Square className="w-5 h-5" />
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Title</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Date</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {posts && posts.length > 0 ? (
                                posts.map((post) => {
                                    const isSelected = selectedIds.has(post.id);
                                    return (
                                        <tr
                                            key={post.id}
                                            className={`group transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-slate-50/80'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleSelect(post.id)}
                                                    className="flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {isSelected ? (
                                                        <CheckSquare className="w-5 h-5 text-primary" />
                                                    ) : (
                                                        <Square className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    {/* @ts-ignore */}
                                                    <span className="font-semibold text-slate-900 text-base">{post.title.en || post.title.id}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                                            /{post.slug}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${post.isPublished
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    {post.isPublished ? (
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    ) : (
                                                        <Circle className="w-3 h-3" />
                                                    )}
                                                    {post.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    <Link
                                                        href={`/admin/blog/${post.id}/edit`}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <DeletePostButton id={post.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
                                                <FileText className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">No posts found</p>
                                                <p className="text-sm mt-1">Get started by creating your first blog post.</p>
                                            </div>
                                            <Link href="/admin/blog/new" className="mt-2 text-primary hover:underline font-medium">Create Post</Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Actions Floating Bar */}
            {selectedIds.size > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl shadow-slate-200/50 border border-slate-200 p-2 pl-4 rounded-full flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
                    <span className="text-sm font-medium text-slate-600 border-r border-slate-200 pr-4">
                        <span className="text-slate-900 font-bold">{selectedIds.size}</span> selected
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleBulkPublish(true)}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition disabled:opacity-50"
                        >
                            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            Publish
                        </button>
                        <button
                            onClick={() => handleBulkPublish(false)}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 transition disabled:opacity-50"
                        >
                            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Circle className="w-3.5 h-3.5" />}
                            Draft
                        </button>
                        <div className="w-px h-6 bg-slate-200 mx-2"></div>
                        <button
                            onClick={handleBulkDelete}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-bold hover:bg-red-100 transition disabled:opacity-50 border border-red-100"
                        >
                            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            Delete ({selectedIds.size})
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
