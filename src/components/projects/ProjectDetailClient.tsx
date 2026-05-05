'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import MediaEmbed, { type MediaItem } from '@/components/media/MediaEmbed';
import { ArrowLeft } from 'lucide-react';

type LocalizedDetail = {
  intro?: string;
  role?: string;
  highlights?: string[];
};

export type ProjectData = {
  id: string;
  category: string;
  thumbnail: string;
  technologies: string[];
  year?: string;
  en: { title: string; description: string; detail?: LocalizedDetail };
  cn: { title: string; description: string; detail?: LocalizedDetail };
  media?: MediaItem[];
};

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const { language, t } = useLanguage();
  const content = language === 'en' ? project.en : project.cn;
  const detail = content.detail;

  return (
    <div className="pt-40 pb-40">
      <div className="asymmetric-container">
        {/* Back Link */}
        <div className="mb-20">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
            <span>{t('projectDetail.back')}</span>
          </Link>
        </div>

        {/* Project Header - Asymmetrical */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
              {project.category} / {project.year || '2024'}
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-12">
              {content.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-2xl">
              {content.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="p-8 border-2 border-neutral-900 space-y-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4">Tools & Stack</span>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-neutral-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {detail?.role && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4">{t('projectDetail.role')}</span>
                  <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                    {detail.role}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative aspect-[16/9] border-2 border-neutral-900 mb-40 overflow-hidden"
        >
          <Image src={project.thumbnail} alt={content.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" priority />
        </motion.div>

        {/* Media / Outcomes Section */}
        {Array.isArray(project.media) && project.media.length > 0 && (
          <section className="space-y-40">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-neutral-200 pb-12">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
                {language === 'en' ? 'Project Outcomes' : '项目成果'}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400">01 — {project.media.length < 10 ? `0${project.media.length}` : project.media.length}</span>
            </div>
            
            <div className="space-y-32">
              {project.media.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <MediaEmbed item={item} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
