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
  process?: string[];
};

export type LabData = {
  id: string;
  thumbnail: string;
  technologies: string[];
  en: { title: string; description: string; detail?: LocalizedDetail };
  cn: { title: string; description: string; detail?: LocalizedDetail };
  media?: MediaItem[];
};

export default function LabDetailClient({ lab }: { lab: LabData }) {
  const { language, t } = useLanguage();
  const content = language === 'en' ? lab.en : lab.cn;
  const detail = content.detail;

  return (
    <div className="pt-40 pb-40">
      <div className="asymmetric-container">
        {/* Back Link */}
        <div className="mb-20">
          <Link
            href="/labs"
            className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
            <span>{language === 'en' ? 'Back to Labs' : '返回实验'}</span>
          </Link>
        </div>

        {/* Lab Header - Asymmetrical */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neon mb-6 block">
              Experiment {lab.id}
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
            <div className="p-8 border-2 border-neutral-900 space-y-8 bg-neutral-900 text-white">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4">Tools & Methods</span>
                <div className="flex flex-wrap gap-4">
                  {lab.technologies.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-neutral-800 text-neon">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {detail?.role && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4">{t('projectDetail.role')}</span>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {detail.role}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Lab Thumbnail */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative aspect-[16/9] border-2 border-neutral-900 mb-40 overflow-hidden"
        >
          <Image src={lab.thumbnail} alt={content.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" priority />
        </motion.div>

        {/* Process & Insights */}
        {(detail?.intro || detail?.highlights?.length || detail?.process?.length) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-40">
            <div className="space-y-16">
              {detail?.intro && (
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight mb-8 border-b border-neutral-200 pb-4">
                    {t('projectDetail.overview')}
                  </h2>
                  <p className="text-neutral-500 leading-relaxed whitespace-pre-line">
                    {detail.intro}
                  </p>
                </div>
              )}

              {detail?.process && detail.process.length > 0 && (
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight mb-8 border-b border-neutral-200 pb-4">
                    {t('projectDetail.process')}
                  </h2>
                  <div className="space-y-8">
                    {detail.process.map((line, idx) => (
                      <div key={idx} className="flex gap-6">
                        <span className="font-mono text-xs text-neon">0{idx + 1}</span>
                        <p className="text-neutral-500 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-16">
              {detail?.highlights && detail.highlights.length > 0 && (
                <div className="p-12 border-2 border-neutral-900">
                  <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
                    {t('projectDetail.highlights')}
                  </h2>
                  <ul className="space-y-6">
                    {detail.highlights.map((text, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <div className="w-1 h-1 bg-neon mt-2 shrink-0" />
                        <span className="text-neutral-600 leading-relaxed">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Media Section */}
        {Array.isArray(lab.media) && lab.media.length > 0 && (
          <section className="space-y-40">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-neutral-200 pb-12">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter">
                {t('projectDetail.media')}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400">EXP DATA</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {lab.media.map((item, idx) => (
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
