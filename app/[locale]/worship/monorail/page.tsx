'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, AlertCircle, PhoneCall, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_HERO  = '/images/regenerate_monorail.png';
const IMG_PHOTO = '/images/image-8.png';

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

// ── Scroll-triggered fade ─────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Ornament divider ──────────────────────────────────────────────────────────
function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
      <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.5, transform: 'rotate(45deg)' }} />
      <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MonorailPage() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HERO}
          alt={t('worshipMonorail_text_1')}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 60%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,3,3,0.52) 0%, rgba(10,3,3,0.72) 100%)',
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
            >{t("worshipMonorailPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipMonorailPage_text_11089")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipMonorailPage_text_29672")}</span>
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
              Monorail Guide
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300,
              letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>{t("worshipMonorailPage_text_29672")}</h1>
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
        <div className="max-w-3xl mx-auto px-6 md:px-10" style={{ padding: '64px 40px 100px' }}>

          {/* ── Lead text + image ─────────────────────────────────────────── */}
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Text block */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-serif)', color: C.text,
                  fontSize: '1.05rem', lineHeight: 2.1,
                  letterSpacing: '0.06em', marginBottom: '16px',
                }}>
                  宇佐神宮では、体の不自由な方・高齢の方・ベビーカーのご家族様により良いご参拝が出来ますようにモノレールの運行を行っています。
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)', color: C.text,
                  fontSize: '1.05rem', lineHeight: 2.1,
                  letterSpacing: '0.06em', marginBottom: '10px',
                }}>
                  また車イスの貸出（予約制）も行っております。
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.88rem', lineHeight: 1.9,
                  letterSpacing: '0.04em',
                }}>
                  台数に限りがありますので、ご希望の方はお問い合わせください。
                </p>
              </div>

              {/* RHS image */}
              <div style={{
                flexShrink: 0,
                width: 'clamp(160px, 35%, 260px)',
                border: `1px solid ${C.borderG}`,
                overflow: 'hidden',
              }}>
                <img
                  src={IMG_PHOTO}
                  alt={t('worshipMonorail_text_2')}
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
              </div>
            </div>
          </FadeIn>

          <OrnamentDivider />

          {/* ── Highlight cards ────────────────────────────────────────────── */}
          <FadeIn delay={0.05}>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              style={{ marginBottom: '48px' }}
            >
              {/* Card: Hours */}
              <div style={{
                backgroundColor: '#fff',
                border: `1px solid ${C.borderG}`,
                padding: '28px 28px 24px',
                position: 'relative',
              }}>
                {/* Gold top bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: `linear-gradient(to right, ${C.crimson}, ${C.gold})`,
                }} />
                <div className="flex items-start gap-4">
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    backgroundColor: 'rgba(162,122,40,0.08)',
                    border: `1px solid ${C.borderG}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Clock size={18} style={{ color: C.gold }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.gold,
                      fontSize: '0.58rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', marginBottom: '6px',
                    }}>Operating Hours</p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.text,
                      fontSize: '0.78rem', marginBottom: '6px', letterSpacing: '0.08em',
                    }}>
                      ■ ご利用時間
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.crimson,
                      fontSize: '1.1rem', letterSpacing: '0.06em', fontWeight: 400,
                    }}>
                      午前9時00分 〜 午後3時30分
                    </p>
                  </div>
                </div>
              </div>

              {/* Card: Capacity */}
              <div style={{
                backgroundColor: '#fff',
                border: `1px solid ${C.borderG}`,
                padding: '28px 28px 24px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: `linear-gradient(to right, ${C.crimson}, ${C.gold})`,
                }} />
                <div className="flex items-start gap-4">
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    backgroundColor: 'rgba(162,122,40,0.08)',
                    border: `1px solid ${C.borderG}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Users size={18} style={{ color: C.gold }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.gold,
                      fontSize: '0.58rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', marginBottom: '6px',
                    }}>Capacity</p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.text,
                      fontSize: '0.78rem', marginBottom: '6px', letterSpacing: '0.08em',
                    }}>
                      ■ 乗車定員
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.crimson,
                      fontSize: '1rem', letterSpacing: '0.06em', fontWeight: 400,
                      lineHeight: 1.7,
                    }}>
                      定員6名<br />
                      または 定員4名＋車イス1台
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Notes / cautions ──────────────────────────────────────────── */}
          <FadeIn delay={0.1}>
            <div style={{
              backgroundColor: '#fff',
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.crimson}`,
              padding: '28px 32px',
              marginBottom: '40px',
            }}>
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle size={16} style={{ color: C.crimson, flexShrink: 0 }} strokeWidth={1.5} />
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.crimson,
                  fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                }}>{t("worshipMonorailPage_text_82446")}</p>
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  t('worshipMonorail_text_3'),
                  t('worshipMonorail_text_4'),
                  t('worshipMonorail_text_5'),
                  t('worshipMonorail_text_6'),
                  t('worshipMonorail_text_7'),
                ].map((note, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginBottom: i < 4 ? '14px' : 0,
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-sans)', color: C.gold,
                      fontSize: '0.72rem', flexShrink: 0, marginTop: '2px',
                    }}>
                      ※
                    </span>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMid,
                      fontSize: '0.85rem', lineHeight: 1.8,
                      letterSpacing: '0.04em',
                    }}>
                      {note}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Closing line inside the caution box */}
              <div style={{
                marginTop: '20px',
                paddingTop: '18px',
                borderTop: `1px solid ${C.borderG}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <PhoneCall size={14} style={{ color: C.gold, flexShrink: 0 }} strokeWidth={1.5} />
                <p style={{
                  fontFamily: 'var(--font-serif)', color: C.text,
                  fontSize: '0.92rem', letterSpacing: '0.06em', lineHeight: 1.8,
                }}>
                  ご協力の程よろしくお願い致します。
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Monorail photo below caution box ─────────────────────────── */}
          <FadeIn delay={0.12}>
            <div style={{
              border: `1px solid ${C.borderG}`,
              overflow: 'hidden',
            }}>
              <img
                src={IMG_HERO}
                alt={t('worshipMonorail_text_8')}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
