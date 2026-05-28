'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_WAKE_ORACLE = '/images/image-5.png';
const IMG_GOOU_SHRINE = '/images/image-6.png';

// ── Remote images ─────────────────────────────────────────────────────────────
const IMG_HERO = 'https://images.unsplash.com/photo-1770647228005-941d2462c0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Design tokens ─────────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const VERMIL   = '#e2501f';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
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

// ── Thin inline rule used inside text columns ─────────────────────────────────
function InlineRule() {
  return (
    <div className="flex items-center gap-3 my-9 opacity-40">
      <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.4)' }} />
      <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: GOLD }} />
      <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.4)' }} />
    </div>
  );
}

// ── Corner-accented quote block ───────────────────────────────────────────────
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

// ── Poem box ──────────────────────────────────────────────────────────────────
function PoemBox({ poem, attribution }: { poem: string; attribution: string }) {
  return (
    <div className="py-9 px-10 md:px-16 text-center" style={{ background: STONE }}>
      <p className="font-serif text-[0.93rem] leading-[2.6] tracking-wider whitespace-pre-line" style={{ color: TEXT }}>
        {poem}
      </p>
      <p className="mt-5 font-sans text-[0.68rem] tracking-[0.3em]" style={{ color: TEXT_MUT }}>
        {attribution}
      </p>
    </div>
  );
}

// ── Image with caption ────────────────────────────────────────────────────────
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

