import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, FileText } from 'lucide-react';

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Where is my order?",
      answer: "You can track your order in real-time by going to the 'My Orders' section and clicking on your active order. You will see a live map and status updates."
    },
    {
      question: "How do I change my payment method?",
      answer: "Go to Account Settings > Payment Methods. You can add a new card or remove an existing one there."
    },
    {
      question: "Can I cancel my order?",
      answer: "You can cancel an order within 5 minutes of placing it. After that, the restaurant may have already started preparing your food. Please contact support for assistance."
    },
    {
      question: "Do you deliver to my area?",
      answer: "We currently deliver to major cities including Lagos, Abuja, Port Harcourt, and Ibadan. Enter your address on the homepage to check availability."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Contact Options Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        
        {/* 1. LIVE CHAT (Placeholder for now) */}
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all text-center group cursor-pointer">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-500">Chat with our support team 24/7.</p>
        </button>

        {/* 2. EMAIL US (Clickable mailto link) */}
        <a href="mailto:support@foodflow.ng" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all text-center group cursor-pointer block">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
          <p className="text-sm text-gray-500 break-all">support@foodflow.ng</p>
        </a>

        {/* 3. CALL US (Clickable tel link) */}
        <a href="tel:+2348001234567" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all text-center group cursor-pointer block">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
            <Phone size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
          <p className="text-sm text-gray-500">+234 800 123 4567</p>
        </a>

      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openFaq === index ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              
              {openFaq === index && (
                <div className="p-4 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Support;