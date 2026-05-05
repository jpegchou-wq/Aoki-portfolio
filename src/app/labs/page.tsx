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
      <div className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 tracking-tight">
              {language === 'en' ? 'Labs' : '实验室'}
            </h1>
            <p className="max-w-2xl text-lg text-neutral-500 leading-relaxed">
              {language === 'en' 
                ? "Experimental playground exploring future design patterns, conceptual interfaces, and unreleased ideas."
                : "探索未来设计模式、概念界面和未发布想法的实验场。"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {labsData.map((lab, index) => {
              const data = language === 'en' ? lab.en : lab.cn;
              return (
                <Link key={lab.id} href={`/labs/${lab.id}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                      <Image
                        src={lab.thumbnail}
                        alt={data.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {data.title}
                      </h3>
                      <p className="text-neutral-500 leading-relaxed max-w-md">
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
