'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const PURIFY_IMG  = 'https://images.unsplash.com/photo-1761453103736-ef3134c7175b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const ROPE_IMG    = 'https://images.unsplash.com/photo-1770793371761-55b65c44ad2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const WEDDING_IMG = 'https://images.unsplash.com/photo-1766149907512-7bb3e9dde820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const FOREST_IMG  = 'https://images.unsplash.com/photo-1763231185100-66c93ee515f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const C = {
  crimson:  '#a50000',
  vermil:   '#e2501f',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  brown:    '#873800',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  stoneDk:  '#ede5d9',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
  border:   'rgba(165,0,0,0.1)',
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

function SectionBadge({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="mb-8 select-none">
      <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-1.5">{en}</p>
      <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide leading-snug">{ja}</h2>
      <div className="mt-3.5 h-[2px] w-9 bg-vermil opacity-70" />
    </div>
  );
}

export function WorshipGuide() {
  const t = useTranslations();
  const locale = useLocale();

  const etiquetteKeys = ['0', '1', '2', '3'];
  const groundsKeys = ['0', '1', '2', '3', '4', '5'];
  const prayerKeys = ['0', '1', '2', '3', '4', '5', '6', '7'];
  const amuletKeys = ['0', '1', '2', '3', '4', '5'];

  return (
    <section id="worship" className="bg-ivory select-text">

      {/* ── Full-width forest banner ── */}
      <div className="relative w-full overflow-hidden select-none" style={{ height: '300px' }}>
        <img 
          src={FOREST_IMG} 
          alt="参拝" 
          className="w-full h-full object-cover" 
          style={{ objectPosition: 'center 30%' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0404]/85 via-[#1a0404]/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="font-sans text-gold-lt text-[0.62rem] tracking-[0.3em] uppercase mb-2"
          >
            {t('worshipTitleEn')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-ivory text-3xl md:text-4xl font-light tracking-wide leading-tight"
          >
            {t('worshipTitle')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-ivory/75 text-sm max-w-[480px] leading-relaxed mt-3"
          >
            {t('worshipIntro')}
          </motion.p>
        </div>
      </div>

      {/* ── Etiquette (二礼四拍手一礼) ── */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-2">
                {t('etiquetteTitleEn')}
              </p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-[0.2em]">
                {t('etiquetteTitle')}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-10 h-[1px] bg-gold/40" />
                <div className="w-1.5 h-1.5 bg-gold opacity-65 rotate-45" />
                <div className="w-10 h-[1px] bg-gold/40" />
              </div>
            </div>
          </FadeIn>

          {/* Unique Shinto Ritual Warning Banner */}
          <FadeIn delay={0.1}>
            <div 
              className="mb-14 p-8 md:p-10 relative overflow-hidden rounded border border-gold/30 shadow-md bg-crimson"
            >
              <div className="absolute top-0 right-0 w-48 h-48 opacity-10 bg-radial from-vermil to-transparent" />
              <div className="relative flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-64 shrink-0">
                  <p className="font-sans text-gold-lt text-[0.62rem] tracking-[0.3em] mb-2 uppercase select-none">
                    SPECIAL METHOD
                  </p>
                  <h3 className="font-serif text-ivory text-xl font-normal tracking-wider">
                    {t('etiquetteSpecial')}
                  </h3>
                </div>
                <div className="hidden md:block self-stretch w-[1px] bg-gold/30 mx-4" />
                <p className="font-sans text-ivory/90 text-sm leading-relaxed flex-1 select-text">
                  {t('etiquetteSpecialDesc')}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Etiquette Steps Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {etiquetteKeys.map((key, i) => {
              const num = t(`etiquetteSteps.${key}.num`);
              const title = t(`etiquetteSteps.${key}.title`);
              const desc = t(`etiquetteSteps.${key}.desc`);

              return (
                <FadeIn key={key} delay={i * 0.08}>
                  <div className="p-6 h-full flex flex-col bg-stone border border-crimson/10 rounded-sm">
                    <div className="flex items-center justify-center w-10 h-10 mb-5 bg-ivory border border-gold/30 select-none">
                      <span className="font-serif text-vermil text-base font-medium">{num}</span>
                    </div>
                    <h4 className="font-serif text-crimson text-sm font-normal tracking-wider mb-2.5">
                      {title}
                    </h4>
                    <p className="font-sans text-text-mid text-xs leading-relaxed flex-1 select-text">
                      {desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Grounds ── */}
      <div className="py-20 bg-stone">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <SectionBadge en={t('groundsTitleEn')} ja={t('groundsTitle')} />
              <div className="grid grid-cols-2 gap-3">
                {groundsKeys.map((key) => {
                  const name = t(`groundsAreas.${key}.name`);
                  const desc = t(`groundsAreas.${key}.desc`);
                  const icon = t(`groundsAreas.${key}.icon`);

                  return (
                    <div key={key} className="p-4 bg-ivory border border-crimson/10 rounded-sm shadow-sm">
                      <div className="flex items-center gap-2 mb-2 select-none">
                        <span className="text-base">{icon}</span>
                        <h4 className="font-serif text-crimson text-xs font-normal tracking-wide">{name}</h4>
                      </div>
                      <p className="font-sans text-text-mute text-[0.72rem] leading-relaxed select-text">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-sm shadow-md" style={{ height: '480px' }}>
                <img src={ROPE_IMG} alt="境内" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent z-10" />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p className="font-serif text-gold-lt text-xs tracking-widest select-none">宇佐神宮境内</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Prayer & Off-site ── */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn>
              <SectionBadge en={t('prayerTitleEn')} ja={t('prayerTitle')} />
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-5 select-text">
                {t('prayerText')}
              </p>
              
              {/* Age-based calculations highlighting */}
              <div className="p-5 mb-6 bg-crimson/[0.04] border border-crimson/15 border-l-4 border-l-vermil rounded-sm">
                <h4 className="font-serif text-crimson text-base font-normal tracking-wider mb-2 select-none">
                  {t('yaku')}
                </h4>
                <p className="font-sans text-text-mid text-xs leading-relaxed select-text">
                  {t('yakuText')}
                </p>
              </div>
              
              {/* Grid of core shrine prayers */}
              <div className="grid grid-cols-4 gap-2 select-none">
                {prayerKeys.map((key) => (
                  <div key={key} className="py-2.5 px-1 text-center bg-stone border border-crimson/10 rounded-sm">
                    <span className="font-serif text-crimson text-[0.72rem] tracking-wider font-light">
                      {t(`prayers.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <SectionBadge en={t('offsiteTitleEn')} ja={t('offsiteTitle')} />
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-8 select-text">
                {t('offsiteText')}
              </p>
              
              {/* Monorail and local access information */}
              <div className="p-6 bg-stone border border-crimson/10 rounded-sm shadow-sm">
                <div className="flex items-center gap-2.5 mb-3.5 select-none">
                  <Cpu size={16} className="text-crimson" />
                  <h4 className="font-serif text-crimson text-sm font-normal tracking-wider">
                    {t('monorailTitle')}
                  </h4>
                </div>
                <p className="font-sans text-text-mid text-xs leading-relaxed mb-4 select-text">
                  {t('monorailText')}
                </p>
                {[t('monorailHours'), t('monorailFee'), t('monorailNote')].map((info, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1.5 select-text">
                    <div className="w-1 h-1 bg-vermil rounded-full mt-2 flex-shrink-0" />
                    <p className="font-sans text-text-mute text-[0.78rem] leading-normal">
                      {info}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Amulets & Shinto Wedding ── */}
      <div className="py-20 bg-stone">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Amulets */}
            <FadeIn>
              <SectionBadge en={t('amuletsTitleEn')} ja={t('amuletsTitle')} />
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-5 select-text">
                {t('amuletsText')}
              </p>
              <div className="space-y-2">
                {amuletKeys.map((key) => {
                  const name = t(`amuletItems.${key}.name`);
                  const desc = t(`amuletItems.${key}.desc`);

                  return (
                    <div key={key} className="flex items-center gap-4 p-3 bg-ivory border border-crimson/10 rounded-sm shadow-sm">
                      <div className="w-1 h-1 bg-vermil rounded-full flex-shrink-0" />
                      <span className="font-serif text-crimson text-xs font-normal tracking-wide min-w-[70px] select-none">
                        {name}
                      </span>
                      <span className="font-sans text-text-mute text-[0.78rem] leading-relaxed flex-1 select-text">
                        {desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Shinto Wedding */}
            <FadeIn delay={0.15}>
              <div className="relative overflow-hidden mb-6 rounded-sm shadow-md" style={{ height: '260px' }}>
                <img src={WEDDING_IMG} alt={t('weddingTitle')} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0404]/75 to-transparent z-10" />
                <div className="absolute bottom-4 left-6 z-20">
                  <span className="font-serif text-gold-lt text-[0.65rem] tracking-widest block mb-0.5 select-none">
                    {t('weddingTitleEn')}
                  </span>
                  <h3 className="font-serif text-ivory text-xl font-normal tracking-wider">
                    {t('weddingTitle')}
                  </h3>
                </div>
              </div>
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-6 select-text">
                {t('weddingText')}
              </p>
              
              <Link
                href={`/${locale}/wedding`}
                className="group inline-flex items-center gap-3 px-6 py-3 transition-all duration-300 bg-crimson hover:bg-crimson/95 text-ivory font-sans text-xs tracking-wider border-0 outline-none cursor-pointer rounded-sm"
              >
                <span>{t('weddingInquiry')}</span>
                <span className="transition-transform group-hover:translate-x-1">›</span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Visual Purification Banner ── */}
      <div className="relative w-full overflow-hidden select-none" style={{ height: '240px' }}>
        <img src={PURIFY_IMG} alt="手水" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a0404]/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="font-serif text-gold-lt/90 text-[0.65rem] tracking-[0.3em] mb-2.5">
              WORSHIP ETIQUETTE
            </p>
            <p className="font-serif text-ivory text-lg md:text-xl font-light tracking-wide">
              {t('etiquetteSpecial')}
            </p>
            <p className="font-sans text-ivory/70 text-xs mt-2.5 tracking-wider max-w-md">
              {t('etiquetteSpecialDesc').split('。')[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
