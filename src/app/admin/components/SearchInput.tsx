'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function SearchInput({ placeholder }: { placeholder: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }

        startTransition(() => {
            router.replace(`?${params.toString()}`);
        });
    };

    return (
        <div className="relative hidden md:block group">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={searchParams.get('q')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm w-64 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-slate-700 placeholder:text-slate-400"
            />
            {isPending && (
                <div className="absolute right-3 top-3">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
