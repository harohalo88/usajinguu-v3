'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, ChevronRight } from 'lucide-react';

// Logo asset (shrine crest)
const LOGO_IMG = '/images/07ddf8f36fce46ea9f721642d4b1fb369ab2bb5e.png';

type NavChild = { labelKey: string; defaultLabel: string; path: string; children?: NavChild[]; isGroup?: boolean };
type NavItem  = { labelKey: string; defaultLabel: string; path: string; children?: NavChild[]; isGroup?: boolean };

const C = {
  crimson: '#a50000',
  vermil: '#e2501f',
  gold: '#a27a28',
  ivory: '#faf8f5',
  stone: '#f2ece4',
  text: '#333333',
  textMute: '#7a6a5a',
  border: 'rgba(165,0,0,0.1)',
};

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const NAV_ITEMS: NavItem[] = [
    {
      labelKey: 'navAbout',
      defaultLabel: t('header_text_1'),
      path: '/about/history',
      children: [
        { labelKey: 'historyTitle', defaultLabel: t('header_text_2'), path: '/about/history' },
        { labelKey: 'deitiesTitle', defaultLabel: t('header_text_3'), path: '/about/deities' },
        {
          labelKey: 'legendsTitle',
          defaultLabel: t('header_text_4'),
          path: '/about/legends/goreisui',
          isGroup: true, // renders as section label — children always visible, no secondary hover needed
          children: [
            { labelKey: 'legend1Title', defaultLabel: t('header_text_5'), path: '/about/legends/goreisui' },
            { labelKey: 'legend2Title', defaultLabel: t('header_text_6'), path: '/about/legends/todaiji' },
            { labelKey: 'legend3Title', defaultLabel: t('header_text_7'), path: '/about/legends/wake' },
            { labelKey: 'legend4Title', defaultLabel: t('header_text_8'), path: '/about/legends/shinbutsu' },
          ],
        },
        { labelKey: 'timelineTitle', defaultLabel: t('header_text_9'), path: '/about/timeline' },
        { labelKey: 'museumTitle', defaultLabel: t('header_text_10'), path: '/about/museum' },
      ],
    },
    {
      labelKey: 'navWorship',
      defaultLabel: t('header_text_11'),
      path: '/worship/guide',
      children: [
        { labelKey: 'etiquetteTitle', defaultLabel: t('header_text_12'), path: '/worship/etiquette' },
        { labelKey: 'groundsTitle', defaultLabel: t('header_text_13'), path: '/worship/guide' },
        { labelKey: 'accessTitle', defaultLabel: t('header_text_14'), path: '/worship/access' },
        { labelKey: 'monorailTitle', defaultLabel: t('header_text_15'), path: '/worship/monorail' },
        { labelKey: 'prayerTitle', defaultLabel: t('header_text_16'), path: '/worship/pray' },
        { labelKey: 'yaku', defaultLabel: t('header_text_17'), path: '/worship/fortune' },
        { labelKey: 'offsiteTitle', defaultLabel: t('header_text_18'), path: '/worship/trip' },
        { labelKey: 'amuletsTitle', defaultLabel: t('header_text_19'), path: '/worship/confer' },
      ],
    },
    {
      labelKey: 'navFestivals',
      defaultLabel: t('header_text_20'),
      path: '/festivals/festival-list',
      children: [
        { labelKey: 'majorFestivalsTitle', defaultLabel: t('header_text_21'), path: '/festivals/festival-list' },
        { labelKey: 'festivalsTitle', defaultLabel: t('header_text_22'), path: '/festivals/festival-detail' },
      ],
    },
    { labelKey: 'weddingTitle', defaultLabel: t('header_text_23'), path: '/wedding' },
    { labelKey: 'footerHachiman', defaultLabel: t('header_text_24'), path: '/society' },
    {
      labelKey: t('header_text_25'),
      defaultLabel: t('header_text_26'),
      path: '/news',
      children: [
        { labelKey: 'navNews', defaultLabel: t('header_text_27'), path: '/news' },
        { labelKey: 'footerOmotesando', defaultLabel: t('header_text_28'), path: '/omotesando' },
        { labelKey: 'faqTitle', defaultLabel: t('header_text_29'), path: '/faq' },
        { labelKey: 'navContact', defaultLabel: t('header_text_30'), path: '/contact' },
        { labelKey: 'footerDonation', defaultLabel: t('header_text_31'), path: '/donation' },
      ],
    },
  ];

  const LANGUAGES = [
    { code: 'ja', label: t('header_text_32'), short: 'JP' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'zh-TW', label: t('header_text_34'), short: t('header_text_33') },
    { code: 'zh-CN', label: t('header_text_36'), short: t('header_text_35') },
    { code: 'ko', label: '한국어', short: 'KO' },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Extract path without locale for checking active routes
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';
  const isHome = pathWithoutLocale === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setLangOpen(false);
  }, [pathname]);

  const showMenu = (key: string) => {
    clearTimeout(hideTimer.current);
    setActiveMenu(key);
  };

  const delayHide = () => {
    hideTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const handleLanguageSwitch = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale; // Update locale
    router.push(segments.join('/'));
  };

  const transparent = isHome && !scrolled;
  const navColor = transparent ? '#faf8f5' : '#333333';
  const headerBg = transparent ? 'transparent' : 'rgba(250,248,245,0.97)';
  const borderBot = transparent ? 'none' : `1px solid ${C.border}`;

  const currentLang = LANGUAGES.find((l) => l.code === locale);

  const getLocalizedLabel = (item: { labelKey: string; defaultLabel: string }) => {
    // Check if the key exists inside translations
    try {
      return t(item.labelKey);
    } catch {
      return item.defaultLabel;
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: headerBg,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: borderBot,
        }}
      >
        {transparent && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(8,2,2,0.72) 0%, rgba(8,2,2,0.38) 65%, transparent 100%)',
            }}
          />
        )}

        <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 lg:h-20 relative z-10">
          {/* ── Logo ── */}
          <Link href={`/${locale}`} className="flex items-center shrink-0 hover:opacity-85 transition-opacity">
            <img
              src={LOGO_IMG}
              alt={t('header_text_37')}
              style={{
                height: scrolled ? '42px' : '40px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                transition: 'height 0.3s, filter 0.3s',
                filter: transparent
                  ? 'brightness(0) invert(1) drop-shadow(0 1px 6px rgba(0,0,0,0.6))'
                  : 'none',
              }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const itemActive = pathWithoutLocale === item.path || pathWithoutLocale.startsWith(item.path + '/');
              return (
                <div
                  key={item.path}
                  className="relative px-0.5"
                  onMouseEnter={() => item.children && showMenu(item.path)}
                  onMouseLeave={delayHide}
                >
                  <Link
                    href={`/${locale}${item.path}`}
                    className="flex items-center gap-1 px-3.5 py-2 group text-xs tracking-wider bg-transparent border-0 cursor-pointer transition-colors relative"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: itemActive ? C.crimson : navColor,
                      fontWeight: itemActive ? 500 : 400,
                    }}
                  >
                    {getLocalizedLabel(item)}
                    {item.children && (
                      <ChevronDown
                        size={10}
                        style={{
                          opacity: 0.65,
                          transition: 'transform 0.25s',
                          transform: activeMenu === item.path ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    )}
                    {/* Active underline */}
                    <span
                      className="absolute bottom-0 left-3 right-3 h-px transition-all duration-300"
                      style={{
                        backgroundColor: C.vermil,
                        transform: (itemActive || activeMenu === item.path) ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'center',
                      }}
                    />
                  </Link>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {activeMenu === item.path && item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseEnter={() => showMenu(item.path)}
                        onMouseLeave={delayHide}
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[220px] bg-ivory/98 backdrop-blur-md shadow-lg border border-crimson/10 z-[200] overflow-hidden py-2"
                      >
                        {/* Top Accent */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson to-vermil" />

                        {item.children.map((child) => (
                          <div key={child.path}>
                            {child.isGroup ? (
                              /* Section label — non-clickable, always expands children below */
                              <>
                                <div
                                  className="flex items-center gap-2 px-5 pt-3 pb-1"
                                >
                                  <span
                                    className="font-sans text-[0.65rem] tracking-widest uppercase"
                                    style={{ color: C.gold, opacity: 0.85 }}
                                  >
                                    {getLocalizedLabel(child)}
                                  </span>
                                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(162,122,40,0.25)' }} />
                                </div>
                                {child.children && child.children.map((sub) => (
                                  <Link
                                    key={sub.path}
                                    href={`/${locale}${sub.path}`}
                                    className="flex items-center px-8 py-2 hover:bg-crimson/[0.04]"
                                  >
                                    <span
                                      className="font-sans text-[0.78rem] tracking-wide transition-colors"
                                      style={{
                                        color: pathWithoutLocale === sub.path ? C.crimson : '#666',
                                        fontWeight: pathWithoutLocale === sub.path ? 500 : 400,
                                      }}
                                    >
                                      {getLocalizedLabel(sub)}
                                    </span>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              /* Normal clickable row */
                              <Link
                                href={`/${locale}${child.path}`}
                                className="flex items-center justify-between px-5 py-2.5 hover:bg-crimson/[0.04]"
                              >
                                <span
                                  className="font-sans text-[0.8rem] tracking-wide transition-colors"
                                  style={{
                                    color: pathWithoutLocale === child.path ? C.crimson : C.text,
                                    fontWeight: pathWithoutLocale === child.path ? 500 : 400,
                                  }}
                                >
                                  {getLocalizedLabel(child)}
                                </span>
                              </Link>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ── Right side triggers ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border font-sans text-[0.68rem] tracking-wider bg-transparent cursor-pointer"
                style={{
                  color: transparent ? 'rgba(250,248,245,0.85)' : C.textMute,
                  borderColor: transparent ? 'rgba(250,248,245,0.35)' : C.border,
                }}
              >
                <Globe size={12} />
                <span>{currentLang?.label}</span>
                <ChevronDown size={10} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 py-1 bg-ivory/98 backdrop-blur-md border border-crimson/10 min-w-[120px] z-[300] shadow-md rounded-sm"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          handleLanguageSwitch(lang.code);
                          setLangOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 bg-transparent border-0 cursor-pointer font-sans text-[0.75rem] transition-colors hover:bg-crimson/[0.04]"
                        style={{
                          color: locale === lang.code ? C.crimson : C.textMute,
                          fontWeight: locale === lang.code ? 500 : 400,
                        }}
                      >
                        {locale === lang.code && <span className="text-vermil mr-1.5">▸</span>}
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Contact Link */}
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex items-center justify-center px-4 py-1.5 font-sans text-[0.68rem] tracking-widest transition-all duration-300 hover:opacity-85 shadow-sm"
              style={{
                color: transparent ? '#333333' : '#faf8f5',
                backgroundColor: transparent ? 'rgba(250,248,245,0.9)' : C.crimson,
              }}
            >
              {t('navContact')}
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 bg-transparent border-0 cursor-pointer outline-none"
              style={{ color: navColor }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for desktop language switch dropdown */}
      {langOpen && <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setLangOpen(false)} />}

      {/* ── Mobile Sidebar Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/55"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col overflow-hidden w-[88%] max-w-[360px]"
              style={{ backgroundColor: C.ivory }}
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-crimson/10 shrink-0 select-none">
                <img src={LOGO_IMG} alt={t('header_text_38')} className="h-[34px] w-auto object-contain" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="bg-transparent border-0 cursor-pointer text-text-mute"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation lists (Accordion type) */}
              <nav className="flex-1 overflow-y-auto">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-5 py-4 font-serif text-sm tracking-widest border-b border-crimson/10 transition-colors"
                  style={{ color: pathWithoutLocale === '/' ? C.crimson : C.text }}
                >
                  {t('home')}
                </Link>

                {NAV_ITEMS.map((item) => {
                  const isOpen = mobileExpanded === item.path;
                  return (
                    <div key={item.path} className="border-b border-crimson/10">
                      <button
                        onClick={() => {
                          if (!item.children) {
                            router.push(`/${locale}${item.path}`);
                            setMobileOpen(false);
                          } else {
                            setMobileExpanded(isOpen ? null : item.path);
                          }
                        }}
                        className="w-full flex items-center justify-between px-5 py-4 bg-transparent border-0 cursor-pointer text-left font-serif text-sm tracking-widest"
                        style={{ color: pathWithoutLocale.startsWith(item.path) ? C.crimson : C.text }}
                      >
                        {getLocalizedLabel(item)}
                        {item.children && (
                          <ChevronDown
                            size={14}
                            className="text-gold transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                          />
                        )}
                      </button>

                      {/* Dropdown list items */}
                      <AnimatePresence initial={false}>
                        {isOpen && item.children && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden bg-stone/50"
                          >
                            {item.children.map((child) => {
                              const subOpen = mobileSub === child.path;
                              return (
                                <div key={child.path} className="border-b border-crimson/5 last:border-b-0">
                                  <button
                                    onClick={() => {
                                      if (!child.children) {
                                        router.push(`/${locale}${child.path}`);
                                        setMobileOpen(false);
                                      } else {
                                        setMobileSub(subOpen ? null : child.path);
                                      }
                                    }}
                                    className="w-full flex items-center justify-between px-8 py-3 bg-transparent border-0 cursor-pointer text-left font-sans text-xs tracking-wide"
                                    style={{ color: pathWithoutLocale === child.path ? C.crimson : '#555555' }}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="w-1 h-1 bg-vermil rounded-full opacity-70" />
                                      {getLocalizedLabel(child)}
                                    </span>
                                    {child.children && (
                                      <ChevronDown
                                        size={12}
                                        className="text-gold transition-transform duration-300"
                                        style={{ transform: subOpen ? 'rotate(180deg)' : 'none' }}
                                      />
                                    )}
                                  </button>

                                  {/* Level 3 items */}
                                  <AnimatePresence initial={false}>
                                    {subOpen && child.children && (
                                      <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden bg-[#e8e0d4]/40"
                                      >
                                        {child.children.map((sub) => (
                                          <button
                                            key={sub.path}
                                            onClick={() => {
                                              router.push(`/${locale}${sub.path}`);
                                              setMobileOpen(false);
                                            }}
                                            className="w-full text-left px-12 py-2.5 bg-transparent border-0 cursor-pointer font-sans text-[0.74rem] text-text-mute hover:text-crimson transition-colors"
                                          >
                                            └ {getLocalizedLabel(sub)}
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              {/* Language Selector in Mobile View */}
              <div className="px-5 py-5 border-t border-crimson/10 shrink-0">
                <p className="font-sans text-text-mute text-[0.62rem] tracking-widest uppercase mb-3 select-none">Language</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSwitch(lang.code)}
                      className="px-3.5 py-1.5 font-sans text-[0.68rem] tracking-wider transition-colors cursor-pointer border"
                      style={{
                        backgroundColor: locale === lang.code ? C.crimson : 'transparent',
                        color: locale === lang.code ? '#faf8f5' : C.textMute,
                        borderColor: locale === lang.code ? C.crimson : 'rgba(165,0,0,0.2)',
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom decorative color border line */}
              <div className="h-[4px] bg-gradient-to-r from-crimson via-vermil to-gold shrink-0" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
