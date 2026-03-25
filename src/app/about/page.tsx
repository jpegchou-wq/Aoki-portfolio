'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import PersonalIntro from '@/components/about/PersonalIntro';
import CapabilitySections from '@/components/about/CapabilitySections';
import CareerTimeline from '@/components/about/CareerTimeline';
import SkillsOverview from '@/components/home/SkillsOverview';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <div className="pt-32 pb-12 overflow-hidden">
        
        <PersonalIntro />

        <CapabilitySections />

        <section className="py-24">
          <div className="container mx-auto px-6">
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
                }))}
              />
            </div>
          </div>
        </section>

        <div className="bg-black/[0.02] py-12">
          <SkillsOverview />
        </div>
      </div>
    </Layout>
  );
}
