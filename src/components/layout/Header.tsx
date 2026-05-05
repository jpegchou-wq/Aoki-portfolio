'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.me'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <header className="fixed w-full z-50 px-6 py-6 md:py-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Sharp and Minimal */}
        <Magnetic strength={0.2}>
          <Link href="/" className="group relative">
            <span className="text-2xl font-bold tracking-tight transition-transform group-hover:skew-x-12 block text-neutral-900">
              AOKI<span className="text-neutral-400">.</span>
            </span>
          </Link>
        </Magnetic>

        {/* Desktop Menu - Clean & Minimal */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Magnetic key={link.href} strength={0.3}>
              <Link
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors relative group"
              >
                <span className="relative z-10">{link.name}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 transition-all group-hover:w-full" />
              </Link>
            </Magnetic>
          ))}
          
          <Magnetic strength={0.2}>
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 border border-neutral-100 rounded-full hover:border-neutral-900 transition-colors text-neutral-900"
            >
              {language === 'en' ? 'CN' : 'EN'}
            </button>
          </Magnetic>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="p-2 text-neutral-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Experimental Layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-light z-[60] flex flex-col justify-center p-12"
          >
            <button 
              className="absolute top-8 right-6 p-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} strokeWidth={1} />
            </button>

            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-5xl font-bold tracking-tighter hover:text-neon transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 pt-8 border-t border-neutral-200">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="font-mono text-xs uppercase tracking-widest text-neutral-500"
              >
                Switch to {language === 'en' ? 'Chinese' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
