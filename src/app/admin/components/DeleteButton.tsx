'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { deleteComponent } from '@/lib/actions/components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (!confirm('Yakin ingin menghapus komponen ini?')) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteComponent(id);
            router.refresh();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Gagal menghapus komponen');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
            title="Hapus"
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
