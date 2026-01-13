import { Tool } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Sword } from "lucide-react";

interface ToolsGalleryProps {
    tools: Tool[];
}

export function ToolsGallery({ tools }: ToolsGalleryProps) {
    // Filter for Special Grade or specifically interesting tools
    const featuredTools = tools
        .filter((t) => t.grade === "Special Grade")
        .slice(0, 5);

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Special Grade Cursed Tools</h2>
                    <p className="text-neutral-400 mt-2">Wield weapons of immense power and destruction.</p>
                </div>

                <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4 snap-x">
                    {featuredTools.map((tool) => (
                        <Link
                            key={tool.id}
                            href="/wiki/tools"
                            className="snap-start min-w-[280px] sm:min-w-[320px] group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-all hover:border-orange-500/50 hover:bg-neutral-900/60"
                        >
                            <div className="mb-4 aspect-video relative overflow-hidden rounded-lg bg-neutral-800">
                                {tool.image ? (
                                    <Image
                                        src={tool.image}
                                        alt={tool.name}
                                        fill
                                        sizes="(max-width: 768px) 300px, 400px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Sword className="h-8 w-8 text-neutral-600" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors">{tool.name}</h3>
                                    <p className="text-xs text-orange-500/80 font-mono mt-1">{tool.grade}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {tool.moves.slice(0, 2).map((move) => (
                                    <span key={move} className="text-[10px] sm:text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-neutral-300">
                                        {move}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
