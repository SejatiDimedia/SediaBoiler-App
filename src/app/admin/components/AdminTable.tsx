'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
    ArrowUpRight,
    Calendar,
    Tag,
    CheckCircle2,
    Circle,
    Edit,
    Trash2,
    Layout,
    LayoutGrid,
    CheckSquare,
    Square,
    Loader2
} from 'lucide-react';
import { DeleteButton } from './DeleteButton';
import { bulkUpdatePublishStatus, bulkDeleteComponents } from '@/lib/actions/components';
import { useRouter } from 'next/navigation';

interface AdminTableProps {
    items: any[];
    type: 'template' | 'component';
}

export function AdminTable({ items, type }: AdminTableProps) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const isAllSelected = items.length > 0 && selectedIds.size === items.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(items.map(i => i.id)));
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

    const handleBulkAction = (isPublished: 'true' | 'false') => {
        if (selectedIds.size === 0) return;

        startTransition(async () => {
            await bulkUpdatePublishStatus(Array.from(selectedIds), isPublished);
            setSelectedIds(new Set());
            router.refresh();
        });
    };

    const handleBulkDelete = () => {
        if (selectedIds.size === 0) return;

        if (!confirm(`Are you sure you want to delete ${selectedIds.size} items? This action cannot be undone.`)) {
            return;
        }

        startTransition(async () => {
            await bulkDeleteComponents(Array.from(selectedIds));
            setSelectedIds(new Set());
            router.refresh();
        });
    };

    const getPreviewLink = (item: any) => {
        if (item.category === 'landing-page') {
            return `/id/library/template/${item.slug}`;
        }
        return `/id/library/component/${item.category}/${item.slug}`;
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
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">
                                    {type === 'template' ? 'Template' : 'Component'}
                                </th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Category</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Last Updated</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
                                                {type === 'template' ? <Layout className="w-8 h-8 text-slate-400" /> : <LayoutGrid className="w-8 h-8 text-slate-400" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">No {type}s found</p>
                                                <p className="text-sm mt-1">Get started by creating your first {type}.</p>
                                            </div>
                                            <Link href={`/admin/${type}s/new`} className="mt-2 text-primary hover:underline font-medium">Create {type === 'template' ? 'Template' : 'Component'}</Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => {
                                    const isSelected = selectedIds.has(item.id);
                                    return (
                                        <tr key={item.id} className={`group transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-slate-50/80'}`}>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => toggleSelect(item.id)}
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
                                                    <span className="font-semibold text-slate-900 text-base">{item.name.id}</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                                            /{item.slug}
                                                        </span>
                                                        {item.name.en && (
                                                            <span className="text-xs text-slate-400 border-l pl-2 border-slate-200">
                                                                {item.name.en}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                                                    <Tag className="w-3 h-3 text-slate-400" />
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${item.isPublished === 'true'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    {item.isPublished === 'true' ? (
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    ) : (
                                                        <Circle className="w-3 h-3" />
                                                    )}
                                                    {item.isPublished === 'true' ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {new Date(item.updatedAt || item.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    <Link
                                                        href={getPreviewLink(item)}
                                                        target="_blank"
                                                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition border border-transparent hover:border-primary/10"
                                                        title="View in Library"
                                                    >
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/${type}s/${item.id}/edit`}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <DeleteButton id={item.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
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
                            onClick={() => handleBulkAction('true')}
                            disabled={isPending}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition disabled:opacity-50"
                        >
                            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            Publish
                        </button>
                        <button
                            onClick={() => handleBulkAction('false')}
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
