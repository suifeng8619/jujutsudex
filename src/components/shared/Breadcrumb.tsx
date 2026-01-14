'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-neutral-400 transition-colors hover:text-purple-400"
                        itemProp="item"
                    >
                        <Home className="h-4 w-4" />
                        <span itemProp="name" className="sr-only sm:not-sr-only">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <ChevronRight className="mx-1 h-4 w-4 text-neutral-600" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-neutral-400 transition-colors hover:text-purple-400"
                                itemProp="item"
                            >
                                <span itemProp="name">{item.label}</span>
                            </Link>
                        ) : (
                            <span className="font-medium text-neutral-200" itemProp="name">
                                {item.label}
                            </span>
                        )}
                        <meta itemProp="position" content={String(index + 2)} />
                    </li>
                ))}
            </ol>
        </nav>
    );
}
