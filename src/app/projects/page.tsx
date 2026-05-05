'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
import labsData from '@/data/labs.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '@/components/layout/TextReveal';

const ProjectCard = ({ project, language }: { project: any; language: string }) => {
  const data = language === 'en' ? project.en : project.cn;
  
  return (
    <Link href={project.href ?? `/projects/${project.id}`} className="block group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <Image
            src={project.thumbnail}
            alt={data.title}
            fill
            className="object-cover transition-all duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      
      {/* Visible Info always - Original Clean Style */}
      <div className="mt-6">
        <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">{data.title}</h3>
        <p className="font-sans text-sm text-neutral-400 mt-1">{project.category}</p>
      </div>
    </Link>
  );
};

export default function Projects() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);

  const projectItems = projectsData.map((item) => ({
    ...item,
    _key: `project-${item.id}`,
    href: `/projects/${item.id}`,
  }));

  const labItems = labsData.map((item) => ({
    ...item,
    category: '实验',
    _key: `lab-${item.id}`,
    href: `/labs/${item.id}`,
  }));

  const allItems = [...projectItems, ...labItems];

  const categories = [
    { id: 'All', label: t('projects.all') },
    { id: '品牌 VIS', label: t('projects.brand') },
    { id: '插画设计', label: t('projects.illustration') },
    { id: '市场运营', label: t('projects.market') },
    { id: 'WEB', label: t('projects.web') },
    { id: 'B2C UI/UX', label: t('projects.b2c') },
    { id: 'B2B UI/UX', label: t('projects.b2b') },
    { id: '产品', label: t('projects.product') },
    { id: '摄影摄像', label: t('projects.photo') },
    { id: '实验', label: t('nav.labs') },
  ];

  const filteredProjects = filter === 'All' ? allItems : allItems.filter((p) => p.category === filter);
  const visibleItems = filteredProjects.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProjects.length;

  return (
    <Layout>
      <div className="pt-40 pb-40">
        <div className="asymmetric-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-32"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
              Archive
            </span>
            <TextReveal
              text={language === 'en' ? 'Works' : '作品集'}
              className="font-display text-6xl md:text-[10rem] font-bold tracking-tighter leading-none mb-12 text-neutral-900"
            />
            <p className="max-w-2xl text-xl text-neutral-500 leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Filter Bar - Brutalist */}
          <div className="mb-20 flex flex-wrap gap-4 border-b border-neutral-200 pb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all ${
                  filter === cat.id 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-transparent text-neutral-400 border-transparent hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid - Asymmetrical feeling with different aspect ratios if we wanted, but keeping it clean for now */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((project, index) => (
                <motion.div
                  key={project._key ?? project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                >
                  <ProjectCard project={project} language={language} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {canLoadMore && (
            <div className="mt-32 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="font-mono text-xs uppercase tracking-widest px-12 py-4 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
              >
                {language === 'en' ? 'Load more' : '加载更多'}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
