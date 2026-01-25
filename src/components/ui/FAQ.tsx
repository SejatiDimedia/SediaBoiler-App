'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FAQ() {
    const t = useTranslations('faq');
    const faqKeys = ['installation', 'tech_stack', 'license', 'customization', 'roadmap'];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute -left-20 top-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -right-20 bottom-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Header */}
                    <div className="lg:col-span-4 flex flex-col justify-start pt-8">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-from to-brand-to text-white shadow-lg shadow-brand-from/20">
                                <HelpCircle className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to">FAQ</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                            {t('title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to">
                                {t('titleHighlight')}
                            </span>
                        </h2>
                    </div>

                    {/* RIGHT COLUMN: FAQ Items */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        {faqKeys.map((key, index) => (
                            <div
                                key={key}
                                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                    ? 'bg-gradient-to-br from-background to-brand-from/5 border-brand-from/30 shadow-xl shadow-brand-from/5'
                                    : 'bg-background hover:bg-accent/40 border-border/60 hover:border-border'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-bold transition-colors ${openIndex === index
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-from to-brand-to'
                                        : 'text-foreground'
                                        }`}>
                                        {t(`items.${key}.question`)}
                                    </span>
                                    <span className={`ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${openIndex === index
                                        ? 'bg-gradient-to-br from-brand-from to-brand-to border-brand-from text-white rotate-180 shadow-md shadow-brand-from/20'
                                        : 'bg-transparent border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground'
                                        }`}>
                                        <Plus className={`h-4 w-4 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`} />
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-dashed border-blue-500/10 mt-2">
                                        {t(`items.${key}.answer`)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
