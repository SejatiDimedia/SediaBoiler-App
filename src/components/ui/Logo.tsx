import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

export function Logo({ className, iconClassName, textClassName }: { className?: string; iconClassName?: string; textClassName?: string }) {
    return (
        <div className={cn("flex items-center gap-2.5 group select-none", className)}>
            {/* Abstract Stack Icon */}
            <div className={cn("relative flex items-center justify-center w-11 h-11", iconClassName)}>
                {/* Layer 1 (Bottom) */}
                <div className="absolute inset-x-1 bottom-1 h-6 bg-blue-600/30 rounded-lg transform skew-x-[-10deg] translate-y-1 group-hover:translate-y-2 transition-transform duration-300" />
                {/* Layer 2 (Middle) */}
                <div className="absolute inset-x-1 bottom-3 h-6 bg-blue-500/60 rounded-lg transform skew-x-[-10deg] translate-y-0.5 group-hover:translate-y-1 transition-transform duration-300 delay-75" />

                {/* Layer 3 (Top - Main) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg shadow-lg shadow-blue-500/30 transform skew-x-[-10deg] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform duration-300 delay-100">
                    <Layers className="w-6 h-6 text-white transform skew-x-[10deg]" strokeWidth={2.5} />
                </div>
            </div>

            {/* Text */}
            <div className={cn("flex flex-col -space-y-0.5", textClassName)}>
                <span className="text-xl font-extrabold tracking-[0.1em] text-foreground font-sans leading-none flex items-center gap-1 ml-0.5">
                    Sedia
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                </span>
                <span className="text-lg font-bold tracking-[0.26em] bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none">
                    Boiler
                </span>
            </div>
        </div>
    );
}
