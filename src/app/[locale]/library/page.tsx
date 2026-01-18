import { setRequestLocale } from 'next-intl/server';
import { LibraryClient } from './LibraryClient';
import { getPublishedComponents } from '@/lib/actions/components';
import { components as staticComponents, getAllCategories } from '@/lib/components-data';

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
        if (dbComponents.length > 0) {
            components = dbComponents.map(c => ({
                slug: c.slug,
                name: c.name,
                description: c.description,
                category: c.category,
                previewImage: c.previewImage,
            }));
        } else {
            // Use static data if database is empty
            components = staticComponents.map(c => ({
                slug: c.slug,
                name: c.name,
                description: c.description,
                category: c.category,
                previewImage: undefined,
            }));
        }
    } catch (error) {
        // Fallback to static data on error
        console.error('Failed to fetch from database, using static data:', error);
        components = staticComponents.map(c => ({
            slug: c.slug,
            name: c.name,
            description: c.description,
            category: c.category,
            previewImage: undefined,
        }));
    }

    const categories = getAllCategories();

    return <LibraryClient components={components} categories={categories} />;
}
