'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const IMG_CHOKUSHIMON = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_fill,g_auto,w_520,h_480/f_auto/q_auto/v1779961453/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E3%81%93%E3%82%99%E7%A5%AD%E7%A5%9E_img02_ai5dst.jpg';
const IMG_ICHINO      = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_crop,w_2100,h_2400,x_600,y_300/c_scale,w_560,h_640/f_auto/q_auto/v1779961440/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E3%81%93%E3%82%99%E7%A5%AD%E7%A5%9E_img03_zx656c.jpg';
const IMG_NINO        = '/images/ebea25b0b79be4de5408cbcabb0ca154084c31e0.png';
const IMG_SANNO       = '/images/72fae222054618f68438fc341245f268f8dab5e6.png';
const HEADER_IMG      = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_fill,g_auto,w_1600,h_450/f_auto/q_auto/v1780029960/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E3%81%93%E3%82%99%E7%A5%AD%E7%A5%9E_img01_dnksin.png';

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

function HighlightBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gold/5 border-l-4 border-l-gold p-5 mt-6 shadow-sm select-text">
      <p className="font-sans text-text-mid text-sm leading-relaxed italic">
        {children}
      </p>
    </div>
  );
}

interface DeitySectionProps {
  index:      number;
  heading:    string;
  subHeading: string;
  image:      string;
  imageAlt:   string;
  imageRight: boolean;
  text:       string;
  highlight:  string;
}

