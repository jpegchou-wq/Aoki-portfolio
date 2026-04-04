'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import PersonalIntro from '@/components/about/PersonalIntro';
import CapabilitySections from '@/components/about/CapabilitySections';
import CareerTimeline from '@/components/about/CareerTimeline';
import SkillsOverview from '@/components/home/SkillsOverview';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-14 md:pb-16 min-h-screen overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_8%,rgba(71,186,255,0.14),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(255,92,188,0.12),transparent_40%)]" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-center mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-button text-xs font-semibold text-black/70 uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              <span>Profile</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold tracking-[-0.04em] text-black mb-4 sm:mb-6">
              {t('nav.me')}
            </h1>
          </motion.div>
        </div>

        <PersonalIntro />

        <CapabilitySections />

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <CareerTimeline
                title={t('about.education')}
                items={data.education.map((edu: any) => ({
                  title: edu.school,
                  subtitle: edu.degree,
                  duration: edu.duration,
                }))}
              />

              <CareerTimeline
                title={t('about.experience')}
                items={data.experience.map((exp: any) => ({
                  title: exp.position,
                  subtitle: exp.company,
                  duration: exp.duration,
                  description: exp.description,
                  tags: exp.tags,
                }))}
              />
            </div>
          </div>
        </section>

        <div className="bg-white/25 py-12 border-y border-white/45 backdrop-blur-md">
          <SkillsOverview />
        </div>
      </div>
    </Layout>
  );
}
