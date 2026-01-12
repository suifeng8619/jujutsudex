import { promises as fs } from 'fs';
import path from 'path';
import { GameCode } from '@/types';
import { CodeCard } from '@/components/tools/CodeCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Codes (2026) - Free Spins & Rewards',
    description: 'Updated list of working codes for Roblox Jujutsu Infinite. Get free spins, reset stats, and more.',
};

async function getCodes(): Promise<GameCode[]> {
    const filePath = path.join(process.cwd(), 'src/data/codes.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function CodesPage() {
    const codes = await getCodes();

    const activeCodes = codes.filter(c => c.status === 'active');
    const expiredCodes = codes.filter(c => c.status === 'expired');

    const lastUpdated = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Jujutsu Infinite Codes
                </h1>
                <p className="text-lg text-neutral-400">
                    Last Updated: <span className="font-semibold text-red-500">{lastUpdated}</span>
                </p>
            </div>

            <div className="space-y-8">
                {/* Active Codes Section */}
                <section>
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <h2 className="text-2xl font-bold text-white">Working Codes</h2>
                        <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-400">
                            {activeCodes.length} Active
                        </span>
                    </div>

                    <div className="grid gap-4">
                        {activeCodes.length > 0 ? (
                            activeCodes.map((code) => (
                                <CodeCard key={code.id} code={code} />
                            ))
                        ) : (
                            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-8 text-center text-neutral-400">
                                No active codes currently available. Check back soon!
                            </div>
                        )}
                    </div>
                </section>

                {/* Expired Codes Section */}
                <section className="pt-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-neutral-600" />
                        <h2 className="text-2xl font-bold text-neutral-400">Expired Codes</h2>
                    </div>

                    <div className="grid gap-4 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                        {expiredCodes.map((code) => (
                            <CodeCard key={code.id} code={code} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
