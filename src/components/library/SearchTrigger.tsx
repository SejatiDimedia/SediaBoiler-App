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

export function SearchTrigger({ components: initialComponents = [], className }: SearchTriggerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [components, setComponents] = useState<ComponentItem[]>(initialComponents);
    const t = useTranslations('search');

    // Fetch components on mount if not provided
    useEffect(() => {
        if (components.length === 0) {
            fetch('/api/search-index')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setComponents(data);
                    }
                })
                .catch(err => console.error('Failed to load search index:', err));
        }
    }, [components.length]);

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
                    "text-muted-foreground hover:text-foreground transition-colors p-2",
                    className
                )}
                aria-label={t('trigger')}
            >
                <Search className="h-5 w-5" />
            </button>

            <SearchModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                components={components}
            />
        </>
    );
}
