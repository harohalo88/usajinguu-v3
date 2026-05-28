'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ZoomIn,
  X,
  ChevronsUp,
  MapPin,
  Phone,
  Printer,
  ChevronRight
} from 'lucide-react';
import {
  C,
  F,
  TS,
  FadeIn,
  SectionBanner,
  DiamondRule,
  OrnamentDivider
} from '@/components/ShrineUI';

// ─────────────────────────────────────────────────────────────────────────────
// DATA  —  exact wording from .md file
// ─────────────────────────────────────────────────────────────────────────────
interface SubSection {
  title: string;
  date?: string;
  paragraphs: string[];
  hasImage: boolean;
}
interface Festival {
  id: string;
  name: string;
  date: string;
  paragraphs: string[];
  subsections?: SubSection[];
  hasImage: boolean;
}

const FESTIVALS: Festival[] = [
  {
    id: 'rinpi',
    name: '臨時奉幣祭（勅祭）',
    date: '１０年に一度斎行（前回は平成２７年１０月６日）',
    paragraphs: [
      '　天皇の思し召しによって勅使を神社に参向させ、天皇の祭文を神前に捧げ、奉幣を行う「勅使参向の社(ちょくしさんこうのやしろ)」と称される神社が、伊勢神宮を始め現在では全国に１６社あります。',
      '　そのうちの一社である当神宮では「宇佐和気使(わけづかい)」と称される即位奉告使や、 「宇佐使」と称される恒例祭・臨時祈願使の参向が養老４年（７２０）以来度々あり、大正１４年からは現在の１０年に１度の奉幣祭となりました。祭典前夜の宇佐市民・崇敬者による提灯(ちょうちん)行列など、多くの奉納式典が故実に従い厳粛にとり行われます。',
    ],
    hasImage: true,
  },
  {
    id: 'chine',
    name: '鎮疫祭（御心経会）',
    date: '２月１３日 (２月１２日～１５日)',
    paragraphs: [
      '　鎮疫祭は、かつて神宮境内に建立されていた、弥勒寺の守護神として奉斎された末社の八坂神社で斎行される祭典です。この祭典は「疫病災禍」を祓（はら）い鎮めるためのもので、前日の宵祭、当日の本殿祭に続き八坂神社前で祭典が行われます。その昔、夜中に執り行われ「般若心経」が唱えられていたため、今でも『御心経会』と呼ばれています。',
      '　２月１２日の夕方から行われる宵祭では、忌火を灯す「火入の儀」が執り行われ、斎庭に用意された庭燎用の火炉に神火が灯されます。この火によって焼かれた餅を食べると、一年間無病息災になるといわれています。',
      '　当日１３日は、上宮での「本殿祭」の後、「八坂神社祭」が斎行されます。八坂神社では、宮司の祝詞奏上に続き、「幣越神事（へいごししんじ）」が行われます。この行事は、榊の代わりに一丈四尺もの竹に五色をつけた「大幣（たいへい）」が、供奉員により八坂神社へ放り奉られます。「大幣を手に入れると１年間無病息災でいられる」と云われており、多くの参拝者が大幣を授かろうと賑わいます。',
      '　神事には、舞「振鉾（えんぶ）」、舞楽「陵王（りょうおう）」、また僧侶方による般若心経読経も行われます。',
      '　この神仏習合で奉仕される「鎮疫祭」は、貴重な祭礼として昭和50年に大分県選択無形民俗文化財に指定されました。',
    ],
    hasImage: true,
  },
  {
    id: 'reisai',
    name: '例 祭（宇佐祭）',
    date: '３月１８日',
    paragraphs: [
      '　皇室より幣帛(へいはく)を賜り、斎行される宇佐神宮で最も重要な祭典で、宇佐祭ともいわれます。欽明天皇三十二年二月初卯の大神ご顕現ゆかりの日に斎行されます。',
    ],
    hasImage: true,
  },
  {
    id: 'otaue',
    name: '御田植祭',
    date: '６月の第４日曜日',
    paragraphs: [
      '　上宮本殿での祭祀が終わると、御田植神事に奉仕する斎主以下神職の行列が境内の斎田として設けられた斎場に向かいます。',
      '　水守が斎田に水を注ぎ鍬を担いで斎田を三巡、その後に郷司が水守を従えて田を一巡します。神職による奉楽のうちに、花傘(はながさ)をかぶり田の神に扮した少女（早乙女）が田植行事をします。素朴なうちにも典雅な神事です。',
    ],
    hasImage: true,
  },
  {
    id: 'shinkosai',
    name: '御神幸祭（夏越祭り）',
    date: '７月３１日・８月１日・８月２日',
    paragraphs: [
      '　「夏越大祭」「夏祭」「ごじんじ」等と呼ばれ多くの方々に親しまれていますが、正式には「宇佐神宮御神幸祭（ごしんこうさい）」と称します。古くは「御祓会（おはらいえ）」とも呼ばれ、人々の疫病を除き災厄を防ぐと共に、八幡総本宮として国家国民の安寧を祈願する意味合いがありました。',
      '　上宮での祭典の後、本殿より三所のご神体が三基の神輿(みこし)に乗り境内の頓宮(とんぐう)（御仮屋）まで御神幸になります。',
      '　神幸行列は、天狗のように赤く鼻高の猿田彦が道案内として先頭に立ち、鮮やかな色彩の装束をまとった「蝶」「鳥」「駒（馬）」の稚児が列を成します。続いて裃（かみしも）や直垂（ひたたれ）を着けた列奉行、太鼓・横笛・鉦を賑やかに奏でる道行囃子、三基の神輿、輿に乗った宮司と神職が従います。',
      '　神輿が頓宮に着くとご神体が仮殿に移され、その横を斎庭に設けられた祓所に三本の川御幣（昔は祓川の中に立てられていた）を立て、その前で「菅貫(すがぬき)神事」という解縄串(ときなわぐし)による古式の祓い神事が厳粛にとり行われ、国家安泰・五穀豊穣・万民息災などの祈念が込められます。',
      '　御神体と神輿は、頓宮で三日二夜を過ごされた後、再び行列を成して上宮御本殿へと御還幸されます。',
      '　御神幸祭期間中は、境内に特設舞台や屋台が設けられ多くの参拝者で賑わいます。',
    ],
    hasImage: true,
  },
  {
    id: 'yabusame',
    name: '流鏑馬神事',
    date: '８月１日',
    paragraphs: [
      '　毎年７月３１日より８月２日にかけて斎行される「宇佐神宮御神幸祭（夏越祭り）」の中日に、天下泰平・五穀豊穣・万民豊楽を祈念し、「流鏑馬神事」が境内大尾山参道の馬場で斎行されます。',
      '　令和元年８月１日、天皇陛下御即位を奉祝する流鏑馬神事が当神宮にて初めて斎行され、以降宇佐神宮を代表する伝統的な神事となりました。',
      '　当日は、弓馬術礼法小笠原流が射手を務め、近隣の学生など地元有志の方々とともにご奉仕をします。',
    ],
    hasImage: true,
  },
  {
    id: 'chushu',
    name: '仲秋祭（放生会）',
    date: '１０月体育の日、前日、前々日の３日間',
    paragraphs: [
      '　奈良時代より明治１３（１８８０）年まで「放生会」と呼ばれていましたが、以後仲秋祭と名称が変更となりました。',
      '　養老４（７２０）年、大隈・日向の隼人(はやと)の乱を鎮圧するため、大和朝廷は八幡神へ祈請し、薦枕（こもまくら）を神験（みしるし）として神輿に奉じ、戦地である大隅・日向に赴きました。この時の輿が、日本で初めての神輿とされています。',
      '　鎮定のため同５年両国に行幸、３ヵ年にわたって抵抗する隼人を平定して、同７年ご還幸になられました。',
      '　このとき、百人もの隼人の首をもち帰って葬った所が、神宮より西約１キロの所にある「凶首塚」です。また、隼人の霊を祠（まつ）る百太夫殿（現在の「百体神社」）が造立されました。 さらに、神亀元年（７２４）には「隼人の霊を慰めるため生会をすべし」との託宣があり、天平１６年（７４４）八幡神は和間(わま)の浜に行幸され、鎮圧された隼人の霊を慰めるため、蜷(にな)や貝を海に放つ「放生会」の祭典がとり行われました。これが｢放生会」の始まりです。',
    ],
    hasImage: true,
  },
  {
    id: 'fusai',
    name: '風除報賽祭',
    date: '１０月２０日～２１日',
    paragraphs: [
      '　毎年８月７日に斎行される「風除祭」では、田畑の安全と豊作を祈念しますが、１０月２０日の「風除報賽祭」は、五穀豊穣の祈念が成就したことを報賽する祭典です。神能、鉾(ほこ)立てなどの神事があります。',
    ],
    hasImage: true,
    subsections: [
      {
        title: '神能',
        date: '１０月２１日',
        paragraphs: [
          '　神宮能楽殿の見所に神籬(ひもろぎ)を設けて大神をお招きし、能舞台で神能が催されます。',
          '　能は観世流を主流としますが、地域性を重んじ「宇佐観世」とも呼ばれ地元で親しまれています。',
        ],
        hasImage: true,
      },
      {
        title: '鉾立神事',
        date: '１０月１９日～２１日',
        paragraphs: [
          '　祭典の前日ら、境内に風除報賽の意味で氏子が奉納した鉾(ほこ)を建てます。太綱を使った壮大なものです。',
        ],
        hasImage: true,
      },
    ],
  },
  {
    id: 'niinamesai',
    name: '新嘗祭',
    date: '１１月２３日',
    paragraphs: [
      '　新嘗祭（にいなめさい）とは、毎年11月23日に宮中をはじめ全国の神宮・神社で斎行される、日本の伝統的な祭儀の１つです。神の恵みと五穀豊穣を感謝する祭礼で、神前に新穀をお供えします。宮中においては、天皇陛下が新穀を神に献じ、それを自らも食されます。また、天皇の即位後、初めて斎行される新嘗祭を「大嘗祭（だいじょうさい）」と言います。',
      '　新嘗祭と対をなす祭礼として、毎年2月17日に「祈年祭（きねんさい）」というその年の豊穣を祈願する祭典があります。',
      '　当日は、氏子崇敬者の皆様方よりご奉納いただいた多くの新米をお供えし、五穀豊穣を参拝者と共に感謝します。',
    ],
    hasImage: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', right: '24px',
          background: 'none', border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff', cursor: 'pointer', borderRadius: '2px',
          padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px',
          fontFamily: F.sans, fontSize: '0.75rem', letterSpacing: '0.12em',
        }}
      >
        <X size={14} /> 閉じる
      </button>
      <img
        src={src}
        alt="祭典 拡大"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          objectFit: 'contain',
          boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL
