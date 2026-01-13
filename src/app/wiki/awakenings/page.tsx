import { promises as fs } from 'fs';
import path from 'path';
import { Awakening } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Awakenings - Modes & Transformations',
    description: 'Discover all awakenings and transformation modes in Jujutsu Infinite. Learn about awakening chances, buffs, and special abilities.',
};

async function getAwakenings(): Promise<Awakening[]> {
    const filePath = path.join(process.cwd(), 'src/data/awakenings.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function AwakeningsPage() {
    const awakenings = await getAwakenings();

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: awakenings.map((start, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product', // Or 'GameContent' if we were strict, but Product/Thing is safe
                name: start.name,
                description: start.description,
                image: start.image ? `https://jujutsudex.com${start.image}` : undefined,
            }
        }))
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <JsonLd data={itemListSchema} />
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Awakenings & Modes
                </h1>
                <p className="text-lg text-neutral-400">
                    Unlock powerful transformations and genetic mutations to ascend beyond your limits.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {awakenings.map((start) => (
                    <div
                        key={start.id}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 transition-all hover:border-purple-500/50 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-purple-900/20"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-800">
                                {start.image ? (
                                    <Image
                                        src={start.image}
                                        alt={start.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-neutral-600">
                                        ?
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{start.name}</h3>
                                <p className="text-sm text-neutral-400">{start.rarity} — {start.chance}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <p className="line-clamp-2 text-sm text-neutral-400">{start.description}</p>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(start.stats).map(([key, value]) => (
                                    <div key={key} className="rounded bg-neutral-800/50 px-2 py-1">
                                        <span className="block text-xs text-neutral-500">{key}</span>
                                        <span className="font-medium text-neutral-200">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {start.howToObtain && (
                                <div className="rounded-lg border border-purple-900/30 bg-purple-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-purple-400">How to Obtain</h4>
                                    <p className="text-sm text-neutral-300">{start.howToObtain}</p>
                                </div>
                            )}

                            {start.tips && (
                                <div className="rounded-lg border border-blue-900/30 bg-blue-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-400">Pro Tips</h4>
                                    <p className="text-sm text-neutral-300">{start.tips}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
