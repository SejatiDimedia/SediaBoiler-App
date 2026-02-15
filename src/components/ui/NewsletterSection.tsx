'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Terminal, ChevronRight, Loader2, Check, Command, Cpu, Wifi, Activity, Battery } from 'lucide-react';
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
    const [mounted, setMounted] = useState(false);
    const [loginDate, setLoginDate] = useState('');

    useEffect(() => {
        setMounted(true);
        setLoginDate(new Date().toLocaleDateString());
    }, []);

    // Simulate typing effect for the intro
    const introLines = [
        t('commandCenter.terminal.init1'),
        t('commandCenter.terminal.init2'),
        t('commandCenter.terminal.init3'),
        t('commandCenter.terminal.init4')
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
        <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-background min-h-[80vh] flex items-center">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
            <div className="absolute inset-0 bg-background/90" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-from/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-to/50 to-transparent" />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-brand-from/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-brand-to/10 blur-[120px] rounded-full pointer-events-none" />

            <Meteors number={20} className="opacity-40" />

            <div className="container relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT: Text Content */}
                    <div className="text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                                {t('commandCenter.titleLine1')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to">{t('commandCenter.titleHighlight')}</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-lg text-muted-foreground max-w-md leading-relaxed"
                        >
                            {t('commandCenter.description')}
                        </motion.p>


                    </div>

                    {/* RIGHT: Command Center Interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative"
                    >

                        {/* Main Terminal Window */}
                        <div className="relative rounded-xl overflow-hidden bg-[#0c0c0c] border border-brand-from/30 shadow-2xl shadow-brand-from/20 ring-1 ring-white/5 group">

                            {/* CRT Overlay Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-from/5 to-transparent z-[4] pointer-events-none" />

                            {/* Window Header */}
                            <div className="bg-[#1a1a1a] border-b border-white/5 px-4 py-3 flex items-center justify-between relative z-10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20" />
                                </div>
                                <div className="text-xs font-mono text-zinc-500 flex items-center gap-2 select-none lg:mr-46 mr-25">
                                    <Terminal className="w-3 h-3 text-brand-from" />
                                    root@sapa-ui:~/newsletter
                                </div>
                            </div>

                            {/* Window Content */}
                            <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed h-[360px] overflow-y-auto custom-scrollbar flex flex-col font-medium text-zinc-300 relative z-10">
                                <div className="space-y-2 mb-6">
                                    <div className="text-zinc-600 mb-4 select-none italic text-xs min-h-[1.5em]">
                                        {mounted ? `${t('commandCenter.terminal.lastLogin')} ${loginDate} on ttys000` : ''}
                                    </div>

                                    {introLines.slice(0, visibleLines).map((line, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex gap-2"
                                        >
                                            <span className="text-brand-from">➜</span>
                                            <span className={i === 2 ? "text-brand-to font-semibold" : "text-zinc-100"}>{line}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {visibleLines >= introLines.length && (
                                    <div className="space-y-2 pb-8">
                                        {/* Previous Logs */}
                                        {logs.map((log, i) => (
                                            <div key={i} className={cn("flex gap-2", log.startsWith("> Error") ? "text-red-400" : "text-zinc-400")}>
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

                                                <div className="flex-1 flex items-center min-w-[200px] border-b border-brand-from/30 focus-within:border-brand-from transition-colors pb-1">
                                                    <span className="text-yellow-400 mr-2 font-semibold select-none">subscribe</span>
                                                    <input
                                                        ref={topRef}
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        style={{ outline: 'none', boxShadow: 'none' }}
                                                        className="bg-transparent border-none outline-none text-zinc-100 flex-1 p-0 focus:ring-0 ring-0 focus:border-none placeholder:text-zinc-700 font-mono caret-brand-from"
                                                        placeholder={t('commandCenter.terminal.inputPlaceholder')}
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
                                                        className="absolute right-0 top-0 text-[10px] bg-brand-from text-black font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest hover:bg-white transition-colors"
                                                    >
                                                        {t('commandCenter.terminal.executeBtn')}
                                                    </motion.button>
                                                )}
                                            </form>
                                        )}

                                        {/* Cursor */}
                                        {!isSuccess && !isPending && (
                                            <motion.div
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="inline-block w-2.5 h-4 bg-brand-from align-middle ml-1"
                                            />
                                        )}

                                        {isPending && (
                                            <div className="flex items-center gap-2 text-brand-from animate-pulse mt-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>{t('commandCenter.terminal.processing')}</span>
                                            </div>
                                        )}

                                        {isSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-6 border-l-2 border-green-500 bg-green-500/10 p-4 text-green-400 font-mono text-sm"
                                            >
                                                <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-wider">
                                                    <Activity className="w-4 h-4" />
                                                    {t('commandCenter.terminal.successTitle')}
                                                </div>
                                                <div className="opacity-80">
                                                    &gt; {t('commandCenter.terminal.successMsg1')} <span className="text-white">{email}</span>
                                                    <br />
                                                    &gt; {t('commandCenter.terminal.successMsg2')}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                                <div className="h-4" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
