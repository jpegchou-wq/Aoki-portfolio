'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description?: string;
  tags?: string[];
}

interface CareerTimelineProps {
  title: string;
  items: TimelineItem[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ title, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter out any items that might be missing title or subtitle
  const normalized = items.filter(item => item.title && item.subtitle);

  return (
    <div className="space-y-10">
      <div className="page-kicker">{title}</div>
      <h3 className="section-title">{title}</h3>

      <div className="relative space-y-10">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-black/10" />
        
        {normalized.map((item, index) => {
          const hasDetail = Boolean(item.description);
          const isOpen = openIndex === index;
          
          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative pl-10 md:pl-12"
            >
              <div className={`absolute left-[-4.5px] top-3 h-[10px] w-[10px] rounded-full border-2 border-[rgb(var(--background-rgb))] transition-all duration-500 ${isOpen ? 'scale-125 bg-neon' : 'bg-neutral-200 group-hover:bg-brand-dark'}`} />

              <div className="detail-card space-y-4">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div className="space-y-3">
                    <span className="list-meta text-neutral-300">
                      {item.duration}
                    </span>
                    <h4 className={`list-title transition-colors md:text-3xl ${isOpen ? 'text-brand-dark' : 'text-neutral-500 group-hover:text-brand-dark'}`}>
                      {item.title}
                    </h4>
                    <p className="list-meta">
                      {item.subtitle}
                    </p>
                    {item.tags?.length ? (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="meta-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {hasDetail && (
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={`rounded-full p-3 transition-all duration-500 ${isOpen ? 'bg-brand-dark text-brand-light' : 'border border-black/[0.08] bg-white text-neutral-400 hover:bg-neutral-100 hover:text-brand-dark'}`}
                    >
                      {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {hasDetail && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-black/10 pt-5 pb-1">
                        <p className="section-summary max-w-2xl whitespace-pre-line md:text-lg">
                          {item.description}
                        </p>
                      </div>
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
};

export default CareerTimeline;
