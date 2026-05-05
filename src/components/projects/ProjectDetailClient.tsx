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
    <div className="pt-32 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Link */}
        <div className="mb-16">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('projectDetail.back')}</span>
          </Link>
        </div>

        {/* Project Header - Clean & Centered */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-neutral-400 mb-4 block">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 tracking-tight">
              {content.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-neutral-100">
              <div className="md:col-span-2">
                <p className="text-lg text-neutral-500 leading-relaxed">
                  {content.description}
                </p>
              </div>
              <div className="space-y-6">
                {project.technologies.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-neutral-50 text-neutral-600 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {detail?.role && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">{t('projectDetail.role')}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {detail.role}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image - Clean rounded */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm mb-32"
        >
          <Image src={project.thumbnail} alt={content.title} fill className="object-cover" priority />
        </motion.div>

        {/* Media / Outcomes Section */}
        {Array.isArray(project.media) && project.media.length > 0 && (
          <section className="space-y-24">
            <div className="border-b border-neutral-100 pb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {language === 'en' ? 'Project Outcomes' : '项目成果'}
              </h2>
            </div>
            
            <div className="space-y-24">
              {project.media.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
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
