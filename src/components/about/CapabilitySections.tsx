'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {capabilities.map((cap, index) => {
            const isActive = cap.id === activeId;
            return (
              <motion.button
                key={cap.id}
                type="button"
                onClick={() => setActiveId(isActive ? '' : cap.id)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card text-left w-full rounded-[2rem] p-10 md:p-12 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">
                      {cap.title}
                    </h3>
                    <p className="text-black/45 font-light leading-relaxed">
                      {cap.core}
                    </p>
                  </div>

                  <motion.div
                    animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="shrink-0 w-12 h-12 rounded-2xl bg-black/[0.03] border border-black/[0.04] flex items-center justify-center"
                  >
                    <ArrowUpRight size={18} className="text-black/60" />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 space-y-4">
                        {cap.items.map((text, i) => (
                          <div
                            key={`${cap.id}-${i}`}
                            className="rounded-[1.5rem] bg-white/30 border border-white/30 backdrop-blur-md px-6 py-5 text-black/60 font-light leading-relaxed"
                          >
                            {text}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
