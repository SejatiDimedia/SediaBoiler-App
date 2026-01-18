import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Github, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const locale = useLocale();

    const quickLinks = [
        { href: '/', label: tNav('home') },
        { href: '/library', label: tNav('library') },
    ];

    return (
        <footer className="border-t border-border bg-accent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <Logo />
                        </Link>
                        <p className="text-muted text-sm max-w-md mb-4">
                            {t('description')}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-foreground transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-foreground transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">{t('quickLinks')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted hover:text-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">{t('legal')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                >
                                    {t('terms')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-muted hover:text-foreground transition-colors"
                                >
                                    {t('privacy')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-border py-6 text-center">
                    <p className="text-sm text-muted">{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
