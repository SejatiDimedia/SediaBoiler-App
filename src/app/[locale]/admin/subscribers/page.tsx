'use client';

import { useState, useEffect } from 'react';
import { getSubscribers, deleteSubscriber } from '@/lib/actions/newsletter';
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

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        const data = await getSubscribers();
        setSubscribers(data);
        setLoading(false);
    };

    const handleDelete = async (id: string, email: string) => {
        if (!confirm(`Are you sure you want to remove ${email}?`)) return;

        const result = await deleteSubscriber(id);
        if (result.success) {
            toast.success(`Removed ${email}`);
            fetchSubscribers();
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                        Subscribers
                    </h1>
                    <p className="text-slate-500 mt-2">Manage your newsletter audience.</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium">
                    Total: {subscribers.length}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        Loading subscribers...
                                    </td>
                                </tr>
                            ) : subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        No subscribers found yet.
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sub.isSubscribed
                                                ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                                }`}>
                                                {sub.isSubscribed ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {sub.isSubscribed ? 'Active' : 'Unsubscribed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(sub.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(sub.id, sub.email)}
                                                className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
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
