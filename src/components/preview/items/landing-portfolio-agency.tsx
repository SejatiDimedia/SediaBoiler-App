'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight, ExternalLink, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

export function LandingPortfolioAgency() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="text-2xl font-bold tracking-tighter">
                        <span className="text-white">Studio</span>
                        <span className="text-violet-500">.</span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden sm:flex items-center gap-4 md:gap-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs md:text-sm font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden sm:flex items-center gap-4">
                        <button className="text-xs md:text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all whitespace-nowrap">
                            Let's Talk
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="sm:hidden p-2 text-slate-400"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden bg-slate-900 border-t border-white/5 p-4">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block py-3 text-slate-300 hover:text-white font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="w-full mt-4 py-3 bg-violet-600 text-white rounded-lg font-medium">
                        Let's Talk
                    </button>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl">
                    <p className="text-violet-400 font-medium mb-4 tracking-wide uppercase text-sm">
                        Creative Digital Agency
                    </p>
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                        We craft digital
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            experiences that matter
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                        Transform your brand with stunning designs, seamless development, and strategic solutions that drive real results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors">
                            View Our Work
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/5 transition-colors">
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Services() {
    const services = [
        {
            number: "01",
            title: "Brand Strategy",
            description: "We build compelling brand narratives that resonate with your audience and set you apart from competitors."
        },
        {
            number: "02",
            title: "Web Design",
            description: "Beautiful, responsive websites designed to convert visitors into customers."
        },
        {
            number: "03",
            title: "Development",
            description: "Clean, scalable code built with modern technologies for optimal performance."
        },
        {
            number: "04",
            title: "Digital Marketing",
            description: "Data-driven strategies to grow your online presence and reach your target audience."
        }
    ];

    return (
        <section id="services" className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">What We Do</p>
                    <h2 className="text-4xl lg:text-5xl font-bold">Our Services</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.number}
                            className="group p-8 border border-white/10 rounded-2xl hover:border-violet-500/50 hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <span className="text-5xl font-bold text-white/10 group-hover:text-violet-500/30 transition-colors">
                                {service.number}
                            </span>
                            <h3 className="text-2xl font-bold mt-4 mb-3">{service.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Portfolio() {
    const projects = [
        {
            title: "Fintech Dashboard",
            category: "Web App",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
        },
        {
            title: "E-commerce Redesign",
            category: "Website",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
        },
        {
            title: "Brand Identity",
            category: "Branding",
            image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop"
        },
        {
            title: "Mobile Banking",
            category: "Mobile App",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
        }
    ];

    return (
        <section id="work" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                    <div>
                        <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">Portfolio</p>
                        <h2 className="text-4xl lg:text-5xl font-bold">Selected Work</h2>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mt-4 md:mt-0 transition-colors">
                        View All Projects <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="text-violet-400 text-sm font-medium">{project.category}</span>
                                <h3 className="text-2xl font-bold mt-1 flex items-center gap-2">
                                    {project.title}
                                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    const stats = [
        { value: "150+", label: "Projects Completed" },
        { value: "50+", label: "Happy Clients" },
        { value: "8+", label: "Years Experience" },
        { value: "15", label: "Team Members" },
    ];

    return (
        <section id="about" className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">About Us</p>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            We're a team of creative problem solvers
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Founded in 2016, we've grown from a small design studio into a full-service digital agency. We believe in the power of design to transform businesses and create meaningful connections with audiences.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                                alt="Our Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-violet-600 rounded-2xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section id="contact" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-violet-400 font-medium mb-2 uppercase tracking-wide text-sm">Contact</p>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's work together</h2>
                    <p className="text-slate-400 text-lg mb-10">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
                    </p>

                    <form className="space-y-6 text-left">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            Send Message
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <a href="#" className="text-2xl font-bold tracking-tighter">
                            <span className="text-white">Studio</span>
                            <span className="text-violet-500">.</span>
                        </a>
                        <p className="text-slate-400 mt-4 max-w-md">
                            A creative digital agency crafting beautiful digital experiences for ambitious brands worldwide.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Twitter className="w-5 h-5 text-slate-400" />
                            </a>
                            <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5 text-slate-400" />
                            </a>
                            <a href="#" className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <Linkedin className="w-5 h-5 text-slate-400" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                            <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact Info</h4>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                hello@studio.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                San Francisco, CA
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-slate-500 text-sm">
                    © 2026 Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
