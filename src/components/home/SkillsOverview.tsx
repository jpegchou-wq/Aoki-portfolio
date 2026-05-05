'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, BarChart3, Bot } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '../layout/TextReveal';

const SkillsOverview: React.FC = () => {
  const { t } = useLanguage();
  
  const icons: Record<string, React.ReactNode> = {
    '视觉与多媒体设计 (Creative Suite)': <Palette size={24} strokeWidth={1} />,
    'UI/UX 与产品设计 (Digital Product)': <Layout size={24} strokeWidth={1} />,
    '增长营销与数据分析 (Marketing & Data)': <BarChart3 size={24} strokeWidth={1} />,
    'AI 协同与自动化开发 (AI & Engineering)': <Bot size={24} strokeWidth={1} />,
  };

  return (
    <section className="py-40 relative">
      <div className="asymmetric-container">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Section Title */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="sticky top-40"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
                Expertise
              </span>
              <TextReveal
                text={t('skills.title')}
                className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8 text-neutral-900"
              />
              <div className="h-px w-24 bg-neon" />
            </motion.div>
          </div>

          {/* Skills List - Brutalist / Experimental Grid */}
          <div className="lg:w-2/3 space-y-12">
            {skillsData.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border-b border-neutral-200 pb-12 hover:border-neutral-900 transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
                    <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight group-hover:text-neon transition-colors">
                      {category.category}
                    </h3>
                  </div>
                  <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    {icons[category.category]}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-neon" />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
