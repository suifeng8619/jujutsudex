import { Navbar } from '@/components/shared/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jujutsu Infinite Awakenings - Modes & Transformations',
    description: 'Discover all awakenings and transformation modes in Jujutsu Infinite. Learn about awakening chances, buffs, and special abilities.',
};

export default function PlaceholderPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-white">Coming Soon</h1>
            <p className="mt-4 text-neutral-400">This section is currently under construction.</p>
        </div>
    );
}
