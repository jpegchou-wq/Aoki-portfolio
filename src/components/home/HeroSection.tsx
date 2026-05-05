'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '../layout/Magnetic';
import TextReveal from '../layout/TextReveal';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20">
      {/* Avant-garde Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[15%] left-[-5%] w-[30vw] h-[30vw] bg-neon/10 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-neutral-200/50 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <div className="asymmetric-container relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          
          {/* Main Title - Experimental & Asymmetrical */}
          <div className="w-full lg:w-[60%]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-neon" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">
                  {language === 'en' ? 'Digital Designer & Developer' : '全栈视觉设计师'}
                </span>
              </div>
              
              <h1 className="experimental-title text-neutral-900">
                {data.name.split(' ').map((part, i) => (
                  <span key={i} className={`block ${i === 1 ? 'lg:ml-24 text-outline' : ''}`}>
                    {part}
                  </span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Bio - Balanced but offset */}
          <div className="w-full lg:w-[35%] lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-8 top-0 w-[1px] h-full bg-neutral-200 hidden lg:block" />
              <TextReveal 
                text={data.bio} 
                className="text-xl md:text-2xl text-neutral-500 leading-tight font-medium" 
                delay={0.5}
              />
              
              <div className="mt-12">
                <Magnetic strength={0.3}>
                  <button className="neon-button group">
                    <span className="relative z-10">{language === 'en' ? 'Explore Portfolio' : '查看作品'}</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Parallax Typography */}
        <motion.div
          style={{ x: y3, opacity }}
          className="absolute left-0 bottom-10 font-display text-[12vw] font-bold text-neutral-100/50 select-none pointer-events-none whitespace-nowrap z-0 -ml-20"
        >
          AVANT-GARDE — 2026 — CONCEPT
        </motion.div>
      </div>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px #171717;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
