'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '../layout/Magnetic';

const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, 120]);

  const scrollToProjects = () => {
    document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <section className="relative overflow-hidden border-b border-black/10 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      <div className="absolute right-[10%] top-[14%] h-28 w-28 rounded-full bg-neon/65 blur-3xl" />
      <div className="absolute left-[8%] bottom-[10%] h-24 w-24 rounded-full bg-white/80 blur-3xl" />

      <div className="asymmetric-container relative z-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="meta-pill bg-neon/90 text-white">
              {language === 'en' ? 'Available for selected projects' : '开放限量合作中'}
            </span>
            <span className="font-mono-tech text-neutral-500">
              {language === 'en' ? 'Shenzhen / Remote / Cross-market' : '深圳 / 远程 / 多市场协作'}
            </span>
          </div>
          <span className="font-mono-tech text-neutral-400">
            {language === 'en' ? 'UI / UX / Brand / Launch' : 'UI / UX / 品牌 / 落地'}
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.12fr)] lg:gap-14">
          <motion.div
            style={{ y: portraitY }}
            className="order-1 brutalist-frame overflow-hidden rounded-[2.5rem] p-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/6]">
              <Image
                src={personalData.avatar}
                alt={language === 'en' ? 'Aoki portrait' : 'Aoki 头像'}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <div className="content-panel bg-white/70 p-4">
                  <span className="panel-label mb-2">{t('common.role')}</span>
                  <p className="panel-title text-xl md:text-2xl">{data.title}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="order-2 space-y-8 md:space-y-10 lg:pl-4">
            <div className="space-y-5">
              <div className="page-kicker mb-0">
                {language === 'en' ? 'Visual Designer / Portfolio' : '视觉设计师 / 作品集'}
              </div>
              <h1 className="text-[clamp(2.8rem,7vw,6.6rem)] font-heading font-extrabold uppercase leading-[0.88] tracking-[-0.08em] text-brand-dark">
                {data.name}
              </h1>
            </div>

            <div className="content-panel max-w-4xl bg-white/60">
              <p className="text-lg font-heading font-medium leading-[1.24] tracking-tight text-brand-dark/88 md:text-[1.45rem]">
                {data.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="meta-pill">{data.title}</span>
              <span className="meta-pill">{t('about.location')}</span>
              <span className="meta-pill">{language === 'en' ? 'UI / UX / Visual' : 'UI / UX / 视觉'}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="detail-card space-y-3">
                <span className="panel-label">{language === 'en' ? 'Direction' : '方向'}</span>
                <p className="panel-title text-xl md:text-2xl">
                  {language === 'en' ? 'Brand systems with digital clarity.' : '清晰克制的品牌与数字系统表达。'}
                </p>
              </div>
              <div className="detail-card space-y-3">
                <span className="panel-label">{language === 'en' ? 'Approach' : '方法'}</span>
                <p className="panel-title">
                  {language === 'en' ? 'Visual thinking, interaction rhythm, launch-ready detail.' : '视觉思考、交互节奏与可落地细节。'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Magnetic strength={0.25}>
                <button onClick={scrollToProjects} className="neon-button group w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {language === 'en' ? 'Explore Projects' : '查看项目'}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-all group-hover:bg-black group-hover:text-neon">
                      <ArrowDownRight size={16} />
                    </div>
                  </span>
                </button>
              </Magnetic>

              <Magnetic strength={0.18}>
                <button
                  onClick={goToContact}
                  className="ghost-button flex w-full gap-3 sm:w-auto"
                >
                  {language === 'en' ? 'Start a Conversation' : '发起合作'}
                  <ArrowUpRight size={16} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
