'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Printer, ChevronRight } from 'lucide-react';
import { C } from '@/components/ShrineUI';

// ── Images ────────────────────────────────────────────────────────────────────
const gishikidenBrideGroom   = '/images/b08e83237fa8de1d59a7c19b8bdc8abbbc407429.png';
const gishikidenArchitecture = '/images/f103491a920982fc118993d087b583bf9c26af58.png';

const HERO_IMG     = 'https://usajinguu-w.jp/annai/images/topimg1.jpg';
const BRIDE_IMG    = 'https://usajinguu-w.jp/annai/images/topimg2.jpg';
const GARDEN_IMG   = gishikidenArchitecture;
const INTERIOR_IMG = gishikidenBrideGroom;
const PRIEST_IMG   = 'https://images.unsplash.com/photo-1768476950970-13827e17fe8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900';
const COUPLE_IMG   = 'https://usajinguu-w.jp/annai/images/topimg3.jpg';

const nagare1 = '/images/f9eb0b62b5aa1a952df88f6042002f2a5f6424f6.png';
const nagare2 = '/images/e007d03da21c972dc9928d49382ce1db8e7555bc.png';
const nagare3 = '/images/e17266754ac1b43c6021cd8b2c60a85abeb61136.png';
const nagare4 = '/images/56eba04683cc499d00a325fbc51599835651900a.png';

// ── Scroll fade ───────────────────────────────────────────────────────────────
interface FadeInProps {
  children:   React.ReactNode;
  delay?:     number;
  className?: string;
  dir?:       'up' | 'left' | 'right' | 'none';
}
function FadeIn({ children, delay = 0, className = '', dir = 'up' }: FadeInProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const yInit  = dir === 'up' ? 28 : 0;
  const xInit  = dir === 'left' ? -28 : dir === 'right' ? 28 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yInit, x: xInit }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Gold divider ──────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div style={{ width: '40px', height: '1px', backgroundColor: C.borderG }} />
      <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.55, transform: 'rotate(45deg)' }} />
      <div style={{ width: '40px', height: '1px', backgroundColor: C.borderG }} />
    </div>
  );
}

// ── Section heading with vertical accent ────────────────────────────────────
interface SectionTitleProps {
  ja:      string;
  en:      string;
  center?: boolean;
}
function SectionTitle({ ja, en, center = false }: SectionTitleProps) {
  return (
    <div style={{
      textAlign: center ? 'center' : 'left',
      display: 'flex',
      flexDirection: 'column',
      alignItems: center ? 'center' : 'flex-start',
      gap: '4px',
    }}>
      <p style={{
        fontFamily: 'var(--font-sans)', color: C.gold,
        fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase',
      }}>
        {en}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-serif)', color: C.text,
        fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 400,
        letterSpacing: '0.2em',
      }}>
        {ja}
      </h2>
    </div>
  );
}

// ── Info box ─────────────────────────────────────────────────────────────────
function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: C.stone,
      border: `1px solid ${C.borderG}`,
      padding: '24px 28px',
      marginBottom: '20px',
    }}>
      <p style={{
        fontFamily: 'var(--font-serif)', color: C.crimson,
        fontSize: '0.82rem', letterSpacing: '0.2em',
        marginBottom: '10px', fontWeight: 400,
      }}>{title}</p>
      <div style={{
        fontFamily: 'var(--font-sans)', color: C.textMid,
        fontSize: '0.82rem', lineHeight: 2.0,
      }}>{children}</div>
    </div>
  );
}

