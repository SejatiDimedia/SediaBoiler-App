'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Mail, ArrowRight } from 'lucide-react';

export function NewsletterSection() {
    const t = useTranslations('newsletter');

    return (
        <section className="relative py-32 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-background">
                {/* Central Beam */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[500px] bg-brand-from/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-40" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Icon/Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-from/20 to-brand-to/10 border border-brand-from/20 mb-8 shadow-2xl shadow-brand-from/20 backdrop-blur-sm animate-in zoom-in duration-700">
                    <Mail className="w-8 h-8 text-brand-from" />
                </div>

                {/* Typography */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {t('title')}
                </h2>
                <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                    {t('description')}
                </p>

                {/* Modern Input Group */}
                <div className="relative max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                    <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-from to-brand-to rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-2 shadow-2xl focus-within:ring-1 focus-within:ring-brand-from/50 transition-all">
                            <Mail className="w-5 h-5 text-muted-foreground ml-4" />
                            <input
                                type="email"
                                placeholder={t('placeholder')}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 h-10 px-4"
                            />
                            <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-brand-from to-brand-to hover:shadow-lg hover:shadow-brand-from/25 border-0 text-white font-medium transition-all">
                                {t('button')}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </form>
                    <p className="text-sm text-muted-foreground mt-6 opacity-60">
                        {t('disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}
