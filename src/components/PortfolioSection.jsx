import React from 'react';
import lilacImg from '../assets/portfolio/Lilacbysoi.jpeg';
import testImg from '../assets/portfolio/test.jpeg';
import taskForgeImg from '../assets/portfolio/Taskforge.jpeg';
import shiplyImg from '../assets/portfolio/SHIPLEY.jpeg'
import gyanImg from '../assets/portfolio/GYNI.jpeg' 

const PortfolioSection = () => {
  const projects = [
    {
      title: "Lilac by Soi",
      category: "Fashion Store",
      description: "A modern fashion brand focused on elevated everyday wear with clean aesthetics, minimal styling, and trend-driven collections.",
      image: lilacImg,
      link: "https://lilacbysoi.in/"
    },
    {
      title: "TaskForge App",
      category: "Production Tracker WebApp",
      description: "A heavy-duty tracking tool for streamlining complex production workflows.",
      image: taskForgeImg,
      link: "https://taskforge.imagilabs.in"
    },
    {
      title: "Shipley Wins",
      category: "Business Development & Bid Strategy Platform",
      description: "A global consulting and training platform helping organizations improve sales, proposal management, and business-winning strategies",
      image: shiplyImg,
      link: "https://www.shipleywins.com/"
    },
    {
      title: "Gyaniversity",
      category: "Learning Platform",
      description: "A modern education platform offering smart study resources, guidebooks, and AI-driven learning tools for students across India",
      image: gyanImg,
      link: "https://www.gyaniversity.com/"
    }
  ];

  return (
    <section className="w-full py-10 md:py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 md:gap-6 text-left">
          <h2 className="text-3xl md:text-6xl font-normal tracking-tight text-black dark:text-white">Portfolio</h2>
          
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-black/[0.08] dark:bg-white/[0.1] mb-12 md:mb-16"></div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Placeholder (Empty/Gray) */}
              <div className="aspect-[16/10] bg-white/60 dark:bg-white/[0.03] rounded-2xl md:rounded-3xl mb-6 md:mb-8 border border-white/80 dark:border-white/[0.05] group-hover:border-white dark:group-hover:border-white/[0.1] transition-all duration-500 overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none backdrop-blur-sm">
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 dark:from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl md:text-3xl font-normal mb-1 md:mb-2 text-black dark:text-white group-hover:text-brand-purple transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-black/40 dark:text-white/40 text-sm md:text-lg">{project.category}</p>
                  )}
                  {project.description && (
                    <p className="text-black/40 dark:text-white/40 text-sm md:text-lg max-w-md leading-relaxed mt-1 md:mt-2">{project.description}</p>
                  )}
                </div>

                {/* View Details Button */}
                <div className="pt-2">
                  <a 
                    href={project.link || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7163E9] to-[#4B3AD9] shadow-[0_10px_25px_rgba(75,58,217,0.3)] hover:shadow-[0_15px_35px_rgba(75,58,217,0.5)] transition-all duration-300 hover:scale-105"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
