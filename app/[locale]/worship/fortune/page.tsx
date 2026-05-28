'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronRight, ZoomIn } from 'lucide-react';
import {
  C,
  FadeIn,
  SectionBanner,
  DiamondRule
} from '@/components/ShrineUI';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_CHART = '/images/image-12.png';
const IMG_TORII = '/images/image-13.png';

// ═══════════════════════════════════════════════════════════════════════════════
export default function FortunePage() {
  const locale = useLocale();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: C.ivory }}>

      {/* ══ Hero ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a0800 0%, #3a1000 60%, #1a0800 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg,rgba(162,122,40,0.03) 0,rgba(162,122,40,0.03) 1px,transparent 0,transparent 50%)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom,rgba(0,0,0,0.12) 0%,rgba(0,0,0,0.3) 100%)',
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
              厄除開運について
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
              Fortune & Longevity
            </p>
            <h1 style={{
              fontFamily: 'var(--font-serif)', color: '#faf8f5',
              fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300,
              letterSpacing: '0.35em',
              textShadow: '0 3px 20px rgba(0,0,0,0.5)',
            }}>
              厄除開運について
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
        <div className="max-w-4xl mx-auto px-6 md:px-10" style={{ paddingTop: '64px' }}>

          {/* ── Intro paragraph ── */}
          <FadeIn>
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.textMid,
              fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
            }}>
              「厄年」とは、運気が下がり災難や不幸事に遭いやすい時期を言いますが、一方で「役」に通じ、祭礼や公共の役目に就くことで「役が除けられる」とも言われてきました。私たちの祖先は古くから積み重ねた経験と智慧から、人生には要所要所で節目があり、肉体的･社会的にも様々な変化による区切りがあることを見いだしました。その節目にあたり、あらかじめ心の準備を怠らぬよう「厄年」という習わしを意識したのです。「厄年」に当たる方は当宮で「厄除祈願」を行い、清々しい気持ちでこの節目の年をお過ごしになられることをお勧めします。
            </p>
          </FadeIn>

          <DiamondRule />

          {/* ══ さまざまな厄年 ══ */}
          <FadeIn>
            <SectionBanner ja="さまざまな厄年" en="Types of Yakudoshi" />
          </FadeIn>

          {/* Two-column: text LEFT, chart image RIGHT */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

              {/* ── Left: text ── */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.2, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  厄年には「前厄・本厄・後厄」と「廻り年」があります。
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  「前厄・本厄・後厄」は年齢により巡ってくる厄年であり、<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>「本厄」</strong>は数え年にて、
                  <span style={{
                    backgroundColor: C.blueBg,
                    color: C.blue,
                    fontWeight: 600,
                    padding: '1px 5px',
                    borderRadius: '2px',
                    margin: '0 2px',
                    whiteSpace: 'nowrap',
                  }}>
                    男性が２５歳・４２歳・６１歳
                  </span>
                  、
                  <span style={{
                    backgroundColor: C.pinkBg,
                    color: C.crimson,
                    fontWeight: 600,
                    padding: '1px 5px',
                    borderRadius: '2px',
                    margin: '0 2px',
                    whiteSpace: 'nowrap',
                  }}>
                    女性が１９歳・３３歳・６１歳
                  </span>
                  で、その前後の年がそれぞれ<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>「前厄・後厄」</strong>にあたります。厄年にあたる３年間は慎むべき年といわれており、特に「本厄」は、男性女性ともに身体や環境の変化などにより、災厄・災難に最も見舞われることが多い「大厄」の年ともいわれます。
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  また<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>「廻り年」</strong>とは、１２年に一度必ず廻ってくる自分の「干支の年」のことで、年男・年女とも称され男女共通の厄年に当たる「小厄」とされています。但し、還暦（数え年で６１歳）と男性の２５歳（数え年）は、前述の「本厄」の年に当たります。
                </p>

                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                }}>
                  さらに、初めて「廻り年」を迎える１３歳は特に重要な年齢とされており、特別に「十三参り」としてお参りする習わしがございます。
                </p>
              </div>

              {/* ── Right: image-12 (厄年早見表) ── */}
              {IMG_CHART && (
                <div className="shrink-0 w-full lg:max-w-[260px] flex flex-col items-center">
                  <a
                    href="/docs/chart2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-[#a27a28]/18 w-full hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={IMG_CHART}
                      alt="厄年早見表（令和８年版）"
                      className="w-full h-auto block"
                    />
                  </a>
                  <a
                    href="/docs/chart2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 mt-2 text-xs tracking-wider text-text-mute hover:text-crimson transition-colors"
                  >
                    <ZoomIn size={12} />
                    拡大表示
                  </a>
                </div>
              )}
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ 祝歳 ══ */}
          <FadeIn>
            <SectionBanner ja="祝歳" en="Celebrations of Longevity" id="list1" />
          </FadeIn>

          <FadeIn delay={0.05}>
            <p style={{
              fontFamily: 'var(--font-sans)', color: C.textMid,
              fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
              marginBottom: '24px',
            }}>
              年齢を重ねるとその歳に応じて様々な呼び方が付けられ、特別な節目のお祝いとして長寿を敬い、神様に感謝する習わしを<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>「祝歳」</strong>または<strong style={{ fontFamily: 'var(--font-serif)', color: C.text }}>「年祝い」</strong>といいます。
            </p>

            <div style={{
              border: `1px solid ${C.borderG}`,
              background: C.stone,
            }}>
              {[
                { name: '古希（こき）', age: '70歳', desc: '中国の唐時代の詩人、杜甫の詩の一節である「人生七十古来稀なり」に由来しています。' },
                { name: '喜寿（きじゅ）', age: '77歳', desc: '「喜」という字の草書体を書くと、「十七」の上に「七」が付いたような文字で「七十七」に見えることに由来しています。' },
                { name: '傘寿（さんじゅ）', age: '80歳', desc: '「傘」の略字が八と十を重ねた形になり、八十と読めることに由来しています。' },
                { name: '米寿（べいじゅ）', age: '88歳', desc: '「米」の字をくずすと八十八と読めることに由来しています。' },
                { name: '卒寿（そつじゅ）', age: '90歳', desc: '「卒」の略字である「卆」が九十と読めることに由来しています。' },
                { name: '白寿（はくじゅ）', age: '99歳', desc: '百から一を引くと「白」となることに由来しています。' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-4"
                  style={{
                    borderBottom: i < 5 ? `1px solid ${C.borderG}` : 'none',
                    background: i % 2 === 0 ? C.stone : C.ivory,
                  }}
                >
                  {/* Red square bullet */}
                  <div style={{
                    width: '10px', height: '10px',
                    background: C.crimson,
                    flexShrink: 0,
                    marginTop: '5px',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span style={{
                        fontFamily: 'var(--font-serif)', color: C.crimson,
                        fontSize: '0.95rem', letterSpacing: '0.1em', fontWeight: 500,
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)', color: C.gold,
                        fontSize: '0.78rem', letterSpacing: '0.15em',
                      }}>
                        …{item.age}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-sans)', color: C.textMid,
                      fontSize: '0.88rem', lineHeight: 1.9, letterSpacing: '0.04em',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <DiamondRule />

          {/* ══ 御礼報賽参り ══ */}
          <FadeIn>
            <SectionBanner ja="御礼報賽参り" en="Gratitude & Thanksgiving" id="list2" />
          </FadeIn>

          {/* Two-column: text LEFT, image-13 RIGHT */}
          <FadeIn delay={0.05}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">

              {/* ── Left: text ── */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}>
                  「御礼奉賛参り」とは、八幡大神様に祈願した願い事が成就した時や、無事災禍無く幸福に一年が過ごできた時に、大神様のお導きとご加護に感謝を申し上げることです。
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)', color: C.textMid,
                  fontSize: '0.95rem', lineHeight: 2.3, letterSpacing: '0.05em',
                  marginBottom: '24px',
                }}>
                  「厄除開運祈願」によって前厄・本厄・後厄・廻り年などの厄年が無事明けた年にも、「厄明けの御礼報賽参り」をされ、今後益々の安全とご加護を祈念申し上げます。
                </p>

                <Link
                  href={`/${locale}/worship/pray/`}
                  className="inline-flex items-center gap-1 hover:text-crimson transition-colors"
                  style={{
                    fontFamily: 'var(--font-sans)', color: C.crimson,
                    fontSize: '0.78rem', letterSpacing: '0.1em', textDecoration: 'none',
                    borderBottom: `1px solid rgba(165,0,0,0.3)`,
                    paddingBottom: '2px',
                  }}
                >
                  <ChevronRight size={13} />
                  その他のご祈願について
                </Link>
              </div>

              {/* ── Right: image-13 (torii path) ── */}
              {IMG_TORII && (
                <div style={{
                  flexShrink: 0,
                  width: '100%', maxWidth: '220px',
                  border: `1px solid ${C.borderG}`,
                  overflow: 'hidden',
                }}>
                  <img
                    src={IMG_TORII}
                    alt="御礼報賽参り"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </FadeIn>

          {/* ── Back links ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ paddingTop: '56px', paddingBottom: '80px' }}
          >
            <Link
              href={`/${locale}/worship`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.15em',
                color: '#faf8f5', backgroundColor: C.crimson, padding: '11px 28px',
                textDecoration: 'none', display: 'inline-block',
              }}
            >
              参拝についてへ戻る
            </Link>
            <Link
              href={`/${locale}/worship/pray`}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.78rem', letterSpacing: '0.12em',
                color: C.crimson, backgroundColor: 'transparent', padding: '11px 28px',
                textDecoration: 'none', border: `1px solid ${C.crimson}`, display: 'inline-block',
              }}
            >
              祈願祭について
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
