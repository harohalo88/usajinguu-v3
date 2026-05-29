'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function FloatingBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations();
  const locale = useLocale();

  if (!isOpen) return null;

  const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="85"><rect width="350" height="85" fill="#008000"/><text x="175" y="42" fill="#faf8f5" font-family="serif" font-size="16" text-anchor="middle" letter-spacing="1">${t('floatingBannerText')}</text><text x="175" y="66" fill="#c49a3a" font-family="sans-serif" font-size="12" text-anchor="middle" letter-spacing="0.5">${t('floatingBannerSub')}</text></svg>`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(350px, calc(100vw - 32px))',
        height: '85px',
        zIndex: 9999,
      }}
    >
      <Link href={`/${locale}/news`} style={{ display: 'block', width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            border: '1px solid #c49a3a',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(bannerSvg)}`}
            alt={`${t('floatingBannerText')} ${t('floatingBannerSub')}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </Link>

      {/* Dismiss button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: '#faf8f5',
          border: '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          borderRadius: '50%',
          width: '26px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#333',
          zIndex: 10,
          transition: 'transform 0.15s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        aria-label="Close banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}
