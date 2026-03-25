'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import labsData from '@/data/labs.json';

export default function Labs() {
  const { language, t } = useLanguage();

  return (
    <Layout>
      <div className="pt-32 pb-24 overflow-hidden min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black/90 mb-6">
              {t('nav.labs')}
            </h1>
            <p className="text-lg md:text-xl text-black/40 font-light leading-relaxed max-w-2xl mx-auto">
              {language === 'en' 
                ? "Experimental playground exploring future design patterns, conceptual interfaces, and unreleased ideas."
                : "探索未来设计模式、概念界面和未发布想法的实验场。"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {labsData.map((lab, index) => {
              const data = language === 'en' ? lab.en : lab.cn;
              return (
                <Link key={lab.id} href={`/labs/${lab.id}`} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden glass-card p-2">
                      <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-black">
                        <Image
                          src={lab.thumbnail}
                          alt={data.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      </div>
                      
                      <div className="absolute bottom-10 left-10 right-10 z-10">
                        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          {lab.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white/70 uppercase tracking-widest">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                          {data.title}
                        </h3>
                        <p className="text-white/60 font-light text-sm line-clamp-2 max-w-md group-hover:translate-x-2 transition-transform duration-500 delay-75">
                          {data.description}
                        </p>
                      </div>

                      <div className="absolute top-8 right-8 z-10 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-[10px] text-purple-200 uppercase tracking-[0.2em]">
                        Experimental
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Decorative background for Labs */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 right-0 w-[60vw] h-[60vw] bg-purple-100/30 rounded-full blur-[150px]" 
          />
        </div>
      </div>
    </Layout>
  );
}
