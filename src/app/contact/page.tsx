'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, Phone, QrCode, Sparkles, MessageCircle } from 'lucide-react';
import personalData from '@/data/personal.json';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  const { language, t } = useLanguage();
  const data = language === 'en' ? personalData.en : personalData.cn;

  return (
    <Layout>
      <div className="pt-32 pb-24 min-h-screen overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-xs font-medium text-black/40 uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              <span>Connect</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-black/90 mb-6">
              {t('contact.title')}
            </h1>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12 space-y-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Phone */}
                <div className="glass-card p-8 rounded-[1.75rem] flex items-center space-x-6 group hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 bg-black/[0.03] rounded-2xl flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Phone size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-black/30 mb-1">{t('contact.phone')}</h4>
                    <p className="text-black/70 font-medium">{data.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="glass-card p-8 rounded-[1.75rem] flex items-center space-x-6 group hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 bg-black/[0.03] rounded-2xl flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-black/30 mb-1">{t('contact.email')}</h4>
                    <p className="text-black/70 font-medium truncate">{data.email}</p>
                  </div>
                </div>
              </div>

              {/* QR Codes Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* WeChat QR */}
                <div className="glass-card p-8 rounded-[2rem] text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-black/30 mb-2">
                    <MessageCircle size={16} strokeWidth={1.5} />
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">{t('contact.wechat')}</h4>
                  </div>
                  <div className="relative w-32 h-32 mx-auto bg-white p-2 rounded-2xl shadow-inner border border-black/5 overflow-hidden">
                    <Image 
                      src={data.wechat_qr}
                      alt="WeChat QR Code"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* WhatsApp QR */}
                <div className="glass-card p-8 rounded-[2rem] text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-black/30 mb-2">
                    <Phone size={16} strokeWidth={1.5} />
                    <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">{t('contact.whatsapp')}</h4>
                  </div>
                  <div className="relative w-32 h-32 mx-auto bg-white p-2 rounded-2xl shadow-inner border border-black/5 overflow-hidden">
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

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
              className="w-full lg:w-7/12 glass-card p-10 md:p-16 rounded-[2rem]"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
