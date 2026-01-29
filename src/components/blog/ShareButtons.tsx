'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Share2, Link as LinkIcon, Twitter, Linkedin, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface ShareButtonsProps {
    title: string;
    className?: string;
}

export function ShareButtons({ title, className }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const pathname = usePathname();

    // In SSR or mismatch, window might not be defined
    const url = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing', err);
                }
            }
        } else {
            handleCopy();
        }
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
        },
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:text-[#1877F2] hover:bg-[#1877F2]/10',
        },
    ];

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Native Share / Copy Mobile Trigger */}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={handleNativeShare} className="rounded-full">
                    <Share2 className="w-5 h-5 text-muted-foreground" />
                </Button>
            </div>

            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "p-2 rounded-full transition-colors text-muted-foreground",
                            link.color
                        )}
                        aria-label={`Share on ${link.name}`}
                    >
                        <link.icon className="w-5 h-5" />
                    </a>
                ))}

                <div className="w-px h-4 bg-border mx-1" />

                <button
                    onClick={handleCopy}
                    className="p-2 rounded-full transition-all duration-300 text-muted-foreground hover:bg-gradient-to-r hover:from-brand-from hover:to-brand-to hover:text-white hover:shadow-lg hover:shadow-brand-from/25 relative group"
                    aria-label="Copy Link"
                >
                    <LinkIcon className="w-5 h-5" />
                    {copied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded shadow-lg animate-in fade-in zoom-in slide-in-from-bottom-2 whitespace-nowrap font-medium">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
