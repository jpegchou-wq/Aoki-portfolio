'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiry: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // conceptual submission logic
    console.log('Sending to: jpegchou@gmail.com');
    console.log('Form data:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSent(true);
    setFormData({ name: '', phone: '', inquiry: '' });
    
    setTimeout(() => setIsSent(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-semibold text-black/80 mb-2">{t('contact.success')}</h3>
            <p className="text-black/40 font-light">I will get back to you as soon as possible.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-semibold tracking-widest uppercase text-black/30 ml-4">
                  {t('contact.name')} <span className="text-purple-500/50">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/[0.03] border border-black/[0.05] focus:border-black/10 focus:bg-white rounded-3xl outline-none transition-all duration-300 text-black/70 placeholder:text-black/20"
                  placeholder={t('contact.name')}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold tracking-widest uppercase text-black/30 ml-4">
                  {t('contact.phone')} <span className="text-purple-500/50">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-black/[0.03] border border-black/[0.05] focus:border-black/10 focus:bg-white rounded-3xl outline-none transition-all duration-300 text-black/70 placeholder:text-black/20"
                  placeholder={t('contact.phone')}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="inquiry" className="text-xs font-semibold tracking-widest uppercase text-black/30 ml-4">
                {t('contact.inquiry')} <span className="text-purple-500/50">*</span>
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 bg-black/[0.03] border border-black/[0.05] focus:border-black/10 focus:bg-white rounded-[1.5rem] outline-none transition-all duration-300 text-black/70 placeholder:text-black/20 resize-none"
                placeholder={t('contact.inquiry')}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full py-5 bg-black text-white font-medium rounded-full transition-all duration-500 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="tracking-widest uppercase text-sm">
                {isSubmitting ? 'Sending...' : t('contact.send')}
              </span>
              {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
