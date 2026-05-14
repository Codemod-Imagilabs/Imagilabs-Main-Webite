import React from 'react';

const AboutSection = () => {
  return (
    <section className="w-full py-24 relative z-30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Label */}
        <div className="mb-12">
          <span className="inline-block bg-brand-purple px-6 py-2 rounded-full text-sm font-semibold text-white shadow-[0_0_25px_rgba(75,58,217,0.5)] tracking-wide">
            About us
          </span>
        </div>

        {/* Main Text Content */}
        <div className="max-w-5xl">
          <p className="text-2xl md:text-3xl lg:text-4xl text-black/50 dark:text-white/50 leading-relaxed font-normal">
           We are a team of AI engineers, developers, and designers focused on building intelligent digital solutions that drive real business growth. By combining modern technology, strategic thinking, and automation, we help businesses solve complex problems faster and work more efficiently. <br/><br/>From AI consulting and workflow automation to custom software development, we deliver scalable solutions tailored to your business needs and future growth
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
