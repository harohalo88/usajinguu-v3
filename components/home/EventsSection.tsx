'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const FESTIVAL_IMG = '/images/cb78fa02bdebd6d17d40abaf4f258ed95eceed28.png'; // Mikoshi
const AUTUMN_IMG   = '/images/e81c6decfbb240a94172c794c450041546333d9a.png'; // Shrine scenery

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
  border:   'rgba(165,0,0,0.1)',
};

const TYPE_COLORS: Record<string, string> = {
  '月例': C.brown,    'Monthly': C.brown,  '월례': C.brown,
  '祭事': C.crimson,  'Festival': C.crimson, '제사': C.crimson,
  '神楽': C.gold,     'Kagura': C.gold,    '가구라': C.gold,
  '神樂': C.gold,     '神乐': C.gold,
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EventsSection() {
  const t = useTranslations();
  const tFestivals = useTranslations('festivals');
  const tSchedule = useTranslations('scheduleItems');

  const festivalsKeys = ['0', '1', '2', '3', '4', '5', '6', '7'];
  const scheduleKeys = ['0', '1', '2', '3', '4'];

  // Highlight indices: festivals 0, 3, 4 are the major ones (Gozaburaku, Hojoe, Autumn)
  const HIGHLIGHT_KEYS = new Set(['0', '3', '4']);

  // Parse festivals — highlight is a hardcoded index, NOT a translation key
  const festivals = festivalsKeys.map((key) => ({
    month: tFestivals(`${key}.month`),
    name: tFestivals(`${key}.name`),
    date: tFestivals(`${key}.date`),
    desc: tFestivals(`${key}.desc`),
    highlight: HIGHLIGHT_KEYS.has(key),
  }));

  // Parse schedule items
  const scheduleItems = scheduleKeys.map((key) => ({
    date: tSchedule(`${key}.date`),
    name: tSchedule(`${key}.name`),
    time: tSchedule(`${key}.time`),
    type: tSchedule(`${key}.type`),
  }));

  const highlightFests = festivals.filter((f) => f.highlight);
  const regularFests = festivals.filter((f) => !f.highlight);

  return (
    <section id="festivals" className="bg-ivory overflow-hidden">
      {/* ── Hero Banner ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '360px' }}>
        <img
          src={FESTIVAL_IMG}
          alt="お祭り"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/72" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-gold-lt text-[0.62rem] tracking-[0.35em] uppercase mb-2.5"
          >
            {t('festivalsTitleEn')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-widest leading-snug max-w-2xl"
          >
            {t('festivalsTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-ivory/75 text-sm leading-relaxed max-w-lg mt-3 select-text"
          >
            {t('festivalsIntro')}
          </motion.p>
        </div>
      </div>

      {/* ── Highlighted Festivals ── */}
      <div className="py-20 bg-stone">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-1.5">{t('majorFestivalsTitleEn')}</p>
                <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide">{t('majorFestivalsTitle')}</h2>
                <div className="mt-3.5 h-[2px] w-9 bg-vermil opacity-70" />
              </div>
            </div>
          </FadeIn>

          {/* Highlight cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {highlightFests.slice(0, 3).map((festival, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden bg-[#1a0404] border border-vermil/20 h-full flex flex-col justify-between">
                  <div className="p-6 flex flex-col h-full min-h-[12rem]">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-vermil/10 border border-vermil/25 rounded-sm">
                      <span className="font-serif text-gold-lt text-xs tracking-widest">{festival.month}</span>
                    </div>
                    <h3 className="font-serif text-ivory text-lg font-normal tracking-wide mb-1">{festival.name}</h3>
                    <p className="font-sans text-gold-lt text-xs tracking-wider mb-3">{festival.date}</p>
                    <p className="font-sans text-ivory/75 text-xs leading-relaxed flex-1 select-text">{festival.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="w-1.5 h-1.5 bg-vermil rotate-45 opacity-80" />
                  </div>
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-vermil opacity-60" />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Regular festivals */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regularFests.map((festival, i) => (
              <FadeIn key={i} delay={(i % 4) * 0.06}>
                <div className="p-5 h-full bg-ivory border border-crimson/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 select-none">
                      <span className="inline-block px-2 py-0.5 font-sans bg-crimson/5 text-crimson text-[0.6rem] tracking-wider rounded-sm">
                        {festival.month}
                      </span>
                      <span className="font-sans text-gold text-xs tracking-wider">{festival.date}</span>
                    </div>
                    <h4 className="font-serif text-text-body text-sm font-normal tracking-wide mb-2">{festival.name}</h4>
                    <p className="font-sans text-text-mute text-xs leading-relaxed select-text">{festival.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Monthly Schedule ── */}
      <div className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="mb-10 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-1.5">{t('scheduleTitleEn')}</p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide">{t('scheduleTitle')}</h2>
              <div className="mt-3.5 h-[2px] w-9 bg-vermil opacity-70" />
            </div>
          </FadeIn>

          <div className="overflow-hidden border border-crimson/10 bg-white/50 rounded-sm">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-0 px-6 py-3 bg-crimson text-left select-none">
              {['DATE', 'EVENT', 'TIME', 'TYPE'].map((h) => (
                <span key={h} className="font-sans text-ivory/80 text-[0.6rem] tracking-widest font-normal">{h}</span>
              ))}
            </div>
            {scheduleItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  className="grid grid-cols-4 gap-0 px-6 py-4 items-center border-b border-crimson/5 last:border-b-0"
                  style={{ backgroundColor: i % 2 === 0 ? C.ivory : 'rgba(242,236,228,0.35)' }}
                >
                  <span className="font-sans text-text-mute text-xs tracking-wider">{item.date}</span>
                  <span className="font-serif text-text-body text-sm font-normal tracking-wide select-text">{item.name}</span>
                  <span className="font-sans text-text-mute text-xs">{item.time}</span>
                  <div>
                    <span
                      className="inline-flex px-2.5 py-0.5 font-sans rounded-sm text-[0.62rem] tracking-wider select-none"
                      style={{
                        backgroundColor: `${(TYPE_COLORS[item.type] || C.textMute)}18`,
                        color: TYPE_COLORS[item.type] || C.textMute,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-4 font-sans text-text-mute text-xs tracking-wider leading-relaxed select-text">
              {t('scheduleNote')}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Bottom Banner ── */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        <img
          src={AUTUMN_IMG}
          alt="秋祭り"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="font-serif text-gold-lt text-[0.65rem] tracking-[0.35em] uppercase mb-3">
            ANNUAL CEREMONIES
          </div>
          <p className="font-serif text-ivory text-xl md:text-2xl font-light tracking-[0.2em] select-none">
            古来より続く　神聖な祭儀
          </p>
        </div>
      </div>
    </section>
  );
}
