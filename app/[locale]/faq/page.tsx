'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, ChevronRight, Phone } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';
const TEXT_MUT = '#7a6a5a';

const IMG_HERO = 'https://images.unsplash.com/photo-1733575453110-35b9531d0c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Scroll-reveal ─────────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Diamond divider ───────────────────────────────────────────────────────────
function DiamondRule() {
  return (
    <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 opacity-50 select-none">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: GOLD }} />
      </div>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }} />
    </div>
  );
}

interface FaqEntry {
  id: string;
  q: string;
  answer: React.ReactNode;
  plainAnswer: string;
  link?: { label: string; to: string };
}

// ── Single accordion item ─────────────────────────────────────────────────────
function FaqAccordion({ item, index, locale }: { item: FaqEntry; index: number; locale: string }) {
  const [open, setOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-5 text-left py-6 group bg-transparent border-0 cursor-pointer outline-none"
        style={{ borderBottom: open ? 'none' : '1px solid rgba(162,122,40,0.12)' }}
        aria-expanded={open}
      >
        {/* Q marker */}
        <span
          className="shrink-0 flex items-center justify-center w-7 h-7 mt-0.5"
          style={{
            border: `1px solid ${open ? CRIMSON : 'rgba(162,122,40,0.35)'}`,
            color: open ? CRIMSON : GOLD,
            fontFamily: 'var(--font-serif)',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            transition: 'all 0.3s',
          }}
        >
          Q
        </span>

        {/* Question text */}
        <span
          className="flex-1 font-serif text-[0.92rem] leading-[1.9] tracking-wide"
          style={{ color: TEXT }}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <span
          className="shrink-0 mt-1 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: GOLD,
            opacity: 0.7,
          }}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', borderBottom: '1px solid rgba(162,122,40,0.12)' }}
          >
            <div className="flex gap-5 pb-7 pt-1">
              {/* A marker */}
              <span
                className="shrink-0 flex items-center justify-center w-7 h-7 mt-0.5"
                style={{
                  background: 'rgba(162,122,40,0.08)',
                  color: GOLD,
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                A
              </span>

              {/* Answer content */}
              <div className="flex-1">
                <div
                  className="font-sans text-[0.88rem] leading-[2.1] tracking-wide"
                  style={{ color: TEXT_MID }}
                >
                  {item.answer}
                </div>

                {/* Link */}
                {item.link && (
                  <Link
                    href={`/${locale}${item.link.to}`}
                    className="inline-flex items-center gap-1.5 mt-4 font-sans tracking-[0.2em] transition-opacity hover:opacity-60 text-crimson"
                    style={{ fontSize: '0.72rem', color: CRIMSON }}
                  >
                    <ChevronRight size={12} style={{ color: CRIMSON }} />
                    {item.link.label}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  const locale = useLocale();

  // Multi-lingual labels
  const labels: Record<string, Record<string, string>> = {
    ja: {
      title: 'よくある質問',
      subtitle: 'FAQ · ご参拝にあたってのご案内',
      intro: '宇佐神宮へのご参拝・ご祈願に関して、よくいただくご質問とその回答をご案内いたします。ご不明な点がございましたら、お気軽にお問い合わせください。',
      photoQ: '広報・商業用として、風景・画像等を撮影・使用・掲載をしたいのですが。',
      photoA: 'お電話にてご連絡ください。',
      contactTitle: 'CONTACT · お問い合わせ',
      contactText: 'こちらに掲載のない内容についてのお問い合わせは、下記よりお気軽にご連絡ください。',
      contactBtn: 'お問い合わせはこちら',
      home: 'ホーム',
      linkText: '詳しくはこちら',
    },
    en: {
      title: 'FAQ',
      subtitle: 'Frequently Asked Questions',
      intro: 'Here are the most frequently asked questions and answers regarding worship and prayer at Usa Jingu. If you have any inquiries, please feel free to contact us.',
      photoQ: 'I would like to take, use, or publish scenery photos and images for public relations or commercial purposes.',
      photoA: 'Please contact us by telephone.',
      contactTitle: 'CONTACT',
      contactText: 'For inquiries regarding matters not listed here, please feel free to contact us below.',
      contactBtn: 'Contact Us',
      home: 'Home',
      linkText: 'Learn More',
    },
    'zh-TW': {
      title: '常見問題',
      subtitle: 'FAQ · 參拜指南與常見問題',
      intro: '在此為您提供有關宇佐神宮參拜與祈願的常見問題及解答。如果您有任何疑問，歡迎隨時與我們聯絡。',
      photoQ: '我想要為宣傳或商業目的拍攝、使用或刊登境內的風景與圖像。',
      photoA: '請透過電話與我們聯絡。',
      contactTitle: 'CONTACT · 聯絡我們',
      contactText: '若有任何未在此列出的疑問，歡迎點擊下方隨時與我們聯絡。',
      contactBtn: '聯絡我們',
      home: '首頁',
      linkText: '詳細資訊',
    },
    'zh-CN': {
      title: '常见问题',
      subtitle: 'FAQ · 参拜指南与常见问题',
      intro: '在此为您提供有关宇佐神宫参拜与祈愿的常见问题及解答。如果您有任何疑问，欢迎随时与我们联系。',
      photoQ: '我想要为宣传或商业目的拍摄、使用或刊登境内的风景与图像。',
      photoA: '请通过电话与我们联系。',
      contactTitle: 'CONTACT · 联系我们',
      contactText: '若有任何未在此列出的疑问，欢迎点击下方随时与我们联系。',
      contactBtn: '联系我们',
      home: '首页',
      linkText: '详细信息',
    },
    ko: {
      title: '자주 묻는 질문',
      subtitle: 'FAQ · 참배 및 신궁 이용 안내',
      intro: '우사 신궁 참배 및 기원제와 관련하여 자주 묻는 질문과 답변을 안내해 드립니다. 궁금한 점이 있으시면 언제든지 편하게 문의해 주시기 바랍니다.',
      photoQ: '홍보 및 상업적 목적으로 경내 풍경이나 사진을 촬영, 사용 또는 게재하고 싶습니다.',
      photoA: '전화로 문의해 주시기 바랍니다.',
      contactTitle: 'CONTACT · 문의처 안내',
      contactText: '이곳에 게재되지 않은 내용에 대해 궁금한 점이 있으시면 아래로 편하게 문의해 주시기 바랍니다.',
      contactBtn: '문의하기',
      home: '홈',
      linkText: '자세히 보기',
    },
  };

  const l = labels[locale] || labels.ja;

  // Fully translated FAQ content
  const getFaqItems = (): FaqEntry[] => {
    const dict: Record<string, FaqEntry[]> = {
      ja: [
        {
          id: 'reisai',
          q: 'どうして拝礼作法は「２礼・４拍手・１礼」なのですか？',
          plainAnswer: '通常、神社での参拝作法は「二礼・二拍手・一礼」ですが、宇佐神宮では「二礼・四拍手・一礼」の作法にて参拝いただいています。この作法は、特に文献等には記録されてはいないものの、古儀により現在に至るまで行われてきました。皆様がお参りする時だけではなく、祭典奉仕をする神職も「四拍手」の拝礼作法をしています。',
          answer: <>通常、神社での参拝作法は「二礼・二拍手・一礼」ですが、宇佐神宮では「二礼・四拍手・一礼」の作法にて参拝いただいています。この作法は、特に文献等には記録されてはいないものの、古儀により現在に至るまで行われてきました。皆様がお参りする時だけではなく、祭典奉仕をする神職も「四拍手」の拝礼作法をしています。</>,
        },
        {
          id: 'honden',
          q: '宇佐神宮の御本殿はどこにあるのですか？',
          plainAnswer: '上宮へお進みになり、皆様がお参りされる勅使門の奥に三殿並んで建立されています。御本殿の特別拝観などを除き、通常、間近でのご参拝は行っていません。',
          answer: <>上宮へお進みになり、皆様がお参りされる勅使門の奥に三殿並んで建立されています。御本殿の特別拝観などを除き、通常、間近でのご参拝は行っていません。</>,
        },
        {
          id: 'kusunoki',
          q: '上宮にある大楠（ご神木）は樹齢何年ですか？',
          plainAnswer: '上宮祈祷殿手前の大楠は、樹齢は約８００年といわれます。',
          answer: <>上宮祈祷殿手前の大楠は、樹齢は約８００年といわれます。</>,
        },
        {
          id: 'pet',
          q: 'ペットは連れてお参りしてもいいですか？',
          plainAnswer: '宇佐神宮では、尊厳護持と現在の社会情勢を踏まえ、手水舎から上宮及び下宮周辺部分、御霊水に至る菱形池周辺部分、モノレール周辺ではペットを連れてのお参りを禁止しております。',
          answer: (
            <>
              宇佐神宮では、尊厳護持と現在の社会情勢を踏まえ、下記の境内地はペットを連れてのお参りを禁止しております。皆様のご理解とご協力をお願い致します。（補助犬の同伴は、この限りではありません。）
              <ul className="mt-4 space-y-1.5 pl-0 list-none">
                {[
                  '手水舎から上宮及び下宮周辺部分',
                  '御霊水に至る菱形池周辺部分',
                  'モノレール',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0 animate-pulse" style={{ background: GOLD }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: 'kigan',
          q: '祈願・お祓いをしたいのですが、予約は必要ですか？',
          plainAnswer: '個人・ご家族でお越しの方は、ご予約は必要ありません。直接上宮祈祷殿受付までお越しください。団体でお越しの場合は事前連絡をお願いします。',
          answer: <>個人・ご家族でお越しの方は、ご予約は必要ありません。直接上宮祈祷殿受付までお越しください。また、企業・法人等の団体で祈願・お祓いを希望される場合は、事前に申込書をご用意しますので、あらかじめご一報いただきますようお願い致します。</>,
          link: { label: l.linkText, to: '/worship/pray' },
        },
        {
          id: 'meotoishi',
          q: '「夫婦石」とはなんですか？',
          plainAnswer: '良縁成就の御利益があるパワースポットといわれています。お一人の場合は両足で踏むと良いご縁に恵まれ、お二人の場合は左右にそれぞれ踏むといつまでも仲睦まじくなると伝えられます。若宮神社へ向かう階段の石畳にあります。',
          answer: <>良縁成就の御利益があるパワースポットといわれています。お一人の場合は両足で踏むと良いご縁に恵まれ、お二人の場合は左右にそれぞれ踏むといつまでも仲睦まじくなると伝えられます。境内若宮神社へ向かう階段の石畳にあります。</>,
        },
        {
          id: 'kuruma',
          q: '車イスを使用しても、上宮までお参りができるのでしょうか？',
          plainAnswer: '体の不自由な方・高齢の方等のためにモノレールを運行しています。清掃作業等による運行停止日がございますので事前にお問い合わせください。',
          answer: <>宇佐神宮では、体の不自由な方・高齢の方等に、より良いご参拝が出来ますようにモノレールの運行を行っています。直接お越しいただきまして、ご利用ください。なお、清掃作業のため毎月運行を停止する日がありますので、ご利用になられる前には一度お問い合わせください。</>,
          link: { label: l.linkText, to: '/worship/monorail' },
        },
        {
          id: 'kashidashi',
          q: '車イスの貸出は行っていますか？',
          plainAnswer: '予約制ですが、車イスの貸出を行っております。台数に限りがありますので、ご希望の方はお問い合わせください。',
          answer: <>予約制ですが、車イスの貸出を行っております。台数に限りがありますので、ご希望の方はお問い合わせください。</>,
        },
        {
          id: 'goshuuin',
          q: '御朱印の受付時間は何時ですか？',
          plainAnswer: '９時より16時生までは御朱印所兼総合案内所で受付を行っております。16時より18時までは授与所にて紙のみのご対応となります。',
          answer: <>９時より16時までは御朱印所兼総合案内所で受付を行っております。16時より18時までは授与所にて紙のみのご対応となります。</>,
        },
      ],
      en: [
        {
          id: 'reisai',
          q: 'Why is the worship etiquette "2 bows, 4 claps, 1 bow"?',
          plainAnswer: 'Usually Shinto worship is "2 bows, 2 claps, 1 bow," but Usa Jingu follows the traditional ancient rite of "2 bows, 4 claps, 1 bow" passed down for generations.',
          answer: <>Usually, Shinto worship etiquette is &quot;2 bows, 2 claps, 1 bow,&quot; but at Usa Jingu, we follow the ancient tradition of &quot;2 bows, 4 claps, 1 bow.&quot; Although not documented in text, this custom has been preserved through ritual tradition. Shinto priests also perform the 4-clap ritual during official ceremonies.</>,
        },
        {
          id: 'honden',
          q: 'Where is the Main Sanctuary (Honden) located?',
          plainAnswer: 'The three main halls are built side-by-side behind the Chushimon gate at the Upper Shrine. Except for special viewings, visitors normally worship from the gate.',
          answer: <>Once you proceed to the Upper Shrine, the three sanctuary halls are built side-by-side behind the Chushimon gate. Except for special designated public viewings, visitors normally worship from the front gate rather than entering the sanctuary directly.</>,
        },
        {
          id: 'kusunoki',
          q: 'How old is the Sacred Camphor Tree (Goshinboku) in the Upper Shrine?',
          plainAnswer: 'The giant camphor tree in front of the Upper Shrine prayer hall is said to be about 800 years old.',
          answer: <>The giant sacred camphor tree standing in front of the Upper Shrine prayer hall is estimated to be approximately 800 years old.</>,
        },
        {
          id: 'pet',
          q: 'Are pets allowed within the shrine grounds?',
          plainAnswer: 'Pets are prohibited in the sacred areas including the path from Temizuya to Upper/Lower shrines, around the Hishigata Pond, and on the monorail.',
          answer: (
            <>
              To preserve the sacred dignity and address current considerations, pets are prohibited in the following areas of the shrine grounds. We appreciate your cooperation. (This restriction does not apply to service or assistance dogs.)
              <ul className="mt-4 space-y-1.5 pl-0 list-none">
                {[
                  'From the Temizuya purification font up to the Upper and Lower Shrines',
                  'Around the Hishigata Pond leading to the Sacred Springs (Goreisui)',
                  'On the Slope Monorail',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: GOLD }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: 'kigan',
          q: 'Do I need a reservation for prayers and blessing rituals?',
          plainAnswer: 'No reservation is needed for individuals and families. For companies or large groups, please contact us in advance.',
          answer: <>Reservations are not required for individuals and families. Please come directly to the Upper Shrine Prayer Hall reception desk. If you wish to request a ritual for companies, corporate entities, or large groups, please contact us in advance so we can prepare the necessary forms.</>,
          link: { label: l.linkText, to: '/worship/pray' },
        },
        {
          id: 'meotoishi',
          q: 'What are the "Husband and Wife Stones" (Meoto-ishi)?',
          plainAnswer: 'A popular spiritual spot for finding a good match. Standing on them is said to bring good relationships and long marriages.',
          answer: <>They are known as a spiritual &quot;power spot&quot; that brings blessings for good relationships and marriage. If visiting alone, stepping on both stones is said to bring a good match; if visiting as a couple, stepping on them together is said to grant a harmonious and long-lasting marriage. They are located in the stone pathway leading to the Wakamiya Shrine.</>,
        },
        {
          id: 'kuruma',
          q: 'Is the Upper Shrine accessible for wheelchair users?',
          plainAnswer: 'Yes, a monorail is operated for elderly and disabled visitors. Please check in advance as there are monthly maintenance closures.',
          answer: <>To ensure all visitors, including disabled and elderly guests, can comfortably worship, Usa Jingu operates a passenger monorail up to the Upper Shrine. Please feel free to use it. Please note that the monorail is closed for maintenance on designated days each month, so we advise inquiring beforehand.</>,
          link: { label: l.linkText, to: '/worship/monorail' },
        },
        {
          id: 'kashidashi',
          q: 'Are wheelchairs available for rent?',
          plainAnswer: 'Yes, wheelchair rental is available by reservation. Please contact us as the number of chairs is limited.',
          answer: <>Yes, we offer wheelchair rentals on a reservation basis. Since the number of wheelchairs is limited, please contact us in advance to check availability.</>,
        },
        {
          id: 'goshuuin',
          q: 'What are the hours for receiving Goshuuin (shrine seal stamps)?',
          plainAnswer: 'Shrine stamps are available at the main counter from 9:00 to 16:00. From 16:00 to 18:00, pre-written sheets are available at the amulets counter.',
          answer: <>From 9:00 to 16:00, Goshuuin are accepted and hand-written at the Goshuuin / Information Counter. From 16:00 to 18:00, only pre-written stamp sheets are distributed at the amulets counter.</>,
        },
      ],
      'zh-TW': [
        {
          id: 'reisai',
          q: '為什麼參拜作法是「二禮・四拍手・一禮」？',
          plainAnswer: '通常神設是「二禮二拍手一禮」，但宇佐神宮依據古老儀式傳承，遵循「二禮四拍手一禮」的傳統。',
          answer: <>通常神設的參拜作法為「二禮・二拍手・一禮」，但在宇佐神宮，自古以來皆遵循「二禮・四拍手・一禮」的傳統古禮。此作法雖無文獻確切記載，但已作為古儀保留至今。不僅一般信眾參拜，神職人員在舉行祭典時也使用「四拍手」的禮儀。</>,
        },
        {
          id: 'honden',
          q: '宇佐神宮的御本殿在哪裡？',
          plainAnswer: '三殿並排建立在上宮勅使門的後方。除了特別拜觀外，一般信眾在勅使門前進行參拜。',
          answer: <>前往上宮後，在信眾參拜的勅使門深處，並排建有三座本殿。除本殿特別開放展覽外，平時不對外開放近距離參拜，信眾通常在勅使門前遙拜。</>,
        },
        {
          id: 'kusunoki',
          q: '上宮的大楠（神木）樹齡是多少？',
          plainAnswer: '上宮祈禱殿前的大楠樹齡據說約有800年。',
          answer: <>位於上宮祈禱殿前方的巨大神木大楠，據說樹齡已有約 800 年。</>,
        },
        {
          id: 'pet',
          q: '可以攜帶寵物一同參拜嗎？',
          plainAnswer: '為維護神聖莊嚴，手水舍至上下宮周邊、菱形池周邊以及單軌電車內禁止攜帶寵物。',
          answer: (
            <>
              為維護境內的莊嚴與神聖，以下區域禁止攜帶寵物進入。感謝您的理解與配合。（導盲犬等輔助犬不在此限。）
              <ul className="mt-4 space-y-1.5 pl-0 list-none">
                {[
                  '手水舍至上宮及下宮周邊區域',
                  '通往御靈水之菱形池周邊區域',
                  '單軌電車內',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: GOLD }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: 'kigan',
          q: '我想進行祈願與消災，需要預約嗎？',
          plainAnswer: '個人或家族參拜無需預約，直接前往上宮祈禱殿受理處即可。公司團體請提前聯絡。',
          answer: <>個人與家族參拜無需提前預約。請直接前往上宮祈禱殿受理處辦理。如果是企業、法人等團體前來祈願與消災，因需提前準備申請表單，請務必提前電話與我們聯絡。</>,
          link: { label: l.linkText, to: '/worship/pray' },
        },
        {
          id: 'meotoishi',
          q: '什麼是「夫婦石」？',
          plainAnswer: '被視為保佑良緣成就的靈氣景點。單人踏上祈求良緣，雙人分踏祈求婚姻美滿。',
          answer: <>這是一處被認為能保佑祈求良緣成就的「靈氣景點（能量景點）」。單人前來時用雙腳踩在兩塊石頭上可帶來好緣分；兩人前來時左右腳分別踩在兩塊石頭上，則相傳能保佑雙方感情和睦、白頭偕老。這兩塊石頭位於通往境內若宮神社台階的石板路上。</>,
        },
        {
          id: 'kuruma',
          q: '使用輪椅的信眾可以前往上宮參拜嗎？',
          plainAnswer: '可以。境內設有單軌電車協助行动不便者前往上宮。每月有定期維護日，請提前確認。',
          answer: <>宇佐神宮為行動不便及高齡信眾設有單軌電車，協助前往上宮參拜。信眾可直接前往乘車處使用。另外，因每月有定期清潔與檢修日，出發前建議提前來電諮詢。</>,
          link: { label: l.linkText, to: '/worship/monorail' },
        },
        {
          id: 'kashidashi',
          q: '有提供輪椅租借嗎？',
          plainAnswer: '有。採取預約制，因數量有限，如有需求請提前聯絡。',
          answer: <>我們提供輪椅免費租借服務（採預約制）。因輪椅數量有限，有租借需求者請提前與神宮聯絡。</>,
        },
        {
          id: 'goshuuin',
          q: '御朱印的受理時間是幾點到幾點？',
          plainAnswer: '9:00至16:00在御朱印所兼綜合案內所辦理。16:00至18:00在授與所僅提供單張紙的御朱印。',
          answer: <>上午 9 點至下午 4 點，在「御朱印所兼綜合案內所」受理手寫御朱印。下午 4 點至 6 點，在授與所僅提供已書寫好的單張御朱印紙張。</>,
        },
      ],
      'zh-CN': [
        {
          id: 'reisai',
          q: '为什么参拜作法是「二礼・四拍手・一礼」？',
          plainAnswer: '通常神设是「二礼二拍手一礼」，但宇佐神宫依据古老仪式传承，遵循「二礼四拍手一礼」的传统。',
          answer: <>通常神设的参拜作法为「二礼・二拍手・一礼」，但在宇佐神宫，自古以来皆遵循「二礼・四拍手・一礼」的传统古礼。此作法虽无文献确切记载，但已作为古仪保留至今。不仅一般信众参拜，神职人员在举行祭典时也使用「四拍手」的礼仪。</>,
        },
        {
          id: 'honden',
          q: '宇佐神宫的御本殿在哪里？',
          plainAnswer: '三殿并排建立在上宫敕使门的后方。除了特别拜观外，一般信众在敕使门前进行参拜。',
          answer: <>前往上宫后，在信众参拜的敕使门深处，并排建有三座本殿。除本殿特别开放展览外，平时不对外开放近距离参拜，信众通常在敕使门前遥拜。</>,
        },
        {
          id: 'kusunoki',
          q: '上宫的大楠（神木）树龄是多少？',
          plainAnswer: '上宫祈祷殿前的大楠树龄据说约有800年。',
          answer: <>位于上宫祈祷殿前方的巨大神木大楠，据说树龄已有约 800 年。</>,
        },
        {
          id: 'pet',
          q: '可以携带宠物一同参拜吗？',
          plainAnswer: '为维护神圣庄严，手水舍至上下宫周边、菱形池周边以及单轨电车内禁止携带宠物。',
          answer: (
            <>
              为维护境内的庄严与神圣，以下区域禁止携带宠物进入。感谢您的理解与配合。（导盲犬等辅助犬不在此限。）
              <ul className="mt-4 space-y-1.5 pl-0 list-none">
                {[
                  '手水舍至上宫及下宫周边区域',
                  '通往御灵水之菱形池周边区域',
                  '单轨电车内',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: GOLD }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: 'kigan',
          q: '我想进行祈愿与消灾，需要预约吗？',
          plainAnswer: '个人或家族参拜无需预约，直接前往上宫祈祷殿受理处即可。公司团体请提前联系。',
          answer: <>个人与家族参拜无需提前预约。请直接前往上宫祈祷殿受理处办理。如果是企业、法人等团体前来祈愿与消灾，因需提前准备申请表单，请务必提前电话与我们联系。</>,
          link: { label: l.linkText, to: '/worship/pray' },
        },
        {
          id: 'meotoishi',
          q: '什么是「夫妇石」？',
          plainAnswer: '被视为保佑良缘成就的灵气景点。单人踏上祈求良缘，双人分踏祈求婚姻美满。',
          answer: <>这是一处被认为能保佑祈求良缘成就的「灵气景点（能量景点）」。单人前来时用双脚踩在两块石头上可带来好缘分；两人前来时左右脚分别踩在两块石头上，则相传能保佑双方感情和睦、白头偕老。这两块石头位于通往境内若宫神社台阶的石板路上。</>,
        },
        {
          id: 'kuruma',
          q: '使用轮椅的信众可以前往上宫参拜吗？',
          plainAnswer: '可以。境内设有单轨电车协助行动不便者前往上宫。每月有定期维护日，请提前确认。',
          answer: <>宇佐神宫为行动不便及高龄信众设有单轨电车，协助前往上宫参拜。信众可直接前往乘车处使用。另外，因每月有定期清洁与检修日，出发前建议提前来电咨询。</>,
          link: { label: l.linkText, to: '/worship/monorail' },
        },
        {
          id: 'kashidashi',
          q: '有提供轮椅租借吗？',
          plainAnswer: '有。采取预约制，因数量有限，如有需求请提前联系。',
          answer: <>我们提供轮椅免费租借服务（采预约制）。因轮椅数量有限，有租借需求者请提前与神宫联系。</>,
        },
        {
          id: 'goshuuin',
          q: '御朱印的受理时间是几点到几点？',
          plainAnswer: '9:00至16:00在御朱印所兼综合案内所办理。16:00至18:00在授与所仅提供单张纸的御朱印。',
          answer: <>上午 9 点至下午 4 点，在「御朱印所兼综合案内所」受理手写御朱印。下午 4 点至 6 点，在授与所仅提供已书写好的单张御朱印纸张。</>,
        },
      ],
      ko: [
        {
          id: 'reisai',
          q: '참배 작법이 왜 "2례・4박수・1례"인가요?',
          plainAnswer: '보통 신사 참배는 "2례 2박수 1례"이지만, 우사 신궁은 고대 전통에 따라 "2례 4박수 1례"의 작법을 지켜오고 있습니다.',
          answer: <>보통 신사에서의 참배 작법은 &quot;2례・2박수・1례&quot;이지만, 우사 신궁에서는 &quot;2례・4박수・1례&quot;의 작법으로 참배를 드리고 있습니다. 이 작법은 고대 전례에 근거하여 오늘날까지 온전히 지켜져 왔습니다. 신사에서 참배하는 분들뿐만 아니라 제례를 올리는 신직들도 행사 중 &quot;4박수&quot;를 올려 예를 표합니다.</>,
        },
        {
          id: 'honden',
          q: '우사 신궁의 본전은 어디에 있나요?',
          plainAnswer: '참배를 올리는 상궁 칙사문 뒤쪽에 세 채의 본전이 나란히 세워져 있으며, 보통 문 앞에서 참배하게 됩니다.',
          answer: <>상궁으로 올라가시면 참배하시는 칙사문(勅使門) 너머로 세 채의 본전이 나란히 자리하고 있습니다. 본전 특별 관람 기간을 제외하고는 보통의 경우 문 앞에서 참배를 올리게 됩니다.</>,
        },
        {
          id: 'kusunoki',
          q: '상궁에 있는 녹나무(신목)는 수령이 어떻게 되나요?',
          plainAnswer: '상궁 기도전 앞에 서 있는 거대한 녹나무의 수령은 약 800년으로 추정됩니다.',
          answer: <>상궁 기도전 앞에 자리한 거대한 신목(녹나무)은 수령이 약 800년인 것으로 전해집니다.</>,
        },
        {
          id: 'pet',
          q: '반려동물과 함께 참배해도 괜찮을까요?',
          plainAnswer: '신궁의 엄숙함을 유지하기 위해 테미즈야에서 상궁/하궁 구역, 고레이수이 주변 폰드, 모노레일 내에는 반려동물 동반이 제한됩니다.',
          answer: (
            <>
              우사 신궁에서는 존엄 유지와 쾌적한 참배 환경을 고려하여 아래 경내 구역에 반려동물 동반 입장을 제한하고 있습니다. 여러분의 너른 양해와 협조를 부탁드립니다. (맹인안내견 등 보조견 동반은 제외됩니다.)
              <ul className="mt-4 space-y-1.5 pl-0 list-none">
                {[
                  '테미즈야부터 상궁 및 하궁 주변 구역 일대',
                  '고레이수이(신비한 샘물)가 있는 히시가타 연못 주변 구역 일대',
                  '슬로프 모노레일 내부 및 대기 장소',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.45em] w-1 h-1 rounded-full shrink-0" style={{ background: GOLD }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ),
        },
        {
          id: 'kigan',
          q: '액막이 등의 기도 신청을 하고 싶은데 예약이 필수인가요?',
          plainAnswer: '개인이나 가족분들은 예약이 필요 없으며 기도전 접수처로 직접 오시면 됩니다. 단체 신청은 사전 연락이 필요합니다.',
          answer: <>개인 및 가족 단위 참배객분들은 별도의 사전 예약이 필요 없습니다. 당일 상궁 기도전 접수처로 직접 방문하셔서 신청하시면 됩니다. 다만, 기업이나 단체 기도를 원하시는 경우에는 서식 준비를 위해 사전에 미리 연락해 주시길 부탁드립니다.</>,
          link: { label: l.linkText, to: '/worship/pray' },
        },
        {
          id: 'meotoishi',
          q: '「부부석」이란 무엇인가요?',
          plainAnswer: '좋은 인연을 이어주는 영험한 명소입니다. 혼자서는 두 발로 디디고, 커플은 양쪽에 각각 디디면 축복을 받는다고 전해집니다.',
          answer: <>좋은 인연을 이어주는 효험이 있는 명소(파워 스팟)로 널리 알려져 있습니다. 혼자 오셨을 경우 두 발로 두 돌을 딛고 서면 좋은 연분을 만나며, 두 분이 함께 오셨을 경우 각각 왼쪽과 오른쪽 돌을 딛고 서면 백년해로한다고 전해집니다. 경내 와카미야 신사로 향하는 계단 돌 바닥에 위치하고 있습니다.</>,
        },
        {
          id: 'kuruma',
          q: '휠체어를 타고 상궁까지 올라가 참배할 수 있나요?',
          plainAnswer: '네. 거동이 불편하신 분들과 어르신들을 위해 슬로프 모노레일을 운행 중입니다. 정기 점검일이 있으므로 사전 확인을 권장합니다.',
          answer: <>우사 신궁에서는 연세가 많으신 어르신이나 거동이 불편하신 참배객분들이 안전하게 예배를 올릴 수 있도록 모노레일을 운행하고 있습니다. 신궁에 직접 오셔서 편하게 이용하실 수 있습니다. 단, 매달 정기 청소 및 선로 안전 점검으로 인해 운행이 중단되는 날이 있으니 방문 전에 미리 확인을 부탁드립니다.</>,
          link: { label: l.linkText, to: '/worship/monorail' },
        },
        {
          id: 'kashidashi',
          q: '휠체어 대여가 가능한가요?',
          plainAnswer: '네. 대여 서비스를 예약제로 운영하고 있습니다. 한정 수량이므로 사전에 문의해 주시기 바랍니다.',
          answer: <>네. 예약제로 휠체어 대여 서비스를 무상 제공하고 있습니다. 보유 수량이 한정되어 있으므로 사전에 신궁 사무소로 문의하셔서 이용해 주시기 바랍니다.</>,
        },
        {
          id: 'goshuuin',
          q: '고슈인(참배 증명 인장) 접수 시간은 어떻게 되나요?',
          plainAnswer: '오전 9시부터 오후 4시까지 고슈인소 겸 종합 안내소에서 현장 접수를 받으며, 오후 4시부터 6시까지는 수여소에서 사전 작성된 용지로만 수여합니다.',
          answer: <>오전 9시부터 오후 4시까지는 &apos;고슈인소 겸 종합안내소&apos;에서 현장 작성 및 접수가 가능합니다. 오후 4시부터 6시까지는 수여소에서 사전 인쇄된 인장 용지만 배부해 드리고 있습니다.</>,
        },
      ],
    };

    return dict[locale] || dict.ja;
  };

  const faqItems = getFaqItems();

  // Construct JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.plainAnswer,
      },
    })),
  };

  return (
    <div className="min-h-screen" style={{ background: IVORY, color: TEXT }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ▌HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={IMG_HERO}
          alt={l.title}
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
              {l.home}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              {l.title}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.6rem] tracking-[0.35em] uppercase mb-2.5">
              Frequently Asked Questions
            </p>
            <h1 className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-[0.3em] drop-shadow-md">
              {l.title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ▌INTRO ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 max-w-3xl mx-auto px-6 text-center select-none">
        <FadeIn>
          <p className="font-sans tracking-[0.45em] uppercase mb-5" style={{ fontSize: '0.55rem', color: GOLD }}>
            {l.subtitle}
          </p>
          <p className="font-sans text-[0.88rem] leading-[2.2] tracking-wide text-text-mid select-text">
            {l.intro}
          </p>
        </FadeIn>
      </section>

      <DiamondRule />

      {/* ▌FAQ LIST ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 max-w-3xl mx-auto px-6">
        {faqItems.map((item, i) => (
          <FaqAccordion key={item.id} item={item} index={i} locale={locale} />
        ))}

        {/* ── Photography / Media inquiry — highlight box ── */}
        <FadeIn delay={0.1} className="mt-10">
          <div
            className="relative py-9 px-8 md:px-10"
            style={{
              border: '1px solid rgba(162,122,40,0.3)',
              background: 'rgba(162,122,40,0.04)',
            }}
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-5 h-5 border-t border-l" style={{ borderColor: 'rgba(162,122,40,0.45)' }} />
            <span className="absolute top-0 right-0 w-5 h-5 border-t border-r" style={{ borderColor: 'rgba(162,122,40,0.45)' }} />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l" style={{ borderColor: 'rgba(162,122,40,0.45)' }} />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r" style={{ borderColor: 'rgba(162,122,40,0.45)' }} />

            {/* Statement */}
            <p className="font-serif text-[0.92rem] leading-[1.9] tracking-wide mb-5 text-text-body select-text">
              {l.photoQ}
            </p>

            {/* Arrow + response */}
            <div className="flex items-start gap-3 mb-6 select-text">
              <span className="font-sans mt-[0.3em] shrink-0" style={{ color: GOLD, fontSize: '0.75rem' }}>→</span>
              <p className="font-sans text-[0.88rem] leading-[2.1] tracking-wide text-text-mid">
                {l.photoA}
              </p>
            </div>

            <a
              href="tel:0978-37-0001"
              className="inline-flex items-center gap-3 px-5 py-3 font-sans tracking-[0.2em]"
              style={{
                background: IVORY,
                border: '1px solid rgba(162,122,40,0.3)',
                color: TEXT,
                fontSize: '0.8rem',
                textDecoration: 'none',
              }}
            >
              <Phone size={13} style={{ color: GOLD }} />
              <span style={{ color: TEXT_MUT, fontSize: '0.62rem', letterSpacing: '0.3em' }}>TEL</span>
              <span style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.15em' }}>0978-37-0001</span>
            </a>
          </div>
        </FadeIn>
      </section>

      <DiamondRule />

      {/* ▌CONTACT CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 select-none" style={{ background: 'rgba(242,236,228,0.53)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-sans tracking-[0.45em] uppercase mb-6" style={{ fontSize: '0.55rem', color: GOLD }}>
              {l.contactTitle}
            </p>
            <p className="font-sans text-[0.86rem] leading-[2.2] tracking-wide mb-8 text-text-mid select-text">
              {l.contactText}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 font-sans tracking-[0.3em] uppercase border px-8 py-3 transition-opacity hover:opacity-60 text-gold-lt"
              style={{ fontSize: '0.62rem', color: GOLD, borderColor: 'rgba(162,122,40,0.35)' }}
            >
              {l.contactBtn}
              <ChevronRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
