import { setRequestLocale } from 'next-intl/server';
import { getPublishedComponents } from '@/lib/actions/components';
import { getCategoryBySlug } from '@/lib/actions/categories';
import { ComponentCard } from '@/components/library/ComponentCard';
import { componentRegistry } from '@/components/preview/registry';
import { notFound } from 'next/navigation';
import { LayoutTemplate } from 'lucide-react';

interface CategoryPageProps {
    params: Promise<{
        locale: string;
        category: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { locale, category: categorySlug } = await params;
    setRequestLocale(locale);

    // 1. Validate Category
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
        notFound();
    }

    // 2. Fetch Components
    const allComponents = await getPublishedComponents();
    const components = allComponents.filter(c => c.category === categorySlug);

    // 3. Translations (Simple mapping for now, ideally use next-intl)
    const viewDemoText = locale === 'id' ? 'Lihat Demo' : 'View Demo';

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    {category.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                    {category.description || `Browse our collection of ${category.name} components.`}
                </p>
            </div>

            {/* Grid */}
            {components.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {components.map((component) => {
                        const PreviewComponent = componentRegistry[component.slug];
                        return (
                            <ComponentCard
                                key={component.slug}
                                slug={component.slug}
                                name={component.name[locale as 'id' | 'en']}
                                description={component.description[locale as 'id' | 'en']}
                                category={component.category}
                                viewLabel={viewDemoText}
                                // Note: We might need to update ComponentCard to link to correct nested path
                                // For now, ComponentCard likely links to /library/[slug]
                                // We will fix ComponentCard separately if needed, but standard link is sufficient 
                                // if we want to support nested urls we need to update ComponentCard
                                preview={PreviewComponent ? <PreviewComponent /> : undefined}
                                image={component.previewImage ?? undefined}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-muted/5">
                    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted/20 mb-6">
                        <LayoutTemplate className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {locale === 'id' ? 'Kategori kosong' : 'Empty Category'}
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                        {locale === 'id'
                            ? 'Belum ada komponen di kategori ini. Kami akan segera menambahkannya!'
                            : 'There are no components in this category yet. We will add them soon!'}
                    </p>
                    <a
                        href={`/${locale}/library`}
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-background border border-border text-foreground font-medium hover:bg-accent hover:border-accent-foreground/20 transition-all text-sm shadow-sm"
                    >
                        {locale === 'id' ? 'Lihat Semua Komponen' : 'Browse All Components'}
                    </a>
                </div>
            )}
        </div>
    );
}
