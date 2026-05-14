import React from 'react';

const TrustSection = () => {
  const reasons = [
    {
      number: "01",
      title: "Dedicated Team Support",
      description: "A dedicated team focused on understanding your business, solving challenges, and delivering the right solutions with full transparency and support.",
      highlighted: true
    },
    {
      number: "02",
      title: "Fast & Reliable Delivery",
      description: "We deliver high-quality solutions quickly without compromising performance, scalability, or user experience.",
      highlighted: false
    },
    {
      number: "03",
      title: "AI-Driven Innovation",
      description: "We use modern technology and intelligent automation to help businesses work smarter and grow faster.",
      highlighted: false
    },
    {
      number: "04",
      title: "Clear Communication & Transparency",
      description: "We ensure clear communication, regular updates, and a collaborative process throughout every project.",
      highlighted: false
    },
    {
      number: "05",
      title: "Long-Term Partnership",
      description: "We focus on building long-term partnerships through trust, reliability, and continuous support.",
      highlighted: false
    }
  ];

  return (
    <section className="w-full py-32 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative overflow-hidden z-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:pl-32 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-20">
        
        {/* Left Side: Title */}
        <div className="lg:sticky lg:top-40 max-w-xl self-center lg:-ml-16">
          <h2 className="text-5xl md:text-6xl font-normal tracking-tight leading-[1.2] text-black/80 dark:text-white/80">
            Why Businesses <br /><span className="text-black dark:text-white">Trust Us</span>
          </h2>
        </div>

        {/* Right Side: List */}
        <div className="flex-1 w-full space-y-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-8 group">
              {/* Liquid Glass Number Box */}
              <div 
                className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-normal transition-all duration-500 backdrop-blur-xl ${
                  reason.highlighted 
                  ? 'bg-gradient-to-br from-[#7163E9] via-[#6052E5] to-[#4B3AD9] text-white shadow-[0_15px_40px_rgba(75,58,217,0.4)] scale-110 border-t border-white/20' 
                  : 'bg-white/70 dark:bg-white/[0.03] border border-white/90 dark:border-white/[0.08] text-black/60 dark:text-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none group-hover:text-black dark:group-hover:text-white group-hover:border-white dark:group-hover:border-white/20'
                }`}
                style={!reason.highlighted ? {
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.04) 100%)'
                } : {}}
              >
                {reason.number}
              </div>

              {/* Text Info */}
              <div className="pt-1">
                <h3 className="text-xl md:text-2xl font-normal mb-2 text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-black/40 dark:text-white/40 text-base md:text-lg leading-relaxed max-w-md group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors duration-300">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
