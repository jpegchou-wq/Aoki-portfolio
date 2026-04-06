'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import CapabilitySections from '@/components/about/CapabilitySections';
import CareerTimeline from '@/components/about/CareerTimeline';
import SkillsOverview from '@/components/home/SkillsOverview';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

    const anchorIndex = (data.experience ?? []).findIndex((exp: any) => {
      const company = String(exp.company ?? '');
      return company.includes('Kunming Jinde') || company.includes('金德');
    });

    if (anchorIndex === -1) {
      return [...experience, ...education];
    }

    return [...experience.slice(0, anchorIndex + 1), ...education, ...experience.slice(anchorIndex + 1)];
  }, [data.education, data.experience, language]);

  return (
    <Layout>
      <div className="pt-24 md:pt-32 pb-14 md:pb-16 min-h-screen overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_8%,rgba(71,186,255,0.14),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(255,92,188,0.12),transparent_40%)]" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            aria-labelledby="about-hero-title"
            className="mb-12 sm:mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div className="glass-card w-full max-w-[420px] lg:max-w-[330px] rounded-[2rem] p-4 sm:p-5 border-white/65 shadow-[0_20px_55px_rgba(22,30,60,0.16)]">
                  <div className="relative w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-white/60 bg-white/30">
                    <Image
                      src={personalData.avatar}
                      alt={data.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-black/50">{t('nav.me')}</p>
                    <h1
                      id="about-hero-title"
                      className="text-2xl sm:text-3xl lg:text-3xl font-semibold tracking-[-0.03em] text-black/90 mt-2"
                    >
                      {data.name}
                    </h1>
                    <p className="text-sm sm:text-base text-black/70 font-medium mt-2">{data.title}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-button text-xs font-semibold text-black/70 uppercase tracking-widest mb-6">
                  <Sparkles size={12} />
                  <span>Profile</span>
                </div>
                <p className="text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl line-clamp-2 font-light italic">
                  &ldquo;{data.bio}&rdquo;
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-xl bg-white/45 border border-white/60 px-4 py-3">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-black/45 mb-1">
                      {language === 'en' ? 'Location' : '地点'}
                    </p>
                    <p className="text-sm text-black/80 font-medium">{t('about.location')}</p>
                  </div>
                  <div className="rounded-xl bg-white/45 border border-white/60 px-4 py-3">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-black/45 mb-1">
                      {t('about.email')}
                    </p>
                    <p className="text-sm text-black/80 font-medium truncate">{data.email}</p>
                  </div>
                  <div className="rounded-xl bg-white/45 border border-white/60 px-4 py-3">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-black/45 mb-1">
                      {t('about.phone')}
                    </p>
                    <p className="text-sm text-black/80 font-medium">{data.phone}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/projects"
                    aria-label={language === 'en' ? 'View projects' : '查看作品'}
                    className="px-8 py-3.5 w-full sm:w-auto glass-button rounded-full text-black font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 text-center"
                  >
                    {t('hero.cta')}
                  </Link>
                  <Link
                    href="/contact"
                    aria-label={language === 'en' ? 'Contact me' : '联系我'}
                    className="px-8 py-3.5 w-full sm:w-auto vision-button rounded-full text-black/90 font-medium hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 text-center"
                  >
                    {t('hero.contact')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <CapabilitySections />

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <CareerTimeline title={t('about.experience')} items={timelineItems} />
          </div>
        </section>

        <div className="bg-white/25 py-12 border-y border-white/45 backdrop-blur-md">
          <SkillsOverview />
        </div>
      </div>
    </Layout>
  );
}
