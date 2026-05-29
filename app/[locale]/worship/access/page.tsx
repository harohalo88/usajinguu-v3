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
      className="inline-flex items-center gap-1 text-sm transition-opacity hover:opacity-70 border-b border-crimson/30 pb-0.5"
      style={{ color: C.crimson }}
    >
      {children}
      <ExternalLink size={12} />
    </a>
  );
}

function IntLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm transition-opacity hover:opacity-70 border-b border-crimson/30 pb-0.5"
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
        <p key={i} className="font-sans text-text-mute text-sm italic leading-relaxed">{l}</p>
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
            <td className="font-sans text-sm text-text-mid py-1.5 pr-2.5 w-[55%]">{a}</td>
            <td className="font-sans text-sm text-text-body py-1.5 font-semibold">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PriceTable({ value }: { value: string }) {
  return (
    <div className="inline-block mt-1.5 px-5 py-1.5 border border-gold/20 bg-gold/5 font-sans text-sm text-text-body font-semibold">
      {value}
    </div>
  );
}

function SectionHeader({ icon, ja, en }: { icon: React.ReactNode; ja: string; en: string }) {
  const locale = useLocale();
  return (
    <div className="border-l-4 border-l-crimson pl-4 mb-7 select-none">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-crimson shrink-0">{icon}</span>
        <span className="font-sans text-gold text-xs tracking-[0.3em] uppercase">
          {locale === 'ja' ? en : ja}
        </span>
      </div>
      <h2 className="font-serif text-text-body text-lg md:text-xl font-normal tracking-wide">
        {locale === 'ja' ? ja : en}
      </h2>
    </div>
  );
}

