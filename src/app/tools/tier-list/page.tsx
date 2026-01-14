import { promises as fs } from 'fs';
import path from 'path';
import { Clan } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Clan Tier List - Strongest Techniques',
    description: 'Ranked tier list of all clans and techniques in Jujutsu Infinite. Find out which clans are S+ tier.',
};

async function getClans(): Promise<Clan[]> {
    const filePath = path.join(process.cwd(), 'src/data/clans.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

const tierOrder = ['S+', 'S', 'A', 'B', 'C', 'D'];
const tierColors: { [key: string]: string } = {
    'S+': 'bg-red-600 border-red-500 text-white',
    'S': 'bg-orange-500 border-orange-400 text-white',
    'A': 'bg-purple-500 border-purple-400 text-white',
    'B': 'bg-blue-500 border-blue-400 text-white',
    'C': 'bg-neutral-600 border-neutral-500 text-neutral-200',
    'D': 'bg-neutral-700 border-neutral-600 text-neutral-300',
};

export default async function TierListPage() {
    const clans = await getClans();

    // Group by Tier
    const clansByTier = clans.reduce((acc, clan) => {
        if (!acc[clan.tier]) acc[clan.tier] = [];
        acc[clan.tier].push(clan);
        return acc;
    }, {} as { [key: string]: Clan[] });

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/" className="inline-flex items-center justify-center rounded-lg border border-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
                    Clan <span className="text-red-600">Tier List</span>
                </h1>
            </div>

            <div className="space-y-4">
                {tierOrder.map((tier) => {
                    const tierClans = clansByTier[tier] || [];
                    if (tierClans.length === 0) return null;

                    return (
                        <div key={tier} className="flex min-h-[100px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30">
                            {/* Tier Label */}
                            <div className={cn(
                                "flex w-24 flex-shrink-0 flex-col items-center justify-center border-r border-black/20 p-4 text-center font-black text-2xl shadow-inner md:w-32 md:text-4xl",
                                tierColors[tier]
                            )}>
                                {tier}
                            </div>

                            {/* Clan Grid */}
                            <div className="flex flex-1 flex-wrap items-center gap-3 p-4">
                                {tierClans.map((clan) => (
                                    <Link
                                        key={clan.id}
                                        href={`/wiki/clans/${clan.id}`}
                                        className="group relative flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:border-neutral-500 hover:bg-neutral-700"
                                    >
                                        {clan.image && (
                                            <div className="h-6 w-6 overflow-hidden rounded bg-neutral-900">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={clan.image} alt={clan.name} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        <span>{clan.name}</span>
                                        <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300">
                                            {clan.rarity}%
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center text-sm text-neutral-500">
                * Tier list is based on community voting and raw stats.
            </div>
        </div>
    );
}
