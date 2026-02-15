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
                {/* Header */}
                <div className="text-center mb-12 relative">
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-brand-from/20 blur-[100px] rounded-full pointer-events-none" />

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight relative z-10">
                        <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                            {locale === 'id' ? 'Template Landing Page' : 'Landing Page Templates'}
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed relative z-10">
                        {locale === 'id'
                            ? 'Template halaman landing page siap pakai dalam satu file. Copy-paste, langsung jalan!'
                            : 'Ready-to-use landing page templates in a single file. Copy-paste and go!'}
                    </p>
                </div>

                {/* Search */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                        <input
                            type="text"
                            placeholder={locale === 'id' ? 'Cari template...' : 'Search templates...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 h-12 text-sm rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand-from focus:ring-4 focus:ring-brand-from/10 transition-all shadow-sm hover:border-brand-from/50 hover:shadow-md"
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
                            <div className="flex justify-center mt-12">
                                <div className="inline-flex items-center p-1.5 bg-background/80 backdrop-blur-md border border-border/60 rounded-full shadow-lg shadow-brand-from/5 gap-1">
                                    <button
                                        onClick={() => handlePageChange(validPage - 1)}
                                        disabled={validPage === 1}
                                        className={cn(
                                            'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
                                            validPage === 1
                                                ? 'text-muted-foreground/30 cursor-not-allowed'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground hover:rotate-[-10deg]'
                                        )}
                                        title={locale === 'id' ? 'Sebelumnya' : 'Previous'}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    <div className="flex items-center gap-1 px-2 border-x border-border/30 mx-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={cn(
                                                    'w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden',
                                                    page === validPage
                                                        ? 'text-white font-bold shadow-md shadow-brand-from/30 scale-110 z-10'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent hover:scale-105'
                                                )}
                                            >
                                                {page === validPage && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-from to-brand-to animate-in fade-in zoom-in duration-300" />
                                                )}
                                                <span className="relative z-10">{page}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(validPage + 1)}
                                        disabled={validPage === totalPages}
                                        className={cn(
                                            'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
                                            validPage === totalPages
                                                ? 'text-muted-foreground/30 cursor-not-allowed'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground hover:rotate-[10deg]'
                                        )}
                                        title={locale === 'id' ? 'Selanjutnya' : 'Next'}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
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
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-border/60 rounded-3xl bg-background/50 backdrop-blur-sm">
                        <div className="relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-from/20 to-brand-to/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70" />
                            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-background to-accent/50 border border-border/50 flex items-center justify-center shadow-lg group-hover:shadow-brand-from/10 transition-all duration-500 group-hover:scale-105">
                                {searchQuery ? (
                                    <SearchX className="w-10 h-10 text-muted-foreground group-hover:text-brand-from transition-colors duration-300" strokeWidth={1.5} />
                                ) : (
                                    <LayoutTemplate className="w-10 h-10 text-muted-foreground group-hover:text-brand-from transition-colors duration-300" strokeWidth={1.5} />
                                )}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3">
                            {searchQuery
                                ? (locale === 'id' ? 'Tidak ada hasil ditemukan' : 'No results found')
                                : (locale === 'id' ? 'Belum ada template' : 'No templates yet')}
                        </h3>

                        <p className="text-muted-foreground max-w-sm mx-auto mb-8 text-sm leading-relaxed">
                            {searchQuery
                                ? (locale === 'id'
                                    ? `Kami tidak dapat menemukan template yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                                    : `We couldn't find any templates matching "${searchQuery}". Try different keywords.`)
                                : (locale === 'id'
                                    ? 'Koleksi template landing page kami sedang dalam proses pembuatan. Segera hadir!'
                                    : 'Our landing page template collection is in the works. Coming soon!')}
                        </p>

                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-accent/80 text-foreground font-medium text-sm transition-all border border-border/50 hover:border-brand-from/30 hover:shadow-lg hover:shadow-brand-from/5 group"
                            >
                                <SearchX className="w-4 h-4 group-hover:text-brand-from transition-colors" />
                                {locale === 'id' ? 'Hapus Pencarian' : 'Clear Search'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
