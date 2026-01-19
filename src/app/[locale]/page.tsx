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
    Sparkles,
    CheckCircle2,
    Zap,
    Code2,
    Database,
    LayoutTemplate
} from 'lucide-react';
import { getAllCategoriesFromDb } from '@/lib/actions/categories';

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <HomePageClient locale={locale} />;
}

function HomePageClient({ locale }: { locale: string }) {
    const t = useTranslations('hero');
    const tFeatures = useTranslations('features');

    const features = [
        {
            icon: Copy,
            title: tFeatures('items.copyPaste.title'),
            description: tFeatures('items.copyPaste.description'),
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: Smartphone,
            title: tFeatures('items.responsive.title'),
            description: tFeatures('items.responsive.description'),
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            icon: Languages,
            title: tFeatures('items.bilingual.title'),
            description: tFeatures('items.bilingual.description'),
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            icon: Palette,
            title: tFeatures('items.modern.title'),
            description: tFeatures('items.modern.description'),
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
        {
            icon: Settings,
            title: tFeatures('items.customizable.title'),
            description: tFeatures('items.customizable.description'),
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            icon: Heart,
            title: tFeatures('items.openSource.title'),
            description: tFeatures('items.openSource.description'),
            color: "text-red-500",
            bg: "bg-red-500/10",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#0ea5e9] to-[#3b82f6]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 pointer-events-none">
                    <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#3b82f6] to-[#06b6d4]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{t('badge')}</span>
                    </div>

                    {/* Title */}
                    <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl">
                        {t('title')} <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 animate-gradient">
                            {t('titleHighlight')}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                        {t('description')}
                    </p>

                    {/* CTAs */}
                    <div className="animate-in fade-in zoom-in duration-700 delay-400 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/library">
                            <Button variant="premium" size="xl" className="w-full sm:w-auto gap-2 from-blue-600 to-cyan-600 hover:from-blue-600/90 hover:to-cyan-600/90 shadow-blue-500/25">
                                {t('cta')}
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Visual showing Copy Paste Workflow */}
                    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 mt-20 relative w-full max-w-5xl mx-auto">
                        <div className="absolute inset-x-0 -top-20 -bottom-20 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent blur-3xl -z-10" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center max-w-4xl mx-auto relative">
                            {/* Connection/Action Indicator (Floating Center) */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none hidden md:flex">
                                <div className="bg-background border border-border px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in zoom-in duration-700 delay-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-xs font-mono font-medium text-muted-foreground">Transferring...</span>
                                </div>
                            </div>

                            {/* Left: Code Window (Source) */}
                            <div className="relative group perspective-1000 z-10">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                <div className="relative rounded-xl border border-border bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col h-[280px]">
                                    {/* Editor Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/20 border border-white/5">
                                            <LayoutTemplate className="w-3 h-3 text-blue-400" />
                                            <span className="text-xs text-slate-300 font-mono">DashboardLayout.tsx</span>
                                        </div>
                                        {/* Copy Action */}
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            <Copy className="w-3 h-3" />
                                            <span className="text-[10px] font-medium">Copy</span>
                                        </div>
                                    </div>

                                    {/* Code Content */}
                                    <div className="p-4 text-left font-mono text-xs overflow-hidden flex-1 relative">
                                        <div className="flex gap-4 text-slate-500">
                                            <div className="select-none flex flex-col text-right border-r border-white/5 pr-4">
                                                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                                            </div>
                                            <div className="flex flex-col text-slate-300">
                                                <span><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">Layout</span>(&#123; <span className="text-red-400">children</span> &#125;) &#123;</span>
                                                <span className="pl-4"><span className="text-purple-400">return</span> (</span>
                                                <span className="pl-8 text-slate-300">&lt;<span className="text-pink-400">div</span> className=<span className="text-green-400">"flex h-screen"</span>&gt;</span>
                                                <span className="pl-12">&lt;<span className="text-yellow-400">Sidebar</span> /&gt;</span>
                                                <span className="pl-12 text-slate-300">&lt;<span className="text-pink-400">main</span> className=<span className="text-green-400">"flex-1"</span>&gt;</span>
                                                <span className="pl-16">&lt;<span className="text-yellow-400">Header</span> /&gt;</span>
                                                <span className="pl-16 text-slate-100">&#123;children&#125;</span>
                                                <span className="pl-12 text-slate-300">&lt;/<span className="text-pink-400">main</span>&gt;</span>
                                                <span className="pl-8 text-slate-300">&lt;/<span className="text-pink-400">div</span>&gt;</span>
                                                <span className="pl-4">);</span>
                                            </div>
                                        </div>

                                        {/* Floating Badge overlay */}
                                        <div className="absolute bottom-4 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-bounce duration-[2000ms]">
                                            Ctrl + C
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Preview Window (Target) */}
                            <div className="relative group perspective-1000 z-10">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                <div className="relative rounded-xl border border-border bg-background shadow-2xl overflow-hidden h-[280px] flex flex-col">
                                    {/* Browser Header */}
                                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/40">
                                        <div className="flex gap-2 text-muted-foreground/30">
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                            <ArrowRight className="w-4 h-4" />
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 bg-background border border-border rounded-md px-3 py-1 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            localhost:3000/dashboard
                                        </div>
                                    </div>

                                    {/* Preview Area (Mini Dashboard Layout) */}
                                    <div className="flex-1 overflow-hidden flex bg-slate-50 dark:bg-slate-900 absolute inset-0 top-[52px]">
                                        {/* Sidebar Preview */}
                                        <div className="w-16 border-r border-border h-full bg-background flex flex-col items-center py-4 gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/20" />
                                            <div className="w-8 h-8 rounded-lg bg-muted" />
                                            <div className="w-8 h-8 rounded-lg bg-muted" />
                                            <div className="mt-auto w-8 h-8 rounded-full bg-muted" />
                                        </div>
                                        {/* Main Content Preview */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="h-12 border-b border-border bg-background flex items-center px-4 justify-between">
                                                <div className="w-24 h-4 rounded bg-muted" />
                                                <div className="flex gap-2">
                                                    <div className="w-20 h-8 rounded bg-blue-500 text-[10px] text-white flex items-center justify-center">Add New</div>
                                                </div>
                                            </div>
                                            <div className="p-4 gap-4 grid grid-cols-2">
                                                <div className="h-32 rounded-xl border border-border bg-background p-3 shadow-sm">
                                                    <div className="w-8 h-8 rounded bg-blue-100 mb-2" />
                                                    <div className="w-16 h-3 rounded bg-muted mb-1" />
                                                    <div className="w-12 h-5 rounded bg-blue-500/10" />
                                                </div>
                                                <div className="h-32 rounded-xl border border-border bg-background p-3 shadow-sm">
                                                    <div className="w-8 h-8 rounded bg-purple-100 mb-2" />
                                                    <div className="w-16 h-3 rounded bg-muted mb-1" />
                                                    <div className="w-12 h-5 rounded bg-purple-500/10" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Badge overlay */}
                                        <div className="absolute bottom-4 left-4 bg-muted border border-border text-foreground text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-bounce duration-[2000ms] delay-700 z-20">
                                            Ctrl + V
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-accent/40 relative">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] text-slate-900/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                            {tFeatures('title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {tFeatures('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Proof Section (Optional Addition) */}
            <section className="py-20 border-t border-border/40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-foreground">100+</div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Components</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-foreground">TypeScript</div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Type Safe</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-foreground">Dark</div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Mode Ready</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-foreground">MIT</div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Open Source</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 via-transparent to-transparent" />

                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 md:p-16 overflow-hidden shadow-2xl text-center">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                                {locale === 'id' ? 'Siap Membangun Sesuatu yang Keren?' : 'Ready to Build Something Awesome?'}
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
                                {locale === 'id'
                                    ? 'Jelajahi koleksi komponen kami dan mulai membangun website impian Anda hari ini.'
                                    : 'Explore our component collection and start building your dream website today.'}
                            </p>
                            <Link href="/library">
                                <Button
                                    variant="secondary"
                                    size="xl"
                                    className="bg-white/90 text-primary hover:bg-white shadow-xl border-none backdrop-blur-sm"
                                >
                                    {locale === 'id' ? 'Jelajahi Library' : 'Explore Library'}
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
