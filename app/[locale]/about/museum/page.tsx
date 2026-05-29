'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HEADER_IMG = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_crop,w_1500,h_422,x_0,y_550/c_scale,w_1600,h_450/f_auto/q_auto/%E5%AE%9D%E7%89%A9%E9%A4%A8_img01_wtweeg.jpg';

const C = {
  dark: '#1e1810',
  goldLt: '#c49a3a',
  crimson: '#a50000',
  vermil: '#e2501f',
  ivory: '#faf8f5',
  border: 'rgba(162,122,40,0.22)',
  stone: '#f2ece4',
  textMute: '#7a6a5a',
  gold: '#A27A28',
};

export default function MuseumPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>
      {/* ── Inner Page Header ── */}
      <section style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        <img src={HEADER_IMG} alt={t('aboutMuseum_text_1')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,3,3,0.45), rgba(10,3,3,0.68))' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10, paddingTop: '72px' }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6">
            <Link href={`/${locale}`} style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.55)', fontSize: '0.62rem', letterSpacing: '0.1em', textDecoration: 'none' }}>{t('aboutMuseum_text_2')}</Link>
            <ChevronRight size={11} style={{ color: 'rgba(250,248,245,0.3)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.55)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>{t('aboutMuseum_text_3')}</span>
            <ChevronRight size={11} style={{ color: 'rgba(250,248,245,0.3)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: 'rgba(196,154,58,0.85)', fontSize: '0.62rem', letterSpacing: '0.1em' }}>{t('aboutMuseum_text_4')}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <p style={{ fontFamily: 'var(--font-sans)', color: C.goldLt, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '10px' }}>Treasure Museum</p>
            <h1 className="font-title-main" style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 300, letterSpacing: '0.25em' }}>{t('aboutMuseum_text_5')}</h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div style={{ width: '36px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
              <div style={{ width: '4px', height: '4px', backgroundColor: '#a27a28', opacity: 0.65, transform: 'rotate(45deg)' }} />
              <div style={{ width: '36px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <div style={{ backgroundColor: C.ivory, minHeight: '60vh', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Decorative element */}
            <div style={{ width: '36px', height: '2px', backgroundColor: C.vermil, opacity: 0.7, margin: '0 auto 32px' }} />

            <div style={{ padding: '48px 40px', border: `1px solid ${C.border}`, backgroundColor: C.stone }}>
              {/* Kanji decoration */}
              <div style={{ fontFamily: 'var(--font-serif)', color: 'rgba(165,0,0,0.06)', fontSize: '8rem', lineHeight: 1, marginBottom: '-1.5rem', userSelect: 'none', overflow: 'hidden', position: 'relative' }}>{t("aboutMuseumPage_text_51509")}</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: C.crimson, fontSize: '1.3rem', letterSpacing: '0.25em', fontWeight: 400, marginBottom: '16px' }}>{t('aboutMuseum_text_6')}</h2>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.88rem', lineHeight: 2, marginBottom: '8px' }}>
                  このページは現在準備中です。
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.78rem', lineHeight: 1.8 }}>
                  This page is currently being prepared.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href={`/${locale}`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#faf8f5', backgroundColor: C.crimson, padding: '10px 24px', textDecoration: 'none', display: 'inline-block' }}>{t("aboutMuseumPage_text_18432")}</Link>
            </div>

            {/* Contact suggestion */}
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.75rem', letterSpacing: '0.08em', marginBottom: '12px' }}>{t("aboutMuseumPage_text_87802")}</p>
              <Link href={`/${locale}/contact`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.1em', color: C.gold, textDecoration: 'none' }}>
                お問い合せページへ →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
