'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/lib/actions/newsletter';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link. Token is missing.');
            return;
        }

        verify();
    }, [token]);

    const verify = async () => {
        try {
            const result = await verifyEmail(token!);
            if (result.success) {
                setStatus('success');
                setMessage(result.message || 'Email verified successfully!');
            } else {
                setStatus('error');
                setMessage(result.error || 'Failed to verify email.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-w-md w-full">
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verifying Email...</h2>
                        <p className="text-slate-500">Please wait while we confirm your subscription.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Success!</h2>
                        <p className="text-slate-600 dark:text-slate-300">{message}</p>
                        <Link href="/" className="mt-4">
                            <div className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/25">
                                Return to Home
                            </div>
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Verification Failed</h2>
                        <p className="text-slate-600 dark:text-slate-300">{message}</p>
                        <Link href="/" className="mt-4">
                            <div className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors">
                                Return to Home
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
