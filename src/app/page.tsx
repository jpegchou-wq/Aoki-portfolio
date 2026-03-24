import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import SkillsOverview from '@/components/home/SkillsOverview';
import FeaturedProjects from '@/components/home/FeaturedProjects';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <SkillsOverview />
      <FeaturedProjects />
    </Layout>
  );
}
