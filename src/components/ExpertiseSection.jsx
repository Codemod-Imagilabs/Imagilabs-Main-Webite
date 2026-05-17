import React from 'react';

const ExpertiseSection = () => {
  const expertise = [
    {
      title: "AI Solutions",
      description: "Build smart AI systems, virtual assistants, and intelligent tools tailored to business needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>
      )
    },
    {
      title: "AI Automation",
      description: "Streamline operations and automate repetitive tasks with efficient AI-driven workflows.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      )
    },
    {
      title: "Custom Software Development",
      description: "Develop scalable web, mobile, and enterprise applications using modern technologies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>
      )
    },
    {
      title: "AI Consulting",
      description: "Identify business opportunities, optimize processes, and implement future-ready AI strategies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/></svg>
      )
    },
    {
      title: "UI/UX Design",
      description: "Create modern, intuitive, and user-focused digital experiences with clean and impactful design.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16a4 4 0 0 0 4-4 4 4 0 0 0-8 0 4 4 0 0 0 4 4Z"/><path d="M12 8v4"/><path d="M12 12h.01"/></svg>
      )
    },
    {
      title: "Branding & Marketing",
      description: "Enhance brand presence with AI-powered marketing strategies, content creation, and digital growth solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
      )
    }
  ];

  return (
    <section className="w-full pt-4 pb-12 md:pb-24 bg-transparent relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-normal mb-4 md:mb-6 tracking-tight text-black dark:text-white">Our Expertise</h2>
          <p className="text-black/40 dark:text-white/40 text-base md:text-xl max-w-2xl mx-auto px-4">
            Transforming your vision into digital reality with cutting-edge technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {expertise.map((item, index) => (
            <div 
              key={index}
              className="group relative aspect-square md:aspect-auto p-4 md:p-10 rounded-3xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center backdrop-blur-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.08] hover:bg-gradient-to-br hover:from-[#7163E9] hover:via-[#6052E5] hover:to-[#4B3AD9] hover:text-white hover:shadow-[0_20px_60px_rgba(75,58,217,0.4)] hover:scale-105 hover:z-10 hover:border-t-white/20"
            >
              {/* Icon - SVG that changes from purple to white on hover */}
              <div className="mb-2 md:mb-10 flex justify-center items-center transition-transform duration-300 group-hover:scale-110 text-[#7163E9] group-hover:text-white">
                <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                  {React.cloneElement(item.icon, { 
                    width: "32", 
                    height: "32", 
                    className: "transition-colors duration-300" 
                  })}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-sm md:text-2xl font-normal mb-1 md:mb-4 text-black dark:text-white group-hover:text-white transition-colors duration-300">{item.title}</h3>
              <p className="text-[10px] md:text-lg leading-tight md:leading-relaxed text-black/50 dark:text-white/40 group-hover:text-white/90 transition-colors duration-300">
                {item.description}
              </p>

              {/* Subtle hover glow layer */}
              <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-0 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
