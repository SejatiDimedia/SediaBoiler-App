'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LayoutDashboard, ShoppingCart, Rocket, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function FeaturedTemplates() {
    const t = useTranslations('featuredTemplates');
    const [activeId, setActiveId] = useState<string | null>('landing');

    const templates = [
        {
            id: 'dashboard',
            title: t('items.dashboard.title'),
            category: t('items.dashboard.category'),
            description: t('items.dashboard.description'),
            icon: LayoutDashboard,
            gradient: "from-blue-600 to-cyan-600",
            bgImage: "/images/dashboard-template-blue.png"
        },
        {
            id: 'landing',
            title: t('items.landing.title'),
            category: t('items.landing.category'),
            description: t('items.landing.description'),
            icon: Rocket,
            gradient: "from-blue-600 to-cyan-600",
            bgImage: "/images/landing-template-blue.png"
        },
        {
            id: 'ecommerce',
            title: t('items.ecommerce.title'),
            category: t('items.ecommerce.category'),
            description: t('items.ecommerce.description'),
            icon: ShoppingCart,
            gradient: "from-blue-600 to-cyan-600",
            bgImage: "/images/ecommerce-template-blue.png"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-from/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
                            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to">{t('titleHighlight')}</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-md">
                            {t('description')}
                        </p>
                    </div>
                </div>

                {/* Cinematic Accordion */}
                <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
                    {templates.map((template) => {
                        const isActive = activeId === template.id;

                        // Map IDs to template routes
                        const templateMap: Record<string, string> = {
                            'dashboard': '/templates', // Placeholder until specific dashboard template exists
                            'landing': '/templates',
                            'ecommerce': '/templates' // Placeholder until specific ecommerce template exists
                        };

                        const linkHref = templateMap[template.id] || '/templates';

                        return (
                            <motion.div
                                key={template.id}
                                layout
                                onClick={() => setActiveId(template.id)}
                                onMouseEnter={() => setActiveId(template.id)}
                                className={cn(
                                    "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-white/10",
                                    isActive ? "flex-[3]" : "flex-[1] min-w-[80px] md:min-w-[100px] opacity-70 hover:opacity-100"
                                )}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <div className={cn(
                                        "absolute inset-0 bg-cover bg-center transition-transform duration-1000",
                                        isActive ? "scale-100" : "scale-110"
                                    )} style={{ backgroundImage: `url(${template.bgImage})` }} />
                                    <div className={cn("absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90", isActive ? "opacity-80" : "opacity-90")} />
                                    <div className={cn("absolute inset-0 bg-gradient-to-br mix-blend-overlay opacity-30", template.gradient)} />
                                </div>

                                {/* Content Container */}
                                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                    <AnimatePresence mode="wait">
                                        {isActive ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="w-full"
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className={cn("p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white")}>
                                                        <template.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-medium tracking-wider uppercase text-white/80">{template.category}</span>
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                                    {template.title}
                                                </h3>
                                                <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg line-clamp-2 md:line-clamp-none">
                                                    {template.description}
                                                </p>
                                                <Link href={linkHref}>
                                                    <Button className="rounded-full bg-gradient-to-r from-brand-from to-brand-to text-white hover:opacity-90 hover:scale-[1.02] transition-all duration-300 font-medium px-6 h-11 md:px-8 md:h-12 gap-2 group/btn border-none shadow-lg shadow-brand-from/20">
                                                        {t('cta')}
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="md:rotate-180 w-full h-full flex items-center justify-center"
                                                >
                                                    <div
                                                        className="flex items-center gap-4 py-8"
                                                        style={{ writingMode: 'horizontal-tb' }}
                                                    >
                                                        {/* Mobile: Horizontal Text */}
                                                        <h3 className="md:hidden text-xl font-bold text-white tracking-widest uppercase whitespace-nowrap">
                                                            {template.title}
                                                        </h3>

                                                        {/* Desktop: Vertical Text */}
                                                        <h3
                                                            className="hidden md:block text-2xl font-bold text-white tracking-widest uppercase whitespace-nowrap"
                                                            style={{ writingMode: 'vertical-rl' }}
                                                        >
                                                            {template.title}
                                                        </h3>
                                                        <ChevronRight className="w-5 h-5 text-white/50 animate-pulse hidden md:block rotate-90" />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
