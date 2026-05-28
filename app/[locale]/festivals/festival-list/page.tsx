'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { CalendarDays, Star, ChevronsUp, ExternalLink, ChevronRight } from 'lucide-react';
import {
  C,
  F,
  FadeIn,
  SectionBanner,
  DiamondRule,
  ContentHeading,
  OrnamentDivider
} from '@/components/ShrineUI';

// ─────────────────────────────────────────────────────────────────────────────
// COLOUR VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const THEME = {
  gold: {
    accentColor:  C.gold,
    accentBg:     'rgba(162,122,40,0.10)',
    accentBorder: 'rgba(162,122,40,0.25)',
    rowHighlight: 'rgba(165,0,0,0.03)',
    nameBold:     C.crimson,
    dateBg:       'rgba(162,122,40,0.08)',
    dateBorder:   'rgba(162,122,40,0.2)',
    dateColor:    C.gold,
  },
  blue: {
    accentColor:  '#2d52a0',
    accentBg:     'rgba(45,82,160,0.08)',
    accentBorder: 'rgba(45,82,160,0.22)',
    rowHighlight: 'rgba(45,82,160,0.03)',
    nameBold:     '#2d52a0',
    dateBg:       'rgba(45,82,160,0.07)',
    dateBorder:   'rgba(45,82,160,0.2)',
    dateColor:    '#2d52a0',
  },
  brown: {
    accentColor:  '#7a4820',
    accentBg:     'rgba(122,72,32,0.09)',
    accentBorder: 'rgba(122,72,32,0.22)',
    rowHighlight: 'rgba(122,72,32,0.03)',
    nameBold:     '#7a4820',
    dateBg:       'rgba(122,72,32,0.07)',
    dateBorder:   'rgba(122,72,32,0.2)',
    dateColor:    '#7a4820',
  },
} as const;
type ThemeKey = keyof typeof THEME;

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────
type FestivalRow = {
  name: string;
  kana: string;
  subtitle?: string;
  date: string;
  desc: string;
  isHighlight?: boolean;
  subItems?: string;
  detailId?: string; // anchor id on /festivals/festival-detail
};
type MonthGroup = { month: string; festivals: FestivalRow[] };

