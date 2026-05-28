'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

const LOGO_IMG = '/images/07ddf8f36fce46ea9f721642d4b1fb369ab2bb5e.png';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const getLocalizedLabel = (key: string, defaultLabel: string) => {
    try {
      return t(key);
    } catch {
      return defaultLabel;
    }
  };

  const COLS = [
    {
      title: getLocalizedLabel('footerLinks1Title', '宇佐神宮について'),
      links: [
        { label: getLocalizedLabel('historyTitle', '由緒'), path: '/about/history' },
        { label: getLocalizedLabel('deitiesTitle', 'ご祭神'), path: '/about/deities' },
        { label: getLocalizedLabel('legendsTitle', '八幡大神ゆかりの伝承'), path: '/about/legends/goreisui' },
        { label: getLocalizedLabel('timelineTitle', '歴史略年表'), path: '/about/timeline' },
        { label: getLocalizedLabel('museumTitle', '宝物館のご案内'), path: '/about/museum' },
      ],
    },
    {
      title: getLocalizedLabel('footerLinks2Title', '参拝について'),
      links: [
        { label: getLocalizedLabel('etiquetteTitle', '参拝の作法'), path: '/worship/etiquette' },
        { label: getLocalizedLabel('groundsTitle', '境内のご案内'), path: '/worship/guide' },
        { label: getLocalizedLabel('accessTitle', '交通アクセス'), path: '/worship/access' },
        { label: getLocalizedLabel('monorailTitle', 'モノレールのご案内'), path: '/worship/monorail' },
        { label: getLocalizedLabel('prayerTitle', '祈願祭'), path: '/worship/pray' },
        { label: getLocalizedLabel('yaku', '厄除開運について'), path: '/worship/fortune' },
      ],
    },
    {
      title: getLocalizedLabel('footerLinks3Title', 'その他'),
      links: [
        { label: getLocalizedLabel('navNews', '新着情報'), path: '/news' },
        { label: getLocalizedLabel('weddingTitle', '神前結婚式'), path: '/wedding' },
        { label: getLocalizedLabel('navContact', 'お問い合せ'), path: '/contact' },
        { label: getLocalizedLabel('faqTitle', 'よくある質問'), path: '/faq' },
        { label: getLocalizedLabel('footerDonation', '奉賛お申込み'), path: '/donation' },
        { label: getLocalizedLabel('footerHachiman', '八幡講崇敬会'), path: '/society' },
        { label: getLocalizedLabel('サイトマップ', 'サイトマップ'), path: '/sitemap' },
      ],
    },
  ];

  return (
    <footer className="bg-[#100404] select-none text-ivory">
      {/* ── Main Footer ── */}
      <div className="py-20 border-b border-vermil/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="mb-6 inline-block px-4 py-3 bg-white/5 rounded-sm select-none">
                <img
                  src={LOGO_IMG}
                  alt="宇佐神宮"
                  className="h-11 w-auto object-contain block"
                />
              </div>
              <div className="h-[1px] bg-vermil/12 mb-5" />
              <div className="space-y-3 mb-6 select-text text-ivory/50">
                <div className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-gold mt-1 shrink-0" />
                  <p className="font-sans text-xs leading-relaxed">
                    {getLocalizedLabel('footerAddress', '大分県宇佐市南宇佐2859')}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-gold shrink-0" />
                  <p className="font-sans text-xs">
                    {getLocalizedLabel('footerPhone', 'TEL: 0978-37-0001')}
                  </p>
                </div>
              </div>
              {/* Festivals Quick Links */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: getLocalizedLabel('majorFestivalsTitle', '主な祭典'), path: '/festivals/festival-list' },
                  { label: getLocalizedLabel('navFestivals', 'お祭りについて'), path: '/festivals/festival-list' },
                ].map((l, i) => (
                  <Link
                    key={i}
                    href={`/${locale}${l.path}`}
                    className="font-sans text-ivory/35 text-[0.62rem] tracking-wider border border-vermil/12 px-2 py-0.5 transition-colors hover:text-ivory/70 rounded-sm"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {COLS.map((col, ci) => (
              <div key={ci}>
                <h4 className="font-serif text-gold text-xs tracking-widest mb-3.5 font-normal select-none">
                  {col.title}
                </h4>
                <div className="h-[1px] bg-gold/15 mb-3.5" />
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}${link.path}`}
                        className="flex items-center gap-2 font-sans text-ivory/45 text-xs tracking-wide transition-colors hover:text-ivory/80 leading-relaxed"
                      >
                        <span className="text-vermil text-[0.5rem] opacity-60">▸</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick External Links row ── */}
      <div className="py-5 border-b border-vermil/5 bg-[#0a0202]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap gap-3">
          {[
            { label: getLocalizedLabel('footerOmotesando', '表参道商店街'), path: '/omotesando' },
            { label: getLocalizedLabel('footerDonation', '奉賛お申込み'), path: '/donation' },
            { label: getLocalizedLabel('footerHachiman', '八幡講崇敬会'), path: '/society' },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/${locale}${item.path}`}
              className="flex items-center gap-2 px-4 py-2 font-sans text-ivory/50 text-[0.7rem] tracking-wider border border-vermil/12 transition-all hover:bg-vermil/10 hover:text-ivory/85 rounded-sm"
            >
              {item.label}
              <ExternalLink size={10} className="opacity-40" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Bottom Copyright section ── */}
      <div className="py-5">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-ivory/20 text-[0.65rem] select-none">
          <p className="font-sans tracking-wide">
            {getLocalizedLabel('footerCopyright', '© 宇佐神宮 All Rights Reserved.')}
          </p>
          <div className="flex gap-5">
            {[
              { label: getLocalizedLabel('footerDisclaimer', '免責事項'), path: '/disclaimer' },
              { label: getLocalizedLabel('footerPrivacy', 'プライバシーポリシー'), path: '/faq' },
            ].map((link, i) => (
              <Link
                key={i}
                href={`/${locale}${link.path}`}
                className="font-sans tracking-wide hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
