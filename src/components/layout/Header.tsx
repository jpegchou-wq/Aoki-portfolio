'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.me'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed z-50 w-full px-4 py-4 md:px-6 md:py-8">
      <div className={`container mx-auto flex items-center justify-between rounded-[1.5rem] px-3 py-2 transition-all duration-500 ${isScrolled ? 'border border-black/[0.08] bg-white/68 shadow-[0_18px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl' : 'bg-transparent'}`}>
        <Magnetic strength={0.16}>
          <Link href="/" className="group relative px-1 py-1">
            <span className="block font-heading text-[1.2rem] font-extrabold uppercase tracking-[0.24em] text-brand-dark transition-transform duration-500 group-hover:-translate-y-0.5 md:text-[1.35rem]">
              AOKI<span className="ml-1 text-neon">.</span>
            </span>
          </Link>
        </Magnetic>

        <div className={`hidden items-center rounded-full border px-4 py-3 backdrop-blur-md md:flex md:space-x-8 ${isScrolled ? 'border-transparent bg-transparent' : 'border-black/10 bg-white/45'}`}>
          {navLinks.map((link) => (
            <Magnetic key={link.href} strength={0.3}>
              <Link
                href={link.href}
                className="group relative px-3 py-1 font-mono-tech text-neutral-500 transition-colors hover:text-brand-dark"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute -bottom-1 left-3 h-[2px] w-0 bg-brand-dark transition-all group-hover:w-[calc(100%-24px)]" />
              </Link>
            </Magnetic>
          ))}

          <Magnetic strength={0.2}>
            <button
              onClick={toggleLanguage}
              className="rounded-full border border-black/10 bg-neon/90 px-5 py-2 font-mono-tech text-white transition-colors hover:border-brand-dark"
            >
              {language === 'en' ? 'CN' : 'EN'}
            </button>
          </Magnetic>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="rounded-full border border-black/10 bg-neon/90 px-4 py-2 text-[10px] font-mono-tech text-white"
          >
            {language === 'en' ? 'CN' : 'EN'}
          </button>
          <button
            className="rounded-full border border-black/10 bg-white/55 p-2.5 text-brand-dark backdrop-blur-sm focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-[rgb(var(--background-rgb))/0.96] p-8 md:p-12"
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-black/10 bg-white/60 p-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} strokeWidth={1} />
            </button>

            <div className="space-y-8 md:space-y-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block text-4xl font-heading font-extrabold uppercase tracking-tighter transition-colors hover:text-neon sm:text-5xl"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 border-t border-black/10 pt-8 md:mt-24 md:pt-10">
              <div className="flex flex-col gap-4">
                <span className="font-mono-tech text-neutral-300">Socials</span>
                <div className="flex flex-wrap gap-6">
                  {['WeChat', 'WhatsApp'].map((social) => (
                    <span key={social} className="font-mono-tech text-neutral-500">{social}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
