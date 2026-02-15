'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';
import { Copy, Layout, CheckCircle2 } from 'lucide-react';

export function HeroIllustration() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the tilt
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    // Handle mouse movement
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized position (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full perspective-1000 lg:h-[600px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[600px] preserve-3d"
            >
                {/* Glow behind illustration */}
                <div className="absolute inset-0 bg-brand-from/20 blur-[100px] -z-10 rounded-full" />

                {/* Energy Beam Connection */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none">
                    <svg className="w-full h-full overflow-visible">
                        <defs>
                            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                            <mask id="beam-mask">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            </mask>
                        </defs>
                        {/* Connecting Line */}
                        <motion.path
                            d="M100,280 C200,280 250,150 450,150"
                            fill="none"
                            stroke="url(#beam-gradient)"
                            strokeWidth="4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="hidden lg:block opacity-50"
                        />
                        {/* Moving Particle */}
                        <motion.circle
                            r="4"
                            fill="#fff"
                            className="hidden lg:block"
                            filter="url(#glow)"
                        >
                            <animateMotion
                                dur="3s"
                                repeatCount="indefinite"
                                path="M100,280 C200,280 250,150 450,150"
                            />
                        </motion.circle>
                    </svg>
                </div>

                {/* Floating "Copy-Paste" Transfer Animation */}
                <motion.div
                    className="absolute z-50 top-[25%] left-[25%] hidden md:block pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        x: [0, 20, 150, 200],
                        y: [0, -20, 80, 120],
                        scale: [0.5, 1, 1.1, 0],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                    }}
                >
                    <div className="flex items-center gap-2 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl border border-white/20">
                        <Copy className="w-3 h-3" />
                        <span>Component.tsx</span>
                    </div>
                    {/* Motion Trail */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-white/40 to-transparent blur-[1px]" />
                </motion.div>

                {/* Top Layer: Component Library (Source) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative group z-20 translate-z-20 transform-gpu"
                >
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-1 bg-gradient-to-tr from-brand-to to-brand-from rounded-2xl blur"
                    />
                    <div className="relative rounded-xl border border-border bg-background/80 backdrop-blur-md shadow-2xl overflow-hidden h-[300px] sm:h-[340px] w-full flex flex-col ring-1 ring-white/5">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Sapa Lib</div>
                        </div>

                        {/* Library Content */}
                        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <div className="h-4 w-1/3 bg-muted/20 rounded animate-pulse" />
                                <div className="h-2 w-1/2 bg-muted/20 rounded" />
                            </div>

                            {/* The Component Card being "Copied" */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group/card cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-brand-from/10 rounded-xl blur-xl transition-all opacity-0 group-hover/card:opacity-100" />
                                <div className="relative bg-background/20 border border-border rounded-xl p-3 sm:p-4 transition-all group-hover/card:border-brand-from/50 group-hover/card:shadow-lg hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-brand-from/10 flex items-center justify-center text-brand-from">
                                                <Layout className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm text-foreground">Hero Section</div>
                                                <div className="text-[10px] text-muted-foreground">Layouts</div>
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 bg-gradient-to-r from-brand-from to-brand-to text-white rounded-md text-[10px] font-bold flex items-center justify-center shadow-lg shadow-brand-from/20">
                                            Copy
                                        </div>
                                    </div>
                                    <div className="h-16 sm:h-20 bg-muted/10 rounded-lg border border-border border-dashed flex items-center justify-center">
                                        <div className="w-1/2 h-2 bg-muted/20 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="h-20 sm:h-24 bg-muted/20 rounded-xl border border-border border-dashed" />
                        </div>
                    </div>
                </motion.div>

                {/* Orbiting Tech Icons */}
                <>
                    {/* React Icon */}
                    <motion.div
                        className="absolute z-30 top-[-10%] right-[-10%] bg-background p-2 rounded-full border border-cyan-500/20 dark:border-cyan-500/30 shadow-lg shadow-cyan-500/10 dark:shadow-cyan-500/20"
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8">
                            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                            <g stroke="#61dafb" strokeWidth="1" fill="none">
                                <ellipse rx="11" ry="4.2" />
                                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                            </g>
                        </svg>
                    </motion.div>

                    {/* Tailwind Icon */}
                    <motion.div
                        className="absolute z-30 bottom-[20%] left-[-15%] bg-background p-2 rounded-full border border-sky-500/20 dark:border-sky-500/30 shadow-lg shadow-sky-500/10 dark:shadow-sky-500/20"
                        animate={{
                            y: [0, 15, 0],
                            rotate: [0, -10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    >
                        <svg viewBox="0 0 54 33" className="w-8 h-5">
                            <path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd" />
                        </svg>
                    </motion.div>

                    {/* TypeScript Icon */}
                    <motion.div
                        className="absolute z-30 bottom-[-5%] right-[20%] bg-background p-2 rounded-full border border-blue-500/20 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                    >
                        <svg viewBox="0 0 256 256" className="w-6 h-6">
                            <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6" />
                            <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF" />
                        </svg>
                    </motion.div>
                </>

                {/* Bottom Layer: Code Editor (Destination) */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="relative z-10 translate-x-4 -translate-y-10 sm:translate-x-12 sm:-translate-y-24 lg:translate-x-40 lg:-translate-y-48 transform-gpu"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-from to-brand-to rounded-2xl blur opacity-20" />
                    <div className="relative rounded-xl border border-border bg-background shadow-2xl overflow-hidden h-[260px] sm:h-[300px] w-full max-w-[340px] flex flex-col ring-1 ring-border/5 mx-auto">
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">page.tsx</div>
                        </div>
                        <div className="p-4 text-left font-mono text-[10px] sm:text-xs overflow-hidden flex-1 relative bg-background/50">
                            <div className="flex flex-col text-muted-foreground">
                                <span><span className="text-purple-500 dark:text-purple-400">import</span> <span className="text-blue-600 dark:text-blue-300">&#123; Button &#125;</span> <span className="text-purple-500 dark:text-purple-400">from</span> <span className="text-green-600 dark:text-green-300">'@ui'</span>;</span>
                                <span className="h-4" />
                                <span><span className="text-purple-500 dark:text-purple-400">export default</span> <span className="text-blue-600 dark:text-blue-400">function</span> <span className="text-yellow-600 dark:text-yellow-400">Page</span>() &#123;</span>
                                <span className="pl-4"><span className="text-purple-500 dark:text-purple-400">return</span> (</span>
                                <span className="pl-8 text-foreground/70">&lt;<span className="text-pink-600 dark:text-pink-400">main</span>&gt;</span>

                                {/* Typing Effect Area */}
                                <div className="pl-12 py-1 my-1 bg-brand-from/5 dark:bg-brand-from/10 border-l-2 border-brand-from animate-[pulse_4s_ease-in-out_infinite]">
                                    <span className="text-yellow-600 dark:text-yellow-300">&lt;HeroSection /&gt;</span>
                                </div>

                                <span className="pl-8 text-foreground/70">&lt;/<span className="text-pink-600 dark:text-pink-400">main</span>&gt;</span>
                                <span className="pl-4">);</span>
                                <span>&#125;</span>
                            </div>
                        </div>
                        {/* Pasted Toast */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1], repeatDelay: 1 }}
                            className="absolute bottom-4 right-4 bg-gradient-to-r from-brand-from to-brand-to text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                        >
                            <CheckCircle2 className="w-3 h-3" />
                            Pasted!
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-brand-from rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

            </motion.div>
        </div>
    );
}
