'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    text: string;
    className?: string;
    label?: string;
}

export function CopyButton({ text, className, label }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
                'bg-background/80 hover:bg-background border border-border',
                'text-muted hover:text-foreground',
                className
            )}
            title={label || 'Copy to clipboard'}
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4" />
                    {label && <span>{label}</span>}
                </>
            )}
        </button>
    );
}
