import React from 'react';
import { Clock, Shield, Settings, Users } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Plans",
      description: "Choose from 3-month, 6-month, or 1-year subscription plans that fit your needs."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Platform",
      description: "State-of-the-art security measures to protect your subscription data."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Easy Management",
      description: "Control all your subscriptions from a single, intuitive dashboard."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Local Support",
      description: "24/7 customer support optimized for Ethiopian users."
    }
  ];

  return (
    <section id="features" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-green-600">
          Why Choose Birr Pay?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-orange-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}