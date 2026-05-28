import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.usajingu.or.jp';

const locales = ['ja', 'en', 'zh-TW', 'zh-CN', 'ko'];

const paths = [
  '',
  '/about/history',
  '/about/deities',
  '/about/legends/goreisui',
  '/about/legends/todaiji',
  '/about/legends/wake',
  '/about/legends/shinbutsu',
  '/about/timeline',
  '/worship/guide',
  '/worship/access',
  '/worship/monorail',
  '/worship/pray',
  '/worship/fortune',
  '/worship/trip',
  '/worship/confer',
  '/worship/gaien-parking',
  '/wedding',
  '/festivals/festival-list',
  '/festivals/festival-detail',
  '/society',
  '/hachiman',
  '/news',
  '/faq',
  '/sitemap',
  '/disclaimer',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/news' ? 'daily' : 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      });
    }
  }

  return sitemapEntries;
}
