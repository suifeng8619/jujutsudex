import { promises as fs } from 'fs';
import path from 'path';
import { Clan } from '@/types';
import { SpinWheel } from '@/components/tools/SpinWheel';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Spin Simulator - Test Your Luck',
    description: 'Try the Spin Simulator for Jujutsu Infinite. Test drop rates for Ryomen Sukuna, Gojo, and other rare clans without spending spins.',
};

async function getClans(): Promise<Clan[]> {
    const filePath = path.join(process.cwd(), 'src/data/clans.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function SpinSimulatorPage() {
    const clans = await getClans();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Technique Spin Simulator
                </h1>
                <p className="text-lg text-neutral-400">
                    Simulate your spins and test your luck before spending real Robux.
                    Uses actual in-game drop rates.
                </p>
            </div>

            <div className="mx-auto max-w-5xl">
                <SpinWheel clans={clans} />
            </div>

            <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8">
                <h2 className="mb-6 text-2xl font-bold text-white">Drop Rates Table</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-400">
                        <thead className="bg-neutral-800/50 text-xs font-bold uppercase text-neutral-200">
                            <tr>
                                <th className="px-6 py-3">Clan / Technique</th>
                                <th className="px-6 py-3">Tier</th>
                                <th className="px-6 py-3">Rarity</th>
                                <th className="px-6 py-3">Buffs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {clans.sort((a, b) => a.rarity - b.rarity).map((clan) => (
                                <tr key={clan.id} className="hover:bg-neutral-800/30">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                        {clan.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="rounded bg-neutral-800 px-2 py-1 text-xs font-bold text-white">
                                            {clan.tier}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-blue-400">
                                        {clan.rarity}%
                                    </td>
                                    <td className="px-6 py-4">
                                        {Object.keys(clan.stats).join(', ')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
