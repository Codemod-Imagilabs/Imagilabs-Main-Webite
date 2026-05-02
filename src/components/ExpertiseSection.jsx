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
      title: "AI Development",
      description: "Automate and optimize with machine learning & NLP.",
      highlighted: false
    },
    {
      icon: iconTarget,
      title: "Web App Development",
      description: "Scalable, high-performance platforms for the modern user.",
      highlighted: true
    },
    {
      icon: iconLaptop,
      title: "UI/UX Design",
      description: "Minimalist and intuitive design for seamless experiences.",
      highlighted: false
    },
    {
      icon: iconSecure,
      title: "Cloud Integration",
      description: "Secure, reliable cloud services and architecture.",
      highlighted: false
    },
    {
      icon: iconSuitcase,
      title: "Product Strategy",
      description: "From ideation to launch, we help define winning products.",
      highlighted: false
    },
    {
      icon: iconSMS,
      title: "Creative Branding",
      description: "Automate and optimize with machine learning & NLP.",
      highlighted: false
    }
  ];

  return (
    <section className="w-full py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight">Our Expertise</h2>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto">
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
                : 'bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] hover:-translate-y-2'
              }`}
              style={!item.highlighted ? {
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.04) 100%)'
              } : {}}
            >
              {/* Icon - No background container */}
              <div className="mb-10 flex justify-center items-center transition-transform duration-300 group-hover:scale-110">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className={`w-8 h-8 object-contain ${item.highlighted ? 'filter brightness-0 invert' : 'opacity-80'}`} 
                />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-normal mb-4">{item.title}</h3>
              <p className={`text-lg leading-relaxed ${item.highlighted ? 'text-white/90' : 'text-white/40 group-hover:text-white/60 transition-colors duration-300'}`}>
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
