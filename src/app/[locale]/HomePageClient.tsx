"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
    Copy,
    Smartphone,
    Languages,
    Palette,
    Settings,
    Heart,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Zap,
    Code2,
    Database,
    LayoutTemplate,
    Shield,
    Box,
    Layout
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { TechStack } from '@/components/ui/TechStack';
import { FeaturesCreative } from '@/components/ui/FeaturesCreative';
import { FAQ } from '@/components/ui/FAQ';
import { CTASection } from '@/components/ui/CTASection';

export function HomePageClient({ locale }: { locale: string }) {
    const t = useTranslations('hero');
    const tFeatures = useTranslations('features');

    const features = [
        {
            icon: Copy,
            title: tFeatures('items.copyPaste.title'),
            description: tFeatures('items.copyPaste.description'),
            color: "text-brand-from",
            bg: "bg-brand-from/10",
        },
        {
            icon: Smartphone,
            title: tFeatures('items.responsive.title'),
            description: tFeatures('items.responsive.description'),
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            icon: Languages,
            title: tFeatures('items.bilingual.title'),
            description: tFeatures('items.bilingual.description'),
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            icon: Palette,
            title: tFeatures('items.modern.title'),
            description: tFeatures('items.modern.description'),
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
        {
            icon: Settings,
            title: tFeatures('items.customizable.title'),
            description: tFeatures('items.customizable.description'),
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            icon: Heart,
            title: tFeatures('items.openSource.title'),
            description: tFeatures('items.openSource.description'),
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Hero Section - Split Layout */}
            <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 lg:pt-32 lg:pb-40">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-from to-brand-to" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-to to-brand-from" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 lg:items-start items-center">

                        {/* LEFT: Typography & Content */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10 text-pretty lg:pt-0 lg:mt-5">
                            {/* Badge */}
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100 inline-flex items-center gap-2 rounded-full border border-brand-from/20 bg-gradient-to-r from-brand-from/10 to-brand-to/5 px-4 py-1.5 mb-8 backdrop-blur-sm shadow-sm shadow-brand-from/5">
                                <Sparkles className="h-3.5 w-3.5 text-brand-from animate-pulse" />
                                <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-from to-brand-to uppercase tracking-wide">{t('badge')}</span>
                            </div>

                            {/* Title */}
                            <h1 className="animate-in fade-in slide-in-from-left-6 duration-700 delay-200 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                                {t('title')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to animate-gradient">
                                    {t('titleHighlight')}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="animate-in fade-in slide-in-from-left-6 duration-700 delay-300 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                {t('description')}
                            </p>

                            {/* CTAs */}
                            <div className="animate-in fade-in zoom-in duration-700 delay-400 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center lg:justify-start">
                                <Link href="/library">
                                    <Button variant="premium" size="lg" className="w-full sm:w-auto gap-2 from-brand-from to-brand-to hover:from-brand-from/90 hover:to-brand-to/90 shadow-lg shadow-brand-from/20 text-white rounded-full px-8 border-none">
                                        {t('cta')}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT: Visual / Illustration */}
                        <div className="relative w-full perspective-1000 lg:h-[600px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                            <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[600px] transform lg:rotate-y-[-12deg] lg:rotate-x-[5deg] transition-transform duration-500 hover:rotate-0 preserve-3d scale-[0.95] sm:scale-100">

                                {/* Glow behind illustration */}
                                <div className="absolute inset-0 bg-brand-from/20 blur-[100px] -z-10 rounded-full" />

                                {/* Moving Transfer Element (The "Copy-Paste" Action) */}
                                <div className="absolute z-50 top-[30%] left-[30%] animate-[transfer_4s_ease-in-out_infinite] hidden md:block pointer-events-none">
                                    <div className="flex items-center gap-2 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/20">
                                        <Copy className="w-3 h-3" />
                                        <span>Component.tsx</span>
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-white/50 to-transparent blur-[1px]" />
                                </div>

                                {/* Top Layer: Component Library (Source) */}
                                <div className="relative group z-20 translate-x-0 translate-y-0 lg:translate-x-0 lg:translate-y-0 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                                    <div className="absolute -inset-1 bg-gradient-to-tr from-brand-to to-brand-from rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                    <div className="relative rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden h-[300px] sm:h-[340px] w-full flex flex-col ring-1 ring-white/10">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400/20" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-400/20" />
                                            </div>
                                            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Sapa Lib</div>
                                        </div>

                                        {/* Library Content */}
                                        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                                            <div className="space-y-2">
                                                <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                                                <div className="h-2 w-1/2 bg-muted/50 rounded" />
                                            </div>

                                            {/* The Component Card being "Copied" */}
                                            <div className="relative group/card cursor-pointer">
                                                <div className="absolute inset-0 bg-brand-from/10 rounded-xl blur-xl group-hover/card:bg-brand-from/20 transition-all" />
                                                <div className="relative bg-card border border-border rounded-xl p-3 sm:p-4 transition-all group-hover/card:border-brand-from/50 group-hover/card:shadow-lg hover:-translate-y-1">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-brand-from/10 flex items-center justify-center text-brand-from">
                                                                <Layout className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-sm">Hero Section</div>
                                                                <div className="text-[10px] text-muted-foreground">Layouts</div>
                                                            </div>
                                                        </div>
                                                        <div className="h-6 w-16 bg-brand-from text-white rounded-md text-[10px] font-bold flex items-center justify-center shadow-lg shadow-brand-from/20">
                                                            Copy
                                                        </div>
                                                    </div>
                                                    <div className="h-16 sm:h-20 bg-muted/10 rounded-lg border border-border/50 border-dashed flex items-center justify-center">
                                                        <div className="w-1/2 h-2 bg-muted/20 rounded-full" />
                                                    </div>
                                                </div>

                                                {/* Fake Cursor clicking Copy */}
                                                <div className="absolute top-4 right-8 w-6 h-6 z-50 pointer-events-none animate-[cursor_click_4s_ease-in-out_infinite]">
                                                    <svg className="w-full h-full text-foreground drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M5.5 3.21l12.7 10.9-6.3.7-2.7 7.5L5.5 3.2z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="h-20 sm:h-24 bg-muted/5 rounded-xl border border-border/30 border-dashed" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Layer: Code Editor (Destination) */}
                                <div className="relative z-10 translate-x-4 -translate-y-10 sm:translate-x-12 sm:-translate-y-24 lg:translate-x-20 lg:-translate-y-32 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-from to-brand-to rounded-2xl blur opacity-30" />
                                    <div className="relative rounded-xl border border-white/10 bg-[#0F172A] shadow-2xl overflow-hidden h-[260px] sm:h-[300px] w-full max-w-[340px] flex flex-col ring-1 ring-white/5 mx-auto">
                                        <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-white/5">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-mono">page.tsx</div>
                                        </div>
                                        <div className="p-4 text-left font-mono text-[10px] sm:text-xs overflow-hidden flex-1 relative bg-[#0F172A]">
                                            <div className="flex flex-col text-slate-400">
                                                <span><span className="text-purple-400">import</span> <span className="text-blue-300">&#123; Button &#125;</span> <span className="text-purple-400">from</span> <span className="text-green-300">'@ui'</span>;</span>
                                                <span className="h-4" />
                                                <span><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">Page</span>() &#123;</span>
                                                <span className="pl-4"><span className="text-purple-400">return</span> (</span>
                                                <span className="pl-8 text-slate-300">&lt;<span className="text-pink-400">main</span>&gt;</span>

                                                {/* Typing Effect Area */}
                                                <div className="pl-12 py-1 my-1 bg-brand-from/10 border-l-2 border-brand-from animate-[pulse_4s_ease-in-out_infinite]">
                                                    <span className="text-yellow-300">&lt;HeroSection /&gt;</span>
                                                </div>

                                                <span className="pl-8 text-slate-300">&lt;/<span className="text-pink-400">main</span>&gt;</span>
                                                <span className="pl-4">);</span>
                                                <span>&#125;</span>
                                            </div>
                                        </div>
                                        {/* Pasted Toast */}
                                        <div className="absolute bottom-4 right-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-[intro_pop_4s_ease-in-out_infinite]">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Pasted!
                                        </div>
                                    </div>
                                </div>

                                {/* Custom Styles for Keyframes (Inline for simplicity in this component) */}
                                <style jsx>{`
                                    @keyframes transfer {
                                        0%, 15% { opacity: 0; transform: translate(0, 0) scale(0.5); }
                                        20% { opacity: 1; transform: translate(10px, -20px) scale(1); }
                                        40% { transform: translate(60px, 40px) scale(1.1); }
                                        50% { opacity: 1; transform: translate(120px, 80px) scale(0.8); }
                                        70%, 100% { opacity: 0; transform: translate(140px, 100px) scale(0); }
                                    }
                                    @keyframes cursor_click {
                                        0%, 10% { transform: translate(0, 0); }
                                        15% { transform: scale(0.9); }
                                        20% { transform: scale(1); }
                                        100% { transform: translate(0, 0); }
                                    }
                                    @keyframes intro_pop {
                                        0%, 45% { transform: translateY(10px); opacity: 0; }
                                        50% { transform: translateY(0); opacity: 1; }
                                        70% { transform: translateY(0); opacity: 1; }
                                        80%, 100% { transform: translateY(-10px); opacity: 0; }
                                    }
                                `}</style>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Tech Stack Marquee */}
            <div className="mt-[-2px] border-b border-border bg-background">
                <TechStack />
            </div>

            {/* Features Section - Creative Grid */}
            <FeaturesCreative />

            {/* CTA Section */}
            <CTASection />

            {/* FAQ Section */}
            <FAQ />

        </div>
    );
}
