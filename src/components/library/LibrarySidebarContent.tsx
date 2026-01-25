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

interface LibrarySidebarContentProps {
    categories: Category[];
    locale: 'id' | 'en';
    collapsed?: boolean;
    onNavigate?: () => void;
}

// Map category slugs to appropriate icons
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'navbar': Navigation,
    'hero': Sparkles,
    'features': Grid3X3,
    'footer': FileText,
    'pricing': Layers,
    'contact': MessageSquare,
    'gallery': Image,
    'sidebar': Layers,
    'default': Component,
};

function getCategoryIcon(slug: string) {
    return categoryIcons[slug] || categoryIcons['default'];
}

export function LibrarySidebarContent({ categories, locale, collapsed = false, onNavigate }: LibrarySidebarContentProps) {
    const pathname = usePathname();
    const isAllComponents = pathname === `/${locale}/library`;

    return (
        <div className="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Header */}
            <div className={cn(
                "border-b border-border/40 shrink-0 transition-all duration-300",
                collapsed ? "p-3 flex justify-center" : "p-5"
            )}>
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-from to-brand-to flex items-center justify-center shadow-lg shadow-brand-from/20 shrink-0">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="animate-in fade-in duration-300">
                            <h2 className="font-bold text-foreground">
                                {locale === 'id' ? 'Komponen' : 'Components'}
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                {locale === 'id' ? 'Siap pakai' : 'Ready to use'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                <nav className="space-y-6">
                    {/* Quick Access */}
                    <div>
                        {!collapsed && (
                            <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3 animate-in fade-in duration-300">
                                {locale === 'id' ? 'Akses Cepat' : 'Quick Access'}
                            </h4>
                        )}
                        <Link
                            href="/library"
                            onClick={onNavigate}
                            title={collapsed ? (locale === 'id' ? 'Semua Komponen' : 'All Components') : undefined}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                collapsed && "justify-center px-0",
                                isAllComponents
                                    ? "bg-gradient-to-r from-brand-from to-brand-to text-white shadow-lg shadow-brand-from/25"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0",
                                isAllComponents
                                    ? "bg-white/20"
                                    : "bg-accent group-hover:bg-brand-from/10"
                            )}>
                                <LayoutTemplate className={cn(
                                    "w-4 h-4",
                                    isAllComponents ? "text-white" : "text-muted-foreground group-hover:text-brand-from"
                                )} />
                            </div>
                            {!collapsed && (
                                <>
                                    <span className="font-medium text-sm whitespace-nowrap animate-in fade-in duration-300">
                                        {locale === 'id' ? 'Semua Komponen' : 'All Components'}
                                    </span>
                                    {isAllComponents && (
                                        <ChevronRight className="w-4 h-4 ml-auto animate-in fade-in duration-300" />
                                    )}
                                </>
                            )}
                        </Link>
                    </div>

                    {/* Categories */}
                    <div>
                        {!collapsed && (
                            <h4 className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3 animate-in fade-in duration-300">
                                {locale === 'id' ? 'Kategori' : 'Categories'}
                            </h4>
                        )}
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
                                        onClick={onNavigate}
                                        title={collapsed ? categoryName : undefined}
                                        className={cn(
                                            "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                            collapsed && "justify-center px-0",
                                            isActive
                                                ? "bg-accent/80 text-foreground border border-border/60"
                                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0",
                                            isActive
                                                ? "bg-brand-from/10 border border-brand-from/20"
                                                : "bg-accent/50 group-hover:bg-brand-from/10"
                                        )}>
                                            <IconComponent className={cn(
                                                "w-4 h-4 transition-colors",
                                                isActive ? "text-brand-from" : "text-muted-foreground group-hover:text-brand-from"
                                            )} />
                                        </div>
                                        {!collapsed && (
                                            <>
                                                <span className={cn(
                                                    "font-medium text-sm capitalize whitespace-nowrap animate-in fade-in duration-300",
                                                    isActive && "text-foreground"
                                                )}>
                                                    {categoryName}
                                                </span>
                                                {isActive && (
                                                    <div className="ml-auto flex items-center gap-1 animate-in fade-in duration-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-from to-brand-to animate-pulse" />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Footer */}
            <div className={cn(
                "border-t border-border/40 shrink-0 transition-all duration-300",
                collapsed ? "p-3" : "p-4"
            )}>
                {!collapsed ? (
                    <div className="px-3 py-3 rounded-xl bg-gradient-to-r from-brand-from/5 via-brand-to/10 to-brand-from/5 border border-brand-from/10 animate-in fade-in duration-300">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {locale === 'id'
                                ? '💡 Klik kategori untuk melihat komponen yang tersedia.'
                                : '💡 Click a category to browse available components.'}
                        </p>
                    </div>
                ) : (
                    <div className="w-10 h-10 mx-auto rounded-lg bg-accent/50 flex items-center justify-center">
                        <Component className="w-5 h-5 text-muted-foreground" />
                    </div>
                )}
            </div>
        </div>
    );
}
