import { promises as fs } from 'fs';
import path from 'path';
import { Clan } from '@/types'; // Reusing Clan interface for structure, ideally define Technique interface
import { StatBlock } from '@/components/wiki/StatBlock';
import { MovesetList } from '@/components/wiki/MovesetList';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Using Clan interface for now as it matches the data structure in techniques.json roughly
// Ideally create a separate Technique interface
interface Technique extends Clan { }

async function getTechniques(): Promise<Technique[]> {
    const filePath = path.join(process.cwd(), 'src/data/techniques.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function generateStaticParams() {
    const techniques = await getTechniques();
    return techniques.map((t) => ({
        slug: t.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const techniques = await getTechniques();
    const technique = techniques.find((t) => t.id === slug);

    if (!technique) return {};

    return {
        title: `${technique.name} Technique Guide - Jujutsu Infinite`,
        description: `Complete guide for ${technique.name} in Jujutsu Infinite. Moveset, stats, and rarity details.`,
    };
}

export default async function TechniquePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const techniques = await getTechniques();
    const technique = techniques.find((t) => t.id === slug);

    if (!technique) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            <div className="mb-10 border-b border-neutral-800 pb-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-4xl font-black uppercase text-white md:text-6xl">
                            {technique.name}
                        </h1>
                        <div className="mt-2 text-xl font-bold text-purple-500">Cursed Technique</div>
                        <p className="mt-4 text-lg text-neutral-400 max-w-2xl">
                            {technique.description}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Rarity</span>
                        <span className="text-3xl font-bold text-blue-400">{technique.rarity}%</span>
                        <div className="mt-2 rounded bg-neutral-800 px-3 py-1 font-mono text-sm font-bold text-white">
                            Tier {technique.tier}
                        </div>
                    </div>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">Technique Stats</h2>
                <StatBlock stats={technique.stats} />
            </section>

            <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">Abilities</h2>
                <MovesetList moves={technique.moves} />
            </section>
        </div>
    );
}
