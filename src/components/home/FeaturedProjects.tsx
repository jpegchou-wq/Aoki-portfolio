'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { useLanguage } from '@/context/LanguageContext';

const FeaturedProjects: React.FC = () => {
  const { language, t } = useLanguage();
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black/90 mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-black/40 font-light leading-relaxed">
              {t('projects.subtitle')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group flex items-center space-x-2 px-8 py-4 vision-button rounded-full text-black font-medium"
            >
              <span>{t('projects.viewAll')}</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => {
            const data = language === 'en' ? project.en : project.cn;
            return (
              <Link key={project.id} href={`/projects/${project.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  viewport={{ once: true }}
                  className="group glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-72 overflow-hidden m-4 rounded-[1.5rem]">
                    <Image
                      src={project.thumbnail}
                      alt={data.title}
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  </div>
                  <div className="p-10 pt-4">
                    <div className="flex items-center mb-3">
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-purple-500/60 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-black/80 mb-3 group-hover:text-black transition-colors">{data.title}</h3>
                    <p className="text-black/40 mb-8 line-clamp-2 font-light leading-relaxed">{data.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-black/[0.03] text-black/50 text-xs font-medium rounded-xl border border-black/[0.02]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
