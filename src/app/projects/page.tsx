'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { useLanguage } from '@/context/LanguageContext';

const ProjectCard = ({ project, language }: { project: any, language: string }) => {
  const data = language === 'en' ? project.en : project.cn;
  
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="group glass-card rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-[1.5rem]">
          <Image
            src={project.thumbnail}
            alt={data.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </div>
        <div className="p-8 pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-purple-500/60 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
              {project.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-black/80 mb-3 group-hover:text-black transition-colors">{data.title}</h3>
          <p className="text-black/40 text-sm mb-6 line-clamp-2 font-light leading-relaxed">{data.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-black/[0.02] text-black/40 text-[10px] font-medium rounded-lg border border-black/[0.01]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Projects() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const categories = [
    { id: 'All', label: t('projects.all') },
    { id: '插画设计', label: t('projects.illustration') },
    { id: 'B2B UI/UX', label: t('projects.b2b') },
    { id: 'B2C UI/UX', label: t('projects.b2c') },
    { id: '市场运营', label: t('projects.market') },
    { id: 'WEB', label: t('projects.web') },
    { id: '品牌 VIS', label: t('projects.brand') },
    { id: '产品', label: t('projects.product') },
    { id: '摄影摄像', label: t('projects.photo') },
  ];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-xs font-medium text-black/40 uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              <span>Archive</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black/90 mb-6">
              {t('nav.projects')}
            </h1>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat.id 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-black/5 text-black/40 hover:bg-black/10 hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  language={language} 
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-black/20 font-light italic"
            >
              {language === 'en' ? 'No projects found in this category.' : '该分类下暂无项目。'}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
