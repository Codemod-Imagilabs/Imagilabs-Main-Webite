import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  return (
    <section className="w-full py-24 md:py-48 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative overflow-hidden z-10 transition-colors duration-300">
      
      {/* Ambient Pulsing Glow Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-[#7163E9]/15 to-[#4B3AD9]/15 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-4"
        >
          {/* Bold, Elegant Typographical Gag Statement */}
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white select-none">
            We skipped the <br className="hidden md:block" /> fake review part.
          </h2>
          
          {/* Subtle light reflect line underneath */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
            className="h-px w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#7163E9]/40 to-transparent mt-8 md:mt-10"
          />
        </motion.div>
      </div>

    </section>
  );
};

export default TestimonialsSection;
