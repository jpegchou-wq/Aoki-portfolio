'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const PersonalIntro: React.FC = () => {
  const { language } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-14 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-5/12 relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] p-2 glass-card overflow-hidden border-white/65">
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-inner">
                <Image
                  src={personalData.avatar}
                  alt={data.name}
                  fill
                  className="object-cover scale-105"
                />
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-300/25 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="w-full md:w-7/12"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-black mb-6">
              {data.name}
            </h2>
            <h3 className="text-xl md:text-2xl text-black/75 font-medium mb-8">
              {data.title}
            </h3>
            <p className="text-lg md:text-xl text-black/65 font-light leading-relaxed mb-12 italic">
              &ldquo;{data.bio}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PersonalIntro;