// ── Minimal legend card ───────────────────────────────────────────────────────
function LegendCard({ href, label, sub }: { href: string; label: string; sub: string }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}${href}`}
      className="group flex items-center justify-between px-6 py-5 border"
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
export default function WakePage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>

      {/* ▌HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={IMG_HERO}
          alt="和気清麻呂とご神託"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 45%',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,3,3,0.45) 0%, rgba(10,3,3,0.68) 100%)',
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
              和気清麻呂とご神託
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
              Wake no Kiyomaro · Divine Oracle
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300,
              letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)',
            }}>
              和気清麻呂とご神託
            </h1>
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
                DIVINE ORACLE
              </span>
              <div
                className="w-px shrink-0"
                style={{ background: VERMIL, alignSelf: 'stretch', minHeight: 240 }}
              />
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
              >
                国体護持の御神託
              </h2>
            </div>
          </FadeIn>

          {/* ── Right: body text + image ── */}
          <FadeIn delay={0.2} className="flex-1 min-w-0">
            <p
              className="font-sans text-[0.9rem] leading-[2.15] tracking-wide mb-8"
              style={{ color: TEXT_MID }}
            >
              神護景雲３(７６９)年、女帝・称徳天皇 (復祚：孝謙天皇)の寵愛を受け、しばしば政治に介入していた僧・弓削道鏡（ゆげのどうきょう）は皇位を狙い、「道鏡を皇位に就かせたならば国は安泰である」とするお告げが宇佐八幡大神よりおろされたと太宰主神（だざいのかんづかさ）習宣阿曾麻呂（すげのあそまろ）という者にうその奏上をさせます。
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="sm:w-[55%]">
                <p
                  className="font-sans text-[0.9rem] leading-[2.15] tracking-wide mb-8"
                  style={{ color: TEXT_MID }}
                >
                  宇佐神宮を深くご崇拝になっておられた天皇は、真相を確認するため、すぐに官僚であった和気清麻呂公を派遣します。公は出発に際して次のような歌をお作りになりました。
                </p>
                <PoemBox
                  poem={"西の海たつ白波の上にして\nなにすごすらんかりのこの世を"}
                  attribution="出立に際し　和気清麻呂公　詠"
                />
              </div>

              {/* First image */}
              <div className="sm:w-[45%]">
                <CaptionedImage
                  src={IMG_WAKE_ORACLE}
                  alt="神託を受ける清麻呂"
                  caption="神託を受ける清麻呂"
                />
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
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.2)' }} />
              <h3 className="font-serif tracking-[0.4em]" style={{ fontSize: '1.15rem', color: TEXT }}>御神託</h3>
              <div className="h-px flex-1" style={{ background: 'rgba(162,122,40,0.2)' }} />
            </div>

            <p className="text-center font-sans tracking-[0.3em] mb-10" style={{ fontSize: '0.72rem', color: GOLD }}>
              神護景雲三年（七六九）七月十一日
            </p>

            <p
              className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-10"
              style={{ color: TEXT_MID }}
            >
              清麻呂公は都を立って１０日余りの旅程で宇佐神宮に着き、斎戒沐浴して神殿にぬかづき、神護景雲３年（７６９）７月１１日、
            </p>

            <QuoteBlock attribution="八幡宇佐宮御託宣集">
              「我が国は開闢（かいびゃく）以来、君臣の分定まれり。<br />
              臣を以って君と為すこと未だあらざるなり。<br />
              天津日嗣(ひつぎ)は必ず皇緒を立てよ。<br />
              無道の人は宜しく早く掃除（そうじょ）すべし。」
            </QuoteBlock>

            <p
              className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mt-10"
              style={{ color: TEXT_MID }}
            >
              とのお告げを受けます。そこで八幡大神託宜奏記二通を作り、一通は神宮に納め、一通を陛下へご報告するものにして、同月の２１日に都に帰り着き御所へ報告しました。このとき清麻呂公は３７歳でした。
            </p>
          </FadeIn>
        </div>
      </section>

      <DiamondRule />

      {/* ▌EXILE & MIRACLES + GOOU SHRINE (combined) ─────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6">

        <FadeIn>
          <p className="font-sans tracking-[0.5em] uppercase mb-10" style={{ fontSize: '0.56rem', color: GOLD }}>
            DIVINE PROTECTION · 八幡大神のご守護
          </p>
        </FadeIn>

        {/* 2-column: left = full narrative text, right = shrine image anchored top */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-start">

          {/* ── Left: 流罪と奇跡 → InlineRule → 護皇神社と和気氏 ── */}
          <div>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-[3px] h-7" style={{ background: CRIMSON }} />
                <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>
                  流罪と奇跡
                </h3>
              </div>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
                道鏡の怒りをかった清麻呂公は、別部穢麻呂（わけべのきたなまろ）と改名させられて脚(あし)の腱（けん）を切られた上、大隅国へ流されました。
              </p>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
                その途中、暗殺を謀って送られた道鏡の刺客（しかく）から、突然の天地雷鳴や３００頭あまりの猪の大群が和気清麻呂を護り、さらに宇佐へ詣でたところ、道鏡に傷つけられた脚が回復するなど、八幡大神のご守護により数々の奇跡がおきたと伝えられています。
              </p>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide" style={{ color: TEXT_MID }}>
                翌年の神護景雲４年８月４日（７７０）天皇が西宮神殿で崩御、光仁天皇が御即位になって年号を宝亀と改め、同年９月６日清麻呂公は召し返され、翌宝亀２年３月２９日（７７１）には元の位に着き、９月１６日に薩摩の国員外の介に任ぜられたが、間もなく豊前の守(かみ)に還されました。公は古事にも通じ「民部省例(みんぶしょうれい)」や「和氏譜(わしふ)」を著し、当時の大事業である平安遷都の大功を残しました。又道鏡は冠位をはがれ、下野国薬師寺別当として赴任(ふにん)させられましたが、宝亀３年４月７日にその生涯を閉じました。
              </p>
            </FadeIn>

            {/* ── Inline separator between the two sub-sections ── */}
            <FadeIn delay={0.15}>
              <InlineRule />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-[3px] h-7" style={{ background: GOLD }} />
                <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>
                  護皇神社と和気氏
                </h3>
              </div>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-6" style={{ color: TEXT_MID }}>
                このようにして、宇佐神宮の国体擁護のご神徳と、和気公の至誠の精神とが皇室をご守護することとなりました。
              </p>

              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-8" style={{ color: TEXT_MID }}>この後、宇佐神宮への勅使を宇佐使（うさづかい）また和気使（わけづかい）といい、和気氏が派遣されるのが例となりました。</p>
              <p className="font-sans text-[0.88rem] leading-[2.3] tracking-wide mb-8" style={{ color: TEXT_MID }}>清麻呂公は当宮末社、護皇(ごおう)神社に祭祀されています。</p>
            </FadeIn>
          </div>

          {/* ── Right: shrine image, sticky at top ── */}
          <FadeIn delay={0.25} className="md:sticky md:top-24">
            <CaptionedImage
              src={IMG_GOOU_SHRINE}
              alt="清麻呂公を祀る護皇神社"
              caption="清麻呂公を祀る護皇神社"
            />
          </FadeIn>

        </div>
      </section>

      <DiamondRule />

      {/* ▌OTHER LEGENDS ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-6" style={{ borderTop: '1px solid rgba(162,122,40,0.09)' }}>
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
            <LegendCard href="/about/legends/goreisui"  label="御霊水"        sub="Sacred Spring" />
            <LegendCard href="/about/legends/todaiji"   label="東大寺の大仏建立" sub="Tōdai-ji Temple" />
            <LegendCard href="/about/legends/shinbutsu" label="神仏習合 of 歴史"  sub="Syncretism" />
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