// ── Image card with overlay label ────────────────────────────────────────────
function FlowCard({ src, label, index }: { src: string; label: string; index: number }) {
  return (
    <FadeIn delay={index * 0.08}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={src}
          alt={label}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(10,3,3,0.7), transparent)',
          padding: '14px 12px 10px',
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)', color: C.goldLt,
            fontSize: '0.62rem', letterSpacing: '0.18em',
          }}>{label}</span>
        </div>
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function WeddingPage() {
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>
      {/* ══ Hero ════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '90vh', maxHeight: '680px', overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt="神前結婚式"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        {/* gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,3,3,0.62) 0%, rgba(10,3,3,0.35) 60%, rgba(10,3,3,0.5) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, rgba(250,248,245,0.92), transparent)' }} />

        {/* Vertical Japanese title – left side */}
        <div style={{
          position: 'absolute', top: '50%', left: '8%',
          transform: 'translateY(-50%)',
          zIndex: 10, paddingTop: '72px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
          >
            {/* Vertical text block */}
            <div className="writing-vertical" style={{
              fontFamily: 'var(--font-serif)',
              color: '#faf8f5',
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '0.3em',
              lineHeight: 1.4,
              textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 4px 32px rgba(0,0,0,0.35)',
            }}>
              神前結婚式
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '6px' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.goldLt,
                fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}>Shinto Wedding</p>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(196,154,58,0.5)', margin: '4px 0' }} />
              <p style={{
                fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.7)',
                fontSize: '0.58rem', letterSpacing: '0.15em',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}>宇佐神宮</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom center scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          style={{
            position: 'absolute', bottom: '52px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.55rem', letterSpacing: '0.25em' }}>SCROLL</span>
          <div style={{ width: '1px', height: '28px', backgroundColor: C.borderG }} />
        </motion.div>
      </section>

      {/* ══ Intro section ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.ivory, padding: '80px 0 64px' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* Left: vertical heading */}
            <FadeIn dir="left" className="flex-shrink-0">
              <div className="writing-vertical" style={{
                fontFamily: 'var(--font-serif)', color: C.crimson,
                fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', fontWeight: 300,
                letterSpacing: '0.3em', lineHeight: 1.6,
                height: '280px',
              }}>
                日本ならでは<br/>の結婚式
              </div>
            </FadeIn>

            {/* Right: intro text */}
            <FadeIn delay={0.15} className="flex-1">
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.textMute,
                fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                marginBottom: '12px',
              }}>Shinto Wedding Ceremony</p>
              <h1 style={{
                fontFamily: 'var(--font-serif)', color: C.text,
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400,
                letterSpacing: '0.2em', marginBottom: '20px',
              }}>神前結婚式</h1>
              <div style={{ width: '28px', height: '2px', backgroundColor: C.vermil, opacity: 0.7, marginBottom: '24px' }} />

              <p style={{
                fontFamily: 'var(--font-sans)', color: C.textMid,
                fontSize: '0.875rem', lineHeight: 2.2,
              }}>
                宇佐神宮の結婚式は、上宮の一角にある祈祷殿で行われます。格式高い本殿の横という特別な場所で、神職による修祓（しゅばつ）に続き伝統の儀式が清らかな空気のなか厳粛に執り行われます。挙式を済ませた後、新郎新婦は神職に先導されて、本殿へ結婚の奉告参拝に向かいます。
              </p>

              <div style={{
                marginTop: '28px',
                backgroundColor: 'rgba(162,122,40,0.06)',
                borderLeft: `3px solid ${C.gold}`,
                padding: '16px 20px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.82rem', lineHeight: 2.0, fontStyle: 'italic',
                }}>
                  八幡大神のご加護のもと、清らかな誓いを立ててください。
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Hero image pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            <FadeIn delay={0.1}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '320px' }}>
                <img src={BRIDE_IMG} alt="花嫁" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,3,3,0.45) 0%, transparent 50%)',
                }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '320px' }}>
                <img src={COUPLE_IMG} alt="新郎新婦" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,3,3,0.45) 0%, transparent 50%)',
                }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 挙式の流れ ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.stone, padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionTitle ja="挙式の流れ" en="Ceremony Flow" />
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {[
              { src: nagare3, label: '参進の儀' },
              { src: nagare1, label: '修祓の儀' },
              { src: nagare4, label: '祝詞奏上' },
              { src: nagare2, label: '三献の儀' },
            ].map((item, i) => (
              <FlowCard key={i} src={item.src} label={item.label} index={i} />
            ))}
          </div>

          {/* Ceremony steps list */}
          <FadeIn delay={0.2}>
            <div style={{
              marginTop: '40px',
              border: `1px solid ${C.borderG}`,
              backgroundColor: C.ivory,
              padding: '28px 32px',
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)', color: C.text,
                fontSize: '0.85rem', letterSpacing: '0.15em',
                marginBottom: '18px', fontWeight: 400,
              }}>神前結婚式　式次第</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {[
                  '参進',
                  '修祓',
                  '祝詞奏上',
                  '夫婦誓いの盃',
                  '指輪交換の儀',
                  '誓詞奏上',
                  '浦安の舞奉奏',
                  '親族固めの盃',
                  '斎主挨拶',
                  '本殿に昇殿',
                  '新郎新婦玉串拝礼',
                  '記念品授与',
                  '本殿より退出',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid rgba(165,0,0,0.12)` }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', color: C.crimson,
                      fontSize: '0.6rem', fontWeight: 500, minWidth: '1.2rem',
                    }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{
                      fontFamily: 'var(--font-sans)', color: C.textMid,
                      fontSize: '0.8rem', lineHeight: 1.8,
                    }}>{step}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <a
                  href="https://usajinguu-w.jp/annai/ceremony.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: '#faf8f5',
                    backgroundColor: C.crimson,
                    padding: '10px 28px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  式次第はこちら（PDF）
                  <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ Full-width image break ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img
          src={GARDEN_IMG}
          alt="宇佐神宮の境内"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,3,3,0.55), rgba(10,3,3,0.1) 60%, rgba(10,3,3,0.1))' }} />

        {/* Vertical quote */}
        <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }}>
          <div className="writing-vertical" style={{
            fontFamily: 'var(--font-serif)',
            color: '#faf8f5',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            lineHeight: 1.6,
            textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)',
          }}>
            清らかな空気のなか<br/>厳粛に執り行われます
          </div>
        </div>
      </div>

      {/* ══ 写真撮影 & 控室 ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.ivory, padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* 写真撮影について */}
            <FadeIn dir="left">
              <SectionTitle ja="写真撮影について" en="Photography" />
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.textMid,
                fontSize: '0.85rem', lineHeight: 2.1, marginTop: '20px',
              }}>
                結婚式をされる方で、写真館やブライダル会社等により撮影を行う場合は、別途、撮影申込用紙を記入していただきます。その折に、写真撮影料として別途10,000円をお納めください。
              </p>
            </FadeIn>

            {/* 控室について */}
            <FadeIn dir="right" delay={0.1}>
              <SectionTitle ja="控室について" en="Waiting Room" />
              <div style={{ marginTop: '20px' }}>
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden', marginBottom: '16px' }}>
                  <img
                    src={INTERIOR_IMG}
                    alt="儀式殿 控室"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,3,3,0.45), transparent)' }} />
                  <span style={{
                    position: 'absolute', bottom: '10px', left: '12px',
                    fontFamily: 'var(--font-serif)', color: C.goldLt,
                    fontSize: '0.6rem', letterSpacing: '0.15em',
                  }}>儀式殿</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.85rem', lineHeight: 2.1,
                }}>
                  挙式に際して、当神宮「儀式殿」を控室として、下記の通りご利用いただけます。ご利用の場合は借用申込書にご記入ください。
                </p>
                <div style={{
                  marginTop: '14px',
                  backgroundColor: C.stone,
                  borderLeft: `3px solid ${C.gold}`,
                  padding: '14px 18px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-serif)', color: C.gold,
                    fontSize: '0.75rem', letterSpacing: '0.12em', marginBottom: '6px',
                  }}>【控室料】</p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.82rem', lineHeight: 1.9,
                  }}>
                    10,000円（利用時間 8:00～16:00）<br/>
                    <span style={{ fontSize: '0.75rem', color: C.textMute }}>
                      ※午前のみ・午後のみ等、数時間ご利用の場合でも、上記の控室料となります。<br/>
                      ※行事等により、ご希望日に控室をお貸しできない場合もございます。
                    </span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 挙式料 & お申込み ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.stoneDk, padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionTitle ja="お申込みについて" en="Application & Reservation" center />
          </FadeIn>
          <GoldDivider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Column: 挙式料 & 振込先 */}
            <div className="flex flex-col gap-5">
              {/* 挙式料 */}
              <FadeIn dir="left" delay={0.1}>
                <div style={{
                  backgroundColor: C.ivory,
                  border: `1px solid ${C.borderG}`,
                  padding: '32px 28px',
                  position: 'relative',
                }}>
                  {/* corner accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '3px', height: '48px', backgroundColor: C.crimson,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-serif)', color: C.crimson,
                    fontSize: '0.72rem', letterSpacing: '0.25em', marginBottom: '16px',
                  }}>挙式料について</p>

                  <div style={{ marginBottom: '18px' }}>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.gold,
                      fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: '8px',
                    }}>【初穂料】</p>
                    <p style={{
                      fontFamily: 'var(--font-serif)', color: C.crimson,
                      fontSize: '2.0rem', letterSpacing: '0.1em', fontWeight: 500,
                      lineHeight: 1.2
                    }}>100,000 <span style={{ fontSize: '1.2rem' }}>円</span></p>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.crimson,
                      fontSize: '0.92rem', letterSpacing: '0.05em', marginTop: '6px',
                      opacity: 0.9
                    }}>（浦安の舞 有り）</p>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMute,
                    fontSize: '0.75rem', lineHeight: 1.9,
                  }}>
                    ※仮申込みのお手続き後, 30日以内にお納めください。
                  </p>
                </div>
              </FadeIn>

              {/* 振込情報 */}
              <FadeIn dir="left" delay={0.15}>
                <div style={{
                  backgroundColor: C.ivory,
                  border: `1px solid ${C.borderG}`,
                  padding: '22px 28px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-serif)', color: C.textMute,
                    fontSize: '0.72rem', letterSpacing: '0.2em', marginBottom: '10px',
                  }}>振込先</p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.8rem', lineHeight: 2.0,
                  }}>
                    ゆうちょ口座送金：01750-0-0028193<br />
                    別の金融機関から振込：ゆうちょ銀行 一七九（イチナナキユウ）支店　当座　0028193
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: 予約の流れ */}
            <FadeIn dir="right" delay={0.15}>
              <div style={{
                backgroundColor: C.ivory,
                border: `1px solid ${C.borderG}`,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
              }}>
                {/* お申込みについて */}
                <div>
                  <div style={{ padding: '0 8px' }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMute,
                      fontSize: '0.8rem', lineHeight: 1.9, marginBottom: '8px',
                    }}>
                      挙式の候補日が決まりましたら、お電話にてお問い合わせください。
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMute,
                      fontSize: '0.8rem', lineHeight: 1.9, marginBottom: '8px',
                    }}>
                      その日程での挙式が可能か確認いたします。
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMute,
                      fontSize: '0.8rem', lineHeight: 1.9,
                    }}>
                      挙式時間はご相談に応じます。
                    </p>
                  </div>
                </div>

                {/* 予約のお手続き */}
                <div>
                  <div style={{
                    backgroundColor: '#Fdf9e6',
                    borderTop: `1px solid ${C.borderG}`,
                    borderBottom: `1px solid ${C.borderG}`,
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ width: '3px', height: '14px', backgroundColor: C.gold }}></div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)', color: C.text,
                      fontSize: '0.9rem', letterSpacing: '0.1em', margin: 0
                    }}>
                      予約のお手続き
                    </h3>
                  </div>
                  <div style={{ padding: '0 8px' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{
                        fontFamily: 'var(--font-sans)', color: C.text,
                        fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px',
                      }}>
                        【仮申し込み】
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-sans)', color: C.textMute,
                        fontSize: '0.8rem', lineHeight: 1.9, marginBottom: '8px',
                      }}>
                        ご希望の日時と空き状況が一致しましたら、ご予約･お申し込みに移ります。
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-sans)', color: C.textMute,
                        fontSize: '0.8rem', lineHeight: 1.9,
                      }}>
                        宇佐神宮結婚式申込用紙に、日時・氏名・連絡先等のご記入をいただき、1ヶ月以内にご返送いただきますと仮申込みが完了となります。 　※用紙は、ご来宮いただくかお電話にてお取り寄せください。
                      </p>
                    </div>

                    <div>
                      <p style={{
                        fontFamily: 'var(--font-sans)', color: C.text,
                        fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px',
                      }}>
                        【本申し込み】
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-sans)', color: C.textMute,
                        fontSize: '0.8rem', lineHeight: 1.9,
                      }}>
                        仮申込みのお手続き後、30日以内に申込金（結婚式初穂料）をお納めいただき、本申込みとなります。ご来宮のうえ直接お納めいただくか、申込書受領後にお渡しする所定の郵便局の振込用紙にてお振り込みください。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ Priest image break ══════════════════════════════════════════════ */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src={PRIEST_IMG}
          alt="神職"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,3,3,0.55), rgba(10,3,3,0.1) 60%)' }} />

        <div style={{
          position: 'absolute', right: '8%', top: '50%',
          transform: 'translateY(-50%)', zIndex: 5,
        }}>
          <div className="writing-vertical" style={{
            fontFamily: 'var(--font-serif)',
            color: '#faf8f5',
            fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            fontWeight: 300,
            letterSpacing: '0.35em',
            lineHeight: 1.6,
            textShadow: '0 2px 16px rgba(0,0,0,0.6), 0 4px 40px rgba(0,0,0,0.4)',
          }}>
            八幡大神のご加護のもと<br/>清らかな誓いを
          </div>
        </div>
      </div>

      {/* ══ その他留意事項 ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.ivory, padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionTitle ja="その他留意事項" en="Important Notes" />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* キャンセル料 */}
            <FadeIn delay={0.05}>
              <InfoBox title="【キャンセル料について】">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      ['3ヶ月前以内', '20％'],
                      ['1ヶ月前以内', '50％'],
                      ['1週間前以内', '80％'],
                      ['6日以内・当日', '100％'],
                    ].map(([period, fee], i) => (
                      <tr key={i}>
                        <td style={{
                          fontFamily: 'var(--font-sans)', color: C.textMid,
                          fontSize: '0.92rem', lineHeight: 2.2,
                          paddingRight: '16px', borderBottom: `1px solid rgba(165,0,0,0.12)`,
                          paddingBottom: '8px', paddingTop: '8px',
                        }}>{period}</td>
                        <td style={{
                          fontFamily: 'var(--font-serif)', color: C.crimson,
                          fontSize: '1.25rem', fontWeight: 600,
                          borderBottom: `1px solid rgba(165,0,0,0.12)`,
                          paddingBottom: '8px', paddingTop: '8px',
                          textAlign: 'right'
                        }}>{fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </InfoBox>
            </FadeIn>

            {/* 定員・時間 */}
            <FadeIn delay={0.1}>
              <InfoBox title="【当日の注意事項】">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    <><strong>結婚式場の定員は、<u>ご両家各15名ずつ（合計30名）</u></strong>とさせていただきます。</>,
                    <><strong>結婚式当日は30分前までに上宮祈祷殿へお越しください。</strong>結婚式式次第また式典中の作法などのご案内をさせていただきます。</>,
                    '式典中に指輪の交換を希望される新郎新婦は、祈祷殿に指輪をお持ちください。',
                    '誓詞は新郎にご奉読いただきますので、当日までにご確認ください。',
                    '衣装業者及び披露宴会場は、ご自身でご手配いただくか、挙式プランをご参照ください。',
                    'ご希望の方には車椅子をご用意いたします。事前にご連絡ください。',
                  ].map((note, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ marginBottom: '8px' }}>
                      <span style={{ color: C.gold, fontSize: '0.7rem', marginTop: '0.25rem', flexShrink: 0 }}>・</span>
                      <span style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.8rem', lineHeight: 1.9 }}>{note}</span>
                    </li>
                  ))}
                </ul>
              </InfoBox>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ お問い合わせ ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.stone, padding: '72px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionTitle ja="お問い合わせ" en="Contact" center />
          </FadeIn>
          <GoldDivider />

          <FadeIn delay={0.1}>
            <div
              className="p-8 md:p-10"
              style={{ background: '#1e1810', border: '1px solid rgba(162,122,40,0.25)', maxWidth: '640px', margin: '0 auto' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', color: C.goldLt, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contact
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', letterSpacing: '0.22em', fontWeight: 400, marginBottom: '20px', fontSize: '1rem' }}>
                【お問い合わせ】
              </h3>
              <div style={{ borderTop: '1px solid rgba(162,122,40,0.18)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.95rem', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '14px' }}>
                  宇佐神宮庁　結婚式担当者
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
        </div>
      </section>

      {/* ══ 挙式プランのご案内 ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.ivory, padding: '72px 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <SectionTitle ja="挙式プランのご案内" en="Wedding Plans" center />
          </FadeIn>

          {/* Full-width image at bottom */}
          <FadeIn delay={0.15}>
            <div style={{
              marginTop: '48px', position: 'relative',
              height: '320px', overflow: 'hidden',
            }}>
              <img
                src={HERO_IMG}
                alt="宇佐神宮"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(250,248,245,0.85) 0%, rgba(10,3,3,0.2) 60%, rgba(10,3,3,0.35) 100%)' }} />

              {/* Centered kanji */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                <div className="text-center">
                  <p style={{
                    fontFamily: 'var(--font-serif)', color: '#faf8f5',
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 300,
                    letterSpacing: '0.4em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.55), 0 4px 40px rgba(0,0,0,0.35)',
                  }}>
                    縁結びの聖地にて
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: 'rgba(196,154,58,0.9)',
                    fontSize: '0.62rem', letterSpacing: '0.3em', marginTop: '10px',
                    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  }}>A sacred place for new beginnings</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ Page nav ════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.stoneDk, padding: '40px 0', borderTop: `1px solid ${C.borderG}` }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: 'var(--font-sans)', color: C.textMute,
              fontSize: '0.75rem', letterSpacing: '0.12em', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ← ホームへ戻る
          </Link>
          <Link
            href={`/${locale}/contact`}
            style={{
              fontFamily: 'var(--font-sans)', color: '#faf8f5',
              backgroundColor: C.crimson,
              padding: '9px 22px',
              fontSize: '0.72rem', letterSpacing: '0.15em', textDecoration: 'none',
            }}
          >
            お問い合わせ
          </Link>
          <Link
            href={`/${locale}/worship/pray`}
            style={{
              fontFamily: 'var(--font-sans)', color: C.textMute,
              fontSize: '0.75rem', letterSpacing: '0.12em', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ご祈願について →
          </Link>
        </div>
      </div>
    </div>
  );
}
