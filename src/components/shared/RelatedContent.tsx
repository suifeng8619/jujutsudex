'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface RelatedItem {
    id: string;
    name: string;
    tier?: string;
    grade?: string;
    image?: string;
    href: string;
}

interface RelatedContentProps {
    title: string;
    items: RelatedItem[];
    viewAllHref?: string;
    viewAllLabel?: string;
}

export function RelatedContent({ title, items, viewAllHref, viewAllLabel = 'View All' }: RelatedContentProps) {
    if (items.length === 0) return null;

    return (
        <section className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {viewAllHref && (
                    <Link
                        href={viewAllHref}
                        className="flex items-center gap-1 text-sm text-purple-400 transition-colors hover:text-purple-300"
                    >
                        {viewAllLabel}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.slice(0, 4).map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="group flex items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-3 transition-all hover:border-purple-600/50 hover:bg-neutral-800"
                    >
                        {item.image && (
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-neutral-200 group-hover:text-white">
                                {item.name}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                                {item.tier && (
                                    <span className={`font-semibold ${
                                        item.tier === 'S+' ? 'text-yellow-400' :
                                        item.tier === 'S' ? 'text-orange-400' :
                                        item.tier === 'A' ? 'text-purple-400' :
                                        item.tier === 'B' ? 'text-blue-400' :
                                        'text-neutral-400'
                                    }`}>
                                        {item.tier}
                                    </span>
                                )}
                                {item.grade && (
                                    <span className="text-neutral-500">{item.grade}</span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
