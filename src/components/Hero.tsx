import React from 'react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-green-600">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616077168712-fc6c788dc4ee?auto=format&fit=crop&q=80')`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 py-12 md:py-20">
        <h1 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-white leading-tight">
          Ethiopia's Premier<br />Subscription Hub
        </h1>
        <p className="text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-white/90 px-4">
          Manage all your digital subscriptions in one secure place. Access Netflix, 
          Amazon Prime, and more with ease through our localized platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
          <button 
            onClick={() => scrollToSection('plans')}
            className="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}