'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, LayoutTemplate, SearchX } from 'lucide-react';
import { ComponentCard } from '@/components/library/ComponentCard';
import { componentRegistry } from '@/components/preview/registry';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 6; // Fewer items per page for larger template cards

interface TemplateItem {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: string;
    previewImage?: string | null;
}

interface TemplatesClientProps {
    templates: TemplateItem[];
}

export function TemplatesClient({ templates }: TemplatesClientProps) {
    const locale = useLocale() as 'id' | 'en';
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialPage = parseInt(searchParams.get('page') || '1', 10);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(initialPage);

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        setCurrentPage(page);
    }, [searchParams]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredTemplates = useMemo(() => {
        let result = templates;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name[locale].toLowerCase().includes(query) ||
                t.description[locale].toLowerCase().includes(query)
            );
        }
        return result;
    }, [templates, searchQuery, locale]);

    const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    const paginatedTemplates = useMemo(() => {
        const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
        return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredTemplates, validPage]);

    useEffect(() => {
        if (searchQuery && currentPage !== 1) {
            handlePageChange(1);
        }
    }, [searchQuery]);

    return (
        <div className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {locale === 'id' ? 'Template Landing Page' : 'Landing Page Templates'}
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        {locale === 'id'
                            ? 'Template halaman landing page siap pakai dalam satu file. Copy-paste, langsung jalan!'
                            : 'Ready-to-use landing page templates in a single file. Copy-paste and go!'}
                    </p>
                </div>

                {/* Search */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            type="text"
                            placeholder={locale === 'id' ? 'Cari template...' : 'Search templates...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 h-11 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-brand-from focus:ring-2 focus:ring-brand-from/20 transition"
                        />
                    </div>
                </div>

                {/* Templates Grid */}
                {paginatedTemplates.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedTemplates.map((template) => {
                                const PreviewComponent = componentRegistry[template.slug];
                                return (
                                    <ComponentCard
                                        key={template.slug}
                                        slug={template.slug}
                                        name={template.name[locale]}
                                        description={template.description[locale]}
                                        category={template.category}
                                        viewLabel={locale === 'id' ? 'Lihat Detail' : 'View Details'}
                                        preview={PreviewComponent ? <PreviewComponent /> : undefined}
                                        image={template.previewImage ?? undefined}
                                    />
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(validPage - 1)}
                                    disabled={validPage === 1}
                                    className={cn(
                                        'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                                        validPage === 1
                                            ? 'bg-muted/30 border-border text-muted cursor-not-allowed'
                                            : 'bg-background border-border text-foreground hover:border-primary hover:text-primary'
                                    )}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    {locale === 'id' ? 'Sebelumnya' : 'Previous'}
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={cn(
                                                'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all',
                                                page === validPage
                                                    ? 'bg-gradient-to-br from-brand-from to-brand-to text-white shadow-md shadow-brand-from/20'
                                                    : 'bg-background border border-border text-muted hover:text-foreground hover:border-foreground/20'
                                            )}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(validPage + 1)}
                                    disabled={validPage === totalPages}
                                    className={cn(
                                        'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
                                        validPage === totalPages
                                            ? 'bg-muted/30 border-border text-muted cursor-not-allowed'
                                            : 'bg-background border-border text-foreground hover:border-primary hover:text-primary'
                                    )}
                                >
                                    {locale === 'id' ? 'Selanjutnya' : 'Next'}
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                        {/* Results info */}
                        <div className="text-center mt-6 text-sm text-muted">
                            {locale === 'id'
                                ? `Menampilkan ${(validPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(validPage * ITEMS_PER_PAGE, filteredTemplates.length)} dari ${filteredTemplates.length} template`
                                : `Showing ${(validPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(validPage * ITEMS_PER_PAGE, filteredTemplates.length)} of ${filteredTemplates.length} templates`
                            }
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-muted/5">
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted/20 mb-6">
                            {searchQuery ? (
                                <SearchX className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.5} />
                            ) : (
                                <LayoutTemplate className="w-16 h-16 text-muted-foreground/40" strokeWidth={1.5} />
                            )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                            {searchQuery
                                ? (locale === 'id' ? 'Tidak ada hasil' : 'No results found')
                                : (locale === 'id' ? 'Belum ada template' : 'No templates yet')}
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                            {searchQuery
                                ? (locale === 'id'
                                    ? `Oops! Kami tidak menemukan template untuk "${searchQuery}".`
                                    : `Oops! We couldn't find any templates matching "${searchQuery}".`)
                                : (locale === 'id'
                                    ? 'Template landing page akan segera hadir. Stay tuned!'
                                    : 'Landing page templates are coming soon. Stay tuned!')}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                            >
                                {locale === 'id' ? 'Hapus Pencarian' : 'Clear Search'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
