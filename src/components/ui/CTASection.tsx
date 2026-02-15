'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    <span className="text-foreground">{t('title')}</span>{" "}
                    <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent">
                        {t('titleHighlight')}
                    </span>
                </h2>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
                    {/* Primary Button */}
                    <Link href="/library" className="w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group cursor-pointer"
                        >
                            <Button size="lg" className="rounded-xl px-6 md:px-10 h-11 md:h-14 w-full sm:w-auto text-base gap-3 shadow-[0_0_20px_-5px_rgba(var(--brand-from-rgb),0.5)] bg-gradient-to-r from-brand-from to-brand-to border-0 text-white relative overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10" />

                                <span className="relative z-0 flex items-center justify-center gap-3 font-semibold">
                                    {t('primary')}
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.span>
                                </span>
                            </Button>
                        </motion.div>
                    </Link>

                    {/* Secondary Button */}
                    <Link href="/templates" className="w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group h-11 md:h-14 p-[1.5px] rounded-xl bg-gradient-to-r from-brand-from to-brand-to shadow-[0_0_15px_-5px_rgba(var(--brand-to-rgb),0.3)] cursor-pointer relative"
                        >
                            <div className="h-full w-full bg-background rounded-[11px] flex items-center justify-center px-6 md:px-10 relative overflow-hidden transition-colors group-hover:bg-transparent duration-300">
                                {/* Text Content */}
                                <div className="relative z-10 flex items-center gap-3 font-semibold">
                                    <span className="bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                                        {t('templates')}
                                    </span>
                                    <motion.div
                                        animate={{
                                            x: [0, 5, 0],
                                            opacity: [0.7, 1, 0.7]
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                    >
                                        <ArrowRight className="w-5 h-5 text-brand-to group-hover:text-white" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
