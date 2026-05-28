'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Images ────────────────────────────────────────────────────────────────────
const MAP_IMG       = '/images/usajingu_map.png';
const IMG_SAIDAIMON = '/images/saidaimon.jpeg';

// ── Design Tokens ─────────────────────────────────────────────────────────────
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

// ── Hotspot data ──────────────────────────────────────────────────────────────
type Hotspot = {
  id: string;
  name: string;
  kana: string;
  tag?: string;
  tagItems?: string[];
  desc: string;
  img: string;
  x: number; y: number; w: number; h: number;
  popSide: 'right' | 'left';
};

const IMG = IMG_SAIDAIMON;

// ── Highlight spot data ───────────────────────────────────────────────────────
type HighlightSpot = {
  id: string;
  badge?: string;
  badgeKind?: 'kokuho' | 'kokuShitei' | 'kenShitei';
  name: string;
  kana: string;
  deities?: string[];
  desc: string;
  img: string;
  link?: string;
};

const TOP_HIGHLIGHTS: HighlightSpot[] = [
  {
    id: 'jogu-hl',
    badge: '国宝',
    badgeKind: 'kokuho',
    name: '国宝 本殿',
    kana: 'こくほう ほんでん',
    deities: ['一之御殿　八幡大神', '二之御殿　比売大神', '三之御殿　神功皇后'],
    desc: '宇佐神宮の建築様式は八幡造(はちまんづくり)とよばれています。この八幡造は、二棟の切妻造平入の建物が前後に接続した形で、両殿の間に一間の相の間（馬道）がつき、その上の両軒に接するところに大きな金の雨樋(あまどい)が渡されています。桧皮葺(ひはだぶき)で白壁朱漆塗柱の華麗な建物が、横一列に並んでいます。内院には御帳台があり、外院には御椅子が置かれ、いずれも御神座となっています。',
    img: IMG,
  },
  {
    id: 'gegu-hl',
    name: '下宮（御炊宮）',
    kana: 'げぐう・みけみや',
    desc: '嵯峨天皇の弘仁年間（８１０年代）勅願によって創建され、上宮の御分神をご鎮祭になったことがきっかけで、八幡大神様・比売大神様・神功皇后様は上下御両宮のご鎮座となりました。「下宮参らにゃ片参り」と云われる所以です。下宮の八幡大神は、御饌(みけ)を司るとともに、農業や一般産業の発展、充実をお守りになるご神威を発揮されます。',
    img: IMG,
  },
  {
    id: 'goreisui-hl',
    name: '御霊水',
    kana: 'ごれいすい',
    desc: '亀山の麓、菱形池のほとり、三つの霊泉からなるこの御霊水は、上宮御本殿の真裏（北側）に位置し、往古、常に清水が湧き出で絶えることのない霊泉として知られています。欽明天皇三十二年（５７１）、八幡大神がこの御霊水の辺りに初めてご顕現になったと伝えています。',
    img: IMG,
  },
];

const SUB_HIGHLIGHTS: HighlightSpot[] = [
  {
    id: 'wakamiya-hl',
    badge: '国指定重要文化財',
    badgeKind: 'kokuShitei',
    name: '摂社 若宮神社',
    kana: 'わかみやじんじゃ',
    deities: ['大鷦鷯命（仁徳天皇）', '大葉枝皇子・小葉枝皇子', '隼別皇子・雌姫皇女'],
    desc: '天長元年（８２４）ご神託があって、仁壽２年（８５２）に造営創祀されました。応神天皇の若宮であられる大鷦鷯命（仁徳天皇）と皇子をお祀りしています。除災難・厄難の神様として有名です。',
    img: IMG,
  },
  {
    id: 'kurehashi-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '呉橋',
    kana: 'くれはし',
    desc: '呉橋は西参道にある屋根がついた神橋です。昔、呉の国の人が掛けたともいわれ、この名があります。鎌倉時代より以前からある橋です。',
    img: IMG,
  },
  {
    id: 'minamichuro-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '南中楼門（勅使門）',
    kana: 'みなみちゅうろうもん',
    deities: ['高良大明神', '阿蘇大明神'],
    desc: '神宮内郭の南正門。勅使門で通常は開かずの門です。入母屋造桧皮葺楼門、高良大明神、阿蘇大明神の二神を御門の神としてお祀りしています。',
    img: IMG,
  },
  {
    id: 'hokushin-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '末社 北辰神社',
    kana: 'ほくしんじんじゃ',
    deities: ['天御中主神', '高皇産霊神', '神皇産霊神'],
    desc: '神宮の上宮内、第一殿の西北に南面して祀られる小社で、比売大神の脇殿といわれ、本宮の地主神と伝えられる造化三神を祀っています。社殿は八幡造です。',
    img: IMG,
  },
  {
    id: 'saidaimon-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '西大門',
    kana: 'さいだいもん',
    desc: '西大門は文禄のころ（１５９２～）改築されたといわれ、以来この桃山風の華麗な構造となっています。屋根は切妻及び向唐破風造りで桧皮葺、内部はとくに極彩色が多用されています。',
    img: IMG,
  },
  {
    id: 'usatorii-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '宇佐鳥居（西大門鳥居）',
    kana: 'うさとりい',
    desc: '西大門前のこの木造鳥居は宇佐鳥居と称し大鳥居をはじめ他の鳥居はすべてこれと同じ形式のものです。額束はなく、台輪を柱上に置いています。宇佐の鳥居の規格となるものです。',
    img: IMG,
  },
  {
    id: 'takakura-hl',
    badge: '県指定有形文化財',
    badgeKind: 'kenShitei',
    name: '高倉',
    kana: 'たかくら',
    desc: '祭器具等を納める高倉の板倉です。寄棟造り桧皮葺。前面のみ持送りで縁を設け、擬宝珠高欄を備えています。床上が倉の本体です。',
    img: IMG,
  },
  {
    id: 'hozoken-hl',
    name: '宝物館',
    kana: 'ほうもつかん',
    desc: '当宮関係の国指定文化財、県指定文化財等数百点の文化財を収蔵、展示公開しています。深遠な宇佐の歴史と文化に触れることの出来る八幡文化の殿堂です。',
    img: IMG,
    link: '/about/museum',
  },
  {
    id: 'kodaibasu-hl',
    name: '古代蓮',
    kana: 'こだいばす',
    desc: '日本三沢の池に数えられる、宝物館前の『初沢の池』に咲く古代蓮が最も美しく咲くのは７月から８月。この蓮は、東大阪市日下町の旧家に伝わっていたものを１９７３年に移植したものです。',
    img: IMG,
  },
  {
    id: 'ichiigashi-hl',
    name: 'イチイガシ（一位樫）',
    kana: 'いちいがし',
    desc: '手水舎前の参道から上宮へ向かう階段付近に群生する木々は、イチイガシと楠を主体とした自然のままの常緑広葉樹林で、国の天然記念物に指定されています。表参道の並木もイチイガシです。',
    img: IMG,
  },
];

