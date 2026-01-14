import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Zap, Target, Shield, Sparkles, Users, Trophy, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Beginner Guide - Jujutsu Infinite Wiki | How to Start',
    description: 'Complete beginner guide for Jujutsu Infinite on Roblox. Learn about clans, fighting styles, techniques, and tips to get started. Master the basics and become a powerful sorcerer.',
    keywords: ['jujutsu infinite guide', 'beginner guide', 'how to play', 'new player guide', 'jujutsu infinite tips', 'roblox jujutsu'],
};

const guideContent = [
    {
        title: 'Understanding Clans',
        icon: Sparkles,
        description: 'Clans determine your cursed technique and overall power level.',
        content: [
            'Clans are randomly assigned when you start or use a Spin',
            'Rarity ranges from Common to Special Grade',
            'Each clan has unique moves and abilities',
            'Higher tier clans (S+, S, A) are more powerful but rarer',
            'You can reroll your clan using Spins from codes or gameplay'
        ],
        link: '/tools/tier-list',
        linkText: 'View Clan Tier List'
    },
    {
        title: 'Combat Basics',
        icon: Zap,
        description: 'Master the fundamentals of combat to survive.',
        content: [
            'M1 attacks are your basic melee combo',
            'Hold block to reduce incoming damage',
            'Perfect block (timing) reflects some damage',
            'Dash to dodge attacks and reposition',
            'Manage your Cursed Energy (CE) for techniques'
        ],
        link: '/wiki/fighting-styles',
        linkText: 'Explore Fighting Styles'
    },
    {
        title: 'Progression System',
        icon: Target,
        description: 'Level up and grow stronger over time.',
        content: [
            'Gain EXP by defeating enemies and completing quests',
            'Level up to unlock new skills and stat points',
            'Complete missions at the Mission Board for rewards',
            'Farm cursed spirits in various locations',
            'Boss raids offer the best rewards but require groups'
        ],
        link: '/codes',
        linkText: 'Get Free Codes'
    },
    {
        title: 'Awakenings & Traits',
        icon: Shield,
        description: 'Enhance your character with special abilities.',
        content: [
            'Awakenings are powerful transformations (Black Flash, Domain)',
            'Traits provide passive bonuses to your character',
            'Some awakenings require specific clans',
            'Traits can be rerolled separately from clans',
            'Stack compatible traits for maximum effect'
        ],
        link: '/wiki/awakenings',
        linkText: 'Browse Awakenings'
    }
];

const quickTips = [
    { tip: 'Always redeem active codes for free spins and items', priority: 'high' },
    { tip: 'Join a group for boss raids to get better loot', priority: 'high' },
    { tip: 'Practice combos in training mode before PvP', priority: 'medium' },
    { tip: 'Save your spins until you understand clan tiers', priority: 'medium' },
    { tip: 'Complete daily missions for consistent rewards', priority: 'medium' },
    { tip: 'Learn perfect block timing for defensive play', priority: 'low' },
];

const progressionPath = [
    { level: '1-10', focus: 'Complete tutorial and basic missions', location: 'Starting Area' },
    { level: '10-25', focus: 'Farm low-level cursed spirits', location: 'Forest Zone' },
    { level: '25-50', focus: 'Take on mid-tier missions and mini-bosses', location: 'City District' },
    { level: '50-75', focus: 'Join group raids and unlock advanced techniques', location: 'Shibuya' },
    { level: '75-100', focus: 'Challenge end-game bosses and PvP', location: 'All Areas' },
];

