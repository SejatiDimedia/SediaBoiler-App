import { getUIComponents } from '@/lib/actions/components';
import Link from 'next/link';
import { Plus, LayoutGrid } from 'lucide-react';
import { AdminTable } from './AdminTable';
import { SearchInput } from './SearchInput';

export default async function ComponentsListPage() {
    const components = await getUIComponents();

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
                    <SearchInput placeholder="Search components..." />
                    <Link
                        href="/admin/components/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/25 font-medium active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add New
                    </Link>
                </div>
            </div>

            {/* Admin Table */}
            <AdminTable items={components} type="component" />
        </div>
    );
}
