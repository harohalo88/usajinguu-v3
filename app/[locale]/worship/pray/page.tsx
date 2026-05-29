'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Clock, ChevronRight, MapPin, Phone, Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_INTRO = '/images/image-9.png';
const IMG_STEP1 = '/images/image-2.png';
const IMG_STEP2 = '/images/image-10.png';
const IMG_STEP3 = '/images/image-11.png';

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  crimson:  '#a50000',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
  border:   'rgba(165,0,0,0.1)',
  borderG:  'rgba(162,122,40,0.18)',
};

// ── Scroll-reveal ─────────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Diamond divider ───────────────────────────────────────────────────────────
function DiamondRule() {
  return (
    <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 opacity-50 my-12">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: C.gold }} />
      </div>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function PrayPage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a0800 0%, #3a1000 60%, #1a0800 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg,rgba(162,122,40,0.03) 0,rgba(162,122,40,0.03) 1px,transparent 0,transparent 50%)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 100%)',
        }} />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, paddingTop: '64px' }}
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >{t("worshipPrayPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipPrayPage_text_11089")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipPrayPage_text_59693")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.goldLt,
              fontSize: '0.6rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', marginBottom: '10px',
            }}>
              Pray &amp; Ceremony
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em', textShadow: '0 3px 20px rgba(0,0,0,0.5)',
            }}>{t("worshipPrayPage_text_59693")}</h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Body ══════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.ivory }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10" style={{ paddingTop: '64px' }}>

          {/* ── Intro ── */}
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.06em' }}>
                  ご祈願祭は、上宮祈祷殿にて執り行われています。
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.06em', marginTop: '12px' }}>
                  古来より八幡大神様の御神徳が蒙られますことを祈り、年間一万件以上の遠近の人々が各々の願事をご祈願されております。
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.06em', marginTop: '12px' }}>
                  当神宮では、ご祈願者の皆様を以下の要項にてお待ち申し上げております。
                </p>
              </div>

              <div style={{
                width: '100%', maxWidth: '300px', flexShrink: 0,
                overflow: 'hidden', border: `1px solid ${C.borderG}`,
              }}>
                <img
                  src={IMG_INTRO}
                  alt={t('worshipPray_text_1')}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', height: '210px' }}
                />
              </div>
            </div>
          </FadeIn>

          {/* ── Prayer wishes list ── */}
          <FadeIn delay={0.1}>
            <div
              className="mt-10 p-8 md:p-10"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              <ul style={{
                fontFamily: 'var(--font-sans)', color: C.textMid,
                fontSize: '0.87rem', lineHeight: 2.2, letterSpacing: '0.04em',
                listStyle: 'none', padding: 0, margin: 0,
              }}>
                <li style={{ paddingLeft: '1.2em', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_2')}</span>
                  <Link
                    href={`/${locale}/worship/fortune/`}
                    style={{ color: C.crimson, textDecoration: 'none' }}
                    className="hover:underline"
                  >{t("worshipPrayPage_text_14223")}</Link>
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_3')}</span>
                  家内安全 ・交通安全 ・病気平癒 ・身上安全
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_4')}</span>
                  <Link
                    href={`/${locale}/worship/fortune/#list1`}
                    style={{ color: C.crimson, textDecoration: 'none' }}
                    className="hover:underline"
                  >{t("worshipPrayPage_text_67265")}</Link>
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_5')}</span>
                  心願成就 ・神恩感謝 ・良縁成就 ・安産祈願 ・商売繁盛 ・事業発展 ・工場安全 ・工事安全
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_6')}</span>
                  海上安全 ・大漁満足 ・選挙当選 ・必勝祈願 ・入試合格 ・学業成就 ・
                  <Link
                    href={`/${locale}/worship/fortune/#list2`}
                    style={{ color: C.crimson, textDecoration: 'none' }}
                    className="hover:underline"
                  >{t("worshipPrayPage_text_66117")}</Link>
                  {' '}・旅行安全
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>{t('worshipPray_text_7')}</span>
                  皇室弥栄国家安泰世界平和祈願 ・七五三詣
                </li>
              </ul>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${C.borderG}` }}>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.83rem', letterSpacing: '0.05em' }}>
                  その他{' '}
                  <Link
                    href={`/${locale}/worship/trip`}
                    style={{ color: C.crimson, textDecoration: 'none' }}
                    className="hover:underline"
                  >{t("worshipPrayPage_text_89108")}</Link>
                </p>
              </div>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 受付手順 heading ── */}
          <FadeIn>
            <div className="mb-10">
              <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '8px' }}>
                How to Apply
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.2rem,3vw,1.5rem)', letterSpacing: '0.22em', fontWeight: 400 }}>{t("worshipPrayPage_text_85781")}</h2>
              <div style={{ marginTop: '14px', height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)` }} />
            </div>
          </FadeIn>

          {/* ── 3-column step flow ── */}
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">

              {/* Step 1 */}
              <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden', border: `1px solid ${C.borderG}` }}>
                  <img
                    src={IMG_STEP1}
                    alt={t('worshipPray_text_8')}
                    style={{ width: '100%', display: 'block', objectFit: 'cover', height: '180px' }}
                  />
                </div>
                <div style={{ padding: '20px 16px 28px', background: C.stone, border: `1px solid ${C.border}`, borderTop: 'none', minHeight: '110px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ width: '22px', height: '22px', background: C.crimson, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.65rem' }}>{t('worshipPray_text_9')}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.85rem', letterSpacing: '0.15em' }}>{t('worshipPray_text_10')}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.8rem', lineHeight: 1.9, letterSpacing: '0.04em' }}>
                    上宮ご神木奥の祈祷殿受付にお越し下さい。
                  </p>
                </div>
                <div
                  className="hidden md:flex items-center justify-center"
                  style={{
                    position: 'absolute', top: '90px', right: '-14px',
                    width: '28px', height: '28px', zIndex: 10,
                    background: C.ivory, border: `1px solid ${C.borderG}`,
                    borderRadius: '50%',
                  }}
                >
                  <ChevronRight size={13} color={C.gold} />
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ position: 'relative' }}>
                <div style={{ overflow: 'hidden', border: `1px solid ${C.borderG}`, borderLeft: 'none' }}>
                  <img
                    src={IMG_STEP2}
                    alt={t('worshipPray_text_11')}
                    style={{ width: '100%', display: 'block', objectFit: 'cover', height: '180px' }}
                  />
                </div>
                <div style={{ padding: '20px 16px 28px', background: C.stone, border: `1px solid ${C.border}`, borderTop: 'none', borderLeft: 'none', minHeight: '110px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ width: '22px', height: '22px', background: C.crimson, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.65rem' }}>{t('worshipPray_text_12')}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.85rem', letterSpacing: '0.15em' }}>{t('worshipPray_text_13')}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.8rem', lineHeight: 1.9, letterSpacing: '0.04em' }}>
                    申込用紙にご記入の上、受付をお済ませください。
                  </p>
                </div>
                <div
                  className="hidden md:flex items-center justify-center"
                  style={{
                    position: 'absolute', top: '90px', right: '-14px',
                    width: '28px', height: '28px', zIndex: 10,
                    background: C.ivory, border: `1px solid ${C.borderG}`,
                    borderRadius: '50%',
                  }}
                >
                  <ChevronRight size={13} color={C.gold} />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div style={{ overflow: 'hidden', border: `1px solid ${C.borderG}`, borderLeft: 'none' }}>
                  <img
                    src={IMG_STEP3}
                    alt={t('worshipPray_text_14')}
                    style={{ width: '100%', display: 'block', objectFit: 'cover', height: '180px' }}
                  />
                </div>
                <div style={{ padding: '20px 16px 28px', background: C.stone, border: `1px solid ${C.border}`, borderTop: 'none', borderLeft: 'none', minHeight: '110px' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ width: '22px', height: '22px', background: C.crimson, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.65rem' }}>{t('worshipPray_text_15')}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.85rem', letterSpacing: '0.15em' }}>{t('worshipPray_text_16')}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.8rem', lineHeight: 1.9, letterSpacing: '0.04em' }}>
                    祈祷殿控室にてお待ちいただきました後、巫女が祈祷殿へとご案内致します。
                  </p>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* ── 受付時間 ── */}
          <FadeIn delay={0.1}>
            <div
              className="mt-6 flex flex-col sm:flex-row items-stretch"
              style={{ border: `1px solid ${C.borderG}` }}
            >
              <div
                className="flex items-center justify-center px-8 py-4"
                style={{ background: C.gold, flexShrink: 0, minWidth: '130px' }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={15} color="#faf8f5" strokeWidth={1.5} />
                  <span style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.85rem', letterSpacing: '0.22em', whiteSpace: 'nowrap' }}>{t("worshipPrayPage_text_56028")}</span>
                </div>
              </div>
              <div
                className="flex flex-col justify-center px-8 py-5"
                style={{ background: C.stone, flex: 1 }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.4rem,3vw,1.9rem)', letterSpacing: '0.2em', fontWeight: 400 }}>
                  9時～16時
                  <span style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.8rem', letterSpacing: '0.12em', marginLeft: '12px' }}>{t("worshipPrayPage_text_77683")}</span>
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.78rem', lineHeight: 1.9, letterSpacing: '0.04em', marginTop: '6px' }}>
                  ※恒例祭及び結婚式等により、しばらくお待ちいただく場合がございます。
                </p>
              </div>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 初穂料について ── */}
          <FadeIn>
            <div className="mb-8">
              <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Offering
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.2rem,3vw,1.5rem)', letterSpacing: '0.22em', fontWeight: 400 }}>{t("worshipPrayPage_text_47695")}</h2>
              <div style={{ marginTop: '14px', height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)` }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="p-8 md:p-10"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              <div className="mb-6 pb-4" style={{ borderBottom: `1px solid ${C.borderG}` }}>
                <p style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1rem', letterSpacing: '0.22em', fontWeight: 500 }}>
                  ご祈願祭
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* 個人 */}
                <div
                  className="flex-1 p-6"
                  style={{
                    background: C.ivory,
                    border: `1px solid ${C.borderG}`,
                    borderLeft: `3px solid ${C.gold}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div style={{ width: '8px', height: '8px', background: C.gold, transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.95rem', letterSpacing: '0.2em' }}>{t('worshipPray_text_17')}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.83rem', letterSpacing: '0.06em' }}>{t("worshipPrayPage_text_38815")}</p>
                  <p style={{ fontFamily: 'var(--font-serif)', color: C.crimson, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', letterSpacing: '0.08em', marginTop: '4px' }}>
                    5,000円より
                  </p>
                </div>

                {/* 団体 */}
                <div
                  className="flex-1 p-6"
                  style={{
                    background: C.ivory,
                    border: `1px solid ${C.borderG}`,
                    borderLeft: `3px solid ${C.crimson}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div style={{ width: '8px', height: '8px', background: C.crimson, transform: 'rotate(45deg)', flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.95rem', letterSpacing: '0.2em' }}>{t('worshipPray_text_18')}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.83rem', letterSpacing: '0.06em' }}>{t("worshipPrayPage_text_38815")}</p>
                  <p style={{ fontFamily: 'var(--font-serif)', color: C.crimson, fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', letterSpacing: '0.08em', marginTop: '4px' }}>
                    10,000円より
                  </p>
                </div>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.78rem', lineHeight: 1.9, marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${C.borderG}` }}>
                ※正式参拝（特別参拝）をご希望の方は、宇佐神宮庁までお問い合わせください。
              </p>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 出張祭典 ── */}
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: '3px', height: '40px', background: `linear-gradient(to bottom,${C.crimson},rgba(165,0,0,0.1))` }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    On-site Ceremony
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', letterSpacing: '0.22em', fontWeight: 400 }}>
                    出張祭典
                  </h2>
                </div>
              </div>
              <div style={{ height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)`, marginBottom: '20px' }} />
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em' }}>
                地鎮祭・起工式等、神職が直接現地へお伺いし、祭壇を設け祭典をご奉仕致します。
              </p>
              <Link
                href={`/${locale}/worship/trip`}
                className="inline-flex items-center gap-1 hover:underline"
                style={{ fontFamily: 'var(--font-sans)', color: C.crimson, fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '12px' }}
              >
                <ChevronRight size={13} />
                詳しくはこちらをご覧ください。
              </Link>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 遠方からの祈願祭 ── */}
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: '3px', height: '40px', background: `linear-gradient(to bottom,${C.crimson},rgba(165,0,0,0.1))` }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Postal Prayer
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', letterSpacing: '0.22em', fontWeight: 400 }}>{t("worshipPrayPage_text_24863")}</h2>
                </div>
              </div>
              <div style={{ height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)`, marginBottom: '20px' }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="p-8 md:p-10"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em' }}>
                本来、お札・お守りは神社にご参拝をして直接お受けいただきますが、諸事情によりご参拝が困難な方や遠方にお住まいの方などには、当宮にて祈願祭斎行後、撤下品をご送付致しております。
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em', marginTop: '10px' }}>
                ご希望の方は下記【お問い合わせ】よりご連絡ください。
              </p>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 結婚式 ── */}
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: '3px', height: '40px', background: `linear-gradient(to bottom,${C.crimson},rgba(165,0,0,0.1))` }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Wedding Ceremony
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', letterSpacing: '0.22em', fontWeight: 400 }}>
                    結婚式
                  </h2>
                </div>
              </div>
              <div style={{ height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)`, marginBottom: '20px' }} />
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em' }}>
                当神宮において、神前結婚式を執り行います。
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em', marginTop: '6px' }}>
                ご希望の方は下記【お問い合わせ】よりご連絡ください。
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  href={`/${locale}/wedding`}
                  className="inline-flex items-center gap-1 hover:underline"
                  style={{ fontFamily: 'var(--font-sans)', color: C.crimson, fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none' }}
                >
                  <ChevronRight size={13} />
                  詳しくはこちらをご覧ください。
                </Link>
                <a
                  href="/docs/reiwa_kyosiki_mousikomi_merged.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                  style={{ fontFamily: 'var(--font-sans)', color: C.crimson, fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none' }}
                >
                  <ChevronRight size={13} />{t("worshipPrayPage_text_29065")}</a>
              </div>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── 祭のご予約について ── */}
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-5">
                <div style={{ width: '3px', height: '40px', background: `linear-gradient(to bottom,${C.crimson},rgba(165,0,0,0.1))` }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Reservation
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', letterSpacing: '0.22em', fontWeight: 400 }}>{t("worshipPrayPage_text_15205")}</h2>
                </div>
              </div>
              <div style={{ height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)`, marginBottom: '20px' }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="p-8 md:p-10"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em' }}>
                団体様・会社様でのご祈願祭・正式参拝をご希望の方は、事前に《 電話 / FAX 》にてお問合せください。個人でお越しになる方は、ご予約は必要ございません。
              </p>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ── お問い合わせ ── */}
          <FadeIn delay={0.05}>
            <div
              className="p-8 md:p-10"
              style={{ background: '#1e1810', border: `1px solid rgba(162,122,40,0.25)` }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', color: C.goldLt, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contact
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', letterSpacing: '0.22em', fontWeight: 400, marginBottom: '20px', fontSize: '1rem' }}>
                【お問い合わせ】
              </h3>

              <div style={{ borderTop: '1px solid rgba(162,122,40,0.18)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.95rem', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '14px' }}>
                  宇佐神宮庁　祭務課
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} color={C.goldLt} strokeWidth={1.5} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.06em', lineHeight: 1.8 }}>
                      〒872-0102 大分県宇佐市南宇佐2859
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} color={C.goldLt} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.08em' }}>
                      TEL：0978-37-0001
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Printer size={14} color={C.goldLt} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.08em' }}>
                      FAX：0978-37-2748
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Back links ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn"
            style={{ paddingTop: '56px', paddingBottom: '80px' }}
          >
            <Link
              href={`/${locale}/worship`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.15em',
                color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
                textDecoration: 'none', display: 'inline-block',
              }}
            >{t("worshipPrayPage_text_71902")}</Link>
            <Link
              href={`/${locale}`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.12em',
                color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
                textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
              }}
            >{t("worshipPrayPage_text_25133")}</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
