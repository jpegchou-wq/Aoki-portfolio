'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'cn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      me: 'Me',
      projects: 'Projects',
      labs: 'Labs',
      contact: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm",
      cta: 'View My Work',
      contact: 'Contact Me',
      scroll: 'Scroll Down'
    },
    about: {
      title: 'Me',
      education: 'Education',
      experience: 'Experience',
      location: 'Shenzhen',
      email: 'Email',
      phone: 'Phone'
    },
    skills: {
      title: 'Core Tools & Stack',
      subtitle: 'Toolbox'
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A collection of my recent projects, focusing on user experience, performance, and clean code.',
      viewAll: 'View All Projects',
      viewCode: 'Code',
      viewDemo: 'Demo',
      all: 'All',
      illustration: 'Illustration',
      b2b: 'B2B UI/UX',
      b2c: 'B2C UI/UX',
      market: 'Marketing',
      web: 'WEB',
      brand: 'Branding',
      photo: 'Photography',
      product: 'Product'
    },
    projectDetail: {
      back: 'Back to Projects',
      overview: 'Overview',
      role: 'Role',
      highlights: 'Highlights',
      process: 'Process',
      media: 'Media'
    },
    contact: {
      title: 'Get In Touch',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      inquiry: 'Inquiry',
      wechat: 'WeChat',
      whatsapp: 'WhatsApp',
      send: 'Send Message',
      success: 'Message sent successfully!',
      required: 'Required'
    }
  },
  cn: {
    nav: {
      home: '首页',
      me: '我',
      projects: '项目',
      labs: '实验',
      contact: '联系'
    },
    hero: {
      greeting: '你好，我是',
      cta: '查看作品集',
      contact: '联系我',
      scroll: '向下滑动'
    },
    about: {
      title: '我',
      education: '教育背景',
      experience: '经历',
      location: '深圳',
      email: '邮箱',
      phone: '电话'
    },
    skills: {
      title: '核心工具与技术栈汇总',
      subtitle: '技能清单'
    },
    projects: {
      title: '精选项目',
      subtitle: '设计不只是像素的堆砌，而是情感与逻辑的博弈。我致力于在复杂的用户需求中，寻找最简洁的叙事方式。',
      viewAll: '查看所有项目',
      viewCode: '源码',
      viewDemo: '演示',
      all: '全部',
      illustration: '插画设计',
      b2b: 'B2B UI/UX',
      b2c: 'B2C UI/UX',
      market: '市场运营',
      web: 'WEB',
      brand: '品牌 VIS',
      photo: '摄影摄像',
      product: '产品'
    },
    projectDetail: {
      back: '返回项目',
      overview: '项目说明',
      role: '角色定位',
      highlights: '项目亮点',
      process: '过程与方法',
      media: '媒体展示'
    },
    contact: {
      title: '保持联系',
      name: '姓名',
      email: '邮箱',
      phone: '电话',
      inquiry: '咨询',
      wechat: '微信',
      whatsapp: 'WhatsApp',
      send: '发送消息',
      success: '消息已成功发送！',
      required: '必填'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('cn');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
