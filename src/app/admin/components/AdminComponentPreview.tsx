"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import {
	Eye,
	Code,
	RotateCcw,
	AlertCircle,
	Smartphone,
	Tablet,
	Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "mobile" | "tablet" | "desktop";

interface AdminComponentPreviewProps {
	code: string;
	className?: string;
}

export function AdminComponentPreview({
	code,
	className,
}: AdminComponentPreviewProps) {
	const { resolvedTheme } = useTheme();

	const [viewMode, setViewMode] = useState<ViewMode>("desktop");
	const [iframeKey, setIframeKey] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const createPreviewContent = useCallback(
		(componentCode: string, theme: string) => {
			const isDark = theme === "dark";

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
        a { color: ${isDark ? "#60a5fa" : "#3b82f6"}; text-decoration: none; }
        a:hover { color: ${isDark ? "#93c5fd" : "#2563eb"}; }
        button { cursor: pointer; border: none; outline: none; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script>
        // Define component code as a global variable
        window.__componentCode__ = ${JSON.stringify(componentCode)};

        // Helper to create SVG elements
        const createSvg = (props, children) => React.createElement('svg', {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            ...props
        }, ...children);

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
            BarChart3: (p) => createSvg(p, [React.createElement('path',{d:"M3 3v18h18"}),React.createElement('path',{d:"M18 17V9"}),React.createElement('path',{d:"M13 17V5"}),React.createElement('path',{d:"M8 17v-3"})]),
            Users: (p) => createSvg(p, [React.createElement('path',{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),React.createElement('circle',{cx:9,cy:7,r:4}),React.createElement('path',{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),React.createElement('path',{d:"M16 3.13a4 4 0 0 1 0 7.75"})]),
            Globe: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('path',{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}),React.createElement('path',{d:"M2 12h20"})]),
            ExternalLink: (p) => createSvg(p, [React.createElement('path',{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),React.createElement('polyline',{points:"15 3 21 3 21 9"}),React.createElement('line',{x1:10,x2:21,y1:14,y2:3})]),
            Mail: (p) => createSvg(p, [React.createElement('rect',{width:20,height:16,x:2,y:4,rx:2}),React.createElement('path',{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]),
            MapPin: (p) => createSvg(p, [React.createElement('path',{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"}),React.createElement('circle',{cx:12,cy:10,r:3})]),
            Phone: (p) => createSvg(p, [React.createElement('path',{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})]),
            Github: (p) => React.createElement('svg', {...p, viewBox:"0 0 24 24", fill:"currentColor", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round"}, React.createElement('path',{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}),React.createElement('path',{d:"M9 18c-4.51 2-5-2-7-2"})),
            Rocket: (p) => createSvg(p, [React.createElement('path',{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}),React.createElement('path',{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}),React.createElement('path',{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}),React.createElement('path',{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"})]),
            Palette: (p) => createSvg(p, [React.createElement('circle',{cx:13.5,cy:6.5,r:.5}),React.createElement('circle',{cx:17.5,cy:10.5,r:.5}),React.createElement('circle',{cx:8.5,cy:7.5,r:.5}),React.createElement('circle',{cx:6.5,cy:12.5,r:.5}),React.createElement('path',{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"})]),
            Flame: (p) => createSvg(p, [React.createElement('path',{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"})]),
            Target: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('circle',{cx:12,cy:12,r:6}),React.createElement('circle',{cx:12,cy:12,r:2})]),
            Sparkles: (p) => createSvg(p, [React.createElement('path',{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"}),React.createElement('path',{d:"M5 3v4"}),React.createElement('path',{d:"M19 17v4"}),React.createElement('path',{d:"M3 5h4"}),React.createElement('path',{d:"M17 19h4"})]),
            Wrench: (p) => createSvg(p, [React.createElement('path',{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"})]),
            ThumbsUp: (p) => createSvg(p, [React.createElement('path',{d:"M7 10v12"}),React.createElement('path',{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"})]),
            HelpCircle: (p) => createSvg(p, [React.createElement('circle',{cx:12,cy:12,r:10}),React.createElement('path',{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"}),React.createElement('path',{d:"M12 17h.01"})]),
        };

        // Fallback Proxy
        window.LucideProxy = new Proxy(window.LucideIcons, {
            get: (target, prop) => {
                if (prop in target) return target[prop];
                console.warn('[Preview] Missing icon:', prop);
                return (props) => target.DefaultIcon({...props, 'data-icon-name': prop});
            }
        });

        // Dynamic Resize Logic
        const observer = new ResizeObserver(entries => {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ type: 'preview-resize', height: height }, '*');
        });
        
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body);
            setTimeout(() => {
                 window.parent.postMessage({ type: 'preview-resize', height: document.body.scrollHeight }, '*');
            }, 100);
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
                    iconInjects + '\\n' +
                    transformed +
                    ';return ' + functionName + ';';

                var Component = new Function('React', wrapperCode)(React);
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Component));

            } catch (err) {
                console.error('[Preview] Error:', err);
                document.getElementById('root').innerHTML = '<div style="color:red;padding:20px">Error: ' + err.message + '</div>';
            }
        }
        
        initPreview();
    </script>
</body>
</html>
			`;
		},
		[],
	);

	// Update iframe when code or theme changes
	useEffect(() => {
		if (!iframeRef.current) return;

		try {
			const html = createPreviewContent(code, resolvedTheme || "light");
			const blob = new Blob([html], { type: "text/html" });
			const url = URL.createObjectURL(blob);

			iframeRef.current.src = url;

			// Cleanup
			return () => {
				URL.revokeObjectURL(url);
			};
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create preview");
		}
	}, [code, resolvedTheme, iframeKey, createPreviewContent]);

	// Listen for errors and resize from iframe
	// Handles in main useEffect now to separate logic if needed, but combined above unique logic
	// Keeping this empty as we combined logic above but need to remove old effect


	const refreshPreview = () => {
		setError(null);
		setIframeKey((prev) => prev + 1);
	};



	const viewModes = [
		{ key: "mobile" as ViewMode, icon: Smartphone, label: "Mobile" },
		{ key: "tablet" as ViewMode, icon: Tablet, label: "Tablet" },
		{ key: "desktop" as ViewMode, icon: Monitor, label: "Desktop" },
	];

	const getPreviewWidth = (mode: ViewMode): string => {
		switch (mode) {
			case "mobile":
				return "375px";
			case "tablet":
				return "768px";
			case "desktop":
				return "100%";
		}
	};

	/* Dynamic Height Logic */
	const [dynamicHeight, setDynamicHeight] = useState("500px");

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data.type === "preview-resize") {
				// Add buffer to prevent scrollbars
				setDynamicHeight(`${event.data.height + 60}px`);
			} else if (event.data.type === "preview-error") {
				setError(event.data.error);
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	return (
		<div
			className={cn(
				"rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm",
				className,
			)}
		>
			{/* Header */}
			{/* ... header content ... */}
			{/* Keeping existing header code implicitly via precise targeting if possible, but replace_file_content replaces chunks. 
               I should target specific blocks or be careful. 
               Actually, I will target the specific lines for dynamicHeight logic and iframe style.
            */}
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-slate-200 bg-slate-50">
				{/* View Mode Toggles */}
				<div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
					{viewModes.map((mode) => (
						<button
							type="button"
							key={mode.key}
							onClick={() => setViewMode(mode.key)}
							className={cn(
								"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
								viewMode === mode.key
									? "bg-white text-slate-900 shadow-sm"
									: "text-slate-500 hover:text-slate-900",
							)}
							title={mode.label}
						>
							<mode.icon className="h-4 w-4" />
							<span className="hidden sm:inline">{mode.label}</span>
						</button>
					))}
				</div>

				{/* Actions */}
				{/* Actions */}
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={refreshPreview}
						className="p-2 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition"
						title="Refresh preview"
					>
						<RotateCcw
							className={cn("h-4 w-4", iframeKey > 0 && "animate-spin")}
						/>
					</button>
					{error && (
						<div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
							<AlertCircle className="h-4 w-4" />
							<span className="text-xs font-medium">Error</span>
						</div>
					)}
				</div>
			</div>

			{/* Preview Content */}
			<div className="overflow-y-auto">
				<div
					className={cn(
						"p-2 transition-colors duration-300",
						resolvedTheme === "dark" ? "bg-slate-950" : "bg-slate-50",
					)}
				>
					<div
						className={cn(
							"mx-auto transition-all duration-300 rounded-lg overflow-auto border",
							resolvedTheme === "dark"
								? "bg-slate-900 border-slate-800"
								: "bg-white border-slate-200",
						)}
						style={{
							maxWidth: getPreviewWidth(viewMode),
							width: "100%",
						}}
					>
						{error && (
							<div className="p-4 bg-red-50 border-b border-red-200 text-red-700">
								<div className="flex items-start gap-2">
									<AlertCircle className="h-5 w-5 mt-0.5" />
									<div>
										<p className="font-medium">Preview Error</p>
										<p className="text-sm mt-1">{error}</p>
									</div>
								</div>
							</div>
						)}
						<iframe
							key={iframeKey}
							ref={iframeRef}
							className="w-full border-0"
							style={{
								height: dynamicHeight,
								minHeight: "850px",
							}}
							title="Component Preview"
							sandbox="allow-scripts allow-same-origin"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
