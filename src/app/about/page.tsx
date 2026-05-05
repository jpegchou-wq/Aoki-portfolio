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
          {/* About Hero - Asymmetrical */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-40">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] border-2 border-neutral-900 group">
                <Image
                  src={personalData.avatar}
                  alt={data.name}
                  fill
                  priority
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-neutral-200 -z-10 group-hover:-bottom-4 group-hover:-right-4 transition-all" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 block">
                The Designer
              </span>
              <TextReveal
                text={data.name}
                className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-12 text-neutral-900"
              />
              <p className="text-2xl md:text-3xl text-neutral-900 leading-tight font-display mb-12">
                {data.title}
              </p>
              <TextReveal
                text={data.bio}
                className="text-xl text-neutral-500 leading-relaxed mb-12 max-w-xl"
                delay={0.3}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">Location</span>
                  <p className="font-display font-bold">{t('about.location')}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">Email</span>
                  <p className="font-display font-bold">{data.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  href="/projects"
                  className="px-12 py-4 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-neon hover:text-black transition-colors"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  href="/contact"
                  className="px-12 py-4 border border-neutral-200 font-mono text-xs uppercase tracking-widest hover:border-neutral-900 transition-colors"
                >
                  {t('hero.contact')}
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="py-40 border-t border-neutral-200">
            <CapabilitySections />
          </div>

          <div className="py-40 border-t border-neutral-200">
            <CareerTimeline title={t('about.experience')} items={timelineItems} />
          </div>

          <div className="py-40 border-t border-neutral-200">
            <SkillsOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
