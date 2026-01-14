'use client';

import { Code } from "@/types";
import Link from "next/link";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ActiveCodesWidgetProps {
    codes: Code[];
}

function CodeCard({ code }: { code: Code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-neutral-900 p-3 sm:p-4 transition-colors hover:border-red-500/30">
            <div className="min-w-0 flex-1">
                <div className="font-mono font-bold text-base sm:text-lg text-white tracking-wide truncate">{code.code}</div>
                <div className="text-xs text-neutral-400 truncate">{code.reward}</div>
            </div>
            <button
                onClick={handleCopy}
                className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-all hover:bg-red-600 hover:text-white active:scale-95"
                aria-label={copied ? "Copied!" : "Copy code"}
            >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
        </div>
    );
}

export function ActiveCodesWidget({ codes }: ActiveCodesWidgetProps) {
    const activeCodes = codes.filter(c => c.status === "active").slice(0, 4);

    return (
        <section className="container mx-auto px-4 py-8 sm:py-12">
            <div className="overflow-hidden rounded-2xl border border-red-900/20 bg-gradient-to-br from-red-950/10 via-neutral-900/50 to-neutral-900/50 p-4 sm:p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="w-full md:w-1/3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-green-500">Live Updates</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Active Codes</h2>
                        <p className="text-sm sm:text-base text-neutral-400 mb-4 sm:mb-6">
                            Claim these <strong>Jujutsu Infinite codes</strong> now for free spins and rerolls before they expire.
                        </p>
                        <Link
                            href="/codes"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 sm:px-6 py-3 min-h-[48px] text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-95"
                        >
                            View All {codes.filter(c => c.status === "active").length} Codes
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="w-full md:w-2/3 grid gap-2 sm:gap-3">
                        {activeCodes.map((code) => (
                            <CodeCard key={code.code} code={code} />
                        ))}
                        {activeCodes.length === 0 && (
                            <div className="text-center text-neutral-500 py-4">No active codes found at the moment.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
