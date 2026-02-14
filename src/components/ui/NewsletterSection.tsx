'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Terminal, ChevronRight, Loader2, Check, Command } from 'lucide-react';
import { useState, useTransition, useRef, useEffect } from 'react';
import { subscribe } from '@/lib/actions/newsletter';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Meteors } from '@/components/ui/Meteors';

export function NewsletterSection() {
    const t = useTranslations('newsletter');
    const [isPending, startTransition] = useTransition();
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const topRef = useRef<HTMLInputElement>(null);

    // Simulate typing effect for the intro
    const introLines = [
        "Initializing SapaUI update sequence...",
        "Loading components...",
        "Target: Stay ahead of the curve.",
        "Status: Ready for input."
    ];

    const [visibleLines, setVisibleLines] = useState<number>(0);

    useEffect(() => {
        if (visibleLines < introLines.length) {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [visibleLines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Add command to logs
        setLogs(prev => [...prev, `subscribe --email ${email}`]);

        startTransition(async () => {
            // Simulate processing logs
            await new Promise(r => setTimeout(r, 400));
            setLogs(prev => [...prev, "> resolving dependencies..."]);
            await new Promise(r => setTimeout(r, 400));
            setLogs(prev => [...prev, "> sending packet..."]);

            const formData = new FormData();
            formData.append('email', email);
            const result = await subscribe(formData);

            if (result.error) {
                setLogs(prev => [...prev, `> Error: ${result.error}`, "> Aborted."]);
                toast.error(result.error);
            } else {
                setLogs(prev => [...prev, "> 200 OK", "> Success!"]);
                toast.success(result.message);
                setIsSuccess(true);
                setEmail('');
            }
        });
    };

    return (
        <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-background flex justify-center items-center min-h-[70vh]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-background/90" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <Meteors number={10} className="opacity-20" />

            <div className="container relative z-10 max-w-4xl mx-auto">
                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="rounded-xl overflow-hidden border border-brand-from/30 bg-[#0c0c0c]/95 backdrop-blur-xl shadow-2xl shadow-brand-from/5 ring-1 ring-white/5"
                >
                    {/* Window Header */}
                    <div className="bg-white/5 border-b border-brand-from/10 px-4 py-3 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2 select-none">
                            <Terminal className="w-3 h-3 text-brand-from" />
                            bash — sapa-ui-cli — 80x24
                        </div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Window Content */}
                    <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed h-[400px] overflow-y-auto custom-scrollbar flex flex-col font-medium text-zinc-300">
                        <div className="space-y-2 mb-6">
                            <div className="text-zinc-600 mb-4 select-none italic text-xs">
                                Last login: {new Date().toLocaleDateString()} on ttys000
                            </div>

                            {introLines.slice(0, visibleLines).map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-2"
                                >
                                    <span className="text-brand-from">➜</span>
                                    <span className="text-zinc-100">{line}</span>
                                </motion.div>
                            ))}
                        </div>

                        {visibleLines >= introLines.length && (
                            <div className="space-y-2 pb-8">
                                {/* Previous Logs (if any) */}
                                {logs.map((log, i) => (
                                    <div key={i} className={cn("flex gap-2", log.startsWith("> Error") ? "text-red-400" : "text-zinc-400")}>
                                        {/* Command echo styling */}
                                        {log.startsWith("subscribe") ? (
                                            <>
                                                <span className="text-brand-from font-bold">➜ ~</span>
                                                <span className="text-zinc-100">{log}</span>
                                            </>
                                        ) : (
                                            <span>{log}</span>
                                        )}
                                    </div>
                                ))}

                                {/* Active Input Line */}
                                {!isSuccess && (
                                    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2 group relative">
                                        <span className="text-brand-from font-bold text-nowrap select-none">➜ ~</span>

                                        {/* Input Container with subtle custom border */}
                                        <div className="flex-1 flex items-center min-w-[200px] border-b border-white/10 focus-within:border-white/50 transition-colors pb-1">
                                            <span className="text-yellow-400 mr-2 font-semibold select-none shadow-brand-from/10">subscribe</span>
                                            <input
                                                ref={topRef}
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ outline: 'none', boxShadow: 'none' }}
                                                className="bg-transparent border-none outline-none text-zinc-100 flex-1 p-0 focus:ring-0 ring-0 focus:border-none placeholder:text-zinc-700 font-mono caret-white"
                                                placeholder="user@example.com"
                                                autoFocus
                                                disabled={isPending}
                                                autoComplete="off"
                                                spellCheck="false"
                                            />
                                        </div>

                                        {email.length > 0 && !isPending && (
                                            <motion.button
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                type="submit"
                                                className="absolute right-0 top-0 text-[10px] bg-brand-from/10 border border-brand-from/20 px-2 py-0.5 rounded text-brand-from hidden md:inline-block hover:bg-brand-from/20 transition-colors"
                                            >
                                                ENTER ↵
                                            </motion.button>
                                        )}
                                    </form>
                                )}

                                {/* Typing Cursor */}
                                {!isSuccess && !isPending && (
                                    <motion.div
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block w-2.5 h-5 bg-brand-from/50 align-middle ml-1"
                                    />
                                )}

                                {isPending && (
                                    <div className="flex items-center gap-2 text-brand-from animate-pulse mt-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Processing request...</span>
                                    </div>
                                )}

                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 border border-green-500/20 bg-green-500/5 p-4 rounded text-green-400 font-mono text-sm"
                                    >
                                        <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-wider">
                                            <Check className="w-4 h-4" />
                                            Operation Successful
                                        </div>
                                        <div className="opacity-80">
                                            &gt; Packet received at <span className="text-white underline decoration-dashed underline-offset-4">{email}</span>
                                            <br />
                                            &gt; Welcome to the network.
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Auto-scroll anchor */}
                        <div className="h-4" />
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground/40 font-mono select-none">
                        Run `help` for more information • v2.0.4-beta • <span className="text-brand-from/50">Production Environment</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
