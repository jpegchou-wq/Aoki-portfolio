'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! (Demo only)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-blue-900 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none transition-all"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-blue-900 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none transition-all"
            placeholder="Your Email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-blue-900 font-bold mb-2">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none transition-all"
          placeholder="Topic"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-blue-900 font-bold mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none transition-all resize-none"
          placeholder="How can I help you?"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <span>Send Message</span>
        <Send size={20} />
      </button>
    </form>
  );
};

export default ContactForm;
