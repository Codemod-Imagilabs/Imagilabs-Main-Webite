import React from 'react';

const CTASection = () => {
  return (
    <section className="w-full py-16 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Three-stop Linear Gradient Container with more dark purple */}
        <div className="w-full py-8 md:py-16 rounded-[2.5rem] bg-[linear-gradient(to_right,#4B3AD9_0%,#4B3AD9_20%,#7163E9_50%,#4B3AD9_80%,#4B3AD9_100%)] flex flex-col items-center text-center px-6 relative overflow-hidden shadow-[0_30px_100px_rgba(75,58,217,0.2)]">
          
          {/* Subtle Shine/Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10 max-w-5xl space-y-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-tight whitespace-nowrap">
              Ready to Build with Us?
            </h2>
            
            <p className="text-white/80 text-base md:text-lg font-light max-w-2xl mx-auto">
              Let's discuss your vision and make something great together.
            </p>

            <div className="pt-2">
              <button className="px-8 py-3 bg-[#4B3AD9] text-white font-normal rounded-full text-base border border-white/10 hover:bg-[#4334C4] hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
