'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Assets ─────────────────────────────────────────────────────────────────
const IMG_PAINTING = '/images/8dc1625149675992d075b7d40836d72ea813790e.png';
const heroImage = '/images/e81c6decfbb240a94172c794c450041546333d9a.png';
const IMG_TORII = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_scale,w_960/f_auto/q_auto/v1779961443/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E5%BE%A1%E9%9C%8A%E6%B0%B4_img03_eo0i9m.jpg';

// ── Design tokens ───────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const VERMIL   = '#e2501f';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

// ── Scroll-reveal wrapper ────────────────────────────────────────────────────
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

// ── Diamond divider ──────────────────────────────────────────────────────────
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

// ── Corner-accented quote block ──────────────────────────────────────────────
function QuoteBlock({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <div className="relative py-10 px-8 md:px-14 border border-[#A27A28]/20" style={{ background: IVORY }}>
      <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#A27A28]/40" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#A27A28]/40" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#A27A28]/40" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#A27A28]/40" />
      <p className="font-serif text-[0.93rem] leading-[2.6] tracking-wider text-center" style={{ color: '#444' }}>
        {children}
      </p>
      {attribution && (
        <p className="mt-6 text-right font-sans text-[0.68rem] tracking-[0.22em]" style={{ color: GOLD }}>
          — {attribution}
        </p>
      )}
    </div>
  );
}

// ── Stone-background poem box ────────────────────────────────────────────────
function PoemBox({ poem, attribution }: { poem: string; attribution: string }) {
  return (
    <div className="py-9 px-10 md:px-20 text-center" style={{ background: STONE }}>
      <p className="font-serif text-[0.93rem] leading-[2.6] tracking-wider" style={{ color: TEXT }}>
        {poem}
      </p>
      <p className="mt-5 font-sans text-[0.68rem] tracking-[0.3em]" style={{ color: TEXT_MUT }}>
        {attribution}
      </p>
    </div>
  );
}

