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

import { components as staticComponents } from '@/lib/components-data';

export function Navbar({ components = staticComponents }: NavbarProps) {
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
    ];

    // During SSR and initial hydration, always render transparent (matches server)
    const showScrolledStyles = mounted && isScrolled;

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                showScrolledStyles
                    ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
                    : 'bg-transparent'
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

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

                    {/* Mobile: Logo (Left) and Actions (Right) - Simplified for mobile */}
                    <div className="flex items-center justify-between w-full md:hidden">
                        {/* Logo visible on mobile naturally since absolute center might overlap if not handled, 
                            but let's keep the absolute logo for desktop and standard flow for mobile. 
                            Actually, absolute centering works for mobile too if width permits, but typically mobile has Logo Left, Hamburger Right.
                        */}

                        {/* We need to hide the absolute logo on mobile if we want standard mobile layout, 
                            OR keep it centered on mobile too. 
                            Let's try to keep it centered on mobile for consistency, and place hamburger left or right.
                        */}
                    </div>

                    {/* Mobile Actions (Right) */}
                    <div className="flex items-center gap-2 md:hidden absolute right-0">
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

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <ThemeToggle />
                                    <LanguageSwitcher />
                                </div>
                                <Link href="/library">
                                    <Button className="w-full" variant="premium">{t('getStarted')}</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
