'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming utils exists, or native twMerge

export function SocialProof({ className }: { className?: string }) {
    const avatars = [
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    ];

    return (
        <div className={cn("flex items-center gap-4", className)}>
            <div className="flex -space-x-3 rtl:space-x-reverse">
                {avatars.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="relative z-10"
                        style={{ zIndex: 5 - i }}
                    >
                        <img
                            className="w-10 h-10 border-2 border-background rounded-full object-cover shadow-sm bg-muted"
                            src={src}
                            alt={`User ${i + 1}`}
                        />
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-black border-2 border-background rounded-full hover:bg-gray-800 dark:border-gray-800"
                    style={{ zIndex: 0 }}
                >
                    +100
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-col"
            >
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">100+ developers</span> have joined
                </p>
            </motion.div>
        </div>
    );
}
