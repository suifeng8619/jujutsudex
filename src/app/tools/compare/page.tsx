'use client';

import { useState } from 'react';
import { Scale, X, Plus, ChevronDown, Sparkles } from 'lucide-react';
import clansData from '@/data/clans.json';
import { cn } from '@/lib/utils';

interface Clan {
    id: string;
    name: string;
    rarity: number;
    tier: string;
    description: string;
    grade: string;
    image: string;
    stats: Record<string, string | undefined>;
    moves: string[];
}

const clans: Clan[] = clansData as unknown as Clan[];

const tierColors: { [key: string]: string } = {
    'S+': 'text-red-500 bg-red-950/30 border-red-900/50',
    'S': 'text-purple-500 bg-purple-950/30 border-purple-900/50',
    'A': 'text-blue-500 bg-blue-950/30 border-blue-900/50',
    'B': 'text-green-500 bg-green-950/30 border-green-900/50',
    'C': 'text-yellow-500 bg-yellow-950/30 border-yellow-900/50',
    'D': 'text-neutral-500 bg-neutral-950/30 border-neutral-900/50',
};

function ClanSelector({
    selectedClan,
    onSelect,
    onClear,
    excludeIds
}: {
    selectedClan: Clan | null;
    onSelect: (clan: Clan) => void;
    onClear: () => void;
    excludeIds: string[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    const availableClans = clans.filter(c => !excludeIds.includes(c.id));

    if (selectedClan) {
        return (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                        {selectedClan.image && (
                            <div className="h-16 w-16 overflow-hidden rounded-lg bg-neutral-800 p-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedClan.image}
                                    alt={selectedClan.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-white">{selectedClan.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold border', tierColors[selectedClan.tier])}>
                                    Tier {selectedClan.tier}
                                </span>
                                <span className="text-xs text-neutral-500">{selectedClan.rarity}%</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClear}
                        className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-800 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-dashed border-neutral-700 bg-neutral-900/30 p-6 text-neutral-400 transition-colors hover:border-purple-500/50 hover:text-purple-300"
            >
                <div className="flex items-center gap-3">
                    <Plus className="h-6 w-6" />
                    <span>Select a Clan</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')} />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
                    {availableClans.map((clan) => (
                        <button
                            key={clan.id}
                            onClick={() => {
                                onSelect(clan);
                                setIsOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-800"
                        >
                            {clan.image && (
                                <div className="h-10 w-10 overflow-hidden rounded-lg bg-neutral-800 p-1">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={clan.image}
                                        alt={clan.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="font-medium text-white">{clan.name}</div>
                                <div className="text-xs text-neutral-500">{clan.grade} - {clan.rarity}%</div>
                            </div>
                            <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold border', tierColors[clan.tier])}>
                                {clan.tier}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function ComparisonCard({ clan }: { clan: Clan }) {
    return (
        <div className="space-y-4">
            {/* Description */}
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
                <h4 className="mb-2 text-sm font-semibold text-neutral-500">Description</h4>
                <p className="text-sm text-neutral-300">{clan.description}</p>
            </div>

            {/* Stats */}
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
                <h4 className="mb-3 text-sm font-semibold text-neutral-500">Stats</h4>
                <div className="space-y-2">
                    {Object.entries(clan.stats).filter(([, value]) => value !== undefined).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-neutral-400">{key}</span>
                            <span className="text-sm font-medium text-white">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Moves */}
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
                <h4 className="mb-3 text-sm font-semibold text-neutral-500">Moves ({clan.moves.length})</h4>
                <div className="flex flex-wrap gap-2">
                    {clan.moves.map((move, idx) => (
                        <span
                            key={idx}
                            className="rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-neutral-300"
                        >
                            {move}
                        </span>
                    ))}
                </div>
            </div>

            {/* Rarity */}
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
                <h4 className="mb-2 text-sm font-semibold text-neutral-500">Pull Rate</h4>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div
                            className={cn(
                                'h-full rounded-full',
                                clan.rarity < 1 ? 'bg-red-500' :
                                clan.rarity < 5 ? 'bg-purple-500' :
                                clan.rarity < 10 ? 'bg-blue-500' :
                                clan.rarity < 20 ? 'bg-green-500' : 'bg-yellow-500'
                            )}
                            style={{ width: `${Math.min(clan.rarity, 100)}%` }}
                        />
                    </div>
                    <span className="text-sm font-bold text-white">{clan.rarity}%</span>
                </div>
            </div>
        </div>
    );
}

export default function ComparePage() {
    const [selectedClans, setSelectedClans] = useState<(Clan | null)[]>([null, null]);

    const handleSelect = (index: number, clan: Clan) => {
        const newSelection = [...selectedClans];
        newSelection[index] = clan;
        setSelectedClans(newSelection);
    };

    const handleClear = (index: number) => {
        const newSelection = [...selectedClans];
        newSelection[index] = null;
        setSelectedClans(newSelection);
    };

    const excludeIds = selectedClans.filter(c => c !== null).map(c => c!.id);

    return (
        <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
            {/* Header */}
            <section className="border-b border-neutral-800 bg-neutral-900/30 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 text-purple-500 mb-4">
                        <Scale className="h-6 w-6" />
                        <span className="text-sm font-bold uppercase tracking-wider">Comparison Tool</span>
                    </div>
                    <h1 className="text-3xl font-black text-white md:text-4xl">
                        Compare <span className="text-purple-500">Clans</span>
                    </h1>
                    <p className="mt-3 text-neutral-400 max-w-2xl">
                        Select two clans to compare their stats, moves, and abilities side by side.
                        Make informed decisions about which clan suits your playstyle.
                    </p>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Clan 1 */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-red-500" />
                            <h2 className="font-bold text-white">Clan 1</h2>
                        </div>
                        <ClanSelector
                            selectedClan={selectedClans[0]}
                            onSelect={(clan) => handleSelect(0, clan)}
                            onClear={() => handleClear(0)}
                            excludeIds={excludeIds}
                        />
                        {selectedClans[0] && (
                            <div className="mt-4">
                                <ComparisonCard clan={selectedClans[0]} />
                            </div>
                        )}
                    </div>

                    {/* Clan 2 */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-blue-500" />
                            <h2 className="font-bold text-white">Clan 2</h2>
                        </div>
                        <ClanSelector
                            selectedClan={selectedClans[1]}
                            onSelect={(clan) => handleSelect(1, clan)}
                            onClear={() => handleClear(1)}
                            excludeIds={excludeIds}
                        />
                        {selectedClans[1] && (
                            <div className="mt-4">
                                <ComparisonCard clan={selectedClans[1]} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Comparison Summary */}
                {selectedClans[0] && selectedClans[1] && (
                    <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8">
                        <h3 className="mb-6 text-xl font-bold text-white">Quick Comparison</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-neutral-800">
                                        <th className="pb-3 text-left text-neutral-500">Attribute</th>
                                        <th className="pb-3 text-center text-red-400">{selectedClans[0].name}</th>
                                        <th className="pb-3 text-center text-blue-400">{selectedClans[1].name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-neutral-800/50">
                                        <td className="py-3 text-neutral-400">Tier</td>
                                        <td className="py-3 text-center">
                                            <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold border', tierColors[selectedClans[0].tier])}>
                                                {selectedClans[0].tier}
                                            </span>
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className={cn('rounded-full px-2 py-0.5 text-xs font-bold border', tierColors[selectedClans[1].tier])}>
                                                {selectedClans[1].tier}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-neutral-800/50">
                                        <td className="py-3 text-neutral-400">Grade</td>
                                        <td className="py-3 text-center text-white">{selectedClans[0].grade}</td>
                                        <td className="py-3 text-center text-white">{selectedClans[1].grade}</td>
                                    </tr>
                                    <tr className="border-b border-neutral-800/50">
                                        <td className="py-3 text-neutral-400">Pull Rate</td>
                                        <td className="py-3 text-center text-white">{selectedClans[0].rarity}%</td>
                                        <td className="py-3 text-center text-white">{selectedClans[1].rarity}%</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-neutral-400">Move Count</td>
                                        <td className="py-3 text-center text-white">{selectedClans[0].moves.length}</td>
                                        <td className="py-3 text-center text-white">{selectedClans[1].moves.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!selectedClans[0] && !selectedClans[1] && (
                    <div className="mt-12 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/20 p-12 text-center">
                        <Scale className="mx-auto mb-4 h-12 w-12 text-neutral-600" />
                        <h3 className="mb-2 text-lg font-bold text-neutral-400">Select Clans to Compare</h3>
                        <p className="text-sm text-neutral-500">
                            Choose two clans from the dropdowns above to see a detailed comparison
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
