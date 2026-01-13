import Link from 'next/link';
import { Crown, Disc, Search, BookOpen, Sword, Zap, Star, Sparkles, ArrowRight, HandMetal, Shirt, Flame, Timer, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FeatureCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ href, icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <Link href={href} className={cn("group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/30", color.replace('bg-', 'hover:border-').replace('500', '500/30'))}>
      <div className={cn("mb-4 inline-block rounded-xl p-3 bg-opacity-10", color.replace('bg-', 'text-'), color.replace('500', '500/10'))}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{title}</h3>
      <p className="text-sm sm:text-base text-neutral-400">{description}</p>
    </Link>
  );
}

function StatItem({ value, label, icon: Icon }: { value: string, label: string, icon: any }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/20 text-purple-400">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</span>
    </div>
  );
}

function UpdateCard({ title, category, date, href }: { title: string, category: string, date: string, href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 transition-colors hover:border-purple-700/50 hover:bg-neutral-900/50">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
        <div>
          <h4 className="font-medium text-neutral-200">{title}</h4>
          <span className="text-xs text-neutral-500">{category}</span>
        </div>
      </div>
      <span className="text-xs font-mono text-neutral-600">{date}</span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-purple-900/20 bg-neutral-900/30 pt-20 pb-16 sm:pb-24 lg:pb-32">
          {/* Animated Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950 opacity-80" />
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[400px] w-[400px] bg-red-600/5 blur-[100px] rounded-full" />

          <div className="container relative mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-900/10 px-3 py-1 text-sm text-purple-300">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Updated for Latest Patch
              </div>

              <h1 className="bg-gradient-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl mb-4">
                Jujutsu <span className="text-purple-500">Infinite</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Wiki, Codes & Strategy Guide
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed">
                The most comprehensive database for Jujutsu Infinite on Roblox.
                Find the best <span className="text-purple-400">Clans</span>, master your <span className="text-red-400">Techniques</span>,
                and optimize your build with our tools.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/codes"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-200 hover:scale-105"
                >
                  <Disc className="h-5 w-5 text-purple-600" />
                  Latest Codes
                </Link>
                <Link
                  href="/tools/tier-list"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-white/10"
                >
                  <Crown className="h-5 w-5 text-yellow-500" />
                  View Tier List
                </Link>
              </div>

              {/* Stats Row */}
              <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/5 pt-8 sm:grid-cols-4">
                <StatItem value="20+" label="Clans" icon={BookOpen} />
                <StatItem value="30+" label="Techniques" icon={Zap} />
                <StatItem value="11" label="Fighting Styles" icon={HandMetal} />
                <StatItem value="Active" label="Game Codes" icon={Timer} />
              </div>
            </div>
          </div>
        </div>

        {/* Latest Updates Section */}
        <div className="border-b border-white/5 bg-neutral-900/20">
          <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-xl font-bold text-white">Latest Data Updates</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <UpdateCard title="New Fighting Styles Added" category="Content Expansion" date="Today" href="/wiki/fighting-styles" />
              <UpdateCard title="Special Grade Tools" category="Database" date="Today" href="/wiki/tools" />
              <UpdateCard title="Awakenings & Modes" category="Guides" date="Today" href="/wiki/awakenings" />
              <UpdateCard title="January 2026 Codes" category="Codes" date="Yesterday" href="/codes" />
              <UpdateCard title="Clan Tier List Updates" category="Tier List" date="Yesterday" href="/tools/tier-list" />
              <UpdateCard title="Legendary Accessories" category="Gear" date="Today" href="/wiki/gear" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Everything You Need</h2>
            <p className="text-neutral-400">From beginner guides to endgame optimization.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              href="/codes"
              icon={Disc}
              title="Codes Tracker"
              description="Always updated list of working codes. Never miss a free spin."
              color="bg-red-500"
            />
            <FeatureCard
              href="/tools/tier-list"
              icon={Crown}
              title="Tier List"
              description="Comprehensive rankings of all Clans and Techniques."
              color="bg-yellow-500"
            />
            <FeatureCard
              href="/tools/spin-simulator"
              icon={Sparkles}
              title="Spin Simulator"
              description="Test your luck with realistic drop rates."
              color="bg-purple-500"
            />
            <FeatureCard
              href="/wiki/clans/gojo-satoru"
              icon={BookOpen}
              title="Technique Wiki"
              description="Browse all Innate Techniques from S+ to D tier."
              color="bg-blue-500"
            />
            <FeatureCard
              href="/wiki/tools"
              icon={Sword}
              title="Cursed Tools"
              description="Legendary weapons like Inverted Spear of Heaven."
              color="bg-orange-500"
            />
            <FeatureCard
              href="/wiki/traits"
              icon={Zap}
              title="Traits & Natures"
              description="Rough Energy, Electric, and more."
              color="bg-green-500"
            />
            <FeatureCard
              href="/wiki/fighting-styles"
              icon={HandMetal}
              title="Fighting Styles"
              description="Martial Arts like Taido and Black Flash."
              color="bg-red-500"
            />
            <FeatureCard
              href="/wiki/gear"
              icon={Shirt}
              title="Gear & Outfits"
              description="Sorcerer Killer Set, Rings, and more."
              color="bg-indigo-500"
            />
            <FeatureCard
              href="/wiki/awakenings"
              icon={Star}
              title="Awakenings"
              description="Unlock Black Flash Arms, Burn Scars, and Halo."
              color="bg-pink-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
