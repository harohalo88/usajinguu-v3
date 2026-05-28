'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Car, CreditCard, Users, AlertTriangle } from 'lucide-react';
import {
  C,
  FadeIn,
  SectionBanner,
  DiamondRule
} from '@/components/ShrineUI';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_MAP = '/images/image-7.png';
const HERO_IMG = 'https://images.unsplash.com/photo-1772381996851-906ec72db137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

// ── Highlight card ─────────────────────────────────────────────────────────────
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  note?: string;
}
function InfoCard({ icon, label, value, sub, note }: InfoCardProps) {
  return (
    <div style={{
      background: C.stone,
      border: `1px solid ${C.borderG}`,
      padding: '20px 18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '8px',
    }}>
      <div style={{
        width: '36px', height: '36px',
        background: 'linear-gradient(135deg, #c49a3a 0%, #a27a28 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ color: '#faf8f5' }}>{icon}</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-sans)', color: C.textMute,
        fontSize: '0.65rem', letterSpacing: '0.22em',
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'var(--font-serif)', color: C.text,
        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
        letterSpacing: '0.12em', fontWeight: 400, lineHeight: 1.3,
      }}>
        {value}
      </p>
      {sub && (
        <p style={{
          fontFamily: 'var(--font-sans)', color: C.textMute,
          fontSize: '0.72rem', letterSpacing: '0.08em',
        }}>
          {sub}
        </p>
      )}
      {note && (
        <p style={{
          fontFamily: 'var(--font-sans)', color: C.textMute,
          fontSize: '0.62rem', letterSpacing: '0.04em', lineHeight: 1.6,
          borderTop: `1px solid ${C.borderG}`, paddingTop: '8px', width: '100%',
        }}>
          {note}
        </p>
      )}
    </div>
  );
}

