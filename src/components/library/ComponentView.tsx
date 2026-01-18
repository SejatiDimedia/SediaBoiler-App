'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ComponentViewer } from '@/components/library/ComponentViewer';
import { Button } from '@/components/ui/Button';
import { ComponentData } from '@/lib/components-data';
import { ArrowLeft, Layers } from 'lucide-react';

interface ComponentViewProps {
    component: ComponentData;
    preview?: React.ReactNode;
    locale: 'id' | 'en';
}

export function ComponentView({ component, preview, locale }: ComponentViewProps) {
    const t = useTranslations('library');
    // We might need to fetch translations if not passed, but component has name/desc in both languages.

    return (
        <div className="py-8 md:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb */}
                <Link
                    href={`/library/${component.category}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {locale === 'id' ? 'Kembali ke Kategori' : 'Back to Category'}
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Layers className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                            {component.category}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        {component.name[locale]}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        {component.description[locale]}
                    </p>
                </div>

                {/* Component Viewer */}
                <ComponentViewer
                    slug={component.slug}
                    code={component.code}
                />

                {/* Usage Note */}
                <div className="mt-8 p-6 rounded-xl border border-border bg-accent/50">
                    <h3 className="font-semibold text-foreground mb-2">
                        {locale === 'id' ? 'Cara Penggunaan' : 'How to Use'}
                    </h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-1 text-sm">
                        <li>{locale === 'id' ? 'Klik tombol "Salin Kode" di atas' : 'Click the "Copy Code" button above'}</li>
                        <li>{locale === 'id' ? 'Paste ke file komponen React Anda' : 'Paste into your React component file'}</li>
                        <li>{locale === 'id' ? 'Sesuaikan styling dengan kebutuhan project Anda' : 'Customize the styling to fit your project needs'}</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
