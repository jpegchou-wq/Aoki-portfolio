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
    <div className="pt-32 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Link */}
        <div className="mb-16">
          <Link
            href="/labs"
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'en' ? 'Back to Labs' : '返回实验'}</span>
          </Link>
        </div>

        {/* Lab Header - Clean & Centered */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-neutral-400 mb-4 block">
              Experiment {lab.id}
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
                {lab.technologies.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Tools & Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {lab.technologies.map((tech) => (
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

        {/* Lab Thumbnail - Clean rounded */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm mb-32"
        >
          <Image src={lab.thumbnail} alt={content.title} fill className="object-cover" priority />
        </motion.div>

        {/* Process & Insights */}
        {(detail?.intro || detail?.highlights?.length || detail?.process?.length) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div className="space-y-12">
              {detail?.intro && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">
                    {t('projectDetail.overview')}
                  </h2>
                  <p className="text-neutral-500 leading-relaxed whitespace-pre-line">
                    {detail.intro}
                  </p>
                </div>
              )}

              {detail?.process && detail.process.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">
                    {t('projectDetail.process')}
                  </h2>
                  <div className="space-y-6">
                    {detail.process.map((line, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="text-xs font-bold text-neutral-300">0{idx + 1}</span>
                        <p className="text-neutral-500 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-12">
              {detail?.highlights && detail.highlights.length > 0 && (
                <div className="p-10 bg-neutral-50 rounded-2xl">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                    {t('projectDetail.highlights')}
                  </h2>
                  <ul className="space-y-4">
                    {detail.highlights.map((text, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full mt-2 shrink-0" />
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
          <section className="space-y-24">
            <div className="border-b border-neutral-100 pb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {t('projectDetail.media')}
              </h2>
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
