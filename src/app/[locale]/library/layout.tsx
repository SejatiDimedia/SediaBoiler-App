import { getAllCategoriesFromDb } from '@/lib/actions/categories';
import { LibrarySidebar } from '@/components/library/LibrarySidebar';
import { MobileLibraryNav } from '@/components/library/MobileLibraryNav';
import Script from 'next/script';

interface LibraryLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LibraryLayout({
    children,
    params,
}: LibraryLayoutProps) {
    const { locale } = await params;
    const categories = await getAllCategoriesFromDb();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Preload CDN scripts for dynamic component previews */}
            <Script
                src="https://unpkg.com/react@18/umd/react.production.min.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
                strategy="lazyOnload"
            />
            <Script
                src="https://unpkg.com/@babel/standalone/babel.min.js"
                strategy="lazyOnload"
            />
            <LibrarySidebar categories={categories} locale={locale as 'id' | 'en'} />
            <div className="flex-1 w-full min-w-0 flex flex-col">
                <MobileLibraryNav categories={categories} locale={locale as 'id' | 'en'} />
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
