import React, { useState } from 'react';
import { Wallet, LogOut, Menu, X, UserPlus } from 'lucide-react';
import { Clock } from './Clock';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './Login';

export function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-orange-500 mr-2" />
              <span className="text-xl font-bold text-green-600">Birr Pay</span>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('plans')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Plans
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Contact
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Clock />
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="flex items-center text-gray-600 hover:text-green-600"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Login
                  </button>
                </div>
              )}
              <button 
                onClick={() => scrollToSection('plans')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="pt-4 pb-3 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="px-4 py-2 text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('plans')}
                  className="px-4 py-2 text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Plans
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-4 py-2 text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Contact
                </button>
                <div className="pt-2">
                  <Clock />
                </div>
                {user ? (
                  <button
                    onClick={logout}
                    className="flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Login
                  </button>
                )}
                <button 
                  onClick={() => scrollToSection('plans')}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
}