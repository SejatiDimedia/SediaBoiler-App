'use client';

import { useRef, useState, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Smartphone, Languages, Palette, Settings, Heart } from 'lucide-react';

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border border-border bg-background/50 text-foreground shadow-sm transition-all duration-300 hover:shadow-2xl hover:bg-background/80 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export function FeaturesSpotlight() {
    const tFeatures = useTranslations('features');

    const features = [
        {
            icon: Copy,
            title: tFeatures('items.copyPaste.title'),
            description: tFeatures('items.copyPaste.description'),
            color: "text-blue-500",
        },
        {
            icon: Smartphone,
            title: tFeatures('items.responsive.title'),
            description: tFeatures('items.responsive.description'),
            color: "text-purple-500",
        },
        {
            icon: Languages,
            title: tFeatures('items.bilingual.title'),
            description: tFeatures('items.bilingual.description'),
            color: "text-green-500",
        },
        {
            icon: Palette,
            title: tFeatures('items.modern.title'),
            description: tFeatures('items.modern.description'),
            color: "text-pink-500",
        },
        {
            icon: Settings,
            title: tFeatures('items.customizable.title'),
            description: tFeatures('items.customizable.description'),
            color: "text-orange-500",
        },
        {
            icon: Heart,
            title: tFeatures('items.openSource.title'),
            description: tFeatures('items.openSource.description'),
            color: "text-red-500",
        },
    ];

    return (
        <section className="py-24 bg-accent/20 relative">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 font-semibold text-sm tracking-wide uppercase mb-6 shadow-sm">
                        Why SapaUI
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        {tFeatures('title')}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {tFeatures('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
                    {features.map((feature, index) => (
                        <SpotlightCard key={index} className="flex flex-col p-8 h-full group bg-gradient-to-br from-background via-background to-accent/20">
                            <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/50 ${feature.color} ring-1 ring-border group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground flex-grow leading-relaxed">
                                {feature.description}
                            </p>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
