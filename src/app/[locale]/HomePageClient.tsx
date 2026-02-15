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
    Zap,
    Code2,
    Database,
    LayoutTemplate,
    Shield,
    Box
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { TechStack } from '@/components/ui/TechStack';
import { FeaturesCreative } from '@/components/ui/FeaturesCreative';
import { FAQ } from '@/components/ui/FAQ';
import { CTASection } from '@/components/ui/CTASection';
import { NewsletterSection } from '@/components/ui/NewsletterSection';
import { HeroIllustration } from '@/components/ui/HeroIllustration';
import { SocialProof } from '@/components/ui/SocialProof';
import { FeaturedTemplates } from '@/components/ui/FeaturedTemplates';

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
            <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
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
                            <p className="animate-in fade-in slide-in-from-left-6 duration-700 delay-300 text-base md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                {t('description')}
                            </p>

                            {/* Social Proof */}
                            <div className="animate-in fade-in slide-in-from-left-6 duration-700 delay-350 mb-8 mx-auto lg:mx-0 flex justify-center lg:justify-start">
                                <SocialProof />
                            </div>

                            {/* CTAs */}
                            <div className="animate-in fade-in zoom-in duration-700 delay-400 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center lg:justify-start">
                                <Link href="/library">
                                    <Button variant="premium" size="lg" className="w-full sm:w-auto gap-2 from-brand-from to-brand-to hover:from-brand-from/90 hover:to-brand-to/90 shadow-lg shadow-brand-from/20 text-white rounded-full px-6 py-2.5 md:px-8 md:py-3.5 border-none h-11 md:h-14">
                                        {t('cta')}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>



                        {/* RIGHT: Visual / Illustration */}
                        <HeroIllustration />

                    </div>
                </div>
            </section>

            {/* Tech Stack Marquee */}
            <div className="mt-[-2px] border-b border-border bg-background">
                <TechStack />
            </div>

            {/* Features Section - Creative Grid */}
            <FeaturesCreative />

            {/* Featured Templates Section */}
            <FeaturedTemplates />

            {/* FAQ Section */}
            <FAQ />

            {/* CTA Section */}
            <CTASection />

            {/* Newsletter Section */}
            <NewsletterSection />

        </div>
    );
}
