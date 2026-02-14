import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { TemplatesClient } from './TemplatesClient';
import { getTemplates } from '@/lib/actions/components';
import { components as staticComponents } from '@/lib/components-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function TemplatesLoading() {
    return (
        <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="h-10 w-64 bg-accent/50 rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-accent/30 rounded-lg mx-auto animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-72 bg-accent/20 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function TemplatesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Try to get templates from database first
    const dbTemplates = await getTemplates();

    // 1. Process Database Templates
    const processedDbTemplates = (dbTemplates || [])
        .filter(t => String(t.isPublished) === 'true')
        .map(t => ({
            slug: t.slug,
            name: t.name,
            description: t.description,
            category: t.category,
            previewImage: t.previewImage || undefined,
        }));

    // 2. Process Static Templates
    const processedStaticTemplates = staticComponents
        .filter(c => c.category === 'landing-page')
        .map(c => ({
            slug: c.slug,
            name: c.name,
            description: c.description,
            category: c.category,
            previewImage: undefined,
        }));

    // 3. Merge: Database templates overwrite static ones if slug matches
    const templateMap = new Map<string, any>();

    // Add static first
    processedStaticTemplates.forEach(t => templateMap.set(t.slug, t));

    // overwrite/append with DB
    processedDbTemplates.forEach(t => templateMap.set(t.slug, t));

    // Convert back to array
    const templates = Array.from(templateMap.values());

    return (
        <Suspense fallback={<TemplatesLoading />}>
            <TemplatesClient templates={templates} />
        </Suspense>
    );
}

