'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ZoomIn } from 'lucide-react';
import {
  C,
  FadeIn,
  DiamondRule
} from '@/components/ShrineUI';

// ── Product images ─────────────────────────────────────────────────────────────
const imgNishiki       = '/images/nishiki-mamori.jpg';
const imgHachiman      = '/images/hachiman-mamori.jpg';
const imgKusunoki      = '/images/kusunoki-mamori.jpg';
const imgClearFile     = '/images/clear-file.jpg';

const HERO_IMG = 'https://images.unsplash.com/photo-1615341428357-34493a2efd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Product {
  title: string;
  reading: string;
  img: string;
  detail?: {
    body: string[];
    price?: string;
  };
}
interface Category {
  ja: string;
  en: string;
  products: Product[];
  info?: {
    heading: string;
    body: string[];
    table?: {
      headers: string[];
      rows: string[][];
      note?: string;
    };
  };
}

// ── Data ───────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    ja: '御守',
    en: 'Omamori',
    products: [
      { title: '交通安全　木札守',       reading: 'もくさつまもり',        img: imgNishiki },
      { title: '交通安全　無事カエル守', reading: 'ぶじかえるまもり',      img: imgNishiki  },
      { title: '交通安全　錦守',         reading: 'にしきまもり',           img: imgNishiki  },
      { title: '交通安全ステッカー',     reading: 'こうつうあんぜんすてっかー', img: imgNishiki },
      { title: '健康長寿守',             reading: 'けんこうちょうじゅまもり', img: imgNishiki },
      { title: '八幡神像守',             reading: 'はちまんしんぞうまもり', img: imgNishiki  },
      { title: '勝守',                   reading: 'かちまもり',             img: imgNishiki  },
    ],
  },
  {
    ja: '御神札',
    en: 'Goshinsatsu',
    products: [
      { title: '八幡守護木札（小）',  reading: 'はちまんしゅごもくさつ', img: imgHachiman },
      { title: '商売繁盛木札（小）',  reading: 'しょうばいはんじょうもくさつ', img: imgHachiman },
      { title: '宇佐神宮神札',        reading: 'うさじんぐうしんさつ',   img: imgHachiman  },
      { title: '水神札',              reading: 'すいじんさつ',           img: imgHachiman   },
      { title: '荒神札',              reading: 'こうじんさつ',           img: imgHachiman    },
    ],
    info: {
      heading: '御神札について',
      body: [
        '神棚等にお祀りするお札です。',
        '大きさは、荒神・水神、小、中、大、丙、甲があり、家内安全、商売繁盛、事業発展、海上安全などお札がございます。',
      ],
      table: {
        note: '（初穂料 1,000円〜10,000円）',
        headers: ['', 'タテ×ヨコ（cm）', '初穂料'],
        rows: [
          ['荒神・水神', '19.0×5.0', '1,000円'],
          ['小', '24.5×5.5', '2,000円'],
          ['大', '35.0×10.0', '3,500円'],
        ],
      },
    },
  },
  {
    ja: 'その他授与品',
    en: 'Other Sacred Items',
    products: [
      { title: 'くすの香守',   reading: 'くすのかまもり', img: imgKusunoki  },
      { title: 'クリアファイル', reading: 'くりあふぁいる', img: imgClearFile },
    ],
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
  product: Product;
  onClose: () => void;
}
function Lightbox({ product, onClose }: LightboxProps) {
  const { src, title, reading } = { src: product.img, title: product.title, reading: product.reading };
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center"
        style={{ background: 'rgba(10,3,3,0.88)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full mx-4"
          style={{ maxWidth: '672px' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 flex items-center gap-1.5 transition-opacity hover:opacity-100 font-sans text-ivory/70 text-[0.7rem] tracking-widest bg-none border-none cursor-pointer"
            style={{ background: 'none', border: 'none' }}
          >
            <X size={14} />
            閉じる
          </button>

          {/* Image */}
          <div style={{ border: `1px solid ${C.borderG}`, background: C.stone }}>
            <img
              src={src}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block max-h-[60vh] object-contain"
            />
          </div>

          {/* Caption */}
          <div className="mt-4 text-center">
            <p style={{ fontFamily: 'var(--font-serif)', color: C.ivory, letterSpacing: '0.2em', fontWeight: 600 }}>
              {title}
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', color: C.goldLt, fontSize: '0.82rem', letterSpacing: '0.12em', marginTop: '4px' }}>
              （{reading}）
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn>
      <div
        className="flex flex-col"
        style={{ cursor: 'pointer' }}
        onClick={() => onOpen(product)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image wrapper */}
        <div
          className="relative overflow-hidden"
          style={{
            background: C.stone,
            border: `1px solid ${hovered ? C.borderG : 'rgba(162,122,40,0.09)'}`,
            transition: 'border-color 0.3s',
            aspectRatio: '1 / 1',
          }}
        >
          <img
            src={product.img}
            alt={product.title}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          {/* Hover overlay (darkens on hover) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(10,3,3,0.22)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          {/* Magnifier badge — always visible top-right, brightens on hover */}
          <div
            className="absolute top-2 right-2 flex items-center justify-center"
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: hovered ? 'rgba(162,122,40,0.92)' : 'rgba(162,122,40,0.55)',
              boxShadow: '0 1px 4px rgba(10,3,3,0.25)',
              transition: 'background 0.3s, transform 0.3s',
              transform: hovered ? 'scale(1.12)' : 'scale(1)',
              zIndex: 2,
            }}
          >
            <ZoomIn size={14} color={C.ivory} strokeWidth={1.8} />
          </div>
        </div>

        {/* Text */}
        <div className="mt-3 text-center px-1">
          <p style={{ fontFamily: 'var(--font-serif)', color: '#333333', letterSpacing: '0.1em', fontWeight: 600 }}>
            {product.title}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', color: C.textMute, fontSize: '0.78rem', letterSpacing: '0.08em', marginTop: '3px' }}>
            （{product.reading}）
          </p>
          {product.detail && (
            <div className="mt-3 text-left" style={{ borderTop: `1px solid rgba(162,122,40,0.18)`, paddingTop: '10px' }}>
              {product.detail.body.map((line, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-sans)',
                  color: C.textMid,
                  fontSize: '0.75rem',
                  lineHeight: 1.9,
                  letterSpacing: '0.04em',
                  paddingLeft: '1em',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>・</span>
                  {line}
                </p>
              ))}
              {product.detail.price && (
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  color: C.gold,
                  fontSize: '0.73rem',
                  letterSpacing: '0.08em',
                  marginTop: '8px',
                  textAlign: 'right',
                }}>
                  （{product.detail.price}）
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ── Category section ──────────────────────────────────────────────────────────
function CategorySection({ category, onOpen }: { category: Category; onOpen: (p: Product) => void }) {
  return (
    <section style={{ padding: '64px 0 0' }}>
      {/* Category heading */}
      <FadeIn>
        <div className="max-w-5xl mx-auto px-6 md:px-10 mb-10">
          <div className="flex items-center gap-5">
            {/* Vertical accent */}
            <div style={{ width: '3px', height: '48px', background: `linear-gradient(to bottom,${C.crimson},rgba(165,0,0,0.1))` }} />
            <div>
              <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {category.en}
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: '#333333', fontSize: 'clamp(1.3rem,3vw,1.7rem)', letterSpacing: '0.2em', fontWeight: 400 }}>
                {category.ja}
              </h2>
            </div>
          </div>
          {/* Thin rule */}
          <div style={{ marginTop: '20px', height: '1px', background: `linear-gradient(to right,${C.borderG},transparent)` }} />
        </div>
      </FadeIn>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
          }}
        >
          {category.products.map((p) => (
            <ProductCard key={p.title} product={p} onOpen={onOpen} />
          ))}
        </div>
      </div>

      {/* Info section */}
      {category.info && (
        <FadeIn delay={0.5}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 mt-14">
            <div
              className="p-8 md:p-10"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              {/* Subtitle heading inside the box */}
              <div className="mb-5 pb-4" style={{ borderBottom: `1px solid ${C.borderG}` }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#2a2018',
                  fontSize: '0.95rem',
                  letterSpacing: '0.22em',
                  fontWeight: 500,
                }}>
                  {category.info.heading}
                </p>
              </div>

              {/* Body text */}
              <ul
                style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.88rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  listStyle: 'none', padding: 0, margin: 0,
                }}
              >
                {category.info.body.map((line, idx) => (
                  <li key={idx} style={{ paddingLeft: '1.2em', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: C.gold }}>・</span>
                    {line}
                  </li>
                ))}
              </ul>

              {/* Size / price table */}
              {category.info.table && (
                <div className="mt-8">
                  {category.info.table.note && (
                    <p style={{ fontFamily: 'var(--font-sans)', color: C.textMute, fontSize: '0.78rem', letterSpacing: '0.06em', marginBottom: '12px' }}>
                      {category.info.table.note}
                    </p>
                  )}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
                      <thead>
                        <tr style={{ background: 'rgba(162,122,40,0.1)' }}>
                          {category.info.table.headers.map((h, i) => (
                            <th
                              key={i}
                              style={{
                                padding: '10px 20px',
                                textAlign: 'center',
                                fontWeight: 500,
                                fontSize: '0.78rem',
                                letterSpacing: '0.12em',
                                color: C.textMid,
                                borderTop: `1px solid ${C.borderG}`,
                                borderBottom: `1px solid ${C.borderG}`,
                                borderRight: i < category.info!.table!.headers.length - 1 ? `1px solid ${C.borderG}` : 'none',
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {category.info.table.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            style={{ background: ri % 2 === 0 ? 'rgba(250,248,245,0.6)' : 'transparent' }}
                          >
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                style={{
                                  padding: '12px 20px',
                                  textAlign: 'center',
                                  fontSize: '0.85rem',
                                  letterSpacing: '0.08em',
                                  color: ci === 0 ? '#2a2018' : C.textMid,
                                  fontWeight: ci === 0 ? 500 : 400,
                                  borderBottom: `1px solid rgba(162,122,40,0.1)`,
                                  borderRight: ci < row.length - 1 ? `1px solid rgba(162,122,40,0.08)` : 'none',
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ConferPage() {
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<Product | null>(null);
  const openLightbox  = useCallback((p: Product) => setLightbox(p), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Close on Escape key
  React.useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox]);

  return (
    <div style={{ backgroundColor: C.ivory }}>
      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt="授与品について"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,3,3,0.42), rgba(10,3,3,0.72))' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10, paddingTop: '72px' }}>
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
              授与品について
            </span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <p style={{ fontFamily: 'var(--font-sans)', color: C.goldLt, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Amulets &amp; Sacred Items
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 300, letterSpacing: '0.28em' }}>
              授与品について
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div style={{ width: '36px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
              <div style={{ width: '4px', height: '4px', backgroundColor: '#a27a28', opacity: 0.65, transform: 'rotate(45deg)' }} />
              <div style={{ width: '36px', height: '1px', backgroundColor: 'rgba(162,122,40,0.45)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Intro ── */}
      <div style={{ backgroundColor: C.ivory }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center" style={{ paddingTop: '72px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '16px' }}>
              SACRED ITEMS
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#333333', fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', letterSpacing: '0.25em', fontWeight: 400, marginBottom: '24px' }}>
              八幡大神の御神威をいただく
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: C.textMid, fontSize: '0.85rem', lineHeight: 2.1, letterSpacing: '0.05em' }}>
              このお守り一覧表は、宇佐神宮オリジナルのお守りです。<br />
              それぞれ、八幡大神様又境内にお祀りしている神様の由緒やご神徳に因(ちな)むお守りです。<br />
            </p>
            {/* Small diamond rule */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
              <div style={{ width: '4px', height: '4px', backgroundColor: C.gold, opacity: 0.5, transform: 'rotate(45deg)' }} />
              <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(162,122,40,0.3)' }} />
            </div>
          </div>
        </FadeIn>

        {/* ── Categories ── */}
        {CATEGORIES.map((cat, idx) => (
          <React.Fragment key={cat.ja}>
            <CategorySection category={cat} onOpen={openLightbox} />
            {idx < CATEGORIES.length - 1 && <DiamondRule />}
          </React.Fragment>
        ))}

        {/* ── Notice ── */}
        <FadeIn>
          <div className="max-w-5xl mx-auto px-6 md:px-10" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
            <DiamondRule />
            <div
              className="mt-4 p-8 md:p-10 relative"
              style={{ background: C.stone, border: `1px solid ${C.border}` }}
            >
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: C.borderG }} />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: C.borderG }} />

              <p style={{ fontFamily: 'var(--font-sans)', color: C.gold, fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>
                NOTICE
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#333333', letterSpacing: '0.2em', fontWeight: 400, marginBottom: '16px' }}>
                授与品に関するお知らせ
              </h3>
              <ul
                style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.83rem', lineHeight: 2.1, letterSpacing: '0.04em',
                  listStyle: 'none', padding: 0,
                }}
              >
                <li style={{ paddingLeft: '1.2em', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>・</span>
                  授与品は授与所にて受け付けております。受付時間はお問い合わせください。
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '8px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>・</span>
                  在庫状況により一部の授与品をお受けできない場合がございます。
                </li>
                <li style={{ paddingLeft: '1.2em', position: 'relative', marginTop: '8px' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.gold }}>・</span>
                  郵送での頒布は行っておりません。直接お越しください。
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* ── Back links ── */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 pb-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/worship`}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.15em',
              color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            参拝についてへ戻る
          </Link>
          <Link
            href={`/${locale}`}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.72rem', letterSpacing: '0.12em',
              color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
              textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
            }}
          >
            ホームへ
          </Link>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          product={lightbox}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
