'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TextReveal from '@/components/layout/TextReveal';
import Magnetic from '@/components/layout/Magnetic';

export default function Contact() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

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
              <span className="text-xs font-bold uppercase tracking-widest text-neon bg-neutral-900 px-3 py-1 rounded-sm">HELLO</span>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">Get in touch</span>
            </div>
            <h1 className="experimental-title text-neutral-900">
              Let&apos;s<span className="text-outline block lg:inline lg:ml-8">Connect</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Contact Info - Avant-garde List */}
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-6">Email</h4>
                  <Magnetic strength={0.1}>
                    <a href={`mailto:${data.email}`} className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 hover:text-neon transition-colors tracking-tighter break-all">
                      {data.email}
                    </a>
                  </Magnetic>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mb-6">Phone</h4>
                  <p className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tighter">
                    {data.phone}
                  </p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pt-16 border-t border-neutral-100 max-w-lg"
              >
                <p className="text-xl text-neutral-500 leading-relaxed italic">
                  &ldquo;Currently open to new projects and collaborations. Let&apos;s create something unique together.&rdquo;
                </p>
                
                <div className="mt-12 flex flex-wrap gap-8">
                  {Object.entries(personalData.socials as Record<string, string>).map(([key, url], i) => (
                    <Magnetic key={key} strength={0.2}>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors border-b border-transparent hover:border-neon pb-1"
                      >
                        {key}
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* QR Codes - Refined Mixed Media */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:pt-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="aspect-square relative rounded-3xl overflow-hidden bg-neutral-50 p-8 border border-neutral-100 group">
                  <Image 
                    src={data.wechat_qr}
                    alt="WeChat"
                    fill
                    className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-neutral-400">WeChat ID</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-6 lg:mt-12"
              >
                <div className="aspect-square relative rounded-3xl overflow-hidden bg-neutral-50 p-8 border border-neutral-100 group">
                  <Image 
                    src={data.whatsapp_qr}
                    alt="WhatsApp"
                    fill
                    className="object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-center text-neutral-400">WhatsApp</p>
              </motion.div>
            </div>
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
