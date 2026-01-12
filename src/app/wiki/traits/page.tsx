import { Navbar } from '@/components/shared/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Traits - CE Natures & Buffs',
    description: 'Complete guide to all traits and cursed energy natures in Jujutsu Infinite. Discover trait rarities, buffs, and combat effects.',
};

export default function PlaceholderPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-white">Coming Soon</h1>
            <p className="mt-4 text-neutral-400">This section is currently under construction.</p>
        </div>
    );
}
