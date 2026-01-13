import { Code } from "@/types";
import Link from "next/link";
import { Copy, Check, Timer } from "lucide-react";

interface ActiveCodesWidgetProps {
    codes: Code[];
}

export function ActiveCodesWidget({ codes }: ActiveCodesWidgetProps) {
    const activeCodes = codes.filter(c => c.status === "active").slice(0, 3);

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="overflow-hidden rounded-2xl border border-red-900/20 bg-gradient-to-br from-red-950/10 via-neutral-900/50 to-neutral-900/50 p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="md:w-1/3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-green-500">Live Updates</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Active Codes</h2>
                        <p className="text-neutral-400 mb-6">
                            Claim these <strong>Jujutsu Infinite codes</strong> now for free spins and rerolls before they expire.
                        </p>
                        <Link href="/codes" className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition-hover hover:bg-red-700">
                            View All {codes.filter(c => c.status === "active").length} Codes
                        </Link>
                    </div>

                    <div className="w-full md:w-2/3 grid gap-3">
                        {activeCodes.map((code) => (
                            <div key={code.code} className="flex items-center justify-between rounded-lg border border-white/5 bg-neutral-900 p-4 transition-colors hover:border-red-500/30">
                                <div>
                                    <div className="font-mono font-bold text-lg text-white tracking-wide">{code.code}</div>
                                    <div className="text-xs text-neutral-400">{code.reward}</div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="inline-flex items-center rounded-full bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-400">
                                        Active
                                    </span>
                                </div>
                            </div>
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
