'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import MediaEmbed, { type MediaItem } from '@/components/media/MediaEmbed';

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
  en: { title: string; description: string; detail?: LocalizedDetail };
  cn: { title: string; description: string; detail?: LocalizedDetail };
  media?: MediaItem[];
};

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const { language, t } = useLanguage();
  const content = language === 'en' ? project.en : project.cn;
  const detail = content.detail;

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center px-5 py-2 rounded-full bg-black/5 text-black/60 hover:text-black hover:bg-black/10 transition-colors"
          >
            {t('projectDetail.back')}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          <div className="glass-card rounded-[2rem] p-3 overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
              <Image src={project.thumbnail} alt={content.title} fill className="object-cover object-top" priority />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-purple-500/70 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black/90">
                {content.title}
              </h1>
              <p className="text-black/45 text-lg font-light leading-relaxed">
                {content.description}
              </p>
            </div>

            <div className="glass-card rounded-[2rem] p-8">
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black/30 mb-4">
                Tools
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 rounded-full bg-black/[0.03] border border-black/[0.04] text-[11px] tracking-wider text-black/55"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {detail?.role && (
          <section className="glass-card rounded-[2rem] p-10 mt-12">
            <h2 className="text-xl font-semibold text-black/80 mb-4">{t('projectDetail.role')}</h2>
            <p className="text-black/55 font-light leading-relaxed whitespace-pre-line">{detail.role}</p>
          </section>
        )}

        {Array.isArray(project.media) && project.media.length > 0 && (
          <section className="mt-12">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-semibold text-black/80">
                {language === 'en' ? 'Project Outcomes' : '项目成果'}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {project.media.map((item, idx) => (
                <MediaEmbed key={idx} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
