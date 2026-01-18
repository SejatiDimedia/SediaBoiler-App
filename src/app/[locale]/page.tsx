import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import {
    Copy,
    Smartphone,
    Languages,
    Palette,
    Settings,
    Heart,
    ArrowRight,
    Sparkles
} from 'lucide-react';

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HomePageClient />;
}

function HomePageClient() {
    const t = useTranslations('hero');
    const tFeatures = useTranslations('features');

    const features = [
        {
            icon: Copy,
            title: tFeatures('items.copyPaste.title'),
            description: tFeatures('items.copyPaste.description'),
        },
        {
            icon: Smartphone,
            title: tFeatures('items.responsive.title'),
            description: tFeatures('items.responsive.description'),
        },
        {
            icon: Languages,
            title: tFeatures('items.bilingual.title'),
            description: tFeatures('items.bilingual.description'),
        },
        {
            icon: Palette,
            title: tFeatures('items.modern.title'),
            description: tFeatures('items.modern.description'),
        },
        {
            icon: Settings,
            title: tFeatures('items.customizable.title'),
            description: tFeatures('items.customizable.description'),
        },
        {
            icon: Heart,
            title: tFeatures('items.openSource.title'),
            description: tFeatures('items.openSource.description'),
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-8">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{t('badge')}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
                            {t('title')}
                            <br />
                            <span className="text-primary">{t('titleHighlight')}</span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted mb-10">
                            {t('description')}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/library">
                                <Button size="lg">
                                    {t('cta')}
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg">
                                {t('ctaSecondary')}
                            </Button>
                        </div>
                    </div>

                    {/* Preview mockup placeholder */}
                    <div className="mt-16 md:mt-20">
                        <div className="mx-auto max-w-5xl rounded-xl border border-border bg-accent-dark/50 backdrop-blur-sm p-2 shadow-2xl">
                            <div className="rounded-lg bg-background border border-border overflow-hidden">
                                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <span className="text-xs text-muted">sediaboiler.dev</span>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/5 to-transparent">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
                                        <Copy className="h-8 w-8 text-primary" />
                                    </div>
                                    <p className="text-muted text-sm">Preview komponen akan ditampilkan di sini</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28 bg-accent">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {tFeatures('title')}
                        </h2>
                        <p className="text-lg text-muted max-w-2xl mx-auto">
                            {tFeatures('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-6 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-8 md:p-12 overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                        </div>

                        <div className="relative text-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                                {locale === 'id' ? 'Siap Membangun Sesuatu yang Keren?' : 'Ready to Build Something Awesome?'}
                            </h2>
                            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                                {locale === 'id'
                                    ? 'Jelajahi koleksi komponen kami dan mulai membangun website impian Anda hari ini.'
                                    : 'Explore our component collection and start building your dream website today.'}
                            </p>
                            <Link href="/library">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-primary hover:bg-white/90"
                                >
                                    {locale === 'id' ? 'Jelajahi Library' : 'Explore Library'}
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// Helper to get locale in component
function useLocaleFromPage() {
    return 'id';
}

const locale = 'id';
