import { Clan } from '@/types';

/**
 * Selects a random clan based on rarity weight.
 * Uses a weighted random selection algorithm.
 */
export function spinClan(clans: Clan[]): Clan {
    // Calculate total weight (sum of rarities)
    // Note: Rarity is percentage based (e.g. 0.01 for 0.01%)
    // We can treat it directly as weight.
    const totalWeight = clans.reduce((sum, clan) => sum + clan.rarity, 0);

    let random = Math.random() * totalWeight;

    for (const clan of clans) {
        if (random < clan.rarity) {
            return clan;
        }
        random -= clan.rarity;
    }

    // Fallback to the last one if something goes wrong (floating point issues)
    return clans[clans.length - 1];
}

/**
 * Simulates multiple spins
 */
export function simulateSpins(clans: Clan[], count: number): Clan[] {
    const results: Clan[] = [];
    for (let i = 0; i < count; i++) {
        results.push(spinClan(clans));
    }
    return results;
}
