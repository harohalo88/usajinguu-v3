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
import { useTranslations } from 'next-intl';
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

const getFestivals = (t: any): Festival[] => [
  {
    id: 'rinpi',
    name: t('festivalsFestival-detail_text_1'),
    date: t('festivalsFestival-detail_text_2'),
    paragraphs: [
      t('festivalsFestival-detail_text_3'),
      t('festivalsFestival-detail_text_4'),
    ],
    hasImage: true,
  },
  {
    id: 'chine',
    name: t('festivalsFestival-detail_text_5'),
    date: t('festivalsFestival-detail_text_6'),
    paragraphs: [
      t('festivalsFestival-detail_text_7'),
      t('festivalsFestival-detail_text_8'),
      t('festivalsFestival-detail_text_9'),
      t('festivalsFestival-detail_text_10'),
      t('festivalsFestival-detail_text_11'),
    ],
    hasImage: true,
  },
  {
    id: 'reisai',
    name: t('festivalsFestival-detail_text_12'),
    date: t('festivalsFestival-detail_text_13'),
    paragraphs: [
      t('festivalsFestival-detail_text_14'),
    ],
    hasImage: true,
  },
  {
    id: 'otaue',
    name: t('festivalsFestival-detail_text_15'),
    date: t('festivalsFestival-detail_text_16'),
    paragraphs: [
      t('festivalsFestival-detail_text_17'),
      t('festivalsFestival-detail_text_18'),
    ],
    hasImage: true,
  },
  {
    id: 'shinkosai',
    name: t('festivalsFestival-detail_text_19'),
    date: t('festivalsFestival-detail_text_20'),
    paragraphs: [
      t('festivalsFestival-detail_text_21'),
      t('festivalsFestival-detail_text_22'),
      t('festivalsFestival-detail_text_23'),
      t('festivalsFestival-detail_text_24'),
      t('festivalsFestival-detail_text_25'),
      t('festivalsFestival-detail_text_26'),
    ],
    hasImage: true,
  },
  {
    id: 'yabusame',
    name: t('festivalsFestival-detail_text_27'),
    date: t('festivalsFestival-detail_text_28'),
    paragraphs: [
      t('festivalsFestival-detail_text_29'),
      t('festivalsFestival-detail_text_30'),
      t('festivalsFestival-detail_text_31'),
    ],
    hasImage: true,
  },
  {
    id: 'chushu',
    name: t('festivalsFestival-detail_text_32'),
    date: t('festivalsFestival-detail_text_33'),
    paragraphs: [
      t('festivalsFestival-detail_text_34'),
      t('festivalsFestival-detail_text_35'),
      t('festivalsFestival-detail_text_36'),
      t('festivalsFestival-detail_text_37'),
    ],
    hasImage: true,
  },
  {
    id: 'fusai',
    name: t('festivalsFestival-detail_text_38'),
    date: t('festivalsFestival-detail_text_39'),
    paragraphs: [
      t('festivalsFestival-detail_text_40'),
    ],
    hasImage: true,
    subsections: [
      {
        title: t('festivalsFestival-detail_text_41'),
        date: t('festivalsFestival-detail_text_42'),
        paragraphs: [
          t('festivalsFestival-detail_text_43'),
          t('festivalsFestival-detail_text_44'),
        ],
        hasImage: true,
      },
      {
        title: t('festivalsFestival-detail_text_45'),
        date: t('festivalsFestival-detail_text_46'),
        paragraphs: [
          t('festivalsFestival-detail_text_47'),
        ],
        hasImage: true,
      },
    ],
  },
  {
    id: 'niinamesai',
    name: t('festivalsFestival-detail_text_48'),
    date: t('festivalsFestival-detail_text_49'),
    paragraphs: [
      t('festivalsFestival-detail_text_50'),
      t('festivalsFestival-detail_text_51'),
      t('festivalsFestival-detail_text_52'),
    ],
    hasImage: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const t = useTranslations();
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
        <X size={14} />{t("festivalsFestivalDetailPage_text_69921")}</button>
      <img
        src={src}
        alt={t('festivalsFestival-detail_text_53')}
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
  const t = useTranslations();
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
        <ZoomIn size={11} style={{ color: C.gold }} />{t("festivalsFestivalDetailPage_text_43606")}</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE BADGE
// ─────────────────────────────────────────────────────────────────────────────
function DateBadge({ date }: { date: string }) {
  const t = useTranslations();
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
      }}>{t("festivalsFestivalDetailPage_text_76842")}</span>
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
  const t = useTranslations();
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
                    alt={t('festivalsFestivalDetailPage_subtitle')}
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
            alt={t('festivalsFestivalDetailPage_festivalname')}
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
function SummaryTable({ festivals }: { festivals: Festival[] }) {
  const t = useTranslations();
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
        {['No.', t('festivalsFestival-detail_text_55'), t('festivalsFestival-detail_text_54')].map((h, i) => (
          <span key={i} style={{
            fontFamily: F.serif,
            fontSize: '0.75rem',
            color: 'rgba(162,122,40,0.75)',
            letterSpacing: '0.2em',
          }}>{h}</span>
        ))}
      </div>

      {/* table rows */}
      {festivals.map((f, fi) => (
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
  const t = useTranslations();
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
      title={t('festivalsFestival-detail_text_56')}
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
      }}>{t("festivalsFestivalDetailPage_text_58082")}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function FestivalDetailPage() {
  const t = useTranslations();
  const festivals = getFestivals(t);
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
            >{t("festivalsFestivalDetailPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <Link
              href={`/${locale}/festivals/festival-list`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >{t("festivalsFestivalDetailPage_text_81832")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("festivalsFestivalDetailPage_text_40753")}</span>
          </nav>

          <p style={{
            fontFamily: F.sans, fontSize: '0.65rem', letterSpacing: '0.38em',
            textTransform: 'uppercase', color: 'rgba(162,122,40,0.65)',
            marginBottom: '18px',
          }}>
            Festival Ceremonies in Detail
          </p>
          <h1 style={{ ...TS.h1hero as React.CSSProperties, marginBottom: '0' }}>{t("festivalsFestivalDetailPage_text_40753")}</h1>
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
          <SectionBanner ja={t('festivalsFestival-detail_text_57')} en="Festival Schedule Overview" />
        </FadeIn>

        {/* Summary table */}
        <FadeIn delay={0.1}>
          <SummaryTable festivals={festivals} />
        </FadeIn>

        <FadeIn delay={0.12}>
          <OrnamentDivider />
        </FadeIn>

        {/* Section banner — Details */}
        <FadeIn delay={0.14}>
          <SectionBanner ja={t('festivalsFestival-detail_text_58')} en="Ceremony Details" />
        </FadeIn>

        {/* Detail cards */}
        <div style={{
          border: `1px solid rgba(162,122,40,0.22)`,
          overflow: 'hidden',
          marginBottom: '52px',
        }}>
          {festivals.map((festival, fi) => (
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
