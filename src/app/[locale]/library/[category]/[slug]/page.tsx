import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getComponentBySlug } from '@/lib/actions/components';
import { components as staticComponents } from '@/lib/components-data';
import { componentRegistry } from '@/components/preview/registry';
import { ComponentView } from '@/components/library/ComponentView';
import { getCategoryBySlug } from '@/lib/actions/categories';

// Force dynamic rendering since we're using database
export const dynamic = 'force-dynamic';

interface ComponentPageProps {
    params: Promise<{
        locale: string;
        category: string;
        slug: string;
    }>;
}

export default async function ComponentPage({
    params,
}: ComponentPageProps) {
    const { locale, category: categorySlug, slug } = await params;
    setRequestLocale(locale);

    // 1. Verify Category matches (optional but good for SEO/Consistency)
    // If component exists but category doesn't match URL, should we redirect or 404? 
    // For now, let's just ensure component exists. 
    // Ideally validation: if (component.category !== categorySlug) -> redirect or 404.

    let component = await getComponentBySlug(slug);

    // Fallback to static data if not in DB (for existing static components)
    if (!component) {
        const staticComponent = staticComponents.find((c) => c.slug === slug);
        if (staticComponent) {
            component = {
                name: staticComponent.name,
                description: staticComponent.description,
                code: '', // Static components render via registry only
                isPublished: 'true',
                slug: staticComponent.slug,
                category: staticComponent.category,
                id: 0, // Dummy ID for static component
                previewImage: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }
    }

    if (!component) {
        notFound();
    }

    // Optional: Validate category slug from URL matches component's category
    // This assumes component.category is the slug. 
    // If component.category is just a string name, we might need normalization.
    if (component.category !== categorySlug) {
        // We could redirect to correct category, but for now strict check:
        // console.warn(`Mismatch category: URL=${categorySlug}, Component=${component.category}`);
        // Let's allow it for now to avoid breaking if category slugs differ slightly, 
        // or stricter:
        // notFound(); 
    }

    const PreviewComponent = componentRegistry[slug];

    return (
        <ComponentView
            component={component}
            preview={PreviewComponent ? <PreviewComponent /> : undefined}
            locale={locale as 'id' | 'en'}
        />
    );
}
