import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { getPublishedComponents } from '@/lib/actions/components';
import '../globals.css';
import { Geist, Geist_Mono, Outfit, Space_Grotesk } from 'next/font/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
    variable: '--font-space-grotesk',
    subsets: ['latin'],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = messages.metadata as any;

    return {
        title: {
            template: `%s | ${metadata.title}`,
            default: metadata.title,
        },
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            type: 'website',
            locale: locale,
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as 'id' | 'en')) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client side
    const messages = await getMessages();
    const components = await getPublishedComponents();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <NextIntlClientProvider messages={messages}>
                        <div className="flex min-h-screen flex-col">
                            <Navbar components={components} />
                            <main className="flex-1 pt-16">{children}</main>
                            <Footer />
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
