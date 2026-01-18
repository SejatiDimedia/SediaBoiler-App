'use client';

import { cn } from '@/lib/utils';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

type ViewMode = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveSwitcherProps {
    value: ViewMode;
    onChange: (mode: ViewMode) => void;
    labels?: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
}

export function ResponsiveSwitcher({
    value,
    onChange,
    labels = { mobile: 'Mobile', tablet: 'Tablet', desktop: 'Desktop' }
}: ResponsiveSwitcherProps) {
    const modes: { key: ViewMode; icon: typeof Smartphone; label: string }[] = [
        { key: 'mobile', icon: Smartphone, label: labels.mobile },
        { key: 'tablet', icon: Tablet, label: labels.tablet },
        { key: 'desktop', icon: Monitor, label: labels.desktop },
    ];

    return (
        <div className="flex items-center gap-1 rounded-lg bg-accent p-1">
            {modes.map((mode) => (
                <button
                    key={mode.key}
                    onClick={() => onChange(mode.key)}
                    className={cn(
                        'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200',
                        value === mode.key
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted hover:text-foreground'
                    )}
                    title={mode.label}
                >
                    <mode.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                </button>
            ))}
        </div>
    );
}

export function getPreviewWidth(mode: ViewMode): string {
    switch (mode) {
        case 'mobile':
            return '320px';
        case 'tablet':
            return '768px';
        case 'desktop':
            return '100%';
    }
}
