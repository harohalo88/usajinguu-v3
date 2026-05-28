'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  // Japanese Tags
  'お知らせ':   { bg: 'rgba(165,0,0,0.08)',   color: '#a50000' },
  '祭事':       { bg: 'rgba(226,80,31,0.08)',  color: '#c04010' },
  'モノレール': { bg: 'rgba(162,122,40,0.1)',   color: '#7a5c1a' },
  
  // Traditional Chinese Tags
  '公告':       { bg: 'rgba(165,0,0,0.08)',   color: '#a50000' },
  '活動':       { bg: 'rgba(226,80,31,0.08)',  color: '#c04010' },
  '纜車':       { bg: 'rgba(162,122,40,0.1)',   color: '#7a5c1a' },
  
  // Simplified Chinese Tags
  '缆车':       { bg: 'rgba(162,122,40,0.1)',   color: '#7a5c1a' },
  
  // English Tags
  'Notice':     { bg: 'rgba(165,0,0,0.08)',   color: '#a50000' },
  'Event':      { bg: 'rgba(226,80,31,0.08)',  color: '#c04010' },
  'Monorail':   { bg: 'rgba(162,122,40,0.1)',   color: '#7a5c1a' },
  
  // Korean Tags
  '공지':       { bg: 'rgba(165,0,0,0.08)',   color: '#a50000' },
  '행사':       { bg: 'rgba(226,80,31,0.08)',  color: '#c04010' },
  '모노레일':   { bg: 'rgba(162,122,40,0.1)',   color: '#7a5c1a' },
};

function getTagStyle(tag: string) {
  return TAG_COLORS[tag] || { bg: 'rgba(122,106,90,0.1)', color: '#7a6a5a' };
}

export function NewsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = useTranslations();
  const locale = useLocale();

  const newsKeys = ['0', '1', '2', '3', '4'];

  return (
    <section id="news" ref={ref} className="bg-stone py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <p className="font-sans text-gold text-[0.65rem] tracking-[0.3em] uppercase mb-1.5">
              {t('newsTitleEn')}
            </p>
            <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide">
              {t('newsTitle')}
            </h2>
          </div>

          <div className="hidden sm:block flex-1 mx-8 h-[1px] bg-gradient-to-r from-gold/45 to-transparent mb-2" />

          <Link
            href={`/${locale}/news`}
            className="group flex items-center gap-2 text-xs font-sans text-vermil tracking-wider hover:opacity-75 transition-all"
          >
            {t('newsViewAll')}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* News Items list container */}
        <div className="rounded border border-crimson/10 overflow-hidden shadow-sm bg-white/75">
          {newsKeys.map((key, i) => {
            const date = t(`newsItems.${key}.date`);
            const tag = t(`newsItems.${key}.tag`);
            const title = t(`newsItems.${key}.title`);
            const tagStyle = getTagStyle(tag);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              >
                <Link
                  href={`/${locale}/news/${i + 1}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 hover:bg-crimson/[0.03] transition-colors duration-300 border-b border-crimson/5 last:border-b-0"
                >
                  <span className="font-sans text-text-mute text-xs tracking-wider min-w-[110px]">
                    {date}
                  </span>
                  <span
                    className="shrink-0 inline-flex items-center justify-center px-2.5 py-0.5 rounded-sm text-[0.65rem] tracking-wider font-sans select-none min-w-[64px]"
                    style={{ backgroundColor: tagStyle.bg, color: tagStyle.color }}
                  >
                    {tag}
                  </span>
                  <span className="flex-1 font-sans text-text-body text-sm font-light leading-relaxed">
                    {title}
                  </span>
                  <ArrowRight size={14} className="shrink-0 hidden sm:block text-gold/60 group-hover:text-gold transition-all duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