// ── Rule bullet ────────────────────────────────────────────────────────────────
function RuleBullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'flex-start', gap: '10px',
      fontFamily: 'var(--font-sans)', color: C.textMid,
      fontSize: '0.95rem', lineHeight: 2.0, letterSpacing: '0.04em',
      listStyle: 'none',
    }}>
      <span style={{
        flexShrink: 0, marginTop: '9px',
        width: '6px', height: '6px',
        background: C.crimson, transform: 'rotate(45deg)',
        display: 'inline-block',
      }} />
      <span>{children}</span>
    </li>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function GaienParkingPage() {
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
        {/* Photo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(20,10,0,0.55) 0%, rgba(10,5,0,0.72) 100%)',
        }} />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, paddingTop: '64px' }}
        >
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
              ご参拝・ご祈願
            </span>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold-lt/90 text-[0.62rem] tracking-widest">
              外苑駐車場のご案内
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.goldLt,
              fontSize: '0.65rem', letterSpacing: '0.35em',
              textTransform: 'uppercase', marginBottom: '10px',
            }}>
              Gaien Parking · 外苑駐車場
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em',
              textShadow: '0 3px 20px rgba(0,0,0,0.5)',
            }}>
              外苑駐車場のご案内
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
              <div style={{ width: '5px', height: '5px', backgroundColor: C.gold, opacity: 0.7, transform: 'rotate(45deg)' }} />
              <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(162,122,40,0.5)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Body ══════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C.ivory }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10" style={{ paddingTop: '64px', paddingBottom: '80px' }}>

          {/* ── ★ 野球場利用者へのお知らせ (Highlight notice box) ─────────── */}
          <FadeIn>
            <div style={{
              background: 'linear-gradient(135deg, rgba(162,122,40,0.08) 0%, rgba(162,122,40,0.04) 100%)',
              border: `1px solid ${C.goldLt}`,
              borderLeft: `4px solid ${C.gold}`,
              padding: '20px 24px',
              marginBottom: '40px',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}>
              <AlertTriangle
                size={20}
                style={{ color: C.gold, flexShrink: 0, marginTop: '2px' }}
                strokeWidth={1.5}
              />
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)', color: C.text,
                  fontSize: '0.95rem', letterSpacing: '0.12em',
                  fontWeight: 500, marginBottom: '10px',
                }}>
                  ※野球場利用者の皆様へ
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.1, letterSpacing: '0.04em',
                  marginBottom: '10px',
                }}>
                  野球場を使用される場合は、宇佐市より無料駐車券が発行されますので、
                  下記までお問い合わせください。
                </p>
                <div style={{
                  paddingLeft: '12px',
                  borderLeft: `2px solid rgba(162,122,40,0.35)`,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.88rem', lineHeight: 1.9, letterSpacing: '0.04em',
                  }}>
                    宇佐市役所　文化・スポーツ振興課
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-sans)', color: C.textMid,
                    fontSize: '0.88rem', letterSpacing: '0.06em',
                  }}>
                    TEL：0978-27-8175
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── ★ 駐車場配置図 (Map image) — first section ──────────────────── */}
          <FadeIn delay={0.04}>
            {IMG_MAP && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  border: `1px solid ${C.borderG}`,
                  overflow: 'hidden',
                  maxWidth: '600px',
                }}>
                  <img
                    src={IMG_MAP}
                    alt="外苑駐車場・表参道駐車場 配置図"
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMute,
                  fontSize: '0.72rem', letterSpacing: '0.08em', marginTop: '8px',
                }}>
                  外苑駐車場・表参道駐車場 配置図 ／ 赤：外苑駐車場
                </p>
              </div>
            )}
          </FadeIn>

          {/* ── ★ Highlight info cards (4-grid) ────────────────────────────── */}
          <FadeIn delay={0.05}>
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              style={{ marginBottom: '20px' }}
            >
              <InfoCard
                icon={<CreditCard size={18} strokeWidth={1.5} />}
                label="駐車料金"
                value="500円"
                sub="12時間"
                note="但し、野球場利用者を除く"
              />
              <InfoCard
                icon={<Car size={18} strokeWidth={1.5} />}
                label="駐車台数"
                value="150台"
              />
              <InfoCard
                icon={<CreditCard size={18} strokeWidth={1.5} />}
                label="精算方法"
                value="自動精算機"
                sub="ゲート出入口"
              />
              <InfoCard
                icon={<Clock size={18} strokeWidth={1.5} />}
                label="利用可能時間"
                value="24時間"
              />
            </div>

            {/* Sub-note under cards */}
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.crimson,
              fontSize: '0.78rem', letterSpacing: '0.06em', lineHeight: 1.8,
              marginBottom: '8px',
            }}>
              ※正月期間中は、駐車料金が変更となります。
            </p>
          </FadeIn>

          <DiamondRule my="my-10" />

          {/* ── ★ 精算方法 detail ────────────────────────────────────────────── */}
          <FadeIn>
            <SectionBanner ja="精算方法" en="Payment Method" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.textMid,
              fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
              marginBottom: '16px',
            }}>
              駐車場出入口ゲートにて、駐車券による自動精算機にてお支払いください。
            </p>
            <div style={{
              background: C.stone,
              border: `1px solid ${C.borderG}`,
              padding: '16px 20px',
              marginBottom: '8px',
            }}>
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.textMid,
                fontSize: '0.88rem', letterSpacing: '0.08em',
                marginBottom: '8px',
              }}>
                ■ ご使用いただける紙幣・硬貨
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.text,
                fontSize: '0.95rem', lineHeight: 2.0, letterSpacing: '0.04em',
              }}>
                千円紙幣・500円・100円・50円・10円硬貨
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.crimson,
                fontSize: '0.88rem', letterSpacing: '0.04em',
                marginTop: '10px', lineHeight: 1.9,
              }}>
                ※1万円札・5千円札・2千円札の使用はできません。
              </p>
            </div>
          </FadeIn>

          <DiamondRule my="my-10" />

          {/* ── ★ 利用規定 (Rules) ───────────────────────────────────────────── */}
          <FadeIn>
            <SectionBanner ja="利用規定" en="Regulations" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ marginBottom: '28px' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', color: C.textMid,
                fontSize: '0.88rem', letterSpacing: '0.06em', marginBottom: '14px',
              }}>
                ■ 本駐車場は普通車のみご利用いただけます。また、下記に該当する車は駐車できません。
              </p>

              <ul style={{ padding: 0, margin: '0 0 24px 0' }}>
                <RuleBullet>幅 2.5mを超える車</RuleBullet>
                <RuleBullet>長さ 5mを超える車</RuleBullet>
                <RuleBullet>危険物積載車など管理上不適当と思われる車</RuleBullet>
              </ul>

              <div style={{
                borderTop: `1px solid ${C.borderG}`,
                paddingTop: '20px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.88rem', letterSpacing: '0.04em',
                  marginBottom: '12px',
                }}>
                  ■ 自動精算機では、千円紙幣・500円・100円・50円・10円硬貨が使用できます。
                  1万円札・5千円札・2千円札の使用はできません。
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.88rem', letterSpacing: '0.04em',
                }}>
                  ■ 駐車場における事故・災害・盗難等については一切責任を負いません。
                </p>
              </div>
            </div>
          </FadeIn>

          <DiamondRule my="my-10" />

          {/* ── 周辺駐車場リンク ─────────────────────────────────────────────── */}
          <FadeIn>
            <div style={{
              background: C.stone,
              border: `1px solid ${C.borderG}`,
              padding: '22px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '48px',
            }}>
              <div className="flex items-center gap-3">
                <Users size={16} style={{ color: C.gold, flexShrink: 0 }} strokeWidth={1.5} />
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.88rem', letterSpacing: '0.06em',
                }}>
                  宇佐神宮周辺の駐車場情報はアクセスページをご覧ください。
                </p>
              </div>
              <Link
                href={`/${locale}/worship/access#by-car`}
                className="inline-flex items-center gap-1.5 hover:text-crimson transition-colors"
                style={{
                  fontFamily: 'var(--font-sans)', color: C.crimson,
                  fontSize: '0.88rem', letterSpacing: '0.08em',
                  textDecoration: 'none',
                  borderBottom: `1px solid rgba(165,0,0,0.3)`,
                  paddingBottom: '2px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                周辺駐車場についてはこちら
                <ChevronRight size={14} />
              </Link>
            </div>
          </FadeIn>

          {/* ── Back / nav buttons ── */}
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/worship/access`}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.15em',
                  color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
                  textDecoration: 'none', display: 'inline-block',
                }}
              >
                交通アクセスへ戻る
              </Link>
              <Link
                href={`/${locale}/worship`}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.12em',
                  color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
                  textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
                }}
              >
                参拝について
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>
    </div>
  );
}
