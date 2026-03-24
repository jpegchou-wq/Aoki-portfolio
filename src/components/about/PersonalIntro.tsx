import React from 'react';
import Image from 'next/image';
import personalData from '../../data/personal.json';

const PersonalIntro: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={personalData.avatar}
                alt={personalData.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-500 rounded-3xl -z-10 hidden md:block"></div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">About Me</h2>
            <div className="w-20 h-1.5 bg-orange-500 mb-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {personalData.bio}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-gray-500 font-medium mb-1">Email</h4>
                <p className="text-blue-900 font-bold">{personalData.email}</p>
              </div>
              <div>
                <h4 className="text-gray-500 font-medium mb-1">Location</h4>
                <p className="text-blue-900 font-bold">Remote / Global</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalIntro;
