'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button'; // Assuming component exists
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-slate-50 p-6 rounded-full border border-slate-100 mb-6">
                <span className="text-4xl font-bold text-slate-400">404</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Halaman Tidak Ditemukan</h1>
            <p className="text-slate-500 max-w-md mb-8">
                Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak tersedia saat ini.
            </p>
            <Link href="/">
                <Button variant="primary" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Button>
            </Link>
        </div>
    );
}
