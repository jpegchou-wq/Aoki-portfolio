'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import personalData from '../../data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  return (
    <footer className="h-[100px] flex items-center border-t border-black/5">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <p className="text-black/30 text-xs font-medium tracking-widest uppercase">
          © 2026 Aoki. 保留所有权利.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
