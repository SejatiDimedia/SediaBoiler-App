import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { LibraryClient } from './LibraryClient';
import { getPublishedComponents } from '@/lib/actions/components';
import { components as staticComponents, getAllCategories } from '@/lib/components-data';

function LibraryLoading() {
    return (
        <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="h-10 w-64 bg-accent/50 rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-accent/30 rounded-lg mx-auto animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-accent/20 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function LibraryPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Try to get components from database, fallback to static data
    let components;
    try {
        const dbComponents = await getPublishedComponents();
        components = dbComponents
            .filter(c => c.category !== 'landing-page')
            .map(c => ({
                slug: c.slug,
                name: c.name,
                description: c.description,
                category: c.category,
                previewImage: c.previewImage,
            }));
    } catch (error) {
        console.error('Failed to fetch from database:', error);
        components = staticComponents
            .filter(c => c.category !== 'landing-page')
            .map(c => ({
                slug: c.slug,
                name: c.name,
                description: c.description,
                category: c.category,
                previewImage: undefined,
            }));
    }

    const categories = getAllCategories();

    return (
        <Suspense fallback={<LibraryLoading />}>
            <LibraryClient components={components} categories={categories} initialCategory="all" />
        </Suspense>
    );
}
