'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const CRIMSON  = '#a50000';
const GOLD     = '#A27A28';
const IVORY    = '#faf8f5';
const STONE    = '#f2ece4';
const TEXT     = '#333333';
const TEXT_MID = '#555555';

// ── Scroll-reveal ─────────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section heading with crimson accent bar ───────────────────────────────────
function SectionHead({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="flex items-center gap-5 mb-10 select-none">
      <div className="w-[3px] shrink-0 self-stretch" style={{ background: CRIMSON, minHeight: 28 }} />
      <div>
        <p className="font-sans tracking-[0.4em] uppercase mb-1" style={{ fontSize: '0.5rem', color: GOLD }}>{en}</p>
        <h3 className="font-serif tracking-[0.3em]" style={{ fontSize: '1.2rem', color: TEXT }}>{ja}</h3>
      </div>
      <div className="h-px flex-1 ml-4" style={{ background: 'rgba(162,122,40,0.15)' }} />
    </div>
  );
}

// ── Diamond divider ───────────────────────────────────────────────────────────
function DiamondRule() {
  return (
    <div className="flex items-center gap-4 max-w-4xl mx-auto px-6 opacity-50 select-none">
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,${GOLD}4D,transparent)` }} />
      <div className="relative w-3 h-3">
        <div className="absolute inset-0 rotate-45 border border-[#A27A28]/50 bg-white" />
        <div className="absolute inset-[3px] rotate-45" style={{ background: GOLD }} />
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right,transparent,${GOLD}4D,transparent)` }} />
    </div>
  );
}

