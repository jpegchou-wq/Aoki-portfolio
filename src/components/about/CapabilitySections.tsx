'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';

type Capability = {
  id: string;
  title: string;
  core: string;
  items: string[];
};

export default function CapabilitySections() {
  const { language } = useLanguage();
  const data = language === 'en' ? (personalData.en as any) : (personalData.cn as any);

  const capabilities: Capability[] = useMemo(() => {
    const list = data.capabilities;
    return Array.isArray(list) ? list : [];
  }, [data.capabilities]);

  const [activeId, setActiveId] = useState<string>(capabilities[0]?.id ?? '');

  return (
    <section className="py-24">
      <div className="asymmetric-container">
        <div className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
            Capabilities
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-none">
            {language === 'en' ? 'Core Capabilities' : '核心能力'}
          </h2>
        </div>

        <div className="space-y-4">
          {capabilities.map((cap, index) => {
            const isActive = cap.id === activeId;
            return (
              <div 
                key={cap.id}
                className={`border-2 transition-all duration-500 ${isActive ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-transparent text-neutral-900 hover:border-neutral-900'}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? '' : cap.id)}
                  className="w-full text-left p-8 md:p-12 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
                    <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
                      {cap.title}
                    </h3>
                  </div>
                  <div className={`shrink-0 w-12 h-12 border rounded-full flex items-center justify-center transition-all ${isActive ? 'border-neon bg-neon text-black rotate-180' : 'border-neutral-200 group-hover:border-neutral-900'}`}>
                    {isActive ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 md:px-12 pb-12">
                        <div className="pl-0 md:pl-28 max-w-4xl">
                          <p className={`text-xl mb-12 ${isActive ? 'text-neon' : 'text-neutral-500'}`}>
                            {cap.core}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {cap.items.map((text, i) => (
                              <div key={i} className="space-y-4">
                                <div className="h-px w-8 bg-neutral-700" />
                                <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                                  {text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
