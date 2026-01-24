"use client";

import { useState, useEffect } from "react";
import {
    Menu, X, Zap, Shield, BarChart3, Users, ArrowRight, Check,
    ChevronRight, Play, Globe, Star, ChevronDown
} from "lucide-react";

export function LandingSaaSStartup() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
            <Navbar />
            <Hero />
            <LogoCloud />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
}

// ============ NAVBAR ============
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "Features", href: "#features" },
        { name: "How it Works", href: "#how-it-works" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
                            S
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                            StartupKit
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden sm:flex items-center gap-4 md:gap-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs md:text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden sm:flex items-center gap-2 md:gap-4">
                        <button className="text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 px-2 md:px-3 py-2 whitespace-nowrap">
                            Log in
                        </button>
                        <button className="text-xs md:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="sm:hidden p-2 text-slate-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 sm:hidden flex flex-col gap-4 shadow-xl">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-slate-600 p-2 hover:bg-slate-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="h-px bg-slate-100 my-2" />
                    <button className="w-full py-3 text-center font-semibold text-slate-600 border border-slate-200 rounded-lg">
                        Log in
                    </button>
                    <button className="w-full py-3 text-center font-semibold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
                        Get Started
                    </button>
                </div>
            )}
        </header>
    );
}

// ============ HERO ============
function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    v2.0 is now live
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
                    Ship your startup <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        in days, not weeks
                    </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    The comprehensive boilerplate for modern SaaS applications.
                    Authentication, payments, and dashboard — all pre-configured and ready to go.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <button className="h-12 px-8 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-xl shadow-slate-900/20 flex items-center gap-2">
                        Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="h-12 px-8 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current" /> Watch Demo
                    </button>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                            <img
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                        ))}
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                            2k+
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="font-semibold text-slate-900 ml-2">5.0</span>
                        <span className="text-slate-400">from 2,000+ developers</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ LOGO CLOUD ============
function LogoCloud() {
    const logos = ["Acme", "Quantum", "Echo", "Celestial", "Pulse", "Apex"];
    return (
        <section className="py-10 border-y border-slate-100 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                    Trusted by innovative teams worldwide
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {logos.map((logo) => (
                        <div key={logo} className="text-xl font-bold flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-400 rounded-full" />
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ FEATURES ============
function Features() {
    const features = [
        {
            title: "Authentication",
            desc: "Secure user management with social logins, magic links, and MFA support out of the box.",
            icon: Shield,
            colSpan: "lg:col-span-2",
            bg: "bg-blue-50"
        },
        {
            title: "Analytics",
            desc: "Real-time insights and beautiful dashboards to track your growth.",
            icon: BarChart3,
            colSpan: "lg:col-span-1",
            bg: "bg-white"
        },
        {
            title: "Team Collaboration",
            desc: "Built-in roles and permissions for seamless team management.",
            icon: Users,
            colSpan: "lg:col-span-1",
            bg: "bg-white"
        },
        {
            title: "Global Payments",
            desc: "Accept payments from anywhere with multi-currency support and tax handling.",
            icon: Globe,
            colSpan: "lg:col-span-2",
            bg: "bg-indigo-50"
        },
    ];

    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Everything you need to launch
                    </h2>
                    <p className="text-lg text-slate-600">
                        We've handled the boring stuff so you can focus on building your unique value proposition.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`${feature.colSpan} rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition duration-300 ${feature.bg}`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                                <feature.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
    const steps = [
        { title: "Clone Repo", desc: "Start with our production-ready codebase." },
        { title: "Configure", desc: "Update env variables for your services." },
        { title: "Deploy", desc: "Push to Vercel and go live in minutes." },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            From idea to production in three simple steps
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Stop wasting time on boilerplate. Focus on your business logic and ship faster than your competitors.
                        </p>
                        <div className="space-y-8">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-none w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                        <p className="text-slate-400">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-2xl bg-slate-800 border border-slate-700 p-2 shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 blur-3xl -z-10" />
                            <div className="rounded-xl bg-slate-950 p-6 overflow-hidden">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="font-mono text-sm text-slate-300 space-y-2">
                                    <div className="flex">
                                        <span className="text-blue-400 mr-2">➜</span>
                                        <span>git clone https://github.com/startup/kit</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-blue-400 mr-2">➜</span>
                                        <span>cd kit && npm install</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-blue-400 mr-2">➜</span>
                                        <span>npm run dev</span>
                                    </div>
                                    <div className="text-green-400 mt-4">
                                        ✓ Ready on http://localhost:3000
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ TESTIMONIALS ============
function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-16">Loved by developers</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-700 mb-6 leading-relaxed">
                                "This library saved me weeks of work. The components are beautiful and the code is clean. Highly recommended for any serious founder."
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={`https://i.pravatar.cc/100?img=${i + 5}`} alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <div className="font-bold text-slate-900">Alex Johnston</div>
                                    <div className="text-sm text-slate-500">Founder, TechFlow</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ PRICING ============
function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, transparent pricing</h2>
                <p className="text-slate-600 mb-10">Start for free, scale as you grow.</p>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="relative w-14 h-8 rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                        Yearly <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {['Starter', 'Pro', 'Enterprise'].map((plan, idx) => (
                        <div key={plan} className={`relative p-8 rounded-3xl border ${idx === 1 ? 'border-blue-600 shadow-2xl scale-105 bg-white z-10' : 'border-slate-200 bg-slate-50'}`}>
                            {idx === 1 && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-lg font-bold mb-4">{plan}</h3>
                            <div className="text-4xl font-bold mb-2">
                                ${idx === 0 ? '0' : idx === 1 ? (isAnnual ? '29' : '39') : 'Custom'}
                            </div>
                            <div className="text-slate-500 text-sm mb-8">
                                {idx === 2 ? 'Contact us' : '/month per user'}
                            </div>
                            <ul className="space-y-4 mb-8 text-left">
                                {[1, 2, 3, 4, 5].map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                                        <Check className="w-5 h-5 text-blue-600 shrink-0" />
                                        <span>Feature item description goes here</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${idx === 1
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}>
                                {idx === 0 ? 'Start Free' : idx === 1 ? 'Get Started' : 'Contact Sales'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ FAQ ============
function FAQ() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <details key={i} className="group bg-white rounded-xl border border-slate-200 open:ring-2 open:ring-blue-100 transition-all">
                            <summary className="flex items-center justify-between p-6 font-semibold cursor-pointer select-none">
                                Can I use this for commercial projects?
                                <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                Yes, absolutely! Once you purchase the license, you can use it for as many projects as you want, both personal and commercial.
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ CTA ============
function CTA() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="relative rounded-[2.5rem] bg-slate-900 py-20 px-8 text-center overflow-hidden shadow-2xl">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to ship your next big thing?
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Join 10,000+ developers who are building faster with StartupKit.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                Get Started Now <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ FOOTER ============
function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">S</div>
                            <span className="text-xl font-bold text-slate-900">StartupKit</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs mb-6">
                            The ultimate boilerplate for Next.js applications. Build better, ship faster.
                        </p>
                        <div className="flex gap-4">
                            {['Twitter', 'GitHub', 'Discord'].map((social) => (
                                <a key={social} href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {[
                        { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
                        { title: 'Resources', links: ['Documentation', 'Guides', 'API Reference', 'Support'] },
                        { title: 'Company', links: ['About', 'Blog', 'Careers', 'Legal'] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="font-bold text-slate-900 mb-4">{col.title}</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                {col.links.map(link => (
                                    <li key={link}><a href="#" className="hover:text-blue-600 transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                    <p>© 2024 StartupKit. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-900">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
