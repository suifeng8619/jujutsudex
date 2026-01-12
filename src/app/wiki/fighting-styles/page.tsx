import { promises as fs } from 'fs';
import path from 'path';
import { FightingStyle } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';


export const metadata: Metadata = {
    title: 'Jujutsu Infinite Fighting Styles - Styles, Stats & Moves',
    description: 'Complete list of Fighting Styles in Jujutsu Infinite. Learn about Eagle Style, Taido, Judo, and more.',
};

async function getFightingStyles(): Promise<FightingStyle[]> {
    const filePath = path.join(process.cwd(), 'src/data/fighting_styles.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function FightingStylesPage() {
    const styles = await getFightingStyles();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Fighting Styles
                </h1>
                <p className="text-lg text-neutral-400">
                    Master the martial arts of Jujutsu Infinite.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {styles.map((style) => (
                    <div
                        key={style.id}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 transition-all hover:border-red-500/50 hover:bg-neutral-900/80"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-800">
                                {style.image && (
                                    <Image
                                        src={style.image}
                                        alt={style.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-red-500">{style.name}</h3>
                                <p className="text-sm text-neutral-400">{style.tree} Tree</p>
                            </div>
                            <span className="rounded-full bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-300">
                                {style.rarity}
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p className="line-clamp-2 text-sm text-neutral-400">{style.description}</p>

                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(style.stats).map(([key, value]) => (
                                    <div key={key} className="rounded bg-neutral-800/50 px-2 py-1">
                                        <span className="block text-xs text-neutral-500">{key}</span>
                                        <span className="font-medium text-neutral-200">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Moves</h4>
                                <div className="flex flex-wrap gap-2">
                                    {style.moves.map((move) => (
                                        <span
                                            key={move}
                                            className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs text-neutral-300"
                                        >
                                            {move}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
