'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';

// View Transitions API handling


export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    // We need to mount first to avoid hydration mismatch
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9 opacity-50 cursor-wait">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            </Button>
        );
    }

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = resolvedTheme === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        // Check if the browser supports view transitions
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const x = e.nativeEvent.clientX;
        const y = e.nativeEvent.clientY;

        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            // Animate the new view growing from the click position
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 700,
                    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // ease-in-out-cubic
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    };

    const isDark = resolvedTheme === 'dark';

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full relative"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <Sun
                className={cn(
                    "h-[1.4rem] w-[1.4rem] absolute text-yellow-500 transition-transform duration-500 ease-in-out",
                    isDark ? "-rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
            />
            <Moon
                className={cn(
                    "h-[1.4rem] w-[1.4rem] absolute text-blue-400 transition-transform duration-500 ease-in-out",
                    isDark ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0"
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
