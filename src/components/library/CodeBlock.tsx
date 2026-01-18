'use client';

import { useEffect, useState, useRef } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
    const [html, setHtml] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function highlight() {
            try {
                const highlighted = await codeToHtml(code, {
                    lang: language,
                    theme: 'github-dark',
                });
                setHtml(highlighted);
            } catch (error) {
                console.error('Error highlighting code:', error);
                // Fallback to plain text
                setHtml(`<pre><code>${code}</code></pre>`);
            } finally {
                setIsLoading(false);
            }
        }

        highlight();
    }, [code, language]);

    if (isLoading) {
        return (
            <div className="animate-pulse bg-accent-dark rounded-lg p-4">
                <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-border rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-border rounded w-2/3"></div>
            </div>
        );
    }

    return (
        <div
            className="rounded-lg overflow-auto text-sm [&>pre]:p-4 [&>pre]:bg-[#0d1117] [&>pre]:m-0"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
