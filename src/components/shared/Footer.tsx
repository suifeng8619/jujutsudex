import Link from 'next/link';

const quickLinks = [
    { label: 'Active Codes', href: '/codes' },
    { label: 'Tier List', href: '/tools/tier-list' },
    { label: 'Spin Simulator', href: '/tools/spin-simulator' },
];

const wikiLinks = [
    { label: 'Innate Techniques', href: '/wiki/clans/gojo-satoru' },
    { label: 'Cursed Tools', href: '/wiki/tools' },
    { label: 'Fighting Styles', href: '/wiki/fighting-styles' },
    { label: 'Awakenings', href: '/wiki/awakenings' },
    { label: 'Traits', href: '/wiki/traits' },
    { label: 'Gear', href: '/wiki/gear' },
];

const resourceLinks = [
    { label: 'Beginner Guide', href: '/guides/beginner' },
    { label: 'Spin Calculator', href: '/tools/spin-simulator' },
    { label: 'Clan Tier List', href: '/tools/tier-list' },
];

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black">
            <div className="container mx-auto px-4 py-10 sm:py-12">
                {/* Main Footer Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Brand Column */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-xl font-black text-white">Jujutsu<span className="text-purple-500">Dex</span></span>
                        </Link>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            The most comprehensive database for Jujutsu Infinite on Roblox. Find codes, explore clans, and optimize your build.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-purple-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Wiki Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Wiki</h3>
                        <ul className="space-y-2">
                            {wikiLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-purple-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {resourceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-purple-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                        <p className="text-xs text-neutral-500">
                            © {new Date().getFullYear()} JujutsuDex. Built for <span className="font-bold text-neutral-400">Jujutsu Infinite</span> fans.
                        </p>
                        <p className="text-xs text-neutral-600">
                            Not affiliated with Roblox or the game developers. All assets belong to their respective owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
