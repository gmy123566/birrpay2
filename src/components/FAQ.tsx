import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does Birr Pay work?",
      answer: "Birr Pay is a subscription management platform that allows you to handle all your digital subscriptions in one place. Simply choose your desired service, select a subscription duration, make the payment through CBE or TeleBirr, and we'll handle the rest."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept payments through Commercial Bank of Ethiopia (CBE) bank transfer and TeleBirr mobile payment. Both options are secure and convenient for Ethiopian users."
    },
    {
      question: "How long does it take to activate my subscription?",
      answer: "Once we receive and verify your payment (usually within 24 hours), your subscription will be activated immediately. You'll receive a confirmation email with your account details."
    },
    {
      question: "Can I manage multiple subscriptions?",
      answer: "Yes! You can manage multiple subscriptions through your Birr Pay dashboard. Track renewal dates, monthly expenses, and manage all your digital services in one place."
    },
    {
      question: "What happens when my subscription is about to expire?",
      answer: "We'll send you email notifications before your subscription expires. You can easily renew through your dashboard or contact our support team for assistance."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we prioritize security. We use bank-grade encryption and don't store sensitive payment information. All transactions are processed through secure Ethiopian banking channels."
    },
    {
      question: "What if I need help with my subscription?",
      answer: "Our customer support team is available 24/7. You can reach us through email at support@admin.birr-pay.com or call us at +251 922 276 538 for immediate assistance."
    },
    {
      question: "Can I cancel or modify my subscription?",
      answer: "While subscriptions are generally non-refundable, our support team can assist with special circumstances. Contact us to discuss your specific situation."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <HelpCircle className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-left text-gray-800">{faq.question}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </button>

              {expandedIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}