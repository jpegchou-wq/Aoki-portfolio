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
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-2 border-neutral-900">
                      <Image
                        src={lab.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute top-4 right-4 bg-neon text-black font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                        Exp. {lab.id}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {lab.technologies.map((tech) => (
                          <span key={tech} className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                            #{tech}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight group-hover:text-neon transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-neutral-500 leading-relaxed max-w-md">
                        {data.description}
                      </p>
                      <div className="pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] border-b border-neutral-200 group-hover:border-neon transition-colors">
                          View Experiment
                        </span>
                      </div>
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
