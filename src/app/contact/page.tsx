'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TextReveal from '@/components/layout/TextReveal';

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
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-6 block">
              Connect
            </span>
            <TextReveal
              text={language === 'en' ? "Let&apos;s Talk" : '取得联系'}
              className="font-display text-6xl md:text-[10rem] font-bold tracking-tighter leading-none mb-12 text-neutral-900"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info - Brutalist Grid */}
            <div className="lg:col-span-7 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-12 border-2 border-neutral-900 group hover:bg-neutral-900 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-500 mb-4 block">Email</span>
                  <a href={`mailto:${data.email}`} className="font-display text-2xl font-bold group-hover:text-neon transition-colors break-all">
                    {data.email}
                  </a>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-12 border-2 border-neutral-900 group hover:bg-neutral-900 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-500 mb-4 block">Phone</span>
                  <p className="font-display text-2xl font-bold group-hover:text-neon transition-colors">
                    {data.phone}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* QR Codes - Mixed Media */}
            <div className="lg:col-span-5 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-square relative border-2 border-neutral-900 p-4">
                    <Image 
                      src={data.wechat_qr}
                      alt="WeChat"
                      fill
                      className="object-contain p-4 grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-center text-neutral-400">WeChat</p>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square relative border-2 border-neutral-900 p-4">
                    <Image 
                      src={data.whatsapp_qr}
                      alt="WhatsApp"
                      fill
                      className="object-contain p-4 grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-center text-neutral-400">WhatsApp</p>
                </div>
              </div>
              
              <div className="p-8 bg-neon text-black">
                <p className="font-mono text-xs uppercase tracking-widest font-bold mb-4">Available for Freelance</p>
                <p className="text-sm leading-relaxed">
                  Currently open to new projects and collaborations. Let&apos;s create something unique together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
