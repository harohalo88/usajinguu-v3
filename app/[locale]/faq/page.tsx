'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
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
  const t = useTranslations();
  const locale = useLocale();

  // Fully translated FAQ content
  const getFaqItems = (): FaqEntry[] => {
    return [
      {
        id: 'reisai',
        q: t('faq_text_31'),
        plainAnswer: t('faq_text_32'),
        answer: <>{t('faq_text_33')}</>,
      },
      {
        id: 'honden',
        q: t('faq_text_34'),
        plainAnswer: t('faq_text_35'),
        answer: <>{t('faq_text_36')}</>,
      },
      {
        id: 'kusunoki',
        q: t('faq_text_37'),
        plainAnswer: t('faq_text_38'),
        answer: <>{t('faq_text_39')}</>,
      },
      {
        id: 'pet',
        q: t('faq_text_40'),
        plainAnswer: t('faq_text_41'),
        answer: (
          <>
            {t('faq_text_41')}
            <ul className="mt-4 space-y-1.5 pl-0 list-none">
              {[
                t('faq_text_42'),
                t('faq_text_43'),
                t('faq_text_44'),
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
        q: t('faq_text_45'),
        plainAnswer: t('faq_text_46'),
        answer: <>{t('faq_text_47')}</>,
        link: { label: t('faq_text_10'), to: '/worship/pray' },
      },
      {
        id: 'meotoishi',
        q: t('faq_text_48'),
        plainAnswer: t('faq_text_49'),
        answer: <>{t('faq_text_50')}</>,
      },
      {
        id: 'kuruma',
        q: t('faq_text_51'),
        plainAnswer: t('faq_text_52'),
        answer: <>{t('faq_text_53')}</>,
        link: { label: t('faq_text_10'), to: '/worship/monorail' },
      },
      {
        id: 'kashidashi',
        q: t('faq_text_54'),
        plainAnswer: t('faq_text_55'),
        answer: <>{t('faq_text_56')}</>,
      },
      {
        id: 'goshuuin',
        q: t('faq_text_57'),
        plainAnswer: t('faq_text_58'),
        answer: <>{t('faq_text_59')}</>,
      },
    ];
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
          alt={t('faq_text_1')}
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
              {t('faq_text_9')}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              {t('faq_text_1')}
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
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.3em] drop-shadow-md" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              {t('faq_text_1')}
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
            {t('faq_text_2')}
          </p>
          <p className="font-sans text-[0.88rem] leading-[2.2] tracking-wide text-text-mid select-text">
            {t('faq_text_3')}
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
              {t('faq_text_4')}
            </p>

            {/* Arrow + response */}
            <div className="flex items-start gap-3 mb-6 select-text">
              <span className="font-sans mt-[0.3em] shrink-0" style={{ color: GOLD, fontSize: '0.75rem' }}>→</span>
              <p className="font-sans text-[0.88rem] leading-[2.1] tracking-wide text-text-mid">
                {t('faq_text_5')}
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
              {t('faq_text_6')}
            </p>
            <p className="font-sans text-[0.86rem] leading-[2.2] tracking-wide mb-8 text-text-mid select-text">
              {t('faq_text_7')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 font-sans tracking-[0.3em] uppercase border px-8 py-3 transition-opacity hover:opacity-60 text-gold-lt"
              style={{ fontSize: '0.62rem', color: GOLD, borderColor: 'rgba(162,122,40,0.35)' }}
            >
              {t('faq_text_8')}
              <ChevronRight size={12} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
