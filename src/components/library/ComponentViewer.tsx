'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';
import { CopyButton } from '@/components/ui/CopyButton';
import { ResponsiveSwitcher, getPreviewWidth } from './ResponsiveSwitcher';
import { Eye, Code, RotateCcw } from 'lucide-react';
import { componentRegistry } from '@/components/preview/registry';

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
    const [dynamicHeight, setDynamicHeight] = useState('600px');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Check if component exists in static registry
    const isStaticComponent = useMemo(() => !!componentRegistry[slug], [slug]);

    const tabs: { key: TabMode; icon: typeof Eye; label: string }[] = [
        { key: 'preview', icon: Eye, label: t('preview') },
        { key: 'code', icon: Code, label: t('code') },
    ];

    // Create blob URL content for dynamic preview (matches AdminComponentPreview)
    const createPreviewContent = useCallback(
        (componentCode: string, isDark: boolean) => {
            return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { min-height: 100%; width: 100%; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            ${isDark ? "background: #0a0a0a; color: #fafafa;" : "background: #ffffff; color: #0a0a0a;"}
        }
        #root { width: 100%; }
        .min-h-screen { min-height: auto !important; }
        h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.25; }
        p { line-height: 1.75; }
        button, input, select, textarea { font-family: inherit; }
        a { color: ${isDark ? "#60a5fa" : "#3b82f6"}; text-decoration: none; }
        a:hover { color: ${isDark ? "#93c5fd" : "#2563eb"}; }
        button { cursor: pointer; border: none; outline: none; }
        nav, header { width: 100%; }
    </style>
</head>
<body>
    <div id="root"><div style="display:flex;align-items:center;justify-content:center;padding:2rem;color:#666;">Loading preview...</div></div>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script>
        window.__componentCode__ = ${JSON.stringify(componentCode)};
    </script>
    <script>
        function initPreview() {
            if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof Babel === 'undefined') {
                setTimeout(initPreview, 50);
                return;
            }
            
            try {
                var code = window.__componentCode__;
                code = code.replace(/export\\s+default\\s+/g, '').replace(/export\\s+/g, '');
                
                var functionMatch = code.match(/function\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*\\(/);
                var functionName = functionMatch ? functionMatch[1] : null;
                
                if (!functionName) {
                    throw new Error('Could not find a function component.');
                }
                
                var transformed = Babel.transform(code, {
                    presets: ['react'],
                    filename: 'component.tsx',
                }).code;
                
                var wrapperCode = 
                    'var useState = React.useState;' +
                    'var useEffect = React.useEffect;' +
                    'var useCallback = React.useCallback;' +
                    'var useMemo = React.useMemo;' +
                    'var useRef = React.useRef;' +
                    'var useContext = React.useContext;' +
                    'var useReducer = React.useReducer;' +
                    transformed +
                    ';return ' + functionName + ';';
                
                var Component = new Function('React', wrapperCode)(React);
                
                if (typeof Component !== 'function') {
                    throw new Error('Component is not a valid React function component');
                }
                
                var rootEl = document.getElementById('root');
                ReactDOM.createRoot(rootEl).render(React.createElement(Component));
            } catch (err) {
                document.getElementById('root').innerHTML = 
                    '<div style="color: #dc2626; padding: 2rem; text-align: center;">' +
                        '<h2 style="margin-bottom:0.5rem;">Preview Error</h2>' +
                        '<p style="font-family: monospace; background: #fef2f2; padding: 0.5rem; border-radius: 0.25rem; font-size: 0.875rem;">' + err.message + '</p>' +
                    '</div>';
            }
        }
        initPreview();
    </script>
</body>
</html>`;
        },
        []
    );

    // For dynamic components, create blob URL directly
    useEffect(() => {
        if (isStaticComponent || !iframeRef.current || !code) return;

        const isDark = resolvedTheme === 'dark';
        const html = createPreviewContent(code, isDark);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;

        return () => URL.revokeObjectURL(url);
    }, [code, resolvedTheme, iframeKey, createPreviewContent, isStaticComponent]);

    // Sync theme with iframe (for static components)
    useEffect(() => {
        if (iframeRef.current?.contentWindow && isStaticComponent) {
            iframeRef.current.contentWindow.postMessage(
                { type: 'theme-change', theme: resolvedTheme },
                '*'
            );
        }
    }, [resolvedTheme, isStaticComponent]);

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
                        {isStaticComponent ? (
                            // Static component - use route (instant)
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
                        ) : (
                            // Dynamic component - use blob URL (no extra network hop)
                            <iframe
                                key={iframeKey}
                                ref={iframeRef}
                                className="w-full border-0"
                                style={{
                                    height: viewMode === 'mobile' ? '500px' : viewMode === 'tablet' ? '600px' : '700px',
                                }}
                                title={`Preview of ${slug}`}
                                sandbox="allow-scripts"
                            />
                        )}
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
