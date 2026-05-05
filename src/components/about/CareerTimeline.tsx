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
    <div className="space-y-10">
      <h3 className="text-2xl font-bold text-neutral-900 mb-10">{title}</h3>

      <div className="space-y-12 relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-100" />
        
        {normalized.map((item, index) => {
          const hasDetail = Boolean(item.description);
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-10 group"
            >
              {/* Dot */}
              <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full transition-colors ${isOpen ? 'bg-neutral-900' : 'bg-neutral-200 group-hover:bg-neutral-400'}`} />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                      {item.duration}
                    </span>
                    <h4 className="text-lg font-bold text-neutral-900">
                      {item.title}
                    </h4>
                    <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                  </div>

                  {hasDetail && (
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={`p-2 rounded-full transition-all ${isOpen ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'}`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {hasDetail && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 text-neutral-500 leading-relaxed max-w-2xl whitespace-pre-line text-sm">
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
