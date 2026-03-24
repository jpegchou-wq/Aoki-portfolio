import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import personalData from '@/data/personal.json';

export default function Contact() {
  return (
    <Layout>
      <div className="pt-24 bg-blue-900 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Me</h1>
          <p className="text-blue-200 text-lg">Have a project in mind? Let&apos;s talk!</p>
        </div>
      </div>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/3">
              <h3 className="text-2xl font-bold text-blue-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">Contact Info</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 text-orange-500 rounded-2xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Email</h4>
                    <p className="text-gray-600">{personalData.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 text-orange-500 rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">Location</h4>
                    <p className="text-gray-600">Remote / Global</p>
                  </div>
                </div>
                <div className="pt-8">
                  <h4 className="font-bold text-blue-900 mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href={personalData.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-900 text-white rounded-full hover:bg-orange-500 transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={personalData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-900 text-white rounded-full hover:bg-orange-500 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={personalData.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-900 text-white rounded-full hover:bg-orange-500 transition-colors">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
