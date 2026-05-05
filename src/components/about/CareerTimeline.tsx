'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export type TimelineItem = {
  title: string;
  subtitle?: string;
  duration?: string;
  description?: string;
  tags?: string[];
};

export default function CareerTimeline({
  title,
  items,
}: {
  title: string;
  items: TimelineItem[];
}) {
  const normalized = useMemo(() => items ?? [], [items]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between border-b-2 border-neutral-900 pb-4 mb-12">
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tighter uppercase">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">History</span>
      </div>

      <div className="space-y-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200" />
        
        {normalized.map((item, index) => {
          const hasDetail = Boolean(item.description);
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-12 group"
            >
              {/* Dot */}
              <div className={`absolute left-[-4.5px] top-1.5 w-[10px] h-[10px] rounded-full border-2 transition-colors ${isOpen ? 'bg-neon border-neutral-900' : 'bg-white border-neutral-300 group-hover:border-neutral-900'}`} />

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      {item.duration}
                    </span>
                    <h4 className="font-display text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
                      {item.subtitle}
                    </p>
                  </div>

                  {hasDetail && (
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={`p-2 border rounded-full transition-all ${isOpen ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-transparent text-neutral-400 border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'}`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                  )}
                </div>

                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {hasDetail && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-neutral-500 leading-relaxed max-w-2xl whitespace-pre-line text-sm md:text-base">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
