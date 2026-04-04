'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import { Mail, Phone, Sparkles, MessageCircle } from 'lucide-react';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen overflow-hidden relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_9%_14%,rgba(71,186,255,0.18),transparent_30%),radial-gradient(circle_at_88%_15%,rgba(255,92,188,0.13),transparent_38%),radial-gradient(circle_at_42%_100%,rgba(108,136,255,0.12),transparent_42%)]" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-button text-xs font-semibold text-black/70 uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              <span>Connect</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] text-black mb-6">
              {t('contact.title')}
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-black/70 leading-relaxed">
              Let&apos;s build expressive, high-conversion digital experiences with clarity and craft.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="w-full space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="glass-card p-6 rounded-[1.75rem] flex items-center space-x-5 group hover:-translate-y-1 transition-transform border-white/65">
                  <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center text-black/55 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Phone size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">{t('contact.phone')}</h4>
                    <p className="text-black/85 font-medium">{data.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="glass-card p-6 rounded-[1.75rem] flex items-center space-x-5 group hover:-translate-y-1 transition-transform border-white/65">
                  <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center text-black/55 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">{t('contact.email')}</h4>
                    <p className="text-black/85 font-medium truncate">{data.email}</p>
                  </div>
                </div>
              </div>

              {/* QR Codes Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* WeChat QR */}
                <div className="glass-card p-6 rounded-[2rem] text-center space-y-4 border-white/65">
                  <div className="flex items-center justify-center space-x-2 text-black/45 mb-2">
                    <MessageCircle size={16} strokeWidth={1.5} />
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">{t('contact.wechat')}</h4>
                  </div>
                  <div className="relative w-32 h-32 mx-auto bg-white/95 p-2 rounded-2xl shadow-inner border border-black/10 overflow-hidden">
                    <Image 
                      src={data.wechat_qr}
                      alt="WeChat QR Code"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* WhatsApp QR */}
                <div className="glass-card p-6 rounded-[2rem] text-center space-y-4 border-white/65">
                  <div className="flex items-center justify-center space-x-2 text-black/45 mb-2">
                    <Phone size={16} strokeWidth={1.5} />
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">{t('contact.whatsapp')}</h4>
                  </div>
                  <div className="relative w-32 h-32 mx-auto bg-white/95 p-2 rounded-2xl shadow-inner border border-black/10 overflow-hidden">
                    <Image 
                      src={data.whatsapp_qr}
                      alt="WhatsApp QR Code"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