// ── Badge colour helper ───────────────────────────────────────────────────────
function badgeBg(kind?: HighlightSpot['badgeKind']): string {
  if (kind === 'kokuho')     return '#8B5E1A';
  if (kind === 'kokuShitei') return '#a50000';
  if (kind === 'kenShitei')  return '#3d6b5e';
  return '#7a6a5a';
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'hyakudan', name: '百段', kana: 'ひゃくだん',
    desc: '大昔に鬼がいて、「人を喰べていいか」と神に許しを乞うたところ、大神は、「わが宮の石段百段を一夜に築いたならば許してやろう」と言われました。鬼は懸命に石段を積みましたが、９９段目まで積み上げたとき、大神は、鶏を鳴かせて夜が明けたと告げられました。鬼は原(はる)の蛇堀の池に身を投げたといいます。これは百段にまつわる伝説です。昭和造営前の石段は大石を使った荒造りでした。',
    img: IMG, x: 37.2, y: 7.3, w: 5.9, h: 3.8, popSide: 'right',
  },
  {
    id: 'goreisui', name: '御霊水', kana: 'ごれいすい',
    desc: '上宮の裏、菱形池のほとりに三つの霊泉があります。御霊水(ごれいすい)、または御鍜治場(おかじば)、下井の霊水とも言い、八幡大神が御現れになったところであるとされています。ここには八角の影向石(ようごうせき)があり大神が神馬に召され、天翔けられたと伝えられる馬蹄の跡があります。また、奈良朝の末ごろ、社僧の神息(しんそく)が御霊水の前に三個 of 井戸を掘り、この水で八幡大神の神威を頂いて刀を鍛えました。これが社宝となっている『神息の刀』と伝えられています。',
    img: IMG, x: 38.6, y: 28.8, w: 7.6, h: 4.2, popSide: 'right',
  },
  {
    id: 'mizuwake', name: '水分神社', kana: 'みくまりじんじゃ', tag: '御祭神',
    tagItems: [
      '高龗神（たかおかみのかみ）',
      '天水分神（あめのみくまりのかみ）',
      '国水分神（くにのみくまりのかみ）',
      '天汲匏持神（あめのくはざもちのかみ）',
      '国汲匏持神（くにのくはざもちのかみ）',
    ],
    desc: '水を司る五神を祀る神社です。菱形池、御霊水前の小島に鎮座され、中島の竜宮様とも申し上げます。',
    img: IMG, x: 33.7, y: 34.1, w: 9.4, h: 3.9, popSide: 'right',
  },
  {
    id: 'tongu', name: '頓宮', kana: 'とんぐう',
    desc: '七月末、八月上旬毎年行われる神幸祭に、三日二夜の間御滞在になる御旅所(おたびしょ)に当る社殿です。昭和御造営に臨み、大鳥居の外側にあった社殿を応永年間の頓宮旧蹟に復されました。昔の造替の時の上宮、下宮、若宮の頓宮は、当時の各社殿に準じ、大きな規模であったことが古図に残っています。',
    img: IMG, x: 36.8, y: 45.3, w: 6, h: 3.8, popSide: 'right',
  },
  {
    id: 'togu', name: '春宮神社', kana: 'とうぐうじんじゃ', tag: '御祭神',
    tagItems: ['菟道稚郎子命（うじのわきいらつこのみこと）'],
    desc: '応神天皇の御子神で、勉学に励み寵愛されていましたが、兄の大鷦鷯命に皇太子の座を譲りました。学問の神としてご守護くださいます。',
    img: IMG, x: 72.8, y: 29, w: 9.2, h: 3.7, popSide: 'right',
  },
  {
    id: 'mokushoso', name: '木匠祖神社', kana: 'もくしょうそじんじゃ', tag: '御祭神',
    tagItems: [
      '手置帆負命（たおきほいのみこと）',
      '比古狭知命（ひこさしりのみこと）',
    ],
    desc: '宮大工・寺大工・桧皮師・塗師の職人達と、近郷近住の職人の守護神です。',
    img: IMG, x: 45, y: 47.9, w: 11.1, h: 3.7, popSide: 'right',
  },
  {
    id: 'yasaka', name: '八坂神社', kana: 'やさかじんじゃ', tag: '御祭神',
    tagItems: ['須佐之男命（すさのおのみこと）'],
    desc: '須佐之男命(すさのおのみこと)をお祀りしています。この神社の西側に昔の神宮寺弥勒寺の金堂や講堂の旧蹟があります。この神社の前で、毎年二月十三日に鎮疫祭(ちんえきさい)が行われます。',
    img: IMG, x: 74.3, y: 33.5, w: 9.3, h: 3.8, popSide: 'right',
  },
  {
    id: 'kameyama', name: '亀山神社', kana: 'かめやまじんじゃ', tag: '御祭神',
    tagItems: ['大山祇命（おおやまつみのみこと）'],
    desc: '上宮が鎮座している小椋山(おぐらやま)は亀山といいます。亀山神社は、亀山の山の神である大山積命(おおやまつみのみこと)を祀る神社です。',
    img: IMG, x: 48.7, y: 28.8, w: 8.8, h: 3.9, popSide: 'right',
  },
  {
    id: 'yako', name: '八子神社', kana: 'やこじんじゃ',
    desc: '八幡大神の八王子神をお祀りしております。社殿の構えはなく、上宮、西回廊の楠の木に鎮まっておられます。',
    img: IMG, x: 17.9, y: 5.2, w: 9.4, h: 4, popSide: 'right',
  },
  {
    id: 'oo', name: '大尾神社', kana: 'おおおじんじゃ', tag: '御祭神',
    tagItems: ['八幡大神'],
    desc: '天平勝宝元年（７４９）八幡大神は比売大神とともに奈良に行幸、天平勝宝７年（７５５）伊予の宇和に移り、１０年後奈多宮を経由して宇佐に御帰還になりました。その時、宇佐三山の一つ大尾山の頂上に御鎮座するとの託宣があったので、天平神護元年（７６５）に造営し、八幡大神様はここに約１５年間鎮座されました。この間の神護景雲３年（７６９）７月１１日、和気清麻呂公が弓削道鏡の事件に際して勅使として参拝され、八幡大神様より国体擁護の御神教を授かった霊地です。',
    img: IMG, x: 2.6, y: 38.8, w: 9.6, h: 3.9, popSide: 'right',
  },
  {
    id: 'goo', name: '護皇神社', kana: 'ごおうじんじゃ', tag: '御祭神',
    tagItems: ['和気清麻呂'],
    desc: '道鏡事件の際、八幡大神様の神託を受けて国の危機を救った和気清麻呂をお祀りしています。',
    img: IMG, x: 13.9, y: 40.4, w: 9.6, h: 3.8, popSide: 'right',
  },
  {
    id: 'yorimo', name: '寄藻川', kana: 'よりもがわ',
    desc: '宇佐神宮の神域を流れる川で、源は御許山の南にあり、流れの末端は、古くから放生会を行っている和間の浜で、周防灘に注いでいます。寄藻川は、この川の総称で、呉橋から川上を寄藻川、また呉橋川といい、呉橋から表参道の神橋までを月瀬川、表参道神橋から神社の境域付近を浅瀬川といい、場所によって名が変わります。『古事記』、『日本書紀』にある「菟狭の川上」はここのことで、寄藻川沿岸はいろいろな史蹟に富んでいます。',
    img: IMG, x: 48, y: 84.5, w: 8.5, h: 4.1, popSide: 'right',
  },
  {
    id: 'hishigata', name: '菱形池', kana: 'ひしがたいけ',
    desc: '欽明天皇三十二年、八幡大神が御現われになった霊池です。その名の所以は宇佐の三山、菱形にかこまれているため、古くから霊池として有名です。',
    img: IMG, x: 46.1, y: 39.4, w: 8.4, h: 3.9, popSide: 'right',
  },
  {
    id: 'hatsusawa', name: '初澤池', kana: 'はつさわのいけ',
    desc: '参集殿・宝物館との間に隣接しているこの池は、奈良の猿沢(さるさわ)の池、京都の広沢(ひろさわ)の池と並ぶ日本三沢の池として古くから有名です。７月～８月にかけて古代蓮が美しく咲きます。',
    img: IMG, x: 72.7, y: 68.1, w: 8.4, h: 4.2, popSide: 'right',
  },
  {
    id: 'haraijo', name: '祓所', kana: 'はらいじょ',
    desc: '勅使奉幣祭をはじめ大祓式などの祭典の祓の儀を行う所です。この前の広場を古くより御輿掛(おこしかけ)と称し、宮司の輿を倚するところです。',
    img: IMG, x: 73.4, y: 24.3, w: 6.1, h: 4.1, popSide: 'right',
  },
  {
    id: 'kasuga', name: '春日神社', kana: 'かすがじんじゃ', tag: '御祭神',
    tagItems: ['天児屋根命（あめのこやねのみこと）'],
    desc: '一之御殿、八幡大神の脇殿です。ご祭神の天児屋根命(あめのこやねのみこと)は春日大明神とも言われ、神功皇后をお助けになった尊神です。',
    img: IMG, x: 22.1, y: 32.7, w: 9.2, h: 4.1, popSide: 'right',
  },
  {
    id: 'sumiyoshi', name: '住吉神社', kana: 'sumiyoshijinja', tag: '御祭神',
    tagItems: [
      '表筒男命（うはづつのおのみこと）',
      '中筒男命（なかつつのおのみこと）',
      '底筒男命（そこつつのおのみこと）',
    ],
    desc: '三之御殿、神功皇后の脇殿。神功皇后に数々のご神威を与えられた住吉大神を弘仁１４年(８２３年)よりお祭りしています。',
    img: IMG, x: 2.1, y: 32.9, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'jogu', name: '上宮 本殿', kana: 'じょうぐう ほんでん', tag: '国宝',
    desc: '宇佐神宮の建築様式は八幡造(はちまんづくり)とよばれています。奥殿を「内院」、前殿を「外院」といいます。内院には御帳台があり、外院には御椅子が置かれ、いずれも御神座となっています。御帳台は神様の夜のご座所であり、椅子は昼のご座所と考えられています。',
    img: IMG, x: 33.9, y: 20.7, w: 6.1, h: 4, popSide: 'right',
  },
  {
    id: 'gegu', name: '下宮 (御炊宮)', kana: 'gegu / mikemiya',
    desc: '下宮の八幡大神は、御饌(みけ)を司るとともに、農業や一般産業の発展、充実をお守りになるご神威を発揮されます。古くから日常の祭祀には、とくに国民一般の祈願や報賽(ほうさい)が行われてきました。',
    img: IMG, x: 68.7, y: 5.3, w: 6.2, h: 3.9, popSide: 'right',
  },
  {
    id: 'wakamiya', name: '若宮神社', kana: 'wakamiya jinja', tag: '国指定重要文化財',
    desc: '応神天皇の若宮であられる大鷦鷯命(仁徳天皇)と皇子をお祀りしています。除災難・厄難の神様として有名です。',
    img: IMG, x: 57.3, y: 14.1, w: 9.5, h: 4.2, popSide: 'right',
  },
  {
    id: 'kurehashi', name: '呉橋', kana: 'kurehashi', tag: '県指定重要文化財',
    desc: '鎌倉時代より以前からある西参道の屋根がついた神橋です。昔、呉の国の人が掛けたともいわれ、この名があります。',
    img: IMG, x: 80.8, y: 45.7, w: 6.7, h: 3.8, popSide: 'left',
  },
  {
    id: 'minamichuro', name: '南中楼門 (勅使門)', kana: 'minamichuro / chokushimon', tag: '県指定重要文化財',
    desc: '神宮内郭の南正門。高良大明神、阿蘇大明神の二神を御門の神としてお祀りしています。',
    img: IMG, x: 7.1, y: 8, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'hokushin', name: '北辰神社', kana: 'hokushinjinja', tag: '県指定重要文化財',
    desc: '比売大神の脇殿といわれ、本宮の地主神と伝えられる造化三神を祀っています。上宮西中門の中に鎮座しています。',
    img: IMG, x: 12.1, y: 32.7, w: 9.3, h: 4.1, popSide: 'right',
  },
  {
    id: 'saidaimon', name: '西大門', kana: 'saidaimon', tag: '県指定重要文化財',
    desc: '文禄のころ（１５９２～）改築されたといわれ、国宝の本殿・勅使門などと共に宇佐神宮の景観を象徴する建物です。',
    img: IMG, x: 48.2, y: 9.3, w: 7.4, h: 3.8, popSide: 'right',
  },
  {
    id: 'usatorii', name: '宇佐鳥居', kana: 'usatorii', tag: '県指定重要文化財',
    desc: '宇佐古来の形式をもつもので、額束(がくづか)はなく、台輪を柱上に置いています。宇佐の鳥居の規格となるものです。',
    img: IMG, x: 57, y: 5.5, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'takakura', name: '高倉', kana: 'takakura', tag: '県指定重要文化財',
    desc: '祭器具等を納める高倉の板倉です。前面のみ持送りで縁を設け、擬宝珠(ぎぼし)高欄を備えています。',
    img: IMG, x: 63.4, y: 9.7, w: 6.1, h: 3.7, popSide: 'right',
  },
  {
    id: 'kuroo', name: '黒男神社', kana: 'kuroojinja', tag: '御祭神',
    tagItems: ['武内宿禰（たけのうちのすくねのみこと）'],
    desc: '武内宿禰は、景行天皇、成務天皇、仲哀天皇、応神天皇、仁徳天皇と、五代の天皇に二百四十余年もの間大臣として仕えたと伝えられます。数多くの功労があり、忠誠を尽くされたことをもってお祀りされています。八幡大神にご奉仕された神であり、古くから大鳥居の外に鎮座になって大神をお護りされています。長寿・忠誠・奉仕などの高いご神徳を授けられます。',
    img: IMG, x: 56.6, y: 76.2, w: 9.2, h: 3.7, popSide: 'left',
  },
  {
    id: 'monorail', name: 'モノレール のりば', kana: '',
    desc: '宇佐神宮では、体の不自由な方・高齢の方・ベビーカーのご家族様により良いご参拝が出来ますように無料でモノレールの運行を行っています。ご利用時間：午前8時～午後4時30分。乗車定員：定員6名または定員4名＋車イス1台。※車イス2台の乗車不可。※危険防止のため着席または手すりにおつかまり下さい。',
    img: IMG, x: 44.8, y: 1, w: 17.4, h: 4, popSide: 'right',
  },
];

