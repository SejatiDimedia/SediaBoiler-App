import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

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
