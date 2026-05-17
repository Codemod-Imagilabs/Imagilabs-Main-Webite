import React, { useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const texts = [
    "We skipped",
    "the fake",
    "review part."
  ];

  useEffect(() => {
    const elts = {
      text1: text1Ref.current,
      text2: text2Ref.current
    };

    if (!elts.text1 || !elts.text2) return;

    // Controls the speed of morphing
    const morphTime = 1.0;
    const cooldownTime = 0.35;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function setMorph(fraction) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      
      let fraction = morph / morphTime;
      
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      
      setMorph(fraction);
    }

    function doCooldown() {
      morph = 0;
      
      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";
      
      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;
      
      cooldown -= dt;
      
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }
        
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full py-24 md:py-48 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative overflow-hidden z-10 transition-colors duration-300">
      
      {/* Ambient Pulsing Glow Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-[#7163E9]/15 to-[#4B3AD9]/15 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[260px]">
        
        {/* Morphing Text Container - Applies threshold SVG filter and blur */}
        <div 
          className="relative w-full h-[120px] md:h-[200px] flex items-center justify-center select-none"
          style={{ filter: "url(#threshold) blur(0.6px)" }}
        >
          <span 
            ref={text1Ref}
            className="absolute w-full text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-black dark:text-white select-none leading-none font-sans whitespace-nowrap"
          />
          <span 
            ref={text2Ref}
            className="absolute w-full text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-black dark:text-white select-none leading-none font-sans whitespace-nowrap"
          />
        </div>

        {/* SVG filter used to create the merging/gooey effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <defs>
            <filter id="threshold">
              {/* Opacity-cutoff Matrix to merge pixels with blur into a solid gooey edge */}
              <feColorMatrix 
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 255 -140" 
              />
            </filter>
          </defs>
        </svg>

        {/* Subtle light reflect line underneath */}
        <div className="h-px w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#7163E9]/40 to-transparent mt-8 md:mt-12" />
        
      </div>

    </section>
  );
};

export default TestimonialsSection;
