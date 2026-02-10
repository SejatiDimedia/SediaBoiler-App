import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

export function Logo({ className, iconClassName, textClassName }: { className?: string; iconClassName?: string; textClassName?: string }) {
    return (
        <div className={cn("flex items-center gap-2.5 group select-none", className)}>
            {/* Abstract Stack Icon */}
            <div className={cn("relative flex items-center justify-center w-8 h-8 md:w-11 md:h-11", iconClassName)}>
                {/* Layer 1 (Bottom) */}
                <div className="absolute inset-x-1 bottom-0.5 md:bottom-1 h-4 md:h-6 bg-brand-from/30 rounded-lg transform skew-x-[-10deg] translate-y-1 group-hover:translate-y-2 transition-transform duration-300" />
                {/* Layer 2 (Middle) */}
                <div className="absolute inset-x-1 bottom-2 md:bottom-3 h-4 md:h-6 bg-brand-from/60 rounded-lg transform skew-x-[-10deg] translate-y-0.5 group-hover:translate-y-1 transition-transform duration-300 delay-75" />

                {/* Layer 3 (Top - Main) */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-from to-brand-to rounded-lg shadow-lg shadow-brand-from/30 transform skew-x-[-10deg] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform duration-300 delay-100">
                    <Layers className="w-4 h-4 md:w-6 md:h-6 text-white transform skew-x-[10deg]" strokeWidth={2.5} />
                </div>
            </div>

            {/* Text */}
            <div className={cn("flex items-center gap-0.5", textClassName)}>
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-none">
                    Sapa
                </span>
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-from to-brand-to bg-clip-text text-transparent leading-none">
                    UI
                </span>
            </div>
        </div>
    );
}
