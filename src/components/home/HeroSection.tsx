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
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Main Title - Clean & Centered */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
                {language === 'en' ? 'Visual Designer & Developer' : '全栈视觉设计师'}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 leading-tight">
                {data.name}
              </h1>
              
              <div className="mt-10 flex items-center gap-6">
                <Magnetic strength={0.4}>
                  <button className="px-8 py-4 bg-neutral-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                    {language === 'en' ? 'Explore Works' : '查看作品'}
                  </button>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          {/* Bio - Clean & Balanced */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TextReveal 
                text={data.bio} 
                className="text-xl md:text-2xl text-neutral-500 leading-relaxed" 
                delay={0.5}
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative elements - Simple & Elegant */}
        <div className="mt-32 pt-8 border-t border-neutral-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neutral-900 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Available for projects</span>
          </div>
          <div className="hidden md:flex gap-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Strategy</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Design</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Development</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
