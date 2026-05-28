'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Train, Car, Bus, ParkingCircle, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const C = {
  crimson:  '#a50000',
  vermil:   '#e2501f',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
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

export function AccessSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqsKeys = ['0', '1', '2', '3', '4'];
  const faqs = faqsKeys.map((key) => ({
    q: t(`faqs.${key}.q`),
    a: t(`faqs.${key}.a`),
  }));

  const transportItems = [
    { icon: Train,         label: t('byTrain'),  desc: t('byTrainDesc')  },
    { icon: Car,           label: t('byCar'),    desc: t('byCarDesc')    },
    { icon: Bus,           label: t('byBus'),    desc: t('byBusDesc')    },
    { icon: ParkingCircle, label: t('parking'),  desc: t('parkingDesc')  },
  ];

  return (
    <section id="access" className="bg-ivory overflow-hidden">
      {/* ── Access Info ── */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="mb-12 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-1.5">{t('accessTitleEn')}</p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wide">{t('accessTitle')}</h2>
              <div className="mt-3.5 h-[2px] w-9 bg-vermil opacity-70" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info panel */}
            <FadeIn>
              <div className="mb-8 p-6 bg-stone border border-crimson/10 rounded-sm shadow-sm select-text">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={16} className="text-vermil mt-0.5 shrink-0" />
                  <p className="font-sans text-text-body text-sm leading-relaxed">{t('accessAddress')}</p>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={14} className="text-crimson shrink-0" />
                  <p className="font-sans text-text-body text-sm">{t('accessPhone')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-crimson shrink-0" />
                  <p className="font-sans text-text-body text-sm">{t('accessHours')}</p>
                </div>
              </div>

              <div className="space-y-3">
                {transportItems.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 p-4 bg-ivory border border-crimson/10 rounded-sm shadow-sm">
                      <div className="flex items-center justify-center w-10 h-10 shrink-0 bg-crimson/5 rounded-sm select-none">
                        <item.icon size={16} className="text-crimson" />
                      </div>
                      <div className="select-text">
                        <h4 className="font-serif text-crimson text-sm font-normal tracking-wider mb-1">{item.label}</h4>
                        <p className="font-sans text-text-mute text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            {/* Premium Custom Map Layout */}
            <FadeIn delay={0.2}>
              <div className="w-full h-full relative overflow-hidden rounded-sm shadow-sm select-none" style={{ minHeight: '400px', backgroundColor: '#ede5d9', border: `1px solid ${C.border}` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {[20, 40, 60, 80].map((pos) => (
                      <React.Fragment key={pos}>
                        <div style={{ position: 'absolute', top: `${pos}%`, left: 0, right: 0, height: '1px', backgroundColor: 'rgba(165,0,0,0.08)' }} />
                        <div style={{ position: 'absolute', left: `${pos}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(165,0,0,0.08)' }} />
                      </React.Fragment>
                    ))}
                    {/* Mock Roads */}
                    <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, height: '3px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '3px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
                    <div style={{ position: 'absolute', top: '30%', left: 0, right: '40%', height: '2px', backgroundColor: 'rgba(165,0,0,0.15)' }} />
                    <div style={{ position: 'absolute', top: '65%', left: '30%', right: 0, height: '2px', backgroundColor: 'rgba(165,0,0,0.15)' }} />
                    
                    {/* Shrine marker */}
                    <div style={{ position: 'absolute', top: '42%', left: '47%', transform: 'translate(-50%, -50%)' }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: C.crimson, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', boxShadow: '0 3px 14px rgba(165,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="flex items-center justify-center w-full h-full" style={{ transform: 'rotate(45deg)', color: '#faf8f5', fontSize: '0.8rem' }}>⛩</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="px-3 py-1.5 bg-ivory/95 rounded-sm backdrop-blur-sm">
                    <p className="font-serif text-crimson text-xs font-normal tracking-wide">{t('openingTitle')}</p>
                    <p className="font-sans text-text-mute text-[0.65rem]">{t('accessAddress')}</p>
                  </div>
                  <div className="px-3 py-1 bg-crimson shadow-sm">
                    <p className="font-sans text-ivory text-[0.6rem] tracking-widest font-normal">MAP</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="py-20 bg-stone">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center mb-12 select-none">
              <p className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase mb-2">{t('faqTitleEn')}</p>
              <h2 className="font-serif text-crimson text-2xl md:text-3xl font-normal tracking-wider">{t('faqTitle')}</h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-10 h-[1px]" style={{ backgroundColor: 'rgba(162,122,40,0.4)' }} />
                <div className="w-1.5 h-1.5 bg-gold opacity-65 rotate-45" />
                <div className="w-10 h-[1px]" style={{ backgroundColor: 'rgba(162,122,40,0.4)' }} />
              </div>
            </div>
          </FadeIn>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className="border border-crimson/10 rounded-sm overflow-hidden transition-colors duration-300"
                  style={{ backgroundColor: openFaq === i ? C.ivory : 'rgba(250,248,245,0.65)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left px-6 py-4 gap-4 bg-transparent border-0 cursor-pointer outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-vermil text-xs tracking-wider mt-0.5 shrink-0">Q</span>
                      <span className="font-sans text-text-body text-sm font-light leading-relaxed">{faq.q}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-crimson shrink-0 transition-transform duration-300"
                      style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 flex gap-4 border-t border-crimson/5">
                          <span className="font-serif text-gold text-xs tracking-wider mt-3.5 shrink-0">A</span>
                          <p className="font-sans text-text-mid text-sm leading-relaxed pt-3 select-text">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact Block ── */}
      <div id="contact" className="py-20 bg-crimson">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center select-none">
          <FadeIn>
            <p className="font-sans text-gold-lt/90 text-[0.62rem] tracking-[0.3em] uppercase mb-2">CONTACT</p>
            <h2 className="font-serif text-ivory text-2xl md:text-3xl font-light tracking-widest mb-4">{t('navContact')}</h2>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-[1px] bg-gold/40" />
              <div className="w-1.5 h-1.5 bg-gold/65 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/40" />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${t('accessPhone').replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2.5 px-8 py-3 bg-gold/15 border border-gold/40 text-gold-lt font-sans text-sm tracking-wider transition-all duration-300 hover:bg-gold/25"
              >
                <Phone size={14} />
                {t('accessPhone').replace('TEL: ', '')}
              </a>
              <a
                href={`/${locale}/contact`}
                className="px-8 py-3 bg-gold text-ivory font-sans text-sm tracking-widest shadow-sm transition-all duration-300 hover:bg-gold-lt"
              >
                {t('navContact')}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
