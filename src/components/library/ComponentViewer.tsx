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

        // Helper to create SVG elements
        const createSvg = (props, children) => {
            var size = props.size || 24;
            var newProps = Object.assign({}, props);
            delete newProps.size;
            
            return React.createElement('svg', {
                viewBox: "0 0 24 24",
                width: size,
                height: size,
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                ...newProps
            }, ...children);
        };

        // MOCK LUCIDE ICONS LIBRARY
        window.LucideIcons = {
            DefaultIcon: (p) => createSvg(p, [React.createElement('circle', {cx:12, cy:12, r:10})]),
            Menu: (p) => createSvg(p, [React.createElement('line',{x1:4,x2:20,y1:12,y2:12}),React.createElement('line',{x1:4,x2:20,y1:6,y2:6}),React.createElement('line',{x1:4,x2:20,y1:18,y2:18})]),
            X: (p) => createSvg(p, [React.createElement('path',{d:"M18 6 6 18"}),React.createElement('path',{d:"m6 6 12 12"})]),
            ArrowRight: (p) => createSvg(p, [React.createElement('path',{d:"M5 12h14"}),React.createElement('path',{d:"m12 5 7 7-7 7"})]),
            Check: (p) => createSvg(p, [React.createElement('polyline',{points:"20 6 9 17 4 12"})]),
            Star: (p) => React.createElement('svg', {...p, viewBox:"0 0 24 24", fill:"currentColor", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round"}, React.createElement('polygon',{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})),
            ChevronRight: (p) => createSvg(p, [React.createElement('path',{d:"m9 18 6-6-6-6"})]),
            ChevronDown: (p) => createSvg(p, [React.createElement('path',{d:"m6 9 6 6 6-6"})]),
            Play: (p) => React.createElement('svg', {...p, viewBox:"0 0 24 24", fill:"currentColor", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round"}, React.createElement('polygon',{points:"5 3 19 12 5 21 5 3"})),
            Zap: (p) => createSvg(p, [React.createElement('polygon',{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})]),
            Shield: (p) => createSvg(p, [React.createElement('path',{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"})]),
            ShieldCheck: (p) => createSvg(p, [React.createElement('path',{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"}), React.createElement('path',{d:"m9 12 2 2 4-4"})]),
            BarChart: (p) => createSvg(p, [React.createElement('line',{x1:12,x2:12,y1:20,y2:10}),React.createElement('line',{x1:18,x2:18,y1:20,y2:4}),React.createElement('line',{x1:6,x2:6,y1:20,y2:16})]),
            BarChart3: (p) => createSvg(p, [React.createElement('path',{d:"M3 3v18h18"}),React.createElement('path',{d:"M18 17V9"}),React.createElement('path',{d:"M13 17V5"}),React.createElement('path',{d:"M8 17v-3"})]),
            Users: (p) => createSvg(p, [React.createElement('path',{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),React.createElement('circle',{cx:9,cy:7,r:4}),React.createElement('path',{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),React.createElement('path',{d:"M16 3.13a4 4 0 0 1 0 7.75"})]),
            Globe: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('path',{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),React.createElement('path',{d:"M2 12h20"})]),
            Lock: (p) => createSvg(p, [React.createElement('rect',{width:18,height:11,x:3,y:11,rx:2,ry:2}),React.createElement('path',{d:"M7 11V7a5 5 0 0 1 10 0v4"})]),
            ExternalLink: (p) => createSvg(p, [React.createElement('path',{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),React.createElement('polyline',{points:"15 3 21 3 21 9"}),React.createElement('line',{x1:10,x2:21,y1:14,y2:3})]),
            Mail: (p) => createSvg(p, [React.createElement('rect',{width:20,height:16,x:2,y:4,rx:2}),React.createElement('path',{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]),
            MapPin: (p) => createSvg(p, [React.createElement('path',{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),React.createElement('circle',{cx:12,cy:10,r:3})]),
            Phone: (p) => createSvg(p, [React.createElement('path',{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})]),
            Github: (p) => React.createElement('svg', {...p, viewBox:"0 0 24 24", fill:"currentColor", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round"}, React.createElement('path',{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}),React.createElement('path',{d:"M9 18c-4.51 2-5-2-7-2"})),
            Rocket: (p) => createSvg(p, [React.createElement('path',{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}),React.createElement('path',{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}),React.createElement('path',{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}),React.createElement('path',{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"})]),
            Palette: (p) => createSvg(p, [React.createElement('circle',{cx:13.5,cy:6.5,r:.5}),React.createElement('circle',{cx:17.5,cy:10.5,r:.5}),React.createElement('circle',{cx:8.5,cy:7.5,r:.5}),React.createElement('circle',{cx:6.5,cy:12.5,r:.5}),React.createElement('path',{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"})]),
            Flame: (p) => createSvg(p, [React.createElement('path',{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})]),
            Target: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('circle',{cx:12,cy:12,r:6}),React.createElement('circle',{cx:12,cy:12,r:2})]),
            Sparkles: (p) => createSvg(p, [React.createElement('path',{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"}),React.createElement('path',{d:"M5 3v4"}),React.createElement('path',{d:"M19 17v4"}),React.createElement('path',{d:"M3 5h4"}),React.createElement('path',{d:"M17 19h4"})]),
            Wrench: (p) => createSvg(p, [React.createElement('path',{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"})]),
            ThumbsUp: (p) => createSvg(p, [React.createElement('path',{d:"M7 10v12"}),React.createElement('path',{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"})]),
            HelpCircle: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('path',{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),React.createElement('path',{d:"M12 17h.01"})]),
            MessageSquare: (p) => createSvg(p, [React.createElement('path',{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})]),
            ArrowUpRight: (p) => createSvg(p, [React.createElement('path',{d:"M7 7h10v10"}),React.createElement('path',{d:"M7 17 17 7"})]),
            MousePointerClick: (p) => createSvg(p, [React.createElement('path',{d:"m14 4.1 2.5 2.5"}),React.createElement('path',{d:"m7.2 9.2 6.5-6.5a2.1 2.1 0 0 1 3 3L10.2 12.2a2 2 0 0 0-.6 1.5V19a2 2 0 0 0 2 2h5.3a2 2 0 0 0 1.5-.6l6.6-6.6a2.1 2.1 0 0 1 3 3L22 23.3V24H7v-9.3a2 2 0 0 0-.6-1.5L4.1 10.9"})]),
        };

        // Fallback Proxy
        window.LucideProxy = new Proxy(window.LucideIcons, {
            get: (target, prop) => {
                if (prop in target) return target[prop];
                console.warn('[Preview] Missing icon:', prop);
                return (props) => target.DefaultIcon({...props, 'data-icon-name': prop});
            }
        });
    </script>
    <script>
        function initPreview() {
            if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof Babel === 'undefined') {
                setTimeout(initPreview, 50);
                return;
            }
            
            try {
                var code = window.__componentCode__;

                // DETECT IMPORTS BEFORE STRIPPING
                var importedIcons = [];
                // Regex matches: import { A, B as C } from 'lucide-react'
                var lucideMatch = code.match(/import\\s+{([^}]+)}\\s+from\\s+['"]lucide-react['"]/);
                if (lucideMatch) {
                    importedIcons = lucideMatch[1].split(',').map(function(s) { 
                        var parts = s.trim().split(/\\s+as\\s+/);
                        // Store simple name or {name, alias}
                        return { 
                            name: parts[0].trim(), 
                            alias: parts[1] ? parts[1].trim() : parts[0].trim() 
                        };
                    });
                }

                // STRIP ALL IMPORTS
                code = code.replace(/import\\s+[\\s\\S]*?from\\s+['"].*['"];?/g, '');
                // Also strip "use client"
                code = code.replace(/['"]use client['"];?/g, '');

                // Remove export statements
                code = code.replace(/export\\s+default\\s+/g, '').replace(/export\\s+/g, '');

                // Find function name
                var functionMatch = code.match(/function\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*\\(/);
                var functionName = functionMatch ? functionMatch[1] : null;

                if (!functionName) throw new Error('Could not find function component');

                // Transform JSX and TypeScript using Babel
                var transformed = Babel.transform(code, {
                    presets: ['react', 'typescript'],
                    filename: 'component.tsx',
                }).code;

                // Inject Icon declarations
                var iconInjects = importedIcons.map(function(icon) {
                    return 'var ' + icon.alias + ' = window.LucideProxy.' + icon.name + ';';
                }).join('\\n');

                var wrapperCode = 
                    'var useState = React.useState;' +
                    'var useEffect = React.useEffect;' +
                    'var useCallback = React.useCallback;' +
                    'var useMemo = React.useMemo;' +
                    'var useRef = React.useRef;' +
                    'var useContext = React.useContext;' +
                    'var useReducer = React.useReducer;' +
                    iconInjects + '\\n' +
                    transformed +
                    ';return ' + functionName + ';';

                var Component = new Function('React', wrapperCode)(React);
                
                if (typeof Component !== 'function') {
                    throw new Error('Component is not a valid React function component');
                }
                
                var rootEl = document.getElementById('root');
                ReactDOM.createRoot(rootEl).render(React.createElement(Component));

            } catch (err) {
                console.error('[Preview] Error:', err);
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
                                sandbox="allow-scripts allow-same-origin"
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
                                sandbox="allow-scripts allow-same-origin"
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
