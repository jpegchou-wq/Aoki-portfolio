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
      subtitle: 'Toolbox',
      description: 'Systems-minded design across interface architecture, visual identity, motion, and AI-assisted production workflows.',
      knowledgeBase: 'Knowledge Base',
      expertise: 'Expertise',
      stack: 'Stack',
      coreExpertise: 'Core Expertise',
      capability: 'Capability',
      method: 'Method',
      research: 'Research',
      systems: 'Systems',
      visualDirection: 'Visual Direction',
      prototype: 'Prototype'
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
      product: 'Product',
      worksArchive: 'Works / Archives',
      selectedWork: 'Selected Work',
      inFocus: 'In Focus',
      openArchive: 'Open Full Archive',
      openCase: 'Open Case',
      viewCaseStudy: 'View case study'
    },
    projectDetail: {
      back: 'Back to Projects',
      overview: 'Overview',
      role: 'Role',
      highlights: 'Highlights',
      process: 'Process',
      media: 'Media',
      tools: 'Tools',
      toolsMethods: 'Tools & Methods',
      outcomes: 'Project Outcomes'
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
      required: 'Required',
      hello: 'HELLO / Get in touch',
      connect: 'Connect',
      responseRhythm: 'Response rhythm',
      bestFit: 'Best fit',
      wechatId: 'WeChat ID'
      ,
      summary: 'Open to visual systems, UI/UX collaboration, launch pages, and artistic digital work with a strong narrative point of view.',
      responseValue: 'Clear, quick, and collaborative.',
      bestFitValue: 'UI/UX / Brand / Launch'
    },
    home: {
      storyMap: 'Story Map',
      portfolioExperience: 'Portfolio Experience',
      exploreNarrative: 'Explore it like a narrative space.',
      exploreNarrativeSummary: 'This homepage is organized as a route instead of a stack: each chapter reveals a different side of my work, from cases and systems to methods and career signals.',
      caseArchive: 'Case Archive',
      capabilityModules: 'Capability Modules',
      howIWork: 'How I Work',
      experienceStory: 'Experience Story',
      currentSignal: 'Current Signal',
      currentSignalTitle: 'Visual designer with product instincts and launch awareness.',
      currentSignalSummary: 'The intersection of visual systems, interactive products, motion storytelling, and AI-assisted workflows defines the direction of this portfolio.',
      openProjects: 'Open projects',
      readProfile: 'Read profile',
      startContact: 'Start contact',
      routeCaseArchive: 'Shipped products, brand systems, visual launches.',
      routeCapabilityModules: 'UI/UX, motion instincts, systems thinking.',
      routeHowIWork: 'Research, structure, visual direction, delivery.',
      routeExperienceStory: 'Career arcs across brand, product and growth.',
      experienceHeading: 'A practice built across brand, product, and launch.',
      experienceSummary: 'Instead of treating experience as a resume block, this section frames it as a trajectory: how strategy, craft, and collaboration became one working system.'
    },
    aboutPage: {
      archive: 'Personal Profile / Archive',
      currentLocation: 'Current Location',
      digitalChannel: 'Digital Channel',
      marketTags: 'Brand / Product / Launch'
    },
    labs: {
      heroKicker: 'LAB / Experimental Space',
      heroTitle: 'Future',
      heroOutline: 'Concepts',
      heroSummary: 'A sandbox for speculative interfaces, mixed-media directions, and art-led digital experiments.',
      note: 'Lab Note',
      viewExperiment: 'View Experiment',
      back: 'Back to Labs'
    },
    common: {
      role: 'Role'
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
      subtitle: '技能清单',
      description: '以系统化思维连接界面架构、品牌表达、动态感知与 AI 协同工作流。',
      knowledgeBase: '知识体系',
      expertise: '能力',
      stack: '栈',
      coreExpertise: '核心能力',
      capability: '能力模块',
      method: '方法',
      research: '研究',
      systems: '系统',
      visualDirection: '视觉方向',
      prototype: '原型'
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
      product: '产品',
      worksArchive: '作品档案',
      selectedWork: '精选作品',
      inFocus: '聚焦',
      openArchive: '查看完整档案',
      openCase: '打开案例',
      viewCaseStudy: '查看案例详情'
    },
    projectDetail: {
      back: '返回项目',
      overview: '项目说明',
      role: '角色定位',
      highlights: '项目亮点',
      process: '过程与方法',
      media: '媒体展示',
      tools: '工具',
      toolsMethods: '工具与方法',
      outcomes: '项目成果'
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
      required: '必填',
      hello: '你好 / 联系我',
      connect: '联系',
      responseRhythm: '回复节奏',
      bestFit: '适配项目',
      wechatId: '微信'
      ,
      summary: '可合作方向包括视觉系统、UI/UX 协作、专题落地页，以及具有明确叙事视角的艺术化数字项目。',
      responseValue: '清晰、快速、可协作。',
      bestFitValue: 'UI/UX / 品牌 / 落地'
    },
    home: {
      storyMap: '故事地图',
      portfolioExperience: '作品集体验',
      exploreNarrative: '像探索叙事空间一样浏览它。',
      exploreNarrativeSummary: '这个首页不再是简单的顺排模块，而像一条路线。每个章节展示我工作的不同侧面，从案例与系统，到方法与职业轨迹。',
      caseArchive: '案例档案',
      capabilityModules: '能力模块',
      howIWork: '工作方式',
      experienceStory: '经历叙事',
      currentSignal: '当前信号',
      currentSignalTitle: '具备产品直觉与落地意识的视觉设计师。',
      currentSignalSummary: '视觉系统、交互产品、动态叙事与 AI 协同工作流的交叉点，构成了这个作品集的核心方向。',
      openProjects: '查看项目',
      readProfile: '阅读简介',
      startContact: '开始联系',
      routeCaseArchive: '已落地产品、品牌系统与传播视觉。',
      routeCapabilityModules: 'UI/UX、动态直觉与系统化思维。',
      routeHowIWork: '研究、结构、视觉方向与落地协作。',
      routeExperienceStory: '品牌、产品与增长之间的职业路径。',
      experienceHeading: '在品牌、产品与落地之间建立起来的实践。',
      experienceSummary: '这里不把经历当作简历条目，而是把它整理成一条轨迹：策略、表达与协作如何逐渐组合成同一套工作系统。'
    },
    aboutPage: {
      archive: '个人档案 / 资料库',
      currentLocation: '所在地',
      digitalChannel: '联系邮箱',
      marketTags: '品牌 / 产品 / 市场'
    },
    labs: {
      heroKicker: '实验 / 体验空间',
      heroTitle: '未来',
      heroOutline: '概念',
      heroSummary: '用于存放推测性界面、混合媒介方向与艺术主导数字实验的沙盒区域。',
      note: '实验笔记',
      viewExperiment: '查看实验',
      back: '返回实验'
    },
    common: {
      role: '角色'
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