export default function BeginnerGuidePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-br from-red-950/20 via-neutral-900 to-neutral-900 py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent_50%)]" />
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center gap-3 text-red-500 mb-4">
                        <BookOpen className="h-6 w-6" />
                        <span className="text-sm font-bold uppercase tracking-wider">Beginner Guide</span>
                    </div>
                    <h1 className="text-4xl font-black text-white md:text-5xl lg:text-6xl">
                        Getting Started in<br />
                        <span className="text-red-500">Jujutsu Infinite</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-neutral-400">
                        New to Jujutsu Infinite? This comprehensive guide will teach you everything
                        you need to know to become a powerful sorcerer. From understanding clans to
                        mastering combat mechanics.
                    </p>
                </div>
            </section>

            {/* Quick Tips Banner */}
            <section className="border-b border-neutral-800 bg-neutral-900/50 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Quick Tips for New Players
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {quickTips.map((item, idx) => (
                            <div
                                key={idx}
                                className={`rounded-lg border p-4 ${
                                    item.priority === 'high'
                                        ? 'border-red-900/50 bg-red-950/20'
                                        : item.priority === 'medium'
                                        ? 'border-yellow-900/50 bg-yellow-950/20'
                                        : 'border-neutral-800 bg-neutral-900/50'
                                }`}
                            >
                                <div className={`mb-2 text-xs font-bold uppercase ${
                                    item.priority === 'high'
                                        ? 'text-red-500'
                                        : item.priority === 'medium'
                                        ? 'text-yellow-500'
                                        : 'text-neutral-500'
                                }`}>
                                    {item.priority} priority
                                </div>
                                <p className="text-sm text-neutral-300">{item.tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Guide Content */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid gap-8 lg:grid-cols-2">
                    {guideContent.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={idx}
                                className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 transition-all hover:border-neutral-700"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-lg bg-red-950/50 p-3">
                                        <Icon className="h-6 w-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                        <p className="text-sm text-neutral-500">{section.description}</p>
                                    </div>
                                </div>
                                <ul className="mb-6 space-y-3">
                                    {section.content.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-2 text-neutral-300">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={section.link}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400"
                                >
                                    {section.linkText}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Progression Path */}
            <section className="border-t border-neutral-800 bg-neutral-900/30 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-2 text-2xl font-bold text-white">Recommended Progression Path</h2>
                    <p className="mb-8 text-neutral-400">Follow this path for optimal leveling and progression</p>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-green-500 md:block" />

                        <div className="space-y-6">
                            {progressionPath.map((stage, idx) => (
                                <div key={idx} className="relative flex gap-6">
                                    {/* Level Badge */}
                                    <div className="relative z-10 hidden flex-shrink-0 md:block">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-900 text-sm font-bold text-white">
                                            {idx + 1}
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                                        <div className="mb-2 flex flex-wrap items-center gap-3">
                                            <span className="rounded-full bg-red-950/50 px-3 py-1 text-sm font-bold text-red-400">
                                                Level {stage.level}
                                            </span>
                                            <span className="text-sm text-neutral-500">{stage.location}</span>
                                        </div>
                                        <p className="text-neutral-300">{stage.focus}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PvP vs PvE Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-8 text-2xl font-bold text-white">Choose Your Path</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-blue-900/30 bg-gradient-to-br from-blue-950/20 to-neutral-900 p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Users className="h-8 w-8 text-blue-500" />
                            <h3 className="text-xl font-bold text-white">PvE Focus</h3>
                        </div>
                        <p className="mb-4 text-neutral-400">
                            Focus on story content, farming, and boss raids. Great for players who prefer
                            cooperative gameplay and collecting.
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-300">
                            <li>• Prioritize defensive clans and high CE capacity</li>
                            <li>• Join active groups for raid content</li>
                            <li>• Focus on AoE (Area of Effect) abilities</li>
                            <li>• Stack healing and regeneration traits</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/20 to-neutral-900 p-8">
                        <div className="mb-4 flex items-center gap-3">
                            <Target className="h-8 w-8 text-red-500" />
                            <h3 className="text-xl font-bold text-white">PvP Focus</h3>
                        </div>
                        <p className="mb-4 text-neutral-400">
                            Master combat mechanics and climb the leaderboards. Best for competitive
                            players who enjoy 1v1 duels and tournaments.
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-300">
                            <li>• Prioritize high-tier offensive clans (S+, S)</li>
                            <li>• Learn combo strings and cancel techniques</li>
                            <li>• Master perfect blocking and counter-attacks</li>
                            <li>• Study opponent patterns and adapt</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-neutral-800 bg-neutral-900/50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white">Ready to Begin?</h2>
                    <p className="mb-8 text-neutral-400">
                        Start your journey as a sorcerer. Check out our tools and resources.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/codes"
                            className="rounded-xl bg-red-600 px-8 py-3 font-bold text-white transition-colors hover:bg-red-700"
                        >
                            Get Free Codes
                        </Link>
                        <Link
                            href="/tools/spin-simulator"
                            className="rounded-xl border border-neutral-700 bg-neutral-800 px-8 py-3 font-bold text-white transition-colors hover:bg-neutral-700"
                        >
                            Try Spin Simulator
                        </Link>
                        <Link
                            href="/tools/tier-list"
                            className="rounded-xl border border-neutral-700 bg-neutral-800 px-8 py-3 font-bold text-white transition-colors hover:bg-neutral-700"
                        >
                            View Tier List
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
