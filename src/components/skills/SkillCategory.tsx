'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SkillItem as SkillItemType } from '../../utils/types';

interface SkillCategoryProps {
  category: string;
  items: SkillItemType[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category, items }) => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-blue-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">
        {category}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((skill, index) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-900">{skill.name}</span>
              <span className="text-orange-500 font-medium">{skill.level}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full bg-orange-500"
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
