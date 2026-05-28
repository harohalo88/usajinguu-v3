'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, LayoutList, GitCommitVertical } from 'lucide-react';

const HEADER_IMG = '/images/5de71ba79bf977fb813c538db7101004a5b85356.png'; // Timeline header
const HERO_IMG = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png'; // Torii scenery

const C = {
  crimson:  '#a50000',
  vermil:   '#e2501f',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  brown:    '#873800',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
};

const ERA_COLORS: Record<string, string> = {
  '上古・奈良時代': '#a27a28',
  '平安・鎌倉時代': '#a50000',
  '室町・江戸時代': '#873800',
  '近代・現代':     '#4a5568',
};

function FadeIn({ children, delay = 0, className = '', from = 'bottom' }: {
  children: React.ReactNode; delay?: number; className?: string; from?: 'bottom' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const initial = from === 'left'  ? { opacity: 0, x: -28 }
                : from === 'right' ? { opacity: 0, x: 28 }
                : { opacity: 0, y: 22 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const HIGHLIGHT_WORDS = [
  '天降る', '神託', '造営', '造立', '勧請', '神仏分離', '官幣大社',
  '大造営', '国宝', '史跡', '大仏建立',
];

function HL({ text }: { text: string }) {
  const regex = new RegExp(`(${HIGHLIGHT_WORDS.join('|')})`, 'g');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((p, i) =>
        HIGHLIGHT_WORDS.includes(p) ? (
          <span key={i} className="font-semibold" style={{ color: C.vermil, borderBottom: `1px solid ${C.vermil}`, paddingBottom: '1px' }}>{p}</span>
        ) : <React.Fragment key={i}>{p}</React.Fragment>
      )}
    </>
  );
}

interface TEntry { year: string; era: string; event: string; }

const TIMELINE: TEntry[] = [
  { year: '',         era: '上　代',          event: '市杵嶋姫命・湍津姫命・田霧姫命の三女神、宇佐嶋に天降る。' },
  { year: '',         era: '神武天皇即位前期', event: '神武天皇、東征に際し宇佐に逗留、菟狭津彦・菟狭津媛、一柱謄宮（足一謄宮）を建てもてなす。' },
  { year: '',         era: '仲哀天皇 2',       event: '応神天皇、筑紫の宇美に御誕生す。' },
  { year: '',         era: '応神天皇 元',      event: '応神天皇、即位される。' },
  { year: '571',      era: '欽明天皇 32',      event: '八幡大神、大神比義の前に３歳童子の姿で御霊水の地に現れる。（八幡神の御出現）' },
  { year: '712',      era: '和銅 5',           event: 'はじめて八幡大神の社殿が完成する。（現鷹居八幡神社）' },
  { year: '716',      era: '霊亀 2',           event: '神託により社殿を小山田の地に遷す。（現小山田神社）' },
  { year: '720',      era: '養老 4',           event: '大隅・日向の隼人反乱す。宇佐宮へ乱の平定を祈る。後に放生会を始める。' },
  { year: '725',      era: '神亀 2',           event: '神託により小倉山に社殿（一之御殿）を造営し、併せて日足の地に弥勒禅院を建立す。' },
  { year: '733',      era: '天平 5',           event: '二之御殿を造立し、比売大神を祀る。' },
  { year: '738',      era: '天平 10',          event: '神託により弥勒禅院を宮の西に遷し、弥勒寺を創建する。' },
  { year: '744',      era: '天平 16',          event: '放生会を始める。' },
  { year: '747',      era: '天平 19',          event: '聖武天皇、東大寺大仏造立祈願 of 勅使を派遣。' },
  { year: '748',      era: '天平 20',          event: '大和国東大寺、八幡神を勧請する。（現奈良市鎮座手向山八幡宮）' },
  { year: '749',      era: '天平勝宝 元',      event: '八幡大神、東大寺大仏を拝するため入京する。' },
  { year: '765',      era: '天平神護 元',      event: '社殿を大尾山へ遷す。' },
  { year: '769',      era: '神護景雲 3',       event: '和気清麻呂を勅使として宇佐宮へ派遣し、道鏡の皇位収奪の野望をくじく。（宇佐八幡神託事件）' },
  { year: '782',      era: '延暦 元',          event: '社殿を大尾山より小倉山の現在の地へ遷す。' },
  { year: '804',      era: '延暦 23',          event: '最澄・空海、渡唐安全を宇佐宮に祈る。' },
  { year: '823',      era: '弘仁 14',          event: '三之御殿完成し神功皇后を祀る。' },
  { year: '810〜824', era: '弘仁年中',         event: '下宮を造立する。' },
  { year: '824',      era: '天長 元',          event: '若宮社を造立する。' },
  { year: '859',      era: '貞観 元',          event: '僧行教、八幡神を山城国男山に勧請する。（現京都府八幡市鎮座石清水八幡宮）' },
  { year: '1183',     era: '寿永 2',           event: '平氏、安徳天皇を奉じて宇佐宮に来る。' },
  { year: '1313',     era: '正和 2',           event: '「八幡宇佐宮御託宣集」を編纂する。' },
  { year: '1420',     era: '応永 27',          event: '豊前守護大内盛見、神輿3基を奉納する。' },
  { year: '1606',     era: '慶長 11',          event: '豊前国小倉藩藩主細川忠興、宇佐宮の社殿・祭礼の復興に着手する。' },
  { year: '1868',     era: '明治 元',          event: '神仏分離の政策により、弥勒寺等を廃止する。' },
  { year: '1872',     era: '明治 5',           event: '官幣大社宇佐神宮となる。' },
  { year: '1925',     era: '大正 14',          event: '勅使奉幣祭復興。（以後10年一度となる）' },
  { year: '1933',     era: '昭和 8',           event: '昭和の大造営に着手する。（〜昭和17年）' },
  { year: '1946',     era: '昭和 21',          event: '宗教法人宇佐神宮となる。' },
  { year: '1952',     era: '昭和 27',          event: '八幡造本殿、国宝に指定。' },
  { year: '1986',     era: '昭和 61',          event: '境内、国の史跡に指定。' },
  { year: '1991',     era: '平成 3',           event: '本殿他建造物、檜皮葺き替え工事を行う。（〜平成7年）' },
  { year: '2012',     era: '平成 24',          event: '上宮本殿改修（平成の大造営）に着手する。（〜平成27年）' },
];

const ERA_SECTIONS = [
  { label: '上古・奈良時代', range: [0,  11] as [number, number] },
  { label: '平安・鎌倉時代', range: [12, 22] as [number, number] },
  { label: '室町・江戸時代', range: [23, 26] as [number, number] },
  { label: '近代・現代',     range: [27, 35] as [number, number] },
];

function isKeyEvent(event: string) {
  return HIGHLIGHT_WORDS.some(w => event.includes(w));
}

function YearEraBadge({ year, era, accent, size = 'md' }: {
  year: string; era: string; accent: string; size?: 'sm' | 'md';
}) {
  const fs = size === 'sm' ? '0.78rem' : '0.82rem';
  return (
    <div
      className="inline-flex items-center gap-1.5 border-b pb-1 mb-1.5 select-none"
      style={{
        fontSize: fs,
        borderBottomColor: `${accent}44`,
      }}
    >
      {year && (
        <span className="font-sans" style={{ color: accent }}>{year}年</span>
      )}
      {year && (
        <span className="text-gold">—</span>
      )}
      <span className="font-serif text-text-mute">{era}</span>
    </div>
  );
}

function TableView() {
  return (
    <div>
      {ERA_SECTIONS.map((section, si) => {
        const entries = TIMELINE.slice(section.range[0], section.range[1] + 1);
        const accent  = ERA_COLORS[section.label];
        return (
          <FadeIn key={section.label} delay={si * 0.07}>
            <div className="flex items-center gap-3.5 mb-0 select-none">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent" style={{ backgroundColor: `${accent}55` }} />
              <span className="font-serif text-xs tracking-[0.25em] whitespace-nowrap" style={{ color: accent }}>
                {section.label}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent" style={{ backgroundColor: `${accent}55` }} />
            </div>

            <div className="w-full border border-gold/30 rounded-sm mb-11 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[200px_1fr] bg-stone border-b select-none" style={{ borderBottomColor: `${accent}55` }}>
                {['年　代', '事　項'].map((h, i) => (
                  <div
                    key={h}
                    className="p-3 font-serif text-text-mid text-sm tracking-widest"
                    style={{
                      textAlign: i === 0 ? 'center' : 'left',
                      borderRight: i === 0 ? '1px solid rgba(162,122,40,0.15)' : 'none',
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
              
              {entries.map((e, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr] sm:grid-cols-[200px_1fr] border-b border-gold/10 last:border-b-0"
                  style={{ backgroundColor: i % 2 === 0 ? 'rgba(250,248,245,0.9)' : 'rgba(242,236,228,0.45)' }}
                >
                  {/* Year Era Cell */}
                  <div className="p-3 flex items-center justify-center border-r border-gold/15 select-none text-center">
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
                      {e.year && (
                        <span className="font-sans text-xs tracking-wider" style={{ color: accent }}>{e.year}年</span>
                      )}
                      {e.year && (
                        <span className="hidden sm:inline text-gold text-sm">—</span>
                      )}
                      <span className="font-serif text-text-mid text-xs tracking-wider">{e.era}</span>
                    </div>
                  </div>
                  <div className="p-4 font-sans text-text-body text-sm leading-relaxed tracking-wide select-text">
                    <HL text={e.event} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

function EntryCard({ entry, isKey, accent, align }: {
  entry: TEntry; isKey: boolean; accent: string; align: 'left' | 'right';
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="max-w-[380px] p-4 bg-white/70 border rounded-sm transition-all duration-300 select-text"
      style={{
        backgroundColor: hovered ? '#faf8f5' : isKey ? 'rgba(250,248,245,0.95)' : 'rgba(250,248,245,0.7)',
        borderColor: isKey ? `${accent}55` : 'rgba(162,122,40,0.18)',
        borderLeftWidth: align === 'left' ? '3px' : '1px',
        borderLeftColor: align === 'left' ? accent : undefined,
        borderRightWidth: align === 'right' ? '3px' : '1px',
        borderRightColor: align === 'right' ? accent : undefined,
        boxShadow: hovered ? '0 6px 24px rgba(0,0,0,0.1)' : isKey ? '0 2px 10px rgba(0,0,0,0.06)' : 'none',
        textAlign: align,
      }}
    >
      <YearEraBadge year={entry.year} era={entry.era} accent={accent} size="md" />
      <p className="font-sans text-text-body text-sm leading-relaxed tracking-wider">
        <HL text={entry.event} />
      </p>
    </div>
  );
}

function VerticalTimelineEntry({ entry, index, side, accent }: {
  entry: TEntry; index: number; side: 'left' | 'right'; accent: string;
}) {
  const isKey = isKeyEvent(entry.event);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[1fr_40px_1fr] items-start mb-1.5 relative"
    >
      <div className="pr-5 flex justify-end">
        {side === 'left' && <EntryCard entry={entry} isKey={isKey} accent={accent} align="right" />}
      </div>

      <div className="flex flex-col items-center relative select-none">
        <div
          className="rounded-full shrink-0 mt-3.5 z-10 transition-all duration-300"
          style={{
            width: isKey ? '16px' : '10px',
            height: isKey ? '16px' : '10px',
            backgroundColor: isKey ? accent : 'rgba(162,122,40,0.35)',
            border: isKey ? `2px solid ${accent}` : '1.5px solid rgba(162,122,40,0.5)',
            boxShadow: isKey ? `0 0 0 4px ${accent}22` : 'none',
          }}
        />
      </div>

      <div className="pl-5 flex justify-start">
        {side === 'right' && <EntryCard entry={entry} isKey={isKey} accent={accent} align="left" />}
      </div>
    </motion.div>
  );
}

function MobileEntry({ entry, index, accent }: { entry: TEntry; index: number; accent: string }) {
  const isKey = isKeyEvent(entry.event);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-3.5 mb-1.5"
    >
      <div className="flex flex-col items-center shrink-0 select-none">
        <div
          className="rounded-full shrink-0 mt-3 z-10"
          style={{
            width: isKey ? '14px' : '9px',
            height: isKey ? '14px' : '9px',
            backgroundColor: isKey ? accent : 'rgba(162,122,40,0.3)',
            border: `1.5px solid ${accent}88`,
            boxShadow: isKey ? `0 0 0 3px ${accent}22` : 'none',
          }}
        />
      </div>
      <div
        className="flex-1 p-3.5 bg-white/70 border border-gold/15 border-l-4 mb-0.5 shadow-sm rounded-sm select-text"
        style={{
          backgroundColor: isKey ? 'rgba(250,248,245,0.95)' : 'rgba(250,248,245,0.7)',
          borderLeftColor: accent,
          borderColor: isKey ? `${accent}44` : undefined,
        }}
      >
        <YearEraBadge year={entry.year} era={entry.era} accent={accent} size="sm" />
        <p className="font-sans text-text-body text-sm leading-relaxed">
          <HL text={entry.event} />
        </p>
      </div>
    </motion.div>
  );
}

function VerticalView() {
  return (
    <div>
      {ERA_SECTIONS.map((section, si) => {
        const entries = TIMELINE.slice(section.range[0], section.range[1] + 1);
        const accent  = ERA_COLORS[section.label];
        return (
          <FadeIn key={section.label} delay={si * 0.06}>
            <div
              className="flex items-center mb-6"
              style={{ marginTop: si > 0 ? '48px' : '0' }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent" style={{ backgroundColor: `${accent}66` }} />
              <div
                className="px-6 py-1.5 text-ivory font-serif text-xs tracking-widest whitespace-nowrap select-none shadow-sm rounded-sm"
                style={{ backgroundColor: accent }}
              >
                {section.label}
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent" style={{ backgroundColor: `${accent}66` }} />
            </div>

            {/* Desktop View */}
            <div className="hidden md:block relative">
              <div
                className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
                style={{ background: `linear-gradient(to bottom, ${accent}88, ${accent}22)` }}
              />
              {entries.map((entry, i) => (
                <VerticalTimelineEntry key={i} entry={entry} index={i} side={i % 2 === 0 ? 'left' : 'right'} accent={accent} />
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden relative pl-2">
              <div
                className="absolute left-3 top-0 bottom-0 w-[1px]"
                style={{ background: `linear-gradient(to bottom, ${accent}77, ${accent}11)` }}
              />
              {entries.map((entry, i) => (
                <MobileEntry key={i} entry={entry} index={i} accent={accent} />
              ))}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

export default function TimelinePage() {
  const locale = useLocale();
  const [view, setView] = useState<'table' | 'vertical'>('vertical');

  return (
    <div className="bg-ivory min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt="宇佐神宮境内"
          className="w-full h-full object-cover animate-fade-in"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-ivory" />
        <div className="absolute bottom-0 left-0 right-0 text-center px-6 pb-8 z-10">
          <p className="font-serif text-gold text-xs tracking-[0.3em] uppercase mb-2">HISTORY</p>
          <h1 className="font-serif text-text-body text-2xl md:text-3xl tracking-widest">歴史略年表</h1>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-screen-lg mx-auto px-4 md:px-8 pt-16 pb-24">
        {/* Intro */}
        <FadeIn>
          <div className="flex flex-col items-center mb-14 gap-8">
            <div className="w-full border border-gold/25 shadow-md rounded-sm overflow-hidden select-none">
              <img
                src={HEADER_IMG}
                alt="宇佐神宮の歴史"
                className="w-full object-cover"
              />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4 select-none">
                <div className="w-10 h-[1px] bg-gold/40" />
                <div className="w-1.5 h-1.5 bg-gold opacity-50 rotate-45" />
                <div className="w-10 h-[1px] bg-gold/40" />
              </div>
              <p className="font-serif text-text-mid text-base leading-relaxed tracking-wider">
                上代より連綿と続く宇佐神宮の歴史は<br />
                神事や祭会、うるわしい建造物、宝物などに<br />
                今も見ることができます
              </p>
            </div>
          </div>
        </FadeIn>

        {/* View toggle */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-12 select-none">
            <div className="flex border border-gold/35 rounded-sm overflow-hidden shadow-sm bg-white/50">
              {[
                { key: 'vertical' as const, icon: <GitCommitVertical size={14} />, label: '年表形式' },
                { key: 'table'    as const, icon: <LayoutList size={14} />,        label: '表形式'  },
              ].map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className="flex items-center gap-1.5 px-5 py-2 font-serif text-xs tracking-wider transition-colors cursor-pointer border-0 outline-none"
                  style={{
                    backgroundColor: view === key ? C.gold    : 'transparent',
                    color:           view === key ? '#faf8f5' : C.textMute,
                    borderRight: key === 'vertical' ? '1px solid rgba(162,122,40,0.35)' : 'none',
                  }}
                >
                  {icon}{label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* View container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {view === 'table' ? <TableView /> : <VerticalView />}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <div className="border-t border-gold/25 pt-8 mt-4 text-center select-none">
          <p className="font-sans text-text-mute text-xs tracking-wider leading-relaxed select-text">
            ※ 上記年表は宇佐神宮の主要な歴史的事項を略記したものです。<br />
            詳細については社務所にお問い合わせください。
          </p>
          <div className="mt-8 flex justify-center gap-8 flex-wrap select-none text-sm font-serif">
            {[
              { label: '← 由緒', to: '/about/history' },
              { label: 'ご祭神 →', to: '/about/deities' }
            ].map((link) => (
              <Link
                key={link.to}
                href={`/${locale}${link.to}`}
                className="text-crimson transition-opacity hover:opacity-60 border-b border-crimson/30 pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