export default function DisclaimerPage() {
  const locale = useLocale();

  // Translations dictionary matching current locale
  const getDisclaimerContent = () => {
    const dict: Record<string, { num: string; text: string }[]> = {
      ja: [
        {
          num: '１',
          text: '宇佐神宮Webサイト（以下、当Webサイト）に掲載する情報の正確さには万全を期していますが、宇佐神宮は利用者が当Webサイトの情報を用いて行う一切の行為について、いかなる責任も負いません。'
        },
        {
          num: '２',
          text: '宇佐神宮は、利用者が当Webサイトにアクセスしたために被った損害、損失に対して、いかなる場合でも一切の責任を負いません。'
        },
        {
          num: '３',
          text: '当Webサイトは、予告なしにその内容を変更又は削除する場合があります。あらかじめご了承ください。'
        },
        {
          num: '４',
          text: '通信回線やコンピュータ等の障害によるシステムの中断・遅滞・中止・データの消失、データへの不正アクセスにより生じた損害、その他サービスのご利用に関してユーザーに生じた損害について、宇佐神宮は一切責任を負いません。'
        }
      ],
      en: [
        {
          num: '1',
          text: 'While every effort is made to ensure the accuracy of the information published on the Usa Jingu Website (hereinafter referred to as "this Website"), Usa Jingu assumes no responsibility whatsoever for any actions taken by users using the information on this Website.'
        },
        {
          num: '2',
          text: 'Under no circumstances shall Usa Jingu be held liable for any damages or losses incurred by users as a result of accessing this Website.'
        },
        {
          num: '3',
          text: 'The content of this Website may be changed or deleted without prior notice. Thank you for your understanding.'
        },
        {
          num: '4',
          text: 'Usa Jingu assumes no responsibility for any system interruptions, delays, cancellations, loss of data due to failures in communication lines or computers, damages caused by unauthorized access to data, or any other damages incurred by users in connection with the use of this service.'
        }
      ],
      'zh-TW': [
        {
          num: '一',
          text: '儘管本網站已盡一切努力確保宇佐神宮網站（以下簡稱「本網站」）所刊載資訊的準確性，但對於使用者利用本網站資訊所進行的任何行為，宇佐神宮不承擔任何責任。'
        },
        {
          num: '二',
          text: '在任何情況下，宇佐神宮對使用者因存取本網站而遭受的任何損害或損失，均不承擔任何責任。'
        },
        {
          num: '三',
          text: '本網站內容如有更改或刪除，恕不另行通知。敬請見諒。'
        },
        {
          num: '四',
          text: '對於因通訊線路或電腦故障導致的系統中斷、延遲、中止、資料遺失，或因未經授權存取資料所造成的損害，以及使用者因使用本服務而產生的任何其他損害，宇佐神宮概不承擔任何責任。'
        }
      ],
      'zh-CN': [
        {
          num: '一',
          text: '尽管本网站已尽一切努力确保宇佐神宫网站（以下简称“本网站”）所刊载信息的准确性，但对于用户利用本网站信息所进行的任何行为，宇佐神宫不承担任何责任。'
        },
        {
          num: '二',
          text: '在任何情况下，宇佐神宫对用户因访问本网站而遭受的任何损害或损失，均不承担任何责任。'
        },
        {
          num: '三',
          text: '本网站内容如有更改或删除，恕不另行通知。敬请谅解。'
        },
        {
          num: '四',
          text: '对于因通信线路或电脑故障导致系统中断、延迟、中止、数据丢失，或因未经授权访问数据所造成的损害，以及用户因使用本服务而产生的任何其他损害，宇佐神宫概不承担任何责任。'
        }
      ],
      ko: [
        {
          num: '1',
          text: '우사 신궁 웹사이트(이하 \'당 웹사이트\')에 게재된 정보의 정확성에는 만전을 기하고 있으나, 우사 신궁은 이용자가 당 웹사이트의 정보를 사용하여 행하는 일체의 행위에 대해 어떠한 책임도 지지 않습니다.'
        },
        {
          num: '2',
          text: '우사 신궁은 이용자가 당 웹사이트에 접속함으로 인해 입은 손해 및 손실에 대해 어떠한 경우에도 일체의 책임을 지지 않습니다.'
        },
        {
          num: '3',
          text: '당 웹사이트는 예고 없이 그 내용을 변경하거나 삭제할 수 있습니다. 미리 양해 부탁드립니다.'
        },
        {
          num: '4',
          text: '통신 회선이나 컴퓨터 등의 장애로 인한 시스템 중단·지연·중지·데이터 손실, 데이터에 대한 무단 접속으로 발생한 손해, 기타 서비스 이용과 관련하여 이용자에게 발생한 손해에 대해 우사 신궁은 일체 책임지지 않습니다.'
        }
      ]
    };

    return dict[locale] || dict.ja;
  };

  const content = getDisclaimerContent();

  const labels: Record<string, Record<string, string>> = {
    ja: { title: '免責事項', subtitle: '免責事項について', home: 'ホーム' },
    en: { title: 'Disclaimer', subtitle: 'Legal Disclaimer', home: 'Home' },
    'zh-TW': { title: '免責聲明', subtitle: '關於免責聲明', home: '首頁' },
    'zh-CN': { title: '免责声明', subtitle: '关于免责声明', home: '首页' },
    ko: { title: '면책사항', subtitle: '면책사항에 대하여', home: '홈' },
  };

  const l = labels[locale] || labels.ja;

  return (
    <div className="min-h-screen" style={{ background: IVORY }}>
      {/* ── Hero ── */}
      <section className="relative h-[340px] flex items-center justify-center overflow-hidden bg-[#1a1210] select-none">
        {/* Background Pattern / Texture */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(162,122,40,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} 
        />
        <div className="relative z-10 text-center px-6 mt-[64px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 mb-6 select-none">
            <Link
              href={`/${locale}`}
              className="font-sans text-ivory/55 text-[0.62rem] tracking-widest hover:text-ivory transition-colors"
            >
              {l.home}
            </Link>
            <ChevronRight size={11} className="text-ivory/30" />
            <span className="font-sans text-gold/90 text-[0.62rem] tracking-widest">
              {l.title}
            </span>
          </nav>

          <FadeIn>
            <p className="font-sans tracking-[0.5em] mb-4" style={{ color: GOLD, fontSize: '0.75rem' }}>LEGAL NOTICE</p>
            <h1 className="font-serif text-white tracking-[0.4em] leading-tight" style={{ fontSize: '2rem' }}>
              {l.title}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-10 h-[1px] bg-[#A27A28]/50" />
              <div className="w-1.5 h-1.5 bg-[#A27A28] opacity-70 rotate-45" />
              <div className="w-10 h-[1px] bg-[#A27A28]/50" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <SectionHead en="Disclaimer" ja={l.subtitle} />
          </FadeIn>

          <div className="space-y-12 mt-16 select-text">
            {content.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="flex gap-6 items-start">
                  <span className="font-serif shrink-0 mt-1 select-none" style={{ color: GOLD, fontSize: '1.25rem' }}>
                    {item.num}
                  </span>
                  <p 
                    className="font-sans leading-[2.4] tracking-wider" 
                    style={{ color: TEXT_MID, fontSize: '0.94rem' }}
                  >
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-24">
            <FadeIn delay={0.5}>
              <DiamondRule />
            </FadeIn>
          </div>
        </div>
      </section>
      
      {/* Extra spacing */}
      <div className="h-20" />
    </div>
  );
}
