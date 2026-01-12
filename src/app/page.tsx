import Link from 'next/link';
import { Crown, Disc, Search, BookOpen, Sword, Zap, Star, Sparkles, ArrowRight, HandMetal, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ href, icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <Link href={href} className={cn("group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 transition-all hover:-translate-y-1 hover:shadow-2xl", color.replace('bg-', 'hover:border-').replace('500', '500/30'))}>
      <div className={cn("mb-4 inline-block rounded-xl p-3 bg-opacity-10", color.replace('bg-', 'text-'), color.replace('500', '500/10'))}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-purple-900/20 bg-neutral-900/30 px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-red-900/10 to-transparent opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-3xl">
            <h1 className="bg-gradient-to-br from-white via-purple-100 to-purple-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl">
              Jujutsu<span className="bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text">Dex</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-400">
              The ultimate utility belt for Jujutsu Infinite.
              <br className="hidden sm:inline" />
              Latest codes, drop rates, and technique guides.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/codes"
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/30 transition-all hover:shadow-xl hover:shadow-purple-900/50 hover:scale-105"
              >
                Get Active Codes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tools/spin-simulator"
                className="flex items-center justify-center gap-2 rounded-full border border-purple-800/50 bg-purple-950/30 px-8 py-3 text-sm font-bold text-purple-200 transition-all hover:bg-purple-900/40 hover:border-purple-700"
              >
                Spin Simulator
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
