'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

const getTopHighlights = (t: any): HighlightSpot[] => [
  {
    id: 'jogu-hl',
    badge: t('worshipGuide_text_1'),
    badgeKind: 'kokuho',
    name: t('worshipGuide_text_2'),
    kana: t('worshipGuide_text_3'),
    deities: [t('worshipGuide_text_6'), t('worshipGuide_text_5'), t('worshipGuide_text_4')],
    desc: t('worshipGuide_text_7'),
    img: IMG,
  },
  {
    id: 'gegu-hl',
    name: t('worshipGuide_text_8'),
    kana: t('worshipGuide_text_9'),
    desc: t('worshipGuide_text_10'),
    img: IMG,
  },
  {
    id: 'goreisui-hl',
    name: t('worshipGuide_text_11'),
    kana: t('worshipGuide_text_12'),
    desc: t('worshipGuide_text_13'),
    img: IMG,
  },
];

const getSubHighlights = (t: any): HighlightSpot[] => [
  {
    id: 'wakamiya-hl',
    badge: t('worshipGuide_text_14'),
    badgeKind: 'kokuShitei',
    name: t('worshipGuide_text_15'),
    kana: t('worshipGuide_text_16'),
    deities: [t('worshipGuide_text_19'), t('worshipGuide_text_18'), t('worshipGuide_text_17')],
    desc: t('worshipGuide_text_20'),
    img: IMG,
  },
  {
    id: 'kurehashi-hl',
    badge: t('worshipGuide_text_21'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_22'),
    kana: t('worshipGuide_text_23'),
    desc: t('worshipGuide_text_24'),
    img: IMG,
  },
  {
    id: 'minamichuro-hl',
    badge: t('worshipGuide_text_25'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_26'),
    kana: t('worshipGuide_text_27'),
    deities: [t('worshipGuide_text_29'), t('worshipGuide_text_28')],
    desc: t('worshipGuide_text_30'),
    img: IMG,
  },
  {
    id: 'hokushin-hl',
    badge: t('worshipGuide_text_31'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_32'),
    kana: t('worshipGuide_text_33'),
    deities: [t('worshipGuide_text_36'), t('worshipGuide_text_35'), t('worshipGuide_text_34')],
    desc: t('worshipGuide_text_37'),
    img: IMG,
  },
  {
    id: 'saidaimon-hl',
    badge: t('worshipGuide_text_38'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_39'),
    kana: t('worshipGuide_text_40'),
    desc: t('worshipGuide_text_41'),
    img: IMG,
  },
  {
    id: 'usatorii-hl',
    badge: t('worshipGuide_text_42'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_43'),
    kana: t('worshipGuide_text_44'),
    desc: t('worshipGuide_text_45'),
    img: IMG,
  },
  {
    id: 'takakura-hl',
    badge: t('worshipGuide_text_46'),
    badgeKind: 'kenShitei',
    name: t('worshipGuide_text_47'),
    kana: t('worshipGuide_text_48'),
    desc: t('worshipGuide_text_49'),
    img: IMG,
  },
  {
    id: 'hozoken-hl',
    name: t('worshipGuide_text_50'),
    kana: t('worshipGuide_text_51'),
    desc: t('worshipGuide_text_52'),
    img: IMG,
    link: '/about/museum',
  },
  {
    id: 'kodaibasu-hl',
    name: t('worshipGuide_text_53'),
    kana: t('worshipGuide_text_54'),
    desc: t('worshipGuide_text_55'),
    img: IMG,
  },
  {
    id: 'ichiigashi-hl',
    name: t('worshipGuide_text_56'),
    kana: t('worshipGuide_text_57'),
    desc: t('worshipGuide_text_58'),
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

const getHotspots = (t: any): Hotspot[] => [
  {
    id: 'hyakudan', name: t('worshipGuide_text_60'), kana: t('worshipGuide_text_59'),
    desc: t('worshipGuide_text_61'),
    img: IMG, x: 37.2, y: 7.3, w: 5.9, h: 3.8, popSide: 'right',
  },
  {
    id: 'goreisui', name: t('worshipGuide_text_63'), kana: t('worshipGuide_text_62'),
    desc: t('worshipGuide_text_64'),
    img: IMG, x: 38.6, y: 28.8, w: 7.6, h: 4.2, popSide: 'right',
  },
  {
    id: 'mizuwake', name: t('worshipGuide_text_67'), kana: t('worshipGuide_text_66'), tag: t('worshipGuide_text_65'),
    tagItems: [
      t('worshipGuide_text_68'),
      t('worshipGuide_text_69'),
      t('worshipGuide_text_70'),
      t('worshipGuide_text_71'),
      t('worshipGuide_text_72'),
    ],
    desc: t('worshipGuide_text_73'),
    img: IMG, x: 33.7, y: 34.1, w: 9.4, h: 3.9, popSide: 'right',
  },
  {
    id: 'tongu', name: t('worshipGuide_text_75'), kana: t('worshipGuide_text_74'),
    desc: t('worshipGuide_text_76'),
    img: IMG, x: 36.8, y: 45.3, w: 6, h: 3.8, popSide: 'right',
  },
  {
    id: 'togu', name: t('worshipGuide_text_79'), kana: t('worshipGuide_text_78'), tag: t('worshipGuide_text_77'),
    tagItems: [t('worshipGuide_text_80')],
    desc: t('worshipGuide_text_81'),
    img: IMG, x: 72.8, y: 29, w: 9.2, h: 3.7, popSide: 'right',
  },
  {
    id: 'mokushoso', name: t('worshipGuide_text_84'), kana: t('worshipGuide_text_83'), tag: t('worshipGuide_text_82'),
    tagItems: [
      t('worshipGuide_text_85'),
      t('worshipGuide_text_86'),
    ],
    desc: t('worshipGuide_text_87'),
    img: IMG, x: 45, y: 47.9, w: 11.1, h: 3.7, popSide: 'right',
  },
  {
    id: 'yasaka', name: t('worshipGuide_text_90'), kana: t('worshipGuide_text_89'), tag: t('worshipGuide_text_88'),
    tagItems: [t('worshipGuide_text_91')],
    desc: t('worshipGuide_text_92'),
    img: IMG, x: 74.3, y: 33.5, w: 9.3, h: 3.8, popSide: 'right',
  },
  {
    id: 'kameyama', name: t('worshipGuide_text_95'), kana: t('worshipGuide_text_94'), tag: t('worshipGuide_text_93'),
    tagItems: [t('worshipGuide_text_96')],
    desc: t('worshipGuide_text_97'),
    img: IMG, x: 48.7, y: 28.8, w: 8.8, h: 3.9, popSide: 'right',
  },
  {
    id: 'yako', name: t('worshipGuide_text_99'), kana: t('worshipGuide_text_98'),
    desc: t('worshipGuide_text_100'),
    img: IMG, x: 17.9, y: 5.2, w: 9.4, h: 4, popSide: 'right',
  },
  {
    id: 'oo', name: t('worshipGuide_text_103'), kana: t('worshipGuide_text_102'), tag: t('worshipGuide_text_101'),
    tagItems: [t('worshipGuide_text_104')],
    desc: t('worshipGuide_text_105'),
    img: IMG, x: 2.6, y: 38.8, w: 9.6, h: 3.9, popSide: 'right',
  },
  {
    id: 'goo', name: t('worshipGuide_text_108'), kana: t('worshipGuide_text_107'), tag: t('worshipGuide_text_106'),
    tagItems: [t('worshipGuide_text_109')],
    desc: t('worshipGuide_text_110'),
    img: IMG, x: 13.9, y: 40.4, w: 9.6, h: 3.8, popSide: 'right',
  },
  {
    id: 'yorimo', name: t('worshipGuide_text_112'), kana: t('worshipGuide_text_111'),
    desc: t('worshipGuide_text_113'),
    img: IMG, x: 48, y: 84.5, w: 8.5, h: 4.1, popSide: 'right',
  },
  {
    id: 'hishigata', name: t('worshipGuide_text_115'), kana: t('worshipGuide_text_114'),
    desc: t('worshipGuide_text_116'),
    img: IMG, x: 46.1, y: 39.4, w: 8.4, h: 3.9, popSide: 'right',
  },
  {
    id: 'hatsusawa', name: t('worshipGuide_text_118'), kana: t('worshipGuide_text_117'),
    desc: t('worshipGuide_text_119'),
    img: IMG, x: 72.7, y: 68.1, w: 8.4, h: 4.2, popSide: 'right',
  },
  {
    id: 'haraijo', name: t('worshipGuide_text_121'), kana: t('worshipGuide_text_120'),
    desc: t('worshipGuide_text_122'),
    img: IMG, x: 73.4, y: 24.3, w: 6.1, h: 4.1, popSide: 'right',
  },
  {
    id: 'kasuga', name: t('worshipGuide_text_125'), kana: t('worshipGuide_text_124'), tag: t('worshipGuide_text_123'),
    tagItems: [t('worshipGuide_text_126')],
    desc: t('worshipGuide_text_127'),
    img: IMG, x: 22.1, y: 32.7, w: 9.2, h: 4.1, popSide: 'right',
  },
  {
    id: 'sumiyoshi', name: t('worshipGuide_text_129'), kana: 'sumiyoshijinja', tag: t('worshipGuide_text_128'),
    tagItems: [
      t('worshipGuide_text_130'),
      t('worshipGuide_text_131'),
      t('worshipGuide_text_132'),
    ],
    desc: t('worshipGuide_text_133'),
    img: IMG, x: 2.1, y: 32.9, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'jogu', name: t('worshipGuide_text_136'), kana: t('worshipGuide_text_135'), tag: t('worshipGuide_text_134'),
    desc: t('worshipGuide_text_137'),
    img: IMG, x: 33.9, y: 20.7, w: 6.1, h: 4, popSide: 'right',
  },
  {
    id: 'gegu', name: t('worshipGuide_text_138'), kana: 'gegu / mikemiya',
    desc: t('worshipGuide_text_139'),
    img: IMG, x: 68.7, y: 5.3, w: 6.2, h: 3.9, popSide: 'right',
  },
  {
    id: 'wakamiya', name: t('worshipGuide_text_141'), kana: 'wakamiya jinja', tag: t('worshipGuide_text_140'),
    desc: t('worshipGuide_text_142'),
    img: IMG, x: 57.3, y: 14.1, w: 9.5, h: 4.2, popSide: 'right',
  },
  {
    id: 'kurehashi', name: t('worshipGuide_text_144'), kana: 'kurehashi', tag: t('worshipGuide_text_143'),
    desc: t('worshipGuide_text_145'),
    img: IMG, x: 80.8, y: 45.7, w: 6.7, h: 3.8, popSide: 'left',
  },
  {
    id: 'minamichuro', name: t('worshipGuide_text_147'), kana: 'minamichuro / chokushimon', tag: t('worshipGuide_text_146'),
    desc: t('worshipGuide_text_148'),
    img: IMG, x: 7.1, y: 8, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'hokushin', name: t('worshipGuide_text_150'), kana: 'hokushinjinja', tag: t('worshipGuide_text_149'),
    desc: t('worshipGuide_text_151'),
    img: IMG, x: 12.1, y: 32.7, w: 9.3, h: 4.1, popSide: 'right',
  },
  {
    id: 'saidaimon', name: t('worshipGuide_text_153'), kana: 'saidaimon', tag: t('worshipGuide_text_152'),
    desc: t('worshipGuide_text_154'),
    img: IMG, x: 48.2, y: 9.3, w: 7.4, h: 3.8, popSide: 'right',
  },
  {
    id: 'usatorii', name: t('worshipGuide_text_156'), kana: 'usatorii', tag: t('worshipGuide_text_155'),
    desc: t('worshipGuide_text_157'),
    img: IMG, x: 57, y: 5.5, w: 9.2, h: 3.8, popSide: 'right',
  },
  {
    id: 'takakura', name: t('worshipGuide_text_159'), kana: 'takakura', tag: t('worshipGuide_text_158'),
    desc: t('worshipGuide_text_160'),
    img: IMG, x: 63.4, y: 9.7, w: 6.1, h: 3.7, popSide: 'right',
  },
  {
    id: 'kuroo', name: t('worshipGuide_text_162'), kana: 'kuroojinja', tag: t('worshipGuide_text_161'),
    tagItems: [t('worshipGuide_text_163')],
    desc: t('worshipGuide_text_164'),
    img: IMG, x: 56.6, y: 76.2, w: 9.2, h: 3.7, popSide: 'left',
  },
  {
    id: 'monorail', name: t('worshipGuide_text_165'), kana: '',
    desc: t('worshipGuide_text_166'),
    img: IMG, x: 44.8, y: 1, w: 17.4, h: 4, popSide: 'right',
  },
];

// ── Shared card body (used in both desktop overlay and mobile panel) ──────────
function CardBody({ active }: { active: Hotspot }) {
  const t = useTranslations();
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
                <span style={{ color: C.gold, marginRight: '4px' }}>{t('worshipGuide_text_167')}</span>{item}
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
  const t = useTranslations();
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
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', color: '#2c2c2c', letterSpacing: '0.06em' }}>{t('worshipGuide_text_168')}</span>
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
    { badge: <Badge text="P"  bg="#7b29c5" />, label: t('worshipGuide_text_169') },
    { badge: <Badge text="BP" bg="#2ea843" />, label: t('worshipGuide_text_170') },
    { badge: <Badge text="WC" bg="#1a6bb5" />, label: t('worshipGuide_text_171') },
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
            <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.82rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>{t('worshipGuide_text_172')}</span>
          </div>
          <CursorIcon />
        </div>
        <p style={{ ...labelTx, margin: 0 }}>
          黒いワクの上に書かれた名称に
          {isMobile
            ? <><strong style={{ color: C.crimson }}>{t('worshipGuide_text_174')}</strong>{t('worshipGuide_text_173')}</>
            : <><strong style={{ color: C.crimson }}>{t('worshipGuide_text_176')}</strong>{t('worshipGuide_text_175')}</>
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
        <p style={{ ...labelTx, margin: 0, whiteSpace: 'nowrap' }}>{t("worshipGuidePage_text_38722")}<br />{t('worshipGuide_text_177')}<br />{t("worshipGuidePage_text_24595")}</p>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            title={t('worshipGuide_text_178')}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '1px', padding: '10px 16px',
              backgroundColor: C.gold, color: '#fff', border: 'none', borderRadius: '3px',
              cursor: 'not-allowed', opacity: 0.78,
              fontFamily: 'var(--font-serif)', fontSize: '0.78rem', letterSpacing: '0.08em',
              lineHeight: 1.6, boxShadow: '0 2px 6px rgba(162,122,40,0.25)',
            }}
          >
            <span>{t('worshipGuide_text_179')}</span>
            <span>{t('worshipGuide_text_180')}</span>
          </button>
          <span style={{
            position: 'absolute', top: '-7px', right: '-6px',
            backgroundColor: C.crimson, color: '#fff',
            fontFamily: 'var(--font-sans)', fontSize: '0.52rem', letterSpacing: '0.04em',
            padding: '1px 5px', borderRadius: '8px', whiteSpace: 'nowrap',
          }}>{t('worshipGuide_text_181')}</span>
        </div>
      </div>

      {!isMobile && <VDivider />}

      {/* ④ 凡例 */}
      <div style={{
        padding: '14px 16px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <div style={{ width: '3px', height: '13px', backgroundColor: C.gold, borderRadius: '2px' }} />
          <span style={{ fontFamily: 'var(--font-serif)', color: C.text, fontSize: '0.78rem', letterSpacing: '0.14em' }}>{t('worshipGuide_text_182')}</span>
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
            <span style={{ ...labelTx, lineHeight: 1.5 }}>{t('worshipGuide_text_184')}<br />{t('worshipGuide_text_183')}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Highlights Section ────────────────────────────────────────────────────────
function HighlightsSection({
  TOP_HIGHLIGHTS,
  SUB_HIGHLIGHTS,
}: {
  TOP_HIGHLIGHTS: HighlightSpot[];
  SUB_HIGHLIGHTS: HighlightSpot[];
}) {
  const locale = useLocale();
  const t = useTranslations();

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
            <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.78rem', letterSpacing: '0.12em', marginBottom: '6px' }}>{t('worshipGuide_text_185')}</p>
            <div style={{ marginBottom: '12px' }}>
              {spot.deities.map((d, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.88rem', lineHeight: 1.9, paddingLeft: '0.9em', textIndent: '-0.9em' }}>
                  <span style={{ color: C.gold, marginRight: '4px' }}>{t('worshipGuide_text_186')}</span>{d}
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
            }}>{t('worshipGuide_text_187')}</span>
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
                <span style={{ color: C.gold, marginRight: '3px' }}>{t('worshipGuide_text_188')}</span>{d}
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
          }}>{t('worshipGuide_text_189')}</h2>
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
  const t = useTranslations();
  const TOP_HIGHLIGHTS = getTopHighlights(t);
  const SUB_HIGHLIGHTS = getSubHighlights(t);
  const HOTSPOTS = getHotspots(t);
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
          alt={t('worshipGuide_text_190')}
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
            >{t("worshipGuidePage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipGuidePage_text_11089")}</span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("worshipGuidePage_text_24500")}</span>
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
            <h1 className="font-title-main" style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, letterSpacing: '0.3em', textShadow: '0 3px 20px rgba(0,0,0,0.4)' }}>{t("worshipGuidePage_text_24500")}</h1>
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
                >{t("worshipGuidePage_text_48365")}</button>
                {mapZoom > 1 && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: C.textMute }}>{t('worshipGuide_text_191')}</span>
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
                  alt={t('worshipGuide_text_192')}
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
                                <span style={{ color: C.gold, marginRight: '4px' }}>{t('worshipGuide_text_193')}</span>{item}
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

      <HighlightsSection TOP_HIGHLIGHTS={TOP_HIGHLIGHTS} SUB_HIGHLIGHTS={SUB_HIGHLIGHTS} />

    </div>
  );
}
