'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const SHRINE_IMG = 'https://images.unsplash.com/photo-1771517708550-37cf748b3056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
const WATER_IMG  = 'https://images.unsplash.com/photo-1761453103736-ef3134c7175b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const BUDDHA_IMG = 'https://images.unsplash.com/photo-1653998046908-0d30b3c2bd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const NIGHT_IMG  = 'https://images.unsplash.com/photo-1728227842552-f891d58e7000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';
const MUSEUM_IMG = 'https://images.unsplash.com/photo-1764032758647-34ce5a6948a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

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
  goldLine: 'rgba(162,122,40,0.4)',
};

function SectionBadge({ en, ja, light = false }: { en: string; ja: string; light?: boolean }) {
  return (
    <div className="mb-6 select-none">
      <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-1.5">{en}</p>
      <h2 
        className="font-serif text-2xl md:text-3xl font-normal tracking-wide leading-snug"
        style={{ color: light ? C.ivory : C.crimson }}
      >
        {ja}
      </h2>
      <div className="mt-3.5 h-[2px] w-9 bg-vermil opacity-70" />
    </div>
  );
}

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-10 h-[1px]" style={{ backgroundColor: C.goldLine }} />
      <div className="w-1.5 h-1.5 opacity-65 rotate-45" style={{ backgroundColor: C.gold }} />
      <div className="w-10 h-[1px]" style={{ backgroundColor: C.goldLine }} />
    </div>
  );
}

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

