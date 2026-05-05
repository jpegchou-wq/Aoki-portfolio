'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { LabData } from '@/types/lab';
import { useLanguage } from '@/context/LanguageContext';
import MediaEmbed from '@/components/media/MediaEmbed';

export default function LabDetailClient({ lab }: { lab: LabData }) {
  const { language, t } = useLanguage();
  const content = language === 'en' ? lab.en : lab.cn;
  const detail = content.detail;

  return (
    <div className="page-shell">
      <div className="asymmetric-container">
        <div className="page-hero">
          <Link
            href="/labs"
            className="group mb-10 inline-flex items-center gap-2 font-mono-tech text-neutral-400 transition-colors hover:text-brand-dark"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>{t('labs.back')}</span>
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
            <div>
              <div className="page-kicker mb-4">{language === 'en' ? `Experiment ${lab.id}` : `实验 ${lab.id}`}</div>
              <h1 className="page-title">{content.title}</h1>
              <p className="page-summary mt-6">{content.description}</p>
            </div>

            <div className="detail-card">
              <div className="space-y-6">
                {lab.technologies.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-mono-tech text-neutral-400">{t('projectDetail.toolsMethods')}</h4>
                    <div className="flex flex-wrap gap-3">
                      {lab.technologies.map((tech: string) => (
                        <span key={tech} className="meta-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {detail?.role && (
                  <div className="border-t border-black/10 pt-5">
                    <h4 className="mb-3 font-mono-tech text-neutral-400">{t('projectDetail.role')}</h4>
                    <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                      {detail.role}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="brutalist-frame mb-16 rounded-[2.5rem] p-3 md:mb-24 md:p-4"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] md:aspect-[16/9]">
            <Image src={lab.thumbnail} alt={content.title} fill className="object-cover" priority />
          </div>
        </motion.div>

        {(detail?.intro || detail?.highlights?.length || detail?.process?.length) && (
          <section className="mb-16 grid grid-cols-1 gap-6 md:mb-24 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
            {detail?.intro ? (
              <div className="detail-card">
                <div className="page-kicker mb-4">{t('projectDetail.overview')}</div>
                <p className="whitespace-pre-line text-base leading-relaxed text-neutral-600 md:text-lg">
                  {detail.intro}
                </p>
              </div>
            ) : (
              <div className="detail-card">
                <div className="page-kicker mb-4">{t('projectDetail.overview')}</div>
                <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
                  {content.description}
                </p>
              </div>
            )}

            <div className="detail-stack">
              {detail?.highlights?.length ? (
                <div className="detail-card">
                  <div className="page-kicker mb-4">{t('projectDetail.highlights')}</div>
                  <ul className="space-y-4">
                    {detail.highlights.map((text: string, idx: number) => (
                      <li key={`${text}-${idx}`} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neon" />
                        <span className="text-sm leading-relaxed text-neutral-600 md:text-base">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {detail?.process?.length ? (
                <div className="detail-card">
                  <div className="page-kicker mb-4">{t('projectDetail.process')}</div>
                  <div className="space-y-4">
                    {detail.process.map((line: string, idx: number) => (
                      <div key={`${line}-${idx}`} className="flex gap-4 border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                        <span className="font-mono-tech text-neutral-300">0{idx + 1}</span>
                        <p className="text-sm leading-relaxed text-neutral-600 md:text-base">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {Array.isArray(lab.media) && lab.media.length > 0 && (
          <section className="space-y-8 md:space-y-12">
            <div className="page-kicker">{t('projectDetail.media')}</div>
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              {lab.media.map((item, idx) => (
                <motion.div
                  key={`${lab.id}-media-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75 }}
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
