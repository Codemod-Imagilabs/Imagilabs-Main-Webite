import React from 'react';

const AboutSection = () => {
  return (
    <section className="w-full py-24 relative z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Label */}
        <div className="mb-12">
          <span className="inline-block bg-brand-purple px-6 py-2 rounded-full text-sm font-semibold text-white shadow-[0_0_25px_rgba(75,58,217,0.5)] tracking-wide">
            About us
          </span>
        </div>

        {/* Main Text Content */}
        <div className="max-w-5xl">
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/50 leading-relaxed font-normal">
            We are a team of visionary designers and developers dedicated to crafting premium digital experiences. By blending high-fidelity aesthetics with cutting-edge technology, we help brands stand out in a crowded digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
