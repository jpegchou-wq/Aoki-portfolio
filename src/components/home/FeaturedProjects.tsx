'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '../layout/TextReveal';

const FeaturedProjects: React.FC = () => {
  const { language, t } = useLanguage();
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
              {language === 'en' ? 'Selected Works' : '精选作品'}
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed">
              {language === 'en' 
                ? 'A collection of digital products and brand identities crafted with focus on user experience and visual impact.' 
                : '专注于用户体验和视觉冲击力的数字产品与品牌识别设计合集。'}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-900 border-b-2 border-neutral-100 pb-1 hover:border-neutral-900 transition-all"
            >
              <span>{t('projects.viewAll')}</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Clean Project Grid - Back to Original */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {featuredProjects.map((project, index) => {
            const data = language === 'en' ? project.en : project.cn;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/projects/${project.id}`} className="block relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 mb-6">
                  <Image
                    src={project.thumbnail}
                    alt={data.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </Link>

                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {data.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">
                    {project.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
