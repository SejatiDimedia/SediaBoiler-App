'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { deletePost } from '@/lib/actions/blog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeletePostButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await deletePost(id);
            if (res.success) {
                router.refresh();
            } else {
                alert('Failed to delete post: ' + res.error);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete post');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-100"
            title="Delete Post"
            disabled={isDeleting}
        >
            {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Trash2 className="w-4 h-4" />
            )}
        </button>
    );
}
