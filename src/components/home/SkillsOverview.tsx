'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Database, Wrench } from 'lucide-react';
import skillsData from '../../data/skills.json';

const SkillsOverview: React.FC = () => {
  const icons = {
    Frontend: <Layout className="text-orange-500 mb-6" size={40} />,
    Backend: <Database className="text-orange-500 mb-6" size={40} />,
    Tools: <Code className="text-orange-500 mb-6" size={40} />,
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Core Skills</h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all text-center border-b-4 border-transparent hover:border-orange-500"
            >
              <div className="flex justify-center">
                {icons[category.category as keyof typeof icons]}
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{category.category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;
