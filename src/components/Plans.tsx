import React from 'react';
import { Check } from 'lucide-react';

export function Plans() {
  const plans = [
    {
      name: "3 Months",
      price: "1,499 ETB",
      features: ["Basic streaming services", "Email support", "Manual renewal"]
    },
    {
      name: "6 Months",
      price: "2,799 ETB",
      features: ["All streaming services", "Priority support", "Auto-renewal option", "Custom services"]
    },
    {
      name: "1 Year",
      price: "4,999 ETB",
      features: ["All premium services", "24/7 priority support", "Auto-renewal", "Custom services", "Family sharing"]
    }
  ];

  return (
    <section id="plans" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-2xl p-8 ${
              index === 1 ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white transform scale-105' 
              : 'bg-gray-50'
            }`}>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-8">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-semibold ${
                index === 1 
                ? 'bg-white text-purple-600 hover:bg-purple-50' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}