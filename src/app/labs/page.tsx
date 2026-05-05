'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import labsData from '@/data/labs.json';
import TextReveal from '@/components/layout/TextReveal';
import Magnetic from '@/components/layout/Magnetic';

export default function Labs() {
  const { language, t } = useLanguage();

  return (
    <Layout>
      <div className="pt-40 pb-40">
        <div className="asymmetric-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-neon bg-neutral-900 px-3 py-1 rounded-sm">LAB</span>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">Experimental Space</span>
            </div>
            <h1 className="experimental-title text-neutral-900">
              Future<span className="text-outline block lg:inline lg:ml-8">Concepts</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            {labsData.map((lab, index) => {
              const data = language === 'en' ? lab.en : lab.cn;
              const isEven = index % 2 === 0;
              return (
                <Link key={lab.id} href={`/labs/${lab.id}`} className={`block group ${!isEven ? 'lg:mt-32' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <Magnetic strength={0.1}>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full"
                        >
                          <Image
                            src={lab.thumbnail}
                            alt={data.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                            Exp. {lab.id}
                          </div>
                        </div>
                      </div>
                    </Magnetic>
                    
                    <div className="space-y-4 max-w-lg">
                      <h3 className="text-3xl font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors tracking-tight">
                        {data.title}
                      </h3>
                      <p className="text-neutral-500 text-lg leading-relaxed">
                        {data.description}
                      </p>
                      <div className="pt-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-neon pb-1">
                          View Experiment
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1.5px #171717;
          color: transparent;
        }
      `}</style>
    </Layout>
  );
}
