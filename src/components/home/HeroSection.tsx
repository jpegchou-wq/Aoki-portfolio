'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [activeFocus, setActiveFocus] = useState<'brand' | 'ux' | 'growth' | 'tech'>('brand');

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches || !sectionRef.current) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width) * 100;
    const nextY = ((event.clientY - rect.top) / rect.height) * 100;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setPointer({ x: Math.max(0, Math.min(100, nextX)), y: Math.max(0, Math.min(100, nextY)) });
    });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 50, y: 50 });
  };

  const offsetX = (pointer.x - 50) * 0.3;
  const offsetY = (pointer.y - 50) * 0.3;
  const focusMap = {
    en: {
      brand: {
        label: 'Brand Visual',
        title: 'Brand Narrative & Visual System',
        description: 'From strategy to campaign assets, building a consistent visual language across channels.',
        score: 96,
      },
      ux: {
        label: 'UI/UX',
        title: 'Product Experience & Interaction',
        description: 'Designing clean flows and clear information architecture for complex digital products.',
        score: 94,
      },
      growth: {
        label: 'Growth Design',
        title: 'Marketing Conversion Design',
        description: 'Using landing page structure, ad creatives, and testing mindset to improve conversion.',
        score: 91,
      },
      tech: {
        label: 'Design x Tech',
        title: 'Cross-functional Delivery',
        description: 'Bridging design and engineering to reduce communication loss and speed up execution.',
        score: 89,
      },
    },
    cn: {
      brand: {
        label: '品牌视觉',
        title: '品牌叙事与视觉系统',
        description: '从策略到传播物料，构建跨触点一致的品牌视觉语言。',
        score: 96,
      },
      ux: {
        label: 'UI/UX',
        title: '产品体验与交互设计',
        description: '在复杂业务里梳理清晰流程与信息结构，提升可用性与效率。',
        score: 94,
      },
      growth: {
        label: '增长设计',
        title: '营销转化导向设计',
        description: '通过落地页结构、广告素材与实验迭代，持续提升转化表现。',
        score: 91,
      },
      tech: {
        label: '设计 x 技术',
        title: '跨职能协同落地',
        description: '打通设计与开发协作链路，减少沟通损耗并提升交付速度。',
        score: 89,
      },
    },
  } as const;
  const active = focusMap[language === 'en' ? 'en' : 'cn'][activeFocus];
  const focusKeys: Array<'brand' | 'ux' | 'growth' | 'tech'> = ['brand', 'ux', 'growth', 'tech'];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(38,173,255,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,74,163,0.18),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(95,130,255,0.14),transparent_40%)]" />

      <div className="absolute inset-0 z-0">
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 left-[5%] h-[18rem] w-[18rem] md:h-[28rem] md:w-[28rem] rounded-full bg-cyan-300/30 blur-[80px] md:blur-[120px]"
          style={{ transform: `translate3d(${offsetX * 0.35}px, ${offsetY * 0.35}px, 0)` }}
        />
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -35, 0],
                  y: [0, 30, 0],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] right-[-8%] h-[16rem] w-[16rem] md:h-[24rem] md:w-[24rem] rounded-full bg-fuchsia-300/25 blur-[90px] md:blur-[120px]"
          style={{ transform: `translate3d(${-offsetX * 0.35}px, ${-offsetY * 0.35}px, 0)` }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 sm:gap-10 lg:gap-8 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 glass-button rounded-full px-4 py-2 mb-6 text-sm tracking-wide text-black/80"
            >
              <motion.span
                animate={reduceMotion ? {} : { rotate: [0, 16, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                aria-hidden="true"
              >
                👋
              </motion.span>
              <span>{t('hero.greeting')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-black mb-4 sm:mb-5"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-2xl md:text-3xl text-black/85 max-w-2xl leading-snug mb-6 sm:mb-8"
            >
              {data.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-sm sm:text-lg text-black/70 max-w-xl leading-relaxed mb-8 sm:mb-10"
            >
              {data.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {focusKeys.map((key) => {
                const item = focusMap[language === 'en' ? 'en' : 'cn'][key];
                const activeClass =
                  activeFocus === key
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white/55 text-black/70 border-white/70 hover:bg-white/80';
                return (
                  <button
                    key={key}
                    type="button"
                    onMouseEnter={() => setActiveFocus(key)}
                    onClick={() => setActiveFocus(key)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${activeClass}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="/projects"
                className="px-8 py-3.5 glass-button rounded-full text-black font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              >
                {t('hero.cta')}
              </a>
              <a
                href="/contact"
                className="px-8 py-3.5 vision-button rounded-full text-black/90 font-medium hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                {t('hero.contact')}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none mt-2 sm:mt-0"
          >
            <div className="glass-card rounded-[2rem] p-5 md:p-6 border-white/60 shadow-[0_20px_55px_rgba(22,30,60,0.18)]">
              <div className="flex items-center gap-4 sm:gap-5 mb-5">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/60 bg-white/30">
                  <Image
                    src={personalData.avatar}
                    alt={data.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-black/50 mb-1">
                    {language === 'en' ? 'UI/UX Focus' : 'UI/UX 设计聚焦'}
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold text-black/90 leading-tight">
                    {active.title}
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed mb-6">
                {active.description}
              </p>
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs text-black/55 mb-2">
                  <span>{language === 'en' ? 'Focus Match' : '能力匹配度'}</span>
                  <span>{active.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                  <motion.div
                    key={activeFocus}
                    initial={{ width: 0 }}
                    animate={{ width: `${active.score}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/45 border border-white/60 px-4 py-3">
                  <p className="text-black/50 mb-1">{language === 'en' ? 'Email' : '邮箱'}</p>
                  <p className="text-black/85">{data.email}</p>
                </div>
                <div className="rounded-xl bg-white/45 border border-white/60 px-4 py-3">
                  <p className="text-black/50 mb-1">{language === 'en' ? 'Phone' : '电话'}</p>
                  <p className="text-black/85">{data.phone}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border border-black/20 flex justify-center p-1 bg-white/30 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-black/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
