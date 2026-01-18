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

	// Create a blob URL with the component code
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
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            min-height: 100%;
            width: 100%;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            ${isDark ? "background: #0a0a0a; color: #fafafa;" : "background: #ffffff; color: #0a0a0a;"}
        }
        #root {
            width: 100%;
            /* Override min-h-screen to prevent centering issues */
        }
        /* Override min-h-screen class to prevent content centering in preview */
        .min-h-screen {
            min-height: auto !important;
        }
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.25;
        }
        p {
            line-height: 1.75;
        }
        button, input, select, textarea {
            font-family: inherit;
        }
        a {
            color: ${isDark ? "#60a5fa" : "#3b82f6"};
            text-decoration: none;
        }
        a:hover {
            color: ${isDark ? "#93c5fd" : "#2563eb"};
        }
        /* Button styles */
        button {
            cursor: pointer;
            border: none;
            outline: none;
        }
        /* Navigation specific */
        nav {
            width: 100%;
        }
        header {
            width: 100%;
        }
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

        // Dynamic Resize Logic
        const observer = new ResizeObserver(entries => {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ type: 'preview-resize', height: height }, '*');
        });
        
        // Wait for body to be available
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body);
            // Also send initial height
            setTimeout(() => {
                 window.parent.postMessage({ type: 'preview-resize', height: document.body.scrollHeight }, '*');
            }, 100);
        });
    </script>
    <script>
        // Wait for React, ReactDOM, and Babel to load
        function initPreview() {
            if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || typeof Babel === 'undefined') {
                console.log('[Preview] Waiting for libraries to load...');
                setTimeout(initPreview, 100);
                return;
            }
            
            console.log('[Preview] Libraries loaded, starting transformation...');
            
            try {
                // Get original code
                var code = window.__componentCode__;
                
                console.log('[Preview] Original code:', code);

                // Remove ALL export statements
                code = code.replace(/export\\s+default\\s+/g, '').replace(/export\\s+/g, '');

                console.log('[Preview] Code after removing exports:', code);

                // Find the function name from the code
                var functionMatch = code.match(/function\\s+([A-Za-z_][A-Za-z0-9_]*)\\s*\\(/);
                var functionName = functionMatch ? functionMatch[1] : null;
                
                console.log('[Preview] Detected function name:', functionName);

                if (!functionName) {
                    throw new Error('Could not find a function component. Make sure your code defines a function like: function MyComponent() { ... }');
                }

                // Transform JSX using Babel
                console.log('[Preview] Transforming with Babel...');
                var transformed = Babel.transform(code, {
                    presets: ['react'],
                    filename: 'component.tsx',
                }).code;

                console.log('[Preview] Transformed code:', transformed);

                // Create a function that will execute the code and return the component
                // We wrap it to provide React hooks in scope
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

                console.log('[Preview] Wrapper code:', wrapperCode);

                // Execute and get the component
                var Component = new Function('React', wrapperCode)(React);

                console.log('[Preview] Component:', Component);

                if (typeof Component !== 'function') {
                    throw new Error('Component is not a valid React function component');
                }

                // Render the component
                var rootEl = document.getElementById('root');
                console.log('[Preview] Rendering component:', Component.name || functionName);
                ReactDOM.createRoot(rootEl).render(React.createElement(Component));
                console.log('[Preview] Component rendered successfully!');

            } catch (err) {
                console.error('[Preview] Error:', err);
                console.error('[Preview] Stack:', err.stack);
                document.getElementById('root').innerHTML = 
                    '<div style="color: #dc2626; padding: 2rem; text-align: center; font-family: sans-serif;">' +
                        '<h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Preview Error</h2>' +
                        '<p style="margin: 0.5rem 0; font-family: monospace; background: #fef2f2; padding: 0.5rem; border-radius: 0.25rem;">' + (err.message || err.toString()) + '</p>' +
                        '<div style="margin-top: 1rem; text-align: left;">' +
                            '<p style="font-size: 0.875rem; color: #666; background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; font-family: monospace; white-space: pre-wrap;">' +
'Example format:\\n' +
'function MyComponent() {\\n' +
'  const [count, setCount] = useState(0);\\n' +
'  return &lt;div&gt;Count: {count}&lt;/div&gt;;\\n' +
'}' +
                            '</p>' +
                            '<p style="font-size: 0.875rem; color: #999; margin-top: 0.5rem;">' +
                                '💡 Tip: Open browser console (F12) to see detailed debug logs' +
                            '</p>' +
                        '</div>' +
                    '</div>';
            }
        }
        
        // Start initialization
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
				// Add small buffer to prevent scrollbars
				setDynamicHeight(`${event.data.height + 20}px`);
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
								minHeight: "100px",
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
