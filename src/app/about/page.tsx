import Layout from '@/components/layout/Layout';
import PersonalIntro from '@/components/about/PersonalIntro';
import personalData from '@/data/personal.json';

export default function About() {
  return (
    <Layout>
      <div className="pt-24 bg-blue-900 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Me</h1>
          <p className="text-blue-200 text-lg">Get to know the developer behind the code</p>
        </div>
      </div>
      <PersonalIntro />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">Education</h3>
              <div className="space-y-8">
                {personalData.education.map((edu, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-500">
                    <h4 className="text-xl font-bold text-blue-900 mb-1">{edu.school}</h4>
                    <p className="text-orange-500 font-medium mb-2">{edu.degree}</p>
                    <p className="text-gray-500 text-sm">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">Experience</h3>
              <div className="space-y-8">
                {personalData.experience.map((exp, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-900">
                    <h4 className="text-xl font-bold text-blue-900 mb-1">{exp.position}</h4>
                    <p className="text-orange-500 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-4">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
