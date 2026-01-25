'use client';

import { cn } from '@/lib/utils';

const technologies = [
    { name: "Next.js", icon: (props: any) => <svg viewBox="0 0 180 180" fill="none" {...props}><mask id="mask0_408_134" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black" /></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" r="90" fill="black" /><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)" /><rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" /></g><defs><linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient><linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient></defs></svg> },
    { name: "React", icon: (props: any) => <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}><circle cx="0" cy="0" r="2.05" fill="#61dafb" /><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> },
    { name: "Tailwind CSS", icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M12.001 10.375C11.236 7.375 8.358 4.75 5.518 5.75C2.569 6.75 3.518 10.25 5.268 11.5C3.393 11.375 1.768 10.875 1.518 9.25C1.018 12.5 3.518 15.625 6.018 15.625C7.268 15.625 8.143 15 8.768 14.375C8.018 16.5 6.268 18 3.518 18.25C6.518 20.625 10.893 19.375 12.001 16.875C12.766 19.875 15.644 22.5 18.484 21.5C21.433 20.5 20.484 17 18.734 15.75C20.609 15.875 22.234 16.375 22.484 18C22.984 14.75 20.484 11.625 17.984 11.625C16.734 11.625 15.859 12.25 15.234 12.875C15.984 10.75 17.734 9.25 20.484 9C17.484 6.625 13.109 7.875 12.001 10.375Z" fill="#38bdf8" /></svg> },
    { name: "TypeScript", icon: (props: any) => <svg viewBox="0 0 128 128" {...props}><path d="M1.5,63.91C1.5,29.43,29.47,1.5,63.93,1.5c34.47,0,62.47,27.99,62.47,62.47s-28,62.47-62.47,62.47  C29.47,126.38,1.5,98.39,1.5,63.91z" fill="#007ACC" /><path d="M112.98,71.59c0-10.72-8.31-15.34-18.76-19.14c-4.32-1.48-7.3-2.6-7.3-6.19c0-2.3,1.86-3.83,6-3.83  c4.42,0,8.44,1.48,11.33,3.58l4.42-7.85c-3.13-2.63-9.05-5.34-16.14-5.34c-13.43,0-21.84,7.49-21.84,18.88  c0,11.39,9.45,15.7,18.39,19.26c5.2,1.99,6.72,3.93,6.72,6.84c0,2.81-2.91,4.49-7.18,4.49c-6.12,0-10.9-3.22-14.61-6.13l-4.71,7.96  c3.41,3.22,10.6,7.2,19.67,7.2C105.15,91.31,112.98,82.8,112.98,71.59z M69.58,54.67h-11.6v35.33H46.7V54.67H35.08V44.49h34.49  V54.67z" fill="#FFF" /></svg> },
    { name: "Supabase", icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3ECF8E" /></svg> },
    { name: "Prisma", icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2L2 22h20L12 2z" stroke="#0C344B" /></svg> }, // Placeholder for Prisma
];

export function TechStack() {
    return (
        <div className="w-full bg-background py-10 border-y border-border overflow-hidden relative">
            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex gap-16 animate-infinite-scroll min-w-max">
                {/* Double the list for infinite scroll effect */}
                {[...technologies, ...technologies, ...technologies].map((tech, i) => (
                    <div key={i} className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <tech.icon className="h-8 w-8 md:h-10 md:w-10" />
                        <span className="text-sm md:text-base font-semibold text-muted-foreground">{tech.name}</span>
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
