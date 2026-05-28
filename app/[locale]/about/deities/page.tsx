'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const IMG_CHOKUSHIMON = '/images/6a48dd876bbb9fd7b3c5b62cfbb47834f575b4e5.png';
const IMG_ICHINO      = '/images/ee650760d4d1494373b34b9d28f00b3bfd3bab61.png';
const IMG_NINO        = '/images/ebea25b0b79be4de5408cbcabb0ca154084c31e0.png';
const IMG_SANNO       = '/images/72fae222054618f68438fc341245f268f8dab5e6.png';
const HEADER_IMG      = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png';

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
  const accent = index === 1 ? C.gold : C.crimson;
  const number = ['一之御殿', '二之御殿', '三之御殿'][index];

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

  const HACHIMAN_HEADING = '八幡大神　[ 誉田別尊（応神天皇）]';
  const HIME_HEADING     = '比売大神　[ 多岐津姫命・市杵嶋姫命・多紀理姫命 ]';
  const JINGU_HEADING    = '神功皇后　[ 息長帯姫命 ]';

  return (
    <>
      {/* ══ Inner Page Header ══════════════════════════════════════════════ */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HEADER_IMG}
          alt="ご祭神"
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
            >
              ホーム
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              宇佐神宮について
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              ご祭神
            </span>
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
            <h1 className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-[0.3em] drop-shadow-md">
              ご祭神
            </h1>
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
                    alt="勅使門"
                    className="w-full h-[240px] object-cover rounded-sm border border-gold/20 shadow-sm"
                  />
                  <p className="font-sans text-text-mute text-xs tracking-wider mt-2.5 text-center">
                    勅使門（ちょくしもん）
                  </p>
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
                      { name: '八幡大神', sub: '一之御殿', anchor: '#hachiman', accent: C.crimson },
                      { name: '比売大神', sub: '二之御殿', anchor: '#hime',     accent: C.gold    },
                      { name: '神功皇后', sub: '三之御殿', anchor: '#jingu',    accent: C.crimson  },
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
            imageAlt="一之御殿"
            imageRight={true}
            text="東大寺の大仏建立や道鏡の神託事件の時など、数々のご神威をあらわし皇室を護られたことで朝廷から厚く信仰されてきました。また皇室だけでなく、清和源氏をはじめ全国の武士も武運の神「弓矢八幡」として崇敬を寄せ、一般の人々にも鎮守の神として親しまれてきました。６世紀、菱形池のほとりに初めてご顕現された八幡大神は「誉田天皇広幡八幡麿」また「護国霊験威力神通大自在王菩薩」と名乗られたと伝えられています。仏教の世界でも八幡大菩薩として崇（あが）められ、元寇の時に神風をかせた神は八幡様であるとされています。"
            highlight="「護国霊験威力神通大自在王菩薩」の名の通り自在なる御働きをお顕（あらわ）しになります。また、「八幡神」をお祀りしている八幡神社は全国に存在し、八百万（やおよろず）の広がりを持つ強いご神力でご守護されています。"
          />
        </div>

        {/* 二之御殿: 比売大神 */}
        <div id="hime" className="bg-stone">
          <DeitySection
            index={1}
            heading={HIME_HEADING}
            subHeading="Hime Okami  •  The Three Goddesses of Munakata"
            image={IMG_NINO}
            imageAlt="二之御殿"
            imageRight={false}
            text="天照大御神（あまてらすおおみかみ）と素戔嗚尊（すさのおのみこと）の誓約によって誕生したとされる神で、多岐津姫命（たぎつひめのみこと）・市杵嶋姫命（いちきしまひめのみこと）・多紀理姫命（たぎりひめのみこと）の三女神のことを言います。筑紫の宇佐嶋（宇佐の御許山）に天降られたと伝えられており、八幡様のあらわれる以前の古い神様、地主神であるとされています。"
            highlight="海北の道中の主として筑前（福岡）の宗像大社や宮地嶽神社、安芸（広島）の厳島神社などにも祀られており、学問・芸術の上達から財運や交通安全（航海の安全）など幅広くご守護をされています。"
          />
        </div>

        {/* 三之御殿: 神功皇后 */}
        <div id="jingu">
          <DeitySection
            index={2}
            heading={JINGU_HEADING}
            subHeading="Empress Jingu  •  Okinagatarashi-hime no Mikoto"
            image={IMG_SANNO}
            imageAlt="三之御殿"
            imageRight={true}
            text="神功皇后は、香椎（かしい：福岡県）の斎宮（いわいのみや）で天神地祇（てんじんちぎ）の教えを仰いで熊襲（くまそ）を鎮められた後、皇祖の神助（しんじょ）を得て大陸との交渉を成し遂げられました。『日本書紀』には皇后の敬神（けいしん）の様子や、後に宇美（うみ：福岡県）でご誕生になる応神天皇が胎中天皇であられたこと等が記されています。"
            highlight="神功皇后は母神として神人交歓、安産、教育などの守護をされており、そのご威徳が高くあらわれています。"
          />
        </div>
      </div>
    </>
  );
}
