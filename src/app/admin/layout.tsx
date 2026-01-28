import { requireAdminAuth } from '@/lib/admin-auth';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { AdminLayoutClient } from './AdminLayoutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin | SediaBoiler',
    icons: {
        icon: '/favicon.ico?v=3',
        apple: '/icon.png?v=3',
    }
};

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireAdminAuth();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
                <AdminLayoutClient>
                    {children}
                </AdminLayoutClient>
            </body>
        </html>
    );
}
