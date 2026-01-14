import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://jujutsudex.com'),
  title: 'Jujutsu Infinite Codes & Wiki (2026) - Tier List, Clans & Strategy',
  description: 'Updated January 2026: 24 Active Jujutsu Infinite codes for 3000+ Free Spins! View the S-Tier Clan Tier List, 27 Cursed Techniques guide, and Spin Simulator.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jujutsu Infinite Codes & Wiki (2026) - Tier List, Clans & Strategy',
    description: 'Updated January 2026: 24 Active Jujutsu Infinite codes for 3000+ Free Spins! View the S-Tier Clan Tier List, 27 Cursed Techniques guide, and Spin Simulator.',
    type: 'website',
    siteName: 'JujutsuDex',
    url: 'https://jujutsudex.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jujutsu Infinite Codes & Wiki (2026)',
    description: '24 Active codes for 3000+ Free Spins! Complete Tier List & Wiki.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-neutral-200 antialiased selection:bg-purple-900/50 selection:text-purple-200`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
