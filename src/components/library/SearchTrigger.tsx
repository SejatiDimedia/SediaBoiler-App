'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Command } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { cn } from '@/lib/utils';

interface ComponentItem {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: string;
}

interface SearchTriggerProps {
    components: ComponentItem[];
    className?: string;
}

export function SearchTrigger({ components, className }: SearchTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('search');

    // Handle Cmd+K / Ctrl+K keyboard shortcut
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-accent/50 hover:bg-accent text-muted hover:text-foreground transition-all group",
                    className
                )}
            >
                <Search className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">{t('trigger')}</span>
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background border border-border text-xs font-mono">
                    <Command className="h-3 w-3" />K
                </kbd>
            </button>

            <SearchModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                components={components}
            />
        </>
    );
}
