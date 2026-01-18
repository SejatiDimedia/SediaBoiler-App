import { Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, iconClassName, textClassName }: { className?: string; iconClassName?: string; textClassName?: string }) {
    return (
        <div className={cn("flex items-center gap-2.5 group select-none", className)}>
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40 group-hover:-rotate-3", iconClassName)}>
                <Layout className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span
                className={cn("text-2xl font-bold tracking-tight transition-opacity group-hover:opacity-90", textClassName)}
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
                <span className="text-foreground font-medium">Sedia</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold pr-1">Boiler</span>
            </span>
        </div>
    );
}