// ── 恒例祭 ──────────────────────────────────────────────────────────────────
const KOTEIREI: MonthGroup[] = [
  {
    month: '1月',
    festivals: [
      { name: '歳旦祭', kana: 'さいたんさい', date: '1日', desc: '新年を祝い、皇室の繁栄と国家の隆昌を祈念し、併せて氏子･崇敬者並びに社会の繁栄と平和を祈る祭典です。' },
      { name: '新年祭', kana: 'しんねんさい', date: '2日', desc: '歳旦祭同様、皇室と国家の平安を祈る祭典です。' },
      { name: '元始祭', kana: 'げんしさい', date: '3日', desc: '天皇陛下が宮中三殿において自ら主宰する「親祭」として、皇位の元始を祝う儀式が執り行われます。これに習い、全国の神社で斎行される祭典です。' },
      { name: '御誕辰祭', kana: 'ごたんしんさい', date: '6日', desc: '八幡大神（応神天皇）の御誕生をお祝いする祭典です。' },
      { name: '御木屋始祭', kana: 'おこやはじめさい', date: '11日', desc: '大工職や塗職等、宇佐神宮に携わる職人方の身体健康・無病息災・工事/修理安全を祈願する祭典です。' },
    ],
  },
  {
    month: '2月',
    festivals: [
      { name: '節分祭', kana: 'せつぶんさい', date: '3日', desc: '節分とはもともと、中国にて除夜に行った「追難（ついな）」という、大晦日の夜に疫病の鬼を払う儀式でした。当神宮では、午前10時斎行の節分祭にて、神饌と共に大豆が供えられます。' },
      { name: '紀元祭', kana: 'きげんさい', date: '11日', desc: '古事記や日本書紀にて、初代天皇とされる神武天皇の即位日をもって定めた日で、皇室の隆昌と国家の安泰を祈念する祭典です。' },
      { name: '鎮疫祭宵祭', kana: 'ちんえきさいよいまつり', date: '12日', desc: '鎮疫祭の前日に斎行されるお焚き上げ始めの祭典です。五色の小幣に忌火を灯し、八坂神社玉垣内に集められた古神札を焼納します。' },
      { name: '鎮疫祭', kana: 'ちんえきさい', subtitle: '御心経会', date: '13日', desc: '疫病災禍を祓い鎮める祭典。前日の宵祭, 当日の本殿祭に続き八坂神社前で祭典が行われます。幣越神事・陵王の舞・鳩替神事があります。', isHighlight: true, detailId: 'chine' },
      { name: '祈年祭', kana: 'きねんさい', date: '17日', desc: '穀物の豊穣を祈るとともに、産業の発展や国の安泰を祈る祭典です。明治以降より、2月17日を祭日とした。' },
      { name: '天長祭', kana: 'てんちょうさい', date: '23日', desc: '今上陛下の御誕生をお祝いし、聖寿の万歳と大御代の長久を祈念する祭典です。' },
      { name: '初卯祭', kana: 'はつうさい', date: '旧暦2月初卯日', desc: '八幡大神様御示現の御縁日として祭典が行われます。' },
    ],
  },
  {
    month: '3月',
    festivals: [
      { name: '春致祭', kana: 'はるちさい', date: '9日から15日迄の7日間', desc: '潔斎（散斎・致斎）の祭です。7日間毎日祭典が行われます。初日の前日夜に柴挿神事があります。' },
      { name: '例祭', kana: 'れいさい', date: '18日', desc: '宇佐神宮で最も重要な祭典です。皇室より幣帛を賜り、「大祭」という最上級の儀礼を以て斎行されます。', isHighlight: true, detailId: 'reisai' },
    ],
  },
  {
    month: '4月',
    festivals: [
      { name: '御正忌祭', kana: 'ごしょうきさい', date: '1日', desc: '八幡大神（応神天皇）が崩御遊ばされたことを偲び、改めてご神徳を戴く祭典です。' },
      { name: '八幡講社大祭', kana: 'はちまんこうしゃたいさい', date: '1日', desc: '全国の八幡講員が多数参集し斎行される祭典です。八幡講員のご平安をお祈りします。' },
      { name: '桜花祭', kana: 'おうかさい', date: '10日', desc: '通常の神饌に加え、宇佐神宮境内の桜花がお供えされます。宮司祝詞奏上後は、巫女が桜枝を手に豊栄の舞を奉奏します。' },
      { name: '昭和祭', kana: 'しょうわさい', date: '29日', desc: '昭和天皇が誕生された日です。昭和天皇の聖徳大業を景仰し、皇威の隆昌と国運の発展を祈る祭典です。' },
    ],
  },
  {
    month: '6月',
    festivals: [
      { name: '御田植祭', kana: 'おたうえさい', date: '6月の第4日曜日', desc: '上宮での本殿祭の後、菱形池ほとりの斎場で斎田祭が斎行されます。郷司・水守・早乙女らが奏楽のうちに田植神事をします。', isHighlight: true, detailId: 'otaue' },
      { name: '夏越の大祓', kana: 'なごしのおおはらえ', date: '30日', desc: '半年間で知らず知らずのうちに犯したであろう自らと社会の罪穢（つみけがれ）を、祓（はら）い清める神事です。解縄串・切麻・裂布など特殊な祭具を用い、神職を始め参列者, 全国各地の崇敬者より送られて形代にてお祓いします。' },
    ],
  },
  {
    month: '7月',
    festivals: [
      {
        name: '御神幸祭', kana: 'ごしんこうさい', subtitle: '御祓会',
        date: '7月31日・8月1日・8月2日',
        desc: '一般に「夏越大祭」「夏祭」「ごじんじ」と呼ばれます。御神体が3基の神輿に遷り、御仮屋である頓宮まで御神幸されます。出御（お下り）・還御（お上り）の行列は華麗です。',
        subItems: '祭典奉仕団結団式･御発輦祭･菅貫神事･御着輦祭（1日目）、朝御饌祭･流鏑馬神事･夕御饌祭（2日目）、朝御饌祭･御還幸祭･御還着祭（3日目）',
        isHighlight: true,
        detailId: 'shinkosai',
      },
    ],
  },
  {
    month: '8月',
    festivals: [
      { name: '流鏑馬神事', kana: 'やぶさめしんじ', date: '8月1日', desc: '「御神幸祭（夏越祭り）」の中日に、天下泰平・五穀豊穣・万民豊楽を祈念し、境内大尾山参道の馬場で斎行されます。本神事は、令和元年に天皇陛下御即位の慶事を寿ぎ、以後毎年恒例になった神事です。この流鏑馬は、弓馬術礼法小笠原流一門により奉仕されます。', isHighlight: true, detailId: 'yabusame' },
      { name: '虫振祭 / 風除祭', kana: 'むしふりさい / ふうじょさい', date: '7日', desc: '「虫振祭」は、もともと御殿内の装束及び宝物類の虫干しを行う神事でした。「風除祭」は、風水害や病虫害からの被害を受けやすい８月の時期に、稲や農作物の安全な生長を祈念する祭典です。' },
    ],
  },
  {
    month: '10月',
    festivals: [
      {
        name: '仲秋祭', kana: 'ちゅうしゅうさい', subtitle: '放生会',
        date: '第2月曜を含む, 土日月の3日間',
        desc: '一之御殿神輿（八幡大神）が、浮殿（和間神社）まで渡御します。大隅日向の隼人の霊を慰めるために、蜷や貝を和間の浜へ放つ放生式が斎行されます。',
        subItems: '御発輦祭・御着輦祭（以上土曜）、蜷饗祭・水神祭・塩屋祭・仲秋祭・放生式・夕御饌祭（以上日曜）、朝御饌祭・御還幸祭・御還着祭（以上月曜）',
        isHighlight: true,
        detailId: 'chushu',
      },
      { name: '神嘗奉祝祭', kana: 'かんなめほうしゅくさい', date: '17日', desc: '伊勢の神宮の神嘗祭の当日に、奉祝の誠を奉げる祭典。皇室よりその年の新米を伊勢神宮に供えられ、お米の収穫に感謝し、その喜びを共にわかちあいます。' },
      { name: '風除報賽祭', kana: 'ふうじょほうさいさい', date: '20日', desc: '8月7日に斎行される「風除祭」で祈願した田畑の安全と豊作が、成就した御礼として報賽する祭典です。神賑として鉾立神事・神能があります。', isHighlight: true, detailId: 'fusai' },
      { name: '御神能', kana: 'ごしんのう', date: '21日', desc: '風除報賽祭の神賑の一環として、能舞台で催されます。能楽四派（観世・宝生・金剛・金春）のうち観世流の流れをくみ、特に、「宇佐観世」と呼ばれています。宇佐神宮の氏子が主体となって奉納されますが、永い歴史の中『清経』のみは奉納されない故実となっています。', isHighlight: true, detailId: 'fusai' },
    ],
  },
  {
    month: '11月',
    festivals: [
      { name: '明治祭', kana: 'めいじさい', date: '3日', desc: '明治天皇が誕生された日です。明治天皇の聖徳大業を景仰し, 皇威の隆昌と国運の発展を祈り、ますます文化を進め平和繁栄を祈る祭典です。' },
      { name: '新嘗祭', kana: 'にいなめさい', date: '23日', desc: '一年の収穫を神々に感謝するとともに、皇室･国家･国民の平和と繁栄を祈る祭事です。宮中では、新穀による御饌神酒を天神地祇に奉り, 天皇陛下自らもお召し上がりになります。', isHighlight: true, detailId: 'niinamesai' },
    ],
  },
  {
    month: '12月',
    festivals: [
      { name: '冬致祭', kana: 'ふゆちさい', date: '15日から21日迄の7日間', desc: '潔斎（散斎・致斎）の祭です。7日間毎日祭典が行われます。初日の前日夜に柴挿神事があります。' },
      { name: '神符守札遷霊祭', kana: 'しんぷしゅさつせんれいさい', date: '冬至の日', desc: '新年を迎えるにあたり, 奉製された神符や守札、また破魔矢や干支物などの縁起物に、神様の神璽（みしるし）をお祀する祭典です。' },
      { name: '年越の大祓', kana: 'としこしのおおらえ', date: '31日', desc: '夏越の大祓に同じ。' },
      { name: '除夜祭', kana: 'じょやさい', date: '31日', desc: '一年で最後のお祭りです。一年を無事に過ごできたことに感謝すると共に、心身を清め、新しい気持ちで, 新年を迎えるための祭典となります。' },
    ],
  },
];

