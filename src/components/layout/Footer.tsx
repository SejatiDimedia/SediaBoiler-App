import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const locale = useLocale();



    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center gap-8 mb-16 px-4">
                    <Link href="/" className="inline-block">
                        <Logo />
                    </Link>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                    <div className="flex items-center gap-8">
                        {/* Add simple links if needed, but per request we are removing sections */}
                        <Link href="/library" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {tNav('library')}
                        </Link>
                        <Link href="/templates" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {tNav('templates')}
                        </Link>
                        <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            {tNav('docs')}
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} SediaBoiler. | Part of SejatiDimedia. | All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <div className="text-red-500 animate-pulse">❤️</div>
                        <span>in Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
