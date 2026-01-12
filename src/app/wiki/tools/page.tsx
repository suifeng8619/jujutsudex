import { Navbar } from '@/components/shared/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Cursed Tools - Weapons & Special Grade Items',
    description: 'Browse all cursed tools and weapons in Jujutsu Infinite. Stats, grades, and abilities for Playful Cloud, Inverted Spear, and more.',
};

export default function PlaceholderPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-white">Coming Soon</h1>
            <p className="mt-4 text-neutral-400">This section is currently under construction.</p>
        </div>
    );
}
