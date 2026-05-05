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
    '视觉与多媒体设计 (Creative Suite)': <Palette size={20} strokeWidth={1.5} />,
    'UI/UX 与产品设计 (Digital Product)': <Layout size={20} strokeWidth={1.5} />,
    '增长营销与数据分析 (Marketing & Data)': <BarChart3 size={20} strokeWidth={1.5} />,
    'AI 协同与自动化开发 (AI & Engineering)': <Bot size={20} strokeWidth={1.5} />,
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            {t('skills.title')}
          </h2>
          <div className="h-1 w-20 bg-neutral-900 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-neutral-900">
                  {icons[category.category]}
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span key={skill.name} className="text-xs font-medium px-3 py-1.5 bg-white text-neutral-500 rounded-lg shadow-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
