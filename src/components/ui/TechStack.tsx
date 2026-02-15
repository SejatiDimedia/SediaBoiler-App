'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Official Logos from svgl.app
const technologies = [
    {
        name: "Next.js",
        icon: (props: any) => {
            const { theme } = useTheme();
            const [mounted, setMounted] = useState(false);
            useEffect(() => setMounted(true), []);

            // Next.js official logo is black/white. We invert it based on theme.
            const isDark = mounted && theme === 'dark';

            return (
                <svg viewBox="0 0 180 180" {...props}>
                    <mask height="180" id="mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
                        <circle cx="90" cy="90" fill={isDark ? 'white' : 'black'} r="90"></circle>
                    </mask>
                    <g mask="url(#mask0_408_134)">
                        <circle cx="90" cy="90" fill={isDark ? 'white' : 'black'} r="90"></circle>
                        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"></path>
                        <rect fill="url(#paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect>
                    </g>
                    <defs>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5">
                            <stop stopColor={isDark ? 'black' : 'white'}></stop>
                            <stop offset="1" stopColor={isDark ? 'black' : 'white'} stopOpacity="0"></stop>
                        </linearGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875">
                            <stop stopColor={isDark ? 'black' : 'white'}></stop>
                            <stop offset="1" stopColor={isDark ? 'black' : 'white'} stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            );
        }
    },
    {
        name: "React",
        // React Official Logo
        icon: (props: any) => (
            <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}>
                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
            </svg>
        )
    },
    {
        name: "Tailwind CSS",
        // Tailwind Official
        icon: (props: any) => (
            <svg viewBox="0 0 54 33" {...props}>
                <g clipPath="url(#clip0_tailwind)">
                    <path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd" />
                </g>
                <defs>
                    <clipPath id="clip0_tailwind">
                        <path fill="#fff" d="M0 0h54v32.4H0z" />
                    </clipPath>
                </defs>
            </svg>
        )
    },
    {
        name: "TypeScript",
        // TypeScript Official
        icon: (props: any) => (
            <svg viewBox="0 0 256 256" {...props}>
                <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" fill="#3178C6" />
                <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF" />
            </svg>
        )
    },
    {
        name: "Supabase",
        // Supabase Official
        icon: (props: any) => (
            <svg viewBox="0 0 109 113" fill="none" {...props}>
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear_supabase)" />
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear_supabase)" fillOpacity="0.2" />
                <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E" />
                <defs>
                    <linearGradient id="paint0_linear_supabase" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#249361" />
                        <stop offset="1" stopColor="#3ECF8E" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_supabase" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#000" stopOpacity="0" />
                        <stop offset="1" stopColor="#000" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        )
    },
    {
        name: "Prisma",
        // Prisma Official
        icon: (props: any) => {
            const { theme } = useTheme();
            const [mounted, setMounted] = useState(false);
            useEffect(() => setMounted(true), []);

            const fillColor = mounted && theme === 'dark' ? '#fff' : '#0C344B';

            return (
                <svg viewBox="0 0 256 310" {...props}>
                    <path fill={fillColor} d="M254.313 235.519L148 9.749A17.063 17.063 0 00133.473.037a16.87 16.87 0 00-15.533 8.052L2.633 194.848a17.465 17.465 0 00.193 18.747L59.2 300.896a18.13 18.13 0 0020.363 7.489l163.599-48.392a17.929 17.929 0 0011.26-9.722 17.542 17.542 0 00-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05c-4.235 1.26-8.3-2.411-7.419-6.685l49.598-237.484c.927-4.443 7.063-5.147 9.003-1.035l91.814 194.973a6.63 6.63 0 01-4.18 9.18h.007z" />
                </svg>
            )
        }
    }
];

export function TechStack() {
    return (
        <div className="w-full bg-background py-8 border-y border-border overflow-hidden relative">
            <p className="text-center text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest">Powered by modern tech</p>

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex gap-12 md:gap-16 animate-infinite-scroll min-w-max">
                {/* Double the list for infinite scroll effect */}
                {[...technologies, ...technologies, ...technologies].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2.5 md:gap-3 transition-opacity duration-300 hover:opacity-80">
                        <tech.icon className="h-6 w-6 md:h-8 md:w-8" />
                        <span className="text-sm font-semibold text-foreground">{tech.name}</span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
}
