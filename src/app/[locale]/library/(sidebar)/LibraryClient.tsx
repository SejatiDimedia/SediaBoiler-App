'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Box, LayoutTemplate, SearchX } from 'lucide-react';
import { ComponentCard } from '@/components/library/ComponentCard';
import { componentRegistry } from '@/components/preview/registry';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 9;

interface ComponentItem {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: string;
    previewImage?: string | null;
}

interface LibraryPageClientProps {
    components: ComponentItem[];
    categories: string[];
    initialCategory?: string;
}

export function LibraryClient({ components, categories, initialCategory = 'all' }: LibraryPageClientProps) {
    const t = useTranslations('library');
    const locale = useLocale() as 'id' | 'en';
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize state
    const initialPage = parseInt(searchParams.get('page') || '1', 10);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Sync state if props change (navigation)
    useEffect(() => {
        setActiveCategory(initialCategory);
        setCurrentPage(1); // Reset page on category change
    }, [initialCategory]);

    const handleCategoryChange = (category: string) => {
        if (category === 'all') {
            router.push(`/${locale}/library`);
        } else {
            router.push(`/${locale}/library/${category}`);
        }
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
        // Scroll to top of grid
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredComponents = useMemo(() => {
        let result = components;

        // Filter by category
        if (activeCategory !== 'all') {
            result = result.filter(c => c.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.name[locale].toLowerCase().includes(query) ||
                c.description[locale].toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query)
            );
        }

        return result;
    }, [components, activeCategory, searchQuery, locale]);

    // Pagination
    const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE);
    const validPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    const paginatedComponents = useMemo(() => {
        const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
        return filteredComponents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredComponents, validPage]);

    // Reset to page 1 when search changes
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
                        {t('title')}
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Search */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 h-11 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                        />
                    </div>
                </div>

                {/* Component Grid */}
                {paginatedComponents.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedComponents.map((component) => {
                                const PreviewComponent = componentRegistry[component.slug];
                                return (
                                    <ComponentCard
                                        key={component.slug}
                                        slug={component.slug}
                                        name={component.name[locale]}
                                        description={component.description[locale]}
                                        category={component.category}
                                        viewLabel={t('viewDemo')}
                                        preview={PreviewComponent ? <PreviewComponent /> : undefined}
                                        image={component.previewImage ?? undefined}
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
                                                    ? 'bg-primary text-white'
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
                                ? `Menampilkan ${(validPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(validPage * ITEMS_PER_PAGE, filteredComponents.length)} dari ${filteredComponents.length} komponen`
                                : `Showing ${(validPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(validPage * ITEMS_PER_PAGE, filteredComponents.length)} of ${filteredComponents.length} components`
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
                                : (locale === 'id' ? 'Kategori kosong' : 'Empty Category')
                            }
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-base leading-relaxed">
                            {searchQuery
                                ? (locale === 'id'
                                    ? `Oops! Kami tidak menemukan komponen untuk "${searchQuery}".`
                                    : `Oops! We couldn't find any components matching "${searchQuery}".`)
                                : (locale === 'id'
                                    ? 'Belum ada komponen di kategori ini. Kami akan segera menambahkannya!'
                                    : 'There are no components in this category yet. We will add them soon!')
                            }
                        </p>
                        {
                            searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow"
                                >
                                    {locale === 'id' ? 'Hapus Pencarian' : 'Clear Search'}
                                </button>
                            )
                        }
                        {
                            !searchQuery && activeCategory !== 'all' && (
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-background border border-border text-foreground font-medium hover:bg-accent hover:border-accent-foreground/20 transition-all text-sm shadow-sm"
                                >
                                    {locale === 'id' ? 'Lihat Kategori Lain' : 'Browse Other Categories'}
                                </button>
                            )
                        }
                    </div >
                )
                }
            </div >
        </div >
    );
}
