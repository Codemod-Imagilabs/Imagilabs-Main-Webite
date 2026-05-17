import React from 'react';

const PortfolioSection = () => {
  const projects = [
    {
      title: "LilacbySoi",
      category: "E-commerce Website",
      description: "A premium floral e-commerce platform built for high conversions.",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmNXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxXLyKHzBm/giphy.gif"
    },
    {
      title: "TaskForge App",
      category: "Production Tracker WebApp",
      description: "A heavy-duty tracking tool for streamlining complex production workflows.",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmNXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTfO7a4U8uM0h2/giphy.gif"
    },
    {
      title: "Shree Maruthi Industries",
      category: "Business Profile Website",
      description: "Corporate identity and digital presence for a leading industrial manufacturer.",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmNXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif"
    },
    {
      title: "Voice Technology Startup",
      category: "AI Product Portal",
      description: "Voxera builds voice assistants for enterprise use. Branding refresh and demo portal.",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJmNXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6NXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKFv9S6E9D6v6eI/giphy.gif"
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
                {project.gif && (
                  <img 
                    src={project.gif} 
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
