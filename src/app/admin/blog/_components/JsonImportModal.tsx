'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ClipboardPaste, Loader2, X } from 'lucide-react';
import { importPostsFromJson } from '@/lib/actions/blog';
import { useRouter } from 'next/navigation';

export function JsonImportModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [jsonText, setJsonText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleImport = async () => {
        if (!jsonText.trim()) {
            alert('Please paste some JSON content.');
            return;
        }

        setIsLoading(true);
        try {
            // Robust parsing logic
            let cleanedText = jsonText.trim();

            // 1. Remove OUTER markdown code blocks if present
            // We only want to strip if the whole thing is wrapped in ```json ... ```
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
            }

            let jsonData;
            try {
                // Try standard JSON first
                jsonData = JSON.parse(cleanedText);
            } catch (e) {
                console.warn('Standard JSON.parse failed, trying robust fix...');
                // 2. Attempt to fix common "relaxed" JSON or Javascript Object Literal styles
                // This version uses newline boundaries for multiline unquoted values
                let repairedText = cleanedText
                    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Wrap keys
                    .replace(/("[a-zA-Z0-9_]+"\s*:\s*)([^"{\[\d\-][^]*?)(?=\s*,\s*\n\s*"|\s*\n\s*"|\s*[}\]])/g, (match, prefix, val) => {
                        const trimmedVal = val.trim().replace(/,$/, '');
                        if (trimmedVal.startsWith('"') || trimmedVal.startsWith('{') || trimmedVal.startsWith('[')) return match;
                        if (['true', 'false', 'null'].includes(trimmedVal) || !isNaN(Number(trimmedVal))) return match;

                        return prefix + '"' + trimmedVal.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
                    })
                    .replace(/,\s*([}\]])/g, '$1'); // Strip trailing commas

                console.log('Repaired JSON Preview:', repairedText.substring(0, 500));

                try {
                    jsonData = JSON.parse(repairedText);
                } catch (e2) {
                    console.error('Robust parse failed. Error:', e2);
                    throw new Error('Could not parse JSON. Please ensure all text values are wrapped in double quotes "like this".');
                }
            }

            // Ensure we have an object or array
            if (!jsonData || typeof jsonData !== 'object') {
                throw new Error('Invalid JSON structure: Expected an object or array.');
            }

            console.log('Parsed JSON Success:', jsonData);
            const result = await importPostsFromJson(jsonData);
            console.log('Server response:', result);

            if (result && result.success) {
                alert(`Successfully imported ${result.count} blog post(s).`);
                setJsonText('');
                setIsOpen(false);
                router.refresh();
            } else {
                alert(`Import failed: ${result?.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Import error:', error);
            alert(error instanceof Error ? error.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsOpen(true)}
            >
                <ClipboardPaste className="w-4 h-4" />
                Import JSON
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="text-xl font-bold">Import Blog Post (JSON)</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Paste the JSON content generated by AI or from your backup.
                            </p>
                            <textarea
                                className="w-full h-80 p-4 rounded-xl border border-border bg-muted/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-from/50 resize-none"
                                placeholder='{ "slug": "my-post", "title": { "en": "Post", "id": "Kiriman" }, ... }'
                                value={jsonText}
                                onChange={(e) => setJsonText(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 p-6 bg-muted/30 border-t border-border">
                            <Button
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="gap-2"
                                onClick={handleImport}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ClipboardPaste className="w-4 h-4" />
                                )}
                                Import Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
