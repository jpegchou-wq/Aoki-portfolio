'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Vision Pro style blurred background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] bg-purple-200/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-blue-100/30 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-32 h-32 md:w-48 md:h-48 mb-10 rounded-[1.75rem] p-1 glass-card overflow-hidden group"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-black/40 mb-4">
            {t('hero.greeting')}
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black/90 mb-6">
            {data.name}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-black/50 mb-12 max-w-2xl font-light leading-relaxed"
        >
          {data.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/projects"
            className="px-10 py-4 glass-button rounded-full text-black font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            {t('hero.cta')}
          </a>
          <a
            href="/contact"
            className="px-10 py-4 vision-button rounded-full text-black/70 font-medium hover:text-black hover:-translate-y-0.5"
          >
            {t('hero.contact')}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border border-black/10 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-black/20 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
