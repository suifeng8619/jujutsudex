'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Disc, Zap, BookOpen, Crown, Sword, Star, HandMetal, Shirt } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/codes', label: 'Codes', icon: Disc },
    { href: '/tools/tier-list', label: 'Tier List', icon: Disc },
    { href: '/tools/spin-simulator', label: 'Simulator', icon: Crown },
    { href: '/wiki/clans/gojo-satoru', label: 'Wiki', icon: BookOpen },
    { href: '/wiki/tools', label: 'Weapons', icon: Sword },
    { href: '/wiki/traits', label: 'Traits', icon: Zap },
    { href: '/wiki/fighting-styles', label: 'Styles', icon: HandMetal },
    { href: '/wiki/gear', label: 'Gear', icon: Shirt },
    { href: '/wiki/awakenings', label: 'Awakenings', icon: Star },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-purple-900/30 bg-black/70 backdrop-blur-xl shadow-lg shadow-purple-900/10">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 font-bold text-white transition-all hover:opacity-90">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-600/50 transition-shadow group-hover:shadow-purple-500/70">
                            <Zap className="h-5 w-5" />
                        </div>
                        <span className="hidden text-xl sm:block">Jujutsu<span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Dex</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden gap-6 md:flex">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-medium transition-all",
                                        isActive ? "text-purple-400" : "text-neutral-400 hover:text-purple-300"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white md:hidden"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="border-t border-white/5 bg-black px-4 py-4 md:hidden">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                    pathname.startsWith(item.href)
                                        ? "bg-purple-900/30 text-purple-400 shadow-lg shadow-purple-900/20"
                                        : "text-neutral-400 hover:bg-purple-900/10 hover:text-purple-300"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
