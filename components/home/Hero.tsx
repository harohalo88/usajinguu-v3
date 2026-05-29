'use client';

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HeroProps {
  t: {
    heroTaglineVertical?: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroCta: string;
    heroScrollText: string;
  };
}

export function Hero({ t }: HeroProps) {
  const tTranslate = useTranslations();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Create subtle, performant parallax translate effect based on scroll position (disabled on reduced motion)
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const scrollDown = () => {
    const el = document.getElementById('news');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden select-none bg-shrine-dark"
      style={{ height: '100svh', minHeight: '600px' }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        style={{ y: shouldReduceMotion ? 0 : yBg }}
        className="absolute inset-0"
      >
        <img
          src="https://res.cloudinary.com/dxhqwmwz1/image/upload/c_fill,g_auto,w_1920,h_1080/f_auto,q_auto/%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%98%E3%82%9A%E3%83%BC%E3%82%B7%E3%82%99_img01_ucgl5j.jpg"
          alt={tTranslate('hero_text_1')}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </motion.div>

      {/* Multi-layer gradient overlays matching traditional Japanese styling */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,4,4,0.38) 0%, rgba(10,4,4,0.12) 40%, rgba(10,4,4,0.52) 80%, rgba(10,4,4,0.78) 100%)',
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-24"
        style={{
          background: 'linear-gradient(to right, rgba(10,4,4,0.52), transparent)',
        }}
      />

      {/* Vertical Japanese Tagline (Left side) */}
      <div
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-4"
        style={{ zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ opacity: shouldReduceMotion ? 1 : opacityText }}
        >
          <div
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontFamily: 'var(--font-serif)',
              color: '#faf8f5',
              fontSize: '1.1rem',
              letterSpacing: '0.35em',
              lineHeight: 2,
              fontWeight: 300,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              whiteSpace: 'pre-line'
            }}
          >
            {t.heroTaglineVertical || tTranslate('hero_text_2')}
          </div>
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            width: '1px',
            height: '60px',
            backgroundColor: '#a27a28',
            transformOrigin: 'top',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Center Content */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" 
        style={{ zIndex: 10 }}
      >
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(162,122,40,0.85), transparent)',
            width: '200px',
            marginBottom: '24px',
          }}
        />

        {/* Small EN uppercase label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-sans)',
            color: '#c49a3a',
            letterSpacing: '0.35em',
            fontSize: '0.65rem',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          USA JINGU · OITA, JAPAN
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#faf8f5',
            letterSpacing: '0.35em',
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: '12px',
            textShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          {t.heroTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#c49a3a',
            letterSpacing: '0.3em',
            fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
            fontWeight: 300,
            marginBottom: '28px',
          }}
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.55)' }} />
          <div style={{ width: '6px', height: '6px', backgroundColor: '#a27a28', opacity: 0.85, transform: 'rotate(45deg)' }} />
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.55)' }} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'rgba(250,248,245,0.85)',
            lineHeight: 2,
            fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
            maxWidth: '420px',
            marginBottom: '40px',
            whiteSpace: 'pre-line',
          }}
        >
          {t.heroDescription}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          onClick={() => {
            const el = document.getElementById('worship');
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }}
          className="group relative overflow-hidden px-10 py-3 transition-all duration-300 border border-gold/75 text-ivory font-sans text-xs tracking-widest cursor-pointer bg-transparent"
        >
          <span
            className="absolute inset-0 transition-transform duration-300 -translate-x-full group-hover:translate-x-0"
            style={{ backgroundColor: 'rgba(226,80,31,0.25)' }}
          />
          <span className="relative z-10">{t.heroCta}</span>
        </motion.button>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group bg-transparent border-0 outline-none cursor-pointer"
        style={{ zIndex: 10 }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', color: 'rgba(250,248,245,0.6)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {t.heroScrollText}
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} className="text-gold/75 group-hover:text-gold transition-colors duration-300" />
        </motion.div>
      </motion.button>

      {/* Right side National Treasure badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute right-6 md:right-10 bottom-16 hidden md:flex flex-col items-end gap-2"
        style={{ zIndex: 10 }}
      >
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-serif)', color: 'rgba(196,154,58,0.7)', fontSize: '0.65rem', letterSpacing: '0.25em' }}>
          本殿 国宝
        </div>
        <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
      </motion.div>
    </section>
  );
}
