'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '@/components/layout/Magnetic';
import CareerTimeline from '@/components/about/CareerTimeline';
import CapabilitySections from '@/components/about/CapabilitySections';

export default function About() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;
  
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 1000], [0, 150]);

  const timelineItems = data.experience.map((exp: any) => ({
    title: exp.position,
    subtitle: exp.company,
    duration: exp.duration,
    description: exp.description,
    tags: exp.tags,
  }));

  return (
    <Layout>
      <div className="page-shell">
        <div className="asymmetric-container">
          <div className="page-hero">
            <div className="page-kicker">
              {t('aboutPage.archive')}
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="page-title">
                {language === 'en' ? 'About' : '关于我'}
                <span className="text-outline block lg:ml-12 lg:inline">Aoki</span>
              </h1>
            </div>
          </div>

          <div className="mb-28 grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.2fr)] lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div 
                style={{ y: imgY }}
                className="brutalist-frame relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-4"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={personalData.avatar}
                    alt={data.name}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neon/10 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              </motion.div>
              
              <div className="mt-8 flex items-center gap-4">
                <span className="meta-pill">PERSONAL ARCHIVE — 001</span>
                <span className="font-mono-tech text-neutral-400">{data.title}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:pt-6"
            >
              <div className="mb-10 flex flex-wrap gap-4">
                <span className="meta-pill">{t('about.location')}</span>
                <span className="meta-pill">{t('aboutPage.marketTags')}</span>
                <span className="meta-pill">{language === 'en' ? 'UI / UX / VIS' : 'UI / UX / VIS'}</span>
              </div>

              <div className="detail-card mb-8">
                <p className="section-title text-2xl font-medium leading-tight text-brand-dark/85 md:text-4xl">
                  {data.bio}
                </p>
              </div>

              <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="detail-card space-y-3">
                  <span className="panel-label">{t('aboutPage.currentLocation')}</span>
                  <p className="panel-title mt-1">{t('about.location')}</p>
                </div>
                <div className="detail-card space-y-3">
                  <span className="panel-label">{t('aboutPage.digitalChannel')}</span>
                  <p className="email-display mt-1 break-all text-[1.55rem] md:text-[2rem]">{data.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <Magnetic strength={0.3}>
                  <Link href="/projects" className="neon-button">
                    {t('hero.cta')}
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link href="/contact" className="ghost-button">
                    {t('hero.contact')}
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-black/10 py-20 md:py-24">
            <div className="detail-card">
              <CapabilitySections />
            </div>
          </div>

          <div className="border-t border-black/10 py-20 md:py-24">
            <div className="max-w-5xl">
              <div className="detail-card">
                <CareerTimeline title={t('about.experience')} items={timelineItems} />
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 py-20 md:py-24">
            <div className="max-w-5xl">
              <div className="detail-card">
                <CareerTimeline
                  title={t('about.education')}
                  items={data.education.map((edu: any) => ({
                    title: edu.school,
                    subtitle: edu.degree,
                    duration: edu.duration,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
