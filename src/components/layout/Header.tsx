'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.labs'), href: '/labs' },
    { name: t('nav.me'), href: '/' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'cn' : 'en');
  };

  return (
    <header className="fixed w-full z-50 flex justify-center px-4 pt-4 md:pt-6">
      <motion.nav 
        initial={false}
        animate={{
          width: scrolled ? 'auto' : '100%',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
          padding: scrolled ? '10px 24px' : '16px 32px',
        }}
        className={`max-w-7xl flex justify-between items-center rounded-full backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
      >
        <Link href="/projects" className="text-xl font-semibold tracking-tight mr-8 bg-black/80 bg-clip-text text-transparent">
          AOKI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 rounded-full transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-[1px] bg-black/10 mx-4" />
          
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 rounded-full transition-all duration-300"
          >
            <Globe size={14} />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
           <button
            onClick={toggleLanguage}
            className="p-2 text-black/60 hover:text-black transition-colors"
          >
            <Globe size={20} />
          </button>
          <button
            className="p-2 text-black/60 hover:text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden fixed top-20 left-4 right-4 glass-card rounded-3xl p-6 flex flex-col items-center space-y-4 z-[60]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full text-center py-3 text-lg font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-2xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
