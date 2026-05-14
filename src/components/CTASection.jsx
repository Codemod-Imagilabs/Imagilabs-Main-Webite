import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current, 
      {
        scale: 0.85,
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%", // starts when card top is at 90% of viewport
          end: "top 50%",   // ends when card top is at 50% of viewport
          scrub: 1,        // smooth scrub for zoom feel
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Three-stop Linear Gradient Container with more dark purple */}
        <div 
          ref={cardRef}
          className="w-full py-12 md:py-20 rounded-[3rem] bg-[linear-gradient(to_right,#4B3AD9_0%,#4B3AD9_20%,#7163E9_50%,#4B3AD9_80%,#4B3AD9_100%)] flex flex-col items-center text-center px-6 relative overflow-hidden shadow-[0_40px_120px_rgba(75,58,217,0.3)]"
        >
          
          {/* Subtle Shine/Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.1] to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          <div className="relative z-10 max-w-5xl space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-tight">
              Ready to Build with Us?
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Let's discuss your vision and make something great together.
            </p>

            <div className="pt-4">
              <button className="px-10 py-4 bg-white text-[#4B3AD9] font-medium rounded-full text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
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
