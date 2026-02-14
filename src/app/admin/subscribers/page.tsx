'use client';

import { useState, useEffect } from 'react';
import { getSubscribers, deleteSubscriber, toggleNewsletterPause, isNewsletterPaused } from '@/lib/actions/newsletter';
import { Button } from '@/components/ui/Button';
import { Trash2, Mail, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Subscriber {
    id: string;
    email: string;
    isSubscribed: boolean;
    createdAt: Date;
    unsubscribedAt: Date | null;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [subs, pausedState] = await Promise.all([
            getSubscribers(),
            isNewsletterPaused()
        ]);
        setSubscribers(subs);
        setIsPaused(pausedState);
        setLoading(false);
    };

    const handleTogglePause = async () => {
        const newState = !isPaused;
        const result = await toggleNewsletterPause(newState);
        if (result.success) {
            setIsPaused(newState);
            toast.success(newState ? "System Paused. No emails will be sent." : "System Resumed. Emails will be sent.");
        } else {
            toast.error("Failed to update system status.");
        }
    };

    const handleDelete = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to remove ${email}?`)) return;

        const result = await deleteSubscriber(id);
        if (result.success) {
            toast.success(`Removed ${email}`);
            fetchData();
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <Mail className="w-8 h-8 text-primary" />
                        Subscribers
                    </h1>
                    <p className="text-slate-500 mt-2 max-w-lg">
                        Manage your newsletter audience. View and remove subscribers from your mailing list.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleTogglePause}
                        disabled={loading}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border ${isPaused
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {isPaused ? (
                            <>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                                </span>
                                System Paused
                            </>
                        ) : (
                            <>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                System Active
                            </>
                        )}
                    </button>
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
                        Total: <span className="text-slate-900 font-bold">{subscribers.length}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Email</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Joined</th>
                                <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-slate-500">
                                        Loading subscribers...
                                    </td>
                                </tr>
                            ) : subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-slate-50 rounded-full border border-slate-100">
                                                <Mail className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">No subscribers found yet.</p>
                                                <p className="text-sm mt-1">Users will appear here when they sign up.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub) => (
                                    <tr key={sub.id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                {sub.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sub.isSubscribed
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {sub.isSubscribed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {sub.isSubscribed ? 'Active' : 'Unsubscribed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(sub.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(sub.id, sub.email)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100"
                                                title="Delete Subscriber"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
