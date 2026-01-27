'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { useTheme } from 'next-themes';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
    const [html, setHtml] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        async function highlight() {
            try {
                // Force dark theme for the "Terminal" look, or respect system? 
                // Creating a Mac Terminal generally implies a dark window. 
                // Let's use a dark theme for the code content to match the frame.
                const highlighted = await codeToHtml(code, {
                    lang: language,
                    theme: 'github-dark', // Consistent dark theme for terminal look
                });
                setHtml(highlighted);
            } catch (error) {
                console.error('Error highlighting code:', error);
                setHtml(`<pre><code>${code}</code></pre>`);
            } finally {
                setIsLoading(false);
            }
        }

        highlight();
    }, [code, language]);

    if (isLoading) {
        return (
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-sm bg-zinc-950">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-zinc-900/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-[#0d1117] my-4 group">
            {/* MacOS Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/50 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/50 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/50 shadow-sm" />
                </div>
                {/* Optional: Language Badge */}
                <div className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-widest">
                    {language}
                </div>
            </div>

            {/* Code Content */}
            <div
                className="overflow-x-auto text-[13px] leading-6 font-mono [&>pre]:!bg-transparent [&>pre]:p-5 [&_code]:!font-mono selection:bg-white/20"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
