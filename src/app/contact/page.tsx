'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Magnetic from '@/components/layout/Magnetic';

export default function Contact() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <div className="page-shell">
        <div className="asymmetric-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="page-hero">
            <div className="page-kicker">{t('contact.hello')}</div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="page-title">
              {language === 'en' ? "Let's" : '保持'}
              <span className="text-outline block lg:inline lg:ml-8">{t('contact.connect')}</span>
              </h1>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:gap-16">
            <div className="space-y-8">
              <div className="detail-card space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="panel-label">{t('contact.email')}</h4>
                  <Magnetic strength={0.1}>
                    <a href={`mailto:${data.email}`} className="email-display break-all text-[2rem] transition-colors hover:text-neon md:text-[3.4rem] lg:text-[4.2rem]">
                      {data.email}
                    </a>
                  </Magnetic>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <h4 className="panel-label">{t('contact.phone')}</h4>
                  <p className="section-title text-3xl md:text-5xl">
                    {data.phone}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="border-t border-black/10 pt-8"
                >
                  <div className="mt-2 flex flex-wrap gap-4">
                  {Object.entries(personalData.socials as Record<string, string>).map(([key, url]) => (
                    <Magnetic key={key} strength={0.2}>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="meta-pill hover:border-brand-dark hover:text-brand-dark"
                      >
                        {key}
                      </a>
                    </Magnetic>
                  ))}
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="detail-card space-y-3">
                  <span className="panel-label">{t('contact.responseRhythm')}</span>
                  <p className="panel-title mt-1 text-xl md:text-2xl">
                    {t('contact.responseValue')}
                  </p>
                </div>
                <div className="detail-card space-y-3">
                  <span className="panel-label">{t('contact.bestFit')}</span>
                  <p className="panel-title mt-1 text-xl md:text-2xl">
                    {t('contact.bestFitValue')}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:pt-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="detail-card group aspect-square relative overflow-hidden rounded-[2rem] p-6">
                  <Image 
                    src={data.wechat_qr}
                    alt="WeChat"
                    fill
                    className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-neutral-400">{t('contact.wechatId')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6 lg:mt-12"
              >
                <div className="detail-card group aspect-square relative overflow-hidden rounded-[2rem] p-6">
                  <Image 
                    src={data.whatsapp_qr}
                    alt="WhatsApp"
                    fill
                    className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-neutral-400">WhatsApp</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
