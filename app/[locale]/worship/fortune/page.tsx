'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronRight, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  C,
  FadeIn,
  SectionBanner,
  DiamondRule
} from '@/components/ShrineUI';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_CHART = '/images/image-12.png';
const IMG_TORII = '/images/image-13.png';

// ═══════════════════════════════════════════════════════════════════════════════
export default function FortunePage() {
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
            >{t("worshipFortunePage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipFortunePage_text_11089")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipFortunePage_text_34806")}</span>
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
              Fortune & Longevity
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em',
              textShadow: '0 3px 20px rgba(0,0,0,0.5)',
            }}>{t("worshipFortunePage_text_34806")}</h1>
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

          {/* ── Intro paragraph ── */}
          <FadeIn>
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.textMid,
              fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
            }}>
              {t("worshipFortunePage_paragraph_yakudoshi_intro")}
            </p>
          </FadeIn>

          <DiamondRule />

          {/* ══ さまざまな厄年 ══ */}
          <FadeIn>
            <SectionBanner ja={t('worshipFortune_text_1')} en="Types of Yakudoshi" />
          </FadeIn>

          {/* Two-column: text LEFT, chart image RIGHT */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* ── Left: text ── */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  {t("worshipFortunePage_paragraph_yakudoshi_types_intro")}
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  {t.rich('worshipFortunePage_paragraph_yakudoshi_detail', {
                    strong1: (chunks) => <strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{chunks}</strong>,
                    blue: (chunks) => (
                      <span style={{
                        backgroundColor: C.blueBg,
                        color: C.blue,
                        fontWeight: 600,
                        padding: '1px 5px',
                        borderRadius: '2px',
                        margin: '0 2px',
                        whiteSpace: 'nowrap',
                      }}>{chunks}</span>
                    ),
                    pink: (chunks) => (
                      <span style={{
                        backgroundColor: C.pinkBg,
                        color: C.crimson,
                        fontWeight: 600,
                        padding: '1px 5px',
                        borderRadius: '2px',
                        margin: '0 2px',
                        whiteSpace: 'nowrap',
                      }}>{chunks}</span>
                    ),
                    strong2: (chunks) => <strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{chunks}</strong>
                  })}
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  {t.rich('worshipFortunePage_paragraph_mawaritoshi', {
                    strong1: (chunks) => <strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{chunks}</strong>
                  })}
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                }}>
                  {t('worshipFortunePage_paragraph_thirteen')}
                </p>
              </div>

              {/* ── Right: image-12 (厄年早見表) ── */}
              {IMG_CHART && (
                <div className="shrink-0 w-full lg:max-w-[260px] flex flex-col items-center">
                  <a
                    href="/docs/chart2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-[#a27a28]/18 w-full hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={IMG_CHART}
                      alt={t('worshipFortune_text_5')}
                      className="w-full h-auto block"
                    />
                  </a>
                  <a
                    href="/docs/chart2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 mt-2 text-xs tracking-wider text-text-mute hover:text-crimson transition-colors"
                  >
                    <ZoomIn size={12} />{t("worshipFortunePage_text_58489")}</a>
                </div>
              )}
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ 祝歳 ══ */}
          <FadeIn>
            <SectionBanner ja={t('worshipFortune_text_6')} en="Celebrations of Longevity" id="list1" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.textMid,
              fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
              marginBottom: '24px',
            }}>
              {t.rich('worshipFortunePage_paragraph_toshiiwai_intro', {
                strong1: (chunks) => <strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{chunks}</strong>,
                strong2: (chunks) => <strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>{chunks}</strong>
              })}
            </p>

            <div style={{
              border: `1px solid ${C.borderG}`,
              background: C.stone,
            }}>
              {[
                { name: t('worshipFortune_text_12'), age: t('worshipFortune_text_11'), desc: t('worshipFortune_text_10') },
                { name: t('worshipFortune_text_15'), age: t('worshipFortune_text_14'), desc: t('worshipFortune_text_13') },
                { name: t('worshipFortune_text_18'), age: t('worshipFortune_text_17'), desc: t('worshipFortune_text_16') },
                { name: t('worshipFortune_text_21'), age: t('worshipFortune_text_20'), desc: t('worshipFortune_text_19') },
                { name: t('worshipFortune_text_24'), age: t('worshipFortune_text_23'), desc: t('worshipFortune_text_22') },
                { name: t('worshipFortune_text_27'), age: t('worshipFortune_text_26'), desc: t('worshipFortune_text_25') },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-4"
                  style={{
                    borderBottom: i < 5 ? `1px solid ${C.borderG}` : 'none',
                    background: i % 2 === 0 ? C.stone : C.ivory,
                  }}
                >
                  {/* Red square bullet */}
                  <div style={{
                    width: '10px', height: '10px',
                    background: C.crimson,
                    flexShrink: 0,
                    marginTop: '5px',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span style={{
                        fontFamily: 'var(--font-serif)', color: C.crimson,
                        fontSize: '0.95rem', letterSpacing: '0.1em', fontWeight: 500,
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)', color: C.gold,
                        fontSize: '0.78rem', letterSpacing: '0.15em',
                      }}>
                        …{item.age}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMid,
                      fontSize: '0.88rem', lineHeight: 1.9, letterSpacing: '0.04em',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ 御礼報賽参り ══ */}
          <FadeIn>
            <SectionBanner ja={t('worshipFortune_text_28')} en="Gratitude & Thanksgiving" id="list2" />
          </FadeIn>

          {/* Two-column: text LEFT, image-13 RIGHT */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">

              {/* ── Left: text ── */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  {t('worshipFortunePage_paragraph_gratitude_1')}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '24px',
                }}>
                  {t('worshipFortunePage_paragraph_gratitude_2')}
                </p>

                <Link
                  href={`/${locale}/worship/pray/`}
                  className="inline-flex items-center gap-1 hover:text-crimson transition-colors"
                  style={{
                    fontFamily: 'var(--font-sans)', color: C.crimson,
                    fontSize: '0.78rem', letterSpacing: '0.1em', textDecoration: 'none',
                    borderBottom: `1px solid rgba(165,0,0,0.3)`,
                    paddingBottom: '2px',
                  }}
                >
                  <ChevronRight size={13} />{t("worshipFortunePage_text_53107")}</Link>
              </div>

              {/* ── Right: image-13 (torii path) ── */}
              {IMG_TORII && (
                <div style={{
                  flexShrink: 0,
                  width: '100%', maxWidth: '220px',
                  border: `1px solid ${C.borderG}`,
                  overflow: 'hidden',
                }}>
                  <img
                    src={IMG_TORII}
                    alt={t('worshipFortune_text_29')}
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              )}
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
                fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.15em',
                color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
                textDecoration: 'none', display: 'inline-block',
              }}
            >{t("worshipFortunePage_text_71902")}</Link>
            <Link
              href={`/${locale}/worship/pray`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.12em',
                color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
                textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
              }}
            >{t("worshipFortunePage_text_77566")}</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
