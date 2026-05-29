'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { OpeningAnimation } from '@/components/home/OpeningAnimation';
import { Hero } from '@/components/home/Hero';
import { NewsSection } from '@/components/home/NewsSection';
import { NavGrid } from '@/components/home/NavGrid';
import { QuickAccessLinks } from '@/components/home/QuickAccessLinks';
import { VisitCTA } from '@/components/home/VisitCTA';
import { FloatingBanner } from '@/components/home/FloatingBanner';

export default function IndexPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('usajingu_visited');
    if (!hasVisited) {
      setShowOpening(true);
      sessionStorage.setItem('usajingu_visited', 'true');
    }
  }, []);

  const heroTranslations = {
    heroTaglineVertical: t('heroTaglineVertical'),
    heroTitle: t('heroTitle'),
    heroSubtitle: t('heroSubtitle'),
    heroDescription: t('heroDescription'),
    heroCta: t('heroCta'),
    heroScrollText: t('heroScrollText'),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'PlaceOfWorship',
        '@id': `https://www.usajingu.or.jp/${locale}/#placeofworship`,
        'name': locale === 'ja' ? t('home_text_1') : 'Usa Jingu',
        'alternateName': locale === 'ja' ? t('home_text_2') : 'Usa Jingu Grand Shrine',
        'description': locale === 'ja'
          ? t('home_text_3')
          : 'The head shrine of all Hachiman shrines across Japan. Founded in 725 AD, a historic and sacred sanctuary.',
        'url': `https://www.usajingu.or.jp/${locale}`,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': locale === 'ja' ? t('home_text_4') : 'Minamiusa, Usa City',
          'addressRegion': locale === 'ja' ? t('home_text_5') : 'Oita Prefecture',
          'postalCode': '872-0102',
          'streetAddress': '2859',
          'addressCountry': 'JP'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 33.525556,
          'longitude': 131.378889
        },
        'telephone': '+81-978-37-0001'
      },
      {
        '@type': 'TouristAttraction',
        '@id': `https://www.usajingu.or.jp/${locale}/#touristattraction`,
        'name': locale === 'ja' ? t('home_text_6') : 'Usa Jingu Shrine',
        'description': locale === 'ja'
          ? t('home_text_7')
          : 'A historic Shinto shrine located in Usa, Oita Prefecture. Famous for its National Treasure main hall and unique 2-bow, 4-clap, 1-bow worship etiquette.',
        'url': `https://www.usajingu.or.jp/${locale}`,
        'image': 'https://www.usajingu.or.jp/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {showOpening && (
        <OpeningAnimation
          language={locale}
          onComplete={() => setShowOpening(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Section order matches the Figma original exactly:
            1. Hero — full-screen with cinematic entrance
            2. News — stone background, 5 items
            3. NavGrid — 10-card dark grid, 5×2, vertical kanji titles
            4. QuickAccessLinks — 3 Figma asset image cards
            5. VisitCTA — crimson bottom CTA section
        */}
        <Hero t={heroTranslations} />
        <NewsSection />
        <NavGrid />
        <QuickAccessLinks />
        <VisitCTA />
      </div>

      {/* Fixed floating banner — position: fixed, always on top */}
      <FloatingBanner />
    </>
  );
}
