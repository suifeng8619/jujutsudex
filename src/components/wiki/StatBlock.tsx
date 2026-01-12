import { cn } from '@/lib/utils';

interface StatBlockProps {
    stats: {
        [key: string]: string;
    };
}

export function StatBlock({ stats }: StatBlockProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stats).map(([key, value]) => (
                <div
                    key={key}
                    className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:bg-neutral-800/50"
                >
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {key}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                        {value}
                    </div>
                </div>
            ))}
        </div>
    );
}
