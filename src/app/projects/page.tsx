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
      <div className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 tracking-tight">
              {language === 'en' ? 'Projects Archive' : '作品集'}
            </h1>
            <p className="max-w-2xl text-lg text-neutral-500 leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Clean Filter Bar */}
          <div className="mb-16 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all ${
                  filter === cat.id 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((project, index) => (
                <motion.div
                  key={project._key ?? project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <ProjectCard project={project} language={language} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {canLoadMore && (
            <div className="mt-24 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-12 py-4 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
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
