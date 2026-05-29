'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, MapPin, ChevronRight, Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  C,
  FadeIn,
  SectionBanner,
  DiamondRule,
  ContentHeading
} from '@/components/ShrineUI';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_KARIZOME = '/images/image-14.png';
const IMG_SHIHO    = '/images/image-15.png';

// ═══════════════════════════════════════════════════════════════════════════════
export default function TripPage() {
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
          background: 'linear-gradient(to bottom,rgba(0,0,0,0.12) 0%,rgba(0,0,0,0.3) 100%)',
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
            >{t("worshipTripPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipTripPage_text_11089")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipTripPage_text_19100")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.goldLt,
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', marginBottom: '10px',
            }}>
              On-site Ceremonies
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em',
              textShadow: '0 3px 20px rgba(0,0,0,0.5)',
            }}>{t("worshipTripPage_text_19100")}</h1>
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

          {/* ══ 祭典の種類 ══ */}
          <FadeIn>
            <SectionBanner ja={t('worshipTrip_text_1')} en="Types of Ceremony" />
          </FadeIn>

          {/* Two-column: LEFT = ceremony descriptions, RIGHT = two stacked images */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* ── LEFT: Ceremony descriptions ── */}
              <div style={{ flex: 1, minWidth: 0 }}>

                {/* ── 地鎮祭・起工式 ── */}
                <div style={{ marginBottom: '28px' }}>
                  <ContentHeading>{t('worshipTrip_text_2')}</ContentHeading>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}>
                    地鎮祭（じちんさい）は &quot;とこしずめのまつり&quot; とも読まれます。
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}>
                    建物の新築にあたり、その土地の神様を祀り、土地の平安堅固と工事の竣功を祈る祭典です。
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                    marginBottom: '14px',
                  }}>
                    土木・建築工事のうち、基礎工事に着手する前の段階で斎行されます。
                  </p>
                  <a
                    href="/docs/trip_program.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-crimson transition-colors"
                    style={{
                      fontFamily: 'var(--font-sans)', color: C.crimson,
                      fontSize: '0.82rem', letterSpacing: '0.08em', textDecoration: 'none',
                      borderBottom: `1px solid rgba(165,0,0,0.35)`,
                      paddingBottom: '1px',
                    }}
                  >{t("worshipTripPage_text_34745")}</a>
                </div>

                {/* ── 上棟祭 ── */}
                <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: `1px solid ${C.borderG}` }}>
                  <ContentHeading>{t('worshipTrip_text_3')}</ContentHeading>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}>
                    上棟祭（じょうとうさい）は、&quot;むねあげまつり&quot;とも読まれます。
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}>
                    建物の新築にあたり、竣功後も家屋が無事であるようにと、家屋の守護神や工匠の神様を祀り祈る祭典です。
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  }}>
                    通常、建築工事のうち柱、棟、梁など基本部分の構造が完成して棟木を上げる段階で斎行されます。
                  </p>
                </div>

                {/* ── 竣功祭・入居清祓式 ── */}
                <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: `1px solid ${C.borderG}` }}>
                  <ContentHeading>{t('worshipTrip_text_4')}</ContentHeading>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  }}>
                    竣功祭（しゅんこうさい）・入居清祓式（にゅうきょきよはらいしき）とは、建物が完成し、いよいよ入居となる際に斎行する祭典です。竣功した家屋を祓い清めるとともに、そこに住む人々の平安を祈念致します。
                  </p>
                </div>

                {/* ── 工事安全祈願祭 ── */}
                <div style={{ marginBottom: '28px', paddingTop: '20px', borderTop: `1px solid ${C.borderG}` }}>
                  <ContentHeading>{t('worshipTrip_text_5')}</ContentHeading>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  }}>
                    工事にあたる人々の心を引き締め、工事 of の安全を祈念致します。
                  </p>
                </div>

                {/* ── その他の祭典 note ── */}
                <div style={{
                  paddingTop: '18px', borderTop: `1px solid ${C.borderG}`,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  }}>
                    その他、<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{t('worshipTrip_text_7')}</strong>、<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{t('worshipTrip_text_6')}</strong>なども受け付けております。
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  }}>{t("worshipTripPage_text_74490")}<em style={{ fontStyle: 'normal', color: C.gold }}>{t('worshipTrip_text_8')}</em>ご連絡ください。
                  </p>
                </div>

              </div>

              {/* ── RIGHT: Two stacked images ── */}
              <div
                className="flex lg:flex-col gap-4 lg:gap-5"
                style={{ flexShrink: 0, width: '100%', maxWidth: '220px' }}
              >
                {/* image-14: 刈初の儀 */}
                {IMG_KARIZOME && (
                  <figure style={{ margin: 0, flex: 1 }}>
                    <div style={{ border: `1px solid ${C.borderG}`, overflow: 'hidden' }}>
                      <img
                        src={IMG_KARIZOME}
                        alt={t('worshipTrip_text_9')}
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    </div>
                    <figcaption style={{ marginTop: '8px', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                        地鎮祭
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                        「刈初（かりぞめ）の儀」
                      </p>
                    </figcaption>
                  </figure>
                )}

                {/* image-15: 四方祓いの儀 */}
                {IMG_SHIHO && (
                  <figure style={{ margin: 0, flex: 1 }}>
                    <div style={{ border: `1px solid ${C.borderG}`, overflow: 'hidden' }}>
                      <img
                        src={IMG_SHIHO}
                        alt={t('worshipTrip_text_10')}
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                      />
                    </div>
                    <figcaption style={{ marginTop: '8px', textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                        地鎮祭
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                        「四方祓いの儀」
                      </p>
                    </figcaption>
                  </figure>
                )}
              </div>

            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ 初穂料について ══ */}
          <FadeIn>
            <SectionBanner ja={t('worshipTrip_text_11')} en="Offering" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="flex flex-col sm:flex-row items-center gap-6 p-7 md:p-9"
              style={{ background: C.stone, border: `1px solid ${C.borderG}` }}
            >
              {/* Gold offering tag */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center px-7 py-5"
                style={{ background: C.gold, minWidth: '120px' }}
              >
                <p style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '4px' }}>{t('worshipTrip_text_12')}</p>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.75)', fontSize: '0.58rem', letterSpacing: '0.15em' }}>Offering</p>
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)', color: C.text,
                  fontSize: 'clamp(1.2rem,3vw,1.5rem)', letterSpacing: '0.2em', fontWeight: 400,
                }}>
                  30,000円以上のお納めとなります。
                </p>
              </div>
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ お問合せ ══ */}
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

          {/* ── その他のご祈願について link ── */}
          <FadeIn delay={0.05}>
            <div style={{ marginTop: '28px' }}>
              <Link
                href={`/${locale}/worship/pray`}
                className="inline-flex items-center gap-1 hover:text-crimson transition-colors"
                style={{
                  fontFamily: 'var(--font-sans)', color: C.crimson,
                  fontSize: '0.82rem', letterSpacing: '0.1em', textDecoration: 'none',
                  borderBottom: `1px solid rgba(165,0,0,0.3)`,
                  paddingBottom: '2px',
                }}
              >
                <ChevronRight size={13} />{t("worshipTripPage_text_53107")}</Link>
            </div>
          </FadeIn>

          {/* ── Back links ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ paddingTop: '56px', paddingBottom: '80px' }}
          >
            <Link
              href={`/${locale}/worship`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.15em',
                color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
                textDecoration: 'none', display: 'inline-block',
              }}
            >{t("worshipTripPage_text_71902")}</Link>
            <Link
              href={`/${locale}/worship/pray`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.12em',
                color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
                textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
              }}
            >{t("worshipTripPage_text_17397")}</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
