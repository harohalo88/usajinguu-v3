import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Anthropic-AI'],
        allow: '/',
      }
    ],
    sitemap: 'https://www.usajingu.or.jp/sitemap.xml',
  };
}
