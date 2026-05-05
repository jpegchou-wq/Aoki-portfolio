'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '../layout/TextReveal';

const FeaturedProjects: React.FC = () => {
  const { language, t } = useLanguage();
  const featuredProjects = projectsData.slice(0, 4); // Take 4 for a better asymmetrical grid

  return (
    <section className="py-40 bg-neutral-900 text-white overflow-hidden">
      <div className="asymmetric-container">
        <div className="flex flex-col md:flex-row justify-between items-start mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-neon mb-6 block">
              Selected Works
            </span>
            <TextReveal
              text={language === 'en' ? 'Digital Narratives & Brand Systems' : '数字叙事 与 品牌系统'}
              className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="md:pt-24"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 font-mono text-sm uppercase tracking-widest border-b border-white/20 pb-2 hover:border-neon transition-colors"
            >
              <span>{t('projects.viewAll')}</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Project Grid */}
        <div className="space-y-40">
          {featuredProjects.map((project, index) => {
            const data = language === 'en' ? project.en : project.cn;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                {/* Project Image - Large & Impactful */}
                <div className="w-full lg:w-3/5">
                  <Link href={`/projects/${project.id}`} className="block relative aspect-[4/3] overflow-hidden group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover transition-all duration-1000"
                      />
                    </motion.div>
                    
                    {/* Glass Style Overlay - Similar to Original Design */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                  </Link>
                </div>

                {/* Project Info - Offset & Minimal */}
                <div className="w-full lg:w-2/5">
                  <div className="max-w-md">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
                      {project.category}
                    </span>
                    <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-6 hover:text-neon transition-colors">
                      <Link href={`/projects/${project.id}`}>{data.title}</Link>
                    </h3>
                    <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                      {data.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-12">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-block px-8 py-3 border border-white/20 hover:border-neon hover:text-neon font-mono text-xs uppercase tracking-widest transition-all"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
