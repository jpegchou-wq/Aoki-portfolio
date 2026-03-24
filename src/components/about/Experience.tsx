import React from 'react';
import personalData from '../../data/personal.json';

const Experience: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-16 text-center">Work Experience</h2>
        
        <div className="max-w-4xl mx-auto">
          {personalData.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-12 last:pb-0 border-l-2 border-orange-500">
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-orange-500"></div>
              <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="text-2xl font-bold text-blue-900">{exp.position}</h3>
                  <span className="text-orange-500 font-bold mt-2 md:mt-0">{exp.duration}</span>
                </div>
                <h4 className="text-xl text-gray-600 font-medium mb-4">{exp.company}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
