import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getComponentBySlug } from '@/lib/actions/components';
import { components as staticComponents } from '@/lib/components-data';
import { componentRegistry } from '@/components/preview/registry';
import { ComponentView } from '@/components/library/ComponentView';

export const dynamic = 'force-dynamic';

interface TemplatePageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export default async function TemplatePage({ params }: TemplatePageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    let component = await getComponentBySlug(slug);

    if (!component) {
        const staticComponent = staticComponents.find((c) => c.slug === slug);
        if (staticComponent && staticComponent.category === 'landing-page') {
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

    if (!component || component.category !== 'landing-page') {
        notFound();
    }

    if (component.isPublished === 'false') {
        notFound();
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
