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
        '宇佐神宮について': '宇佐神宮について',
        '由緒': '由緒',
        'ご祭神': 'ご祭神',
        '八幡大神ゆかりの伝承': '八幡大神ゆかりの伝承',
        '御霊水': '御霊水',
        '東大寺の大仏建立': '東大寺大仏建立の協力',
        '和気清麻呂とご神託': '和気清麻呂公とご神託',
        '神仏習合': '神仏習合の発祥',
        '歴史略年表': '歴史略年表',
        '宝物館のご案内': '宝物館のご案内',
        '参拝について': '参拝について',
        '参拝の作法': '参拝の作法',
        '境内のご案内': '境内のご案内',
        '交通アクセス': '交通アクセス',
        'モノレールのご案内': 'モノレールのご案内',
        '祈願祭': 'ご祈願のご案内',
        '厄除開運について': '厄除開運について',
        '出張祭典について': '出張祭典について',
        '授与品について': '授与品（御札・御守）',
        '外苑駐車場': '外苑駐車場のご案内',
        'お祭りについて': 'お祭りについて',
        '主な祭典': '主な祭典',
        '祭儀の詳細': '祭儀の詳細',
        '神前結婚式': '神前結婚式',
        '八幡講崇敬会': '八幡講崇敬会',
        'その他': 'その他',
        '新着情報': '新着情報',
        '表参道商店街': '表参道商店街',
        'よくある質問': 'よくあるご質問',
        'お問い合せ': 'お問い合わせ',
        '奉賛お申込み': '奉賛お申込み',
        '免責事項': '免責事項',
        'ホーム': 'ホーム',
        'サイトマップ': 'サイトマップ',
      },
      en: {
        '宇佐神宮について': 'About Usa Jingu',
        '由緒': 'History & Origins',
        'ご祭神': 'Enshrined Deities',
        '八幡大神ゆかりの伝承': 'Legends of Hachiman',
        '御霊水': 'Sacred Spring (Goreisui)',
        '東大寺の大仏建立': 'Great Buddha of Todaiji',
        '和気清麻呂とご神託': 'Wake no Kiyomaro Oracle',
        '神仏習合': 'Shinto-Buddhist Syncretism',
        '歴史略年表': 'Chronological History',
        '宝物館のご案内': 'Treasure Museum Guide',
        '参拝について': 'Worship & Visit',
        '参拝の作法': 'Worship Etiquette',
        '境内のご案内': 'Shrine Grounds Guide',
        '交通アクセス': 'Access & Transportation',
        'モノレールのご案内': 'Slope Monorail Guide',
        '祈願祭': 'Prayer & Rituals Guide',
        '厄除開運について': 'Ward Off Evil / Luck',
        '出張祭典について': 'Off-site Shinto Rites',
        '授与品について': 'Sacred Amulets & Talismans',
        '外苑駐車場': 'Gaien Parking Lot Guide',
        'お祭りについて': 'Annual Festivals',
        '主な祭典': 'Major Festivals List',
        '祭儀の詳細': 'Details of Ceremonies',
        '神前結婚式': 'Shinto Wedding Rites',
        '八幡講崇敬会': 'Hachiman-ko Devotees',
        'その他': 'Other Sections',
        '新着情報': 'Latest News Update',
        '表参道商店街': 'Omotesando Shopping',
        'よくある質問': 'FAQ & Inquiries',
        'お問い合せ': 'Contact Details',
        '奉賛お申込み': 'Support & Donations',
        '免責事項': 'Disclaimer',
        'ホーム': 'Home',
        'サイトマップ': 'Sitemap',
      },
      'zh-TW': {
        '宇佐神宮について': '關於宇佐神宮',
        '由緒': '歷史與由來',
        'ご祭神': '祭祀神明',
        '八幡大神ゆかりの伝承': '八幡大神相關傳說',
        '御霊水': '御靈水',
        '東大寺の大仏建立': '東大寺大佛建立協助',
        '和気清麻呂とご神託': '和氣清麻呂與神諭',
        '神仏習合': '神佛習合發祥地',
        '歴史略年表': '歷史年表',
        '宝物館のご案内': '寶物館參觀指南',
        '参拝について': '關於參拜',
        '参拝の作法': '參拜禮儀與作法',
        '境内のご案内': '境內景點指南',
        '交通アクセス': '交通路線指引',
        'モノレールのご案内': '單軌電車指南',
        '祈願祭': '祈願祭典指南',
        '厄除開運について': '厄除開運祈願',
        '出張祭典について': '出差祭典指引',
        '授与品について': '神符與御守授與',
        '外苑駐車場': '外苑停車場指南',
        'お祭りについて': '關於祭典',
        '主な祭典': '主要祭典一覽',
        '祭儀の詳細': '祭儀詳細介紹',
        '神前結婚式': '神前婚禮介紹',
        '八幡講崇敬会': '八幡講崇敬會',
        'その他': '其他資訊',
        '新着情報': '最新消息',
        '表参道商店街': '表參道商店街',
        'よくある質問': '常見問題',
        'お問い合せ': '聯絡我們',
        '奉贊お申込み': '奉贊捐款申報',
        '免責事項': '免責聲明',
        'ホーム': '首頁',
        'サイトマップ': '網站地圖',
      },
      'zh-CN': {
        '宇佐神宮について': '关于宇佐神宫',
        '由緒': '历史与由来',
        'ご祭神': '祭祀神明',
        '八幡大神ゆかりの伝承': '八幡大神相关传说',
        '御霊水': '御灵水',
        '東大寺の大仏建立': '东大寺大佛建立协助',
        '和気清麻呂とご神託': '和气清麻罗与神谕',
        '神仏習合': '神佛习合发祥地',
        '歴史略年表': '历史年表',
        '宝物館のご案内': '宝物馆参观指南',
        '参拝について': '关于参拜',
        '参拝の作法': '参拜礼仪与作法',
        '境内のご案内': '境内景点指南',
        '交通アクセス': '交通路线指引',
        'モノレールのご案内': '单轨电车指南',
        '祈願祭': '祈愿祭典指南',
        '厄除開運について': '厄除开运祈愿',
        '出張祭典について': '出差祭典指引',
        '授与品について': '神符与御守授与',
        '外苑駐車場': '外苑停车场指南',
        'お祭りについて': '关于祭典',
        '主な祭典': '主要祭典一览',
        '祭仪の詳細': '祭仪详细介绍',
        '神前結婚式': '神前婚礼介绍',
        '八幡講崇敬会': '八幡讲崇敬会',
        'その他': '其他信息',
        '新着情報': '最新消息',
        '表参道商店街': '表参道商店街',
        'よくある質問': '常见问题',
        'お問い合せ': '联系我们',
        '奉賛お申込み': '奉赞捐款申报',
        '免責事項': '免责声明',
        'ホーム': '首页',
        'サイトマップ': '网站地图',
      },
      ko: {
        '宇佐神宮について': '우사 신궁에 대하여',
        '由緒': '유래와 역사',
        'ご祭神': '제신 안내',
        '八幡大神ゆかりの伝承': '하치만 오카미 전설',
        '御霊水': '고레이수이 (신성한 샘물)',
        '東大寺の大仏建立': '도다이지 대불 건립 협력',
        '和気清麻呂とご神託': '와케노 키요마로 신탁',
        '神仏習合': '신불습합의 발상',
        '歴史略年表': '연표로 보는 역사',
        '宝物館のご案内': '보물관 관람 안내',
        '参拝について': '참배 안내',
        '参拝の作法': '참배 작법 및 예절',
        '境内のご案内': '경내 구역 안내',
        '交通アクセス': '오시는 길',
        'モノレールのご案内': '모노레일 이용 안내',
        '祈願祭': '기원제 안내',
        '厄除開運について': '액막이와 개운 기원',
        '出張祭典について': '출장 제전 안내',
        '授与品について': '부적 및 신찰 수여',
        '外苑駐車場': '외원 주차장 안내',
        'お祭りについて': '축제와 제전',
        '主な祭典': '주요 제전 일람',
        '祭儀の詳細': '제례 상세 소개',
        '神前結婚式': '신전 결혼식',
        '八幡講崇敬会': '하치만코 숭경회',
        'その他': '기타 정보',
        '新着情報': '새로운 소식',
        '表参道商店街': '오모테산도 상점가',
        'よくある質問': '자주 묻는 질문',
        'お問い合せ': '문의처 안내',
        '奉賛お申込み': '봉찬 후원 신청',
        '免責事項': '면책사항',
        'ホーム': '홈',
        'サイトマップ': '사이트맵',
      },
    };

    const lDict = dict[locale] || dict.ja;
    return lDict[key] || key;
  };

  const sitemapData = [
    {
      id: 'about',
      title: s('宇佐神宮について'),
      path: '/about/history',
      children: [
        { title: s('由緒'), path: '/about/history' },
        { title: s('ご祭神'), path: '/about/deities' },
        {
          title: s('八幡大神ゆかりの伝承'),
          path: '/about/legends/goreisui',
          children: [
            { title: s('御霊水'), path: '/about/legends/goreisui' },
            { title: s('東大寺の大仏建立'), path: '/about/legends/todaiji' },
            { title: s('和気清麻呂とご神託'), path: '/about/legends/wake' },
            { title: s('神仏習合'), path: '/about/legends/shinbutsu' },
          ],
        },
        { title: s('歴史略年表'), path: '/about/timeline' },
        { title: s('宝物館のご案内'), path: '/about/museum' },
      ],
    },
    {
      id: 'worship',
      title: s('参拝について'),
      path: '/worship/etiquette',
      children: [
        { title: s('参拝 of 作法') ? s('参拝の作法') : '参拝の作法', path: '/worship/etiquette' },
        { title: s('境内のご案内'), path: '/worship/guide' },
        { title: s('交通アクセス'), path: '/worship/access' },
        { title: s('モノレールのご案内'), path: '/worship/monorail' },
        { title: s('祈願祭'), path: '/worship/pray' },
        { title: s('厄除開運について'), path: '/worship/fortune' },
        { title: s('出張祭典について'), path: '/worship/trip' },
        { title: s('授与品について'), path: '/worship/confer' },
        { title: s('外苑駐車場'), path: '/worship/gaien-parking' },
      ],
    },
    {
      id: 'festivals',
      title: s('お祭りについて'),
      path: '/festivals/festival-list',
      children: [
        { title: s('主な祭典'), path: '/festivals/festival-list' },
        { title: s('祭儀の詳細'), path: '/festivals/festival-detail' },
      ],
    },
    {
      id: 'wedding',
      title: s('神前結婚式'),
      path: '/wedding',
    },
    {
      id: 'society',
      title: s('八幡講崇敬会'),
      path: '/society',
    },
    {
      id: 'others',
      title: s('その他'),
      path: '/news',
      children: [
        { title: s('新着情報'), path: '/news' },
        { title: s('表参道商店街'), path: '/omotesando' },
        { title: s('よくある質問'), path: '/faq' },
        { title: s('お問い合せ'), path: '/contact' },
        { title: s('奉賛お申込み'), path: '/donation' },
        { title: s('免責事項'), path: '/disclaimer' },
      ],
    },
  ];

  return (
    <>
      {/* Inner Page Header */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt={s('サイトマップ')}
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
              {s('ホーム')}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              {s('サイトマップ')}
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
            <h1 className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-[0.3em] drop-shadow-md">
              {s('サイトマップ')}
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
                    {s('ホーム')}
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
