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
import Magnetic from '@/components/layout/Magnetic';

const ProjectCard = ({ project, language }: { project: any; language: string }) => {
  const data = language === 'en' ? project.en : project.cn;
  
  return (
    <Link href={project.href ?? `/projects/${project.id}`} className="block group">
      <Magnetic strength={0.1}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* Hover Action */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              Explore
            </div>
          </div>
        </div>
      </Magnetic>
      
      {/* Visible Info always - Original Clean Style */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">{data.title}</h3>
        <p className="text-sm text-neutral-400 mt-1">{project.category}</p>
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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-neutral-200" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">Selected Works</span>
            </div>
            <h1 className="experimental-title text-neutral-900">
              {language === 'en' ? 'Projects' : '作品集'}
              <span className="text-outline block lg:inline lg:ml-8">Archive</span>
            </h1>
          </motion.div>

          {/* Avant-garde Filter Bar */}
          <div className="mb-24 flex flex-wrap gap-3 border-b border-neutral-100 pb-12">
            {categories.map((cat) => (
              <Magnetic key={cat.id} strength={0.2}>
                <button
                  onClick={() => setFilter(cat.id)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all ${
                    filter === cat.id 
                      ? 'bg-neutral-900 text-white shadow-xl' 
                      : 'bg-transparent text-neutral-400 hover:text-neutral-900 border border-transparent hover:border-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Misaligned Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((project, index) => (
                <motion.div
                  key={project._key ?? project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                  className={`${index % 3 === 1 ? 'lg:mt-24' : index % 3 === 2 ? 'lg:mt-12' : ''}`}
                >
                  <ProjectCard project={project} language={language} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {canLoadMore && (
            <div className="mt-40 flex justify-center">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="neon-button"
                >
                  {language === 'en' ? 'Load More Projects' : '加载更多作品'}
                </button>
              </Magnetic>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px #171717;
          color: transparent;
        }
      `}</style>
    </Layout>
  );
}
