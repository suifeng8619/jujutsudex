import Link from "next/link";
import { ArrowRight, Disc, Gift } from "lucide-react";

interface HeroProps {
    activeCodeCount?: number;
}

export function Hero({ activeCodeCount = 24 }: HeroProps) {
    return (
        <div className="relative overflow-hidden border-b border-purple-900/20 bg-neutral-900/30 pt-16 pb-12 sm:pt-20 sm:pb-24 lg:pb-32">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 opacity-80" />
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] bg-red-600/5 blur-[100px] rounded-full" />

            <div className="container relative mx-auto px-4 text-center">
                <div className="mx-auto max-w-4xl">
                    {/* Dynamic Badge */}
                    <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-900/10 px-3 py-1.5 text-xs sm:text-sm text-purple-300">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                            Updated for Latest Patch
                        </div>
                        <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-900/10 px-3 py-1.5 text-xs sm:text-sm text-green-300">
                            <Gift className="h-3 w-3 mr-1.5" />
                            {activeCodeCount} Active Codes
                        </div>
                    </div>

                    <h1 className="bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-4">
                        Jujutsu <span className="text-purple-500">Infinite</span>
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                        Wiki, Codes & Strategy Guide
                    </h2>

                    <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed px-2">
                        The most comprehensive database for <strong>Jujutsu Infinite</strong> on Roblox.
                        Find the best <span className="text-purple-400">Clans</span>, master your <span className="text-red-400">Techniques</span>,
                        and optimize your build with our tools.
                    </p>

                    {/* CTA Buttons - Mobile Optimized */}
                    <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-2">
                        <Link
                            href="/codes"
                            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3.5 min-h-[48px] text-base font-bold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-200 hover:scale-105 active:scale-95"
                        >
                            <Disc className="h-5 w-5 text-purple-600" />
                            Get Latest Codes
                        </Link>
                        <Link
                            href="/tools/tier-list"
                            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 py-3.5 min-h-[48px] text-base font-bold text-white transition-all hover:bg-white/10 active:bg-white/20"
                        >
                            Explore Clans
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
