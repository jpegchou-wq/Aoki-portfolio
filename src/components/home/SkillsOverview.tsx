'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Globe, Cpu, Smartphone } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '../layout/TextReveal';

const icons: Record<string, React.ReactNode> = {
  Design: <Palette size={24} />,
  Frontend: <Code2 size={24} />,
  Tools: <Zap size={24} />,
  Other: <Globe size={24} />,
  'B2C UI/UX': <Smartphone size={24} />,
  'B2B UI/UX': <Cpu size={24} />,
  '品牌 VIS': <Palette size={24} />,
  '插画设计': <Palette size={24} />,
  '市场运营': <Zap size={24} />,
};

const SkillsOverview: React.FC = () => {
  const { language, t } = useLanguage();
  const description =
    language === 'en'
      ? 'Systems-minded design across interface architecture, visual identity, motion, and AI-assisted production workflows.'
      : '以系统化思维连接界面架构、品牌表达、动态感知与 AI 协同工作流。';

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute top-4 right-[-10%] opacity-[0.035] pointer-events-none select-none">
        <span className="font-heading text-[18rem] font-extrabold uppercase leading-none">SKILLS</span>
      </div>

      <div className="asymmetric-container relative z-10">
        <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-black/10 py-4">
          {[
            'UX SYSTEMS',
            'BRAND DESIGN',
            'MOTION THINKING',
            'AI WORKFLOWS',
            'FRONTEND SENSITIVITY',
          ].map((item) => (
            <span key={item} className="font-mono-tech text-neutral-400">
              {item}
            </span>
          ))}
        </div>

        <div className="mb-20 max-w-5xl md:mb-24">
          <div className="mb-10 flex items-center gap-6">
            <span className="editorial-panel flex h-12 w-12 items-center justify-center rounded-full font-mono-tech text-brand-dark">02</span>
            <span className="section-kicker mb-0">{t('skills.coreExpertise')}</span>
          </div>

          <TextReveal
            text={t('skills.title')}
            className="mb-8 text-6xl font-heading font-bold leading-none tracking-tighter text-brand-dark md:text-8xl"
          />

          <p className="section-summary max-w-3xl md:text-xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`group rounded-[2.4rem] border border-black/10 bg-white/45 p-8 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_35px_80px_rgba(0,0,0,0.08)] md:p-10 lg:p-12 ${index % 2 === 1 ? 'md:translate-y-10' : ''}`}
            >
              <div className="mb-10 flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-black/10 bg-white text-brand-dark transition-all duration-700 group-hover:rotate-6 group-hover:bg-neon group-hover:text-white">
                  {icons[category.category] || <Cpu size={32} />}
                </div>
                <div>
                  <span className="panel-label mb-2">{t('skills.capability')}</span>
                  <h3 className="section-title text-3xl md:text-4xl">
                    {category.category}
                  </h3>
                </div>
              </div>

              <div className="mb-8 section-divider" />

              <div className="flex flex-wrap gap-4">
                {category.items.map((skill, skillIndex) => (
                  <span
                    key={skill.name}
                    className={`rounded-2xl border px-5 py-3 font-mono-tech transition-all duration-500 hover:scale-105 ${skillIndex === 0 ? 'border-black/15 bg-neon text-white' : 'border-black/10 bg-white/70 text-neutral-500 hover:border-black/20 hover:bg-white hover:text-brand-dark'}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
                <span className="list-meta text-neutral-400">Module 0{index + 1}</span>
                <span className="list-meta text-brand-dark">{category.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="editorial-panel rounded-[2rem] p-6 md:p-8">
            <p className="panel-title leading-tight md:text-3xl">
              {description}
            </p>
          </div>

          <div className="rounded-[2rem] border border-dashed border-black/20 p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="panel-label mb-0">{t('skills.method')}</span>
              <span className="list-meta text-brand-dark">03</span>
            </div>
            <div className="space-y-4">
              {[t('skills.research'), t('skills.systems'), t('skills.visualDirection'), t('skills.prototype')].map((item) => (
                <div key={item} className="flex items-center justify-between border-t border-black/10 pt-4">
                  <span className="list-meta">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-neon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
