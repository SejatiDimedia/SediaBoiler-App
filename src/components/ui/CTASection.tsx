'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    const t = useTranslations('cta');

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Gradients (Matches Hero Section) */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-from to-brand-to" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-to to-brand-from" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>

            <div className="relative mx-auto max-w-5xl px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-border mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-brand-from"></span>
                    <span className="text-xs font-semibold text-muted-foreground">Copy. Paste. Ship.</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                        {t('title')}
                    </span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                    <Link href="/library">
                        <Button size="lg" className="rounded-xl px-8 h-12 text-base gap-2 shadow-lg shadow-brand-from/20 bg-gradient-to-r from-brand-from to-brand-to hover:opacity-90 transition-opacity border-0 text-white">
                            {t('primary')}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/templates">
                        <div className="group relative rounded-xl p-[1px] bg-gradient-to-r from-brand-from to-brand-to overflow-hidden">
                            {/* Inner background that fades out on hover */}
                            <div className="absolute inset-[1px] rounded-xl bg-background group-hover:bg-opacity-0 transition-all duration-300" />

                            <Button size="lg" className="relative rounded-xl px-8 h-[46px] text-base bg-transparent hover:bg-transparent border-0 ring-0 shadow-none">
                                {/* Text Gradient (Default) */}
                                <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent font-medium group-hover:opacity-0 transition-opacity duration-300 absolute inset-0 flex items-center justify-center">
                                    {t('templates')}
                                </span>
                                {/* White Text (Hover) */}
                                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    {t('templates')}
                                </span>
                            </Button>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
