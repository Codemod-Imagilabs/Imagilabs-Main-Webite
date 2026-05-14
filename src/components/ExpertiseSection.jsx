import React from 'react';

// Import PNG Icons
import iconRocket from '../assets/expertise/Rocket.png';
import iconTarget from '../assets/expertise/Target.png';
import iconLaptop from '../assets/expertise/Laptop.png';
import iconSecure from '../assets/expertise/Secure.png';
import iconSuitcase from '../assets/expertise/Suitcase.png';
import iconSMS from '../assets/expertise/SMS.png';

const ExpertiseSection = () => {
  const expertise = [
    {
      icon: iconRocket,
      title: "AI Solutions",
      description: "Build smart AI systems, virtual assistants, and intelligent tools tailored to business needs.",
      highlighted: false
    },
    {
      icon: iconTarget,
      title: "AI Automation",
      description: "Streamline operations and automate repetitive tasks with efficient AI-driven workflows.",
      highlighted: true
    },
    {
      icon: iconLaptop,
      title: "Custom Software Development",
      description: "Develop scalable web, mobile, and enterprise applications using modern technologies.",
      highlighted: false
    },
    {
      icon: iconSecure,
      title: "AI Consulting",
      description: "Identify business opportunities, optimize processes, and implement future-ready AI strategies.",
      highlighted: false
    },
    {
      icon: iconSuitcase,
      title: "UI/UX Design",
      description: "Create modern, intuitive, and user-focused digital experiences with clean and impactful design.",
      highlighted: false
    },
    {
      icon: iconSMS,
      title: "AI Branding & Marketing",
      description: "Enhance brand presence with AI-powered marketing strategies, content creation, and digital growth solutions.",
      highlighted: false
    }
  ];

  return (
    <section className="w-full py-24 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight text-black dark:text-white">Our Expertise</h2>
          <p className="text-black/40 dark:text-white/40 text-lg md:text-xl max-w-2xl mx-auto">
            Transforming your vision into digital reality with cutting-edge technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className={`group relative p-10 rounded-3xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center backdrop-blur-xl ${
                item.highlighted 
                ? 'bg-gradient-to-br from-[#7163E9] via-[#6052E5] to-[#4B3AD9] text-white shadow-[0_20px_60px_rgba(75,58,217,0.4)] scale-105 z-10 border-t border-white/20' 
                : 'bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:-translate-y-2'
              }`}
            >
              {/* Icon - No background container */}
              <div className="mb-10 flex justify-center items-center transition-transform duration-300 group-hover:scale-110">
                <img 
                   src={item.icon} 
                   alt={item.title} 
                   className={`w-8 h-8 object-contain ${item.highlighted ? 'filter brightness-0 invert' : 'opacity-80 dark:opacity-80 opacity-60'}`} 
                 />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-normal mb-4 text-black dark:text-white">{item.title}</h3>
              <p className={`text-lg leading-relaxed ${item.highlighted ? 'text-white/90' : 'text-black/50 dark:text-white/40 group-hover:text-black/70 dark:group-hover:text-white/60 transition-colors duration-300'}`}>
                {item.description}
              </p>

              {/* Subtle hover glow for non-highlighted cards */}
              {!item.highlighted && (
                <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
