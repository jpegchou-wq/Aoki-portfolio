'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import CapabilitySections from '@/components/about/CapabilitySections';
import CareerTimeline from '@/components/about/CareerTimeline';
import SkillsOverview from '@/components/home/SkillsOverview';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TextReveal from '@/components/layout/TextReveal';
import Magnetic from '@/components/layout/Magnetic';

export default function About() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  const timelineItems = React.useMemo(() => {
    const experience = (data.experience ?? []).map((exp: any) => ({
      title: exp.position,
      subtitle: exp.company,
      duration: exp.duration,
      description: exp.description,
      tags: exp.tags,
    }));

    const education = (data.education ?? []).map((edu: any) => ({
      title: edu.school,
      subtitle: edu.degree,
      duration: edu.duration,
      tags: [language === 'en' ? 'Education' : '教育背景'],
    }));

    return [...experience, ...education];
  }, [data.education, data.experience, language]);

  return (
    <Layout>
      <div className="pt-40 pb-40">
        <div className="asymmetric-container">
          {/* About Hero - Avant-garde & Asymmetrical */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-40">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] group">
                <Image
                  src={personalData.avatar}
                  alt={data.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-neutral-200" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">Profile Image</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-7 lg:pt-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-neon bg-neutral-900 px-3 py-1 rounded-sm">BIO</span>
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">The Designer</span>
              </div>
              
              <h1 className="experimental-title text-neutral-900">
                {data.name.split(' ').map((part, i) => (
                  <span key={i} className={`block ${i === 1 ? 'lg:ml-24 text-outline' : ''}`}>
                    {part}
                  </span>
                ))}
              </h1>

              <div className="max-w-2xl">
                <TextReveal
                  text={data.bio}
                  className="text-xl md:text-2xl text-neutral-500 leading-relaxed mb-12"
                  delay={0.3}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16 border-t border-neutral-100 pt-12">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-4">Location</h4>
                    <p className="text-xl font-bold text-neutral-900 tracking-tight">{t('about.location')}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-4">Email</h4>
                    <p className="text-xl font-bold text-neutral-900 tracking-tight break-all">{data.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <Magnetic strength={0.2}>
                    <Link href="/projects" className="neon-button">
                      {t('hero.cta')}
                    </Link>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link href="/contact" className="px-10 py-4 border border-neutral-200 text-neutral-900 rounded-full text-sm font-bold uppercase tracking-widest hover:border-neutral-900 transition-colors">
                      {t('hero.contact')}
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="py-40 border-t border-neutral-100">
            <CapabilitySections />
          </div>

          <div className="py-40 border-t border-neutral-100">
            <div className="max-w-4xl">
              <CareerTimeline title={t('about.experience')} items={timelineItems} />
            </div>
          </div>

          <div className="py-40 border-t border-neutral-100">
            <SkillsOverview />
          </div>
        </div>
      </div>
      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px #171717;
          color: transparent;
        }
      `}</style>
    </Layout>
  );
}
