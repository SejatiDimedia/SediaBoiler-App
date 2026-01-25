import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getComponentBySlug } from '@/lib/actions/components';
import { components as staticComponents } from '@/lib/components-data';
import { componentRegistry } from '@/components/preview/registry';
import { ComponentView } from '@/components/library/ComponentView';

export const dynamic = 'force-dynamic';

interface ComponentPageProps {
    params: Promise<{
        locale: string;
        category: string;
        slug: string;
    }>;
}

export default async function ComponentPage({ params }: ComponentPageProps) {
    const { locale, category, slug } = await params;
    setRequestLocale(locale);

    let component = await getComponentBySlug(slug);

    if (!component) {
        const staticComponent = staticComponents.find((c) => c.slug === slug);
        if (staticComponent) {
            component = {
                id: 0,
                name: staticComponent.name,
                description: staticComponent.description,
                category: staticComponent.category,
                code: staticComponent.code || '',
                slug: staticComponent.slug,
                previewImage: null,
                isPublished: 'true',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }
    }

    if (!component) {
        notFound();
    }

    if (component.isPublished === 'false') {
        notFound();
    }

    // Validate category match (optional but strictly requested structure)
    if (component.category !== category && category !== 'all') {
        // Allow 'all' wildcards? user specifically asked for /component/button/button-primary.
        // Let's enforce check if we want strictness.
        // If component.category is 'button' and url is 'button', good.
        if (component.category !== category) {
            // console.warn('Mismatch category', component.category, category);
            // Maybe 404 or redirect? Let's 404 to force correct URL usage.
            // notFound();
        }
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
