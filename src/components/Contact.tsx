import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useMessages } from '../contexts/MessageContext';

export function Contact() {
  const { addMessage } = useMessages();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMessage({
      user: form.name,
      email: form.email,
      content: form.message,
      date: new Date().toISOString().split('T')[0]
    });

    setForm({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-600">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-orange-500 mr-4" />
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Email Us</h3>
                <p className="text-gray-600">support@admin.birr-pay.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-orange-500 mr-4" />
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Call Us</h3>
                <p className="text-gray-600">+251 951 895 474</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-orange-500 mr-4" />
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Visit Us</h3>
                <p className="text-gray-600">Bole, Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageCircle className="h-6 w-6 text-orange-500 mr-4" />
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Telegram</h3>
                <a 
                  href="https://t.me/birrpayofficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  @birrpayofficial
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={4} 
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}