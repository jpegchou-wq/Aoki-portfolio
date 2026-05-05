'use client';

import React from 'react';
import Link from 'next/link';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <footer className="py-24 border-t border-neutral-200">
      <div className="asymmetric-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          {/* Contact Section */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 block">
              {language === 'en' ? 'Get in touch' : '联系我'}
            </span>
            <Link 
              href={`mailto:${data.email}`}
              className="font-display text-4xl md:text-6xl font-bold tracking-tighter hover:text-neon transition-colors block mb-4"
            >
              {data.email}
            </Link>
            <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
              {data.phone}
            </p>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-end">
            <div className="flex flex-wrap gap-x-12 gap-y-4 mb-8">
              {Object.entries(personalData.socials as Record<string, string>).map(([key, url]) => (
                <a 
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  {key}
                </a>
              ))}
            </div>
            <div className="h-px w-full bg-neutral-100 mb-8" />
            <div className="flex justify-between items-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                © 2026 AOKI — All Rights Reserved
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-neon rounded-full" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Shenzhen, China</span>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Footer Text */}
        <div className="relative overflow-hidden pointer-events-none select-none pt-12">
          <h2 className="font-display text-[15vw] font-bold leading-none tracking-tighter text-neutral-100 -mb-[0.15em]">
            AOKI<span className="text-neutral-200">PORTFOLIO</span>
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
