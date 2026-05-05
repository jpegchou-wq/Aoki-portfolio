'use client';

import React from 'react';
import Link from 'next/link';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <footer className="py-20 border-t border-neutral-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Contact Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-6">
              {language === 'en' ? 'Get in touch' : '联系我'}
            </h4>
            <Link 
              href={`mailto:${data.email}`}
              className="text-3xl md:text-5xl font-bold text-neutral-900 hover:text-neutral-500 transition-colors block mb-4"
            >
              {data.email}
            </Link>
            <p className="text-sm font-medium text-neutral-400">
              {data.phone}
            </p>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-end md:items-end">
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
              {Object.entries(personalData.socials as Record<string, string>).map(([key, url]) => (
                <a 
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  {key}
                </a>
              ))}
            </div>
            <div className="flex justify-between items-center w-full pt-8 border-t border-neutral-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                © 2026 AOKI — All Rights Reserved
              </p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Shenzhen, China</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
