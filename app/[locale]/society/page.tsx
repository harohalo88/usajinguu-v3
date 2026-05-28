'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, MapPin, Phone, Printer } from 'lucide-react';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_JIGYOU = '/images/image.png';
const IMG_REISAI = '/images/image-1.png';
const IMG_HERO    = 'https://images.unsplash.com/photo-1758470476171-94b444674ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Design tokens ─────────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const VERMIL   = '#e2501f';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

// ── Scroll-reveal ────────────────────────────────────────────────────────────
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
    <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 opacity-50">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,${GOLD}4D,transparent)` }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: GOLD }} />
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,${GOLD}4D,transparent)` }} />
    </div>
  );
}

// ── Section heading with crimson accent bar ───────────────────────────────────
function SectionHead({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="flex items-center gap-5 mb-10">
      <div className="w-[3px] shrink-0 self-stretch" style={{ background: CRIMSON, minHeight: 28 }} />
      <div>
        <p className="font-sans tracking-[0.4em] uppercase mb-1" style={{ fontSize: '0.5rem', color: GOLD }}>{en}</p>
        <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>{ja}</h3>
      </div>
      <div className="h-px flex-1 ml-4" style={{ background: 'rgba(162,122,40,0.15)' }} />
    </div>
  );
}

// ── Bullet item ───────────────────────────────────────────────────────────────
function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-[0.55em] w-[5px] h-[5px] shrink-0 rotate-45"
        style={{ background: GOLD, opacity: 0.7 }}
      />
      <span
        className="font-sans text-[0.88rem] leading-[2.1] tracking-wide"
        style={{ color: TEXT_MID }}
      >
        {children}
      </span>
    </li>
  );
}

// ── Numbered benefit item ─────────────────────────────────────────────────────
function BenefitItem({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 py-4" style={{ borderBottom: '1px solid rgba(162,122,40,0.1)' }}>
      <span
        className="shrink-0 flex items-center justify-center w-7 h-7 mt-0.5 font-serif"
        style={{
          border: `1px solid rgba(162,122,40,0.35)`,
          color: GOLD,
          fontSize: '0.72rem',
          letterSpacing: '0.05em',
        }}
      >
        {num}
      </span>
      <p
        className="font-sans text-[0.88rem] leading-[2.1] tracking-wide"
        style={{ color: TEXT_MID }}
      >
        {children}
      </p>
    </li>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function SocietyPage() {
  const locale = useLocale();

  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>

      {/* ▌HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HERO}
          alt="八幡講崇敬会"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,3,3,0.48) 0%, rgba(10,3,3,0.68) 100%)',
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
            >
              ホーム
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              八幡講崇敬会
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{
              fontFamily: 'var(--font-sans)', color: '#c49a3a',
              fontSize: '0.6rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', marginBottom: '10px',
            }}>
              Usa Jingu Hachiman-ko · Fellowship of Faith
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>
              八幡講崇敬会
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: '#a27a28', opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ▌INTRO / ご入会の御案内 ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">

          {/* ── Left: vertical heading ── */}
          <FadeIn className="shrink-0">
            <div className="flex flex-row items-stretch gap-3">
              <span
                className="font-sans uppercase shrink-0"
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: '0.48rem',
                  letterSpacing: '0.55em',
                  color: GOLD,
                  opacity: 0.75,
                  alignSelf: 'flex-start',
                  paddingTop: '2px',
                }}
              >
                HACHIMAN-KO
              </span>
              <div
                className="w-px shrink-0"
                style={{ background: VERMIL, alignSelf: 'stretch', minHeight: 220 }}
              />
              <h2
                className="font-serif shrink-0"
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  letterSpacing: '0.55em',
                  lineHeight: 1.05,
                  color: TEXT,
                  textShadow: `1px 1px 0 ${IVORY}, 2px 2px 0 rgba(162,122,40,0.06)`,
                }}
              >
                ご入会の御案内
              </h2>
            </div>
          </FadeIn>

          {/* ── Right: body text ── */}
          <FadeIn delay={0.2} className="flex-1 min-w-0">
            <p
              className="font-sans text-[0.9rem] leading-[2.2] tracking-wide mb-6"
              style={{ color: TEXT_MID }}
            >
              宇佐神宮は、全国津々浦々に四万社鎮座する八幡様の総本宮で、国家鎮護の社、厄除開運の神として篤い崇敬を受けてきました。また、皇室の御崇敬は特に篤く、古くより伊勢の神宮に次ぐ宗廟と称えられ、勅祭社に列せられております。
            </p>
            <p
              className="font-sans text-[0.9rem] leading-[2.2] tracking-wide mb-6"
              style={{ color: TEXT_MID }}
            >
              当神宮八幡講崇敬会は、御鎮座以来、守り受け継がれて参りました八幡様の信仰・歴史・伝統、また鎮守の杜や貴重な文化財を後世に伝えるため、様々な事業を進めながら、大神様の御加護のもと、皆様が八幡様との深い御神縁を益々強く結ばれ、日々健やかにお過ごし頂けるよう活動しております。
            </p>
            <p
              className="font-sans text-[0.9rem] leading-[2.2] tracking-wide"
              style={{ color: TEXT_MID }}
            >
              つきましては、本会の趣旨にご賛同頂ります多くの皆様方に、是非ともご入会頂きますようご案内申し上げます。
            </p>
          </FadeIn>

        </div>
      </section>

      <DiamondRule />

      {/* ▌主な事業内容 ＋ 主な特典（統合セクション） ──────────────────── */}
      <section className="py-20 md:py-28" style={{ background: `${STONE}88` }}>
        <div className="max-w-5xl mx-auto px-6">

          {/* Shared section label */}
          <FadeIn>
            <div className="flex items-center gap-5 mb-12">
              <div className="w-[3px] shrink-0" style={{ background: CRIMSON, height: 28 }} />
              <div>
                <p className="font-sans tracking-[0.4em] uppercase mb-1" style={{ fontSize: '0.5rem', color: GOLD }}>
                  Activities &amp; Benefits
                </p>
                <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>
                  主な事業内容と特典
                </h3>
              </div>
              <div className="h-px flex-1 ml-4" style={{ background: 'rgba(162,122,40,0.15)' }} />
            </div>
          </FadeIn>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x" style={{ borderColor: 'rgba(162,122,40,0.15)' }}>

            {/* ── 左列: 主な事業内容 ── */}
            <FadeIn delay={0.08} className="md:pr-10 pb-12 md:pb-0">
              {/* Sub-heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans tracking-[0.35em] uppercase" style={{ fontSize: '0.48rem', color: GOLD }}>
                  Main Activities
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.2)' }} />
              </div>
              <p className="font-serif tracking-[0.25em] mb-6" style={{ fontSize: '1rem', color: TEXT }}>
                主な事業内容
              </p>

              {/* Image */}
              <div
                className="overflow-hidden group mb-7"
                style={{
                  border: '1px solid rgba(162,122,40,0.2)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                }}
              >
                <img
                  src={IMG_JIGYOU}
                  alt="宇佐神宮社殿"
                  className="w-full transition-transform duration-1000 group-hover:scale-[1.03]"
                  style={{ display: 'block', height: 'auto' }}
                />
              </div>

              {/* Bullet list */}
              <ul className="space-y-4">
                <BulletItem>御神徳宣揚のための祭典行事等への奉賛</BulletItem>
                <BulletItem>御本殿以下境内地の管理、保全整備事業</BulletItem>
                <BulletItem>神社史等の出版事業</BulletItem>
                <BulletItem>その他宇佐神宮発展のために必要な事業</BulletItem>
              </ul>
            </FadeIn>

            {/* ── 右列: 主な特典 ── */}
            <FadeIn delay={0.18} className="md:pl-10 pt-12 md:pt-0">
              {/* Sub-heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-sans tracking-[0.35em] uppercase" style={{ fontSize: '0.48rem', color: GOLD }}>
                  Member Benefits
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.2)' }} />
              </div>
              <p className="font-serif tracking-[0.25em] mb-6" style={{ fontSize: '1rem', color: TEXT }}>
                主な特典
              </p>

              {/* Image + caption */}
              <div className="mb-7">
                <div
                  className="overflow-hidden group"
                  style={{
                    border: '1px solid rgba(162,122,40,0.2)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                  }}
                >
                  <img
                    src={IMG_REISAI}
                    alt="例祭の様子"
                    className="w-full transition-transform duration-1000 group-hover:scale-[1.03]"
                    style={{ display: 'block', height: 'auto' }}
                  />
                </div>
                <div className="mt-2.5 flex items-start gap-2">
                  <div className="w-[2px] h-4 mt-0.5 shrink-0" style={{ background: CRIMSON }} />
                  <div>
                    <p className="font-sans tracking-[0.2em]" style={{ fontSize: '0.7rem', color: TEXT }}>例祭の様子</p>
                    <p className="font-sans tracking-[0.15em] mt-0.5" style={{ fontSize: '0.65rem', color: TEXT_MUT }}>
                      八幡講崇敬会員を始め、多くの方が御参列されます。
                    </p>
                  </div>
                </div>
              </div>

              {/* Numbered benefits */}
              <ul className="divide-y" style={{ borderTop: '1px solid rgba(162,122,40,0.1)' }}>
                <BenefitItem num={1}>
                  １０年に１度の臨時奉幣祭（勅祭）には、奉賛金２０万円以上（分納可）の八幡講崇敬会員を御案内します。
                </BenefitItem>
                <BenefitItem num={2}>
                  毎年４月１日斎行の講社大祭に御案内します。
                </BenefitItem>
                <BenefitItem num={3}>
                  毎月１５日の八幡講月次祭に参列いただけます。
                </BenefitItem>
                <BenefitItem num={4}>
                  例祭をはじめ夏越大祓や大祓・（夏越・年越）等の各種行事に御案内します。
                </BenefitItem>
                <BenefitItem num={5}>
                  毎月１日、１５日の祭典、また毎朝の御日供祭で講員各位の弥栄と家運隆昌を祈念申し上げます。
                </BenefitItem>
              </ul>
            </FadeIn>

          </div>
        </div>
      </section>

      <DiamondRule />

      {/* ▌お申し込みの方法 ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <SectionHead en="How to Apply" ja="お申し込みの方法" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p
              className="font-sans text-[0.88rem] leading-[2.2] tracking-wide mb-10"
              style={{ color: TEXT_MID }}
            >
              ご入会ご希望の方は、下記までお問い合わせください。
            </p>

            {/* Contact box */}
            <div
              className="p-8 md:p-10"
              style={{ background: '#1e1810', border: '1px solid rgba(162,122,40,0.25)' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', color: '#c49a3a', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Contact
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', letterSpacing: '0.22em', fontWeight: 400, marginBottom: '20px', fontSize: '1rem' }}>
                【お問い合わせ】
              </h3>
              <div style={{ borderTop: '1px solid rgba(162,122,40,0.18)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: '0.95rem', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '14px' }}>
                  宇佐神宮八幡講崇敬会
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={14} color="#c49a3a" strokeWidth={1.5} style={{ marginTop: '3px', flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.06em', lineHeight: 1.8 }}>
                      〒872-0102 大分県宇佐市南宇佐2859番地
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} color="#c49a3a" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                    <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.08em' }}>
                      TEL：0978-37-0001
                      <span style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.55)', fontSize: '0.72rem', letterSpacing: '0.1em', marginLeft: '8px' }}>
                        （八幡事務局）
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
