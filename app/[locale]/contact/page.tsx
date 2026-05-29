'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MapPin, Phone, Printer, Clock, Mail, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_IMG = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png'; // Torii scenery

const C = {
  crimson:  '#a50000',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
};

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations();

  const LOCALIZATION: Record<string, { subtitle: string; title: string; intro: string; cardsTitle: string; hoursLabel: string; hoursValue: string; note: string; phoneMsg: string; accessMsg: string; accessBtn: string }> = {
    ja: {
      subtitle: 'CONTACT',
      title: t('contact_text_1'),
      intro: t('contact_text_2'),
      cardsTitle: t('contact_text_3'),
      hoursLabel: t('contact_text_4'),
      hoursValue: t('contact_text_5'),
      note: t('contact_text_6'),
      phoneMsg: t('contact_text_7'),
      accessMsg: t('contact_text_8'),
      accessBtn: t('contact_text_9'),
    },
    en: {
      subtitle: 'CONTACT',
      title: 'Inquiries',
      intro: 'Please feel free to contact us for any questions regarding worship, prayer services, or traditional ceremonies at Usa Jingu.',
      cardsTitle: 'Contact Information',
      hoursLabel: 'Office Hours',
      hoursValue: '9:00 AM – 5:00 PM (Open daily)',
      note: '*Please note that response times may vary during major festivals.',
      phoneMsg: 'Call Us Directly',
      accessMsg: 'Check detailed transportation and parking information',
      accessBtn: 'View Access Guide',
    },
    'zh-TW': {
      subtitle: 'CONTACT',
      title: t('contact_text_10'),
      intro: t('contact_text_11'),
      cardsTitle: t('contact_text_12'),
      hoursLabel: t('contact_text_13'),
      hoursValue: t('contact_text_14'),
      note: t('contact_text_15'),
      phoneMsg: t('contact_text_16'),
      accessMsg: t('contact_text_17'),
      accessBtn: t('contact_text_18'),
    },
    'zh-CN': {
      subtitle: 'CONTACT',
      title: t('contact_text_19'),
      intro: t('contact_text_20'),
      cardsTitle: t('contact_text_21'),
      hoursLabel: t('contact_text_22'),
      hoursValue: t('contact_text_23'),
      note: t('contact_text_24'),
      phoneMsg: t('contact_text_25'),
      accessMsg: t('contact_text_26'),
      accessBtn: t('contact_text_27'),
    },
    ko: {
      subtitle: 'CONTACT',
      title: '문의하기',
      intro: '우사 신궁 참배, 기원제, 전통 예식 등에 관한 문의 사항이 있으시면 언제든지 편하게 연락 주시기 바랍니다.',
      cardsTitle: '연락처 안내',
      hoursLabel: '접수 시간',
      hoursValue: '오전 9시 ~ 오후 5시 (연중무휴)',
      note: '*제사 및 신직의 일정에 따라 대응에 다소 시간이 걸릴 수 있습니다.',
      phoneMsg: '전화 문의 바로가기',
      accessMsg: '상세한 교통 및 주차 안내 확인하기',
      accessBtn: '교통 안내 보기',
    },
  };

  const text = LOCALIZATION[locale] || LOCALIZATION.ja;

  const contactCards = [
    {
      icon: MapPin,
      title: t('historyTitle') || t('contact_text_28'),
      value: t('accessAddress'),
      desc: t('contact_text_29'),
    },
    {
      icon: Phone,
      title: t('contact_text_30'),
      value: t('accessPhone').replace('TEL: ', '') || '0978-37-0001',
      desc: text.phoneMsg,
      link: `tel:${t('accessPhone').replace(/[^0-9]/g, '')}`,
    },
    {
      icon: Printer,
      title: t('contact_text_31'),
      value: t('accessFax') || '0978-37-0408',
      desc: 'FAX: 0978-37-0408',
    },
    {
      icon: Clock,
      title: text.hoursLabel,
      value: text.hoursValue,
      desc: text.note,
    },
  ];

  return (
    <div className="bg-ivory min-h-screen font-sans">
      {/* ── Inner Page Header ── */}
      <section className="relative h-[280px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt={text.title}
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
            >{t("contactPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{text.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="font-sans text-gold-lt text-[0.58rem] tracking-[0.35em] uppercase mb-2.5">{text.subtitle}</p>
            <h1 className="font-serif font-title-main text-ivory font-light tracking-[0.25em]" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>{text.title}</h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-9 h-[1px] bg-gold/45" />
              <div className="w-1 h-1 bg-gold opacity-65 rotate-45" />
              <div className="w-9 h-[1px] bg-gold/45" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="w-9 h-[2px] bg-vermil opacity-70 mx-auto mb-8 select-none" />
            <p className="font-sans text-text-mid text-sm sm:text-base leading-relaxed max-w-2xl mx-auto select-text">
              {text.intro}
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6 select-text mb-16">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                className="p-6 bg-stone border border-crimson/10 shadow-sm rounded-sm hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-crimson/5 pb-2.5 select-none">
                    <span className="font-serif text-crimson text-sm font-semibold tracking-wider">
                      {card.title}
                    </span>
                    <card.icon size={16} className="text-gold" />
                  </div>
                  <p className="font-serif text-text-body text-base font-semibold tracking-wide mb-2 leading-relaxed">
                    {card.value}
                  </p>
                </div>
                {card.link ? (
                  <a
                    href={card.link}
                    className="font-sans text-crimson hover:text-vermil text-xs tracking-wider font-semibold block mt-4 select-none"
                  >
                    {card.desc} →
                  </a>
                ) : (
                  <p className="font-sans text-text-mute text-xs mt-4 select-none">
                    {card.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Access Banner CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="p-8 border border-gold/25 bg-gold/5 text-center rounded-sm shadow-sm select-none"
          >
            <p className="font-serif text-text-mute text-sm tracking-wide mb-5">
              {text.accessMsg}
            </p>
            <Link
              href={`/${locale}/worship/access`}
              className="px-8 py-2.5 bg-gold text-ivory font-sans text-xs tracking-widest hover:bg-gold-lt transition-colors shadow-sm inline-block"
            >
              {text.accessBtn}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
