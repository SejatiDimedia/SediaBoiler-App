'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';
import { CopyButton } from '@/components/ui/CopyButton';
import { ResponsiveSwitcher, getPreviewWidth } from './ResponsiveSwitcher';
import { Eye, Code, RotateCcw } from 'lucide-react';

type ViewMode = 'mobile' | 'tablet' | 'desktop';
type TabMode = 'preview' | 'code';

interface ComponentViewerProps {
    slug: string;
    code: string;
    className?: string;
}

export function ComponentViewer({ slug, code, className }: ComponentViewerProps) {
    const t = useTranslations('componentViewer');
    const { resolvedTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<TabMode>('preview');
    const [viewMode, setViewMode] = useState<ViewMode>('desktop');
    const [iframeKey, setIframeKey] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const tabs: { key: TabMode; icon: typeof Eye; label: string }[] = [
        { key: 'preview', icon: Eye, label: t('preview') },
        { key: 'code', icon: Code, label: t('code') },
    ];

    // Sync theme with iframe
    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: 'theme-change', theme: resolvedTheme },
                '*'
            );
        }
    }, [resolvedTheme]);

    const refreshPreview = () => {
        setIframeKey((prev) => prev + 1);
    };

    return (
        <div className={cn('rounded-xl border border-border bg-background overflow-hidden', className)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border bg-accent/50">
                {/* Tabs */}
                <div className="flex items-center gap-1 rounded-lg bg-accent p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                'flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                                activeTab === tab.key
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted hover:text-foreground'
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {activeTab === 'preview' && (
                        <>
                            <ResponsiveSwitcher
                                value={viewMode}
                                onChange={setViewMode}
                                labels={{
                                    mobile: t('responsive.mobile'),
                                    tablet: t('responsive.tablet'),
                                    desktop: t('responsive.desktop'),
                                }}
                            />
                            <button
                                onClick={refreshPreview}
                                className="p-2 rounded-md hover:bg-accent text-muted hover:text-foreground transition"
                                title={t('refresh') || 'Refresh'}
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        </>
                    )}
                    <CopyButton text={code} label={t('copyCode')} />
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {/* Preview - always rendered, hidden when code tab is active */}
                <div className={cn("p-4 bg-accent/30", activeTab !== 'preview' && 'hidden')}>
                    <div
                        className="mx-auto transition-all duration-300 bg-background rounded-lg border border-border overflow-hidden"
                        style={{
                            maxWidth: getPreviewWidth(viewMode),
                            width: '100%',
                        }}
                    >
                        <iframe
                            key={iframeKey}
                            ref={iframeRef}
                            src={`/preview/${slug}?theme=${resolvedTheme}`}
                            className="w-full border-0"
                            style={{
                                height: viewMode === 'mobile' ? '500px' : viewMode === 'tablet' ? '600px' : '700px',
                            }}
                            title={`Preview of ${slug}`}
                        />
                    </div>
                </div>

                {/* Code - always rendered, hidden when preview tab is active */}
                <div className={cn("p-4", activeTab !== 'code' && 'hidden')}>
                    <CodeBlock code={code} language="tsx" />
                </div>
            </div>
        </div>
    );
}
