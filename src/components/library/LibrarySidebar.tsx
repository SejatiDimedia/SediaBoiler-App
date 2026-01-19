'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LibrarySidebarContent } from './LibrarySidebarContent';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Category {
    id: number;
    slug: string;
    name: string | { id: string; en: string };
    icon?: string | null;
}

interface LibrarySidebarProps {
    categories: Category[];
    locale: 'id' | 'en';
}

export function LibrarySidebar({ categories, locale }: LibrarySidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col shrink-0 border-r border-border/40 bg-gradient-to-b from-background via-background to-accent/5 min-h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ease-in-out relative group",
                isCollapsed ? "w-[80px]" : "w-72"
            )}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                    "absolute -right-3 top-6 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-foreground hover:shadow-md transition-all duration-200",
                    "opacity-0 group-hover:opacity-100", // Show on hover
                    isCollapsed && "opacity-100 -right-3" // Always show when collapsed or maybe keep it consistent
                )}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                {isCollapsed ? (
                    <ChevronRight className="h-3 w-3" />
                ) : (
                    <ChevronLeft className="h-3 w-3" />
                )}
            </button>

            <LibrarySidebarContent
                categories={categories}
                locale={locale}
                collapsed={isCollapsed}
            />
        </aside>
    );
}