function DeitySection({
  index, heading, subHeading, image, imageAlt, imageRight, text, highlight,
}: DeitySectionProps) {
  const t = useTranslations();
  const accent = index === 1 ? C.gold : C.crimson;
  const number = [t('aboutDeities_text_3'), t('aboutDeities_text_2'), t('aboutDeities_text_1')][index];

  return (
    <FadeIn>
      <div className="py-16 border-t border-crimson/10">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          {/* Heading */}
          <div className="mb-8 select-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px]" style={{ backgroundColor: accent, opacity: 0.7 }} />
              <span className="font-sans text-[0.62rem] tracking-widest uppercase opacity-85" style={{ color: accent }}>
                {number}
              </span>
            </div>
            <h2 className="font-serif text-text-body text-xl md:text-2xl font-normal tracking-wide leading-snug">
              {heading}
            </h2>
            <p className="font-serif text-text-mute text-xs tracking-wider mt-1.5">
              {subHeading}
            </p>
            <div className="mt-3.5 h-[2px] w-8 opacity-75" style={{ backgroundColor: accent }} />
          </div>

          {/* Body content with image frame */}
          <div className={`flex flex-col ${imageRight ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-start`}>
            {/* Text column */}
            <div className="flex-1">
              <p className="font-sans text-text-mid text-sm leading-relaxed select-text">
                {text}
              </p>
              <HighlightBlock>{highlight}</HighlightBlock>
            </div>

            {/* Image frame */}
            <div className="w-full max-w-[280px] shrink-0 mx-auto md:mx-0 select-none">
              <div className="relative">
                <div
                  className="absolute top-2 w-full h-full border border-gold/25 z-0"
                  style={imageRight ? { right: -8 } : { left: -8 }}
                />
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-[320px] object-cover relative z-10 rounded-sm shadow-sm"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="font-serif text-gold-lt text-xs tracking-widest">
                    {imageAlt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function DeityPage() {
  const locale = useLocale();
  const t = useTranslations();

  const HACHIMAN_HEADING = t('aboutDeities_text_4');
  const HIME_HEADING     = t('aboutDeities_text_5');
  const JINGU_HEADING    = t('aboutDeities_text_6');

  return (
    <>
      {/* ══ Inner Page Header ══════════════════════════════════════════════ */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HEADER_IMG}
          alt={t('aboutDeities_text_7')}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/62" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-[64px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >{t("aboutDeitiesPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutDeitiesPage_text_44003")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutDeitiesPage_text_30788")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.6rem] tracking-[0.35em] uppercase mb-2.5">
              Enshrined Deities
            </p>
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.3em] drop-shadow-md" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{t("aboutDeitiesPage_text_30788")}</h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Body ════════════════════════════════════════════════════════════ */}
      <div className="bg-ivory">
        {/* Intro */}
        <FadeIn>
          <div className="py-16 border-b border-crimson/10">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="flex flex-col md:flex-row gap-10 items-start pb-4">
                {/* 勅使門 image */}
                <div className="w-full max-w-[260px] shrink-0 mx-auto md:mx-0 select-none">
                  <img
                    src={IMG_CHOKUSHIMON}
                    alt={t('aboutDeities_text_8')}
                    className="w-full h-[240px] object-cover rounded-sm border border-gold/20 shadow-sm"
                  />
                  <p className="font-sans text-text-mute text-xs tracking-wider mt-2.5 text-center">{t("aboutDeitiesPage_text_33295")}</p>
                </div>

                {/* Description and Anchors */}
                <div className="flex-1">
                  <div className="flex gap-4 mb-6">
                    <div className="w-[3px] h-14 bg-crimson/70 shrink-0 mt-1 select-none" />
                    <p className="font-sans text-text-mid text-sm leading-relaxed select-text">
                      勅使門（ちょくしもん）の奥に本殿があり、左より順に一之御殿、二之御殿、三之御殿と並びます。一之御殿から順に八幡大神、比売大神、神功皇后をお祀りしております。
                    </p>
                  </div>

                  {/* Fast anchor triggers */}
                  <div className="grid grid-cols-3 gap-3 select-none">
                    {[
                      { name: t('aboutDeities_text_10'), sub: t('aboutDeities_text_9'), anchor: '#hachiman', accent: C.crimson },
                      { name: t('aboutDeities_text_12'), sub: t('aboutDeities_text_11'), anchor: '#hime',     accent: C.gold    },
                      { name: t('aboutDeities_text_14'), sub: t('aboutDeities_text_13'), anchor: '#jingu',    accent: C.crimson  },
                    ].map((d, i) => (
                      <a
                        key={i}
                        href={d.anchor}
                        className="flex flex-col items-center p-3 text-center border transition-all rounded-sm shadow-sm"
                        style={{
                          borderColor: `${d.accent}33`,
                          backgroundColor: `${d.accent}08`,
                        }}
                      >
                        <span className="font-sans text-text-mute text-[0.62rem] tracking-widest">{d.sub}</span>
                        <span className="font-serif text-text-body text-xs font-semibold mt-1" style={{ color: d.accent }}>{d.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 一之御殿: 八幡大神 */}
        <div id="hachiman">
          <DeitySection
            index={0}
            heading={HACHIMAN_HEADING}
            subHeading="Hachiman Okami  •  Homudawake no Mikoto (Emperor Ojin)"
            image={IMG_ICHINO}
            imageAlt={t('aboutDeities_text_15')}
            imageRight={true}
            text={t('aboutDeities_text_16')}
            highlight={t('aboutDeities_text_17')}
          />
        </div>

        {/* 二之御殿: 比売大神 */}
        <div id="hime" className="bg-stone">
          <DeitySection
            index={1}
            heading={HIME_HEADING}
            subHeading="Hime Okami  •  The Three Goddesses of Munakata"
            image={IMG_NINO}
            imageAlt={t('aboutDeities_text_18')}
            imageRight={false}
            text={t('aboutDeities_text_19')}
            highlight={t('aboutDeities_text_20')}
          />
        </div>

        {/* 三之御殿: 神功皇后 */}
        <div id="jingu">
          <DeitySection
            index={2}
            heading={JINGU_HEADING}
            subHeading="Empress Jingu  •  Okinagatarashi-hime no Mikoto"
            image={IMG_SANNO}
            imageAlt={t('aboutDeities_text_21')}
            imageRight={true}
            text={t('aboutDeities_text_22')}
            highlight={t('aboutDeities_text_23')}
          />
        </div>
      </div>
    </>
  );
}
