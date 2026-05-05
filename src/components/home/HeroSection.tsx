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
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12">
      {/* Background elements with parallax */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] bg-neon/10 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <div className="asymmetric-container relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-0">
          
          {/* Main Title - Asymmetrical & Bold */}
          <div className="w-full lg:w-2/3">
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
                {language === 'en' ? 'Visual Designer & Developer' : '全栈视觉设计师'}
              </span>
              <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter text-neutral-900">
                {data.name.split(' ').map((part, i) => (
                  <span key={i} className={i === 1 ? 'block ml-[0.1em] text-outline' : 'block'}>
                    {part}
                  </span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Bio - Offset & Smaller */}
          <div className="w-full lg:w-1/3 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-6 top-0 w-px h-full bg-neutral-300 hidden lg:block" />
              <TextReveal 
                text={data.bio} 
                className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-sm" 
                delay={0.5}
              />
              
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-12 bg-neon" />
                <Magnetic strength={0.4}>
                  <button className="font-mono text-sm uppercase tracking-widest hover:text-neon transition-colors">
                    {language === 'en' ? 'Scroll to explore' : '向下探索'}
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements - Brutalist influence */}
        <div className="grid grid-cols-12 gap-4 mt-24">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="col-span-8 h-px bg-neutral-900 origin-left" 
          />
          <div className="col-span-4 flex justify-end items-center gap-2">
            <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase text-neutral-400">Available for projects</span>
          </div>
        </div>

        {/* Floating experimental typography or mixed media with parallax */}
        <div className="relative mt-12 h-32 hidden md:block">
          <motion.div
            style={{ x: y1, opacity, WebkitTextStroke: '1px black', color: 'transparent' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute right-0 top-0 font-display text-[15rem] font-bold italic select-none pointer-events-none whitespace-nowrap"
          >
            EXPERIMENTAL
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
