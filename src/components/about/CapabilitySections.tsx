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
    <section className="py-12">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-12">
          {language === 'en' ? 'Core Capabilities' : '核心能力'}
        </h2>

        <div className="space-y-4">
          {capabilities.map((cap, index) => {
            const isActive = cap.id === activeId;
            return (
              <div 
                key={cap.id}
                className={`rounded-2xl transition-all duration-300 ${isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100'}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? '' : cap.id)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-neutral-400">0{index + 1}</span>
                    <h3 className="text-xl font-bold">
                      {cap.title}
                    </h3>
                  </div>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white/10 rotate-180' : 'bg-neutral-200'}`}>
                    {isActive ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8">
                        <div className="pl-12">
                          <p className={`text-lg mb-8 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {cap.core}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cap.items.map((text, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="w-1 h-1 rounded-full bg-neutral-500 mt-2.5 shrink-0" />
                                <p className="text-sm text-neutral-400 leading-relaxed">
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
