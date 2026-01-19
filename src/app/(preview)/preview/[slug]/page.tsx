'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { componentRegistry } from '@/components/preview/registry';
import { Suspense, useEffect, useState, useRef, useCallback } from 'react';

function DynamicPreview({ code, theme }: { code: string; theme: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [error, setError] = useState<string | null>(null);

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
        #root { width: 100%; min-height: 100vh; }
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
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script>
        window.__componentCode__ = ${JSON.stringify(componentCode)};
    </script>
    <script>
        function initPreview() {
            if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof Babel === 'undefined') {
                setTimeout(initPreview, 100);
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
                        '<h2>Preview Error</h2>' +
                        '<p style="font-family: monospace; background: #fef2f2; padding: 0.5rem; border-radius: 0.25rem;">' + err.message + '</p>' +
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

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe || !code) return;

        const isDark = theme === 'dark';
        const content = createPreviewContent(code, isDark);

        try {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            iframe.src = url;
            setError(null);

            return () => URL.revokeObjectURL(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create preview');
        }
    }, [code, theme, createPreviewContent]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <iframe
            ref={iframeRef}
            className="w-full min-h-screen border-0"
            title="Component Preview"
            sandbox="allow-scripts"
        />
    );
}

function PreviewContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params.slug as string;
    const theme = searchParams.get('theme') || 'light';

    const [dbCode, setDbCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    // First check static registry
    const StaticComponent = componentRegistry[slug];

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'theme-change') {
                if (event.data.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [theme]);

    // If not in static registry, fetch from database
    useEffect(() => {
        if (StaticComponent) return;

        setIsLoading(true);
        fetch(`/api/components/by-slug/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(component => {
                if (component && component.code) {
                    setDbCode(component.code);
                } else {
                    setNotFound(true);
                }
            })
            .catch(() => setNotFound(true))
            .finally(() => setIsLoading(false));
    }, [slug, StaticComponent]);

    // Render static component if found
    if (StaticComponent) {
        return (
            <div className="w-full">
                <StaticComponent />
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted">Loading preview...</p>
            </div>
        );
    }

    // Not found
    if (notFound) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted">Component not found: {slug}</p>
            </div>
        );
    }

    // Render dynamic component from database
    if (dbCode) {
        return <DynamicPreview code={dbCode} theme={theme} />;
    }

    return null;
}

export default function PreviewPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
