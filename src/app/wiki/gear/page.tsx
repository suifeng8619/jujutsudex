import { promises as fs } from 'fs';
import path from 'path';
import { GearItem } from '@/types';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Gear - Accessories & Outfits',
    description: 'Browse the best gear in Jujutsu Infinite. Stats for Soul Ring, Sorcerer Killer Set, and more.',
};

async function getAccessories(): Promise<GearItem[]> {
    const filePath = path.join(process.cwd(), 'src/data/accessories.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    // Add type 'Accessory' if missing or ensure compatibility
    return data.map((item: any) => ({ ...item, type: item.type || 'Accessory' }));
}

async function getOutfits(): Promise<GearItem[]> {
    const filePath = path.join(process.cwd(), 'src/data/outfits.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    // Add type 'Outfit'
    return data.map((item: any) => ({ ...item, type: 'Outfit' }));
}

export default async function GearPage() {
    const [accessories, outfits] = await Promise.all([
        getAccessories(),
        getOutfits()
    ]);

    const GearSection = ({ title, items }: { title: string, items: GearItem[] }) => (
        <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-purple-800" />
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-400">
                    {items.length} Items
                </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 transition-all hover:border-purple-500/50 hover:bg-neutral-900/80 hover:shadow-lg hover:shadow-purple-900/20"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-800">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
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
                                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{item.name}</h3>
                                <p className="text-sm text-neutral-400">{item.rarity}</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <p className="line-clamp-2 text-sm text-neutral-400">{item.description}</p>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {Object.entries(item.stats).map(([key, value]) => (
                                    <div key={key} className="rounded bg-neutral-800/50 px-2 py-1">
                                        <span className="block text-xs text-neutral-500">{key}</span>
                                        <span className="font-medium text-neutral-200">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {item.howToObtain && (
                                <div className="rounded-lg border border-purple-900/30 bg-purple-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-purple-400">How to Obtain</h4>
                                    <p className="text-sm text-neutral-300">{item.howToObtain}</p>
                                </div>
                            )}

                            {item.obtained_from && !item.howToObtain && (
                                <div className="rounded-lg border border-purple-900/30 bg-purple-900/10 p-3">
                                    <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-purple-400">Obtained From</h4>
                                    <p className="text-sm text-neutral-300">{item.obtained_from}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Gear & Outfits
                </h1>
                <p className="text-lg text-neutral-400">
                    Equip yourself with the best accessories and outfits to boost your stats.
                </p>
            </div>

            <GearSection title="Accessory / Rings" items={accessories} />
            <GearSection title="Outfits" items={outfits} />
        </div>
    );
}
