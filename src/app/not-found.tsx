'use client';

// Default 404 page for the application root.
// This is required because src/app/layout.tsx does not contain <html> and <body> tags
// (they are in [locale]/layout.tsx).
// If a 404 occurs outside the [locale] route (or bubbles up), this file is rendered.

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body className="bg-white text-slate-900 font-sans antialiased">
                <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <p className="text-xl text-slate-600 mb-8">Page Not Found</p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
                    >
                        Go Home
                    </a>
                </div>
            </body>
        </html>
    );
}
