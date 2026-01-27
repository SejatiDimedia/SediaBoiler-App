'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { SearchTrigger } from '@/components/library/SearchTrigger';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

interface ComponentItem {
    slug: string;
    name: { id: string; en: string };
    description: { id: string; en: string };
    category: string;
}

interface NavbarProps {
    components?: ComponentItem[];
}



export function Navbar({ components = [] }: NavbarProps) {
    const t = useTranslations('nav');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        // Check initial scroll position
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/library', label: t('library') },
        { href: '/templates', label: t('templates') },
        { href: '/docs', label: t('docs') },
        { href: '/blog', label: 'Blog' },
    ];

    // During SSR and initial hydration, always render transparent (matches server)
    const showScrolledStyles = mounted && isScrolled;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                // Mobile: Always solid background for better visibility
                // Desktop: Transparent at top, solid when scrolled
                showScrolledStyles
                    ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
                    : 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm md:bg-transparent md:border-none md:shadow-none'
            )}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between relative">
                    {/* Left: Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Center: Logo (Desktop Only) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>

                    {/* Right: Desktop Actions */}
                    <div className="hidden md:flex md:items-center md:gap-3">
                        <SearchTrigger components={components} />
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Layout: Logo (Left) and Actions (Right) */}
                    <div className="flex items-center justify-between w-full md:hidden">
                        <Link href="/">
                            <Logo />
                        </Link>

                        <div className="flex items-center gap-2">
                            <SearchTrigger
                                components={components}
                                className="bg-transparent border-none p-2 hover:bg-accent text-foreground"
                            />
                            <button
                                className="p-2 text-foreground"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-xl border-t border-border p-4 animate-in slide-in-from-top-4 duration-200">
                        <div className="flex flex-col gap-4 h-full overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-foreground py-3 border-b border-border/50 transition-colors hover:text-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-auto pb-8 flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-accent/50">
                                    <span className="text-sm font-medium">Appearance</span>
                                    <ThemeToggle />
                                </div>
                                <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-accent/50">
                                    <span className="text-sm font-medium">Language</span>
                                    <LanguageSwitcher />
                                </div>
                                <Link href="/library" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full h-12 text-base" variant="premium">{t('getStarted')}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header >
    );
}
