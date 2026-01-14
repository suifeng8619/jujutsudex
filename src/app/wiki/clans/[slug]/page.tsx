import { promises as fs } from 'fs';
import path from 'path';
import { Clan } from '@/types';
import { StatBlock } from '@/components/wiki/StatBlock';
import { MovesetList } from '@/components/wiki/MovesetList';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { RelatedContent } from '@/components/shared/RelatedContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';

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
    const currentIndex = clans.findIndex((c) => c.id === slug);

    if (!clan) {
        notFound();
    }

    // Get related clans (same tier or adjacent tiers)
    const relatedClans = clans
        .filter((c) => c.id !== clan.id && (c.tier === clan.tier || c.grade === clan.grade))
        .slice(0, 4)
        .map((c) => ({
            id: c.id,
            name: c.name,
            tier: c.tier,
            grade: c.grade,
            image: c.image,
            href: `/wiki/clans/${c.id}`,
        }));

    // Navigation (prev/next)
    const prevClan = currentIndex > 0 ? clans[currentIndex - 1] : null;
    const nextClan = currentIndex < clans.length - 1 ? clans[currentIndex + 1] : null;

    // How to obtain based on rarity
    const getObtainMethod = (rarity: number) => {
        if (rarity <= 0.1) return 'Extremely rare drop from Spin. May require thousands of spins.';
        if (rarity <= 1) return 'Very rare drop from Spin. Expect to spin many times.';
        if (rarity <= 5) return 'Rare drop from Spin. Good luck!';
        if (rarity <= 20) return 'Uncommon drop from Spin. Relatively accessible.';
        return 'Common drop from Spin. Easy to obtain.';
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            {/* Breadcrumb Navigation */}
            <Breadcrumb
                items={[
                    { label: 'Wiki', href: '/wiki/clans/gojo-satoru' },
                    { label: 'Clans', href: '/wiki/clans/gojo-satoru' },
                    { label: clan.name },
                ]}
            />

            {/* Hero Header */}
            <div className="mb-8 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            {clan.image && (
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-purple-600/30 bg-neutral-800 shadow-lg shadow-purple-900/20 sm:h-24 sm:w-24">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={clan.image} alt={clan.name} className="h-full w-full object-cover p-2" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-black uppercase text-white sm:text-4xl md:text-5xl">
                                    {clan.name}
                                </h1>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded bg-purple-600/20 px-2 py-1 text-sm font-semibold text-purple-400">
                                        {clan.grade || 'Innate Technique'}
                                    </span>
                                    <span className={`rounded px-2 py-1 text-sm font-bold ${
                                        clan.tier === 'S+' ? 'bg-yellow-600/20 text-yellow-400' :
                                        clan.tier === 'S' ? 'bg-orange-600/20 text-orange-400' :
                                        clan.tier === 'A' ? 'bg-purple-600/20 text-purple-400' :
                                        'bg-neutral-600/20 text-neutral-400'
                                    }`}>
                                        Tier {clan.tier}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-base text-neutral-400 md:text-lg">
                            {clan.description}
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-6 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 md:flex-col md:items-end">
                        <div className="text-center md:text-right">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Drop Rate</span>
                            <div className="text-2xl font-bold text-blue-400 md:text-3xl">{clan.rarity}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Obtain */}
            <section className="mb-8 rounded-xl border border-green-900/30 bg-green-950/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-600/20">
                        <Sparkles className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                        <h2 className="mb-2 text-lg font-bold text-white">How to Obtain</h2>
                        <p className="text-neutral-300">{getObtainMethod(clan.rarity)}</p>
                        <Link
                            href="/tools/spin-simulator"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300"
                        >
                            Try the Spin Simulator
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-white md:text-2xl">Stats & Buffs</h2>
                </div>
                <StatBlock stats={clan.stats} />
            </section>

            {/* Moveset Section */}
            <section className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-400" />
                    <h2 className="text-xl font-bold text-white md:text-2xl">Moveset ({clan.moves.length} Abilities)</h2>
                </div>
                <MovesetList moves={clan.moves} />
            </section>

            {/* Quick Links */}
            <section className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-white">Explore More</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                    <Link
                        href="/codes"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-purple-600 hover:text-white"
                    >
                        <span className="text-green-400">🎁</span> Active Codes
                    </Link>
                    <Link
                        href="/tools/tier-list"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-purple-600 hover:text-white"
                    >
                        <span className="text-yellow-400">🏆</span> Tier List
                    </Link>
                    <Link
                        href="/wiki/tools"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-purple-600 hover:text-white"
                    >
                        <span className="text-orange-400">⚔️</span> Cursed Tools
                    </Link>
                </div>
            </section>

            {/* Related Clans */}
            <RelatedContent
                title="Similar Innate Techniques"
                items={relatedClans}
                viewAllHref="/tools/tier-list"
                viewAllLabel="View Tier List"
            />

            {/* Prev/Next Navigation */}
            <nav className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-6">
                {prevClan ? (
                    <Link
                        href={`/wiki/clans/${prevClan.id}`}
                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-purple-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">{prevClan.name}</span>
                        <span className="sm:hidden">Previous</span>
                    </Link>
                ) : (
                    <div />
                )}
                {nextClan ? (
                    <Link
                        href={`/wiki/clans/${nextClan.id}`}
                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-purple-400"
                    >
                        <span className="hidden sm:inline">{nextClan.name}</span>
                        <span className="sm:hidden">Next</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <div />
                )}
            </nav>
        </div>
    );
}
