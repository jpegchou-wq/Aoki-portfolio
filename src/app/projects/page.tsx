'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
import labsData from '@/data/labs.json';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '@/components/layout/Magnetic';

const ProjectCard = ({ project, language, t }: { project: any; language: string; t: (key: string) => any }) => {
  const data = language === 'en' ? project.en : project.cn;
  
  return (
    <Link href={project.href ?? `/projects/${project.id}`} className="block group">
      <Magnetic strength={0.1}>
        <div className="interactive-tile h-full overflow-hidden rounded-[2.2rem] p-4 md:p-5">
          <div className="flex h-full flex-col">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="section-kicker mb-2 block">{project.category}</span>
                <h3 className="text-[1.2rem] font-heading font-bold leading-[1.08] tracking-[-0.03em] text-brand-dark transition-colors group-hover:text-black md:text-[1.4rem]">
                  {data.title}
                </h3>
              </div>
              <div className="mt-1 shrink-0 rounded-full border border-black/[0.08] bg-white px-3 py-2">
                <span className="list-meta text-brand-dark">{String(project.id).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-neutral-100 shutter-image-container">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <Image
                  src={project.thumbnail}
                  alt={data.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </div>

            <div className="mt-auto border-t border-black/[0.08] pt-5">
              <p className="panel-copy line-clamp-3">
                {data.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="meta-pill">{project.category}</span>
                  {project.technologies[0] ? <span className="meta-pill">{project.technologies[0]}</span> : null}
                </div>
                <span className="font-mono-tech text-brand-dark transition-colors group-hover:text-black">
                  {t('projects.openCase')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Magnetic>
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
      <div className="page-shell">
        <div className="asymmetric-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="page-hero">
            <div className="flex flex-col gap-6">
              <h1 className="page-title">
                {language === 'en' ? 'Works｜Archives' : '作品｜档案'}
              </h1>
            </div>
          </motion.div>

          <div className="content-panel mb-14 flex flex-wrap gap-3 md:mb-16">
            {categories.map((cat) => (
              <Magnetic key={cat.id} strength={0.2}>
                <button
                  onClick={() => setFilter(cat.id)}
                  className={`min-h-[46px] rounded-full border px-5 py-3 font-mono-tech transition-all duration-500 ${
                    filter === cat.id 
                      ? 'border-brand-dark bg-brand-dark text-brand-light shadow-xl' 
                      : 'border-black/[0.08] bg-white text-neutral-500 hover:border-black/20 hover:text-brand-dark'
                  }`}
                >
                  {cat.label}
                </button>
              </Magnetic>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-9">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((project, index) => (
                <motion.div
                  key={project._key ?? project.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, delay: (index % 12) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} language={language} t={t} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {canLoadMore && (
            <div className="mt-20 flex justify-center md:mt-24">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="neon-button"
                >
                  {language === 'en' ? 'Load More Projects' : '加载更多作品集'}
                </button>
              </Magnetic>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
