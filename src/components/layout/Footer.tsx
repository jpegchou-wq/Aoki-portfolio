import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import personalData from '../../data/personal.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="flex space-x-6 mb-8">
          <a href={personalData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
            <Github size={24} />
          </a>
          <a href={personalData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href={personalData.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
            <Twitter size={24} />
          </a>
          <a href={`mailto:${personalData.email}`} className="hover:text-orange-500 transition-colors">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {currentYear} {personalData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
