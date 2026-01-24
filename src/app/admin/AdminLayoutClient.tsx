'use client';

import { useState, useEffect } from 'react';
import { Layers, LayoutDashboard, Package, LogOut, ChevronLeft, ChevronRight, Menu, FolderOpen, ImageIcon, Layout } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AdminLayoutClientProps {
    children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Persist collapsed state
    useEffect(() => {
        const saved = localStorage.getItem('admin-sidebar-collapsed');
        if (saved) setIsCollapsed(saved === 'true');
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('admin-sidebar-collapsed', String(newState));
    };

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Components', href: '/admin/components', icon: Package },
        { name: 'Templates', href: '/admin/templates', icon: Layout },
        { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
        { name: 'Images', href: '/admin/images', icon: ImageIcon },
    ];

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-slate-900 z-50 p-4 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        <Layers className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">SediaAdmin</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-slate-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Main Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800 flex flex-col h-screen",
                    isCollapsed ? "w-20" : "w-64",
                    // Mobile handling
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    "lg:flex shadow-xl justify-between"
                )}
            >
                {/* Brand Header (Fixed Top, Outside Overflow) */}
                <div className={cn(
                    "h-16 flex items-center border-b border-slate-800 shrink-0 relative z-50",
                    isCollapsed ? "justify-center px-0" : "px-6 gap-3"
                )}>
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/25">
                        <Layers className="w-5 h-5" />
                    </div>
                    <span className={cn(
                        "font-bold text-lg tracking-tight text-white transition-opacity duration-300",
                        isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                    )}>
                        SediaAdmin
                    </span>

                    {/* Floating Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className={cn(
                            "absolute -right-3 top-5 w-6 h-6 rounded-full bg-primary text-white border-2 border-slate-900 flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all shadow-md focus:outline-none z-[60]",
                        )}
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                    </button>
                </div>

                {/* Top Section: Nav Only */}
                <div className="flex flex-col flex-1 overflow-hidden min-h-0">
                    {/* Navigation Items (Scrollable) */}
                    <div className={cn(
                        "flex-1 py-6 px-3 space-y-2 overflow-y-auto min-h-0",
                        isCollapsed ? "overflow-x-hidden no-scrollbar" : "custom-scrollbar"
                    )}>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={isCollapsed ? item.name : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                                    isActive(item.href)
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "hover:bg-slate-800 hover:text-white",
                                    isCollapsed && "justify-center px-0"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.href) && "animate-pulse-subtle")} />
                                <span className={cn(
                                    "transition-all duration-300 whitespace-nowrap",
                                    isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                                )}>
                                    {item.name}
                                </span>
                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <div className="absolute left-14 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 whitespace-nowrap shadow-lg border border-slate-700 ml-2">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer / Logout (Fixed at Bottom) */}
                <div className="p-4 border-t border-slate-800 space-y-2 shrink-0 bg-slate-900 z-10">
                    <form action="/api/admin/logout" method="POST">
                        <button
                            type="submit"
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-left group"
                            )}
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                            <span className={cn(
                                "transition-all duration-300",
                                isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
                            )}>
                                Logout
                            </span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <main className={cn(
                "flex-1 min-h-screen transition-all duration-300 ease-in-out pt-16 lg:pt-0",
                isCollapsed ? "lg:ml-20" : "lg:ml-64"
            )}>
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
