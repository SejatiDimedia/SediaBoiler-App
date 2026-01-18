import { getAllComponents } from '@/lib/actions/components';
import Link from 'next/link';
import {
    Package,
    Plus,
    ArrowUpRight,
    LayoutGrid,
    CheckCircle2,
    Circle,
    BarChart3,
    Layers,
    FileCode,
    Clock
} from 'lucide-react';
import { SeedButton } from './SeedButton';

export default async function AdminDashboard() {
    // Fetch data - getAllComponents usually returns sorted by createdAt ascending
    // We reverse it to get newest first for the "Recent" list
    const allComponents = await getAllComponents();
    const recentComponents = [...allComponents].reverse().slice(0, 5);

    const stats = {
        total: allComponents.length,
        published: allComponents.filter(c => c.isPublished === 'true').length,
        draft: allComponents.filter(c => c.isPublished !== 'true').length,
        categories: {
            navbar: allComponents.filter(c => c.category === 'navbar').length,
            hero: allComponents.filter(c => c.category === 'hero').length,
            features: allComponents.filter(c => c.category === 'features').length,
            pricing: allComponents.filter(c => c.category === 'pricing').length,
            footer: allComponents.filter(c => c.category === 'footer').length,
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-24 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Manage your component library content and performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <SeedButton />
                    <Link
                        href="/admin/components/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25 font-medium active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        New Component
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Stats */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Layers className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Total</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-slate-900">{stats.total}</h3>
                        <p className="text-slate-500 text-sm mt-1">Components in library</p>
                    </div>
                </div>

                {/* Published Stats */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Live</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-slate-900">{stats.published}</h3>
                        <p className="text-slate-500 text-sm mt-1">Published components</p>
                    </div>
                </div>

                {/* Draft Stats */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <FileCode className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">Drafts</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-slate-900">{stats.draft}</h3>
                        <p className="text-slate-500 text-sm mt-1">Work in progress</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-400" />
                                Recent Activity
                            </h2>
                            <p className="text-sm text-slate-500">Latest added or modified components</p>
                        </div>
                        <Link href="/admin/components" className="text-sm font-medium text-primary hover:text-primary/80 transition flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase text-slate-500">Component</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase text-slate-500">Status</th>
                                    <th className="px-6 py-4 font-semibold text-xs uppercase text-slate-500 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentComponents.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                                            No recent activity found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentComponents.map((component) => (
                                        <tr key={component.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all">
                                                        <LayoutGrid className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 text-sm">{component.name.id}</p>
                                                        <p className="text-xs text-slate-500 font-mono">/{component.slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${component.isPublished === 'true'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${component.isPublished === 'true' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    {component.isPublished === 'true' ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-500 font-mono">
                                                {new Date(component.updatedAt || component.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions & Categories */}
                <div className="space-y-6">
                    {/* Categories Panel */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900">Categories</h3>
                        </div>
                        <div className="space-y-3">
                            {Object.entries(stats.categories).map(([cat, count]) => (
                                <div key={cat} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default border border-transparent hover:border-slate-100 group">
                                    <span className="capitalize font-medium text-slate-700 flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${count > 0 ? 'bg-indigo-400' : 'bg-slate-300'}`}></span>
                                        {cat}
                                    </span>
                                    <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
