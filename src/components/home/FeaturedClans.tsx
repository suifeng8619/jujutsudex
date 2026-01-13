import { Clan } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield } from "lucide-react";

interface FeaturedClansProps {
    clans: Clan[];
}

export function FeaturedClans({ clans }: FeaturedClansProps) {
    // Filter for S-tier or high rarity clans
    const topClans = clans
        .filter((c) => c.tier === "S+" || c.tier === "S")
        .slice(0, 4);

    return (
        <section className="border-b border-purple-900/10 bg-neutral-900/20 py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Top Clans in Jujutsu Infinite</h2>
                        <p className="text-neutral-400 mt-2">The most powerful bloodlines dominating the meta.</p>
                    </div>
                    <Link href="/tools/tier-list" className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                        View All Clans <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {topClans.map((clan) => (
                        <Link
                            key={clan.id}
                            href={`/wiki/clans/${clan.id}`}
                            className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-purple-500/50 hover:shadow-lg hover:translate-y-1"
                        >
                            <div className="absolute top-2 right-2 rounded bg-purple-900/30 px-2 py-1 text-xs font-bold text-purple-300 border border-purple-500/20">
                                {clan.rarity}%
                            </div>
                            <div className="mb-4 flex justify-center">
                                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-neutral-700 bg-neutral-800 shadow-xl group-hover:border-purple-500 transition-colors">
                                    {clan.image ? (
                                        <Image
                                            src={clan.image}
                                            alt={clan.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Shield className="h-8 w-8 text-neutral-600" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{clan.name}</h3>
                                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{clan.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link href="/tools/tier-list" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                        View All Clans <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
