import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What industries do you specialize in?",
      answer: "We specialize in working with startups and businesses in Ai, SaaS, fintech, healthtech, and smart agriculture. Our experience spans across multiple tech-driven sectors."
    },
    {
      question: "Can you help with both design and development?",
      answer: "Yes, we provide end-to-end solutions covering everything from initial UI/UX design to full-stack development and deployment."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity, but a typical MVP usually takes between 4 to 8 weeks from design to launch."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Absolutely. We offer various maintenance and support packages to ensure your product remains secure, updated, and scalable after launch."
    }
  ];

  return (
    <section className="w-full py-32 bg-transparent relative overflow-hidden z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-20">
        
        {/* Left Side: Accordion */}
        <div className="flex-1 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-black/[0.08] dark:border-white/[0.1] last:border-none"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full py-8 flex items-center gap-6 text-left group transition-all duration-300"
              >
                <div className={`flex-shrink-0 transition-all duration-500 ease-in-out ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                  <Plus className={`w-6 h-6 transition-colors duration-300 ${openIndex === index ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white'}`} />
                </div>
                <span className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${openIndex === index ? 'text-black dark:text-white' : 'text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white'}`}>
                  {faq.question}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-64 pb-8' : 'max-h-0'
                }`}
              >
                <p className="text-black/50 dark:text-white/40 text-lg leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Title & Image Placeholder */}
        <div className="lg:w-[450px] space-y-12">
          <h2 className="text-5xl md:text-6xl font-normal tracking-tight leading-tight text-black dark:text-white">
            Frequently Asked Questions
          </h2>
          
          {/* Image Placeholder (Empty/Gray) */}
          <div className="aspect-[4/3] bg-black/[0.02] dark:bg-white/[0.03] rounded-3xl border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] dark:from-white/[0.05] to-transparent"></div>
            {/* Subtle glass shine lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
