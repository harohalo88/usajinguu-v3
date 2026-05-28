'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { MapPin, Car, Train, Plane, Ship, ExternalLink, ChevronRight } from 'lucide-react';

const IMG_PARKING = '/images/34c2352fc050bde76c6eea5811ef525c150f64a8.png'; // Parking/grounds map
const IMG_TRAIN   = '/images/23265579a98431720d940f46eba8584cc9e52d3f.png'; // Train route map
const HERO_IMG    = '/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png'; // Torii scenery

const C = {
  crimson:  '#a50000',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
  border:   'rgba(165,0,0,0.1)',
  borderG:  'rgba(162,122,40,0.2)',
};

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[0.8rem] transition-opacity hover:opacity-70 border-b border-crimson/30 pb-0.5"
      style={{ color: C.crimson }}
    >
      {children}
      <ExternalLink size={11} />
    </a>
  );
}

function IntLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[0.8rem] transition-opacity hover:opacity-70 border-b border-crimson/30 pb-0.5"
      style={{ color: C.crimson }}
    >
      {children}
    </Link>
  );
}

function ContactBox({ lines }: { lines: string[] }) {
  return (
    <div className="my-2.5 p-3.5 border-l-2 border-l-gold bg-gold/5">
      {lines.map((l, i) => (
        <p key={i} className="font-sans text-text-mute text-xs italic leading-relaxed">{l}</p>
      ))}
    </div>
  );
}

function InfoTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full border-collapse mt-1.5">
      <tbody>
        {rows.map(([a, b], i) => (
          <tr key={i} className="border-b border-crimson/10">
            <td className="font-sans text-xs text-text-mid py-1.5 pr-2.5 w-[55%]">{a}</td>
            <td className="font-sans text-xs text-text-body py-1.5 font-semibold">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PriceTable({ value }: { value: string }) {
  return (
    <div className="inline-block mt-1.5 px-5 py-1.5 border border-gold/20 bg-gold/5 font-sans text-xs text-text-body font-semibold">
      {value}
    </div>
  );
}

function SectionHeader({ icon, ja, en }: { icon: React.ReactNode; ja: string; en: string }) {
  return (
    <div className="border-l-4 border-l-crimson pl-4 mb-7 select-none">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-crimson shrink-0">{icon}</span>
        <span className="font-sans text-gold text-[0.62rem] tracking-[0.3em] uppercase">{en}</span>
      </div>
      <h2 className="font-serif text-text-body text-lg md:text-xl font-normal tracking-wide">{ja}</h2>
    </div>
  );
}

function SubHeader({ ja }: { ja: string }) {
  return (
    <div className="flex items-center gap-2.5 my-6 select-none">
      <div className="w-1.5 h-1.5 bg-crimson rotate-45 shrink-0" />
      <h3 className="font-serif text-crimson text-sm font-semibold tracking-widest">{ja}</h3>
    </div>
  );
}

function ParkingCard({ num, name, address, contact, capacityRows, feeRows, feeNote, links, note, image, hideCapacityFee }: {
  num: string;
  name: string;
  address: string;
  contact?: string[];
  capacityRows?: [string, string][];
  feeRows?: [string, string][];
  feeNote?: string;
  links?: React.ReactNode;
  note?: React.ReactNode;
  image?: string;
  hideCapacityFee?: boolean;
}) {
  return (
    <div className="p-5 sm:p-6 bg-ivory border border-crimson/10 shadow-sm rounded-sm mb-4">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2.5 mb-1.5 select-none">
            <span className="font-serif text-ivory bg-crimson text-[0.7rem] px-1.5 py-0.5 tracking-wider shrink-0">{num}</span>
            <h4 className="font-serif text-text-body text-sm sm:text-base font-semibold tracking-wide">{name}</h4>
          </div>
          <p className="font-sans text-text-mute text-xs mb-2.5 select-text">{address}</p>
          {links && <div className="mb-2.5">{links}</div>}

          {!hideCapacityFee && capacityRows && (
            <div className="mb-3 select-text">
              <p className="font-sans text-gold text-[0.68rem] tracking-widest mb-1 select-none">【駐車可能台数】</p>
              <InfoTable rows={capacityRows} />
            </div>
          )}

          {!hideCapacityFee && (feeRows || feeNote) && (
            <div className="select-text">
              <p className="font-sans text-gold text-[0.68rem] tracking-widest mb-1 select-none">【駐車料金】</p>
              {feeRows ? <InfoTable rows={feeRows} /> : feeNote && <PriceTable value={feeNote} />}
            </div>
          )}

          {contact && (
            <div className="mt-3 select-none">
              <ContactBox lines={contact} />
            </div>
          )}
          {note && <div className="mt-2.5 select-text">{note}</div>}
        </div>

        {/* Right column */}
        {image && (
          <div className="shrink-0 w-full md:w-[220px] select-none mx-auto md:mx-0">
            <img
              src={image}
              alt={`${name} 案内図`}
              className="w-full border border-crimson/10 rounded-sm shadow-sm block"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function DiamondRule() {
  return (
    <div className="flex items-center gap-2.5 my-10 select-none">
      <div className="flex-1 h-[1px] bg-gold/20" />
      <div className="w-1.5 h-1.5 bg-gold opacity-50 rotate-45" />
      <div className="flex-1 h-[1px] bg-gold/20" />
    </div>
  );
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="pl-0 my-0 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 mb-3">
          <span className="text-crimson mt-0.5 shrink-0 select-none">▸</span>
          <div className="font-sans text-text-mid text-xs leading-relaxed select-text">{item}</div>
        </li>
      ))}
    </ul>
  );
}

export default function AccessPage() {
  const locale = useLocale();
  const t = useTranslations();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.usajingu.or.jp/${locale}/worship/access/#localbusiness`,
    'name': locale === 'ja' ? '宇佐神宮' : 'Usa Jingu',
    'image': 'https://www.usajingu.or.jp/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png',
    'telephone': '+81-978-37-0001',
    'faxNumber': '+81-978-37-0408',
    'url': `https://www.usajingu.or.jp/${locale}/worship/access`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '2859 Minamiusa',
      'addressLocality': locale === 'ja' ? '宇佐市' : 'Usa City',
      'addressRegion': locale === 'ja' ? '大分県' : 'Oita Prefecture',
      'postalCode': '872-0102',
      'addressCountry': 'JP'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 33.525556,
      'longitude': 131.378889
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '05:30',
      'closes': '21:00'
    }
  };

  return (
    <div className="w-full min-h-screen bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative h-[340px] overflow-hidden select-none">
        <img
          src={HERO_IMG}
          alt="宇佐神宮 参道"
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
              ホーム
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              参拝について
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              交通アクセス
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold text-[0.6rem] tracking-[0.35em] uppercase mb-2.5">
              Access &amp; Transportation
            </p>
            <h1 className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-[0.3em] drop-shadow-md">
              交通アクセス
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-gold/50" />
              <div className="w-1.5 h-1.5 bg-gold opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[860px] mx-auto px-6 py-16">
        {/* 1. Location */}
        <FadeSection>
          <SectionHeader icon={<MapPin size={18} />} ja="宇佐神宮の所在地" en="Location" />

          {/* Standard Free Embedded Google Map Share Iframe */}
          <div className="w-full mb-6 border border-crimson/10 overflow-hidden shadow-sm leading-none rounded-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.1490343308215!2d131.3771591!3d33.5235106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35440f58993cfb81%3A0xfe61c48b8956bcbe!2sUsa%20Shrine!5e0!3m2!1sen!2sjp!4v1777001006227!5m2!1sen!2sjp"
              width="100%"
              height="420"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="宇佐神宮 Googleマップ"
            />
          </div>

          {/* Address Details Card */}
          <div className="bg-stone border border-crimson/10 p-6 shadow-sm rounded-sm select-text flex flex-wrap gap-5 items-start">
            <div>
              <p className="font-serif text-text-body text-base font-semibold tracking-wide mb-1.5">{t('openingTitle')}</p>
              <p className="font-sans text-text-mid text-sm leading-relaxed">
                {t('accessAddress')}
                <span className="mx-2 text-gold/30">|</span>
                <IntLink href={`/${locale}/worship/guide`}>境内図はこちら &gt;&gt;</IntLink>
              </p>
              <p className="font-sans text-text-mid text-sm leading-relaxed mt-1">
                TEL：0978-37-0001　／　FAX：0978-37-2748
              </p>
            </div>
          </div>
        </FadeSection>

        <DiamondRule />

        {/* 2. By Car */}
        <div id="by-car" className="scroll-mt-20">
          <FadeSection delay={0.05}>
            <SectionHeader icon={<Car size={18} />} ja="お車でお越しの方へ" en="By Car" />

            <BulletList
              items={[
                <>
                  <strong className="text-text-body font-semibold">東九州自動車道</strong>
                  <br />「宇佐ＩＣ」から国道10号線（別府方面）へ約6キロ（約15分）
                  <br />
                  <span className="inline-flex items-center gap-1 mt-1">
                    <ExtLink href="https://goo.gl/maps/SK9ZY1UsKzu">宇佐ICから宇佐神宮へ</ExtLink>
                  </span>
                  <br />
                  <span className="text-text-mute text-xs block mt-1.5">
                    ※カーナビの機種により、「宇佐神宮」と検索致しますと、御本殿へ案内をする場合があります。
                    <br />御本殿周辺には駐車場はございませんので、ご注意ください。
                  </span>
                </>
              ]}
            />

            {/* Parking Lots */}
            <SubHeader ja="駐車場のご案内" />

            <ParkingCard
              num="①"
              name="タイムズ宇佐神宮表参道駐車場"
              address="大分県宇佐市南宇佐"
              capacityRows={[['普通車', '180台']]}
              feeNote="500円"
              image={IMG_PARKING}
              links={
                <div className="flex flex-wrap gap-3 font-sans text-text-mid text-xs">
                  <span>
                    当駐車場は、カメラ式駐車場です。{' '}
                    <ExtLink href="https://times-info.net/info/utilization.html#authentication">詳細はこちら</ExtLink>
                  </span>
                  <span>
                    <ExtLink href="https://times-info.net/P44-oita/C211/park-detail-BUK0078723/">駐車場の空き状況はこちらから</ExtLink>
                  </span>
                </div>
              }
              contact={['タイムズコンタクトセンター', 'TEL：0120-72-8924']}
            />

            <ParkingCard
              num="②"
              name="外苑駐車場"
              address="大分県宇佐市南宇佐"
              capacityRows={[['普通車', '150台']]}
              feeRows={[['12時間', '500円']]}
              contact={['【お問い合せ】', '宇佐神宮 / TEL：0978-37-0001']}
              links={
                <IntLink href={`/${locale}/worship/gaien-parking`}>詳しくはこちらから</IntLink>
              }
              note={
                <p className="font-sans text-text-mute text-xs leading-relaxed">
                  ※正月期間中は、駐車料金が変更となります。
                  <br /><br />
                  【野球場利用者の皆様へ】<br />
                  野球場を使用される場合は、宇佐市より無料駐車券が発行されますので、下記までお問い合わせ下さい。<br />
                  宇佐市役所　文化･スポーツ振興課　TEL：0978-27-8175
                </p>
              }
            />

            <p className="font-sans text-text-mute text-xs tracking-wider my-3 pl-1">
              周辺駐車場
            </p>

            <ParkingCard
              num="③"
              name="八幡駐車場"
              address="大分県宇佐市南宇佐2181-1"
              capacityRows={[
                ['大型車・中型車・マイクロバス', '20台'],
                ['普通車・二輪車', '400台'],
              ]}
              feeRows={[
                ['大型・中型車', '2,000円'],
                ['マイクロバス', '1,300円'],
                ['普通車', '500円'],
                ['二輪車', '200円'],
              ]}
              contact={['【お問い合せ】', '(株)宇佐八幡駐車場 / TEL：0978-37-0247']}
            />

            <ParkingCard
              num="④"
              name="参拝者専用駐車場"
              address="大分県宇佐市南宇佐"
              hideCapacityFee
              contact={['【お問い合せ】', '宇佐神宮 / TEL：0978-37-0001']}
              links={
                <IntLink href={`/${locale}/news`}>詳しくはこちらから</IntLink>
              }
            />
          </FadeSection>
        </div>

        <DiamondRule />

        {/* 3. From Usa Station */}
        <FadeSection delay={0.05}>
          <SectionHeader icon={<Train size={18} />} ja="宇佐駅よりお越しの方へ" en="From Usa Station" />

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p className="font-sans text-text-mid text-sm leading-relaxed mb-4 select-text">
                宇佐駅からは、バス・タクシーをご利用ください。<br />（中津方面へ約4キロ）（約10分）
              </p>

              <BulletList
                items={[
                  <>
                    <strong className="text-text-body font-semibold">バスをご利用の場合</strong>
                    <br />「四日市方面バス」に乗車、「宇佐八幡バス停」下車
                    <br />
                    <span className="inline-flex items-center gap-1 mt-1">
                      <ExtLink href="http://www.oitakotsu.co.jp/">バスの情報はこちら</ExtLink>
                    </span>
                    <br />
                    <ContactBox lines={['【お問い合せ】', '大分北部バス(株) / TEL：0979-22-0071']} />
                  </>
                ]}
              />
            </div>

            <div className="shrink-0 w-full md:w-[280px] mx-auto md:mx-0 select-none">
              <img
                src={IMG_TRAIN}
                alt="宇佐駅周辺路線図"
                className="w-full border border-crimson/10 rounded-sm shadow-sm block"
              />
            </div>
          </div>

          <div className="bg-stone border border-crimson/10 p-5 mt-5 shadow-sm rounded-sm select-text">
            <p className="font-sans text-text-mid text-sm leading-relaxed">
              JR日豊本線「宇佐駅」下車
            </p>
            <div className="flex flex-wrap gap-4 mt-2 select-none text-text-mid text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gold opacity-60 rotate-45" />
                <span>小倉駅から（特急 / 約１時間）</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gold opacity-60 rotate-45" />
                <span>大分駅から（特急 / 約４０分）</span>
              </div>
            </div>
          </div>
        </FadeSection>

        <DiamondRule />

        {/* 4. From Oita Airport */}
        <FadeSection delay={0.05}>
          <SectionHeader icon={<Plane size={18} />} ja="大分空港よりお越しの方へ" en="From Oita Airport" />

          <p className="font-sans text-text-mid text-sm leading-relaxed mb-4">
            大分空港からは、バス・タクシーをご利用ください。<br />
            <ExtLink href="https://goo.gl/maps/6zHV76Hx8N72">大分空港から宇佐神宮へ</ExtLink>
          </p>

          <BulletList
            items={[
              <>
                <strong className="text-text-body font-semibold">タクシーをご利用の場合</strong>
                <br />１時間程度で到着します。
              </>,
              <>
                <strong className="text-text-body font-semibold">バスをご利用の場合</strong>
                <br />「中津・宇佐・豊後高田方面　大分空港リムジンバス」に乗車、「宇佐八幡バス停」下車。（1,550円）
                <br />
                <span className="inline-flex items-center gap-1 mt-1">
                  <ExtLink href="http://www.oitakotsu.co.jp/">バスの情報はこちら</ExtLink>
                </span>
                <br />
                <ContactBox lines={['【お問い合せ】', '大分空港バス案内所 / TEL：0978-67-1198']} />
              </>
            ]}
          />
        </FadeSection>

        <DiamondRule />

        {/* 5. From Ports */}
        <FadeSection delay={0.05}>
          <SectionHeader icon={<Ship size={18} />} ja="大分港・別府港よりお越しの方へ" en="From Oita / Beppu Port" />

          <p className="font-sans text-text-mid text-sm leading-relaxed mb-4">
            大分港・別府港からは、自家用車・タクシー・JRをご利用ください。<br />
            <span className="inline-flex flex-wrap gap-4 mt-1 select-none">
              <ExtLink href="https://goo.gl/maps/7L93y54ppNR2">大分港から宇佐神宮へ</ExtLink>
              <ExtLink href="https://goo.gl/maps/B2rEvCo7DXE2">別府港から宇佐神宮へ</ExtLink>
            </span>
          </p>

          <BulletList
            items={[
              <>
                <strong className="text-text-body font-semibold">お車をご使用の場合（カーフェリー）</strong>
                <br />
                <span className="block mt-1 select-text">・【神戸便】大分港から、大分ICへ（東九州自動車道 宇佐IC下車）（約50分）</span>
                <span className="block select-text">・【大阪便】別府港から、別府ICへ（東九州自動車道 宇佐IC下車）（約35分）</span>
                <span className="block select-text">国道10号線 ＜宇佐・中津方面＞ へ（約1時間～1時間半）</span>
              </>,
              <>
                <strong className="text-text-body font-semibold">JR特急をご利用の場合</strong>
                <br />
                <span className="block mt-1 select-text">・大分港から大分駅へ（タクシー / 約10分）</span>
                <span className="block pl-3 select-text">→ 大分駅から宇佐駅へ（JR特急 / 約40分）</span>
                <span className="block select-text">・別府港から別府駅へ（タクシー / 約10分）</span>
                <span className="block pl-3 select-text">→ 別府駅から宇佐駅へ（JR特急 / 約30分）</span>
              </>,
              <>
                <strong className="text-text-body font-semibold">JR普通列車をご利用の場合</strong>
                <br />
                <span className="block mt-1 select-text">・大分港から西大分駅へ（タクシー / 約3分）</span>
                <span className="block pl-3 select-text">→ 西大分駅から宇佐駅へ（JR普通列車 / 約1時間）</span>
                <span className="block select-text">・別府港から別府大学駅へ（タクシー / 約10分）</span>
                <span className="block pl-3 select-text">→ 別府大学駅から宇佐駅へ（JR普通列車 / 約45分）</span>
              </>
            ]}
          />
        </FadeSection>

        {/* Bottom CTA */}
        <FadeSection delay={0.1}>
          <div className="mt-16 p-8 bg-stone border border-crimson/10 text-center rounded-sm shadow-sm select-none">
            <p className="font-serif text-text-mute text-sm tracking-wide mb-5">
              ご不明な点はお気軽にお問い合わせください
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-2.5 bg-crimson text-ivory font-sans text-xs tracking-widest hover:opacity-90 transition-opacity rounded-sm shadow-sm"
              >
                お問い合せ
              </Link>
              <Link
                href={`/${locale}/worship/guide`}
                className="px-8 py-2.5 bg-transparent text-crimson font-sans text-xs tracking-widest border border-crimson hover:bg-crimson/5 transition-colors rounded-sm"
              >
                境内のご案内
              </Link>
            </div>
          </div>
        </FadeSection>
      </div>
    </div>
  );
}
