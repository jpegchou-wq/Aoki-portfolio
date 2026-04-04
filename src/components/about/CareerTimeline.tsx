'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

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
    <section className="glass-card rounded-[2rem] p-7 sm:p-9 md:p-10 overflow-hidden border-white/65">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h3 className="text-3xl font-semibold text-black/90 tracking-tight">{title}</h3>
        <div className="text-xs text-black/45 tracking-[0.2em] uppercase font-semibold">Timeline</div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-black/[0.12]" />
        <div className="space-y-4">
          {normalized.map((item, index) => {
            const hasDetail = Boolean(item.description);
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                className="relative pl-12"
              >
                <div className="absolute left-[9px] top-7 w-[14px] h-[14px] rounded-full bg-white/90 border border-black/[0.15] shadow-sm" />

                <button
                  type="button"
                  onClick={() => setOpenIndex(hasDetail ? (isOpen ? null : index) : null)}
                  className="w-full text-left rounded-[1.75rem] bg-white/55 border border-white/70 backdrop-blur-md px-6 sm:px-7 py-6 transition-all duration-500 hover:bg-white/70 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="text-xl font-semibold text-black/90 leading-snug">{item.title}</div>
                      {item.subtitle && (
                        <div className="mt-2 text-black/65 font-light leading-relaxed">{item.subtitle}</div>
                      )}
                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={`${item.title}-${tag}`}
                              className="px-3 py-1 rounded-full bg-white/65 border border-white/70 text-[10px] tracking-widest uppercase text-black/65"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {item.duration && (
                        <div className="text-[11px] text-black/45 font-semibold tracking-widest uppercase">{item.duration}</div>
                      )}
                      {hasDetail && (
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 1 : 0.5 }}
                          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                          className="w-10 h-10 rounded-2xl bg-white/70 border border-white/70 flex items-center justify-center"
                        >
                          <Plus size={16} className="text-black/60" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {hasDetail && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 text-black/70 font-light leading-relaxed whitespace-pre-line">
                          {item.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
