'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutTemplate,
    Layers,
    ChevronRight,
    Sparkles,
    Component,
    Code2,
    Navigation,
    FileText,
    MessageSquare,
    Image,
    Settings,
    Grid3X3
} from 'lucide-react';

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

// Map category slugs to appropriate icons
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'hero': Sparkles,
    'navbar': Navigation,
    'footer': FileText,
    'sidebar': Layers,
    'contact': MessageSquare,
    'features': Grid3X3,
    'gallery': Image,
    'settings': Settings,
    'default': Component,
};

function getCategoryIcon(slug: string) {
    return categoryIcons[slug] || categoryIcons['default'];
}

export function LibrarySidebar({ categories, locale }: LibrarySidebarProps) {
    const pathname = usePathname();
    const isAllComponents = pathname === `/${locale}/library`;

    return (
        <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-border/40 bg-gradient-to-b from-background via-background to-accent/5 min-h-[calc(100vh-4rem)] sticky top-16">
            {/* Header */}
            <div className="p-5 border-b border-border/40">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center border border-primary/20">
                        <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-bold text-foreground">
                            {locale === 'id' ? 'Komponen' : 'Components'}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {locale === 'id' ? 'Siap pakai' : 'Ready to use'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-6">
                    {/* Quick Access */}
                    <div>
                        <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">
                            {locale === 'id' ? 'Akses Cepat' : 'Quick Access'}
                        </h4>
                        <Link
                            href="/library"
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                isAllComponents
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                isAllComponents
                                    ? "bg-white/20"
                                    : "bg-accent group-hover:bg-primary/10"
                            )}>
                                <LayoutTemplate className={cn(
                                    "w-4 h-4",
                                    isAllComponents ? "text-white" : "text-muted-foreground group-hover:text-primary"
                                )} />
                            </div>
                            <span className="font-medium text-sm">
                                {locale === 'id' ? 'Semua Komponen' : 'All Components'}
                            </span>
                            {isAllComponents && (
                                <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                        </Link>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">
                            {locale === 'id' ? 'Kategori' : 'Categories'}
                        </h4>
                        <div className="space-y-1">
                            {categories.map((category) => {
                                const isActive = pathname.includes(`/library/${category.slug}`);
                                const IconComponent = getCategoryIcon(category.slug);
                                const categoryName = typeof category.name === 'string'
                                    ? category.name
                                    : category.name[locale];

                                return (
                                    <Link
                                        key={category.id}
                                        href={`/library/${category.slug}`}
                                        className={cn(
                                            "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                            isActive
                                                ? "bg-accent/80 text-foreground border border-border/60"
                                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                            isActive
                                                ? "bg-primary/10 border border-primary/20"
                                                : "bg-accent/50 group-hover:bg-primary/10"
                                        )}>
                                            <IconComponent className={cn(
                                                "w-4 h-4 transition-colors",
                                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                                            )} />
                                        </div>
                                        <span className={cn(
                                            "font-medium text-sm capitalize",
                                            isActive && "text-foreground"
                                        )}>
                                            {categoryName}
                                        </span>
                                        {isActive && (
                                            <div className="ml-auto flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/40">
                <div className="px-3 py-3 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {locale === 'id'
                            ? '💡 Klik kategori untuk melihat komponen yang tersedia.'
                            : '💡 Click a category to browse available components.'}
                    </p>
                </div>
            </div>
        </aside>
    );
}
