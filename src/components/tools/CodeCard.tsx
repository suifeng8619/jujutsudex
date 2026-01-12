'use client';

import { useState } from 'react';
import { GameCode } from '@/types';
import { Copy, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeCardProps {
    code: GameCode;
}

export function CodeCard({ code }: CodeCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const isActive = code.status === 'active';

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-xl border p-4 transition-all duration-200",
                isActive
                    ? "border-green-500/20 bg-green-500/5 hover:border-green-500/40"
                    : "border-neutral-800 bg-neutral-900/50 opacity-75"
            )}
        >
            {/* New Badge */}
            {code.isNew && isActive && (
                <div className="absolute -right-12 top-6 w-32 rotate-45 bg-red-600 py-1 text-center text-xs font-bold text-white shadow-lg">
                    NEW
                </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "font-mono text-xl font-bold tracking-wider",
                            isActive ? "text-green-400" : "text-neutral-400 line-through"
                        )}>
                            {code.code}
                        </span>
                    </div>
                    <p className="text-sm text-neutral-400">
                        {code.reward}
                    </p>
                </div>

                <button
                    onClick={handleCopy}
                    className={cn(
                        "group relative flex min-w-[100px] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                        copied
                            ? "bg-green-500/20 text-green-400"
                            : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    )}
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="h-3 w-3" />
                <span>Status checked: {code.lastChecked}</span>
            </div>
        </div>
    );
}
