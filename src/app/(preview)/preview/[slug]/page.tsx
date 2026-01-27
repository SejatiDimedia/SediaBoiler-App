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
    </style>
    <!-- Import Map for handling bare imports -->
    <script type="importmap">
    {
        "imports": {
            "react": "https://esm.sh/react@19?dev",
            "react-dom/client": "https://esm.sh/react-dom@19/client?dev",
            "lucide-react": "https://esm.sh/lucide-react@0.469.0?dev"
        }
    }
    </script>
    <!-- Babel for transforming TSX to JS -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <!-- Hidden implementation script -->
    <script type="text/babel" data-type="module" data-presets="react,typescript">
        import React from 'react';
        import { createRoot } from 'react-dom/client';
        
        // User Code Injection
        const userCode = ${JSON.stringify(componentCode)};

        async function run() {
            try {
                // Transform User Code
                // We use Babel.transform to compile TSX -> JS (ESM)
                const { code } = Babel.transform(userCode, {
                    filename: 'component.tsx',
                    presets: [
                        ['react', { runtime: 'automatic', importSource: 'react' }],
                        ['typescript', { isTSX: true, allExtensions: true }]
                    ],
                    // Critical: Preserve import statements
                    targets: { esmodules: true },
                });

                // Create a blob URL for the module
                const blob = new Blob([code], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);

                // Dynamic Import the user module
                const module = await import(url);
                
                // Find the default export
                const Component = module.default;

                if (!Component) {
                    throw new Error('No default export found. Please export a component as default.');
                }

                // Mount
                const root = createRoot(document.getElementById('root'));
                root.render(React.createElement(Component));

            } catch (err) {
                console.error(err);
                document.getElementById('root').innerHTML = 
                    '<div style="color: #ef4444; padding: 20px; font-family: monospace;">' +
                    '<strong>Preview Error:</strong><br/>' + 
                    err.message +
                    '</div>';
            }
        }

        run();
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
