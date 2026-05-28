'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Design tokens ─────────────────────────────────────────────────────────────
export const C = {
  crimson:  '#a50000',
  vermil:   '#e2501f',
  gold:     '#a27a28',
  goldLt:   '#c49a3a',
  brown:    '#873800',
  ivory:    '#faf8f5',
  stone:    '#f2ece4',
  stoneDk:  '#ede5d9',
  dark:     '#1e1810',
  text:     '#333333',
  textMid:  '#555555',
  textMute: '#7a6a5a',
  border:   'rgba(165,0,0,0.12)',
  borderG:  'rgba(162,122,40,0.18)',
  blue:     '#1a4fa0',
  blueBg:   'rgba(26,79,160,0.10)',
  pinkBg:   'rgba(165,0,0,0.10)',
} as const;

export const F = {
  serif: 'var(--font-serif)',
  sans:  'var(--font-sans)',
} as const;

export const TS = {
  body: {
    fontFamily:    F.sans,
    fontSize:      '0.95rem',
    lineHeight:    2.2,
    letterSpacing: '0.05em',
    color:         C.textMid,
  },
  bodySm: {
    fontFamily:    F.sans,
    fontSize:      '0.88rem',
    lineHeight:    2.0,
    letterSpacing: '0.04em',
    color:         C.textMid,
  },
  caption: {
    fontFamily:    F.sans,
    fontSize:      '0.78rem',
    lineHeight:    1.8,
    letterSpacing: '0.06em',
    color:         C.textMute,
  },
  eyebrow: {
    fontFamily:    F.sans,
    fontSize:      '0.65rem',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
  },
  btn: {
    fontFamily:    F.sans,
    fontSize:      '0.78rem',
    letterSpacing: '0.14em',
  },
  h3: {
    fontFamily:    F.serif,
    fontSize:      '1.05rem',
    lineHeight:    1.5,
    letterSpacing: '0.18em',
    fontWeight:    500,
    color:         C.text,
    margin:        0,
  },
  h2banner: {
    fontFamily:    F.serif,
    fontSize:      'clamp(1rem,2.5vw,1.15rem)',
    letterSpacing: '0.25em',
    fontWeight:    400,
    color:         '#faf8f5',
    margin:        0,
  },
  h1hero: {
    fontFamily:    F.serif,
    fontSize:      'clamp(1.8rem,5vw,2.8rem)',
    letterSpacing: '0.35em',
    fontWeight:    300,
    color:         '#faf8f5',
    textShadow:    '0 3px 20px rgba(0,0,0,0.5)',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FadeIn  —  scroll-triggered entrance animation
// ─────────────────────────────────────────────────────────────────────────────
interface FadeInProps {
  children:   React.ReactNode;
  delay?:     number;
  y?:         number;
  margin?:    string;
  className?: string;
}

export function FadeIn({
  children,
  delay   = 0,
  y       = 20,
  margin  = '-40px',
  className = '',
}: FadeInProps) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as any });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionBanner  —  gold gradient section heading bar
// ─────────────────────────────────────────────────────────────────────────────
interface SectionBannerProps {
  ja:   string;
  en?:  string;
  id?:  string;
}

export function SectionBanner({ ja, en, id }: SectionBannerProps) {
  return (
    <div
      id={id}
      style={{
        background:    'linear-gradient(90deg, #c49a3a 0%, #a27a28 40%, #8a6420 100%)',
        padding:       '13px 24px',
        marginBottom:  '28px',
        display:       'flex',
        alignItems:    'center',
        justifyContent:'space-between',
        ...(id ? { scrollMarginTop: '80px' } : {}),
      }}
    >
      <div className="flex items-center gap-4">
        {/* decorative diamond */}
        <div style={{
          width:     '8px',
          height:    '8px',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.5)',
          transform:  'rotate(45deg)',
        }} />
        <h2 style={TS.h2banner as React.CSSProperties}>{ja}</h2>
      </div>

      {en && (
        <p style={{
          fontFamily:    F.sans,
          color:         'rgba(250,248,245,0.6)',
          fontSize:      '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          margin:        0,
        }}>
          {en}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DiamondRule  —  full decorative section divider with gradient lines
// ─────────────────────────────────────────────────────────────────────────────
interface DiamondRuleProps {
  my?: string;
}

export function DiamondRule({ my = 'my-12' }: DiamondRuleProps) {
  return (
    <div className={`flex items-center gap-4 ${my}`}>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }}
      />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/40 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: C.gold }} />
      </div>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right,transparent,rgba(162,122,40,0.3),transparent)' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OrnamentDivider  —  slim inline ornament (3-element: line · diamond · line)
// ─────────────────────────────────────────────────────────────────────────────
export function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.35)' }} />
      <div style={{
        width: '5px', height: '5px',
        backgroundColor: C.gold, opacity: 0.55, transform: 'rotate(45deg)',
      }} />
      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.35)' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ContentHeading  —  red left-border h3 sub-section heading
// ─────────────────────────────────────────────────────────────────────────────
interface ContentHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentHeading({ children, className = '' }: ContentHeadingProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-3 ${className}`}
      style={{ borderLeft: `3px solid ${C.crimson}`, paddingLeft: '12px' }}
    >
      <h3 style={TS.h3 as React.CSSProperties}>{children}</h3>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionHighlight  —  gold left-border callout / quote block
// ─────────────────────────────────────────────────────────────────────────────
interface SectionHighlightProps {
  children:  React.ReactNode;
  className?: string;
}

export function SectionHighlight({ children, className = '' }: SectionHighlightProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'rgba(162,122,40,0.06)',
        borderLeft:      `3px solid ${C.gold}`,
        padding:         '18px 22px',
        marginTop:       '24px',
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroEyebrow  —  small EN uppercase label above hero title
// ─────────────────────────────────────────────────────────────────────────────
interface HeroEyebrowProps {
  children: React.ReactNode;
}

export function HeroEyebrow({ children }: HeroEyebrowProps) {
  return (
    <p style={{
      fontFamily:    F.sans,
      color:         C.goldLt,
      fontSize:      '0.65rem',
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      marginBottom:  '10px',
    }}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroAccentRule  —  three-element decorative line below hero title
// ─────────────────────────────────────────────────────────────────────────────
export function HeroAccentRule() {
  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
      <div style={{
        width: '5px', height: '5px',
        backgroundColor: C.gold, opacity: 0.7, transform: 'rotate(45deg)',
      }} />
      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
    </div>
  );
}
