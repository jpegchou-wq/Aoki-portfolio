'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const capabilities = [
  {
    id: 'branding',
    title: 'Brand Vision System (VI)',
    core: '具备 0-1 的品牌视觉开发能力，熟练使用（AI/PS）主导过覆盖新加坡、美国、欧洲、日本等市场的品牌形象建设，建立并管理设计资料产品库，确保全球化营销物料的统一。',
    items: ['Visual Identity Design', 'Global Marketing Collateral', 'Brand Guidelines', 'C4D Asset Management']
  },
  {
    id: 'product',
    title: 'Product Design (B2B/B2C)',
    core: '主导过新加坡、美国等市场的 B2C（APP/WEB）和 B2B（SaaS）产品设计，通过 C4D 建立三维资产管理库，大幅提升全球市场物料产出效率。',
    items: ['UI/UX Design', 'SaaS Platforms', 'Design Systems', '3D Asset Libraries']
  },
  {
    id: 'content',
    title: 'Creative Content & Lab',
    core: '擅长商业插画设计与摄影摄像，通过实验性的视觉探索（Labs）为品牌注入独特的艺术基因，主导过多次跨国市场的创意物料产出。',
    items: ['Commercial Illustration', 'Photography & Video', 'Experimental Lab', 'Creative Strategy']
  }
];

const CapabilitySections: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('branding');
  const { language } = useLanguage();

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl">
        <div className="mb-14 md:mb-16">
          <div className="page-kicker mb-5">
            {language === 'en' ? 'Strategic Structure' : '策略结构'}
          </div>
          <h2 className="section-title text-4xl md:text-6xl">
            {language === 'en' ? 'Core Capabilities' : '核心能力'}
          </h2>
        </div>

        <div className="space-y-6">
          {capabilities.map((cap, index) => {
            const isActive = cap.id === activeId;
            return (
              <div 
                key={cap.id}
                className={`rounded-[2.2rem] border transition-all duration-700 ${isActive ? 'border-black/12 bg-brand-dark text-brand-light shadow-[0_34px_72px_rgba(0,0,0,0.09)]' : 'border-black/[0.08] bg-white/82 text-brand-dark hover:bg-white'}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isActive ? '' : cap.id)}
                  className="group flex w-full items-center justify-between p-8 text-left md:p-12"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className={`font-mono-tech ${isActive ? 'text-neutral-500' : 'text-neutral-300'}`}>0{index + 1}</span>
                    <h3 className="section-title text-2xl md:text-4xl">
                      {cap.title}
                    </h3>
                  </div>
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-700 ${isActive ? 'rotate-180 bg-neon text-white' : 'border border-black/[0.08] bg-white text-neutral-300 group-hover:border-brand-dark group-hover:text-brand-dark'}`}>
                    {isActive ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-10 md:px-12 md:pb-12">
                        <div className="pl-12 md:pl-20">
                          <p className={`mb-10 max-w-4xl text-lg leading-relaxed md:text-xl ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {cap.core}
                          </p>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                            {cap.items.map((text, i) => (
                              <div key={i} className="flex items-center gap-6 group/item">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-all duration-500 group-hover/item:border-neon group-hover/item:bg-neon">
                                  <ArrowRight size={14} className="text-neutral-500 group-hover/item:text-white" />
                                </div>
                                <p className="font-mono-tech text-neutral-400">
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
};

export default CapabilitySections;
