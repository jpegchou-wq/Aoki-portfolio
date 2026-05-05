'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import labsData from '@/data/labs.json';
import TextReveal from '@/components/layout/TextReveal';

export default function Labs() {
  const { language, t } = useLanguage();

  return (
    <Layout>
      <div className="pt-40 pb-40">
        <div className="asymmetric-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-32"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
              The Playground
            </span>
            <TextReveal
              text={language === 'en' ? 'Labs' : '实验室'}
              className="font-display text-6xl md:text-[10rem] font-bold tracking-tighter leading-none mb-12 text-neutral-900"
            />
            <p className="max-w-2xl text-xl text-neutral-500 leading-relaxed">
              {language === 'en' 
                ? "Experimental playground exploring future design patterns, conceptual interfaces, and unreleased ideas."
                : "探索未来设计模式、概念界面和未发布想法的实验场。"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {labsData.map((lab, index) => {
              const data = language === 'en' ? lab.en : lab.cn;
              return (
                <Link key={lab.id} href={`/labs/${lab.id}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
                      <Image
                        src={lab.thumbnail}
                        alt={data.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-all duration-700"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-display text-2xl font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                        {data.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