export function AboutSection() {
  const t = useTranslations();

  const legendCards = [
    { title: t('legend1Title'), subtitle: t('legend1Subtitle'), text: t('legend1Text'), img: WATER_IMG,  accent: C.crimson },
    { title: t('legend2Title'), subtitle: t('legend2Subtitle'), text: t('legend2Text'), img: BUDDHA_IMG, accent: C.brown  },
    { title: t('legend3Title'), subtitle: t('legend3Subtitle'), text: t('legend3Text'), img: NIGHT_IMG,  accent: C.crimson },
    { title: t('legend4Title'), subtitle: t('legend4Subtitle'), text: t('legend4Text'), img: SHRINE_IMG, accent: C.gold   },
  ];

  const timelineKeys = ['0', '1', '2', '3', '4', '5', '6', '7'];

  return (
    <section id="about" className="bg-ivory overflow-hidden">

      {/* ── History ── */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionBadge en={t('historyTitleEn')} ja={t('historyTitle')} />
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-5 select-text">
                {t('historyText1')}
              </p>
              <p className="font-sans text-text-mid text-sm leading-relaxed select-text">
                {t('historyText2')}
              </p>
              <div className="mt-8 flex items-center gap-3 select-none">
                <div className="w-8 h-[1px] bg-gold opacity-50" />
                <span className="font-serif text-gold text-xs tracking-widest">{t('aboutsection_text_1')}</span>
                <div className="w-8 h-[1px] bg-gold opacity-50" />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border border-gold/20 z-0" />
                <img 
                  src={SHRINE_IMG} 
                  alt={t('aboutsection_text_2')} 
                  className="w-full object-cover relative z-10 rounded-sm shadow-sm" 
                  style={{ height: '400px', objectPosition: 'center' }} 
                />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 z-20 bg-black/70 backdrop-blur-sm rounded-sm">
                  <span className="font-serif text-gold-lt text-[0.65rem] tracking-widest">
                    本殿 / 国宝
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Deities ── */}
      <div className="py-24 bg-stone">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-14 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-2">
                {t('deitiesTitleEn')}
              </p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-[0.2em]">
                {t('deitiesTitle')}
              </h2>
              <DiamondDivider />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: t('deity1Name'), name2: t('deity1Name2'), desc: t('deity1Desc'), num: t('aboutsection_text_3'), accent: C.crimson },
              { name: t('deity2Name'), name2: t('deity2Name2'), desc: t('deity2Desc'), num: t('aboutsection_text_4'), accent: C.brown   },
              { name: t('deity3Name'), name2: t('deity3Name2'), desc: t('deity3Desc'), num: t('aboutsection_text_5'), accent: C.gold    },
            ].map((deity, i) => {
              // Standardize local deity indicators safely
              const deityNums = [t('deity1Name2'), t('deity2Name2'), t('deity3Name2')];
              const deityLabels = [t('aboutsection_text_8'), t('aboutsection_text_7'), t('aboutsection_text_6')];
              
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <div 
                    className="p-8 flex flex-col h-full relative overflow-hidden bg-ivory border border-crimson/10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div 
                      className="h-[2px] mb-6 w-9" 
                      style={{ backgroundColor: deity.accent }} 
                    />
                    <span 
                      className="font-sans text-[0.6rem] tracking-[0.25em] mb-2.5 opacity-85 select-none"
                      style={{ color: deity.accent }}
                    >
                      {deityLabels[i]}
                    </span>
                    <h3 className="font-serif text-text-body text-xl font-normal tracking-wide leading-normal">
                      {deity.name}
                    </h3>
                    <p className="font-serif text-text-mute text-xs tracking-wider mb-4 mt-1">
                      {deity.name2}
                    </p>
                    <p className="font-sans text-text-mid text-sm leading-relaxed flex-1 select-text">
                      {deity.desc}
                    </p>
                    <div 
                      className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 opacity-15" 
                      style={{ borderColor: deity.accent }} 
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Legends ── */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-14 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-2">
                {t('legendsTitleEn')}
              </p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide">
                {t('legendsTitle')}
              </h2>
              <DiamondDivider />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {legendCards.map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-sm border border-crimson/10 shadow-sm">
                  <div className="overflow-hidden relative" style={{ height: '200px' }}>
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="font-sans text-gold-lt/90 text-[0.6rem] tracking-widest block mb-0.5 select-none">
                        {card.subtitle}
                      </span>
                      <h3 className="font-serif text-ivory text-lg font-normal tracking-wider">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 bg-ivory">
                    <p className="font-sans text-text-mid text-sm leading-relaxed select-text">
                      {card.text}
                    </p>
                  </div>
                  <div 
                    className="absolute top-0 left-0 bottom-0 w-[2px] opacity-50" 
                    style={{ backgroundColor: card.accent }} 
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="py-24 bg-[#1a0a0a]">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-16 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-2">
                {t('timelineTitleEn')}
              </p>
              <h2 className="font-serif text-ivory text-2xl md:text-3xl font-normal tracking-[0.2em]">
                {t('timelineTitle')}
              </h2>
              <DiamondDivider />
            </div>
          </FadeIn>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px hidden md:block w-[1px] bg-gold/20" />
            {/* Left mobile line */}
            <div className="absolute left-6 top-0 bottom-0 md:hidden w-[1px] bg-gold/20" />

            {timelineKeys.map((key, i) => {
              const year = t(`timelineEvents.${key}.year`);
              const era = t(`timelineEvents.${key}.era`);
              const event = t(`timelineEvents.${key}.event`);

              return (
                <FadeIn key={key} delay={i * 0.06}>
                  <div className={`relative flex gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-10 md:pl-0`}>
                      <div className="inline-block mb-2.5 px-2.5 py-0.5 bg-gold/15 border border-gold/20 rounded-sm">
                        <span className="font-serif text-gold-lt text-xs tracking-wider">
                          {year} {era && `— ${era}`}
                        </span>
                      </div>
                      <p className="font-sans text-ivory/80 text-sm leading-relaxed select-text">
                        {event}
                      </p>
                    </div>
                    
                    {/* Timeline bullet nodes */}
                    <div className="hidden md:flex absolute left-1/2 top-3 -translate-x-1/2">
                      <div className="w-2 h-2 bg-vermil rounded-full shadow-[0_0_0_3px_rgba(226,80,31,0.18)]" />
                    </div>
                    <div className="md:hidden absolute left-3.5 top-3">
                      <div className="w-2 h-2 bg-vermil rounded-full" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Museum ── */}
      <div className="py-24 bg-stone">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-sm shadow-md">
                <img 
                  src={MUSEUM_IMG} 
                  alt={t('museumTitle')} 
                  className="w-full object-cover relative z-10" 
                  style={{ height: '380px' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-20" />
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <SectionBadge en={t('museumTitleEn')} ja={t('museumTitle')} />
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-6 select-text">
                {t('museumText')}
              </p>
              <div className="space-y-3 p-5 bg-ivory border border-crimson/10 rounded-sm shadow-sm">
                {[t('museumHours'), t('museumFee'), t('museumClosed')].map((info, i) => (
                  <div key={i} className="flex items-start gap-3 select-text">
                    <div className="w-1 h-1 bg-vermil rounded-full mt-2.5 flex-shrink-0" />
                    <p className="font-sans text-text-mid text-xs leading-normal">
                      {info}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
