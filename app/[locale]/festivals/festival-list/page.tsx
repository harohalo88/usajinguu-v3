'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { CalendarDays, Star, ChevronsUp, ExternalLink, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
const getKoteirei = (t: any): MonthGroup[] => [
  {
    month: t('festivalsFestival-list_text_1'),
    festivals: [
      { name: t('festivalsFestival-list_text_5'), kana: t('festivalsFestival-list_text_4'), date: t('festivalsFestival-list_text_3'), desc: t('festivalsFestival-list_text_2') },
      { name: t('festivalsFestival-list_text_9'), kana: t('festivalsFestival-list_text_8'), date: t('festivalsFestival-list_text_7'), desc: t('festivalsFestival-list_text_6') },
      { name: t('festivalsFestival-list_text_13'), kana: t('festivalsFestival-list_text_12'), date: t('festivalsFestival-list_text_11'), desc: t('festivalsFestival-list_text_10') },
      { name: t('festivalsFestival-list_text_17'), kana: t('festivalsFestival-list_text_16'), date: t('festivalsFestival-list_text_15'), desc: t('festivalsFestival-list_text_14') },
      { name: t('festivalsFestival-list_text_21'), kana: t('festivalsFestival-list_text_20'), date: t('festivalsFestival-list_text_19'), desc: t('festivalsFestival-list_text_18') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_22'),
    festivals: [
      { name: t('festivalsFestival-list_text_26'), kana: t('festivalsFestival-list_text_25'), date: t('festivalsFestival-list_text_24'), desc: t('festivalsFestival-list_text_23') },
      { name: t('festivalsFestival-list_text_30'), kana: t('festivalsFestival-list_text_29'), date: t('festivalsFestival-list_text_28'), desc: t('festivalsFestival-list_text_27') },
      { name: t('festivalsFestival-list_text_34'), kana: t('festivalsFestival-list_text_33'), date: t('festivalsFestival-list_text_32'), desc: t('festivalsFestival-list_text_31') },
      { name: t('festivalsFestival-list_text_39'), kana: t('festivalsFestival-list_text_38'), subtitle: t('festivalsFestival-list_text_37'), date: t('festivalsFestival-list_text_36'), desc: t('festivalsFestival-list_text_35'), isHighlight: true, detailId: 'chine' },
      { name: t('festivalsFestival-list_text_43'), kana: t('festivalsFestival-list_text_42'), date: t('festivalsFestival-list_text_41'), desc: t('festivalsFestival-list_text_40') },
      { name: t('festivalsFestival-list_text_47'), kana: t('festivalsFestival-list_text_46'), date: t('festivalsFestival-list_text_45'), desc: t('festivalsFestival-list_text_44') },
      { name: t('festivalsFestival-list_text_51'), kana: t('festivalsFestival-list_text_50'), date: t('festivalsFestival-list_text_49'), desc: t('festivalsFestival-list_text_48') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_52'),
    festivals: [
      { name: t('festivalsFestival-list_text_56'), kana: t('festivalsFestival-list_text_55'), date: t('festivalsFestival-list_text_54'), desc: t('festivalsFestival-list_text_53') },
      { name: t('festivalsFestival-list_text_60'), kana: t('festivalsFestival-list_text_59'), date: t('festivalsFestival-list_text_58'), desc: t('festivalsFestival-list_text_57'), isHighlight: true, detailId: 'reisai' },
    ],
  },
  {
    month: t('festivalsFestival-list_text_61'),
    festivals: [
      { name: t('festivalsFestival-list_text_65'), kana: t('festivalsFestival-list_text_64'), date: t('festivalsFestival-list_text_63'), desc: t('festivalsFestival-list_text_62') },
      { name: t('festivalsFestival-list_text_69'), kana: t('festivalsFestival-list_text_68'), date: t('festivalsFestival-list_text_67'), desc: t('festivalsFestival-list_text_66') },
      { name: t('festivalsFestival-list_text_73'), kana: t('festivalsFestival-list_text_72'), date: t('festivalsFestival-list_text_71'), desc: t('festivalsFestival-list_text_70') },
      { name: t('festivalsFestival-list_text_77'), kana: t('festivalsFestival-list_text_76'), date: t('festivalsFestival-list_text_75'), desc: t('festivalsFestival-list_text_74') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_78'),
    festivals: [
      { name: t('festivalsFestival-list_text_82'), kana: t('festivalsFestival-list_text_81'), date: t('festivalsFestival-list_text_80'), desc: t('festivalsFestival-list_text_79'), isHighlight: true, detailId: 'otaue' },
      { name: t('festivalsFestival-list_text_86'), kana: t('festivalsFestival-list_text_85'), date: t('festivalsFestival-list_text_84'), desc: t('festivalsFestival-list_text_83') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_87'),
    festivals: [
      {
        name: t('festivalsFestival-list_text_90'), kana: t('festivalsFestival-list_text_89'), subtitle: t('festivalsFestival-list_text_88'),
        date: t('festivalsFestival-list_text_91'),
        desc: t('festivalsFestival-list_text_92'),
        subItems: t('festivalsFestival-list_text_93'),
        isHighlight: true,
        detailId: 'shinkosai',
      },
    ],
  },
  {
    month: t('festivalsFestival-list_text_94'),
    festivals: [
      { name: t('festivalsFestival-list_text_98'), kana: t('festivalsFestival-list_text_97'), date: t('festivalsFestival-list_text_96'), desc: t('festivalsFestival-list_text_95'), isHighlight: true, detailId: 'yabusame' },
      { name: t('festivalsFestival-list_text_102'), kana: t('festivalsFestival-list_text_101'), date: t('festivalsFestival-list_text_100'), desc: t('festivalsFestival-list_text_99') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_103'),
    festivals: [
      {
        name: t('festivalsFestival-list_text_106'), kana: t('festivalsFestival-list_text_105'), subtitle: t('festivalsFestival-list_text_104'),
        date: t('festivalsFestival-list_text_107'),
        desc: t('festivalsFestival-list_text_108'),
        subItems: t('festivalsFestival-list_text_109'),
        isHighlight: true,
        detailId: 'chushu',
      },
      { name: t('festivalsFestival-list_text_113'), kana: t('festivalsFestival-list_text_112'), date: t('festivalsFestival-list_text_111'), desc: t('festivalsFestival-list_text_110') },
      { name: t('festivalsFestival-list_text_117'), kana: t('festivalsFestival-list_text_116'), date: t('festivalsFestival-list_text_115'), desc: t('festivalsFestival-list_text_114'), isHighlight: true, detailId: 'fusai' },
      { name: t('festivalsFestival-list_text_121'), kana: t('festivalsFestival-list_text_120'), date: t('festivalsFestival-list_text_119'), desc: t('festivalsFestival-list_text_118'), isHighlight: true, detailId: 'fusai' },
    ],
  },
  {
    month: t('festivalsFestival-list_text_122'),
    festivals: [
      { name: t('festivalsFestival-list_text_126'), kana: t('festivalsFestival-list_text_125'), date: t('festivalsFestival-list_text_124'), desc: t('festivalsFestival-list_text_123') },
      { name: t('festivalsFestival-list_text_130'), kana: t('festivalsFestival-list_text_129'), date: t('festivalsFestival-list_text_128'), desc: t('festivalsFestival-list_text_127'), isHighlight: true, detailId: 'niinamesai' },
    ],
  },
  {
    month: t('festivalsFestival-list_text_131'),
    festivals: [
      { name: t('festivalsFestival-list_text_135'), kana: t('festivalsFestival-list_text_134'), date: t('festivalsFestival-list_text_133'), desc: t('festivalsFestival-list_text_132') },
      { name: t('festivalsFestival-list_text_139'), kana: t('festivalsFestival-list_text_138'), date: t('festivalsFestival-list_text_137'), desc: t('festivalsFestival-list_text_136') },
      { name: t('festivalsFestival-list_text_143'), kana: t('festivalsFestival-list_text_142'), date: t('festivalsFestival-list_text_141'), desc: t('festivalsFestival-list_text_140') },
      { name: t('festivalsFestival-list_text_147'), kana: t('festivalsFestival-list_text_146'), date: t('festivalsFestival-list_text_145'), desc: t('festivalsFestival-list_text_144') },
    ],
  },
];

const getMaituki = (t: any): FestivalRow[] => [
  { name: t('festivalsFestival-list_text_151'), kana: t('festivalsFestival-list_text_150'), date: t('festivalsFestival-list_text_149'), desc: t('festivalsFestival-list_text_148') },
  { name: t('festivalsFestival-list_text_155'), kana: t('festivalsFestival-list_text_154'), date: t('festivalsFestival-list_text_153'), desc: t('festivalsFestival-list_text_152') },
  { name: t('festivalsFestival-list_text_159'), kana: t('festivalsFestival-list_text_158'), date: t('festivalsFestival-list_text_157'), desc: t('festivalsFestival-list_text_156') },
];

const getYohai = (t: any): MonthGroup[] => [
  { month: t('festivalsFestival-list_text_164'),  festivals: [{ name: t('festivalsFestival-list_text_163'), kana: t('festivalsFestival-list_text_162'), date: t('festivalsFestival-list_text_161'), desc: t('festivalsFestival-list_text_160') }] },
  { month: t('festivalsFestival-list_text_169'),  festivals: [{ name: t('festivalsFestival-list_text_168'), kana: t('festivalsFestival-list_text_167'), date: t('festivalsFestival-list_text_166'), desc: t('festivalsFestival-list_text_165') }] },
  { month: t('festivalsFestival-list_text_174'),  festivals: [{ name: t('festivalsFestival-list_text_173'), kana: t('festivalsFestival-list_text_172'), date: t('festivalsFestival-list_text_171'), desc: t('festivalsFestival-list_text_170') }] },
  { month: t('festivalsFestival-list_text_179'),  festivals: [{ name: t('festivalsFestival-list_text_178'), kana: t('festivalsFestival-list_text_177'), date: t('festivalsFestival-list_text_176'), desc: t('festivalsFestival-list_text_175') }] },
  { month: t('festivalsFestival-list_text_184'), festivals: [{ name: t('festivalsFestival-list_text_183'), kana: t('festivalsFestival-list_text_182'), date: t('festivalsFestival-list_text_181'), desc: t('festivalsFestival-list_text_180') }] },
];

const getSetsumatsu = (t: any): MonthGroup[] => [
  {
    month: t('festivalsFestival-list_text_185'),
    festivals: [
      { name: t('festivalsFestival-list_text_189'), kana: t('festivalsFestival-list_text_188'), date: t('festivalsFestival-list_text_187'), desc: t('festivalsFestival-list_text_186') },
      { name: t('festivalsFestival-list_text_193'), kana: t('festivalsFestival-list_text_192'), date: t('festivalsFestival-list_text_191'), desc: t('festivalsFestival-list_text_190') },
      { name: t('festivalsFestival-list_text_197'), kana: t('festivalsFestival-list_text_196'), date: t('festivalsFestival-list_text_195'), desc: t('festivalsFestival-list_text_194') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_198'),
    festivals: [
      { name: t('festivalsFestival-list_text_202'), kana: t('festivalsFestival-list_text_201'), date: t('festivalsFestival-list_text_200'), desc: t('festivalsFestival-list_text_199') },
      { name: t('festivalsFestival-list_text_206'), kana: t('festivalsFestival-list_text_205'), date: t('festivalsFestival-list_text_204'), desc: t('festivalsFestival-list_text_203') },
      { name: t('festivalsFestival-list_text_210'), kana: t('festivalsFestival-list_text_209'), date: t('festivalsFestival-list_text_208'), desc: t('festivalsFestival-list_text_207') },
      { name: t('festivalsFestival-list_text_214'), kana: t('festivalsFestival-list_text_213'), date: t('festivalsFestival-list_text_212'), desc: t('festivalsFestival-list_text_211') },
      { name: t('festivalsFestival-list_text_218'), kana: t('festivalsFestival-list_text_217'), date: t('festivalsFestival-list_text_216'), desc: t('festivalsFestival-list_text_215') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_219'),
    festivals: [
      { name: t('festivalsFestival-list_text_223'), kana: t('festivalsFestival-list_text_222'), date: t('festivalsFestival-list_text_221'), desc: t('festivalsFestival-list_text_220') },
      { name: t('festivalsFestival-list_text_227'), kana: t('festivalsFestival-list_text_226'), date: t('festivalsFestival-list_text_225'), desc: t('festivalsFestival-list_text_224') },
      { name: t('festivalsFestival-list_text_231'), kana: t('festivalsFestival-list_text_230'), date: t('festivalsFestival-list_text_229'), desc: t('festivalsFestival-list_text_228') },
      { name: t('festivalsFestival-list_text_235'), kana: t('festivalsFestival-list_text_234'), date: t('festivalsFestival-list_text_233'), desc: t('festivalsFestival-list_text_232') },
      { name: t('festivalsFestival-list_text_239'), kana: t('festivalsFestival-list_text_238'), date: t('festivalsFestival-list_text_237'), desc: t('festivalsFestival-list_text_236') },
      { name: t('festivalsFestival-list_text_243'), kana: t('festivalsFestival-list_text_242'), date: t('festivalsFestival-list_text_241'), desc: t('festivalsFestival-list_text_240') },
      { name: t('festivalsFestival-list_text_247'), kana: t('festivalsFestival-list_text_246'), date: t('festivalsFestival-list_text_245'), desc: t('festivalsFestival-list_text_244') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_248'),
    festivals: [
      { name: t('festivalsFestival-list_text_252'), kana: t('festivalsFestival-list_text_251'), date: t('festivalsFestival-list_text_250'), desc: t('festivalsFestival-list_text_249') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_253'),
    festivals: [
      { name: t('festivalsFestival-list_text_257'), kana: t('festivalsFestival-list_text_256'), date: t('festivalsFestival-list_text_255'), desc: t('festivalsFestival-list_text_254') },
      { name: t('festivalsFestival-list_text_261'), kana: t('festivalsFestival-list_text_260'), date: t('festivalsFestival-list_text_259'), desc: t('festivalsFestival-list_text_258') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_262'),
    festivals: [
      { name: t('festivalsFestival-list_text_266'), kana: t('festivalsFestival-list_text_265'), date: t('festivalsFestival-list_text_264'), desc: t('festivalsFestival-list_text_263') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_267'),
    festivals: [
      { name: t('festivalsFestival-list_text_271'), kana: t('festivalsFestival-list_text_270'), date: t('festivalsFestival-list_text_269'), desc: t('festivalsFestival-list_text_268') },
      { name: t('festivalsFestival-list_text_275'), kana: t('festivalsFestival-list_text_274'), date: t('festivalsFestival-list_text_273'), desc: t('festivalsFestival-list_text_272') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_276'),
    festivals: [
      { name: t('festivalsFestival-list_text_280'), kana: t('festivalsFestival-list_text_279'), date: t('festivalsFestival-list_text_278'), desc: t('festivalsFestival-list_text_277') },
      { name: t('festivalsFestival-list_text_284'), kana: t('festivalsFestival-list_text_283'), date: t('festivalsFestival-list_text_282'), desc: t('festivalsFestival-list_text_281') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_285'),
    festivals: [
      { name: t('festivalsFestival-list_text_289'), kana: t('festivalsFestival-list_text_288'), date: t('festivalsFestival-list_text_287'), desc: t('festivalsFestival-list_text_286') },
    ],
  },
  {
    month: t('festivalsFestival-list_text_290'),
    festivals: [
      { name: t('festivalsFestival-list_text_294'), kana: t('festivalsFestival-list_text_293'), date: t('festivalsFestival-list_text_292'), desc: t('festivalsFestival-list_text_291') },
      { name: t('festivalsFestival-list_text_298'), kana: t('festivalsFestival-list_text_297'), date: t('festivalsFestival-list_text_296'), desc: t('festivalsFestival-list_text_295') },
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
type SubtypeKey = string;

const getFilterMeta = (t: any, KOTEIREI: MonthGroup[], YOHAI: MonthGroup[], SETSUMATSU: MonthGroup[]) => ({
  jinji: {
    label: t('festivalsFestival-list_text_302'),
    anchor: 'section-jinji',
    subtypes: {
      [t('festivalsFestival-list_text_303')]: { anchor: 'subsec-koteirei', months: KOTEIREI.map(g => g.month) },
      [t('festivalsFestival-list_text_304')]:   { anchor: 'subsec-maituki',  months: [] as string[] },
      [t('festivalsFestival-list_text_305')]: { anchor: 'subsec-yohai',    months: YOHAI.map(g => g.month) },
    } satisfies Record<SubtypeKey, { anchor: string; months: string[] }>,
  },
  setsumatsu: {
    label: t('festivalsFestival-list_text_306'),
    anchor: 'section-setsumatsu',
    months: SETSUMATSU.map(g => g.month),
  },
} as const);

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
  const theme = THEME[themeKey];
  const t = useTranslations();
  return (
    <div style={{ border: `1px solid ${theme.accentBorder}`, backgroundColor: C.ivory, overflow: 'hidden' }}>
      {/* Header row */}
      <div className="hidden sm:flex" style={{ backgroundColor: C.dark, padding: '10px 16px' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>{t('festivalsFestival-list_text_307')}</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>{t('festivalsFestival-list_text_308')}</span>
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
  const theme = THEME[themeKey];
  const t = useTranslations();
  return (
    <div style={{ border: `1px solid ${theme.accentBorder}`, backgroundColor: C.ivory, overflow: 'hidden' }}>
      <div className="hidden sm:flex" style={{ backgroundColor: C.dark, padding: '10px 16px' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>{t('festivalsFestival-list_text_309')}</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontFamily: F.serif, fontSize: '0.78rem', color: 'rgba(250,248,245,0.7)', letterSpacing: '0.2em' }}>{t('festivalsFestival-list_text_310')}</span>
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
function FilterNavigator({
  FILTER_META,
  MAITUKI,
}: {
  FILTER_META: any;
  MAITUKI: FestivalRow[];
}) {
  const t = useTranslations();
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
    if (subtype === t('festivalsFestival-list_text_311')) { scrollTo(`koteirei-${m}`); return; }
    if (subtype === t('festivalsFestival-list_text_312')) { scrollTo(`yohai-${m}`); return; }
    if (subtype === t('festivalsFestival-list_text_313'))   { scrollTo(`maituki-${m}`); return; }
  };

  // Available months based on current selection
  const availableMonths: string[] = (() => {
    if (section === 'setsumatsu') return FILTER_META.setsumatsu.months as unknown as string[];
    if (subtype === t('festivalsFestival-list_text_315'))    return FILTER_META.jinji.subtypes[t('festivalsFestival-list_text_314')].months as unknown as string[];
    if (subtype === t('festivalsFestival-list_text_317'))    return FILTER_META.jinji.subtypes[t('festivalsFestival-list_text_316')].months as unknown as string[];
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
        <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{t("festivalsFestivalListPage_text_35359")}</p>
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
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{t("festivalsFestivalListPage_text_50860")}</p>
          <div className="flex flex-wrap gap-2">
            {([t('festivalsFestival-list_text_320'), t('festivalsFestival-list_text_319'), t('festivalsFestival-list_text_318')] as SubtypeKey[]).map(sub => (
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
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{t("festivalsFestivalListPage_text_40297")}</p>
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
      {subtype === t('festivalsFestival-list_text_321') && (
        <div>
          <p style={{ fontFamily: F.sans, fontSize: '0.65rem', color: C.textMute, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{t("festivalsFestivalListPage_text_75267")}</p>
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
  const t = useTranslations();
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
      title={t('festivalsFestival-list_text_322')}
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
      }}>{t("festivalsFestivalListPage_text_47936")}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function FestivalListPage() {
  const t = useTranslations();
  const KOTEIREI = getKoteirei(t);
  const MAITUKI = getMaituki(t);
  const YOHAI = getYohai(t);
  const SETSUMATSU = getSetsumatsu(t);
  const FILTER_META = getFilterMeta(t, KOTEIREI, YOHAI, SETSUMATSU);
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
            >{t("festivalsFestivalListPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("festivalsFestivalListPage_text_81832")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("festivalsFestivalListPage_text_55760")}</span>
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
            <h1 className="font-title-main" style={{ fontFamily: F.serif, color: '#faf8f5', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300, letterSpacing: '0.4em', textShadow: '0 3px 20px rgba(0,0,0,0.5)', margin: 0 }}>{t("festivalsFestivalListPage_text_55760")}</h1>
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
            <FilterNavigator FILTER_META={FILTER_META} MAITUKI={MAITUKI} />
          </FadeIn>

          {/* ══════════════════════════════════════════════════════════════════
              SECTION 1 : 祭典・神事
          ══════════════════════════════════════════════════════════════════ */}
          <div id="section-jinji" style={{ scrollMarginTop: '56px' }}>

            <FadeIn>
              <SectionBanner ja={t('festivalsFestival-list_text_323')} en="Festivals &amp; Sacred Rites" />
            </FadeIn>

            {/* ── 恒例祭 ─────────────────────────────────────────────────── */}
            <div id="subsec-koteirei" style={{ scrollMarginTop: '60px' }}>
              <FadeIn delay={0.04}>
                <div style={{ marginBottom: '16px' }}>
                  <ContentHeading>{t('festivalsFestival-list_text_324')}</ContentHeading>
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
                  <ContentHeading>{t('festivalsFestival-list_text_325')}</ContentHeading>
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
                    <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1rem,2.5vw,1.15rem)', letterSpacing: '0.25em', fontWeight: 400, color: '#faf8f5', margin: 0 }}>{t("festivalsFestivalListPage_text_39234")}</h2>
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
                  <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1rem,2.5vw,1.15rem)', letterSpacing: '0.25em', fontWeight: 400, color: '#faf8f5', margin: 0 }}>{t("festivalsFestivalListPage_text_73497")}</h2>
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
              <Link href={`/${locale}/worship/guide`} style={{ fontFamily: F.sans, fontSize: '0.78rem', letterSpacing: '0.14em', color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px', textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block' }}>{t("festivalsFestivalListPage_text_14851")}</Link>
              <Link href={`/${locale}`} style={{ fontFamily: F.sans, fontSize: '0.78rem', letterSpacing: '0.14em', color: C.gold, backgroundColor: 'transparent', padding: '11px 28px', textDecoration: 'none', border: `1px solid ${C.gold}`, display: 'inline-block' }}>{t("festivalsFestivalListPage_text_57715")}</Link>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
