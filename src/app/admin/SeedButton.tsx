'use client';

import { useState } from 'react';
import { Database, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SeedButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const router = useRouter();

    async function handleSeed() {
        if (!confirm('Are you sure you want to re-seed the database? This might duplicate initial data.')) return;

        setIsLoading(true);
        setStatus('idle');

        try {
            const res = await fetch('/api/admin/seed', { method: 'POST' });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Seed failed');

            setStatus('success');
            router.refresh();

            // Reset status after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={handleSeed}
            disabled={isLoading}
            className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm border
                ${status === 'success'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                    : status === 'error'
                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }
            `}
            title="Seed Database"
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
            ) : status === 'error' ? (
                <AlertCircle className="w-4 h-4" />
            ) : (
                <Database className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
                {isLoading ? 'Seeding...' : status === 'success' ? 'Done!' : status === 'error' ? 'Failed' : 'Seed DB'}
            </span>
        </button>
    );
}