// ─────────────────────────────────────────────────────────────────────────────
function FestivalThumbnail({ src, alt, onZoom }: { src: string; alt: string; onZoom: () => void }) {
  return (
    <div style={{ flexShrink: 0, textAlign: 'center' }}>
      <div
        onClick={onZoom}
        style={{
          width: '222px',
          height: '165px',
          overflow: 'hidden',
          border: `1px solid rgba(162,122,40,0.35)`,
          cursor: 'zoom-in',
          position: 'relative',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0)', transition: 'background 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.18)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)'; }}
        />
      </div>
      <button
        onClick={onZoom}
        style={{
          marginTop: '6px',
          width: '222px',
          background: C.dark,
          border: `1px solid rgba(162,122,40,0.4)`,
          color: 'rgba(250,248,245,0.7)',
          fontFamily: F.sans,
          fontSize: '0.68rem',
          letterSpacing: '0.16em',
          padding: '5px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <ZoomIn size={11} style={{ color: C.gold }} />
        拡大して見る
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE BADGE
// ─────────────────────────────────────────────────────────────────────────────
function DateBadge({ date }: { date: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '10px',
      backgroundColor: 'rgba(162,122,40,0.07)',
      border: `1px solid rgba(162,122,40,0.3)`,
      padding: '6px 14px',
      marginBottom: '16px',
    }}>
      <span style={{
        fontFamily: F.sans,
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: C.gold,
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        祭典日
      </span>
      <span style={{
        fontFamily: F.serif,
        fontSize: '0.88rem',
        letterSpacing: '0.1em',
        color: C.text,
      }}>
        {date}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FESTIVAL ROW  — one entry in the detail table
// ─────────────────────────────────────────────────────────────────────────────
function FestivalRow({
  festival,
  index,
  onZoom,
}: {
  festival: Festival;
  index: number;
  onZoom: (src: string) => void;
}) {
  const imgSrc = '/images/detail03-big.jpg';

  return (
    <div
      style={{ borderBottom: `1px solid rgba(162,122,40,0.15)` }}
    >
      {/* ── heading row ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: C.dark,
        padding: '12px 20px',
      }}>
        <span style={{
          fontFamily: F.serif,
          fontSize: '0.72rem',
          color: 'rgba(162,122,40,0.6)',
          letterSpacing: '0.2em',
          minWidth: '22px',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 style={{
          fontFamily: F.serif,
          fontSize: 'clamp(0.95rem, 2.2vw, 1.12rem)',
          letterSpacing: '0.28em',
          fontWeight: 400,
          color: '#faf8f5',
          margin: 0,
        }}>
          {festival.name}
        </h2>
      </div>

      {/* ── content row ── */}
      <div style={{
        display: 'flex',
        gap: '28px',
        padding: '22px 20px',
        backgroundColor: C.ivory,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* text block */}
        <div style={{ flex: 1, minWidth: '220px' }}>
          <DateBadge date={festival.date} />
          {festival.paragraphs.map((p, pi) => (
            <p key={pi} style={{ ...TS.body as React.CSSProperties, margin: '0 0 12px 0' }}>{p}</p>
          ))}

          {/* Sub-sections (e.g. 神能, 鉾立神事 inside 風除報賽祭) */}
          {festival.subsections?.map((sub, si) => (
            <div key={si} style={{ marginTop: '24px' }}>
              {/* sub-heading */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderLeft: `3px solid ${C.gold}`,
                paddingLeft: '12px',
                marginBottom: '10px',
              }}>
                <h3 style={{
                  fontFamily: F.serif,
                  fontSize: '0.95rem',
                  letterSpacing: '0.22em',
                  color: C.text,
                  margin: 0,
                  fontWeight: 500,
                }}>
                  {sub.title}
                </h3>
                {sub.date && (
                  <span style={{
                    fontFamily: F.sans,
                    fontSize: '0.72rem',
                    color: C.gold,
                    letterSpacing: '0.1em',
                  }}>
                    {sub.date}
                  </span>
                )}
              </div>
              {/* text + RHS thumbnail — same layout as main festival */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  {sub.paragraphs.map((p, pi) => (
                    <p key={pi} style={{ ...TS.bodySm as React.CSSProperties, margin: '0 0 10px 0' }}>{p}</p>
                  ))}
                </div>
                {sub.hasImage && (
                  <FestivalThumbnail
                    src={imgSrc}
                    alt={`${sub.title} 祭典写真`}
                    onZoom={() => onZoom(imgSrc)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RHS thumbnail — shown for all festivals except 風除報賽祭 */}
        {festival.id !== 'fusai' && (
          <FestivalThumbnail
            src={imgSrc}
            alt={`${festival.name} 祭典写真`}
            onZoom={() => onZoom(imgSrc)}
          />
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY TABLE  — quick overview at the top
// ─────────────────────────────────────────────────────────────────────────────
function SummaryTable() {
  const scrollToEntry = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{
      border: `1px solid rgba(162,122,40,0.22)`,
      overflow: 'hidden',
      marginBottom: '44px',
    }}>
      {/* table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '36px 1fr 1fr',
        backgroundColor: C.dark,
        padding: '10px 16px',
        gap: '0 16px',
      }}>
        {['No.', '祭 典 名', '祭 典 日'].map((h, i) => (
          <span key={i} style={{
            fontFamily: F.serif,
            fontSize: '0.75rem',
            color: 'rgba(162,122,40,0.75)',
            letterSpacing: '0.2em',
          }}>{h}</span>
        ))}
      </div>

      {/* table rows */}
      {FESTIVALS.map((f, fi) => (
        <button
          key={f.id}
          onClick={() => scrollToEntry(f.id)}
          style={{
            display: 'grid',
            gridTemplateColumns: '36px 1fr 1fr',
            gap: '0 16px',
            width: '100%',
            padding: '11px 16px',
            backgroundColor: fi % 2 === 0 ? C.ivory : C.stone,
            border: 'none',
            borderBottom: `1px solid rgba(162,122,40,0.1)`,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background 0.15s',
          }}
        >
          <span style={{
            fontFamily: F.serif,
            fontSize: '0.72rem',
            color: C.gold,
            letterSpacing: '0.12em',
          }}>
            {String(fi + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: F.serif,
            fontSize: '0.88rem',
            letterSpacing: '0.14em',
            color: C.crimson,
          }}>
            {f.name}
          </span>
          <span style={{
            fontFamily: F.sans,
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            color: C.textMid,
          }}>
            {f.date}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK-TO-TOP FLOATING BUTTON
// ────────────────────────────────────────────────────────────────────────────
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="ページ上部へ"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '28px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: C.dark,
        border: `1px solid rgba(162,122,40,0.5)`,
        borderRadius: '2px',
        padding: '10px 14px',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <ChevronsUp size={15} style={{ color: C.gold }} />
      <span style={{
        fontFamily: F.sans,
        fontSize: '0.58rem',
        letterSpacing: '0.16em',
        color: 'rgba(250,248,245,0.65)',
        whiteSpace: 'nowrap',
      }}>
        トップへ
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function FestivalDetailPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const locale = useLocale();

  // Scroll to hash anchor on mount (e.g. /festival-detail#chine)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      <BackToTopButton />

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg, ${C.dark} 0%, #2a1f10 100%)`,
        padding: 'clamp(52px, 10vw, 88px) 0 clamp(40px, 7vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative corner ornament */}
        <div style={{
          position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '32px', backgroundColor: 'rgba(162,122,40,0.4)',
        }} />
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >
              ホーム
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <Link
              href={`/${locale}/festivals/festival-list`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >
              お祭り・行事
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              祭儀の詳細
            </span>
          </nav>

          <p style={{
            fontFamily: F.sans, fontSize: '0.65rem', letterSpacing: '0.38em',
            textTransform: 'uppercase', color: 'rgba(162,122,40,0.65)',
            marginBottom: '18px',
          }}>
            Festival Ceremonies in Detail
          </p>
          <h1 style={{ ...TS.h1hero as React.CSSProperties, marginBottom: '0' }}>
            祭儀の詳細
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '12px', marginTop: '24px',
          }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.4)' }} />
            <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.4)' }} />
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="max-w-screen-lg mx-auto px-4 md:px-8" style={{ paddingTop: '52px', paddingBottom: '80px' }}>

        {/* Intro */}
        <FadeIn>
          <div style={{ marginBottom: '44px', borderLeft: `3px solid ${C.crimson}`, paddingLeft: '18px' }}>
            <p style={{ ...TS.eyebrow, color: C.textMute, marginBottom: '8px' }}>FESTIVALS &amp; CEREMONIES</p>
            <p style={{ ...TS.body as React.CSSProperties, color: C.textMid, margin: 0 }}>
              宇佐神宮では、年間を通じて数多くの祭事が執り行われます。古来より伝わる伝統的な祭儀は、地域の人々の心のよりどころです。下表より各祭典へ直接ご覧いただけます。
            </p>
          </div>
        </FadeIn>

        {/* Section banner — Summary */}
        <FadeIn delay={0.05}>
          <SectionBanner ja="祭典一覧" en="Festival Schedule Overview" />
        </FadeIn>

        {/* Summary table */}
        <FadeIn delay={0.1}>
          <SummaryTable />
        </FadeIn>

        <FadeIn delay={0.12}>
          <OrnamentDivider />
        </FadeIn>

        {/* Section banner — Details */}
        <FadeIn delay={0.14}>
          <SectionBanner ja="各祭典の詳細" en="Ceremony Details" />
        </FadeIn>

        {/* Detail cards */}
        <div style={{
          border: `1px solid rgba(162,122,40,0.22)`,
          overflow: 'hidden',
          marginBottom: '52px',
        }}>
          {FESTIVALS.map((festival, fi) => (
            <div key={festival.id} id={festival.id} style={{ scrollMarginTop: '130px' }}>
              <FadeIn delay={0.04 + fi * 0.04}>
                <FestivalRow
                  festival={festival}
                  index={fi}
                  onZoom={(src) => setLightboxSrc(src)}
                />
              </FadeIn>
            </div>
          ))}
        </div>

        <FadeIn>
          <DiamondRule />
        </FadeIn>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <FadeIn delay={0.06}>
          <div
            className="p-8 md:p-10"
            style={{ background: '#1e1810', border: '1px solid rgba(162,122,40,0.25)', marginTop: '44px' }}
          >
            <p style={{ fontFamily: F.sans, color: '#c49a3a', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Contact
            </p>
            <h3 style={{ fontFamily: F.serif, color: '#faf8f5', letterSpacing: '0.22em', fontWeight: 400, marginBottom: '20px', fontSize: '1rem' }}>
              【お問い合わせ】
            </h3>
            <div style={{ borderTop: '1px solid rgba(162,122,40,0.18)', paddingTop: '20px' }}>
              <p style={{ fontFamily: F.serif, color: '#faf8f5', fontSize: '0.95rem', letterSpacing: '0.18em', fontWeight: 500, marginBottom: '14px' }}>
                宇佐神宮
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin size={14} color="#c49a3a" strokeWidth={1.5} style={{ marginTop: '3px', flexShrink: 0 }} />
                  <p style={{ fontFamily: F.sans, color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.06em', lineHeight: 1.8 }}>
                    〒872-0102 大分県宇佐市南宇佐2859
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} color="#c49a3a" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <p style={{ fontFamily: F.sans, color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.08em' }}>
                    TEL：0978-37-0001
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Printer size={14} color="#c49a3a" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <p style={{ fontFamily: F.sans, color: 'rgba(250,248,245,0.8)', fontSize: '0.83rem', letterSpacing: '0.08em' }}>
                    FAX：0978-37-2748
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
