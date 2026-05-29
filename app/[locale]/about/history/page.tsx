'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MAP_IMG = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_scale,w_440/f_auto/q_auto/v1779961439/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E7%94%B1%E7%B7%92_img02_lsgcyp.png';
const HERO_IMG = 'https://res.cloudinary.com/dxhqwmwz1/image/upload/c_fill,g_auto,w_1600,h_450/f_auto/q_auto/v1779961438/%E5%AE%87%E4%BD%90%E7%A5%9E%E5%AE%AE%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6_%E7%94%B1%E7%B7%92_img01_akjwkm.jpg'; // Torii scenery

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
};

function HL({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold" style={{ color: C.crimson }}>{children}</span>;
}

function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-10 select-none">
      <div className="w-10 h-[1px] bg-gold/30" style={{ backgroundColor: 'rgba(162,122,40,0.35)' }} />
      <div className="w-1.5 h-1.5 bg-gold/60 rotate-45" />
      <div className="w-10 h-[1px] bg-gold/30" style={{ backgroundColor: 'rgba(162,122,40,0.35)' }} />
    </div>
  );
}

function DeityTable() {
  const t = useTranslations();
  const rows = [
    {
      hall: t('aboutHistory_text_1'),
      reading: t('aboutHistory_text_2'),
      name: t('aboutHistory_text_3'),
      formalReading: t('aboutHistory_text_4'),
      formal: t('aboutHistory_text_5'),
    },
    {
      hall: t('aboutHistory_text_6'),
      reading: t('aboutHistory_text_7'),
      name: t('aboutHistory_text_8'),
      formalReading: t('aboutHistory_text_9'),
      formal: t('aboutHistory_text_10'),
    },
    {
      hall: t('aboutHistory_text_11'),
      reading: t('aboutHistory_text_12'),
      name: t('aboutHistory_text_13'),
      formalReading: t('aboutHistory_text_14'),
      formal: t('aboutHistory_text_15'),
    },
  ];

  return (
    <div className="border border-gold/35 bg-ivory/80 shadow-sm rounded-sm mb-12 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gold/10 border-b border-gold/25 py-3 text-center select-none">
        <span className="font-serif text-text-body text-sm tracking-[0.5em] font-normal">
          ご 祭 神
        </span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 px-6 py-4 border-b border-gold/15 last:border-b-0"
        >
          <div className="min-w-[80px] font-sans text-text-mute text-xs tracking-wider shrink-0 select-none">
            {row.hall}
          </div>

          <div className="min-w-[140px] shrink-0">
            <div className="font-sans text-text-mute text-[0.6rem] tracking-widest mb-0.5 select-none">
              {row.reading}
            </div>
            <div className="font-serif text-text-body text-base font-normal tracking-wider">
              {row.name}
            </div>
          </div>

          <div className="flex-1 mt-1 sm:mt-0 select-text">
            <div className="font-sans text-text-mute text-[0.6rem] tracking-widest mb-0.5 select-none">
              {row.formalReading}
            </div>
            <div className="font-sans text-text-mid text-xs tracking-wider">
              ［ {row.formal} ］
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 mb-5 select-none">
      <div className="flex items-center gap-3">
        <div className="w-6 h-[1px] bg-crimson/60" />
        <h2 className="font-serif text-crimson text-lg font-normal tracking-wide">
          {children}
        </h2>
      </div>
      <div className="mt-2 h-[1px] w-full bg-crimson/10" />
    </div>
  );
}