// ── Shared card body (used in both desktop overlay and mobile panel) ──────────
function CardBody({ active }: { active: Hotspot }) {
  return (
    <>
      <div style={{ height: '180px', flexShrink: 0 }}>
        <img
          src={active.img}
          alt={active.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          draggable={false}
        />
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '2px' }}>
          {active.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: '10px' }}>
          （{active.kana}）
        </p>
        {active.tag && (
          <div style={{ marginBottom: '10px' }}>
            <span style={{
              display: 'inline-block', backgroundColor: C.crimson, color: '#fff',
              fontFamily: 'var(--font-sans)', fontSize: '0.92rem',
              letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '2px', lineHeight: 1.7,
            }}>
              {active.tag}
            </span>
          </div>
        )}
        {active.tagItems && (
          <div style={{ marginBottom: '10px' }}>
            {active.tagItems.map((item, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.78rem',
                lineHeight: 1.9, paddingLeft: '0.8em', textIndent: '-0.8em',
              }}>
                <span style={{ color: C.gold, marginRight: '4px' }}>・</span>{item}
              </p>
            ))}
          </div>
        )}
        {active.tagItems && (
          <div style={{ height: '1px', backgroundColor: C.border, marginBottom: '10px' }} />
        )}
        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.88rem', lineHeight: 1.9 }}>
          {active.desc}
        </p>
      </div>
    </>
  );
}

