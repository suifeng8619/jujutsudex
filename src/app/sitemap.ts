import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://jujutsudex.com';

    // Read clans data
    const clansPath = path.join(process.cwd(), 'src/data/clans.json');
    const clansData = await fs.readFile(clansPath, 'utf8');
    const clans = JSON.parse(clansData);

    // Read techniques data
    const techniquesPath = path.join(process.cwd(), 'src/data/techniques.json');
    const techniquesData = await fs.readFile(techniquesPath, 'utf8');
    const techniques = JSON.parse(techniquesData);

    // Static routes
    const routes = [
        '',
        '/codes',
        '/tools/spin-simulator',
        '/tools/tier-list',
        '/wiki/fighting-styles',
        '/wiki/gear',
        '/wiki/awakenings',
        '/wiki/tools',
        '/wiki/traits',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic clan routes
    const clanRoutes = clans.map((clan: any) => ({
        url: `${baseUrl}/wiki/clans/${clan.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic technique routes
    const techniqueRoutes = techniques.map((technique: any) => ({
        url: `${baseUrl}/wiki/techniques/${technique.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...clanRoutes, ...techniqueRoutes];
}
