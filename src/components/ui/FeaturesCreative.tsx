'use client';

import { useTranslations } from 'next-intl';
import { Copy, Smartphone, Languages, Palette, Settings, Heart, Zap, Shield, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FeaturesCreative() {
    const tFeatures = useTranslations('features');

    // Mapped manually for creative layout purposes
    const items = [
        {
            icon: Copy,
            title: tFeatures('items.copyPaste.title'),
            desc: tFeatures('items.copyPaste.description'),
            className: "md:col-span-2",
            bg: "from-brand-from/20 to-brand-to/20",
            iconColor: "text-brand-from",
        },
        {
            icon: Palette,
            title: tFeatures('items.modern.title'),
            desc: tFeatures('items.modern.description'),
            className: "md:row-span-2",
            bg: "from-brand-to/20 to-brand-from/20",
            iconColor: "text-brand-to",
        },
        {
            icon: Smartphone,
            title: tFeatures('items.responsive.title'),
            desc: tFeatures('items.responsive.description'),
            className: "",
            bg: "from-brand-from/20 to-brand-to/20",
            iconColor: "text-brand-from",
        },
        {
            icon: Languages,
            title: tFeatures('items.bilingual.title'),
            desc: tFeatures('items.bilingual.description'),
            className: "",
            bg: "from-brand-to/20 to-brand-from/20",
            iconColor: "text-brand-to",
        },
        {
            icon: Settings,
            title: "Fully Configured",
            desc: "TypeScript, ESLint, Prettier, and more out of the box.",
            className: "md:col-span-2",
            bg: "from-brand-from/20 to-brand-to/20",
            iconColor: "text-brand-from",
        },
    ];

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground mb-6 leading-[0.9]">
                            {tFeatures('creativeTitlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to">{tFeatures('creativeTitleHighlight')}</span>
                        </h2>
                        <p className="text-sm md:text-xl text-muted-foreground">
                            {tFeatures('creativeSubtitle')}
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="animate-spin-slow w-24 h-24 border-2 border-dashed border-border rounded-full flex items-center justify-center opacity-20">
                            <Rocket className="w-10 h-10 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl bg-accent/30 border border-white/10 p-8 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:bg-accent/50 hover:shadow-2xl hover:shadow-brand-from/10",
                                item.className
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", item.bg)} />

                            <div className="relative z-10">
                                <div className={cn("w-12 h-12 rounded-xl bg-background/80 backdrop-blur border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform", item.iconColor)}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg md:text-2xl font-bold mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
