'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronRight, LayoutList, GitCommitVertical } from 'lucide-react';

const HEADER_IMG = '/images/5de71ba79bf977fb813c538db7101004a5b85356.png'; // Timeline header
const HERO_IMG = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_crop,w_7360,h_2070,x_0,y_300/c_scale,w_1600,h_450/f_auto/q_auto/v1779961443/%E6%AD%B4%E5%8F%B2%E7%95%A5%E5%B9%B4%E8%A1%A8_img01_zpvyny.jpg'; // Torii scenery

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

interface TEntry { year: string; era: string; event: string; }

export default function TimelinePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [view, setView] = useState<'table' | 'vertical'>('vertical');

  const ERA_COLORS: Record<string, string> = {
    [t('aboutTimeline_text_1')]: '#a27a28',
    [t('aboutTimeline_text_2')]: '#a50000',
    [t('aboutTimeline_text_3')]: '#873800',
    [t('aboutTimeline_text_4')]:     '#4a5568',
  };

  const HIGHLIGHT_WORDS = [
    t('aboutTimeline_text_11'), t('aboutTimeline_text_10'), t('aboutTimeline_text_9'), t('aboutTimeline_text_8'), t('aboutTimeline_text_7'), t('aboutTimeline_text_6'), t('aboutTimeline_text_5'),
    t('aboutTimeline_text_15'), t('aboutTimeline_text_14'), t('aboutTimeline_text_13'), t('aboutTimeline_text_12'),
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

  const TIMELINE: TEntry[] = [
    { year: '',         era: t('aboutTimeline_text_17'),          event: t('aboutTimeline_text_16') },
    { year: '',         era: t('aboutTimeline_text_19'), event: t('aboutTimeline_text_18') },
    { year: '',         era: t('aboutTimeline_text_21'),       event: t('aboutTimeline_text_20') },
    { year: '',         era: t('aboutTimeline_text_23'),      event: t('aboutTimeline_text_22') },
    { year: '571',      era: t('aboutTimeline_text_25'),      event: t('aboutTimeline_text_24') },
    { year: '712',      era: t('aboutTimeline_text_27'),           event: t('aboutTimeline_text_26') },
    { year: '716',      era: t('aboutTimeline_text_29'),           event: t('aboutTimeline_text_28') },
    { year: '720',      era: t('aboutTimeline_text_31'),           event: t('aboutTimeline_text_30') },
    { year: '725',      era: t('aboutTimeline_text_33'),           event: t('aboutTimeline_text_32') },
    { year: '733',      era: t('aboutTimeline_text_35'),           event: t('aboutTimeline_text_34') },
    { year: '738',      era: t('aboutTimeline_text_37'),          event: t('aboutTimeline_text_36') },
    { year: '744',      era: t('aboutTimeline_text_39'),          event: t('aboutTimeline_text_38') },
    { year: '747',      era: t('aboutTimeline_text_41'),          event: t('aboutTimeline_text_40') },
    { year: '748',      era: t('aboutTimeline_text_43'),          event: t('aboutTimeline_text_42') },
    { year: '749',      era: t('aboutTimeline_text_45'),      event: t('aboutTimeline_text_44') },
    { year: '765',      era: t('aboutTimeline_text_47'),      event: t('aboutTimeline_text_46') },
    { year: '769',      era: t('aboutTimeline_text_49'),       event: t('aboutTimeline_text_48') },
    { year: '782',      era: t('aboutTimeline_text_51'),          event: t('aboutTimeline_text_50') },
    { year: '804',      era: t('aboutTimeline_text_53'),          event: t('aboutTimeline_text_52') },
    { year: '823',      era: t('aboutTimeline_text_55'),          event: t('aboutTimeline_text_54') },
    { year: '810〜824', era: t('aboutTimeline_text_57'),         event: t('aboutTimeline_text_56') },
    { year: '824',      era: t('aboutTimeline_text_59'),          event: t('aboutTimeline_text_58') },
    { year: '859',      era: t('aboutTimeline_text_61'),          event: t('aboutTimeline_text_60') },
    { year: '1183',     era: t('aboutTimeline_text_63'),           event: t('aboutTimeline_text_62') },
    { year: '1313',     era: t('aboutTimeline_text_65'),           event: t('aboutTimeline_text_64') },
    { year: '1420',     era: t('aboutTimeline_text_67'),          event: t('aboutTimeline_text_66') },
    { year: '1606',     era: t('aboutTimeline_text_69'),          event: t('aboutTimeline_text_68') },
    { year: '1868',     era: t('aboutTimeline_text_71'),          event: t('aboutTimeline_text_70') },
    { year: '1872',     era: t('aboutTimeline_text_73'),           event: t('aboutTimeline_text_72') },
    { year: '1925',     era: t('aboutTimeline_text_75'),          event: t('aboutTimeline_text_74') },
    { year: '1933',     era: t('aboutTimeline_text_77'),           event: t('aboutTimeline_text_76') },
    { year: '1946',     era: t('aboutTimeline_text_79'),          event: t('aboutTimeline_text_78') },
    { year: '1952',     era: t('aboutTimeline_text_81'),          event: t('aboutTimeline_text_80') },
    { year: '1986',     era: t('aboutTimeline_text_83'),          event: t('aboutTimeline_text_82') },
    { year: '1991',     era: t('aboutTimeline_text_85'),           event: t('aboutTimeline_text_84') },
    { year: '2012',     era: t('aboutTimeline_text_87'),          event: t('aboutTimeline_text_86') },
  ];

  const ERA_SECTIONS = [
    { label: t('aboutTimeline_text_88'), range: [0,  11] as [number, number] },
    { label: t('aboutTimeline_text_89'), range: [12, 22] as [number, number] },
    { label: t('aboutTimeline_text_90'), range: [23, 26] as [number, number] },
    { label: t('aboutTimeline_text_91'),     range: [27, 35] as [number, number] },
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
          <span className="font-sans" style={{ color: accent }}>{t("aboutTimelinePage_year")}</span>
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
                  {[t('aboutTimeline_text_93'), t('aboutTimeline_text_92')].map((h, i) => (
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
                          <span className="font-sans text-xs tracking-wider" style={{ color: accent }}>{t("aboutTimelinePage_eyear")}</span>
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

  return (
    <div className="bg-ivory min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt={t('aboutTimeline_text_94')}
          className="w-full h-full object-cover animate-fade-in"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-ivory" />
        <div className="absolute bottom-0 left-0 right-0 text-center px-6 pb-8 z-10">
          <p className="font-serif text-gold text-xs tracking-[0.3em] uppercase mb-2">HISTORY</p>
          <h1 className="font-serif font-title-main text-text-body tracking-widest" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>{t('aboutTimeline_text_95')}</h1>
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
                alt={t('aboutTimeline_text_96')}
                className="w-full object-cover"
              />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4 select-none">
                <div className="w-10 h-[1px] bg-gold/40" />
                <div className="w-1.5 h-1.5 bg-gold opacity-50 rotate-45" />
                <div className="w-10 h-[1px] bg-gold/40" />
              </div>
              <p className="font-serif text-text-mid text-base leading-relaxed tracking-wider">{t("aboutTimelinePage_text_31787")}<br />
                神事や祭会、うるわしい建造物、宝物などに<br />{t("aboutTimelinePage_text_74438")}</p>
            </div>
          </div>
        </FadeIn>

        {/* View toggle */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-12 select-none">
            <div className="flex border border-gold/35 rounded-sm overflow-hidden shadow-sm bg-white/50">
              {[
                { key: 'vertical' as const, icon: <GitCommitVertical size={14} />, label: t('aboutTimeline_text_97') },
                { key: 'table'    as const, icon: <LayoutList size={14} />,        label: t('aboutTimeline_text_98')  },
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
              { label: t('aboutTimeline_text_99'), to: '/about/history' },
              { label: t('aboutTimeline_text_100'), to: '/about/deities' }
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
