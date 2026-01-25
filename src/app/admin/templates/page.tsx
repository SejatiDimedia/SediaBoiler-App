import { getTemplates } from '@/lib/actions/components';
import Link from 'next/link';
import { Plus, Search, Layout } from 'lucide-react';
import { AdminTable } from '../components/AdminTable';

export default async function TemplatesListPage() {
    const templates = await getTemplates();

    return (
        <div className="max-w-7xl mx-auto pb-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <Layout className="w-8 h-8 text-primary" />
                        Templates
                    </h1>
                    <p className="text-slate-500 mt-2 max-w-lg">
                        Manage landing page templates. Create complete page layouts ready for use.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block group">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm w-64 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                    <Link
                        href="/admin/templates/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25 font-medium active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New
                    </Link>
                </div>
            </div>

            {/* Admin Table */}
            <AdminTable items={templates} type="template" />
        </div>
    );
}
