import React from 'react';

const PortfolioSection = () => {
  const projects = [
    {
      title: "LilacbySoi",
      category: "E-commerce Website",
      description: ""
    },
    {
      title: "TaskForge App",
      category: "Production Tracker WebApp",
      description: ""
    },
    {
      title: "Shree Maruthi Industries",
      category: "Business Profile Website",
      description: ""
    },
    {
      title: "Voice Technology Startup",
      category: "",
      description: "Voxera builds voice assistants for enterprise use. They needed a branding refresh, product site, and live demo portal. Get for free for this product"
    }
  ];

  return (
    <section className="w-full py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <h2 className="text-5xl md:text-6xl font-normal tracking-tight">Portfolio</h2>
          <p className="text-white/40 text-lg md:text-xl max-w-xs md:text-right leading-relaxed">
            Minimalist and intuitive design for seamless experiences.
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/[0.1] mb-16"></div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Placeholder (Empty/Gray) */}
              <div className="aspect-[16/10] bg-white/[0.03] rounded-3xl mb-8 border border-white/[0.05] group-hover:border-white/[0.1] transition-all duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-normal mb-2 group-hover:text-brand-purple transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-white/40 text-lg">{project.category}</p>
                  )}
                  {project.description && (
                    <p className="text-white/40 text-lg max-w-md leading-relaxed mt-2">{project.description}</p>
                  )}
                </div>

                {/* View Details Button */}
                <div className="pt-2">
                  <button className="px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7163E9] to-[#4B3AD9] shadow-[0_10px_25px_rgba(75,58,217,0.3)] hover:shadow-[0_15px_35px_rgba(75,58,217,0.5)] transition-all duration-300 hover:scale-105">
                    View Details
                  </button>
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