// ── DiamondRule ───────────────────────────────────────────────────────────────
function DiamondRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full ${className}`}>
      <div style={{ height: '1px', flex: 1, backgroundColor: C.border }} />
      <div style={{ width: '6px', height: '6px', backgroundColor: C.gold, transform: 'rotate(45deg)' }} />
      <div style={{ height: '1px', flex: 1, backgroundColor: C.border }} />
    </div>
  );
}

// ── MapGuideBar ───────────────────────────────────────────────────────────────
function MapGuideBar({ isMobile }: { isMobile: boolean }) {
  const VDivider = () => (
    <div style={{ width: '1px', backgroundColor: 'rgba(165,0,0,0.12)', alignSelf: 'stretch', flexShrink: 0 }} />
  );

  const Compass = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg viewBox="0 0 64 64" width="60" height="60">
        <circle cx="32" cy="32" r="28" fill="white" stroke="#555" strokeWidth="1.5" />
        <path
          d="M32 10 C24 17, 19 24, 19 32 A13 13 0 0 1 45 32 C45 24, 40 17, 32 10 Z"
          fill="#2c2c2c"
        />
      </svg>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', color: '#2c2c2c', letterSpacing: '0.06em' }}>北</span>
    </div>
  );

  const CursorIcon = () => (
    <svg viewBox="0 0 20 24" width="16" height="19" style={{ display: 'block' }}>
      <path d="M2 2 L2 20 L7 15 L10 22 L13 21 L10 14 L17 14 Z" fill="#222" stroke="#fff" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  );

  const MonorailArrow = () => (
    <svg viewBox="0 0 46 12" width="46" height="12" style={{ display: 'block', flexShrink: 0 }}>
      <polygon points="0,2 9,6 0,10" fill="#e07820" />
      <line x1="10" y1="6" x2="18" y2="6" stroke="#e07820" strokeWidth="2" strokeDasharray="3,2" />
      <polygon points="18,2 27,6 18,10" fill="#e07820" />
      <line x1="28" y1="6" x2="46" y2="6" stroke="#e07820" strokeWidth="2" strokeDasharray="3,2" />
    </svg>
  );

  const Badge = ({ text, bg }: { text: string; bg: string }) => (
    <div style={{
      minWidth: '26px', height: '22px', borderRadius: '3px',
      backgroundColor: bg, color: '#fff',
      fontFamily: 'var(--font-sans)', fontSize: text.length > 2 ? '0.6rem' : '0.75rem',
      fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 4px', flexShrink: 0, letterSpacing: '0',
    }}>
      {text}
    </div>
  );

  const legendItems = [
    { badge: <Badge text="P"  bg="#7b29c5" />, label: '駐車場' },
    { badge: <Badge text="BP" bg="#2ea843" />, label: '駐輪場' },
    { badge: <Badge text="WC" bg="#1a6bb5" />, label: 'トイレ' },
  ];

  const labelTx: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', color: C.textMid,
    fontSize: '0.72rem', lineHeight: 1.7, letterSpacing: '0.02em',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      border: '1px solid rgba(165,0,0,0.15)',
      borderRadius: '5px',
      backgroundColor: C.ivory,
      overflow: 'hidden',
      marginBottom: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    }}>

      {/* ① Compass */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: isMobile ? '14px 0' : '16px 20px',
        backgroundColor: '#f8f6f2',
        borderBottom: isMobile ? '1px solid rgba(165,0,0,0.12)' : 'none',
        flexShrink: 0,
        justifyContent: 'center',
      }}>
        <Compass />
      </div>

      {!isMobile && <VDivider />}

      {/* ② 操作案内 */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: '14px',
        padding: '14px 18px',
        borderBottom: isMobile ? '1px solid rgba(165,0,0,0.12)' : 'none',
      }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            border: '1.5px solid #2c2c2c',
            padding: '4px 10px',
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}>
            <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.82rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>名　称</span>
          </div>
          <CursorIcon />
        </div>
        <p style={{ ...labelTx, margin: 0 }}>
          黒いワクの上に書かれた名称に
          {isMobile
            ? <><strong style={{ color: C.crimson }}>タップする</strong>と、詳しい説明を表示します。</>
            : <><strong style={{ color: C.crimson }}>カーソルを合わせる</strong>と、詳しい説明を表示します。</>
          }
        </p>
      </div>

      {!isMobile && <VDivider />}

      {/* ③ 印刷用一覧ページ */}
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
        padding: '14px 18px',
        flexShrink: 0,
        borderBottom: isMobile ? '1px solid rgba(165,0,0,0.12)' : 'none',
      }}>
        <p style={{ ...labelTx, margin: 0, whiteSpace: 'nowrap' }}>
          地図内で紹介している<br />場所の印刷用一覧<br />ページはこちら
        </p>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            title="準備中"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '1px', padding: '10px 16px',
              backgroundColor: C.gold, color: '#fff', border: 'none', borderRadius: '3px',
              cursor: 'not-allowed', opacity: 0.78,
              fontFamily: 'var(--font-serif)', fontSize: '0.78rem', letterSpacing: '0.08em',
              lineHeight: 1.6, boxShadow: '0 2px 6px rgba(162,122,40,0.25)',
            }}
          >
            <span>印刷用</span>
            <span>一覧ページ</span>
          </button>
          <span style={{
            position: 'absolute', top: '-7px', right: '-6px',
            backgroundColor: C.crimson, color: '#fff',
            fontFamily: 'var(--font-sans)', fontSize: '0.52rem', letterSpacing: '0.04em',
            padding: '1px 5px', borderRadius: '8px', whiteSpace: 'nowrap',
          }}>準備中</span>
        </div>
      </div>

      {!isMobile && <VDivider />}

      {/* ④ 凡例 */}
      <div style={{
        padding: '14px 16px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <div style={{ width: '3px', height: '13px', backgroundColor: C.gold, borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.78rem', letterSpacing: '0.14em' }}>凡　例</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px', alignItems: 'flex-start' }}>
          {legendItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {item.badge}
              <span style={{ ...labelTx, whiteSpace: 'nowrap' }}>{item.label}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            <div style={{ paddingTop: '2px' }}>
              <MonorailArrow />
            </div>
            <span style={{ ...labelTx, lineHeight: 1.5 }}>モノレールのりば<br />までの順路</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Highlights Section ────────────────────────────────────────────────────────
function HighlightsSection() {
  const locale = useLocale();

  const TopCardInner = ({ spot }: { spot: HighlightSpot }) => (
    <div style={{
      backgroundColor: C.ivory,
      border: `1px solid ${C.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}>
      <div style={{ height: '260px', flexShrink: 0, overflow: 'hidden' }}>
        <img src={spot.img} alt={spot.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          draggable={false} />
      </div>
      <div style={{ padding: '22px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {spot.badge && (
          <div style={{ marginBottom: '10px' }}>
            <span style={{
              display: 'inline-block', backgroundColor: badgeBg(spot.badgeKind),
              color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.96rem',
              letterSpacing: '0.05em', padding: '3px 11px', borderRadius: '2px', lineHeight: 1.7,
            }}>{spot.badge}</span>
          </div>
        )}
        <h3 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '4px' }}>
          {spot.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '14px' }}>
          （{spot.kana}）
        </p>
        {spot.deities && (
          <>
            <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '6px' }}>御祭神</p>
            <div style={{ marginBottom: '12px' }}>
              {spot.deities.map((d, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.88rem', lineHeight: 1.9, paddingLeft: '0.9em', textIndent: '-0.9em' }}>
                  <span style={{ color: C.gold, marginRight: '4px' }}>・</span>{d}
                </p>
              ))}
            </div>
            <div style={{ height: '1px', backgroundColor: C.border, marginBottom: '14px' }} />
          </>
        )}
        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.95rem', lineHeight: 1.95, flex: 1 }}>
          {spot.desc}
        </p>
      </div>
    </div>
  );

  const SubCardInner = ({ spot }: { spot: HighlightSpot }) => (
    <div style={{
      backgroundColor: C.ivory,
      border: `1px solid ${C.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 3px 14px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}>
      <div style={{ height: '170px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
        <img src={spot.img} alt={spot.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          draggable={false} />
        {spot.link && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(162,122,40,0.88) 0%, transparent 100%)',
            padding: '22px 12px 9px', display: 'flex', justifyContent: 'flex-end',
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: '#fff',
              letterSpacing: '0.06em', borderBottom: '1px solid rgba(255,255,255,0.55)', paddingBottom: '1px',
            }}>詳細はこちら →</span>
          </div>
        )}
      </div>
      <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {spot.badge && (
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block', backgroundColor: badgeBg(spot.badgeKind),
              color: '#fff', fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
              letterSpacing: '0.04em', padding: '2px 9px', borderRadius: '2px', lineHeight: 1.7,
            }}>{spot.badge}</span>
          </div>
        )}
        <h4 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '3px' }}>
          {spot.name}
        </h4>
        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '10px' }}>
          （{spot.kana}）
        </p>
        {spot.deities && (
          <div style={{ marginBottom: '9px' }}>
            {spot.deities.map((d, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.82rem', lineHeight: 1.8, paddingLeft: '0.9em', textIndent: '-0.9em' }}>
                <span style={{ color: C.gold, marginRight: '3px' }}>・</span>{d}
              </p>
            ))}
            <div style={{ height: '1px', backgroundColor: C.border, margin: '8px 0' }} />
          </div>
        )}
        <p style={{
          fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.88rem', lineHeight: 1.88, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 4, overflow: 'hidden',
        } as React.CSSProperties}>
          {spot.desc}
        </p>
      </div>
    </div>
  );

  const TopCard = ({ spot }: { spot: HighlightSpot }) =>
    spot.link
      ? <Link href={`/${locale}${spot.link}`} style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}><TopCardInner spot={spot} /></Link>
      : <TopCardInner spot={spot} />;

  const SubCard = ({ spot }: { spot: HighlightSpot }) =>
    spot.link
      ? <Link href={`/${locale}${spot.link}`} style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%' }}><SubCardInner spot={spot} /></Link>
      : <SubCardInner spot={spot} />;

  return (
    <section style={{ backgroundColor: C.stone, borderTop: `1px solid ${C.border}`, padding: '64px 0 96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1.65rem',
            letterSpacing: '0.18em', fontWeight: 300, marginBottom: '22px',
          }}>境内の見どころ</h2>
          <div style={{ maxWidth: '200px', margin: '0 auto' }}>
            <DiamondRule />
          </div>
        </div>

        <style>{`
          .hl-top-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 40px;
          }
          .hl-sub-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          @media (max-width: 767px) {
            .hl-top-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              margin-bottom: 28px;
            }
            .hl-sub-grid {
              grid-template-columns: 1fr;
              gap: 16px;
            }
          }
        `}</style>

        <div className="hl-top-grid">
          {TOP_HIGHLIGHTS.map(spot => (
            <div key={spot.id} style={{ display: 'flex', minWidth: 0 }}>
              <TopCard spot={spot} />
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '36px' }}>
          <DiamondRule />
        </div>

        <div className="hl-sub-grid">
          {SUB_HIGHLIGHTS.map(spot => (
            <div key={spot.id} style={{ display: 'flex', minWidth: 0 }}>
              <SubCard spot={spot} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GroundsPage() {
  const locale = useLocale();
  const [activeId, setActiveId]         = useState<string | null>(null);
  const [isMobile, setIsMobile]         = useState(false);
  const [mapZoom, setMapZoom]           = useState(1);

  const infoPanelRef = useRef<HTMLDivElement>(null);

  const active = HOTSPOTS.find(h => h.id === activeId) ?? null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile && activeId && infoPanelRef.current) {
      setTimeout(() => infoPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
    }
  }, [isMobile, activeId]);

  const ZOOM_STEPS = [1, 1.5, 2, 2.5];
  const zoomIn  = () => setMapZoom(v => { const i = ZOOM_STEPS.indexOf(v); return ZOOM_STEPS[Math.min(i + 1, ZOOM_STEPS.length - 1)]; });
  const zoomOut = () => setMapZoom(v => { const i = ZOOM_STEPS.indexOf(v); return ZOOM_STEPS[Math.max(i - 1, 0)]; });

  const hsEnter = (id: string) => { if (!isMobile) setActiveId(id); };
  const hsLeave = ()            => { if (!isMobile) setActiveId(null); };
  const hsTap   = (id: string) => {
    if (!isMobile) return;
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={MAP_IMG}
          alt="境内風景"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,3,3,0.48) 0%, rgba(10,3,3,0.65) 100%)' }} />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, paddingTop: '64px' }}
        >
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
              ご参拝・ご祈願
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              境内案内
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Precinct Guide
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)' }}>
              境内案内
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Map Section ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-screen-xl mx-auto">

          {/* ── Map guide bar ─────────────────────────────────────────────── */}
          <MapGuideBar isMobile={isMobile} />

          {/* ── Toolbar: zoom (mobile) ───────────────────────────────────── */}
          <div className="flex items-center justify-between mb-3 gap-2">
            {isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={zoomOut} disabled={mapZoom === ZOOM_STEPS[0]}
                  style={{
                    width: '32px', height: '32px', borderRadius: '4px', border: `1px solid ${C.border}`,
                    backgroundColor: mapZoom === ZOOM_STEPS[0] ? '#f0ece5' : C.ivory,
                    color: mapZoom === ZOOM_STEPS[0] ? '#ccc' : C.text,
                    fontSize: '1.2rem', cursor: mapZoom === ZOOM_STEPS[0] ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >−</button>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: C.textMute, minWidth: '30px', textAlign: 'center' }}>
                  {mapZoom}×
                </span>
                <button
                  onClick={zoomIn} disabled={mapZoom === ZOOM_STEPS[ZOOM_STEPS.length - 1]}
                  style={{
                    width: '32px', height: '32px', borderRadius: '4px', border: `1px solid ${C.border}`,
                    backgroundColor: mapZoom === ZOOM_STEPS[ZOOM_STEPS.length - 1] ? '#f0ece5' : C.ivory,
                    color: mapZoom === ZOOM_STEPS[ZOOM_STEPS.length - 1] ? '#ccc' : C.text,
                    fontSize: '1.2rem', cursor: mapZoom === ZOOM_STEPS[ZOOM_STEPS.length - 1] ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >＋</button>
                {mapZoom > 1 && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: C.textMute }}>スクロールで移動</span>
                )}
              </div>
            )}
            {!isMobile && <div />}
          </div>

          {/* ── Map wrapper ──────────────────────────────────────────────── */}
          <div style={{ position: 'relative' }}>

            <div
              style={isMobile ? {
                overflowX: 'auto',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
                borderRadius: '4px',
                border: `1px solid ${C.border}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
                maxHeight: '64vw',
                backgroundColor: '#e8e4db',
              } : {}}
            >
              <div
                className="relative select-none"
                style={{
                  width: isMobile ? `${mapZoom * 100}%` : '100%',
                  minWidth: isMobile ? `${mapZoom * 100}%` : undefined,
                  backgroundColor: '#e8e4db',
                  border: !isMobile ? `1px solid ${C.border}` : 'none',
                  boxShadow: !isMobile ? '0 10px 30px rgba(0,0,0,0.07)' : 'none',
                  cursor: isMobile ? 'grab' : 'default',
                  overflow: isMobile ? 'visible' : 'visible',
                  borderRadius: !isMobile ? '4px' : 0,
                }}
              >
                <img
                  src={MAP_IMG}
                  alt="境内図"
                  style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none', pointerEvents: 'none' }}
                  draggable={false}
                />

                <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
                  {HOTSPOTS.map((hs) => (
                    <div
                      key={hs.id}
                      className="absolute"
                      style={{
                        left: `${hs.x}%`, top: `${hs.y}%`,
                        width: `${hs.w}%`, height: `${hs.h}%`,
                        cursor: 'pointer',
                        backgroundColor: isMobile && activeId === hs.id ? 'rgba(162,122,40,0.25)' : 'transparent',
                        border: isMobile && activeId === hs.id ? `2px solid ${C.gold}` : 'none',
                        borderRadius: '2px',
                        transition: 'background-color 0.2s',
                        zIndex: 10,
                      }}
                      onMouseEnter={() => hsEnter(hs.id)}
                      onMouseLeave={hsLeave}
                      onClick={() => hsTap(hs.id)}
                    />
                  ))}

                  {isMobile && HOTSPOTS.map((hs) => (
                    <div
                      key={`dot-${hs.id}`}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${hs.x + hs.w / 2}%`,
                        top:  `${hs.y + hs.h / 2}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5,
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 14, height: 14, borderRadius: '50%',
                          backgroundColor: activeId === hs.id ? C.crimson : C.gold,
                        }}
                      />
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        backgroundColor: activeId === hs.id ? C.crimson : C.gold,
                        border: '1.5px solid #fff',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }} />
                    </div>
                  ))}

                  {!isMobile && (
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          key={active.id}
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute z-40 pointer-events-none"
                          style={{
                            top: `${active.y + active.h + 1}%`,
                            ...(active.popSide === 'right'
                              ? { left: `${active.x}%` }
                              : { right: `${100 - active.x - active.w}%` }),
                            width: '336px',
                          }}
                        >
                          <div className="rounded-sm shadow-2xl overflow-hidden" style={{ border: `1px solid ${C.border}`, backgroundColor: C.ivory }}>
                            <CardBody active={active} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>

              </div>
            </div>

          </div>

          {/* ── Mobile info panel (below map) ────────────────────────────── */}
          {isMobile && (
            <div ref={infoPanelRef}>
              <AnimatePresence>
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ marginTop: '16px' }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: C.stone,
                      borderTop: `2px solid ${C.gold}`,
                      borderLeft: `1px solid ${C.border}`,
                      borderRight: `1px solid ${C.border}`,
                      borderRadius: '4px 4px 0 0',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '3px', height: '18px', backgroundColor: C.crimson, borderRadius: '2px' }} />
                        <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                          {active.name}の詳細
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveId(null)}
                        style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          border: `1px solid ${C.border}`, backgroundColor: C.ivory,
                          color: C.textMute, fontSize: '0.85rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >✕</button>
                    </div>

                    <div style={{
                      border: `1px solid ${C.border}`,
                      borderTop: 'none',
                      borderRadius: '0 0 4px 4px',
                      backgroundColor: C.ivory,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '140px', flexShrink: 0, height: '140px' }}>
                          <img
                            src={active.img}
                            alt={active.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            draggable={false}
                          />
                        </div>
                        <div style={{ flex: 1, padding: '12px 14px 10px' }}>
                          <h3 style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '2px' }}>
                            {active.name}
                          </h3>
                          <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
                            （{active.kana}）
                          </p>
                          {active.tag && (
                            <span style={{
                              display: 'inline-block', backgroundColor: C.crimson, color: '#fff',
                              fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
                              letterSpacing: '0.06em', padding: '1px 7px', borderRadius: '2px', lineHeight: 1.7,
                            }}>
                              {active.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ padding: '0 14px 16px', borderTop: `1px solid ${C.border}` }}>
                        {active.tagItems && (
                          <div style={{ paddingTop: '10px', marginBottom: '8px' }}>
                            {active.tagItems.map((item, i) => (
                              <p key={i} style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.78rem', lineHeight: 1.9, paddingLeft: '0.8em', textIndent: '-0.8em' }}>
                                <span style={{ color: C.gold, marginRight: '4px' }}>・</span>{item}
                              </p>
                            ))}
                            <div style={{ height: '1px', backgroundColor: C.border, margin: '8px 0' }} />
                          </div>
                        )}
                        {!active.tagItems && <div style={{ paddingTop: '10px' }} />}
                        <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.78rem', lineHeight: 1.9 }}>
                          {active.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!active && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ marginTop: '12px', textAlign: 'center', padding: '14px' }}
                  >
                    <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.75rem', letterSpacing: '0.06em' }}>
                      ● 地図上の金色のマークをタップしてください
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      <HighlightsSection />

    </div>
  );
}
