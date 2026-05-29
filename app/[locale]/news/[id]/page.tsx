'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NewsDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const heroImage = "https://images.unsplash.com/photo-1766119407463-686b65d2e25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGphcGFuZXNlJTIwc2hyaW5lJTIwYXJjaGl0ZWN0dXJlJTIwcmVkJTIwdGVtcGxlfGVufDF8fHx8MTc3NDI0NjY4MHww&ixlib=rb-4.1.0&q=80&w=1080";
  const contentImage = "https://images.unsplash.com/photo-1763312262854-056705666019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjB2aXNpdGluZyUyMGphcGFuZXNlJTIwc2hyaW5lJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3NDI0NjY4NHww&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <article className="bg-[#faf9f5] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-[#1b1111]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1111] via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-4 lg:px-8 flex flex-col justify-end pb-16 lg:pb-24">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 select-none">
            <Link
              href={`/${locale}`}
              className="font-sans text-white/55 text-[0.62rem] tracking-widest hover:text-white transition-colors"
            >{t("newsIdPage_text_34653")}</Link>
            <ChevronRight size={11} className="text-white/30" />
            <Link
              href={`/${locale}/news`}
              className="font-sans text-white/55 text-[0.62rem] tracking-widest hover:text-white transition-colors"
            >{t("newsIdPage_text_25214")}</Link>
            <ChevronRight size={11} className="text-white/30" />
            <span className="font-sans text-[#c49a3a] text-[0.62rem] tracking-widest">{t("newsIdPage_text_84834")}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Meta & Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#a27a28] font-medium tracking-widest">
                <Calendar className="w-4 h-4" />
                <time dateTime="2026-02-13">{t('news[id]_text_1')}</time>
              </div>
              <h1 className="font-title-main text-3xl md:text-5xl lg:text-6xl text-white font-serif leading-tight tracking-wider">
                国宝 宇佐神宮本殿特別拝観
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 lg:px-8 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Intro Text */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-loose space-y-6">
            <p>
              宇佐神宮御本殿を期間限定で一般公開致します。瑞垣に囲まれて平素は全容を見ることが出来ない国宝の八幡造本殿を間近に参拝・拝観頂ける機会です。皆様のご参拝をお待ち致しております。<strong className="font-bold text-gray-900">{t('news[id]_text_2')}</strong>
            </p>

            {/* Detail Blocks */}
            <div className="space-y-10 mt-12">
              {/* Period */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-[#e2501f] pl-4">{t('news[id]_text_3')}</h3>
                <p className="pl-5">{t('news[id]_text_4')}</p>
              </div>

              {/* Time */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-[#e2501f] pl-4">{t('news[id]_text_5')}</h3>
                <p className="pl-5">{t('news[id]_text_6')}</p>
              </div>

              {/* Fee Table */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-[#e2501f] pl-4">{t('news[id]_text_7')}</h3>
                <div className="pl-5">
                  <table className="w-full border-collapse border border-gray-200 text-left bg-white shadow-sm">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="py-4 px-6 font-medium text-gray-700 bg-gray-50/50 w-1/2">{t('news[id]_text_8')}</th>
                        <td className="py-4 px-6 text-gray-800">{t('news[id]_text_9')}</td>
                      </tr>
                      <tr>
                        <th className="py-4 px-6 font-medium text-gray-700 bg-gray-50/50">{t('news[id]_text_10')}</th>
                        <td className="py-4 px-6 text-gray-800">{t('news[id]_text_11')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Image Block */}
              <div className="pt-8 pb-4 flex flex-col items-center">
                <div className="relative w-full max-w-md bg-gray-200 aspect-[4/3] rounded overflow-hidden shadow-md">
                   <img
                    src={contentImage} 
                    alt={t('news[id]_text_12')} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 font-medium tracking-wide">{t("newsIdPage_text_72653")}</p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-[#e2501f] pl-4">{t('news[id]_text_13')}</h3>
                <ul className="pl-5 space-y-1">
                  <li>{t('news[id]_text_14')}</li>
                </ul>
              </div>

              {/* Prohibitions */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-[#e2501f] pl-4">{t('news[id]_text_15')}</h3>
                <ul className="pl-5 space-y-2 text-gray-700">
                  <li>{t('news[id]_text_16')}</li>
                  <li>{t('news[id]_text_17')}</li>
                  <li>{t('news[id]_text_18')}</li>
                  <li>{t('news[id]_text_19')}</li>
                  <li>{t('news[id]_text_20')}</li>
                  <li>{t('news[id]_text_21')}</li>
                  <li>{t('news[id]_text_22')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-20 pt-10 border-t border-gray-200 flex justify-center">
            <Link 
              href={`/${locale}/news`} 
              className="inline-flex items-center gap-2 text-[#e2501f] font-medium tracking-wider hover:text-[#c43e14] transition-colors group px-6 py-3 border border-transparent hover:border-[#e2501f] rounded-full"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{t("newsIdPage_text_49628")}</Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
