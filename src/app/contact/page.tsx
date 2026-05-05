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
      <div className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-8 tracking-tight">
              {language === 'en' ? "Let&apos;s Talk" : '取得联系'}
            </h1>
            <p className="max-w-2xl text-lg text-neutral-500 leading-relaxed">
              {language === 'en' 
                ? "Have a project in mind or just want to say hi? Feel free to reach out."
                : "有项目想法或者只是想打个招呼？随时欢迎联系我。"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info - Clean List */}
            <div className="space-y-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-3">Email</h4>
                  <a href={`mailto:${data.email}`} className="text-2xl font-medium text-neutral-900 hover:text-neutral-600 transition-colors break-all">
                    {data.email}
                  </a>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-3">Phone</h4>
                  <p className="text-2xl font-medium text-neutral-900">
                    {data.phone}
                  </p>
                </div>
              </div>

              <div className="pt-12 border-t border-neutral-100">
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Currently open to new projects and collaborations. Let&apos;s create something unique together.
                </p>
              </div>
            </div>

            {/* QR Codes - Clean Side by Side */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-neutral-50 p-6 border border-neutral-100">
                  <Image 
                    src={data.wechat_qr}
                    alt="WeChat"
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-center text-neutral-400">WeChat</p>
              </div>
              <div className="space-y-4">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-neutral-50 p-6 border border-neutral-100">
                  <Image 
                    src={data.whatsapp_qr}
                    alt="WhatsApp"
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-center text-neutral-400">WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