// ── Minimal horizontal legend card ──────────────────────────────────────────
function LegendCard({ href, label, sub }: { href: string; label: string; sub: string }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}${href}`}
      className="group flex items-center justify-between px-6 py-5 border transition-all duration-300 hover:border-[#A27A28]/50 hover:bg-white"
      style={{ borderColor: `${GOLD}33`, background: IVORY }}
    >
      <div>
        <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase mb-1" style={{ color: GOLD }}>{sub}</p>
        <p className="font-serif text-[0.88rem] tracking-[0.14em]" style={{ color: TEXT }}>{label}</p>
      </div>
      <ChevronRight
        size={15}
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: GOLD }}
      />
    </Link>
  );
}

// ── Header image ────────────────────────────────────────────────────────────
const IMG_HEADER = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_fill,g_auto,w_1600,h_450/f_auto/q_auto/v1779961437/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E5%BE%A1%E9%9C%8A%E6%B0%B4_img01_x9hemc.jpg';

// ════════════════════════════════════════════════════════════════════════════
export default function GoreisuiPage() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>

      {/* ▌INNER PAGE HEADER — same pattern as HistoryPage / DeityPage ──── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HEADER}
          alt={t('aboutLegendsGoreisui_text_1')}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,3,3,0.48) 0%, rgba(10,3,3,0.65) 100%)',
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
            >{t("aboutLegendsGoreisuiPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutLegendsGoreisuiPage_text_44003")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutLegendsGoreisuiPage_text_71631")}</span>
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
              Sacred Spring · First Manifestation
            </p>
            <h1 className="font-title-main" style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300,
              letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>{t("aboutLegendsGoreisuiPage_text_71631")}</h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: '#a27a28', opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ▌INTRO ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">

          {/* ── Left: vertical heading column ── */}
          <FadeIn className="shrink-0">
            <div className="flex flex-row items-stretch gap-3">

              {/* 1. Tiny "SACRED ORIGIN" label — far left, reads top→bottom */}
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
                SACRED ORIGIN
              </span>

              {/* 2. Solid vermilion bar — full height of the heading */}
              <div
                className="w-px shrink-0"
                style={{ background: VERMIL, alignSelf: 'stretch', minHeight: 240 }}
              />

              {/* 3. Large vertical heading */}
              <h2
                className="font-serif shrink-0"
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
                  letterSpacing: '0.55em',
                  lineHeight: 1.05,
                  color: TEXT,
                  textShadow: `1px 1px 0 ${IVORY}, 2px 2px 0 rgba(162,122,40,0.06)`,
                }}
              >{t("aboutLegendsGoreisuiPage_text_65453")}</h2>

            </div>
          </FadeIn>

          {/* ── Right: body text + painting ── */}
          <FadeIn delay={0.2} className="flex-1 min-w-0">
            <p
              className="font-sans text-[0.9rem] leading-[2.15] tracking-wide mb-8"
              style={{ color: TEXT_MID }}
            >
              亀山の麓、菱形池のほとり、三つの霊泉からなる御霊水は、上宮御本殿の真裏（北側）に位置し、往古、常に清水が湧き出で絶えることのない霊泉として知られています。
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <p
                className="font-sans text-[0.9rem] leading-[2.15] tracking-wide sm:w-[40%]"
                style={{ color: TEXT_MID }}
              >
                境内に建立されていた弥勒寺の僧、神吽が、鎌倉時代後半に纏めた『八幡宇佐宮御託宣集』には、欽明天皇三十二年（５７１）辛卯、八幡大明神、筑紫に顕れたまふ。
              </p>

              {/* Painting — full natural height, no crop */}
              <div className="sm:w-[60%]">
                <div
                  className="overflow-hidden group"
                  style={{
                    border: '1px solid rgba(162,122,40,0.22)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={IMG_PAINTING}
                    alt={t('aboutLegendsGoreisui_text_2')}
                    className="w-full transition-transform duration-1000 group-hover:scale-[1.025]"
                    style={{ display: 'block', height: 'auto' }}
                  />
                </div>

                {/* Caption below image */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="w-[2px] h-4 shrink-0" style={{ background: CRIMSON }} />
                  <span
                    className="font-sans tracking-[0.22em]"
                    style={{ fontSize: '0.62rem', color: TEXT_MUT }}
                  >{t("aboutLegendsGoreisuiPage_text_26560")}</span>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      <DiamondRule />

      {/* ▌御託宣 ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-26" style={{ background: `${STONE}88` }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            {/* Title bar */}
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
              <h3 className="font-serif tracking-[0.4em]" style={{ fontSize: '1.15rem', color: TEXT }}>{t('aboutLegendsGoreisui_text_3')}</h3>
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
            </div>

            <p className="text-center font-sans tracking-[0.3em] mb-10" style={{ fontSize: '0.72rem', color: GOLD }}>{t("aboutLegendsGoreisuiPage_text_38095")}</p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide text-center mb-12" style={{ color: TEXT_MID }}>
              豊前国宇佐郡厩峯菱形池の間に、鍛冶の翁有り。首甚だ奇異なり。これに因って大神比義(おおがのひぎ)、穀を絶つこと三年、籠居精進して、即ち幣帛を捧げて祈って言く。「若し汝神ならば、我が前に顕るべし」と。即ち三歳の小児と顕れ、竹葉に立ちて宣く。
            </p>

            <QuoteBlock attribution={t('aboutLegendsGoreisui_text_4')}>
              「我は是れ日本の人皇第十六代誉田の天皇広幡八幡麿（ほんだのすめらみことひろはたのやはたまろ）なり。<br />
              我が名は、護国霊験威力神通大自在王菩薩（ごこくれいげんいりきじんつうだいじざいおうぼさつ）なり。<br />
              国々所々に、跡を神道に垂れ、初て顕るのみ。」
            </QuoteBlock>
          </FadeIn>
        </div>
      </section>

      {/* ▌THREE NAMES ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">

        {/* Label */}
        <FadeIn>
          <p className="font-sans tracking-[0.5em] uppercase mb-8" style={{ fontSize: '0.56rem', color: GOLD }}>
            SACRED SPRING · THREE NAMES
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left – text */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-[3px] h-7" style={{ background: CRIMSON }} />
              <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>{t("aboutLegendsGoreisuiPage_text_71631")}</h3>
            </div>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
              霊泉が湧き出るこの神聖な場所は、長い歴史の中で
              <strong style={{ color: CRIMSON }}>　{t('aboutLegendsGoreisui_text_5')}</strong>
              という三つの名で親しまれてきました。
            </p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsGoreisui_text_6')}</strong>
              と呼ぶのは、鍛冶の翁が現れたという故事や、社僧の神息（しんそく）がこの御霊水で社宝の刀「神息」（当神宮宝物館所蔵）を鍛えたという事跡によります。
            </p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsGoreisui_text_7')}</strong>
              と呼ぶのは、江戸中期の公卿鳥丸光胤が「はふり子が　汲む手や涼し神垣の　下井の清水　影も濁らず」と歌に詠んだことからです。
            </p>
          </FadeIn>

          {/* Right – torii image */}
          <FadeIn delay={0.22}>
            <div className="relative overflow-hidden border border-[#A27A28]/15 group">
              <img
                src={IMG_TORII}
                alt={t('aboutLegendsGoreisui_text_8')}
                className="w-full transition-transform duration-1000 group-hover:scale-[1.04]"
                style={{ display: 'block', height: 'auto' }}
              />
            </div>
          </FadeIn>
        </div>

        {/* Poem below */}
        <FadeIn delay={0.3} className="mt-14">
          <PoemBox
            poem={t('aboutLegendsGoreisui_text_9')}
            attribution={t('aboutLegendsGoreisui_text_10')}
          />
        </FadeIn>
      </section>

      <DiamondRule />

      {/* ▌OTHER LEGENDS ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-6" style={{ background: GOLD }} />
            <h3 className="font-serif tracking-[0.35em]" style={{ fontSize: '1.1rem', color: TEXT }}>{t("aboutLegendsGoreisuiPage_text_63428")}</h3>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LegendCard href="/about/legends/todaiji" label={t('aboutLegendsGoreisui_text_11')} sub="Todai-ji Temple" />
            <LegendCard href="/about/legends/wake"    label={t('aboutLegendsGoreisui_text_12')} sub="Wake no Kiyomaro" />
            <LegendCard href="/about/legends/shinbutsu" label={t('aboutLegendsGoreisui_text_13')} sub="Syncretism" />
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
