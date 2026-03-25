'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, BarChart3, Bot, Sparkles } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useLanguage } from '@/context/LanguageContext';

const SkillsOverview: React.FC = () => {
  const { t } = useLanguage();
  
  const icons: Record<string, React.ReactNode> = {
    '视觉与多媒体设计 (Creative Suite)': <Palette className="text-black/60 mb-6" size={32} strokeWidth={1.5} />,
    'UI/UX 与产品设计 (Digital Product)': <Layout className="text-black/60 mb-6" size={32} strokeWidth={1.5} />,
    '增长营销与数据分析 (Marketing & Data)': <BarChart3 className="text-black/60 mb-6" size={32} strokeWidth={1.5} />,
    'AI 协同与自动化开发 (AI & Engineering)': <Bot className="text-black/60 mb-6" size={32} strokeWidth={1.5} />,
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-xs font-medium text-black/40 uppercase tracking-widest mb-6">
            <Sparkles size={12} />
            <span>{t('skills.subtitle')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black/90 mb-6">
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="glass-card p-10 rounded-[2rem] transition-all text-center group relative overflow-hidden"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-center relative z-10">
                {icons[category.category]}
              </div>
              <h3 className="text-2xl font-semibold text-black/80 mb-6 relative z-10">{category.category}</h3>
              <div className="flex flex-wrap justify-center gap-2 relative z-10">
                {category.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-5 py-2.5 bg-black/5 text-black/60 rounded-2xl text-sm font-medium border border-black/[0.03] transition-colors group-hover:bg-white/60 group-hover:text-black"
                  >
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
