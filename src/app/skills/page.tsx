'use client';

import Layout from '@/components/layout/Layout';
import SkillsOverview from '@/components/home/SkillsOverview';
import { useLanguage } from '@/context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="page-shell">
        <div className="asymmetric-container">
          <div className="page-hero">
            <div className="page-kicker">{t('skills.knowledgeBase')}</div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h1 className="page-title">
              {t('skills.expertise')}<br />
              <span className="text-outline block lg:inline lg:ml-8">& {t('skills.stack')}</span>
              </h1>
              <p className="page-summary">
                {t('skills.description')}
              </p>
            </div>
          </div>

          <SkillsOverview />
        </div>
      </div>
    </Layout>
  );
}
