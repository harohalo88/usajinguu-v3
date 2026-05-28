import type { Metadata } from 'next';
import { Noto_Serif_JP, Noto_Sans_JP, Cormorant_Garamond, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';
import '../globals.css';

// Load Google Fonts
const notoSerifJp = Noto_Serif_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif-en',
  display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-en',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // Fallback metadata if metadata translations are not defined yet
  return {
    title: {
      template: '%s | 宇佐神宮 - Usa Jingu',
      default: locale === 'ja' ? '宇佐神宮 - 八幡総本宮' : 'Usa Jingu - Grand Shrine of Hachiman',
    },
    description: locale === 'ja' 
      ? '全国四万社あまりの八幡様の総本宮、宇佐神宮。神亀二年（725年）の創建以来、皇室の御崇敬篤き霊地。'
      : 'Usa Jingu is the head shrine of Hachiman shrines. A sacred site revered since 725 AD.',
    alternates: {
      canonical: `https://www.usajingu.or.jp/${locale}`,
      languages: {
        'ja': 'https://www.usajingu.or.jp/ja',
        'en': 'https://www.usajingu.or.jp/en',
        'zh-TW': 'https://www.usajingu.or.jp/zh-TW',
        'zh-CN': 'https://www.usajingu.or.jp/zh-CN',
        'ko': 'https://www.usajingu.or.jp/ko',
        'x-default': 'https://www.usajingu.or.jp/ja',
      },
    },
  };
}

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // Fetch messages on the server side
  const messages = await getMessages({ locale });
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html
      lang={locale}
      className={`${notoSerifJp.variable} ${cormorantGaramond.variable} ${notoSansJp.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-ivory text-text-body font-sans"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        
        {/* Render Google Analytics only if a valid ID is provided, preventing build time failures */}
        {gaId && gaId.trim() !== '' && gaId !== 'G-XXXXXXXXXX' && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </body>
    </html>
  );
}
