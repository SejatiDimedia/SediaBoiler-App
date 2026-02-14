'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ComponentViewer } from '@/components/library/ComponentViewer';
import { Button } from '@/components/ui/Button';
import { ComponentData } from '@/lib/components-data';
import { ArrowLeft, Layers, Copy, FileCode, Palette, Sparkles } from 'lucide-react';

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
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link
                        href="/library"
                        className="hover:text-foreground transition-colors"
                    >
                        {t('title')}
                    </Link>
                    <span className="text-muted-foreground/40">/</span>
                    <Link
                        href={component.category === 'landing-page' ? '/templates' : `/library?category=${component.category}`}
                        className="hover:text-foreground transition-colors capitalize"
                    >
                        {component.category === 'landing-page' ? (locale === 'id' ? 'Template' : 'Templates') : component.category}
                    </Link>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="font-medium text-foreground">
                        {component.name[locale]}
                    </span>
                </nav>

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
                <div className="mt-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-from to-brand-to flex items-center justify-center shadow-lg shadow-brand-from/20">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {locale === 'id' ? 'Cara Penggunaan' : 'How to Use'}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Step 1: Copy */}
                        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-brand-from/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-from/5">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-black text-brand-from">1</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-brand-from/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Copy className="h-6 w-6 text-brand-from" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-foreground">
                                {locale === 'id' ? 'Salin Kode' : 'Copy Code'}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {locale === 'id'
                                    ? 'Klik tombol "Salin Kode" di bagian atas untuk menyalin seluruh kode komponen.'
                                    : 'Click the "Copy Code" button above to copy the entire component code.'}
                            </p>
                        </div>

                        {/* Step 2: Paste */}
                        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-brand-from/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-from/5">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-black text-brand-from">2</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-brand-from/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileCode className="h-6 w-6 text-brand-from" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-foreground">
                                {locale === 'id' ? 'Buat File' : 'Create File'}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {locale === 'id'
                                    ? 'Buat file baru di project Anda dan paste kode yang sudah disalin.'
                                    : 'Create a new file in your project and paste the copied code.'}
                            </p>
                        </div>

                        {/* Step 3: Customize */}
                        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-brand-from/40 transition-all duration-300 hover:shadow-lg hover:shadow-brand-from/5">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-black text-brand-from">3</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-brand-from/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Palette className="h-6 w-6 text-brand-from" />
                            </div>
                            <h4 className="font-bold text-lg mb-2 text-foreground">
                                {locale === 'id' ? 'Kustomisasi' : 'Customize'}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {locale === 'id'
                                    ? 'Sesuaikan styling dan konten komponen dengan kebutuhan brand Anda.'
                                    : 'Adjust the component styling and content to match your brand needs.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
