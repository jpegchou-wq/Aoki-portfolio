'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '../layout/Magnetic';

const FeaturedProjects: React.FC = () => {
  const { language, t } = useLanguage();
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section id="featured-projects" className="relative py-28 md:py-36">
      <div className="asymmetric-container">
        <div className="page-hero">
          <div className="page-kicker">{t('projects.selectedWork')}</div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h2 className="page-title">
                {language === 'en' ? 'Projects' : '项目'}
                <span className="text-outline block lg:ml-10 lg:inline">{t('projects.inFocus')}</span>
              </h2>
              <p className="page-summary mt-6">
                {language === 'en'
                  ? 'Each case is organized with a stronger visual hierarchy: title first, context second, image third. The goal is faster recognition and cleaner scanning.'
                  : '每个项目都重新按更清晰的阅读层级组织：先标题、再语境、再图像，提升识别速度与浏览效率。'}
              </p>
            </div>

            <Magnetic strength={0.2}>
              <Link
                href="/projects"
                className="ghost-button group gap-5"
              >
                <span>{t('projects.openArchive')}</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10">
          {featuredProjects.map((project, index) => {
            const data = language === 'en' ? project.en : project.cn;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-10%' }}
              >
                <Magnetic strength={0.02}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block rounded-[2.4rem] border border-black/10 bg-white/55 p-4 transition-all duration-700 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_28px_80px_rgba(0,0,0,0.08)] md:p-5"
                  >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:gap-8">
                      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.8rem] bg-neutral-100">
                        <Image
                          src={project.thumbnail}
                          alt={data.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-white/80 px-4 py-2 backdrop-blur">
                          <span className="list-meta text-brand-dark">0{index + 1}</span>
                        </div>
                      </div>

                      <div className="flex min-h-full flex-col justify-between rounded-[1.8rem] border border-black/10 bg-[rgba(255,255,255,0.72)] p-6 md:p-8">
                        <div>
                          <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="meta-pill">{project.category}</span>
                            {project.technologies[0] ? <span className="meta-pill">{project.technologies[0]}</span> : null}
                          </div>

                          <h3 className="text-[1.35rem] font-heading font-bold leading-[1.08] tracking-[-0.04em] text-brand-dark md:text-[1.7rem]">
                            {data.title}
                          </h3>

                          <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                            {data.description}
                          </p>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                          <span className="font-mono-tech text-neutral-400">
                            {t('projects.viewCaseStudy')}
                          </span>
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-brand-light transition-colors group-hover:bg-neon group-hover:text-white">
                            <ArrowUpRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Magnetic>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
