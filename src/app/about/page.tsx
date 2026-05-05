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
      <div className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* About Hero - Clean & Balanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={personalData.avatar}
                  alt={data.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
                {data.name}
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                {data.bio}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-2">Location</h4>
                  <p className="font-medium text-neutral-900">{t('about.location')}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-2">Email</h4>
                  <p className="font-medium text-neutral-900">{data.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-neutral-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-neutral-200 text-neutral-900 rounded-full text-sm font-bold uppercase tracking-widest hover:border-neutral-900 transition-colors"
                >
                  {t('hero.contact')}
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="py-24 border-t border-neutral-100">
            <CapabilitySections />
          </div>

          <div className="py-24 border-t border-neutral-100">
            <CareerTimeline title={t('about.experience')} items={timelineItems} />
          </div>

          <div className="py-24 border-t border-neutral-100">
            <SkillsOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
