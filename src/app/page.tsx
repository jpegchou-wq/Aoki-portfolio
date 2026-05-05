'use client';

import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CapabilitySections from '@/components/about/CapabilitySections';
import CareerTimeline from '@/components/about/CareerTimeline';
import SkillsOverview from '@/components/home/SkillsOverview';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <HeroSection />
      
      <FeaturedProjects />

      <SkillsOverview />

      <div className="py-40 border-t border-neutral-200">
        <CapabilitySections />
      </div>

      <section className="py-40 border-t border-neutral-200">
        <div className="asymmetric-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
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
      </section>
    </Layout>
  );
}
