'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');

    return (
        <footer className="relative bg-background text-foreground overflow-hidden border-t border-border">

            {/* Background Gradients (Matches Hero Section) */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-from to-brand-to" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-brand-to to-brand-from" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>

            {/* Massive Watermark Text - Bottom Aligned & Clipped */}
            <div className="absolute inset-0 flex justify-center pointer-events-none select-none overflow-hidden items-end">
                <h1 className="text-[28vw] md:text-[20rem] lg:text-[30rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-from/20 via-brand-to/10 to-transparent opacity-100 whitespace-nowrap z-0 translate-y-1/3 md:translate-y-1/3 pointer-events-none">
                    SAPAUI
                </h1>
            </div>



            {/* Content Container - Pushed to Bottom */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-12 pt-10 sm:pt-60 lg:pt-80">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">

                    {/* Brand / Logo Section */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        <Link href="/" className="inline-block transform origin-left hover:scale-105 transition-transform duration-300">
                            <Logo />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            &copy; {new Date().getFullYear()} SapaUI. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-6 w-full md:w-auto min-w-[200px]">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider opacity-90">
                            Quick Access
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
                            <Link href="/" className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:bg-clip-text hover:text-transparent transition-all duration-300 text-left group flex items-center gap-1">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-brand-from to-brand-to transition-all duration-300"></span>
                                Home
                            </Link>
                            <Link href="/blog" className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:bg-clip-text hover:text-transparent transition-all duration-300 text-left group flex items-center gap-1">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-brand-from to-brand-to transition-all duration-300"></span>
                                Blog
                            </Link>
                            <Link href="/library" className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:bg-clip-text hover:text-transparent transition-all duration-300 text-left group flex items-center gap-1">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-brand-from to-brand-to transition-all duration-300"></span>
                                {tNav('library')}
                            </Link>
                            <Link href="/templates" className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:bg-clip-text hover:text-transparent transition-all duration-300 text-left group flex items-center gap-1">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-brand-from to-brand-to transition-all duration-300"></span>
                                {tNav('templates')}
                            </Link>
                            <Link href="/docs" className="text-sm text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:bg-clip-text hover:text-transparent transition-all duration-300 text-left group flex items-center gap-1">
                                <span className="w-0 group-hover:w-2 h-[1px] bg-gradient-to-r from-brand-from to-brand-to transition-all duration-300"></span>
                                {tNav('docs')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
