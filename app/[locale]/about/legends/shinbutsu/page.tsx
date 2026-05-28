'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_SCROLL = '/images/shinbutsu02.jpg';
const IMG_RUINS  = '/images/shinbutsu05.jpg';

// ── Hero (Unsplash) ───────────────────────────────────────────────────────────
const IMG_HERO = 'https://images.unsplash.com/photo-1772183095167-ea058f26667d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Design tokens ─────────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const VERMIL   = '#e2501f';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

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
    <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 opacity-50">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: GOLD }} />
      </div>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
    </div>
  );
}

// ── Image with caption (no hover) ─────────────────────────────────────────────
function CaptionedImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ border: '1px solid rgba(162,122,40,0.22)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full"
          style={{ display: 'block', height: 'auto' }}
        />
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <div className="w-[2px] h-4 shrink-0" style={{ background: CRIMSON }} />
        <span className="font-sans tracking-[0.22em]" style={{ fontSize: '0.62rem', color: TEXT_MUT }}>
          {caption}
        </span>
      </div>
    </div>
  );
}

// ── Legend card (no hover highlight) ─────────────────────────────────────────
function LegendCard({ href, label, sub }: { href: string; label: string; sub: string }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}${href}`}
      className="flex items-center justify-between px-6 py-5 border"
      style={{ borderColor: 'rgba(162,122,40,0.2)', background: IVORY }}
    >
      <div>
        <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase mb-1" style={{ color: GOLD }}>{sub}</p>
        <p className="font-serif text-[0.88rem] tracking-[0.14em]" style={{ color: TEXT }}>{label}</p>
      </div>
      <ChevronRight size={15} className="shrink-0" style={{ color: GOLD }} />
    </Link>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function ShinbutsuPage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>

      {/* ▌HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HERO}
          alt="神仏習合の歴史"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
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
              宇佐神宮について
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              神仏習合の歴史
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
              Shinbutsu-Shūgō · Syncretism
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300,
              letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>
              神仏習合の歴史
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: '#a27a28', opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ▌SECTION 1 — 隼人の反乱と放生会 ───────────────────────────────── */}
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
                HAYATO REBELLION
              </span>
              <div
                className="w-px shrink-0"
                style={{ background: VERMIL, alignSelf: 'stretch', minHeight: 260 }}
              />
              <h2
                className="font-serif shrink-0"
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                  letterSpacing: '0.55em',
                  lineHeight: 1.05,
                  color: TEXT,
                  textShadow: `1px 1px 0 ${IVORY}, 2px 2px 0 rgba(162,122,40,0.06)`,
                }}
              >
                隼人の乱と放生会
              </h2>
            </div>
          </FadeIn>

          {/* ── Right: text + scroll image + continuation ── */}
          <FadeIn delay={0.2} className="flex-1 min-w-0">

            {/* Text + scroll image side by side */}
            <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
              <p
                className="font-sans text-[0.9rem] leading-[2.15] tracking-wide sm:w-[55%]"
                style={{ color: TEXT_MID }}
              >
                奈良時代のわが国は、中国の唐(とう)にならって、律令国家の建設を進めていました。しかし、東北の蝦夷(えみし)と南九州の隼人(はやと)はその中に組み込まれることに強く抵抗しました。『八幡宇佐宮御託宣集』（以後『託宣集』という）には、８世紀のはじめころに起きた隼人の反乱を制圧するため、八幡神を神輿（みこし）に乗せ、宇佐の人々も参加されたことが記しています。
              </p>

              <div className="sm:w-[45%]">
                <CaptionedImage
                  src={IMG_SCROLL}
                  alt="八幡宇佐宮御託宣集"
                  caption="八幡宇佐宮御託宣集"
                />
              </div>
            </div>

            <p
              className="font-sans text-[0.9rem] leading-[2.15] tracking-wide"
              style={{ color: TEXT_MID }}
            >
              その歴史は、宇佐神宮の重要な祭礼(さいれい)である「放生会(ほうじょうえ)」として今日に伝えられており、隼人との戦いで殺生の罪を悔(く)いた八幡神が、仏教に救いを求めたことに起因しています。これを契機に、宇佐での神と仏が習合した先進的な思想が成立しました。
            </p>

          </FadeIn>
        </div>
      </section>

      <DiamondRule />

      {/* ▌SECTION 2 — 仏教と銅と新羅神 ─────────────────────────────────── */}
      <section className="py-20 md:py-26" style={{ background: 'rgba(242,236,228,0.53)' }}>
        <div className="max-w-5xl mx-auto px-6">

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
                  COPPER & SILLA
                </span>
                <div
                  className="w-px shrink-0"
                  style={{ background: GOLD, opacity: 0.6, alignSelf: 'stretch', minHeight: 200 }}
                />
                <h2
                  className="font-serif shrink-0"
                  style={{
                    writingMode: 'vertical-rl',
                    fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                    letterSpacing: '0.55em',
                    lineHeight: 1.05,
                    color: TEXT,
                    textShadow: `1px 1px 0 rgba(242,236,228,0.9), 2px 2px 0 rgba(162,122,40,0.06)`,
                  }}
                >
                  仏教と銅と新羅神
                </h2>
              </div>
            </FadeIn>

            {/* ── Right: long paragraph ── */}
            <FadeIn delay={0.2} className="flex-1 min-w-0">
              <p
                className="font-sans text-[0.88rem] leading-[2.3] tracking-wide"
                style={{ color: TEXT_MID }}
              >
                宇佐での神仏習合を考えるうえで注目されるのが、７世紀の末ころに建立されていた古代寺院です。『託宣集』には、隼人征討には八幡神とともに、虚空蔵寺と法鏡寺の関係者も加わっていたことが記されています。また、放生会では、下毛郡の古要(こひょう)社（大分県中津市）と上毛郡の古表社（福岡県吉富町）が傀儡子舞（くぐつのまい）を奉納し、さらに田川郡からは、香春岳（かわらだけ）（福岡県香春町）の銅で作った鏡が奉納されていました。８世紀の『豊前風土記』には、「むかし新羅の神が渡ってきて、この河原に住んだので鹿春郷(かわらのさと)と名づけた」ことなどが記されています。つまり、田川郡には銅を産する香春岳があったので、新羅国(しらぎのくに)の神を祀る技術集団が住んでいたことが分かります。八幡神の誕生伝説に見える、「辛（韓）国の宇豆高島」や「鍛冶翁」との関係で注目されています。
              </p>
            </FadeIn>

          </div>
        </div>
      </section>

      <DiamondRule />

      {/* ▌SECTION 3 — 弥勒寺 ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">

        <FadeIn>
          <p className="font-sans tracking-[0.5em] uppercase mb-10" style={{ fontSize: '0.56rem', color: GOLD }}>
            MIROKU-JI TEMPLE · 弥勒寺の創建
          </p>
        </FadeIn>

        {/* 2-column: text left (wider), image right (sticky) */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-start">

          {/* ── Left: text narrative ── */}
          <div>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-[3px] h-7" style={{ background: CRIMSON }} />
                <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>
                  弥勒寺
                </h3>
              </div>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-8" style={{ color: TEXT_MID }}>
                宇佐宮関係の史料によると、神亀２（７２５）年に宇佐宮を現在の小倉山に移した際、東方の日足の地に弥勒禅院を建立しています。そして、天平９（７３７）年には宇佐宮社殿の西に移し、天平１０（７３８）年に金堂・講堂を建立しました。この事業には聖武天皇の大きな援助がありました。初代の別当（長官）には虚空蔵寺の法蓮がなったとも伝えています。以後、弥勒寺は宇佐宮とともに、神仏習合の輝かしい歴史を続けることになります。
              </p>
            </FadeIn>

            {/* Thin inline rule */}
            <FadeIn delay={0.15}>
              <div className="flex items-center gap-3 my-8 opacity-40">
                <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.4)' }} />
                <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: GOLD }} />
                <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.4)' }} />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
                現在の神宮庁や参集殿などがある正参道の西側は、弥勒寺の境内でした。呉橋を渡った西参道の南側には、寺跡の遺構が保存されています。発掘調査によって、金堂の前面に東塔と西塔を並べた、奈良の薬師寺と同じ伽藍配置であることが確認されています。出土する瓦（かわら）の文様は、宇佐の伝統的なもの以外に、大宰府系のものもあり、国の援助で造営されたことを示しています。
              </p>
            </FadeIn>
          </div>

          {/* ── Right: ruins image (sticky) ── */}
          <FadeIn delay={0.25} className="md:sticky md:top-24">
            <CaptionedImage
              src={IMG_RUINS}
              alt="神宮寺・弥勒寺跡"
              caption="神宮寺・弥勒寺跡"
            />
          </FadeIn>

        </div>
      </section>

      <DiamondRule />

      {/* ▌OTHER LEGENDS ─────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28 max-w-5xl mx-auto px-6"
        style={{ borderTop: '1px solid rgba(162,122,40,0.09)' }}
      >
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-6" style={{ background: GOLD }} />
            <h3 className="font-serif tracking-[0.35em]" style={{ fontSize: '1.1rem', color: TEXT }}>
              その他の伝承
            </h3>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LegendCard href="/about/legends/goreisui" label="御霊水"          sub="Sacred Spring" />
            <LegendCard href="/about/legends/todaiji"  label="東大寺の大仏建立"  sub="Tōdai-ji Temple" />
            <LegendCard href="/about/legends/wake"     label="和気清麻呂とご神託" sub="Wake no Kiyomaro" />
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
