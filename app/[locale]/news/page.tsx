'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Filter, Search, X } from 'lucide-react';
import { C } from '@/components/ShrineUI';
import { useTranslations } from 'next-intl';

interface NewsItem {
  id: number;
  date: string; // ISO format or structured for filtering
  displayDate: string; // e.g., 令和8年3月16日
  title: string;
  isLink?: boolean;
  tag?: string;
  year: number;
  month: number;
}

const ITEMS_PER_PAGE = 15;

export default function NewsListingPage() {
  const t = useTranslations();

  const NEWS_DATA: NewsItem[] = [
    { id: 1, year: 2026, month: 3, date: '2026-03-16', displayDate: t('news_text_3'), title: t('news_text_2'), tag: t('news_text_1') },
    { id: 2, year: 2026, month: 2, date: '2026-02-13', displayDate: t('news_text_6'), title: t('news_text_5'), isLink: true, tag: t('news_text_4') },
    { id: 3, year: 2026, month: 2, date: '2026-02-02', displayDate: t('news_text_9'), title: t('news_text_8'), isLink: true, tag: t('news_text_7') },
    { id: 4, year: 2026, month: 1, date: '2026-01-01', displayDate: t('news_text_12'), title: t('news_text_11'), isLink: true, tag: t('news_text_10') },
    { id: 5, year: 2025, month: 12, date: '2025-12-01', displayDate: t('news_text_15'), title: t('news_text_14'), tag: t('news_text_13') },
    { id: 6, year: 2025, month: 12, date: '2025-12-01', displayDate: t('news_text_18'), title: t('news_text_17'), isLink: true, tag: t('news_text_16') },
    { id: 7, year: 2025, month: 12, date: '2025-12-01', displayDate: t('news_text_21'), title: t('news_text_20'), isLink: true, tag: t('news_text_19') },
    { id: 8, year: 2025, month: 12, date: '2025-12-01', displayDate: t('news_text_24'), title: t('news_text_23'), isLink: true, tag: t('news_text_22') },
    { id: 9, year: 2025, month: 11, date: '2025-11-18', displayDate: t('news_text_27'), title: t('news_text_26'), isLink: true, tag: t('news_text_25') },
    { id: 10, year: 2025, month: 11, date: '2025-11-04', displayDate: t('news_text_30'), title: t('news_text_29'), tag: t('news_text_28') },
    { id: 11, year: 2025, month: 10, date: '2025-10-18', displayDate: t('news_text_33'), title: t('news_text_32'), isLink: true, tag: t('news_text_31') },
    { id: 12, year: 2025, month: 9, date: '2025-09-26', displayDate: t('news_text_36'), title: t('news_text_35'), isLink: true, tag: t('news_text_34') },
    { id: 13, year: 2025, month: 9, date: '2025-09-23', displayDate: t('news_text_39'), title: t('news_text_38'), isLink: true, tag: t('news_text_37') },
    { id: 14, year: 2025, month: 9, date: '2025-09-21', displayDate: t('news_text_42'), title: t('news_text_41'), isLink: true, tag: t('news_text_40') },
    { id: 15, year: 2025, month: 9, date: '2025-09-21', displayDate: t('news_text_45'), title: t('news_text_44'), isLink: true, tag: t('news_text_43') },
    { id: 16, year: 2025, month: 9, date: '2025-09-17', displayDate: t('news_text_48'), title: t('news_text_47'), isLink: true, tag: t('news_text_46') },
    { id: 17, year: 2025, month: 9, date: '2025-09-16', displayDate: t('news_text_51'), title: t('news_text_50'), isLink: true, tag: t('news_text_49') },
  ];
  const [selectedMonth, setSelectedMonth] = useState<{ year: number; month: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const locale = useLocale();

  // Extract available months for filter
  const availableMonths = useMemo(() => {
    const months = NEWS_DATA.map(item => ({ year: item.year, month: item.month }));
    // Deduplicate
    const unique = months.filter((v, i, a) => a.findIndex(t => (t.year === v.year && t.month === v.month)) === i);
    // Sort descending
    return unique.sort((a, b) => b.year - a.year || b.month - a.month);
  }, []);

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter(item => {
      const matchMonth = selectedMonth ? (item.year === selectedMonth.year && item.month === selectedMonth.month) : true;
      const matchSearch = searchQuery ? item.title.includes(searchQuery) : true;
      return matchMonth && matchSearch;
    });
  }, [selectedMonth, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: C.ivory, minHeight: '100vh' }}>
      {/* ── Page Header ── */}
      <div style={{ backgroundColor: C.dark, padding: '100px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', border: `1px solid ${C.gold}`, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', border: `1px solid ${C.vermil}`, borderRadius: '50%' }} />
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >{t("newsPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">{t("newsPage_text_25214")}</span>
          </nav>

          <h1 className="font-title-main" style={{ fontFamily: 'var(--font-serif)', color: '#faf8f5', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, letterSpacing: '0.2em', marginBottom: '8px' }}>{t("newsPage_text_25214")}</h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: C.goldLt, fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            LATEST NEWS & ANNOUNCEMENTS
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          
          {/* ── Sidebar Filter ── */}
          <aside>
            <div className="sticky top-24">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4" style={{ color: C.crimson }}>
                  <Filter size={14} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', letterSpacing: '0.1em' }}>{t('news_text_52')}</span>
                </div>
                
                {/* Search */}
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder={t('news_text_53')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '10px 36px 10px 12px', 
                      fontSize: '0.8rem', 
                      backgroundColor: C.stone, 
                      border: `1px solid ${C.border}`,
                      fontFamily: 'var(--font-sans)',
                      borderRadius: '4px',
                      outline: 'none'
                    }}
                  />
                  <Search size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: C.textMute }} />
                </div>

                {/* Month List */}
                <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <button
                    onClick={() => setSelectedMonth(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-sans)',
                      backgroundColor: selectedMonth === null ? 'rgba(165,0,0,0.06)' : 'transparent',
                      color: selectedMonth === null ? C.crimson : C.textMid,
                      border: 'none',
                      borderLeft: `2px solid ${selectedMonth === null ? C.crimson : 'transparent'}`,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{t('news_text_54')}</span>
                    <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>({NEWS_DATA.length})</span>
                  </button>
                  
                  {availableMonths.map((m) => {
                    const count = NEWS_DATA.filter(item => item.year === m.year && item.month === m.month).length;
                    const isActive = selectedMonth?.year === m.year && selectedMonth?.month === m.month;
                    return (
                      <button
                        key={`${m.year}-${m.month}`}
                        onClick={() => setSelectedMonth(m)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-sans)',
                          backgroundColor: isActive ? 'rgba(165,0,0,0.06)' : 'transparent',
                          color: isActive ? C.crimson : C.textMid,
                          border: 'none',
                          borderLeft: `2px solid ${isActive ? C.crimson : 'transparent'}`,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span>{t("newsPage_myearMmonth")}</span>
                        <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main List ── */}
          <main>
            {/* Active Filters Bar */}
            {(selectedMonth || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span style={{ fontSize: '0.72rem', color: C.textMute, marginRight: '4px' }}>{t('news_text_55')}</span>
                {selectedMonth && (
                  <span className="flex items-center gap-1 px-3 py-1" style={{ backgroundColor: C.stone, border: `1px solid ${C.border}`, fontSize: '0.7rem', color: C.crimson, borderRadius: '20px' }}>
                    {selectedMonth.year}年{selectedMonth.month}月
                    <X size={12} className="cursor-pointer" onClick={() => setSelectedMonth(null)} />
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1 px-3 py-1" style={{ backgroundColor: C.stone, border: `1px solid ${C.border}`, fontSize: '0.7rem', color: C.crimson, borderRadius: '20px' }}>
                    &ldquo;{searchQuery}&rdquo;
                    <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button 
                  onClick={() => { setSelectedMonth(null); setSearchQuery(''); }}
                  style={{ fontSize: '0.7rem', color: C.textMute, textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '8px' }}
                >{t("newsPage_text_48240")}</button>
              </div>
            )}

            <div style={{ borderTop: `1px solid ${C.border}` }}>
              <AnimatePresence mode="popLayout">
                {paginatedNews.length > 0 ? (
                  <>
                    {paginatedNews.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        style={{ 
                          borderBottom: `1px solid rgba(162,122,40,0.1)`, 
                          backgroundColor: 'white' 
                        }}
                      >
                        {item.isLink ? (
                          <Link 
                            href={`/${locale}/news/${item.id}`} 
                            className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 px-2 py-5 hover:bg-[rgba(162,122,40,0.03)] transition-colors"
                            style={{ textDecoration: 'none' }}
                          >
                            <div style={{ fontFamily: 'var(--font-sans)', color: '#886a5a', fontSize: '0.82rem', letterSpacing: '0.05em', minWidth: '130px' }}>
                              {item.displayDate}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h3 style={{ 
                                fontFamily: 'var(--font-sans)', 
                                color: '#3b5998', 
                                fontSize: '0.9rem', 
                                lineHeight: 1.6,
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px'
                              }} className="group-hover:text-blue-800 transition-colors">
                                {item.title}
                              </h3>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 px-2 py-5">
                            <div style={{ fontFamily: 'var(--font-sans)', color: '#886a5a', fontSize: '0.82rem', letterSpacing: '0.05em', minWidth: '130px' }}>
                              {item.displayDate}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ 
                                fontFamily: 'var(--font-sans)', 
                                color: C.text, 
                                fontSize: '0.9rem', 
                                lineHeight: 1.6 
                              }}>
                                {item.title}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* ── Pagination Controls ── */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          style={{
                            padding: '8px 12px',
                            border: `1px solid ${C.border}`,
                            backgroundColor: currentPage === 1 ? 'transparent' : 'white',
                            color: currentPage === 1 ? 'rgba(0,0,0,0.2)' : C.text,
                            cursor: currentPage === 1 ? 'default' : 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-sans)'
                          }}
                        >{t("newsPage_text_16388")}</button>
                        
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => {
                          if (
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: `1px solid ${currentPage === page ? C.crimson : C.border}`,
                                  backgroundColor: currentPage === page ? C.crimson : 'white',
                                  color: currentPage === page ? 'white' : C.text,
                                  cursor: 'pointer',
                                  fontSize: '0.8rem',
                                  fontFamily: 'var(--font-sans)'
                                }}
                              >
                                {page}
                              </button>
                            );
                          }
                          if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} style={{ color: C.textMute }}>...</span>;
                          }
                          return null;
                        })}

                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          style={{
                            padding: '8px 12px',
                            border: `1px solid ${C.border}`,
                            backgroundColor: currentPage === totalPages ? 'transparent' : 'white',
                            color: currentPage === totalPages ? 'rgba(0,0,0,0.2)' : C.text,
                            cursor: currentPage === totalPages ? 'default' : 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-sans)'
                          }}
                        >{t("newsPage_text_38663")}</button>
                      </div>
                    )}
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                    style={{ color: C.textMute, fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                  >
                    該当する記事が見つかりませんでした。
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
