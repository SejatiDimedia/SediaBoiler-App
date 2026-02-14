import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { TemplatesClient } from './TemplatesClient';
import { getTemplates } from '@/lib/actions/components';


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

    const templates = (dbTemplates || [])
        .filter(t => String(t.isPublished) === 'true')
        .map(t => ({
            slug: t.slug,
            name: t.name,
            description: t.description,
            category: t.category,
            previewImage: t.previewImage || undefined,
        }));

    return (
        <Suspense fallback={<TemplatesLoading />}>
            <TemplatesClient templates={templates} />
        </Suspense>
    );
}

