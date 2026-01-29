'use client';

import { useState } from 'react';
import { ClipboardPaste, Loader2, X, FileJson, Check, AlertCircle } from 'lucide-react';
import { importPostsFromJson } from '@/lib/actions/blog';
import { useRouter } from 'next/navigation';

export function JsonImportModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [jsonText, setJsonText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const router = useRouter();

    const handleImport = async () => {
        if (!jsonText.trim()) {
            setStatus({ type: 'error', message: 'Please paste some JSON content.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: null, message: '' });

        try {
            // Robust parsing logic
            let cleanedText = jsonText.trim();

            // 1. Remove OUTER markdown code blocks if present
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
                let repairedText = cleanedText
                    .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Wrap keys
                    .replace(/("[a-zA-Z0-9_]+"\s*:\s*)([^"{\[\d\-][^]*?)(?=\s*,\s*\n\s*"|\s*\n\s*"|\s*[}\]])/g, (match, prefix, val) => {
                        const trimmedVal = val.trim().replace(/,$/, '');
                        if (trimmedVal.startsWith('"') || trimmedVal.startsWith('{') || trimmedVal.startsWith('[')) return match;
                        if (['true', 'false', 'null'].includes(trimmedVal) || !isNaN(Number(trimmedVal))) return match;

                        return prefix + '"' + trimmedVal.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
                    })
                    .replace(/,\s*([}\]])/g, '$1'); // Strip trailing commas

                try {
                    jsonData = JSON.parse(repairedText);
                } catch (e2) {
                    throw new Error('Could not parse JSON. Please ensure all text values are wrapped in double quotes.');
                }
            }

            // Ensure we have an object or array
            if (!jsonData || typeof jsonData !== 'object') {
                throw new Error('Invalid JSON structure: Expected an object or array.');
            }

            const result = await importPostsFromJson(jsonData);

            if (result && result.success) {
                setStatus({ type: 'success', message: `Successfully imported ${result.count} blog post(s).` });
                setJsonText('');
                router.refresh();
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus({ type: null, message: '' });
                }, 2000);
            } else {
                setStatus({ type: 'error', message: `Import failed: ${result?.error || 'Unknown error'}` });
            }
        } catch (error) {
            console.error('Import error:', error);
            setStatus({ type: 'error', message: error instanceof Error ? error.message : 'An unexpected error occurred.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 h-9 px-4 py-2 shadow-sm text-slate-700"
            >
                <FileJson className="w-4 h-4" />
                Import JSON
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <ClipboardPaste className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Import Blog Posts</h2>
                                    <p className="text-sm text-slate-500">Paste JSON data to bulk create posts</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 overflow-y-auto">
                            {status.message && (
                                <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 border ${status.type === 'success'
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {status.type === 'success' ? (
                                        <Check className="w-5 h-5 mt-0.5 shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                    )}
                                    <p className="text-sm font-medium leading-relaxed">{status.message}</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-slate-700">
                                    JSON Payload
                                </label>
                                <div className="relative">
                                    <textarea
                                        className="w-full h-[400px] p-4 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none text-slate-700 placeholder:text-slate-400"
                                        placeholder={`[
  {
    "slug": "my-new-post",
    "title": { "en": "My New Post" },
    "content": { "en": "# Hello World" }
  }
]`}
                                        value={jsonText}
                                        onChange={(e) => setJsonText(e.target.value)}
                                        disabled={isLoading}
                                        spellCheck={false}
                                    />
                                    <div className="absolute top-3 right-3 text-[10px] font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm pointer-events-none">
                                        JSON
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Supports robust parsing: keys don't strictly need quotes, and Markdown code blocks are automatically stripped.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={isLoading}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={isLoading || !jsonText.trim()}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <FileJson className="w-4 h-4" />
                                )}
                                {isLoading ? 'Importing...' : 'Import Data'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
