'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const C = {
  crimson: '#a50000',
  vermil: '#e2501f',
  gold: '#a27a28',
  goldLt: '#c49a3a',
  ivory: '#faf8f5',
  stone: '#f2ece4',
  text: '#333333',
  textMute: '#7a6a5a',
};

const HERO_IMG = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Reusable Node for the visual tree
const Node = ({ node, t, locale, depth = 0 }: { node: any; t: any; locale: string; depth?: number }) => {
  const label = node.title;

  if (depth === 0) {
    return (
      <div className="mb-10 select-text">
        <h3
          className="text-lg md:text-xl font-serif pb-3 mb-4 select-none"
          style={{
            color: C.crimson,
            borderBottom: `1px solid ${C.gold}40`,
            letterSpacing: '0.1em',
          }}
        >
          {node.children ? (
            label
          ) : (
            <Link
              href={`/${locale}${node.path}`}
              className="hover:opacity-70 transition-opacity"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {label}
            </Link>
          )}
        </h3>

        {node.children && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 pl-2">
            {node.children.map((child: any, idx: number) => (
              <Node key={idx} node={child} t={t} locale={locale} depth={1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 select-text">
      <Link
        href={`/${locale}${node.path}`}
        className="flex items-center gap-2 py-1 group"
        style={{
          fontFamily: 'var(--font-sans)',
          color: C.text,
          fontSize: '0.95rem',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: C.vermil,
            borderRadius: '50%',
            display: 'inline-block',
            opacity: 0.8,
            transition: 'transform 0.2s',
          }}
          className="group-hover:scale-150"
        />
        <span className="group-hover:text-[#a50000] transition-colors">{label}</span>
      </Link>

      {node.children && (
        <div className="pl-6 flex flex-col gap-2 mt-1 mb-2 border-l border-[#f2ece4]">
          {node.children.map((child: any, idx: number) => (
            <Link
              key={idx}
              href={`/${locale}${child.path}`}
              className="text-sm py-1 hover:text-[#a50000] transition-colors relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-[16px] before:h-px before:bg-[#f2ece4]"
              style={{ fontFamily: 'var(--font-sans)', color: C.textMute, textDecoration: 'none' }}
            >
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SitemapPage() {
  const locale = useLocale();
  const t = useTranslations();

  // Localized sitemap translations
  const s = (key: string) => {
    const dict: Record<string, Record<string, string>> = {
      ja: {
        [t('sitemap_text_2')]: t('sitemap_text_1'),
        [t('sitemap_text_4')]: t('sitemap_text_3'),
        [t('sitemap_text_6')]: t('sitemap_text_5'),
        [t('sitemap_text_8')]: t('sitemap_text_7'),
        [t('sitemap_text_10')]: t('sitemap_text_9'),
        [t('sitemap_text_12')]: t('sitemap_text_11'),
        [t('sitemap_text_14')]: t('sitemap_text_13'),
        [t('sitemap_text_16')]: t('sitemap_text_15'),
        [t('sitemap_text_18')]: t('sitemap_text_17'),
        [t('sitemap_text_20')]: t('sitemap_text_19'),
        [t('sitemap_text_22')]: t('sitemap_text_21'),
        [t('sitemap_text_24')]: t('sitemap_text_23'),
        [t('sitemap_text_26')]: t('sitemap_text_25'),
        [t('sitemap_text_28')]: t('sitemap_text_27'),
        [t('sitemap_text_30')]: t('sitemap_text_29'),
        [t('sitemap_text_32')]: t('sitemap_text_31'),
        [t('sitemap_text_34')]: t('sitemap_text_33'),
        [t('sitemap_text_36')]: t('sitemap_text_35'),
        [t('sitemap_text_38')]: t('sitemap_text_37'),
        [t('sitemap_text_40')]: t('sitemap_text_39'),
        [t('sitemap_text_42')]: t('sitemap_text_41'),
        [t('sitemap_text_44')]: t('sitemap_text_43'),
        [t('sitemap_text_46')]: t('sitemap_text_45'),
        [t('sitemap_text_48')]: t('sitemap_text_47'),
        [t('sitemap_text_50')]: t('sitemap_text_49'),
        [t('sitemap_text_52')]: t('sitemap_text_51'),
        [t('sitemap_text_54')]: t('sitemap_text_53'),
        [t('sitemap_text_56')]: t('sitemap_text_55'),
        [t('sitemap_text_58')]: t('sitemap_text_57'),
        [t('sitemap_text_60')]: t('sitemap_text_59'),
        [t('sitemap_text_62')]: t('sitemap_text_61'),
        [t('sitemap_text_64')]: t('sitemap_text_63'),
        [t('sitemap_text_66')]: t('sitemap_text_65'),
        [t('sitemap_text_68')]: t('sitemap_text_67'),
      },
      en: {
        [t('sitemap_text_69')]: 'About Usa Jingu',
        [t('sitemap_text_70')]: 'History & Origins',
        [t('sitemap_text_71')]: 'Enshrined Deities',
        [t('sitemap_text_72')]: 'Legends of Hachiman',
        [t('sitemap_text_73')]: 'Sacred Spring (Goreisui)',
        [t('sitemap_text_74')]: 'Great Buddha of Todaiji',
        [t('sitemap_text_75')]: 'Wake no Kiyomaro Oracle',
        [t('sitemap_text_76')]: 'Shinto-Buddhist Syncretism',
        [t('sitemap_text_77')]: 'Chronological History',
        [t('sitemap_text_78')]: 'Treasure Museum Guide',
        [t('sitemap_text_79')]: 'Worship & Visit',
        [t('sitemap_text_80')]: 'Worship Etiquette',
        [t('sitemap_text_81')]: 'Shrine Grounds Guide',
        [t('sitemap_text_82')]: 'Access & Transportation',
        [t('sitemap_text_83')]: 'Slope Monorail Guide',
        [t('sitemap_text_84')]: 'Prayer & Rituals Guide',
        [t('sitemap_text_85')]: 'Ward Off Evil / Luck',
        [t('sitemap_text_86')]: 'Off-site Shinto Rites',
        [t('sitemap_text_87')]: 'Sacred Amulets & Talismans',
        [t('sitemap_text_88')]: 'Gaien Parking Lot Guide',
        [t('sitemap_text_89')]: 'Annual Festivals',
        [t('sitemap_text_90')]: 'Major Festivals List',
        [t('sitemap_text_91')]: 'Details of Ceremonies',
        [t('sitemap_text_92')]: 'Shinto Wedding Rites',
        [t('sitemap_text_93')]: 'Hachiman-ko Devotees',
        [t('sitemap_text_94')]: 'Other Sections',
        [t('sitemap_text_95')]: 'Latest News Update',
        [t('sitemap_text_96')]: 'Omotesando Shopping',
        [t('sitemap_text_97')]: 'FAQ & Inquiries',
        [t('sitemap_text_98')]: 'Contact Details',
        [t('sitemap_text_99')]: 'Support & Donations',
        [t('sitemap_text_100')]: 'Disclaimer',
        [t('sitemap_text_101')]: 'Home',
        [t('sitemap_text_102')]: 'Sitemap',
      },
      'zh-TW': {
        [t('sitemap_text_104')]: t('sitemap_text_103'),
        [t('sitemap_text_106')]: t('sitemap_text_105'),
        [t('sitemap_text_108')]: t('sitemap_text_107'),
        [t('sitemap_text_110')]: t('sitemap_text_109'),
        [t('sitemap_text_112')]: t('sitemap_text_111'),
        [t('sitemap_text_114')]: t('sitemap_text_113'),
        [t('sitemap_text_116')]: t('sitemap_text_115'),
        [t('sitemap_text_118')]: t('sitemap_text_117'),
        [t('sitemap_text_120')]: t('sitemap_text_119'),
        [t('sitemap_text_122')]: t('sitemap_text_121'),
        [t('sitemap_text_124')]: t('sitemap_text_123'),
        [t('sitemap_text_126')]: t('sitemap_text_125'),
        [t('sitemap_text_128')]: t('sitemap_text_127'),
        [t('sitemap_text_130')]: t('sitemap_text_129'),
        [t('sitemap_text_132')]: t('sitemap_text_131'),
        [t('sitemap_text_134')]: t('sitemap_text_133'),
        [t('sitemap_text_136')]: t('sitemap_text_135'),
        [t('sitemap_text_138')]: t('sitemap_text_137'),
        [t('sitemap_text_140')]: t('sitemap_text_139'),
        [t('sitemap_text_142')]: t('sitemap_text_141'),
        [t('sitemap_text_144')]: t('sitemap_text_143'),
        [t('sitemap_text_146')]: t('sitemap_text_145'),
        [t('sitemap_text_148')]: t('sitemap_text_147'),
        [t('sitemap_text_150')]: t('sitemap_text_149'),
        [t('sitemap_text_152')]: t('sitemap_text_151'),
        [t('sitemap_text_154')]: t('sitemap_text_153'),
        [t('sitemap_text_156')]: t('sitemap_text_155'),
        [t('sitemap_text_158')]: t('sitemap_text_157'),
        [t('sitemap_text_160')]: t('sitemap_text_159'),
        [t('sitemap_text_162')]: t('sitemap_text_161'),
        [t('sitemap_text_164')]: t('sitemap_text_163'),
        [t('sitemap_text_166')]: t('sitemap_text_165'),
        [t('sitemap_text_168')]: t('sitemap_text_167'),
        [t('sitemap_text_170')]: t('sitemap_text_169'),
      },
      'zh-CN': {
        [t('sitemap_text_172')]: t('sitemap_text_171'),
        [t('sitemap_text_174')]: t('sitemap_text_173'),
        [t('sitemap_text_176')]: t('sitemap_text_175'),
        [t('sitemap_text_178')]: t('sitemap_text_177'),
        [t('sitemap_text_180')]: t('sitemap_text_179'),
        [t('sitemap_text_182')]: t('sitemap_text_181'),
        [t('sitemap_text_184')]: t('sitemap_text_183'),
        [t('sitemap_text_186')]: t('sitemap_text_185'),
        [t('sitemap_text_188')]: t('sitemap_text_187'),
        [t('sitemap_text_190')]: t('sitemap_text_189'),
        [t('sitemap_text_192')]: t('sitemap_text_191'),
        [t('sitemap_text_194')]: t('sitemap_text_193'),
        [t('sitemap_text_196')]: t('sitemap_text_195'),
        [t('sitemap_text_198')]: t('sitemap_text_197'),
        [t('sitemap_text_200')]: t('sitemap_text_199'),
        [t('sitemap_text_202')]: t('sitemap_text_201'),
        [t('sitemap_text_204')]: t('sitemap_text_203'),
        [t('sitemap_text_206')]: t('sitemap_text_205'),
        [t('sitemap_text_208')]: t('sitemap_text_207'),
        [t('sitemap_text_210')]: t('sitemap_text_209'),
        [t('sitemap_text_212')]: t('sitemap_text_211'),
        [t('sitemap_text_214')]: t('sitemap_text_213'),
        [t('sitemap_text_216')]: t('sitemap_text_215'),
        [t('sitemap_text_218')]: t('sitemap_text_217'),
        [t('sitemap_text_220')]: t('sitemap_text_219'),
        [t('sitemap_text_222')]: t('sitemap_text_221'),
        [t('sitemap_text_224')]: t('sitemap_text_223'),
        [t('sitemap_text_226')]: t('sitemap_text_225'),
        [t('sitemap_text_228')]: t('sitemap_text_227'),
        [t('sitemap_text_230')]: t('sitemap_text_229'),
        [t('sitemap_text_232')]: t('sitemap_text_231'),
        [t('sitemap_text_234')]: t('sitemap_text_233'),
        [t('sitemap_text_236')]: t('sitemap_text_235'),
        [t('sitemap_text_238')]: t('sitemap_text_237'),
      },
      ko: {
        [t('sitemap_text_239')]: '우사 신궁에 대하여',
        [t('sitemap_text_240')]: '유래와 역사',
        [t('sitemap_text_241')]: '제신 안내',
        [t('sitemap_text_242')]: '하치만 오카미 전설',
        [t('sitemap_text_243')]: '고레이수이 (신성한 샘물)',
        [t('sitemap_text_244')]: '도다이지 대불 건립 협력',
        [t('sitemap_text_245')]: '와케노 키요마로 신탁',
        [t('sitemap_text_246')]: '신불습합의 발상',
        [t('sitemap_text_247')]: '연표로 보는 역사',
        [t('sitemap_text_248')]: '보물관 관람 안내',
        [t('sitemap_text_249')]: '참배 안내',
        [t('sitemap_text_250')]: '참배 작법 및 예절',
        [t('sitemap_text_251')]: '경내 구역 안내',
        [t('sitemap_text_252')]: '오시는 길',
        [t('sitemap_text_253')]: '모노레일 이용 안내',
        [t('sitemap_text_254')]: '기원제 안내',
        [t('sitemap_text_255')]: '액막이와 개운 기원',
        [t('sitemap_text_256')]: '출장 제전 안내',
        [t('sitemap_text_257')]: '부적 및 신찰 수여',
        [t('sitemap_text_258')]: '외원 주차장 안내',
        [t('sitemap_text_259')]: '축제와 제전',
        [t('sitemap_text_260')]: '주요 제전 일람',
        [t('sitemap_text_261')]: '제례 상세 소개',
        [t('sitemap_text_262')]: '신전 결혼식',
        [t('sitemap_text_263')]: '하치만코 숭경회',
        [t('sitemap_text_264')]: '기타 정보',
        [t('sitemap_text_265')]: '새로운 소식',
        [t('sitemap_text_266')]: '오모테산도 상점가',
        [t('sitemap_text_267')]: '자주 묻는 질문',
        [t('sitemap_text_268')]: '문의처 안내',
        [t('sitemap_text_269')]: '봉찬 후원 신청',
        [t('sitemap_text_270')]: '면책사항',
        [t('sitemap_text_271')]: '홈',
        [t('sitemap_text_272')]: '사이트맵',
      },
    };

    const lDict = dict[locale] || dict.ja;
    return lDict[key] || key;
  };

  const sitemapData = [
    {
      id: 'about',
      title: s(t('sitemap_text_273')),
      path: '/about/history',
      children: [
        { title: s(t('sitemap_text_274')), path: '/about/history' },
        { title: s(t('sitemap_text_275')), path: '/about/deities' },
        {
          title: s(t('sitemap_text_276')),
          path: '/about/legends/goreisui',
          children: [
            { title: s(t('sitemap_text_277')), path: '/about/legends/goreisui' },
            { title: s(t('sitemap_text_278')), path: '/about/legends/todaiji' },
            { title: s(t('sitemap_text_279')), path: '/about/legends/wake' },
            { title: s(t('sitemap_text_280')), path: '/about/legends/shinbutsu' },
          ],
        },
        { title: s(t('sitemap_text_281')), path: '/about/timeline' },
        { title: s(t('sitemap_text_282')), path: '/about/museum' },
      ],
    },
    {
      id: 'worship',
      title: s(t('sitemap_text_283')),
      path: '/worship/etiquette',
      children: [
        { title: s(t('sitemap_text_286')) ? s(t('sitemap_text_285')) : t('sitemap_text_284'), path: '/worship/etiquette' },
        { title: s(t('sitemap_text_287')), path: '/worship/guide' },
        { title: s(t('sitemap_text_288')), path: '/worship/access' },
        { title: s(t('sitemap_text_289')), path: '/worship/monorail' },
        { title: s(t('sitemap_text_290')), path: '/worship/pray' },
        { title: s(t('sitemap_text_291')), path: '/worship/fortune' },
        { title: s(t('sitemap_text_292')), path: '/worship/trip' },
        { title: s(t('sitemap_text_293')), path: '/worship/confer' },
        { title: s(t('sitemap_text_294')), path: '/worship/gaien-parking' },
      ],
    },
    {
      id: 'festivals',
      title: s(t('sitemap_text_295')),
      path: '/festivals/festival-list',
      children: [
        { title: s(t('sitemap_text_296')), path: '/festivals/festival-list' },
        { title: s(t('sitemap_text_297')), path: '/festivals/festival-detail' },
      ],
    },
    {
      id: 'wedding',
      title: s(t('sitemap_text_298')),
      path: '/wedding',
    },
    {
      id: 'society',
      title: s(t('sitemap_text_299')),
      path: '/society',
    },
    {
      id: 'others',
      title: s(t('sitemap_text_300')),
      path: '/news',
      children: [
        { title: s(t('sitemap_text_301')), path: '/news' },
        { title: s(t('sitemap_text_302')), path: '/omotesando' },
        { title: s(t('sitemap_text_303')), path: '/faq' },
        { title: s(t('sitemap_text_304')), path: '/contact' },
        { title: s(t('sitemap_text_305')), path: '/donation' },
        { title: s(t('sitemap_text_306')), path: '/disclaimer' },
      ],
    },
  ];

  return (
    <>
      {/* Inner Page Header */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt={s(t('sitemap_text_307'))}
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
            >
              {s(t('sitemap_text_308'))}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              {s(t('sitemap_text_309'))}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.6rem] tracking-[0.35em] uppercase mb-2.5">
              SITEMAP
            </p>
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.3em] drop-shadow-md" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              {s(t('sitemap_text_310'))}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <div className="bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm border border-[#f2ece4]">
              <div className="mb-10 select-text">
                <h3
                  className="text-lg md:text-xl font-serif pb-3 mb-4 select-none"
                  style={{
                    color: C.crimson,
                    borderBottom: `1px solid ${C.gold}40`,
                    letterSpacing: '0.1em',
                  }}
                >
                  <Link
                    href={`/${locale}`}
                    className="hover:opacity-70 transition-opacity"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {s(t('sitemap_text_311'))}
                  </Link>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                {/* Left Column */}
                <div>
                  <Node node={sitemapData[0]} t={t} locale={locale} />
                  <Node node={sitemapData[1]} t={t} locale={locale} />
                </div>

                {/* Right Column */}
                <div>
                  <Node node={sitemapData[2]} t={t} locale={locale} />
                  <Node node={sitemapData[3]} t={t} locale={locale} />
                  <Node node={sitemapData[4]} t={t} locale={locale} />
                  <Node node={sitemapData[5]} t={t} locale={locale} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
