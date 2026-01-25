import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const locale = useLocale();

    // Simplified Footer Links - Only existing routes
    const footerSections = [
        {
            title: "Product",
            links: [
                { label: tNav('library'), href: '/library' },
            ]
        },
        {
            title: "Resources",
            links: [
                { label: tNav('docs'), href: '/docs' },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: t('terms'), href: '/terms' },
                { label: t('privacy'), href: '/privacy' },
            ]
        }
    ];

    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <Logo />
                        </Link>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                            {t('description')}
                        </p>
                    </div>

                    {/* Links Columns (Span 8) */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-bold text-foreground mb-6">{section.title}</h3>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
