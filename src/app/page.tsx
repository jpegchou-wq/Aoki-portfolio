'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
  const storyLinks = [
    {
      id: 'projects',
      number: '01',
      title: t('home.caseArchive'),
      summary: t('home.routeCaseArchive'),
    },
    {
      id: 'skills',
      number: '02',
      title: t('home.capabilityModules'),
      summary: t('home.routeCapabilityModules'),
    },
    {
      id: 'capabilities',
      number: '03',
      title: t('home.howIWork'),
      summary: t('home.routeHowIWork'),
    },
    {
      id: 'timeline',
      number: '04',
      title: t('home.experienceStory'),
      summary: t('home.routeExperienceStory'),
    },
  ];

  return (
    <Layout>
      <HeroSection />

      <section className="story-section">
        <div className="asymmetric-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="story-map"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="panel-label mb-0">{t('home.storyMap')}</span>
                  <span className="list-meta text-brand-dark">04</span>
                </div>
                <div className="space-y-2">
                  {storyLinks.map((link) => (
                    <a key={link.id} href={`#${link.id}`} className="story-link">
                      <div className="min-w-0">
                        <div className="story-link-number">{link.number}</div>
                        <div className="mt-1 truncate text-sm text-brand-dark">{link.title}</div>
                      </div>
                      <span className="text-brand-dark">+</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                viewport={{ once: true }}
                className="story-frame"
              >
                <div className="page-kicker mb-4">{t('home.portfolioExperience')}</div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h2 className="section-title">
                      {t('home.exploreNarrative')}
                    </h2>
                    <p className="section-summary mt-5 max-w-3xl">
                      {t('home.exploreNarrativeSummary')}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                {storyLinks.map((link) => (
                  <a key={link.id} href={`#${link.id}`} className="story-frame group block transition-all duration-500 hover:-translate-y-1 hover:border-black/20">
                    <div className="story-link-number">{link.number}</div>
                    <h3 className="panel-title mt-3">{link.title}</h3>
                    <p className="panel-copy mt-3">{link.summary}</p>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="story-section border-t border-black/10">
        <FeaturedProjects />
      </section>

      <section id="skills" className="story-section border-t border-black/10">
        <SkillsOverview />
      </section>

      <section id="capabilities" className="story-section border-t border-black/10">
        <div className="asymmetric-container">
          <div className="story-frame">
            <CapabilitySections />
          </div>
        </div>
      </section>

      <section id="timeline" className="story-section border-t border-black/10">
        <div className="asymmetric-container">
          <div className="mb-10 max-w-4xl">
            <div className="page-kicker">{t('home.experienceStory')}</div>
            <h2 className="section-title">
              {t('home.experienceHeading')}
            </h2>
            <p className="section-summary mt-5">
              {t('home.experienceSummary')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="story-frame">
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

            <div className="space-y-8">
              <div className="story-frame">
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
      </section>
    </Layout>
  );
}
