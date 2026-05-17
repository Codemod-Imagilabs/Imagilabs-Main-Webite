import React, { useEffect, useRef } from 'react';
import reviewBg from '../assets/review-bg/peakpx.jpg';

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="opacity-65 text-white/80 font-light">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const TestimonialsSection = () => {
  const textRef = useRef(null);

  const phrases = [
    "We skipped",
    "the fake",
    "review part."
  ];

  useEffect(() => {
    // Dynamically load Roboto Mono from Google Fonts
    if (!document.getElementById('roboto-mono-font')) {
      const link = document.createElement('link');
      link.id = 'roboto-mono-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap';
      document.head.appendChild(link);
    }

    const el = textRef.current;
    if (!el) return;

    const fx = new TextScramble(el);

    let counter = 0;
    let timeoutId;
    let isMounted = true;

    const next = () => {
      if (!isMounted) return;
      fx.setText(phrases[counter]).then(() => {
        if (isMounted) {
          timeoutId = setTimeout(next, 1800); // 1.8s delay between scrambles makes it highly readable
        }
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      cancelAnimationFrame(fx.frameRequest);
    };
  }, []);

  return (
    <section className="w-full py-24 md:py-48 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative overflow-hidden z-10 transition-colors duration-300">
      
      {/* Background Image - Full brightness, 100% width cropping height */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src={reviewBg} 
          alt="Section Background" 
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      {/* Ambient Pulsing Glow Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-[#7163E9]/15 to-[#4B3AD9]/15 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[260px]">
        
        {/* Scramble Text Container */}
        <div className="relative w-full h-[120px] md:h-[200px] flex items-center justify-center select-none">
          <span 
            ref={textRef}
            className="w-full text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white select-none leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          />
        </div>

        {/* Subtle light reflect line underneath */}
        <div className="h-px w-full max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#7163E9]/40 to-transparent mt-8 md:mt-12" />
        
      </div>

    </section>
  );
};

export default TestimonialsSection;
