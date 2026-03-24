'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '../../data/projects.json';

const FeaturedProjects: React.FC = () => {
  // Get top 3 projects for featured section
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1.5 bg-orange-500"></div>
          </div>
          <Link
            href="/projects"
            className="px-8 py-3 border-2 border-blue-900 text-blue-900 font-bold rounded-full hover:bg-blue-900 hover:text-white transition-all"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-blue-900 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <ExternalLink size={24} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-blue-900 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-900 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
