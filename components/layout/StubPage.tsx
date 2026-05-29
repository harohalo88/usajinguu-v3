'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HEADER_IMG = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png'; // Torii scenery

interface StubPageProps {
  titleKey: string;
  enTitle: string;
  defaultTitle: string;
  parentPath?: string;
  parentLabel?: string;
}

const getLocalization = (t: any) => ({
  ja: {
    status: t('stubpage_text_1'),
    desc: t('stubpage_text_2'),
    home: t('stubpage_text_3'),
    contactMsg: t('stubpage_text_4'),
    contactLink: t('stubpage_text_5'),
  },
  en: {
    status: 'Under Preparation',
    desc: 'This page is currently being prepared.',
    home: 'Return to Home',
    contactMsg: 'Need help? Contact us here',
    contactLink: 'Go to Contact Page →',
  },
  'zh-TW': {
    status: t('stubpage_text_6'),
    desc: t('stubpage_text_7'),
    home: t('stubpage_text_8'),
    contactMsg: t('stubpage_text_9'),
    contactLink: t('stubpage_text_10'),
  },
  'zh-CN': {
    status: t('stubpage_text_11'),
    desc: t('stubpage_text_12'),
    home: t('stubpage_text_13'),
    contactMsg: t('stubpage_text_14'),
    contactLink: t('stubpage_text_15'),
  },
  ko: {
    status: '준비 중',
    desc: '이 페이지는 현재 준비 중입니다.',
    home: '홈으로 돌아가기',
    contactMsg: '궁금한 점이 있으시면 여기로 문의해 주세요',
    contactLink: '문의하기 페이지로 이동 →',
  },
});

export function StubPage({ titleKey, enTitle, defaultTitle, parentPath, parentLabel }: StubPageProps) {
  const locale = useLocale();
  const t = useTranslations();
  
  const locData = getLocalization(t);
  const text = (locData as Record<string, any>)[locale] || locData.ja;

  const getLocalizedLabel = (key: string, def: string) => {
    try {
      return t(key);
    } catch {
      return def;
    }
  };

  const pageTitle = getLocalizedLabel(titleKey, defaultTitle);

  return (
    <>
      {/* ── Inner Page Header ── */}
      <section className="relative h-[280px] overflow-hidden select-none">
        <img
          src={HEADER_IMG}
          alt={pageTitle}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/68" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-[72px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >
              {t('home')}
            </Link>
            {parentPath && parentLabel && (
              <>
                <ChevronRight size={11} className="text-ivory/30" />
                <Link
                  href={`/${locale}${parentPath}`}
                  className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
                >
                  {parentLabel}
                </Link>
              </>
            )}
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{pageTitle}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.58rem] tracking-[0.35em] uppercase mb-2.5">{enTitle}</p>
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.25em]" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>{pageTitle}</h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-9 h-[1px] bg-gold/45" />
              <div className="w-1 h-1 bg-gold opacity-65 rotate-45" />
              <div className="w-9 h-[1px] bg-gold/45" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="bg-ivory min-h-[50vh] py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-9 h-[2px] bg-vermil opacity-70 mx-auto mb-8" />

            <div className="p-12 border border-crimson/10 bg-stone rounded-sm shadow-sm relative overflow-hidden">
              {/* Kanji Watermark Backdrop */}
              <div className="font-serif text-crimson/[0.03] text-8xl leading-none mb-[-1.5rem] select-none pointer-events-none">{t("layoutStubpage_text_51509")}</div>
              <div className="relative z-10">
                <h2 className="font-serif text-crimson text-xl font-normal tracking-widest mb-4">{text.status}</h2>
                <p className="font-sans text-text-mute text-sm leading-relaxed mb-2 select-text">{text.desc}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 select-none">
              <Link
                href={`/${locale}`}
                className="px-6 py-2.5 bg-crimson text-ivory font-sans text-xs tracking-widest transition-opacity hover:opacity-90"
              >
                {text.home}
              </Link>
              {parentPath && parentLabel && (
                <Link
                  href={`/${locale}${parentPath}`}
                  className="px-6 py-2.5 bg-transparent text-crimson font-sans text-xs tracking-widest border border-crimson transition-all hover:bg-crimson/5"
                >
                  {parentLabel}
                </Link>
              )}
            </div>

            {/* Contact recommendation */}
            <div className="mt-12 pt-8 border-t border-crimson/10 select-none">
              <p className="font-sans text-text-mute text-xs tracking-wider mb-2.5">{text.contactMsg}</p>
              <Link
                href={`/${locale}/contact`}
                className="font-sans text-gold hover:text-gold-lt text-xs tracking-wide transition-colors"
              >
                {text.contactLink}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