const MAITUKI: FestivalRow[] = [
  { name: '式日祭', kana: 'しきじつさい', date: '1日', desc: '毎月恒例の祭（1月を除く）。' },
  { name: '月次祭', kana: 'つきなみさい', date: '15日', desc: '毎月恒例の祭。' },
  { name: '大元神社月次祭', kana: 'おおもとじんじゃつきなみさい', date: '15日', desc: '大元神社毎月恒例の祭。' },
];

const YOHAI: MonthGroup[] = [
  { month: '1月',  festivals: [{ name: '昭和天皇祭遙拝', kana: 'しょうわてんのうさいようはい', date: '7日', desc: '昭和天皇の崩御された日で、宮中の武蔵野陵において斎行されます。' }] },
  { month: '3月',  festivals: [{ name: '春季皇霊祭遙拝', kana: 'しゅんきこうれいさいようはい', date: '春分の日', desc: '「春季皇霊祭」とは、春分の日に宮中の皇霊殿にて斎行される、皇室の祖先祭祀です。' }] },
  { month: '4月',  festivals: [{ name: '神武天皇祭遙拝', kana: 'じんむてんのうさいようはい', date: '3日', desc: '神武天皇の崩御された日で、宮中の畝傍山東北陵において斎行されます。' }] },
  { month: '9月',  festivals: [{ name: '秋季皇霊祭遙拝', kana: 'しゅうきこうれいさいようはい', date: '秋分の日', desc: '「秋季皇霊祭」とは、秋分の日に宮中の皇霊殿にて斎行される、皇室の祖先祭祀です。' }] },
  { month: '10月', festivals: [{ name: '神嘗祭遙拝', kana: 'かんなめさいようはい', date: '17日', desc: '五穀豊穣に感謝をする祭典です。伊勢の神宮にて斎行されます。宮中では、伊勢 of 神宮の神嘗祭に引き続き、神嘗奉祝祭が斎行されます。' }] },
];

