'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const locales = [
    { code: 'id', label: 'ID', flag: '🇮🇩' },
    { code: 'en', label: 'EN', flag: '🇺🇸' }
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (newLocale: string) => {
        // Replace the locale segment in the pathname
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className="flex items-center gap-1 rounded-full bg-accent p-1">
            {locales.map((loc) => (
                <button
                    key={loc.code}
                    onClick={() => handleChange(loc.code)}
                    className={cn(
                        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
                        locale === loc.code
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                            : 'text-muted hover:text-foreground'
                    )}
                >
                    <span>{loc.flag}</span>
                    <span>{loc.label}</span>
                </button>
            ))}
        </div>
    );
}
