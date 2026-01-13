import { promises as fs } from 'fs';
import path from 'path';
import { Tool } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/shared/JsonLd';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Cursed Tools - Weapons & Special Grade Items',
    description: 'Browse all cursed tools and weapons in Jujutsu Infinite. Stats, grades, and abilities for Playful Cloud, Inverted Spear, and more.',
};

async function getTools(): Promise<Tool[]> {
    const filePath = path.join(process.cwd(), 'src/data/tools.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ToolsPage() {
    const tools = await getTools();

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: tools.map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Product',
                name: tool.name,
                description: tool.description,
                image: tool.image ? `https://jujutsudex.com${tool.image}` : undefined,
            }
        }))
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <JsonLd data={itemListSchema} />
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Cursed Tools & Weapons
                </h1>
                <p className="text-lg text-neutral-400">
                    Wield potent cursed tools to exorcise curses or combat other sorcerers.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 transition-all hover:border-purple-500/50 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-purple-900/20"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-800">
                                {tool.image ? (
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
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
                                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                                <p className="text-sm text-neutral-400">{tool.grade}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <p className="line-clamp-2 text-sm text-neutral-400">{tool.description}</p>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(tool.stats).map(([key, value]) => (
                                    <div key={key} className="rounded bg-neutral-800/50 px-2 py-1">
                                        <span className="block text-xs text-neutral-500">{key}</span>
                                        <span className="font-medium text-neutral-200">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Moves Section */}
                            <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Moves</h4>
                                <div className="flex flex-wrap gap-2">
                                    {tool.moves.map((move) => (
                                        <span
                                            key={move}
                                            className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs text-neutral-300"
                                        >
                                            {move}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {tool.howToObtain && (
                                <div className="rounded-lg border border-purple-900/30 bg-purple-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-purple-400">How to Obtain</h4>
                                    <p className="text-sm text-neutral-300">{tool.howToObtain}</p>
                                </div>
                            )}

                            {tool.tips && (
                                <div className="rounded-lg border border-blue-900/30 bg-blue-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-400">Pro Tips</h4>
                                    <p className="text-sm text-neutral-300">{tool.tips}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
