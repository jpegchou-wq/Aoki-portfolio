'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import labsData from '@/data/labs.json';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '@/components/layout/Magnetic';

export default function Labs() {
  const { language, t } = useLanguage();

  return (
    <Layout>
      <div className="page-shell">
        <div className="asymmetric-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="page-hero">
            <div className="page-kicker">{t('labs.heroKicker')}</div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="page-title">
              {t('labs.heroTitle')}
              <span className="text-outline block lg:inline lg:ml-8">{t('labs.heroOutline')}</span>
              </h1>
              <p className="page-summary">
                {t('labs.heroSummary')}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-y-20">
            {labsData.map((lab, index) => {
              const data = language === 'en' ? lab.en : lab.cn;
              return (
                <Link key={lab.id} href={`/labs/${lab.id}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="space-y-10"
                  >
                    <Magnetic strength={0.1}>
                      <div className="interactive-tile relative aspect-[16/11] overflow-hidden rounded-[2.2rem]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full"
                        >
                          <Image
                            src={lab.thumbnail}
                            alt={data.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="meta-pill bg-brand-light/90 text-brand-dark">
                            Exp. {lab.id}
                          </div>
                        </div>
                      </div>
                    </Magnetic>
                    
                    <div className="content-panel max-w-lg space-y-4">
                      <div className="page-kicker before:w-8 mb-0">{t('labs.note')}</div>
                      <h3 className="text-3xl font-heading font-bold tracking-tight text-brand-dark transition-colors group-hover:text-neutral-500">
                        {data.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-neutral-500">{data.description}</p>
                      <div className="pt-4">
                        <span className="border-b-2 border-neon pb-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">
                          {t('labs.viewExperiment')}
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
