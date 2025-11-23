import React from 'react';
import { Shield, FileText, Lock, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer'; // <--- IMPORT THE FOOTER

const Terms = () => {
  const sections = [
    { id: 'intro', title: 'Introduction', icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'user', title: 'User Responsibilities', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'privacy', title: 'Privacy Policy', icon: Lock, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <Shield size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Legal Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before using our service. They outline the rules and regulations for the use of FoodFlow's Website.
          </p>
          <p className="mt-6 text-sm text-gray-400 font-mono bg-black/30 inline-block px-4 py-2 rounded-lg">
            Last Updated: November 24, 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 flex flex-col md:flex-row gap-8 flex-grow w-full">
        
        {/* 2. SIDEBAR NAVIGATION (Desktop Sticky) */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sticky top-24">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Table of Contents</h3>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors text-left group"
                >
                  <section.icon size={16} className={`${section.color} opacity-70 group-hover:opacity-100`} />
                  {section.title}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 px-2 mb-2">Need help?</p>
              <a href="mailto:legal@foodflow.ng" className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#FF5200] px-2 transition-colors">
                <HelpCircle size={16} /> Contact Legal
              </a>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT */}
        <div className="flex-1 space-y-6">
          
          {/* Section 1 */}
          <div id="intro" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-50 p-3 rounded-xl text-orange-500">
                <FileText size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Welcome to <span className="font-bold text-gray-900">FoodFlow</span>. By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="user" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <Shield size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. User Responsibilities</h2>
            </div>
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-4">By using our platform, you acknowledge and agree to the following responsibilities:</p>
              <ul className="space-y-3">
                {[
                  "You must be at least 18 years old to use this service.",
                  "You agree to provide accurate and complete information when creating an account.",
                  "You are responsible for maintaining the confidentiality of your account password.",
                  "You agree not to use the service for any illegal or unauthorized purpose."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div id="privacy" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-50 p-3 rounded-xl text-green-600">
                <Lock size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Privacy Policy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Please review our <span className="text-[#FF5200] font-bold cursor-pointer hover:underline">Privacy Policy</span> to understand how we collect, use, and share your information. By using FoodFlow, you consent to our data practices and agree that we can use your data in accordance with our privacy policy.
            </p>
          </div>

          {/* Section 4 */}
          <div id="liability" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-50 p-3 rounded-xl text-red-600">
                <AlertCircle size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 leading-relaxed border-l-4 border-red-100 pl-4">
              FoodFlow is not liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </div>

          {/* Contact Note */}
          <div className="text-center pt-8 pb-4">
            <p className="text-gray-400 text-sm">
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@foodflow.ng" className="text-gray-800 font-bold hover:underline">legal@foodflow.ng</a>.
            </p>
          </div>

        </div>
      </div>

      {/* INTEGRATED FOOTER */}
      <Footer />
      
    </div>
  );
};

export default Terms;