const SETSUMATSU: MonthGroup[] = [
  {
    month: '1月',
    festivals: [
      { name: '黒男神社例祭', kana: 'くろおじんじゃれいさい', date: '14日', desc: '御祭神は武内宿祢命（たけのうちのすくねのみこと）。景行天皇･成務天皇･仲哀天皇･応神天皇･仁徳天皇の大臣としてお仕えられました。学問の神･忠誠の神･武の神として多くの参拝者に親しまれています。' },
      { name: '亀山神社例祭', kana: 'かめやまじんじゃれいさい', date: '20日', desc: '御祭神は大山積命（おおやまづみのみこと）。亀山神社は八幡大神様が鎮座する小椋山を守護する山神・地主神であります。古代より明治に至るまで、「亀ト（きぼく）」という亀の甲羅を用いた占いが行われていましたが、そこで使用した甲羅を亀山神社へ埋蔵したと伝えられています。' },
      { name: '女禰宜神社例祭', kana: 'めねぎじんじゃれいさい', date: '29日', desc: '御祭神は女禰宜従四位下大神朝臣杜女霊。現在、社殿はございませんが祭典は執り行われています。' },
    ],
  },
  {
    month: '3月',
    festivals: [
      { name: '春日神社例祭', kana: 'かすがじんじゃれいさい', date: '13日', desc: '御祭神は天児屋根命（あめのこやねのみこと）。天照大御神の御神託より、八幡大神を祀る一之御殿の脇殿としてご鎮座されています。' },
      { name: '下宮例祭', kana: 'げぐうれいさい', date: '17日', desc: '御祭神は八幡大神･比売大神･神功皇后。お供え物が調理された場所（神饌所）として、「御炊殿（みけでん）」とも称されました。' },
      { name: '若宮神社例祭', kana: 'わかみやじんじゃれいさい', date: '17日', desc: '御祭神は、大鷦鷯命（おおささぎのみこと）･大葉枝皇子（おおばえのみこ）・小葉枝皇子（こばえのみこ）・隼別皇子（はやぶさわけのみこ）・雌姫皇子（めどりのひめみこ）。大鷦鷯命は仁徳天皇の御神霊です。武の神様として、古来より崇められています。' },
      { name: '春宮神社例祭', kana: 'とうぐうじんじゃれいさい', date: '17日', desc: '御祭神は兎道稚郎子命（うぢのわきいらつこのみこと）。応神天皇の皇子で、学問の神です。' },
      { name: '百体神社春祭', kana: 'ひゃくたいじんじゃはるまつり', date: '20日', desc: '御祭神は、大隅･日向両国の隼人の霊。養老４（７２０）年に大隅国・日向国等の隼人等による反乱を鎮圧するため、八幡大神へ大和朝廷により祈請され、戦地である大隅・日向に赴きました。「罪を憎んで人を憎まず」との八幡大神の御神意で、鎮圧された隼人の霊を慰めお祀りをしました。' },
    ],
  },
  {
    month: '4月',
    festivals: [
      { name: '和間神社例祭', kana: 'わまじんじゃれいさい', date: '3日', desc: '御祭神は、八幡大神･比売大神･神功皇后。宇佐神宮より8キロ離れており、10月の仲秋祭では、御本殿より神体が御神輿に遷り御神幸されます。' },
      { name: '大尾神社例祭', kana: 'おおおじんじゃれいさい', date: '4日', desc: '御祭神は、八幡大神。神護景雲３(７６９)年の「宇佐八幡神託事件」にて、和気清麻呂公が御神託を受けた場所となります。' },
      { name: '護皇神社例祭', kana: 'ごおうじんじゃれいさい', date: '4日', desc: '御祭神は、和気清麻呂朝臣命。「宇佐八幡神託事件」において、和気清麻呂公の至誠の精神と勇気ある行動により、皇室は守られました。' },
      { name: '宇佐祖神社例祭', kana: 'うさそじんじゃれいさい', date: '5日', desc: '御祭神は、莵狭津彦命（うさつひこのみこと）。頓宮一之御殿に鎮座されています。莵狭津彦命を祖とする「宇佐姓」の方々が、今も祭典に参列されています。' },
      { name: '鷹居八幡神社春祭', kana: 'たかいはちまんじんじゃはるまつり', date: '9日', desc: '御祭神は、応神天皇･仲哀天皇･神功皇后。鷹居八幡神社は、八幡大神の御社を奉建された最初の霊地といわれます。地域の氏神として今も厚く崇敬されています。11月28日には例祭が斎行されます。' },
      { name: '大神祖神社例祭', kana: 'おおがそじんじゃれいさい', date: '17日', desc: '御祭神は、大神比義翁之霊。八幡大神を御示現された方で、下宮一之御殿を相殿としてお祀りされています。大神姓の方々が、今も祭典に参列されています。' },
      { name: '大元神社例祭', kana: 'おおもとじんじゃれいさい', date: '29日', desc: '御祭神は、八幡大神･比売大神･神功皇后。大元神社（宇佐神宮奥宮）の例祭です。祭典終了後には、餅まきが行われ、例年賑わいをみせます。' },
    ],
  },
  {
    month: '5月',
    festivals: [
      { name: '木匠祖神社例祭', kana: 'もくしょうそじんじゃれいさい', date: '15日', desc: '御祭神は、手置帆負命（たおきほおいのみこと）･比古狭知命（ひこさしりのみこと）･思兼命（おもいかねのみこと）。近郷近在及び宇佐神宮内の大工･檜皮師･漆塗師等の人々の願いにより勧請されたといわれます。職人方の工事/修理安全を祈願する祭典です。' },
    ],
  },
  {
    month: '6月',
    festivals: [
      { name: '北辰神社例祭', kana: 'ほくしんじんじゃれいさい', date: '17日', desc: '御祭神は、天御中主神（あめのみなかぬしのかみ）･髙皇産霊神（たかみむすびのかみ）･神皇産霊神（かみむすびのかみ）。宇佐神宮の地主神で、二之御殿の脇殿です。御本殿の「八幡造」の原型といわれ、昭和43年に県指定有形文化財となりました。' },
      { name: '住吉神社例祭', kana: 'すみよしじんじゃれいさい', date: '30日', desc: '御祭神は表筒男命（うわつつのおのみこと）･中筒男命（なかつつのおのみこと）･底筒男命（そこつつのおのみこと）。海上安全･航海安全･大漁満足の守護神として崇敬されています。神功皇后が異国降伏を願った時、この神様の協力を得て勝利をしたといわれ、現在は三之御殿の脇殿にて、守護されています。' },
    ],
  },
  {
    month: '7月',
    festivals: [
      { name: '八坂神社例祭', kana: 'やさかじんじゃれいさい', date: '15日', desc: '御祭神は、須佐之男命。明治時代以前には「祇園社」とも呼ばれており、弥勒寺の守護をされていました。2月13日には疫病災禍を祓い鎮める「鎮疫祭」が斎行されます。' },
    ],
  },
  {
    month: '8月',
    festivals: [
      { name: '天満神社例祭', kana: 'てんまんじんじゃれいさい', date: '25日', desc: '御祭神は、菅原道真朝臣命。学問の神様で、当時多くの氏子より厚く崇敬され, 勧請されたといわれます。' },
      { name: '水分神社例祭', kana: 'みくまりじんじゃれいさい', date: '28日', desc: '御祭神は、髙龗神（たかおかみのかみ）･天水分神（あまのみくまりのかみ）･天汲匏持神（あめのくひざもちのかみ）･国汲匏持神（くにのくひざもちのかみ）。水を司る神様で、菱形池中心にある社に鎮座されています。' },
    ],
  },
  {
    month: '10月',
    festivals: [
      { name: '金刀比羅神社例祭', kana: 'ことひらじんじゃれいさい', date: '10日', desc: '御祭神は、大物主大神（おおものぬしのおおかみ）･崇徳天皇。航海の神様で、当時多くの氏子より厚く崇敬され, 勧請されたといわれます。' },
      { name: '百体神社秋例祭', kana: 'ひゃくたいじんじゃあきのいさい', date: '18日', desc: '御祭神は、大隅･日向両国の隼人の霊。10月に斎行される仲秋祭の最終日には、和間神社より宇佐神宮へ還幸される途中、百体神社へ参詣します。' },
    ],
  },
  {
    month: '11月',
    festivals: [
      { name: '鷹居神社例祭', kana: 'たかいじんじゃれいさい', date: '28日', desc: '御祭神は、応神天皇･仲哀天皇･神功皇后。4月9日の春祭同様、例年多くの氏子方が参列されます。' },
    ],
  },
  {
    month: '12月',
    festivals: [
      { name: '養蚕神社例祭', kana: 'ようざんじんじゃれいさい', date: '15日', desc: '御祭神は、天照大御神。宇佐市内に鎮座されていた養蚕神社より、昭和63年に宇佐神宮末社八坂神社へ合祀されました。' },
      { name: '八子神社例祭', kana: 'やこじんじゃれいさい', date: '31日', desc: '御祭神は、33個の「石」、または八王子の神。一･二･三各御本殿の眷属神とも言われますが、詳細は不明です。社殿はなく、西端玉垣内の御神木（楠木）を依代としています。' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER ANCHOR ID  (used by back-to-filter floating button)
// ─────────────────────────────────────────────────────────────────────────────
const FILTER_ANCHOR_ID = 'filter-navigator';

// ─────────────────────────────────────────────────────────────────────────────
// FILTER STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────
type SectionKey = 'jinji' | 'setsumatsu';
type SubtypeKey = '恒例祭' | '毎月' | '遙拝式';

const FILTER_META = {
  jinji: {
    label: '祭典・神事',
    anchor: 'section-jinji',
    subtypes: {
      '恒例祭': { anchor: 'subsec-koteirei', months: KOTEIREI.map(g => g.month) },
      '毎月':   { anchor: 'subsec-maituki',  months: [] as string[] },
      '遙拝式': { anchor: 'subsec-yohai',    months: YOHAI.map(g => g.month) },
    } satisfies Record<SubtypeKey, { anchor: string; months: string[] }>,
  },
  setsumatsu: {
    label: '摂末社例祭',
    anchor: 'section-setsumatsu',
    months: SETSUMATSU.map(g => g.month),
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function MonthLabel({ month, anchorId, themeKey }: { month: string; anchorId: string; themeKey: ThemeKey }) {
  const t = THEME[themeKey];
  return (
    <div
      id={anchorId}
      style={{
        backgroundColor: t.accentBg,
        borderLeft: `4px solid ${t.accentColor}`,
        padding: '8px 16px',
        marginTop: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        scrollMarginTop: '120px',
      }}
    >
      <CalendarDays size={13} style={{ color: t.accentColor, flexShrink: 0 }} />
      <span style={{
        fontFamily: F.serif,
        fontSize: '0.9rem',
        fontWeight: 500,
        color: t.accentColor,
        letterSpacing: '0.2em',
      }}>{month}</span>
    </div>
  );
}

function FestivalTableRow({ festival, isLast, themeKey }: { festival: FestivalRow; isLast?: boolean; themeKey: ThemeKey }) {
  const t = THEME[themeKey];
  const locale = useLocale();

  return (
    <div style={{
      borderBottom: isLast ? 'none' : `1px solid ${t.accentBorder}`,
      backgroundColor: festival.isHighlight ? t.rowHighlight : 'transparent',
    }}>
      <div className="flex flex-col sm:flex-row" style={{ padding: '14px 16px' }}>
        {/* Left: name + date */}
        <div style={{ width: '200px', flexShrink: 0, paddingRight: '16px' }}>
          <div className="flex items-start gap-2">
            {festival.isHighlight && (
              <Star size={10} style={{ color: C.crimson, flexShrink: 0, marginTop: '5px', fill: C.crimson }} />
            )}
            <div>
              {festival.detailId ? (
                <Link
                  href={`/${locale}/festivals/festival-detail#${festival.detailId}`}
                  style={{
                    fontFamily: F.serif,
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    color: t.nameBold,
                    letterSpacing: '0.08em',
                    margin: 0,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    borderBottom: `1px solid ${t.nameBold}`,
                    paddingBottom: '1px',
                    transition: 'opacity 0.15s',
                  }}
                >
                  {festival.name}
                  <ExternalLink size={10} style={{ flexShrink: 0, opacity: 0.7 }} />
                </Link>
              ) : (
                <p style={{
                  fontFamily: F.serif,
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  color: festival.isHighlight ? t.nameBold : C.text,
                  letterSpacing: '0.08em',
                  margin: 0,
                }}>
                  {festival.name}
                </p>
              )}
              {festival.subtitle && (
                <p style={{ fontFamily: F.sans, fontSize: '0.72rem', color: C.textMute, letterSpacing: '0.05em', margin: '1px 0 0 0' }}>
                  （{festival.subtitle}）
                </p>
              )}
              <p style={{ fontFamily: F.sans, fontSize: '0.72rem', color: C.textMute, letterSpacing: '0.04em', margin: '1px 0 0 0' }}>
                {festival.kana}
              </p>
            </div>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '6px',
            backgroundColor: t.dateBg,
            border: `1px solid ${t.dateBorder}`,
            borderRadius: '2px',
            padding: '2px 8px',
          }}>
            <span style={{ fontFamily: F.sans, fontSize: '0.72rem', color: t.dateColor, letterSpacing: '0.06em' }}>
              【{festival.date}】
            </span>
          </div>
        </div>

        {/* Right: description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: F.sans,
            fontSize: '0.86rem',
            lineHeight: 1.9,
            letterSpacing: '0.04em',
            color: C.textMid,
            margin: 0,
          }}>
            {festival.desc}
          </p>
          {festival.subItems && (
            <p style={{
              fontFamily: F.sans,
              fontSize: '0.78rem',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
              color: C.textMute,
              margin: '6px 0 0 0',
              paddingLeft: '10px',
              borderLeft: `2px solid ${t.accentBorder}`,
            }}>
              {festival.subItems}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function FestivalMonthTable({
  data,
  anchorPrefix,
  themeKey = 'gold',
}: {
  data: MonthGroup[];
  anchorPrefix: string;
  themeKey?: ThemeKey;
}) {
  const t = THEME[themeKey];
  return (
    <div style={{ border: `1px solid ${t.accentBorder}`, backgroundColor: C.ivory, overflow: 'hidden' }}>
      {/* Header row */}
      <div className="hidden sm:flex" style={{ backgroundColor: C.dark, padding: '10px 16px' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>祭典名 / 祭式</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>詳　細</span>
        </div>
      </div>
      {data.map((group, gi) => (
        <div key={gi}>
          <MonthLabel month={group.month} anchorId={`${anchorPrefix}-${group.month}`} themeKey={themeKey} />
          {group.festivals.map((f, fi) => (
            <FestivalTableRow
              key={fi}
              festival={f}
              themeKey={themeKey}
              isLast={fi === group.festivals.length - 1 && gi === data.length - 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SimpleFestivalTable({ data, themeKey = 'gold', anchorPrefix }: { data: FestivalRow[]; themeKey?: ThemeKey; anchorPrefix?: string }) {
  const t = THEME[themeKey];
  return (
    <div style={{ border: `1px solid ${t.accentBorder}`, backgroundColor: C.ivory, overflow: 'hidden' }}>
      <div className="hidden sm:flex" style={{ backgroundColor: C.dark, padding: '10px 16px' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>祭典名 / 祭式</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>詳　細</span>
        </div>
      </div>
      {data.map((f, fi) => (
        <div key={fi} id={anchorPrefix ? `${anchorPrefix}-${f.name}` : undefined} style={{ scrollMarginTop: '120px' }}>
          <FestivalTableRow festival={f} themeKey={themeKey} isLast={fi === data.length - 1} />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FILTER NAVIGATOR
// ─────────────────────────────────────────────────────────────────────────────
function FilterNavigator() {
  const [section,  setSection]  = useState<SectionKey | null>(null);
  const [subtype,  setSubtype]  = useState<SubtypeKey | null>(null);
  const [month,    setMonth]    = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSection = (s: SectionKey) => {
    setSection(s); setSubtype(null); setMonth(null);
  };

  const handleSubtype = (sub: SubtypeKey) => {
    setSubtype(sub); setMonth(null);
  };

  const handleMonth = (m: string) => {
    setMonth(m);
    if (section === 'setsumatsu') { scrollTo(`setsumatsu-${m}`); return; }
    if (subtype === '恒例祭') { scrollTo(`koteirei-${m}`); return; }
    if (subtype === '遙拝式') { scrollTo(`yohai-${m}`); return; }
    if (subtype === '毎月')   { scrollTo(`maituki-${m}`); return; }
  };

  // Available months based on current selection
  const availableMonths: string[] = (() => {
    if (section === 'setsumatsu') return FILTER_META.setsumatsu.months as unknown as string[];
    if (subtype === '恒例祭')    return FILTER_META.jinji.subtypes['恒例祭'].months as unknown as string[];
    if (subtype === '遙拝式')    return FILTER_META.jinji.subtypes['遙拝式'].months as unknown as string[];
    return [];
  })();

  const chipBase: React.CSSProperties = {
    fontFamily: F.sans,
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    border: '1px solid',
    padding: '5px 14px',
    cursor: 'pointer',
    background: 'none',
    transition: 'all 0.18s',
  };

  const chip = (active: boolean, color: string, bg: string): React.CSSProperties => ({
    ...chipBase,
    borderColor: active ? color : 'rgba(162,122,40,0.25)',
    color: active ? color : C.textMute,
    backgroundColor: active ? bg : 'transparent',
  });

  return (
    <div
      id={FILTER_ANCHOR_ID}
      style={{
        backgroundColor: C.stone,
        border: `1px solid rgba(162,122,40,0.18)`,
        padding: '20px 22px',
        marginBottom: '44px',
      }}
    >
      {/* Tier 1 — Section type */}
      <div style={{ marginBottom: '14px' }}>
        <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
          種別
        </p>
        <div className="flex flex-wrap gap-2">
          {(['jinji', 'setsumatsu'] as SectionKey[]).map(s => (
            <button
              key={s}
              onClick={() => handleSection(s)}
              style={chip(section === s, C.crimson, 'rgba(165,0,0,0.07)')}
            >
              {FILTER_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Tier 2 — Sub-type (only for 祭典・神事) */}
      {section === 'jinji' && (
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            区分
          </p>
          <div className="flex flex-wrap gap-2">
            {(['恒例祭', '毎月', '遙拝式'] as SubtypeKey[]).map(sub => (
              <button
                key={sub}
                onClick={() => handleSubtype(sub)}
                style={chip(subtype === sub, C.gold, 'rgba(162,122,40,0.10)')}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tier 3 — Month (恒例祭 / 遙拝式 / 摂末社例祭) */}
      {availableMonths.length > 0 && (
        <div>
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            月別
          </p>
          <div className="flex flex-wrap gap-2">
            {availableMonths.map(m => (
              <button
                key={m}
                onClick={() => handleMonth(m)}
                style={chip(month === m, C.gold, 'rgba(162,122,40,0.10)')}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tier 3 — Individual festivals (毎月 has no months, so list each 祭 by name) */}
      {subtype === '毎月' && (
        <div>
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            祭典別
          </p>
          <div className="flex flex-wrap gap-2">
            {MAITUKI.map(f => (
              <button
                key={f.name}
                onClick={() => handleMonth(f.name)}
                style={chip(month === f.name, C.gold, 'rgba(162,122,40,0.10)')}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reset hint */}
      {section && (
        <button
          onClick={() => { setSection(null); setSubtype(null); setMonth(null); }}
          style={{
            marginTop: '14px',
            fontFamily: F.sans,
            fontSize: '0.68rem',
            color: C.textMute,
            letterSpacing: '0.1em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'block',
          }}
        >
          ✕ 選択をリセット
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK-TO-FILTER FLOATING BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function BackToFilterButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(FILTER_ANCHOR_ID);
      if (!el) return;
      setVisible(el.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFilter = () => {
    const el = document.getElementById(FILTER_ANCHOR_ID);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToFilter}
      title="フィルターへ戻る"
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
        フィルター
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function FestivalListPage() {
  const [activeSection, setActiveSection] = useState<'jinji' | 'setsumatsu'>('jinji');
  const locale = useLocale();

  const scrollTo = (id: string, sec: 'jinji' | 'setsumatsu') => {
    setActiveSection(sec);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      <BackToFilterButton />

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a0800 0%, #3a1000 55%, #1a0800 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(162,122,40,0.04) 0,rgba(162,122,40,0.04) 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(165,0,0,0.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10, paddingTop: '64px' }}>
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
              お祭り・行事
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              主な祭典・行事
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{ fontFamily: F.sans, color: '#c49a3a', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Festivals &amp; Sacred Rites
            </p>
            <h1 style={{ fontFamily: F.serif, color: '#faf8f5', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300, letterSpacing: '0.4em', textShadow: '0 3px 20px rgba(0,0,0,0.5)', margin: 0 }}>
              主な祭典・行事
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Sticky section nav ════════════════════════════════════════════════ */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, backgroundColor: C.dark, borderBottom: '1px solid rgba(162,122,40,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center">
          {(['jinji', 'setsumatsu'] as const).map(s => (
            <button
              key={s}
              onClick={() => scrollTo(`section-${s}`, s)}
              style={{
                fontFamily: F.serif,
                fontSize: '0.82rem',
                letterSpacing: '0.18em',
                color: activeSection === s ? '#c49a3a' : 'rgba(250,248,245,0.55)',
                background: 'none',
                border: 'none',
                borderBottom: activeSection === s ? `2px solid ${C.gold}` : '2px solid transparent',
                padding: '14px 20px 12px',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {FILTER_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ Body ══════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.ivory }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8" style={{ paddingTop: '52px', paddingBottom: '80px' }}>

          {/* ── Introduction ──────────────────────────────────────────────── */}
          <FadeIn>
            <div style={{ marginBottom: '36px' }}>
              <div style={{
                borderLeft: `3px solid ${C.gold}`,
                paddingLeft: '20px',
                marginBottom: '0',
              }}>
                <p style={{ fontFamily: F.serif, fontSize: '1.05rem', color: C.text, letterSpacing: '0.12em', lineHeight: 1.9, margin: '0 0 10px 0', fontWeight: 400 }}>
                  宇佐神宮では年間、大小併せて150近くの祭典・神事が行われます。
                </p>
                <p style={{ fontFamily: F.sans, fontSize: '0.9rem', color: C.textMid, letterSpacing: '0.06em', lineHeight: 2.0, margin: 0 }}>
                  10年に1度行われる祭をはじめ、どれも由緒のある荘厳で勇壮な祭礼です。
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── Filter Navigator ──────────────────────────────────────────── */}
          <FadeIn delay={0.05}>
            <FilterNavigator />
          </FadeIn>

          {/* ══════════════════════════════════════════════════════════════════
              SECTION 1 : 祭典・神事
          ══════════════════════════════════════════════════════════════════ */}
          <div id="section-jinji" style={{ scrollMarginTop: '56px' }}>

            <FadeIn>
              <SectionBanner ja="祭典・神事" en="Festivals &amp; Sacred Rites" />
            </FadeIn>

            {/* ── 恒例祭 ─────────────────────────────────────────────────── */}
            <div id="subsec-koteirei" style={{ scrollMarginTop: '60px' }}>
              <FadeIn delay={0.04}>
                <div style={{ marginBottom: '16px' }}>
                  <ContentHeading>恒例祭</ContentHeading>
                  <p style={{ fontFamily: F.sans, fontSize: '0.84rem', color: C.textMid, letterSpacing: '0.05em', lineHeight: 1.9, margin: '0 0 16px 0' }}>
                    毎年定められた時期に行われる年中行事の祭典です。
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <FestivalMonthTable data={KOTEIREI} anchorPrefix="koteirei" themeKey="gold" />
              </FadeIn>
            </div>

            <OrnamentDivider />

            {/* ── 毎月 ───────────────────────────────────────────────────── */}
            <div id="subsec-maituki" style={{ scrollMarginTop: '60px' }}>
              <FadeIn delay={0.04}>
                <div style={{ marginBottom: '16px' }}>
                  <ContentHeading>毎月</ContentHeading>
                  <p style={{ fontFamily: F.sans, fontSize: '0.84rem', color: C.textMid, letterSpacing: '0.05em', lineHeight: 1.9, margin: '0 0 16px 0' }}>
                    毎月決まった日に斎行される恒例の祭典です。
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <SimpleFestivalTable data={MAITUKI} themeKey="gold" anchorPrefix="maituki" />
              </FadeIn>
            </div>

            <OrnamentDivider />

            {/* ── 遙拝式 ─── blue theme ──────────────────────────────────── */}
            <div id="subsec-yohai" style={{ scrollMarginTop: '60px' }}>
              <FadeIn delay={0.04}>
                {/* Blue-toned section header for 遙拝式 */}
                <div style={{
                  background: 'linear-gradient(90deg, #2d52a0 0%, #1e3d80 40%, #162d60 100%)',
                  padding: '13px 24px',
                  marginBottom: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: '8px', height: '8px', flexShrink: 0, background: 'rgba(255,255,255,0.45)', transform: 'rotate(45deg)' }} />
                    <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1rem,2.5vw,1.15rem)', letterSpacing: '0.25em', fontWeight: 400, color: '#faf8f5', margin: 0 }}>
                      遙拝式
                    </h2>
                  </div>
                  <p style={{ fontFamily: F.sans, color: 'rgba(250,248,245,0.6)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
                    Imperial Court Rites
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.04}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontFamily: F.sans, fontSize: '0.84rem', color: C.textMid, letterSpacing: '0.05em', lineHeight: 1.9, margin: '0 0 16px 0' }}>
                    宮中または他の神社で斎行される祭典に対し、遥かに礼拝する式です。
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.07}>
                <FestivalMonthTable data={YOHAI} anchorPrefix="yohai" themeKey="blue" />
              </FadeIn>
            </div>

          </div>{/* /section-jinji */}

          {/* ── Section divider ─────────────────────────────────────────── */}
          <DiamondRule my="my-14" />

          {/* ═════════════════════════════════════════════════════════════════
              SECTION 2 : 摂末社例祭 — brown theme
          ══════════════════════════════════════════════════════════════════ */}
          <div id="section-setsumatsu" style={{ scrollMarginTop: '56px' }}>

            <FadeIn>
              {/* Brown/earth-toned banner for 摂末社例祭 */}
              <div style={{
                background: 'linear-gradient(90deg, #8a5020 0%, #6a3a10 40%, #4e2a08 100%)',
                padding: '13px 24px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div className="flex items-center gap-4">
                  <div style={{ width: '8px', height: '8px', flexShrink: 0, background: 'rgba(255,255,255,0.4)', transform: 'rotate(45deg)' }} />
                  <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1rem,2.5vw,1.15rem)', letterSpacing: '0.25em', fontWeight: 400, color: '#faf8f5', margin: 0 }}>
                    摂末社例祭
                  </h2>
                </div>
                <p style={{ fontFamily: F.sans, color: 'rgba(250,248,245,0.6)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>
                  Auxiliary Shrine Festivals
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.04}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontFamily: F.sans, fontSize: '0.84rem', color: C.textMid, letterSpacing: '0.05em', lineHeight: 1.9, margin: '0 0 16px 0' }}>
                  宇佐神宮の摂社・末社において、それぞれ年に一度の例祭が斎行されます。各社の御祭神とその由緒をご紹介します。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.07}>
              <FestivalMonthTable data={SETSUMATSU} anchorPrefix="setsumatsu" themeKey="brown" />
            </FadeIn>

          </div>{/* /section-setsumatsu */}

          {/* ── Bottom navigation ───────────────────────────────────────── */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center" style={{ marginTop: '56px' }}>
              <Link href={`/${locale}/worship/guide`} style={{ fontFamily: F.sans, fontSize: '0.78rem', letterSpacing: '0.14em', color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px', textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block' }}>
                境内案内へ
              </Link>
              <Link href={`/${locale}`} style={{ fontFamily: F.sans, fontSize: '0.78rem', letterSpacing: '0.14em', color: C.gold, backgroundColor: 'transparent', padding: '11px 28px', textDecoration: 'none', border: `1px solid ${C.gold}`, display: 'inline-block' }}>
                トップページへ
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
