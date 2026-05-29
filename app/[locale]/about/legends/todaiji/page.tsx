'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Assets ─────────────────────────────────────────────────────────────────
const IMG_MIKOSHI = '/images/cb78fa02bdebd6d17d40abaf4f258ed95eceed28.png';

// ── Design tokens ───────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const VERMIL   = '#e2501f';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

// ── Images ──────────────────────────────────────────────────────────────────
const IMG_HERO  = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_crop,w_7360,h_2070,x_0,y_300/c_scale,w_1600,h_450/f_auto/q_auto/v1779961467/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E6%9D%B1%E5%A4%A7%E5%AF%BA%E3%81%AE%E5%A4%A7%E4%BB%8F%E5%BB%BA%E7%AB%8B_img01_mj8od1.jpg';
const IMG_BUDDHA = 'https://images.unsplash.com/photo-1662554471428-d036dfbc6c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

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
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)` }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: GOLD }} />
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)` }} />
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

// ── Minimal horizontal legend card ──────────────────────────────────────────
function LegendCard({ href, label, sub }: { href: string; label: string; sub: string }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}${href}`}
      className="group flex items-center justify-between px-6 py-5 border transition-all duration-300 hover:border-[#A27A28]/50 hover:bg-white"
      style={{ borderColor: 'rgba(162,122,40,0.2)', background: IVORY }}
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

// ── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="text-center py-8 px-4 border-r last:border-r-0" style={{ borderColor: 'rgba(162,122,40,0.13)' }}>
      <p className="font-serif mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: TEXT, letterSpacing: '0.05em' }}>
        {value}
        <span className="font-sans ml-1" style={{ fontSize: '0.72rem', color: TEXT_MUT }}>{unit}</span>
      </p>
      <p className="font-sans tracking-[0.3em]" style={{ fontSize: '0.62rem', color: GOLD }}>{label}</p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function TodaijiPage() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>

      {/* ▌INNER PAGE HEADER ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HERO}
          alt={t('aboutLegendsTodaiji_text_1')}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 50%',
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
            >{t("aboutLegendsTodaijiPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutLegendsTodaijiPage_text_44003")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutLegendsTodaijiPage_text_60347")}</span>
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
              Construction of Tōdai-ji · Divine Mandate
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300,
              letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>{t("aboutLegendsTodaijiPage_text_60347")}</h1>
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

              {/* 1. Tiny label — far left, reads top→bottom */}
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
                DIVINE ORACLE
              </span>

              {/* 2. Solid vermilion bar */}
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
              >{t("aboutLegendsTodaijiPage_text_51472")}</h2>

            </div>
          </FadeIn>

          {/* ── Right: body text + image ── */}
          <FadeIn delay={0.2} className="flex-1 min-w-0">
            <p
              className="font-sans text-[0.9rem] leading-[2.15] tracking-wide mb-8"
              style={{ color: TEXT_MID }}
            >
              奈良の大仏は聖武天皇の発願で天平17年（745年）に制作が開始され、天平勝宝4年（752年）に開眼供養会（かいげんくようえ）が行われました。
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <p
                className="font-sans text-[0.9rem] leading-[2.15] tracking-wide sm:w-[48%]"
                style={{ color: TEXT_MID }}
              >
                大仏を作るために使われた金属は銅499.0トン、すず8.5トン、金0.4トン、水銀2.5トンです。
                <br /><br />
                聖武天皇は疫病や社会不安から国を鎮護するための国家の大事業として東大寺を建立していましたが、天皇が沢山の費用を使って仏教寺院を建立すれば、貴族からどんな反対の意見が出るかもしれません。そんな心配のある時に、宇佐の八幡神から「われ天神地祇(てんしんちぎ)を率(ひき)い、必ず成し奉(たてまつ)る。銅の湯を水となし、わが身を草木に交(まじ)えて障(さわ)ることなくなさん」という協力の託宣が出されました。
              </p>

              {/* Great Buddha image — full natural height, no crop */}
              <div className="sm:w-[52%]">
                <div
                  className="overflow-hidden group"
                  style={{
                    border: '1px solid rgba(162,122,40,0.22)',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={IMG_BUDDHA}
                    alt={t('aboutLegendsTodaiji_text_2')}
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
                  >{t("aboutLegendsTodaijiPage_text_11204")}</span>
                </div>
              </div>
            </div>

            {/* ▌METALS USED ───────────────────────────────────────────────────── */}
            <div className="mt-12 py-10 px-6 sm:px-10" style={{ background: 'rgba(242,236,228,0.53)' }}>
              <p className="font-sans tracking-[0.45em] uppercase text-center mb-8" style={{ fontSize: '0.55rem', color: GOLD }}>
                MATERIALS · 大仏鋳造に使われた金属
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 border" style={{ borderColor: 'rgba(162,122,40,0.13)', background: IVORY }}>
                <StatItem value="499.0" unit={t('aboutLegendsTodaiji_text_4')} label={t('aboutLegendsTodaiji_text_3')} />
                <StatItem value="8.5"   unit={t('aboutLegendsTodaiji_text_6')} label={t('aboutLegendsTodaiji_text_5')} />
                <StatItem value="2.5"   unit={t('aboutLegendsTodaiji_text_8')} label={t('aboutLegendsTodaiji_text_7')} />
                <StatItem value="0.4"   unit={t('aboutLegendsTodaiji_text_10')} label={t('aboutLegendsTodaiji_text_9')} />
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      <DiamondRule />

      {/* ▌ORACLE ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-26" style={{ background: 'rgba(242,236,228,0.53)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            {/* Title bar */}
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
              <h3 className="font-serif tracking-[0.4em]" style={{ fontSize: '1.15rem', color: TEXT }}>{t('aboutLegendsTodaiji_text_11')}</h3>
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
            </div>

            <p className="text-center font-sans tracking-[0.3em] mb-10" style={{ fontSize: '0.72rem', color: GOLD }}>{t("aboutLegendsTodaijiPage_text_38095")}</p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide text-center mb-12" style={{ color: TEXT_MID }}>
              八幡神は天の神・地の神を率いてわが身をなげうって協力し、東大寺の建立を必ず成功させると誓いました。また、大仏に塗る金が不足すると「金は必ず国内より出る」という御託宣を出し、やがて陸奥国から金が献上されることとなりました。
            </p>

            <QuoteBlock attribution={t('aboutLegendsTodaiji_text_12')}>
              「われ天神地祇（てんしんちぎ）を率（ひき）い、必ず成し奉（たてまつ）る。<br />
              銅の湯を水となし、わが身を草木に交（まじ）えて<br />
              障（さわ）ることなくなさん」
            </QuoteBlock>
          </FadeIn>
        </div>
      </section>

      <DiamondRule />

      {/* ▌SHINKO HASSHO ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">

        {/* Label */}
        <FadeIn>
          <p className="font-sans tracking-[0.5em] uppercase mb-8" style={{ fontSize: '0.56rem', color: GOLD }}>
            SACRED PALANQUIN · 神輿発祥の地
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left – Nara image */}
          <FadeIn delay={0.1}>
            <div className="relative overflow-hidden border border-[#A27A28]/15 group">
              <img
                src={IMG_MIKOSHI}
                alt={t('aboutLegendsTodaiji_text_13')}
                className="w-full transition-transform duration-1000 group-hover:scale-[1.04]"
                style={{ display: 'block', height: 'auto' }}
              />
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="w-[2px] h-4 shrink-0" style={{ background: CRIMSON }} />
              <span
                className="font-sans tracking-[0.22em]"
                style={{ fontSize: '0.62rem', color: TEXT_MUT }}
              >{t("aboutLegendsTodaijiPage_text_72666")}</span>
            </div>
          </FadeIn>

          {/* Right – text */}
          <FadeIn delay={0.22}>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-[3px] h-7" style={{ background: CRIMSON }} />
              <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>
                神輿発祥の地 宇佐
              </h3>
            </div>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
              大仏鋳造直後の天平勝宝元（749）年12月、八幡大神とお供の宇佐宮の女禰宜（めねぎ）・大神杜女（おおがのもりめ）が大仏を拝するため、
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsTodaiji_text_14')}</strong>
              に乗って転害門（てがいもん）をくぐりました。
            </p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
              紫の輿とは天皇が使用する高貴なものでした。転害門では大勢 of 僧侶・文武百官（もんぶひゃっかん）が出迎え、聖武太上(しょうむだいじょう)天皇、考謙(こうけん)天皇、光明皇太合(こうみょうこうたいごう)の行幸のもと、僧侶5000人の読経、呉楽（くれがく）、五節舞（ごせちのまい）などの法要が賑々しく営まれました。
            </p>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
              宇佐の神を乗せた「輿」が遠方へと渡御したこの出来事は、
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsTodaiji_text_15')}</strong>
              の故事として語り継がれ、宇佐はその発祥の地とされています。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ▌KAIGEN CEREMONY ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-26" style={{ background: 'rgba(242,236,228,0.53)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
              <h3 className="font-serif tracking-[0.4em]" style={{ fontSize: '1.15rem', color: TEXT }}>{t('aboutLegendsTodaiji_text_16')}</h3>
              <div className="h-px flex-1" style={{ background: `rgba(162,122,40,0.2)` }} />
            </div>

            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide text-center mb-10" style={{ color: TEXT_MID }}>
              三年後の天平勝宝4（752）年に行われた東大寺大仏開眼法要について、『東大寺縁起（えんぎ）』には次のように記されています。
            </p>

            <QuoteBlock attribution={t('aboutLegendsTodaiji_text_17')}>
              開眼法要のため聖武太上天皇・孝謙天皇が大仏殿に入御され、<br />
              続いて八幡神も入御になりました。<br />
              そのとき、「神明霊威」により内裏に「天下太平」の文字が出現しました。
            </QuoteBlock>

            <p className="font-sans text-[0.85rem] leading-[2.3] tracking-wide text-center mt-10" style={{ color: TEXT_MID }}>
              このおめでたき出来事により、年号を天平勝宝から天平宝字に改元したといわれています。
            </p>
          </FadeIn>
        </div>
      </section>

      <DiamondRule />

      {/* ▌REWARD & TAMUKEYAMA ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-[3px] h-7" style={{ background: GOLD }} />
            <h3 className="font-serif tracking-[0.35em]" style={{ fontSize: '1.15rem', color: TEXT }}>{t("aboutLegendsTodaijiPage_text_55134")}</h3>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <FadeIn delay={0.1}>
            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
              大仏建立への協力の褒美（ほうび）として、朝廷から八幡神へ
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsTodaiji_text_18')}</strong>
              がおくられ、東大寺が完成すると東大寺を護(まも)る神として、寺の近くに<strong style={{ color: CRIMSON }}>{t('aboutLegendsTodaiji_text_19')}</strong>
              が分霊（ぶんれい）として祀られました。
            </p>
            <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
              八幡神は奈良の人々に強力な印象を与え、
              <strong style={{ color: CRIMSON }}>{t('aboutLegendsTodaiji_text_20')}</strong>
              を踏み出したのでした。
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Note about Mikoshi */}
            <div
              className="relative py-8 px-8 border"
              style={{ borderColor: 'rgba(162,122,40,0.2)', background: IVORY }}
            >
              <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#A27A28]/40" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#A27A28]/40" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#A27A28]/40" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#A27A28]/40" />
              <p className="font-sans text-[0.72rem] tracking-[0.35em] uppercase mb-4" style={{ color: GOLD }}>
                Heirloom · 宝物館
              </p>
              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
                この故事にちなむ『神輿』は宝物館にてご鑑賞いただけます。
              </p>
              <Link
                href={`/${locale}/about/museum`}
                className="inline-flex items-center gap-2 mt-5 font-sans tracking-[0.25em] transition-opacity hover:opacity-60"
                style={{ fontSize: '0.68rem', color: GOLD }}
              >{t("aboutLegendsTodaijiPage_text_30424")}<ChevronRight size={12} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ▌OTHER LEGENDS ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid rgba(162,122,40,0.09)' }}>
        <FadeIn>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-6" style={{ background: GOLD }} />
            <h3 className="font-serif tracking-[0.35em]" style={{ fontSize: '1.1rem', color: TEXT }}>{t("aboutLegendsTodaijiPage_text_63428")}</h3>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LegendCard href="/about/legends/goreisui"   label={t('aboutLegendsTodaiji_text_21')} sub="Sacred Spring" />
            <LegendCard href="/about/legends/wake"        label={t('aboutLegendsTodaiji_text_22')} sub="Wake no Kiyomaro" />
            <LegendCard href="/about/legends/shinbutsu"   label={t('aboutLegendsTodaiji_text_23')} sub="Syncretism" />
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
