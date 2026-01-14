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

// Technique uses the same structure as Clan
type Technique = Clan;

// Shared data fetcher
async function getTechniques(): Promise<Technique[]> {
    const filePath = path.join(process.cwd(), 'src/data/techniques.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Static Params Generation
export async function generateStaticParams() {
    const techniques = await getTechniques();
    return techniques.map((t) => ({
        slug: t.id,
    }));
}

// Dynamic Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const techniques = await getTechniques();
    const technique = techniques.find((t) => t.id === slug);

    if (!technique) return {};

    return {
        title: `${technique.name} Technique Guide, Stats & Rarity - Jujutsu Infinite`,
        description: `Detailed guide for ${technique.name} in Jujutsu Infinite. Drop chance: ${technique.rarity}%. Tier: ${technique.tier}. Check out the full moveset and stats.`,
    };
}

export default async function TechniquePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const techniques = await getTechniques();
    const technique = techniques.find((t) => t.id === slug);
    const currentIndex = techniques.findIndex((t) => t.id === slug);

    if (!technique) {
        notFound();
    }

    // Get related techniques (same tier or adjacent tiers)
    const relatedTechniques = techniques
        .filter((t) => t.id !== technique.id && (t.tier === technique.tier || t.grade === technique.grade))
        .slice(0, 4)
        .map((t) => ({
            id: t.id,
            name: t.name,
            tier: t.tier,
            grade: t.grade,
            image: t.image,
            href: `/wiki/techniques/${t.id}`,
        }));

    // Navigation (prev/next)
    const prevTechnique = currentIndex > 0 ? techniques[currentIndex - 1] : null;
    const nextTechnique = currentIndex < techniques.length - 1 ? techniques[currentIndex + 1] : null;

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
                    { label: 'Techniques', href: '/wiki/techniques/limitless' },
                    { label: technique.name },
                ]}
            />

            {/* Hero Header */}
            <div className="mb-8 rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            {technique.image && (
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-blue-600/30 bg-neutral-800 shadow-lg shadow-blue-900/20 sm:h-24 sm:w-24">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={technique.image} alt={technique.name} className="h-full w-full object-cover p-2" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-black uppercase text-white sm:text-4xl md:text-5xl">
                                    {technique.name}
                                </h1>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="rounded bg-blue-600/20 px-2 py-1 text-sm font-semibold text-blue-400">
                                        Cursed Technique
                                    </span>
                                    <span className={`rounded px-2 py-1 text-sm font-bold ${
                                        technique.tier === 'S+' ? 'bg-yellow-600/20 text-yellow-400' :
                                        technique.tier === 'S' ? 'bg-orange-600/20 text-orange-400' :
                                        technique.tier === 'A' ? 'bg-purple-600/20 text-purple-400' :
                                        'bg-neutral-600/20 text-neutral-400'
                                    }`}>
                                        Tier {technique.tier}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-base text-neutral-400 md:text-lg">
                            {technique.description}
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-6 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 md:flex-col md:items-end">
                        <div className="text-center md:text-right">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Drop Rate</span>
                            <div className="text-2xl font-bold text-blue-400 md:text-3xl">{technique.rarity}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Obtain */}
            <section className="mb-8 rounded-xl border border-cyan-900/30 bg-cyan-950/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-600/20">
                        <Sparkles className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="mb-2 text-lg font-bold text-white">How to Obtain</h2>
                        <p className="text-neutral-300">{getObtainMethod(technique.rarity)}</p>
                        <Link
                            href="/tools/spin-simulator"
                            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300"
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
                    <Target className="h-5 w-5 text-blue-400" />
                    <h2 className="text-xl font-bold text-white md:text-2xl">Technique Stats</h2>
                </div>
                <StatBlock stats={technique.stats} />
            </section>

            {/* Moveset Section */}
            <section className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-400" />
                    <h2 className="text-xl font-bold text-white md:text-2xl">Abilities ({technique.moves.length} Moves)</h2>
                </div>
                <MovesetList moves={technique.moves} />
            </section>

            {/* Quick Links */}
            <section className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 className="mb-4 text-lg font-bold text-white">Explore More</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                    <Link
                        href="/codes"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-blue-600 hover:text-white"
                    >
                        <span className="text-green-400">🎁</span> Active Codes
                    </Link>
                    <Link
                        href="/tools/tier-list"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-blue-600 hover:text-white"
                    >
                        <span className="text-yellow-400">🏆</span> Tier List
                    </Link>
                    <Link
                        href="/wiki/clans/gojo-satoru"
                        className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-blue-600 hover:text-white"
                    >
                        <span className="text-purple-400">👤</span> Innate Techniques
                    </Link>
                </div>
            </section>

            {/* Related Techniques */}
            <RelatedContent
                title="Similar Techniques"
                items={relatedTechniques}
                viewAllHref="/tools/tier-list"
                viewAllLabel="View Tier List"
            />

            {/* Prev/Next Navigation */}
            <nav className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-6">
                {prevTechnique ? (
                    <Link
                        href={`/wiki/techniques/${prevTechnique.id}`}
                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-blue-400"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">{prevTechnique.name}</span>
                        <span className="sm:hidden">Previous</span>
                    </Link>
                ) : (
                    <div />
                )}
                {nextTechnique ? (
                    <Link
                        href={`/wiki/techniques/${nextTechnique.id}`}
                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-blue-400"
                    >
                        <span className="hidden sm:inline">{nextTechnique.name}</span>
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
