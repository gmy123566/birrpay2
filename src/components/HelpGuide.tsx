import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown, CreditCard, ShoppingCart, RefreshCw, Upload, Check } from 'lucide-react';

interface GuideSection {
  title: string;
  content: string;
  steps: Array<{
    text: string;
    icon?: React.ReactNode;
  }>;
}

export function HelpGuide() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const guides: GuideSection[] = [
    {
      title: "Getting Started",
      content: "Create your account and explore Birr Pay",
      steps: [
        {
          text: "Click 'Login' in the top right corner",
          icon: <CreditCard className="h-5 w-5 text-green-600" />
        },
        {
          text: "Choose 'Sign up' to create a new account",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Fill in your details: name, email, and password",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Verify your email address through the sent link",
          icon: <Check className="h-5 w-5 text-green-600" />
        }
      ]
    },
    {
      title: "Selecting Services",
      content: "Browse and choose from our available services",
      steps: [
        {
          text: "Navigate to 'Plans' section",
          icon: <ShoppingCart className="h-5 w-5 text-green-600" />
        },
        {
          text: "Choose between starting a new plan or renewing existing one",
          icon: <RefreshCw className="h-5 w-5 text-green-600" />
        },
        {
          text: "Select your desired service (Netflix, Spotify, etc.)",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Pick your preferred subscription duration",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Add multiple services to your cart if needed",
          icon: <ShoppingCart className="h-5 w-5 text-green-600" />
        }
      ]
    },
    {
      title: "Making Payment",
      content: "Complete your subscription purchase securely",
      steps: [
        {
          text: "Review your cart and total amount",
          icon: <ShoppingCart className="h-5 w-5 text-green-600" />
        },
        {
          text: "Choose between CBE Bank Transfer or TeleBirr",
          icon: <CreditCard className="h-5 w-5 text-green-600" />
        },
        {
          text: "Transfer the exact amount shown",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Upload your payment screenshot",
          icon: <Upload className="h-5 w-5 text-green-600" />
        },
        {
          text: "Wait for admin verification (usually within 24 hours)",
          icon: <Check className="h-5 w-5 text-green-600" />
        }
      ]
    },
    {
      title: "Managing Subscriptions",
      content: "Track and manage your active subscriptions",
      steps: [
        {
          text: "View all active subscriptions in your dashboard",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Monitor subscription end dates",
          icon: <Check className="h-5 w-5 text-green-600" />
        },
        {
          text: "Track monthly and yearly expenses",
          icon: <CreditCard className="h-5 w-5 text-green-600" />
        },
        {
          text: "Renew subscriptions before expiry",
          icon: <RefreshCw className="h-5 w-5 text-green-600" />
        }
      ]
    }
  ];

  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-green-100 p-3 rounded-full">
            <HelpCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="ml-4 text-3xl font-bold text-green-800">How to Use Birr Pay</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {guides.map((guide) => (
            <div 
              key={guide.title}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-green-100"
            >
              <button
                onClick={() => setExpandedSection(expandedSection === guide.title ? null : guide.title)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full transition-colors ${
                    expandedSection === guide.title ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {expandedSection === guide.title ? (
                      <ChevronDown className="h-5 w-5 text-green-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="text-left ml-4">
                    <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.content}</p>
                  </div>
                </div>
              </button>

              {expandedSection === guide.title && (
                <div className="px-6 pb-6 space-y-6 bg-green-50/50">
                  <div className="space-y-4">
                    {guide.steps.map((step, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          {step.icon || (
                            <span className="text-sm font-medium text-green-600">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 flex-1">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}