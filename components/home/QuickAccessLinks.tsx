'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

// Exact Figma asset hashes — images are already in /public/images/
const LINK_IMAGES = {
  pray:     '/images/96e87328b4958bd5de7ee5fba17f542108b2d71e.png',
  access:   '/images/23265579a98431720d940f46eba8584cc9e52d3f.png',
  monorail: '/images/f78ccca276d1a2d3fb39d37df0d50f8dcfe1c0ee.png',
};

const OVERLAYS = {
  pray:     'linear-gradient(to top, rgba(165,0,0,0.88), rgba(165,0,0,0.3) 60%, transparent)',
  access:   'linear-gradient(to top, rgba(135,56,0,0.88), rgba(135,56,0,0.3) 60%, transparent)',
  monorail: 'linear-gradient(to top, rgba(162,122,40,0.88), rgba(162,122,40,0.3) 60%, transparent)',
};

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function QuickAccessLinks() {
  const t = useTranslations();
  const locale = useLocale();
  const tQA = useTranslations('quickAccess');

  type CardKey = 'pray' | 'access' | 'monorail';
  const ROUTES: Record<CardKey, string> = {
    pray:     '/worship/pray',
    access:   '/worship/access',
    monorail: '/worship/monorail',
  };
  const cards: CardKey[] = ['pray', 'access', 'monorail'];

  return (
    <section id="quick-access" style={{ backgroundColor: '#faf8f5', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#a27a28',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {t('quickAccessTitleEn')}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#a50000',
                fontSize: 'clamp(1.4rem,3vw,2rem)',
                fontWeight: 400,
                letterSpacing: '0.18em',
              }}
            >
              {t('quickAccessTitle')}
            </h2>
          </div>
        </FadeIn>

        {/* 3-column image cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((key, i) => (
            <FadeIn key={key} delay={0.05 + i * 0.05}>
              <Link
                href={`/${locale}${ROUTES[key]}`}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  className="group relative overflow-hidden h-64"
                  style={{ border: '1px solid rgba(165,0,0,0.1)' }}
                >
                  {/* Figma asset image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LINK_IMAGES[key]}
                    alt={tQA(`${key}.title`)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={key === 'access' ? { objectPosition: 'center 60%' } : undefined}
                  />
                  {/* Colour gradient overlay — unique per card */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: OVERLAYS[key],
                    }}
                  />
                  {/* Text block */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'rgba(250,248,245,0.7)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.2em',
                        marginBottom: '4px',
                      }}
                    >
                      {t('quickAccessCategoryLabel')}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        color: '#faf8f5',
                        fontSize: '1.15rem',
                        letterSpacing: '0.15em',
                        fontWeight: 400,
                      }}
                    >
                      {tQA(`${key}.title`)}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      {key === 'access' && (
                        <MapPin size={11} style={{ color: '#c49a3a' }} />
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          color: '#c49a3a',
                          fontSize: '0.65rem',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {tQA(`${key}.cta`)}
                      </span>
                      <ArrowRight
                        size={12}
                        style={{ color: '#c49a3a' }}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
