'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight, Star, Zap, Check, Rocket, Palette, Flame, Target, Sparkles, Wrench, ThumbsUp, HelpCircle, Play } from 'lucide-react';

// Social icons
const Twitter = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const Instagram = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Linkedin = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const Music = ({ className = '' }: { className?: string }) => (
    <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
);

export function LandingNeubrutalism() {
    return (
        <div className="min-h-screen bg-[#FFFBEB] font-sans">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#FFFBEB] border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black rounded-lg rotate-6 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">Zonky</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {['Features', 'Pricing', 'About', 'Blog'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="px-4 py-2 text-lg font-bold hover:bg-[#FFE566] hover:border-2 hover:border-black rounded-lg transition-all"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="px-5 py-2.5 text-lg font-bold border-4 border-black rounded-xl bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                            Log In
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 text-lg font-bold border-4 border-black rounded-xl bg-[#A388EE] hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                            Get Started <Rocket className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#FFE566] border-t-4 border-black p-6">
                    {['Features', 'Pricing', 'About', 'Blog'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="block py-3 text-xl font-bold border-b-2 border-black/20"
                        >
                            {item}
                        </a>
                    ))}
                    <button className="flex items-center justify-center gap-2 w-full mt-4 py-3 text-lg font-bold border-4 border-black rounded-xl bg-[#A388EE]">
                        Get Started <Rocket className="w-5 h-5" />
                    </button>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE566] border-4 border-black rounded-full mb-6 rotate-[-2deg]">
                            <Star className="w-5 h-5 text-black fill-black" />
                            <span className="font-bold">Rated #1 by nobody lol</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] mb-6">
                            Build Stuff
                            <span className="block text-[#FF6B6B]" style={{ WebkitTextStroke: '3px black' }}>
                                That Doesn't Suck
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl font-medium text-gray-700 mb-8 max-w-lg flex items-center gap-2 flex-wrap">
                            The anti-boring toolkit for rebels who want their websites to actually look different. No more template twins! <Sparkles className="w-6 h-6 inline text-[#A388EE]" />
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-black border-4 border-black rounded-2xl bg-[#A388EE] hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                Start Free Trial
                                <ArrowRight className="w-6 h-6" />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xl font-black border-4 border-black rounded-2xl bg-white hover:bg-[#FFE566] transition-colors">
                                Watch Demo <Play className="w-5 h-5 fill-current" />
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 mt-10">
                            <div className="flex -space-x-3">
                                {['#FF6B6B', '#FFE566', '#A388EE', '#4ECDC4'].map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full border-4 border-black"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-5 h-5 text-[#FFE566] fill-[#FFE566]" />
                                    ))}
                                </div>
                                <p className="font-bold">420+ happy weirdos</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div className="relative bg-[#4ECDC4] border-4 border-black rounded-3xl p-6 rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="bg-white border-4 border-black rounded-2xl p-4 -rotate-1">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-4 h-4 bg-[#FF6B6B] border-2 border-black rounded-full" />
                                    <div className="w-4 h-4 bg-[#FFE566] border-2 border-black rounded-full" />
                                    <div className="w-4 h-4 bg-[#4ECDC4] border-2 border-black rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-8 bg-[#A388EE] border-2 border-black rounded-lg" />
                                    <div className="h-8 bg-[#FFE566] border-2 border-black rounded-lg w-3/4" />
                                    <div className="h-8 bg-[#FF6B6B] border-2 border-black rounded-lg w-1/2" />
                                    <div className="h-24 bg-[#4ECDC4] border-2 border-black rounded-lg" />
                                </div>
                            </div>
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FFE566] border-4 border-black rounded-xl rotate-12 flex items-center justify-center">
                            <Palette className="w-8 h-8 text-black" />
                        </div>
                        <div className="absolute -bottom-4 -left-6 w-20 h-20 bg-[#FF6B6B] border-4 border-black rounded-full flex items-center justify-center animate-bounce">
                            <Flame className="w-10 h-10 text-black" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    const features = [
        { Icon: Target, title: "Zero BS Design", description: "No more generic templates. Every element screams personality.", color: "#FF6B6B" },
        { Icon: Zap, title: "Stupid Fast", description: "Loads faster than your attention span. We promise.", color: "#4ECDC4" },
        { Icon: Sparkles, title: "Weird & Proud", description: "Stand out from the boring crowd. Be memorable.", color: "#A388EE" },
        { Icon: Wrench, title: "Actually Easy", description: "Your grandma could use it. Probably. No offense, grandma.", color: "#FFE566" }
    ];

    return (
        <section id="features" className="py-20 bg-[#4ECDC4] border-y-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-black mb-4">
                        Why We're <span className="bg-[#FFE566] px-2 -rotate-1 inline-block border-4 border-black">Different</span>
                    </h2>
                    <p className="text-xl font-medium max-w-2xl mx-auto">
                        Spoiler: We actually care about making cool stuff, not just money (okay maybe a little money)
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white border-4 border-black rounded-2xl p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                            style={{ transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)` }}
                        >
                            <div
                                className="w-16 h-16 border-4 border-black rounded-xl flex items-center justify-center mb-4"
                                style={{ backgroundColor: feature.color }}
                            >
                                <feature.Icon className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-xl font-black mb-2">{feature.title}</h3>
                            <p className="text-gray-600 font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Pricing() {
    const plans = [
        { name: "Broke", price: "$0", description: "For the budget-conscious rebels", features: ["5 Projects", "Basic Templates", "Community Support", "Bragging Rights"], color: "#FFE566", popular: false },
        { name: "Ballin'", price: "$29", description: "For serious troublemakers", features: ["Unlimited Projects", "All Templates", "Priority Support", "Custom Domains", "Analytics", "Remove Watermark"], color: "#A388EE", popular: true },
        { name: "Bougie", price: "$99", description: "For the fancy pants", features: ["Everything in Ballin'", "White Label", "API Access", "Personal Account Manager", "First-born child priority"], color: "#4ECDC4", popular: false }
    ];

    return (
        <section id="pricing" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-black mb-4">
                        Simple <span className="text-[#FF6B6B]">Pricing</span>
                    </h2>
                    <p className="text-xl font-medium text-gray-600 flex items-center justify-center gap-2">No hidden fees. No BS. Pinky promise. <ThumbsUp className="w-6 h-6" /></p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white border-4 border-black rounded-3xl p-8 ${plan.popular ? 'scale-105' : ''}`}
                            style={{
                                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
                                transform: `rotate(${plan.popular ? 0 : index === 0 ? -2 : 2}deg)`
                            }}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF6B6B] border-4 border-black rounded-full font-black text-sm flex items-center gap-1 whitespace-nowrap">
                                    MOST POPULAR <Flame className="w-4 h-4" />
                                </div>
                            )}
                            <div className="w-full py-3 border-4 border-black rounded-xl text-center font-black text-xl mb-6" style={{ backgroundColor: plan.color }}>
                                {plan.name}
                            </div>
                            <div className="text-center mb-6">
                                <span className="text-5xl font-black">{plan.price}</span>
                                <span className="text-gray-500 font-bold">/month</span>
                                <p className="text-gray-600 mt-2">{plan.description}</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-[#4ECDC4] border-2 border-black rounded-md flex items-center justify-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 text-lg font-black border-4 border-black rounded-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" style={{ backgroundColor: plan.color }}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const testimonials = [
        { text: "Finally, a template that doesn't make me want to gouge my eyes out. 10/10 would recommend.", author: "Sarah K.", role: "Startup Founder", avatar: "#FF6B6B" },
        { text: "My competitors are so jealous of my site now. They keep asking where I got it. I just smile.", author: "Mike D.", role: "Agency Owner", avatar: "#A388EE" },
        { text: "Thought 'anti-mainstream' was just marketing BS. It's not. This is genuinely different.", author: "Lisa M.", role: "Designer", avatar: "#4ECDC4" }
    ];

    return (
        <section className="py-20 bg-[#A388EE] border-y-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-6xl font-black mb-4 flex items-center justify-center gap-4">
                        Don't Trust Us? <HelpCircle className="w-12 h-12 rotate-3" />
                    </h2>
                    <p className="text-xl font-medium">Trust these random strangers on the internet instead</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" style={{ transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)` }}>
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-6 h-6 text-[#FFE566] fill-[#FFE566]" />)}
                            </div>
                            <p className="text-lg font-medium mb-6">"{testimonial.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 border-4 border-black rounded-full flex items-center justify-center font-black text-white" style={{ backgroundColor: testimonial.avatar }}>
                                    {testimonial.author[0]}
                                </div>
                                <div>
                                    <p className="font-black">{testimonial.author}</p>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#FF6B6B] border-4 border-black rounded-3xl p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Stop Being Boring?</h2>
                    <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
                        Join the rebellion. Build something that actually makes people say "woah". Life's too short for bland websites.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center justify-center gap-2 px-10 py-5 text-xl font-black border-4 border-black rounded-2xl bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                            Start Building Now
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="mt-6 font-bold text-sm">No credit card needed. We're not that kind of company.</p>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black rounded-lg rotate-6 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-2xl font-black tracking-tight">Zonky</span>
                        </div>
                        <p className="text-lg font-medium text-gray-600 max-w-sm flex items-center gap-2">Making the internet weird again, one website at a time. <Sparkles className="w-5 h-5 text-[#A388EE]" /></p>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-4">Product</h4>
                        <ul className="space-y-2">
                            {['Features', 'Pricing', 'Templates', 'Roadmap'].map((item) => (<li key={item}><a href="#" className="font-medium text-gray-600 hover:text-black">{item}</a></li>))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-4">Company</h4>
                        <ul className="space-y-2">
                            {['About', 'Blog', 'Careers', 'Contact'].map((item) => (<li key={item}><a href="#" className="font-medium text-gray-600 hover:text-black">{item}</a></li>))}
                        </ul>
                    </div>
                </div>
                <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-bold text-gray-600 flex items-center gap-2">© 2026 Zonky. All rights reserved. Be weird. <Star className="w-5 h-5 text-[#FFE566] fill-[#FFE566]" /></p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-[#FFE566] border-4 border-black rounded-lg flex items-center justify-center hover:rotate-12 transition-transform"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 bg-[#FFE566] border-4 border-black rounded-lg flex items-center justify-center hover:rotate-12 transition-transform"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 bg-[#FFE566] border-4 border-black rounded-lg flex items-center justify-center hover:rotate-12 transition-transform"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="w-10 h-10 bg-[#FFE566] border-4 border-black rounded-lg flex items-center justify-center hover:rotate-12 transition-transform"><Music className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
