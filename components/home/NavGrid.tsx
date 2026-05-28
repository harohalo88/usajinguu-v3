'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';

// Exact Unsplash URLs from original Home.tsx
const GRID_IMAGES = [
  'https://images.unsplash.com/photo-1749813352101-b277dbb2b406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGludG8lMjBzaHJpbmUlMjBjZXJlbW9ueSUyMGZlc3RpdmFsfGVufDF8fHx8MTc3NjY3NDgxM3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1771517713047-96bf79012ca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwamFwYW5lc2UlMjBzaHJpbmUlMjBoaXN0b3J5fGVufDF8fHx8MTc3NjY3NDgxM3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1768822355412-3d10280ee224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMGRlaXR5JTIwc3RhdHVlfGVufDF8fHx8MTc3NjY3NDgxM3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1761748386532-1ffd66b502cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMHdvcnNoaXAlMjBwcmF5ZXIlMjBoYW5kc3xlbnwxfHx8fDE3NzY2NzQ4MTR8MA&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1768947814438-1ccb37a772f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMGdyb3VuZHMlMjBnYXJkZW4lMjBwYXRofGVufDF8fHx8MTc3NjY3NDgxNHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1775807678680-55dcdf7018cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNocmluZSUyMHByYXllciUyMHJpdHVhbCUyMGNlcmVtb255fGVufDF8fHx8MTc3NjY3NDgxN3ww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1616470979821-796ebd68b5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNoaW50byUyMHdlZGRpbmclMjBjZXJlbW9ueSUyMGJyaWRlfGVufDF8fHx8MTc3NjY3NDgxOHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1677061856184-e20876d3c53a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG9tYW1vcmklMjBsdWNreSUyMGNoYXJtJTIwYW11bGV0fGVufDF8fHx8MTc3NjY3NDgxOHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1770005065276-f8668e39f7e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGZlc3RpdmFsJTIwbWF0c3VyaSUyMGxhbnRlcm5zfGVufDF8fHx8MTc3NjY3NDgxOHww&ixlib=rb-4.1.0&q=80&w=400',
  'https://images.unsplash.com/photo-1759301247127-1a302f0dd82d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNvbW11bml0eSUyMGdhdGhlcmluZyUyMGdyb3VwfGVufDF8fHx8MTc3NjY3NDgxOHww&ixlib=rb-4.1.0&q=80&w=400',
];

// Routes per card — match original exactly
const GRID_ROUTES = [
  '/festivals',
  '/about/history',
  '/about/deities',
  '/worship/etiquette',
  '/worship/guide',
  '/worship/pray',
  '/wedding',
  '/worship/confer',
  '/festivals/festival-list',
  '/society',
];

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

export function NavGrid() {
  const t = useTranslations();
  const locale = useLocale();
  const tGrid = useTranslations('navGrid');

  const cards = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

  return (
    <section
      id="nav-grid"
      style={{
        backgroundColor: '#0A0300',
        padding: 'clamp(48px,6vw,80px) 0',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(16px,3vw,48px)' }}>
        {/* Section header */}
        <FadeIn>
          <div className="flex flex-col items-center mb-10">
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                color: '#a27a28',
                fontSize: '0.58rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                opacity: 0.9,
              }}
            >
              {t('navGridTitleEn')}
            </p>
            <div className="flex items-center gap-4">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
              <div
                style={{
                  width: '5px',
                  height: '5px',
                  backgroundColor: '#a27a28',
                  opacity: 0.7,
                  transform: 'rotate(45deg)',
                }}
              />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
            </div>
          </div>
        </FadeIn>

        {/* 10-card grid: 2 cols mobile → 3 cols sm → 5 cols md */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {cards.map((key, i) => {
            const title = tGrid(`${key}.title`);
            const route = GRID_ROUTES[i];
            const img = GRID_IMAGES[i];
            return (
              <FadeIn key={key} delay={0.04 + i * 0.055}>
                <Link href={`/${locale}${route}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    className="group relative overflow-hidden"
                    style={{
                      aspectRatio: '3/4',
                      border: '2px solid rgba(162,122,40,0.35)',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Photo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        transform: 'scale(1.01)',
                        transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                    {/* Dark gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to bottom, rgba(10,3,3,0.55) 0%, rgba(10,3,3,0.32) 40%, rgba(10,3,3,0.55) 100%)',
                      }}
                    />
                    {/* Gold hover tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'rgba(162,122,40,0.12)' }}
                    />
                    {/* Gold bottom line — slides in on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ backgroundColor: '#a27a28' }}
                    />
                    {/* Vertical kanji title */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        style={{
                          writingMode: 'vertical-rl',
                          fontFamily: 'var(--font-serif)',
                          color: '#faf8f5',
                          fontSize: 'clamp(1.05rem,1.8vw,1.45rem)',
                          fontWeight: 700,
                          letterSpacing: '0.28em',
                          lineHeight: 1.1,
                          textShadow:
                            '0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7)',
                          margin: 0,
                        }}
                      >
                        {title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