function P({ children, indent = false }: { children: React.ReactNode; indent?: boolean }) {
  return (
    <p
      className={`font-sans text-text-mid text-sm leading-relaxed mb-5 select-text ${
        indent ? 'indent-4 sm:indent-8' : ''
      }`}
    >
      {children}
    </p>
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

export default function HistoryPage() {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      {/* ══ Inner Page Header ═══════════════════════════════════════════════ */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt={t('aboutHistory_text_16')}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/48 to-black/65" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-[64px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >{t("aboutHistoryPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutHistoryPage_text_44003")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("aboutHistoryPage_text_38805")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.6rem] tracking-[0.35em] uppercase mb-2.5">
              History &amp; Origin
            </p>
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.3em] drop-shadow-md" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{t("aboutHistoryPage_text_38805")}</h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Body ════════════════════════════════════════════════════════════ */}
      <div className="bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          {/* ご祭神 summary table */}
          <FadeIn>
            <DeityTable />
          </FadeIn>

          {/* Opening paragraphs */}
          <FadeIn delay={0.05}>
            <P>
              八幡さまは古くより多くの人々に親しまれ、<HL>{t('aboutHistory_text_17')}</HL>されてきました。
            </P>
            <P>
              全国約１１万の神社のうち、八幡さまが最も多く、４万６００社あまりのお社（やしろ）があります。
            </P>
            <P>{t("aboutHistoryPage_text_30364")}<HL>{t('aboutHistory_text_18')}</HL>です。
            </P>
          </FadeIn>

          <OrnamentDivider />

          {/* 御示顕・創建 */}
          <FadeIn delay={0.06}>
            <SectionHeading>{t('aboutHistory_text_19')}</SectionHeading>
            <P indent>
              御祭神である八幡大神さまは応神天皇のご神霊で、５７１年（欽明天皇の時代）に初めて宇佐の地に<HL>{t('aboutHistory_text_20')}</HL>になったといわれます。応神天皇は大陸の文化と産業を輸入し、新しい国づくりをされた方です。７２５年（神亀２年）、
            </P>
            <P indent>{t("aboutHistoryPage_text_81897")}<HL>{t('aboutHistory_text_21')}</HL>し、八幡神をお祀りされました。
            </P>
            <P>
              これが宇佐神宮の創建です。
            </P>
          </FadeIn>

          <OrnamentDivider />

          {/* 比売大神・二之御殿 */}
          <FadeIn delay={0.07}>
            <SectionHeading>{t('aboutHistory_text_22')}</SectionHeading>

            {/* Float layout for text wrap */}
            <div className="overflow-hidden">
              <div className="float-right ml-6 mb-4 w-[160px] sm:w-[220px] shrink-0 select-none">
                <div className="relative">
                  <div className="absolute top-1.5 right-[-6px] w-full h-full border border-gold/20 z-0" />
                  <img
                    src={MAP_IMG}
                    alt={t('aboutHistory_text_23')}
                    className="w-full relative z-10 border border-gold/25"
                  />
                </div>
                <p className="font-sans text-text-mute text-[0.6rem] tracking-wider mt-2.5 text-center">{t("aboutHistoryPage_text_88439")}</p>
              </div>

              <P indent>{t("aboutHistoryPage_text_41845")}<HL>{t('aboutHistory_text_38')}</HL>{t('aboutHistory_text_37')}<HL>{t('aboutHistory_text_36')}</HL>{t('aboutHistory_text_35')}<HL>{t('aboutHistory_text_34')}</HL>{t('aboutHistory_text_33')}<HL>{t('aboutHistory_text_32')}</HL>{t('aboutHistory_text_31')}<HL>{t('aboutHistory_text_30')}</HL>{t('aboutHistory_text_29')}<HL>{t('aboutHistory_text_28')}</HL>{t('aboutHistory_text_27')}<HL>{t('aboutHistory_text_26')}</HL>{t('aboutHistory_text_25')}<HL>{t('aboutHistory_text_24')}</HL>しました。
              </P>
            </div>
          </FadeIn>

          <OrnamentDivider />

          {/* 神功皇后・三之御殿 */}
          <FadeIn delay={0.07}>
            <SectionHeading>{t('aboutHistory_text_39')}</SectionHeading>
            <P indent>
              三之御殿は神託により、８２３年（弘仁１４年）に建立されました。
            </P>
            <P indent>
              応神天皇の御母、神功皇后をお祀りしています。神功皇后は母神として神人交歓、安産、教育等の守護をされており、そのご<HL>{t('aboutHistory_text_40')}</HL>が高くあらわれています。
            </P>
          </FadeIn>

          <OrnamentDivider />

          {/* 御神徳・勅祭社 */}
          <FadeIn delay={0.07}>
            <SectionHeading>{t('aboutHistory_text_41')}</SectionHeading>
            <P indent>{t("aboutHistoryPage_text_45995")}<HL>{t('aboutHistory_text_50')}</HL>{t('aboutHistory_text_49')}<HL>{t('aboutHistory_text_48')}</HL>{t('aboutHistory_text_47')}<HL>{t('aboutHistory_text_46')}</HL>{t('aboutHistory_text_45')}<HL>{t('aboutHistory_text_44')}</HL>{t('aboutHistory_text_43')}<HL>{t('aboutHistory_text_42')}</HL>１６社に列されています。また、一般の人々にも鎮守の神として広く親しまれてきました。
            </P>
          </FadeIn>

          <OrnamentDivider />

          {/* 八幡信仰 */}
          <FadeIn delay={0.07}>
            <SectionHeading>{t('aboutHistory_text_51')}</SectionHeading>
            <P indent>
              八幡信仰とは、応天皇のご聖徳を八幡神として称（たた）え奉るとともに、仏教文化と、我が国固有の神道を<HL>{t('aboutHistory_text_56')}</HL>{t('aboutHistory_text_55')}<HL>{t('aboutHistory_text_54')}</HL>{t('aboutHistory_text_53')}<HL>{t('aboutHistory_text_52')}</HL>を誇っています。
            </P>
          </FadeIn>

          {/* Bottom italic quote card */}
          <FadeIn delay={0.1}>
            <div className="mt-12 p-6 bg-gold/5 border border-gold/15 border-l-4 border-l-gold rounded-sm shadow-sm select-text">
              <p className="font-serif text-text-mid text-sm leading-relaxed italic">
                「護国霊験威力神通大自在王菩薩」の名の通り、自在なる御働きをお顕（あらわ）しになります。全国に四万社余りの八幡神社として広く崇敬され、今なお変わらぬ御神威を持ってご守護されています。
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
