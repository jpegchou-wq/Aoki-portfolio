import Layout from '@/components/layout/Layout';
import SkillCategory from '@/components/skills/SkillCategory';
import skillsData from '@/data/skills.json';

export default function Skills() {
  return (
    <Layout>
      <div className="pt-24 bg-blue-900 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">My Skills</h1>
          <p className="text-blue-200 text-lg">My technical expertise and toolset</p>
        </div>
      </div>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {skillsData.map((category) => (
            <SkillCategory
              key={category.category}
              category={category.category}
              items={category.items}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
