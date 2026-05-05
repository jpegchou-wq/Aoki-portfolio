'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { useLanguage } from '@/context/LanguageContext';
import TextReveal from '../layout/TextReveal';
import Magnetic from '../layout/Magnetic';

const FeaturedProjects: React.FC = () => {
  const { language, t } = useLanguage();
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <section className="py-40 bg-white overflow-hidden relative">
      {/* Avant-garde Side Label */}
      <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden lg:block">
        <span className="text-[10px] font-bold uppercase tracking-[1em] text-neutral-200">
          STORYTELLING — THROUGH — DESIGN
        </span>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-neon bg-neutral-900 px-3 py-1 rounded-sm">01</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Featured Selection</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-neutral-900 leading-[0.85]">
              {language === 'en' ? 'Selected' : '精选'}
              <br />
              <span className="lg:ml-24 text-outline-dark">Narratives</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:pt-24"
          >
            <Magnetic strength={0.2}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-6 text-sm font-bold uppercase tracking-[0.2em] text-neutral-900 group"
              >
                <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-500">
                  <ArrowUpRight size={20} className="group-hover:text-neon transition-colors" />
                </div>
                <span>{t('projects.viewAll')}</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Asymmetrical Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 lg:gap-y-40">
          {featuredProjects.map((project, index) => {
            const data = language === 'en' ? project.en : project.cn;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: (index % 2) * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`lg:col-span-10 ${isEven ? 'lg:col-start-1' : 'lg:col-start-3'}`}
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                  {/* Project Image - Balanced but large */}
                  <div className="w-full lg:w-3/5">
                    <Magnetic strength={0.05}>
                      <Link href={`/projects/${project.id}`} className="block relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full"
                        >
                          <Image
                            src={project.thumbnail}
                            alt={data.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-neutral-900 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                            View Case Study
                          </div>
                        </div>
                      </Link>
                    </Magnetic>
                  </div>

                  {/* Project Info - Minimal & Misaligned */}
                  <div className="w-full lg:w-2/5">
                    <div className={`max-w-md ${isEven ? 'lg:pl-0' : 'lg:pr-0'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-[1px] bg-neutral-200" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tighter leading-tight hover:text-neutral-500 transition-colors">
                        <Link href={`/projects/${project.id}`}>{data.title}</Link>
                      </h3>
                      <p className="text-lg text-neutral-500 leading-relaxed mb-10 line-clamp-3">
                        {data.description}
                      </p>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-neutral-900 group/link"
                      >
                        <span className="border-b-2 border-neon pb-1">Discover</span>
                        <div className="w-2 h-2 rounded-full bg-neon group-hover/link:scale-[2] transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .text-outline-dark {
          -webkit-text-stroke: 1.5px #171717;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
