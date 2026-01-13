import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Crown, Disc, BookOpen, Sword, Zap, Star, Sparkles, HandMetal, Shirt, Flame, Timer, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Clan, Code, Tool } from '@/types';

// Components
import { Hero } from '@/components/home/Hero';
import { FeaturedClans } from '@/components/home/FeaturedClans';
import { ActiveCodesWidget } from '@/components/home/ActiveCodesWidget';
import { ToolsGallery } from '@/components/home/ToolsGallery';
import { SeoContent } from '@/components/home/SeoContent';

// Types
interface FeatureCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

// Data Fetching
async function getData() {
  const dataDir = path.join(process.cwd(), 'src/data');

  const [clansData, codesData, toolsData] = await Promise.all([
    fs.readFile(path.join(dataDir, 'clans.json'), 'utf8'),
    fs.readFile(path.join(dataDir, 'codes.json'), 'utf8'),
    fs.readFile(path.join(dataDir, 'tools.json'), 'utf8')
  ]);

  return {
    clans: JSON.parse(clansData) as Clan[],
    codes: JSON.parse(codesData) as Code[],
    tools: JSON.parse(toolsData) as Tool[]
  };
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

import { JsonLd } from '@/components/shared/JsonLd';

export default async function Home() {
  const { clans, codes, tools } = await getData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Jujutsu Infinite',
    description: 'A Roblox RPG based on Jujutsu Kaisen where players spin for clans, learn cursed techniques, and battle curses.',
    genre: ['RPG', 'Fighting Game', 'Roblox'],
    applicationCategory: 'Game',
    operatingSystem: 'Windows, macOS, iOS, Android',
    url: 'https://www.roblox.com/games/10450270085/Jujutsu-Infinite',
    publisher: {
      '@type': 'Organization',
      name: 'Independent Developers'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={jsonLd} />
      <main className="flex-1">

        <Hero />

        {/* Live Stats Row */}
        <div className="border-b border-white/5 bg-black/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 divide-x divide-white/5 border-x border-white/5 sm:grid-cols-4">
              <StatItem value={`${clans.length}+`} label="Clans" icon={BookOpen} />
              <StatItem value="30+" label="Techniques" icon={Zap} />
              <StatItem value="11" label="Fighting Styles" icon={HandMetal} />
              <StatItem value={`${codes.filter(c => c.status === "active").length}`} label="Active Codes" icon={Timer} />
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

        <ActiveCodesWidget codes={codes} />

        <FeaturedClans clans={clans} />

        <ToolsGallery tools={tools} />

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

        <SeoContent />

      </main>
    </div>
  );
}
