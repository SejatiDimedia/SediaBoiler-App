'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    Search,
    X,
    Navigation,
    Sparkles,
    Grid3X3,
    CreditCard,
    LayoutTemplate,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentItem {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: string;
}

interface CategoryInfo {
    name: string;
    icon: typeof Navigation;
    count: number;
    description: { id: string; en: string };
    components: ComponentItem[];
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    components: ComponentItem[];
}

const categoryIcons: Record<string, typeof Navigation> = {
    navbar: Navigation,
    hero: Sparkles,
    features: Grid3X3,
    pricing: CreditCard,
    footer: LayoutTemplate,
};

const categoryDescriptions: Record<string, { id: string; en: string }> = {
    navbar: {
        id: 'Komponen navigasi dengan berbagai gaya dan fitur',
        en: 'Navigation components with various styles and features'
    },
    hero: {
        id: 'Section hero yang menarik untuk landing page',
        en: 'Eye-catching hero sections for landing pages'
    },
    features: {
        id: 'Section fitur untuk menampilkan keunggulan produk',
        en: 'Feature sections to showcase product benefits'
    },
    pricing: {
        id: 'Tabel harga dan paket berlangganan',
        en: 'Pricing tables and subscription packages'
    },
    footer: {
        id: 'Footer dengan berbagai layout dan informasi',
        en: 'Footers with various layouts and information'
    },
};

export function SearchModal({ isOpen, onClose, components }: SearchModalProps) {
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const locale = useLocale() as 'id' | 'en';
    const t = useTranslations('search');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Group components by category
    const categories = useCallback((): CategoryInfo[] => {
        const grouped: Record<string, ComponentItem[]> = {};

        components.forEach(comp => {
            if (!grouped[comp.category]) {
                grouped[comp.category] = [];
            }
            grouped[comp.category].push(comp);
        });

        return Object.entries(grouped).map(([cat, comps]) => ({
            name: cat,
            icon: categoryIcons[cat] || Grid3X3,
            count: comps.length,
            description: categoryDescriptions[cat] || { id: '', en: '' },
            components: comps,
        }));
    }, [components]);

    // Filter categories and components based on query
    const filteredCategories = useCallback(() => {
        if (!query.trim()) return categories();

        const q = query.toLowerCase();
        return categories().filter(cat => {
            // Check if category name matches
            if (cat.name.toLowerCase().includes(q)) return true;
            // Check if any component in category matches
            return cat.components.some(
                comp =>
                    comp.name[locale].toLowerCase().includes(q) ||
                    comp.description[locale].toLowerCase().includes(q) ||
                    comp.slug.toLowerCase().includes(q)
            );
        }).map(cat => ({
            ...cat,
            // If query matches category, show all components
            // Otherwise filter to matching ones
            components: cat.name.toLowerCase().includes(q)
                ? cat.components
                : cat.components.filter(
                    comp =>
                        comp.name[locale].toLowerCase().includes(q) ||
                        comp.description[locale].toLowerCase().includes(q) ||
                        comp.slug.toLowerCase().includes(q)
                ),
        }));
    }, [query, categories, locale]);

    const totalResults = filteredCategories().reduce((sum, cat) => sum + cat.components.length, 0);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!isOpen) {
            setQuery('');
        }
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleCategoryClick = (category: string) => {
        router.push(`/${locale}/library?category=${category}`);
        onClose();
    };

    const handleComponentClick = (slug: string) => {
        router.push(`/${locale}/library/${slug}`);
        onClose();
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] isolate">
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-start justify-center pt-[10vh] px-4 pb-4">
                    <div className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div
                            className={cn(
                                "flex items-center gap-3 p-4 border-b transition-all duration-300 ease-out",
                                isFocused
                                    ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.05)] bg-accent/30"
                                    : "border-border bg-transparent"
                            )}
                        >
                            <Search
                                className={cn(
                                    "h-5 w-5 transition-colors duration-300",
                                    isFocused ? "text-primary" : "text-muted"
                                )}
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={t('placeholder')}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="flex-1 bg-transparent !border-none !outline-none focus:!outline-none focus:!ring-0 focus:!border-none !shadow-none !appearance-none text-foreground placeholder:text-muted/70 text-lg caret-primary p-0 m-0"
                                autoFocus
                            />
                            {query && (
                                <button
                                    onClick={() => {
                                        setQuery('');
                                        inputRef.current?.focus();
                                    }}
                                    className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-muted transition mr-1"
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                            <div className="h-6 w-px bg-border mx-1" />
                            <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted/20 px-1.5 font-mono text-[10px] font-medium text-muted opacity-100">
                                <span className="text-xs">ESC</span>
                            </kbd>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            {filteredCategories().length > 0 ? (
                                <div className="grid gap-3">
                                    {filteredCategories().map((category) => {
                                        const Icon = category.icon;
                                        return (
                                            <button
                                                key={category.name}
                                                onClick={() => handleCategoryClick(category.name)}
                                                className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-accent/30 hover:bg-accent hover:border-primary/30 transition-all text-left"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-foreground capitalize group-hover:text-primary transition">
                                                            {category.name}
                                                        </h3>
                                                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                            {category.count} {t('components')}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-muted line-clamp-1">
                                                        {category.description[locale]}
                                                    </p>
                                                </div>
                                                <ArrowRight className="h-5 w-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Search className="h-12 w-12 text-muted mx-auto mb-4" />
                                    <p className="text-muted">{t('noResults')}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-accent/30 text-sm">
                            <span className="text-muted">
                                {totalResults} {t('available')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
