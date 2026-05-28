'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';

function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function VisitCTA() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section
      style={{
        backgroundColor: '#a50000',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <FadeIn>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(196,154,58,0.9)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          {t('visitCtaTitleEn')}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#faf8f5',
            fontSize: 'clamp(1.2rem,3vw,1.8rem)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            marginBottom: '8px',
          }}
        >
          {t('visitCtaTitle')}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(250,248,245,0.7)',
            fontSize: '0.8rem',
            marginBottom: '28px',
            letterSpacing: '0.08em',
          }}
        >
          {t('visitCtaAddress')}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href={`/${locale}/worship/access`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: '#333',
              backgroundColor: 'rgba(250,248,245,0.92)',
              padding: '10px 24px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {t('visitCtaAccess')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: '#faf8f5',
              padding: '10px 24px',
              textDecoration: 'none',
              border: '1px solid rgba(250,248,245,0.45)',
              display: 'inline-block',
            }}
          >
            {t('visitCtaContact')}
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
