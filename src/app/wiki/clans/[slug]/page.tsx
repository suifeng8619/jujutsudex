import { promises as fs } from 'fs';
import path from 'path';
import { Clan } from '@/types';
import { StatBlock } from '@/components/wiki/StatBlock';
import { MovesetList } from '@/components/wiki/MovesetList';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Shared data fetcher
async function getClans(): Promise<Clan[]> {
    const filePath = path.join(process.cwd(), 'src/data/clans.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Static Params Generation
export async function generateStaticParams() {
    const clans = await getClans();
    return clans.map((clan) => ({
        slug: clan.id,
    }));
}

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const clans = await getClans();
    const clan = clans.find((c) => c.id === slug);

    if (!clan) return {};

    return {
        title: `${clan.name} Clan Guide, Stats & Rarity - Jujutsu Infinite`,
        description: `Detailed guide for ${clan.name} in Jujutsu Infinite. Drop chance: ${clan.rarity}%. Tier: ${clan.tier}. Check out the full moveset and stats.`,
    };
}

export default async function ClanPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const clans = await getClans();
    const clan = clans.find((c) => c.id === slug);

    if (!clan) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            {/* Hero Header */}
            <div className="mb-10 border-b border-neutral-800 pb-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <div className="flex items-center gap-6">
                            {clan.image && (
                                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={clan.image} alt={clan.name} className="h-full w-full object-cover p-2" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-4xl font-black uppercase text-white md:text-6xl">
                                    {clan.name} <span className="text-red-600">Clan</span>
                                </h1>
                                <div className="mt-2 text-xl font-bold text-purple-500">{clan.grade || 'Innate Technique'}</div>
                            </div>
                        </div>
                        <p className="mt-4 text-lg text-neutral-400 max-w-2xl">
                            {clan.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Rarity</span>
                        <span className="text-3xl font-bold text-blue-400">{clan.rarity}%</span>
                        <div className="mt-2 rounded bg-neutral-800 px-3 py-1 font-mono text-sm font-bold text-white">
                            Tier {clan.tier}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">Clan Stats & Buffs</h2>
                <StatBlock stats={clan.stats} />
            </section>

            {/* Moveset Section */}
            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">Moveset</h2>
                <MovesetList moves={clan.moves} />
            </section>
        </div>
    );
}
