'use client';

import { useTranslations } from 'next-intl';
import { BookOpen, CheckCircle2, ChevronRight, Code2, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DocumentationClient() {
    const t = useTranslations('docs');
    const [activeSection, setActiveSection] = useState('getting-started');

    return (
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl relative min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Dynamic Background (Subtle Grid like Landing Page) */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-top opacity-[0.03] dark:opacity-[0.1] pointer-events-none" />

            {/* Header */}
            <div className="mb-16 border-b border-border pb-10 relative">
                {/* Ambient Glow (Subtle) */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-3xl opacity-50 pointer-events-none" />

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 mb-6 backdrop-blur-sm">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{t('badge')}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground leading-[1.1]">
                    {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t('titleHighlight')}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                {/* Sidebar - Desktop (Hidden on Mobile) */}
                <aside className="hidden lg:block lg:col-span-3 lg:border-r border-border lg:pr-8">
                    <nav className="sticky top-24 space-y-1">
                        <div className="mb-6 lg:mb-8">
                            <h2 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4 px-3 opacity-70">
                                {t('title')}
                            </h2>
                        </div>
                        {['getting-started', 'installation', 'components', 'templates', 'customization', 'faq'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 text-sm transition-all text-left relative group rounded-md",
                                    activeSection === section
                                        ? "bg-blue-500/5 text-blue-600 dark:text-blue-400 font-semibold"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium",
                                    section === 'installation' && activeSection !== 'installation' && "text-blue-600/80 hover:text-blue-700 hover:bg-blue-50/50"
                                )}
                            >
                                {activeSection === section && (
                                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-full" />
                                )}
                                {section === 'installation' ? (
                                    <span className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        <span>{t(`sections.${section}.title`)}</span>
                                    </span>
                                ) : (
                                    <span className={activeSection === section ? "ml-2" : ""}>{t(`sections.${section}.title`)}</span>
                                )}
                            </button>
                        ))}
                    </nav>

                </aside>

                {/* Mobile Navigation (Dropdown style) */}
                <div className="lg:hidden mb-8 sticky top-[4.5rem] z-30">
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-1 shadow-sm">
                        <select
                            value={activeSection}
                            onChange={(e) => setActiveSection(e.target.value)}
                            className="w-full bg-transparent p-2 text-foreground font-medium focus:outline-none appearance-none cursor-pointer"
                        >
                            {['getting-started', 'installation', 'components', 'templates', 'customization', 'faq'].map((section) => (
                                <option key={section} value={section} className="bg-background text-foreground">
                                    {t(`sections.${section}.title`)}
                                </option>
                            ))}
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
                    </div>
                </div>

                {/* Content */}
                <main className="lg:col-span-9 min-w-0">
                    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">

                        {/* Getting Started */}
                        {activeSection === 'getting-started' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 w-fit">{t('sections.getting-started.title')}</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-blue-500/20 pl-4">
                                        {t('sections.getting-started.description')}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-blue-500/30 transition-colors shadow-sm group">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground mt-0">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            {t('sections.getting-started.features.title')}
                                        </h3>
                                        <ul className="space-y-3 list-none pl-0">
                                            {['copyPaste', 'responsive', 'bilingual', 'modern', 'openSource'].map((key) => (
                                                <li key={key} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                                                    {t(`sections.getting-started.features.items.${key}`)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-cyan-500/30 transition-colors shadow-sm group">
                                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground mt-0">
                                            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 group-hover:scale-110 transition-transform">
                                                <Layers className="w-4 h-4" />
                                            </div>
                                            {t('sections.getting-started.useCases.title')}
                                        </h3>
                                        <div className="space-y-4">
                                            {['saas', 'portfolio', 'ecommerce', 'dashboard'].map((key) => (
                                                <div key={key}>
                                                    <h4 className="text-sm font-semibold text-foreground mb-1">
                                                        {t(`sections.getting-started.useCases.items.${key}.title`)}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t(`sections.getting-started.useCases.items.${key}.description`)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Installation */}
                        {activeSection === 'installation' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 text-foreground">{t('sections.installation.title')}</h2>
                                    <p className="text-lg text-muted-foreground mb-8">
                                        {t('sections.installation.description')}
                                    </p>

                                    <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                                        <div className="flex gap-4 items-start">
                                            <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-amber-700 dark:text-amber-300 text-sm mb-1">
                                                    {t('sections.installation.tip')}
                                                </p>
                                                <p className="text-sm text-amber-600/80 dark:text-amber-400/80 leading-relaxed">
                                                    {t('sections.installation.tipText')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="group">
                                        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-4 mt-0">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30">1</span>
                                            {t('sections.installation.step1.title')}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 pl-[44px]">{t('sections.installation.step1.description')}</p>
                                        <div className="pl-[48px] not-prose">
                                            <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-[#0f172a]">
                                                <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/5">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                                        <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                                                        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-mono font-medium">Terminal</span>
                                                </div>
                                                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed !bg-[#0f172a]">
                                                    <code className="text-slate-300 font-medium">{t('sections.installation.step1.code')}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-4 mt-0">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30">2</span>
                                            {t('sections.installation.step2.title')}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 pl-[44px]">{t('sections.installation.step2.description')}</p>
                                        <div className="pl-[48px] not-prose">
                                            <div className="rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-[#0f172a]">
                                                <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/5">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                                        <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                                                        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                                                    </div>
                                                    <span className="text-xs text-slate-500 font-mono font-medium">Terminal</span>
                                                </div>
                                                <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed !bg-[#0f172a]">
                                                    <code className="text-slate-300 font-medium">{t('sections.installation.step2.code')}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Other sections rendered generically for now to save space, but using correct keys */}
                        {['components', 'templates', 'customization', 'faq'].includes(activeSection) && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4 text-foreground tracking-tight">{t(`sections.${activeSection}.title`)}</h2>
                                    <p className="text-lg text-muted-foreground border-l-4 border-blue-500/20 pl-4">
                                        {t(`sections.${activeSection}.description`)}
                                    </p>
                                </div>
                                {/* Placeholder for content - the translations exist in en.json */}
                                <div className="py-12 text-center border border-dashed border-border rounded-xl bg-muted/30">
                                    <div className="inline-flex p-4 rounded-full bg-background mb-4 shadow-sm border border-border">
                                        <Code2 className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">
                                        Content for <span className="font-bold text-foreground">{t(`sections.${activeSection}.title`)}</span> is ready in en.json
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div >
    );
}

function LayoutTemplateIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            <rect width="18" height="7" x="3" y="3" rx="1" />
            <rect width="9" height="7" x="3" y="14" rx="1" />
            <rect width="5" height="7" x="16" y="14" rx="1" />
        </svg>
    )
}

function PaintbrushIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            <path d="M18.375 2.625a3.875 3.875 0 0 0-5.48 0l-9.023 9.024a2.91 2.91 0 0 0 1.25 4.605c2.56.818 4.238 2.015 5.592 5.093.076.173.22.303.4.364l2.427.81a.501.501 0 0 0 .61-.252l.968-2.179A17.96 17.96 0 0 0 19.349 7.72c.45-.486.883-.984 1.295-1.493a3.875 3.875 0 0 0-2.269-3.602Z" />
            <circle cx="15.5" cy="5.5" r=".5" fill="currentColor" />
        </svg>
    )
}

function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>
    )
}
