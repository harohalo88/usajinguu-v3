'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
  language: string;
}

export function OpeningAnimation({ onComplete, language }: Props) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    const exitTimer = setTimeout(() => setPhase('exit'), 2800);
    const doneTimer = setTimeout(() => onComplete(), 4000);
    
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  const subtitleMap: Record<string, string> = {
    ja: '八幡総本宮',
    en: 'Grand Shrine of Hachiman',
    'zh-TW': '八幡總本宮',
    'zh-CN': '八幡总本宫',
    ko: '하치만 총본궁',
  };

  const yearMap: Record<string, string> = {
    ja: '神亀二年（七二五年）御鎮座',
    en: 'Founded in 725 AD',
    'zh-TW': '創建於西元725年',
    'zh-CN': '创建于公元725年',
    ko: '서기 725년 창건',
  };

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#faf8f5' }}
        >
          {/* Outer decorative ring */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              border: '1px solid rgba(162,122,40,0.25)',
            }}
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{
              width: '340px',
              height: '340px',
              borderRadius: '50%',
              border: '1px solid rgba(162,122,40,0.15)',
            }}
          />

          {/* Top decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #a27a28, transparent)',
              width: '220px',
              marginBottom: '32px',
              transformOrigin: 'center',
            }}
          />

          {/* Logo Image - Refers to copied assets folder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '28px' }}
          >
            <img
              src="/images/07ddf8f36fce46ea9f721642d4b1fb369ab2bb5e.png"
              alt="宇佐神宮"
              style={{
                height: '80px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-serif)',
              color: '#a50000',
              letterSpacing: '0.35em',
              fontSize: '0.82rem',
              fontWeight: 400,
              marginBottom: '6px',
            }}
          >
            {subtitleMap[language] || subtitleMap.ja}
          </motion.p>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: 'easeOut' }}
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #a27a28, transparent)',
              width: '160px',
              marginTop: '20px',
              marginBottom: '16px',
              transformOrigin: 'center',
            }}
          />

          {/* Year tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              color: '#7a6a5a',
              letterSpacing: '0.2em',
              fontSize: '0.65rem',
            }}
          >
            {yearMap[language] || yearMap.ja}
          </motion.p>

          {/* Decorative dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="absolute bottom-16 flex gap-2 items-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                style={{
                  width: i === 1 ? '6px' : '4px',
                  height: i === 1 ? '6px' : '4px',
                  backgroundColor: '#a27a28',
                  borderRadius: '50%',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
