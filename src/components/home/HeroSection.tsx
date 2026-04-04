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

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-14 md:pt-32 md:pb-20"
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
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 items-center">
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
              className="text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-black mb-5"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-xl sm:text-2xl md:text-3xl text-black/85 max-w-2xl leading-tight mb-8"
            >
              {data.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base sm:text-lg text-black/70 max-w-xl leading-relaxed mb-10"
            >
              UI/UX, visual storytelling, and brand systems with a soft, high-fidelity glass aesthetic.
            </motion.p>

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
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="glass-card rounded-[2rem] p-4 md:p-5 border-white/60 shadow-[0_20px_55px_rgba(22,30,60,0.18)]">
              <div className="relative overflow-hidden rounded-[1.45rem] h-[250px] sm:h-[330px] md:h-[380px] bg-[linear-gradient(140deg,rgba(255,255,255,0.65),rgba(255,255,255,0.18))]">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 20% 20%, rgba(34,196,255,0.4), transparent 35%), radial-gradient(circle at 85% 15%, rgba(255,97,199,0.38), transparent 38%), radial-gradient(circle at 55% 75%, rgba(79,122,255,0.32), transparent 42%)',
                    transform: `translate3d(${offsetX * -0.25}px, ${offsetY * -0.25}px, 0)`,
                  }}
                />
                <div className="absolute top-4 left-4 right-4 h-10 rounded-xl bg-white/55 backdrop-blur-md border border-white/60 flex items-center px-3 gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4">
                  <p className="text-xs text-black/70 uppercase tracking-[0.18em] mb-2">Desktop Mockup</p>
                  <p className="text-lg font-medium text-black">Visual hierarchy, storytelling, and premium UI direction.</p>
                </div>
              </div>
            </div>

            <motion.div
              animate={reduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-1 sm:-right-6 w-[150px] sm:w-[190px] md:w-[220px] glass-card rounded-[1.6rem] p-3 md:p-4 border-white/60 shadow-[0_12px_28px_rgba(14,24,48,0.18)]"
              style={{ transform: `translate3d(${offsetX * -0.15}px, ${offsetY * -0.15}px, 0)` }}
            >
              <div className="rounded-[1.1rem] h-[210px] sm:h-[250px] md:h-[280px] border border-white/50 bg-[linear-gradient(160deg,rgba(255,255,255,0.65),rgba(255,255,255,0.18))] p-3">
                <div className="h-5 w-14 rounded-full bg-black/10 mb-3" />
                <div className="h-24 rounded-xl bg-white/60 mb-3" />
                <div className="h-3 rounded-full bg-black/15 mb-2" />
                <div className="h-3 w-4/5 rounded-full bg-black/10 mb-2" />
                <div className="h-8 rounded-xl bg-white/70 mt-4" />
                <p className="text-[10px] md:text-xs text-black/65 tracking-[0.12em] uppercase mt-3">Mobile Mockup</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="absolute top-[6.5rem] right-4 md:right-8 hidden xl:block w-28 h-28 rounded-[1.25rem] p-1 glass-card overflow-hidden group border-white/55"
        >
          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
            <Image
              src={personalData.avatar}
              alt={data.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </motion.div>
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
