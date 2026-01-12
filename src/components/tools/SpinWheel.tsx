'use client';

import { useState, useEffect } from 'react';
import { Clan } from '@/types';
import { spinClan, simulateSpins } from '@/lib/game-logic';
import { Loader2, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinWheelProps {
    clans: Clan[];
}

export function SpinWheel({ clans }: SpinWheelProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentClan, setCurrentClan] = useState<Clan | null>(null);
    const [history, setHistory] = useState<Clan[]>([]);
    const [stats, setStats] = useState({ totalspins: 0, bestPull: null as Clan | null });

    // Animation state for the "rolling" effect
    const [displayClan, setDisplayClan] = useState<Clan | null>(null);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Start rolling animation
        let duration = 0;
        const interval = setInterval(() => {
            const randomPreview = clans[Math.floor(Math.random() * clans.length)];
            setDisplayClan(randomPreview);
            duration += 50;

            if (duration > 1500) {
                clearInterval(interval);
                finishSpin();
            }
        }, 50);
    };

    const finishSpin = () => {
        const result = spinClan(clans);
        setCurrentClan(result);
        setDisplayClan(result);
        setIsSpinning(false);

        // Update history
        setHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10

        // Update stats
        setStats(prev => {
            const isNewBest = !prev.bestPull || result.rarity < prev.bestPull.rarity; // Lower rarity is better/harder
            return {
                totalspins: prev.totalspins + 1,
                bestPull: isNewBest ? result : prev.bestPull
            };
        });
    };

    // Rarity color mapping
    const getRarityColor = (tier: string) => {
        switch (tier) {
            case 'S+': return 'text-red-500 shadow-red-500/50';
            case 'S': return 'text-purple-500 shadow-purple-500/50';
            case 'A': return 'text-blue-500 shadow-blue-500/50';
            case 'B': return 'text-green-500 shadow-green-500/50';
            default: return 'text-neutral-400 shadow-neutral-500/50';
        }
    };

    return (
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Main Spinner Area */}
            <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center backdrop-blur-sm">
                <div className="mb-8 flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-neutral-800 bg-black/40 p-8 shadow-inner">
                    {displayClan ? (
                        <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                            {displayClan.image && (
                                <div className="mb-6 h-32 w-32 overflow-hidden rounded-xl bg-neutral-900/50 p-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={displayClan.image} alt={displayClan.name} className="h-full w-full object-contain" />
                                </div>
                            )}
                            <span className={cn(
                                "block text-center text-4xl font-black uppercase tracking-tighter drop-shadow-2xl md:text-6xl",
                                getRarityColor(displayClan.tier)
                            )}>
                                {displayClan.name}
                            </span>
                            <div className="mt-4 flex items-center justify-center gap-3">
                                <span className="rounded-full bg-neutral-800 px-3 py-1 text-sm font-bold text-white">
                                    Tier {displayClan.tier}
                                </span>
                                <span className="text-sm font-medium text-neutral-500">
                                    {displayClan.rarity}% Chance
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-neutral-500">
                            <Sparkles className="h-12 w-12 opacity-20" />
                            <p>Ready to spin for your Technique...</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={spin}
                    disabled={isSpinning}
                    className={cn(
                        "group relative w-full overflow-hidden rounded-xl py-4 text-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]",
                        isSpinning
                            ? "cursor-not-allowed bg-neutral-800 opacity-50"
                            : "bg-gradient-to-r from-red-600 to-purple-600 shadow-lg shadow-red-900/20 hover:shadow-red-900/40"
                    )}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSpinning ? (
                            <>
                                <Loader2 className="h-6 w-6 animate-spin" />
                                Spinning...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="h-6 w-6 transition-transform group-hover:rotate-180" />
                                Spin Technique
                            </>
                        )}
                    </span>
                </button>
            </div>

            {/* Sidebar: Stats & History */}
            <div className="w-full space-y-6 md:w-80">
                {/* Stats Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Session Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-neutral-800/50 p-3">
                            <div className="text-xs text-neutral-500">Total Spins</div>
                            <div className="text-2xl font-bold text-white">{stats.totalspins}</div>
                        </div>
                        <div className="rounded-lg bg-neutral-800/50 p-3">
                            <div className="text-xs text-neutral-500">Best Pull</div>
                            <div className={cn("text-lg font-bold truncate", stats.bestPull ? getRarityColor(stats.bestPull.tier) : "text-neutral-600")}>
                                {stats.bestPull ? stats.bestPull.name : "-"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Log */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
                    <h3 className="mb-4 font-bold text-white">Recent Pulls</h3>
                    <div className="space-y-3">
                        {history.length > 0 ? (
                            history.map((clan, idx) => (
                                <div key={`${clan.id}-${idx}`} className="flex items-center justify-between border-b border-neutral-800 pb-2 last:border-0 last:pb-0">
                                    <span className="font-medium text-neutral-300">{clan.name}</span>
                                    <span className={cn("text-xs font-bold", getRarityColor(clan.tier))}>
                                        {clan.tier}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm italic text-neutral-600">No spins yet...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
