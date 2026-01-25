'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'premium';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
                    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',
                    // Variants
                    variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25',
                    variant === 'secondary' && 'bg-accent text-foreground hover:bg-accent-dark border border-border',
                    variant === 'ghost' && 'hover:bg-accent text-foreground',
                    variant === 'outline' && 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
                    variant === 'premium' && 'bg-gradient-to-r from-brand-from to-brand-to text-white hover:from-brand-from/90 hover:to-brand-to/90 shadow-lg shadow-brand-from/25 border border-white/10 relative overflow-hidden',
                    // Sizes
                    size === 'sm' && 'px-3 py-1.5 text-sm',
                    size === 'md' && 'px-5 py-2.5 text-sm',
                    size === 'lg' && 'px-7 py-3.5 text-base',
                    size === 'xl' && 'px-8 py-4 text-lg',
                    size === 'icon' && 'h-9 w-9 p-0',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
