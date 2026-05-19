import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="w-full py-16 md:py-32 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative z-10 text-center transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-6xl font-normal tracking-tight text-black dark:text-white mb-6 md:mb-8">
          Testimonials
        </h2>
        <div className="text-lg md:text-2xl font-light text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed space-y-2">
          <p>We skipped the fake review part.</p>
          <p>Reach out, see our products, and rate them yourself.</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
