import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SediaBoiler Admin',
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

export default function AdminPublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout has no auth check - it's for public admin pages like login
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
                {children}
            </body>
        </html>
    );
}