function SubHeader({ ja, en }: { ja: string; en: string }) {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-2.5 my-6 select-none">
      <div className="w-1.5 h-1.5 bg-crimson rotate-45 shrink-0" />
      <h3 className="font-serif text-crimson text-sm font-semibold tracking-widest">
        {locale === 'ja' ? ja : en}
      </h3>
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
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="p-5 sm:p-6 bg-ivory border border-crimson/10 shadow-sm rounded-sm mb-4">
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2.5 mb-1.5 select-none">
            <span className="font-serif text-ivory bg-crimson text-xs px-1.5 py-0.5 tracking-wider shrink-0">{num}</span>
            <h4 className="font-serif text-text-body text-sm sm:text-base font-semibold tracking-wide">{name}</h4>
          </div>
          <p className="font-sans text-text-mute text-sm mb-2.5 select-text">{address}</p>
          {links && <div className="mb-2.5">{links}</div>}

          {!hideCapacityFee && capacityRows && (
            <div className="mb-3 select-text">
              <p className="font-sans text-gold text-xs font-semibold tracking-widest mb-1 select-none">
                {locale === 'ja' ? t('worshipAccessPage_text_85921') : '【Capacity】'}
              </p>
              <InfoTable rows={capacityRows} />
            </div>
          )}

          {!hideCapacityFee && (feeRows || feeNote) && (
            <div className="select-text">
              <p className="font-sans text-gold text-xs font-semibold tracking-widest mb-1 select-none">
                {locale === 'ja' ? t('worshipAccessPage_text_29701') : '【Parking Fee】'}
              </p>
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
              alt={locale === 'ja' ? t('worshipAccessPage_name') : `${name} Guide Map`}
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
          <div className="font-sans text-text-mid text-sm leading-relaxed select-text">{item}</div>
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
    'name': locale === 'ja' ? t('worshipAccessPage_text_89939') : 'Usa Jingu',
    'image': 'https://www.usajingu.or.jp/images/bf9f7b6f02cc9e1443c20d6967d1430724f52ec6.png',
    'telephone': '+81-978-37-0001',
    'faxNumber': '+81-978-37-0408',
    'url': `https://www.usajingu.or.jp/${locale}/worship/access`,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '2859 Minamiusa',
      'addressLocality': locale === 'ja' ? t('worshipAccessPage_text_27987') : 'Usa City',
      'addressRegion': locale === 'ja' ? t('worshipAccessPage_text_73463') : 'Oita Prefecture',
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
          alt={locale === 'ja' ? t("worshipAccessPage_text_12617") : "Usa Jingu Approach"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/48 to-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-[64px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-xs tracking-widest hover:text-ivory transition-colors"
            >
              {locale === 'ja' ? t('worshipAccessPage_text_34653') : 'Home'}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-xs tracking-widest">
              {locale === 'ja' ? t('worshipAccessPage_text_50054') : 'Worship'}
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-xs tracking-widest">
              {locale === 'ja' ? t('worshipAccessPage_text_16377') : 'Access'}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p className="font-sans text-gold text-xs tracking-[0.35em] uppercase mb-2.5">
              Access &amp; Transportation
            </p>
            <h1 className="font-serif text-ivory text-3xl md:text-5xl font-light tracking-[0.3em] drop-shadow-md">
              {locale === 'ja' ? t('worshipAccessPage_text_16377') : 'Access'}
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
          <SectionHeader icon={<MapPin size={18} />} ja={t("worshipAccessPage_text_67969")} en="Location" />

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
              title={locale === 'ja' ? t("worshipAccessPage_google") : "Usa Jingu Google Map"}
            />
          </div>

          {/* Address Details Card */}
          <div className="bg-stone border border-crimson/10 p-6 shadow-sm rounded-sm select-text flex flex-wrap gap-5 items-start">
            <div>
              <p className="font-serif text-text-body text-base font-semibold tracking-wide mb-1.5">{t('openingTitle')}</p>
              <p className="font-sans text-text-mid text-sm leading-relaxed">
                {t('accessAddress')}
                <span className="mx-2 text-gold/30">|</span>
                <IntLink href={`/${locale}/worship/guide`}>
                  {locale === 'ja' ? t('worshipAccessPage_text_74131') : 'View Shrine Grounds Map >>'}
                </IntLink>
              </p>
              <p className="font-sans text-text-mid text-sm leading-relaxed mt-1">
                {locale === 'ja' ? 'TEL：0978-37-0001　／　FAX：0978-37-0408' : 'TEL: +81-978-37-0001 / FAX: +81-978-37-0408'}
              </p>
            </div>
          </div>
        </FadeSection>

        <DiamondRule />

        {/* 2. By Car */}
        <div id="by-car" className="scroll-mt-20">
          <FadeSection delay={0.05}>
            <SectionHeader icon={<Car size={18} />} ja={t("worshipAccessPage_text_11566")} en="By Car" />

            <BulletList
              items={[
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_text_61389') : 'Higashi-Kyushu Expressway'}
                  </strong>
                  <br />
                  {locale === 'ja'
                    ? t('worshipAccessPage_10615')
                    : 'Take Route 10 (toward Beppu) from "Usa IC" for about 6 km (approx. 15 mins)'}
                  <br />
                  <span className="inline-flex items-center gap-1 mt-1">
                    <ExtLink href="https://goo.gl/maps/SK9ZY1UsKzu">
                      {locale === 'ja' ? t('worshipAccessPage_ic') : 'Directions from Usa IC to Usa Jingu'}
                    </ExtLink>
                  </span>
                  <br />
                  <span className="text-text-mute text-sm block mt-1.5">
                    {locale === 'ja'
                      ? t('worshipAccessPage_text_63472')
                      : '*Depending on your car navigation model, searching for "Usa Jingu" may direct you toward the Main Hall (Honden) area. Please note that there is no parking around the Main Hall.'}
                  </span>
                </>
              ]}
            />

            {/* Parking Lots */}
            <SubHeader ja={t("worshipAccessPage_text_31519")} en="Parking Guide" />

            <ParkingCard
              num="①"
              name={locale === 'ja' ? t('worshipAccessPage_text_44967') : 'Times Usa Jingu Omotesando Parking'}
              address={locale === 'ja' ? t('worshipAccessPage_text_71131') : 'Minamiusa, Usa City, Oita'}
              capacityRows={locale === 'ja' ? [[t('worshipAccessPage_text_23072'), t('worshipAccessPage_180')]] : [['Standard Cars', '180 spaces']]}
              feeNote={locale === 'ja' ? t('worshipAccessPage_500') : '¥500'}
              image={IMG_PARKING}
              links={
                <div className="flex flex-wrap gap-3 font-sans text-text-mid text-sm">
                  <span>
                    {locale === 'ja'
                      ? t('worshipAccessPage_text_18310')
                      : 'This parking lot uses a camera registration system. '}
                    <ExtLink href="https://times-info.net/info/utilization.html#authentication">
                      {locale === 'ja' ? t('worshipAccessPage_text_70989') : 'Click here for details'}
                    </ExtLink>
                  </span>
                  <span>
                    <ExtLink href="https://times-info.net/P44-oita/C211/park-detail-BUK0078723/">
                      {locale === 'ja' ? t('worshipAccessPage_text_59101') : 'Check real-time parking availability here'}
                    </ExtLink>
                  </span>
                </div>
              }
              contact={locale === 'ja' ? [t('worshipAccessPage_text_60611'), 'TEL：0120-72-8924'] : ['Times Contact Center', 'TEL: 0120-72-8924']}
            />

            <ParkingCard
              num="②"
              name={locale === 'ja' ? t('worshipAccessPage_text_36910') : 'Gaien Parking Lot'}
              address={locale === 'ja' ? t('worshipAccessPage_text_71131') : 'Minamiusa, Usa City, Oita'}
              capacityRows={locale === 'ja' ? [[t('worshipAccessPage_text_23072'), t('worshipAccessPage_150')]] : [['Standard Cars', '150 spaces']]}
              feeRows={locale === 'ja' ? [[t('worshipAccessPage_12'), t('worshipAccessPage_500')]] : [['12 Hours', '¥500']]}
              contact={locale === 'ja' ? [t('worshipAccessPage_text_21208'), t('worshipAccessPage_tel0978370001')] : ['【Inquiries】', 'Usa Jingu / TEL: 0978-37-0001']}
              links={
                <IntLink href={`/${locale}/worship/gaien-parking`}>
                  {locale === 'ja' ? t('worshipAccessPage_text_73462') : 'Click here for details'}
                </IntLink>
              }
              note={
                <p className="font-sans text-text-mute text-sm leading-relaxed">
                  {locale === 'ja' ? (
                    <>
                      ※正月期間中は、駐車料金が変更となります。
                      <br /><br />
                      【野球場利用者の皆様へ】<br />
                      野球場を使用される場合は、宇佐市より無料駐車券が発行されますので、下記までお問い合わせ下さい。<br />
                      宇佐市役所　文化･スポーツ振興課　TEL：0978-27-8175
                    </>
                  ) : (
                    <>
                      *Parking fees are subject to change during the New Year period.
                      <br /><br />
                      【For Baseball Field Users】<br />
                      If you are using the baseball field, a free parking ticket will be issued by Usa City. Please contact below:<br />
                      Usa City Hall, Culture & Sports Promotion Division / TEL: 0978-27-8175
                    </>
                  )}
                </p>
              }
            />

            <p className="font-sans text-text-mid text-xs font-semibold tracking-widest my-4 pl-1">
              {locale === 'ja' ? t('worshipAccessPage_text_64630') : 'Nearby Parking Lots'}
            </p>

            <ParkingCard
              num="③"
              name={locale === 'ja' ? t('worshipAccessPage_text_65165') : 'Hachiman Parking Lot'}
              address={locale === 'ja' ? t('worshipAccessPage_21811') : '2181-1 Minamiusa, Usa City, Oita'}
              capacityRows={locale === 'ja' ? [
                [t('worshipAccessPage_text_17157'), t('worshipAccessPage_20')],
                [t('worshipAccessPage_text_39956'), t('worshipAccessPage_400')],
              ] : [
                ['Large/Medium Buses, Microbuses', '20 spaces'],
                ['Standard Cars, Motorcycles', '400 spaces'],
              ]}
              feeRows={locale === 'ja' ? [
                [t('worshipAccessPage_text_62837'), t('worshipAccessPage_2000')],
                [t('worshipAccessPage_text_84506'), t('worshipAccessPage_1300')],
                [t('worshipAccessPage_text_23072'), t('worshipAccessPage_500')],
                [t('worshipAccessPage_text_42227'), t('worshipAccessPage_200')],
              ] : [
                ['Large/Medium Cars', '¥2,000'],
                ['Microbuses', '¥1,300'],
                ['Standard Cars', '¥500'],
                ['Motorcycles', '¥200'],
              ]}
              contact={locale === 'ja' ? [t('worshipAccessPage_text_21208'), t('worshipAccessPage_tel0978370247')] : ['【Inquiries】', 'Usa Hachiman Parking Co., Ltd. / TEL: 0978-37-0247']}
            />

            <ParkingCard
              num="④"
              name={locale === 'ja' ? t('worshipAccessPage_text_54365') : 'Worshipper Dedicated Parking Lot'}
              address={locale === 'ja' ? t('worshipAccessPage_text_71131') : 'Minamiusa, Usa City, Oita'}
              hideCapacityFee
              contact={locale === 'ja' ? [t('worshipAccessPage_text_21208'), t('worshipAccessPage_tel0978370001')] : ['【Inquiries】', 'Usa Jingu / TEL: 0978-37-0001']}
              links={
                <IntLink href={`/${locale}/news`}>
                  {locale === 'ja' ? t('worshipAccessPage_text_73462') : 'Click here for details'}
                </IntLink>
              }
            />
          </FadeSection>
        </div>

        <DiamondRule />

        {/* 3. From Usa Station */}
        <div id="from-station" className="scroll-mt-20">
          <FadeSection delay={0.05}>
            <SectionHeader icon={<Train size={18} />} ja={t("worshipAccessPage_text_37105")} en="From Usa Station" />

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <p className="font-sans text-text-mid text-sm leading-relaxed mb-4 select-text">
                  {locale === 'ja'
                    ? t('worshipAccessPage_410')
                    : 'Please use a bus or taxi from Usa Station. (Approx. 4 km toward Nakatsu, approx. 10 mins.)'}
                </p>

                <BulletList
                  items={[
                    <>
                      <strong className="text-text-body font-semibold">
                        {locale === 'ja' ? t('worshipAccessPage_text_69592') : 'By Bus'}
                      </strong>
                      <br />
                      {locale === 'ja'
                        ? t('worshipAccessPage_text_35926')
                        : 'Board the bus toward Yokkaichi and alight at the "Usa Hachiman" bus stop.'}
                      <br />
                      <span className="inline-flex items-center gap-1 mt-1">
                        <ExtLink href="http://www.oitakotsu.co.jp/">
                          {locale === 'ja' ? t('worshipAccessPage_text_34097') : 'Bus Information'}
                        </ExtLink>
                      </span>
                      <br />
                      <ContactBox
                        lines={
                          locale === 'ja'
                            ? [t('worshipAccessPage_text_21208'), t('worshipAccessPage_tel0979220071')]
                            : ['【Inquiries】', 'Oita Hokubu Bus Co., Ltd. / TEL: 0979-22-0071']
                        }
                      />
                    </>
                  ]}
                />
              </div>

              <div className="shrink-0 w-full md:w-[280px] mx-auto md:mx-0 select-none">
                <img
                  src={IMG_TRAIN}
                  alt={locale === 'ja' ? t("worshipAccessPage_text_45469") : "Usa Station route map"}
                  className="w-full border border-crimson/10 rounded-sm shadow-sm block"
                />
              </div>
            </div>

            <div className="bg-stone border border-crimson/10 p-5 mt-5 shadow-sm rounded-sm select-text">
              <p className="font-sans text-text-mid text-sm leading-relaxed font-semibold">
                {locale === 'ja' ? t('worshipAccessPage_jr') : 'Alight at JR Nippo Main Line "Usa Station"'}
              </p>
              <div className="flex flex-wrap gap-4 mt-2 select-none text-text-mid text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gold opacity-60 rotate-45" />
                  <span>
                    {locale === 'ja' ? t('worshipAccessPage_text_36297') : 'From Kokura Station (Limited Express / Approx. 1 hour)'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gold opacity-60 rotate-45" />
                  <span>
                    {locale === 'ja' ? t('worshipAccessPage_text_67407') : 'From Oita Station (Limited Express / Approx. 40 minutes)'}
                  </span>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>

        <DiamondRule />

        {/* 4. From Oita Airport */}
        <div id="from-airport" className="scroll-mt-20">
          <FadeSection delay={0.05}>
            <SectionHeader icon={<Plane size={18} />} ja={t("worshipAccessPage_text_42528")} en="From Oita Airport" />

            <p className="font-sans text-text-mid text-sm leading-relaxed mb-4">
              {locale === 'ja'
                ? t('worshipAccessPage_text_21480')
                : 'Please use a bus or taxi from Oita Airport.'}
              <br />
              <ExtLink href="https://goo.gl/maps/6zHV76Hx8N72">
                {locale === 'ja' ? t('worshipAccessPage_text_90828') : 'Directions from Oita Airport to Usa Jingu'}
              </ExtLink>
            </p>

            <BulletList
              items={[
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_text_16993') : 'By Taxi'}
                  </strong>
                  <br />
                  {locale === 'ja' ? t('worshipAccessPage_text_27642') : 'Arrives in approximately 1 hour.'}
                </>,
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_text_69592') : 'By Bus'}
                  </strong>
                  <br />
                  {locale === 'ja'
                    ? t('worshipAccessPage_1550')
                    : 'Board the Oita Airport Limousine Bus (toward Nakatsu/Usa/Bungotakada) and alight at "Usa Hachiman" (¥1,550).'}
                  <br />
                  <span className="inline-flex items-center gap-1 mt-1">
                    <ExtLink href="http://www.oitakotsu.co.jp/">
                      {locale === 'ja' ? t('worshipAccessPage_text_34097') : 'Bus Information'}
                    </ExtLink>
                  </span>
                  <br />
                  <ContactBox
                    lines={
                      locale === 'ja'
                        ? [t('worshipAccessPage_text_21208'), t('worshipAccessPage_tel0978671198')]
                        : ['【Inquiries】', 'Oita Airport Bus Information / TEL: +81-978-67-1198']
                    }
                  />
                </>
              ]}
            />
          </FadeSection>
        </div>

        <DiamondRule />

        {/* 5. From Ports */}
        <div id="from-ports" className="scroll-mt-20">
          <FadeSection delay={0.05}>
            <SectionHeader icon={<Ship size={18} />} ja={t("worshipAccessPage_text_15511")} en="From Oita / Beppu Port" />

            <p className="font-sans text-text-mid text-sm leading-relaxed mb-4">
              {locale === 'ja'
                ? t('worshipAccessPage_jr')
                : 'Please use a personal car, taxi, or JR from Oita Port or Beppu Port.'}
              <br />
              <span className="inline-flex flex-wrap gap-4 mt-1 select-none">
                <ExtLink href="https://goo.gl/maps/7L93y54ppNR2">
                  {locale === 'ja' ? t('worshipAccessPage_text_71795') : 'Directions from Oita Port to Usa Jingu'}
                </ExtLink>
                <ExtLink href="https://goo.gl/maps/B2rEvCo7DXE2">
                  {locale === 'ja' ? t('worshipAccessPage_text_10184') : 'Directions from Beppu Port to Usa Jingu'}
                </ExtLink>
              </span>
            </p>

            <BulletList
              items={[
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_text_22288') : 'By Car (Car Ferry)'}
                  </strong>
                  <br />
                  {locale === 'ja' ? (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_icIc50")}</span>
                      <span className="block select-text">{t("worshipAccessPage_icIc35")}</span>
                      <span className="block select-text">{t("worshipAccessPage_1011")}</span>
                    </>
                  ) : (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_kobeFerryFromOita")}</span>
                      <span className="block select-text">{t("worshipAccessPage_osakaFerryFromBeppu")}</span>
                      <span className="block select-text">Take Route 10 toward Usa/Nakatsu (approx. 1 to 1.5 hours)</span>
                    </>
                  )}
                </>,
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_jr') : 'By JR Limited Express'}
                  </strong>
                  <br />
                  {locale === 'ja' ? (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_10Jr40")}</span>
                      <span className="block select-text">{t("worshipAccessPage_10Jr30")}</span>
                    </>
                  ) : (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_fromOitaPortTo")}</span>
                      <span className="block select-text">{t("worshipAccessPage_fromBeppuPortTo")}</span>
                    </>
                  )}
                </>,
                <>
                  <strong className="text-text-body font-semibold">
                    {locale === 'ja' ? t('worshipAccessPage_jr') : 'By JR Local Train'}
                  </strong>
                  <br />
                  {locale === 'ja' ? (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_3Jr1")}</span>
                      <span className="block select-text">{t("worshipAccessPage_10Jr45")}</span>
                    </>
                  ) : (
                    <>
                      <span className="block mt-1 select-text">{t("worshipAccessPage_fromOitaPortTo")}</span>
                      <span className="block select-text">{t("worshipAccessPage_fromBeppuPortTo")}</span>
                    </>
                  )}
                </>
              ]}
            />
          </FadeSection>
        </div>

        {/* Bottom CTA */}
        <FadeSection delay={0.1}>
          <div className="mt-16 p-8 bg-stone border border-crimson/10 text-center rounded-sm shadow-sm select-none">
            <p className="font-serif text-text-mute text-sm tracking-wide mb-5">
              {locale === 'ja' ? t('worshipAccessPage_text_22970') : 'Please feel free to contact us if you have any questions'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-2.5 bg-crimson text-ivory font-sans text-sm tracking-widest hover:opacity-90 transition-opacity rounded-sm shadow-sm"
              >
                {locale === 'ja' ? t('worshipAccessPage_text_42242') : 'Inquiries'}
              </Link>
              <Link
                href={`/${locale}/worship/guide`}
                className="px-8 py-2.5 bg-transparent text-crimson font-sans text-sm tracking-widest border border-crimson hover:bg-crimson/5 transition-colors rounded-sm"
              >
                {locale === 'ja' ? t('worshipAccessPage_text_31551') : 'Shrine Grounds Guide'}
              </Link>
            </div>
          </div>
        </FadeSection>
      </div>
    </div>
  );
}
