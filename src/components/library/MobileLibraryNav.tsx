'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LibrarySidebarContent } from './LibrarySidebarContent';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Category {
    id: number;
    slug: string;
    name: string | { id: string; en: string };
    icon?: string | null;
}

interface MobileLibraryNavProps {
    categories: Category[];
    locale: 'id' | 'en';
}

export function MobileLibraryNav({ categories, locale }: MobileLibraryNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('library');

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="lg:hidden">
            {/* Floating Action Button (FAB) or Sticky Header Trigger */}
            {/* We'll use a sticky header bar for mobile */}
            <div className="sticky top-16 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-between supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                        {t('title')}
                    </span>
                </div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-from/10 text-brand-from hover:bg-brand-from/20 transition-colors shadow-sm shadow-brand-from/5"
                >
                    <Menu className="w-4 h-4" />
                    {locale === 'id' ? 'Menu' : 'Menu'}
                </button>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r border-border shadow-2xl transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Close Button - Absolute to top right of drawer */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <LibrarySidebarContent
                    categories={categories}
                    locale={locale}
                    onNavigate={() => setIsOpen(false)}
                />
            </div>
        </div>
    );
}
