import { getAllComponents } from '@/lib/actions/components';
import Link from 'next/link';
import { Plus, Edit, ArrowUpRight, Search, LayoutGrid, MoreHorizontal, Calendar, Tag, CheckCircle2, Circle } from 'lucide-react';
import { DeleteButton } from './DeleteButton';

export default async function ComponentsListPage() {
    const components = await getAllComponents();

    return (
        <div className="max-w-7xl mx-auto pb-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <LayoutGrid className="w-8 h-8 text-primary" />
                        Components
                    </h1>
                    <p className="text-slate-500 mt-2 max-w-lg">
                        Manage your UI library. Create, edit, and organize components displayed in the public library.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            className="bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm w-64 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                    <Link
                        href="/admin/components/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25 font-medium active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New
                    </Link>
                </div>
            </div>

            {/* Unified Panel List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Component</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Category</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Last Updated</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {components.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
                                                <LayoutGrid className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">No components found</p>
                                                <p className="text-sm mt-1">Get started by creating your first component.</p>
                                            </div>
                                            <Link href="/admin/components/new" className="mt-2 text-primary hover:underline font-medium">Create Component</Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                components.map((component) => (
                                    <tr key={component.id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 text-base">{component.name.id}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                                        /{component.slug}
                                                    </span>
                                                    {component.name.en && (
                                                        <span className="text-xs text-slate-400 border-l pl-2 border-slate-200">
                                                            {component.name.en}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                                                <Tag className="w-3 h-3 text-slate-400" />
                                                {component.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${component.isPublished === 'true'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}>
                                                {component.isPublished === 'true' ? (
                                                    <CheckCircle2 className="w-3 h-3" />
                                                ) : (
                                                    <Circle className="w-3 h-3" />
                                                )}
                                                {component.isPublished === 'true' ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                {new Date(component.updatedAt || component.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                <Link
                                                    href={`/id/library/${component.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition border border-transparent hover:border-primary/10"
                                                    title="View in Library"
                                                >
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/components/${component.id}/edit`}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition border border-transparent hover:border-blue-100"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <DeleteButton id={component.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
