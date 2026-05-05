'use client';

import React from 'react';
import Link from 'next/link';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <footer className="border-t border-black/10 py-20">
      <div className="asymmetric-container">
        <div className="grid grid-cols-1 gap-16 rounded-[2.5rem] border border-black/10 bg-white/40 p-8 backdrop-blur-xl md:mb-2 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)] md:p-12">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono-tech text-neutral-400">{language === 'en' ? 'Get in touch' : '联系我'}</span>
              <div className="h-px w-14 bg-black/15" />
            </div>
            <Link
              href={`mailto:${data.email}`}
              className="email-display mb-4 block text-3xl transition-colors hover:text-neutral-500 md:text-5xl"
            >
              {data.email}
            </Link>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-neutral-500 md:text-base">
              {language === 'en'
                ? 'Available for UI/UX systems, visual identity, campaign pages, and art-directed digital experiences.'
                : '可合作方向包括 UI/UX 系统、品牌视觉、活动专题页，以及更有艺术方向感的数字体验设计。'}
            </p>
          </div>

          <div className="flex flex-col justify-end md:items-end">
            <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
              {Object.entries(personalData.socials as Record<string, string>).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-transparent pb-1 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:border-neon hover:text-brand-dark"
                >
                  {key}
                </a>
              ))}
            </div>
            <div className="w-full border-t border-black/10 pt-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono-tech text-neutral-400">Phone</span>
                <span className="font-mono-tech text-brand-dark">{data.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                  © 2026 AOKI — All Rights Reserved
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Shenzhen, China</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
