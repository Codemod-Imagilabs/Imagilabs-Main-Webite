import React, { useState, useEffect } from 'react';

// Import Icons
import reactIcon from '../assets/icons/React.png';
import illustratorIcon from '../assets/icons/adobe-illustrator.png';
import figmaIcon from '../assets/icons/figma.png';
import dockerIcon from '../assets/icons/Docker.png';
import githubIcon from '../assets/icons/github.png';


const words = [
  "Innovation", 
  "Creativity", 
  "Solutions", 
  "Automation", 
  "Intelligence", 
  "Technology"
];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Rolling Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentWordIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Handle the "snap back" for seamless loop
  useEffect(() => {
    if (currentWordIndex === words.length) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentWordIndex(0);
      }, 700); // Should match the transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentWordIndex]);

  // The word to show for the dynamic width
  const widthWord = words[currentWordIndex % words.length];

  return (
    <section 
      className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden text-black dark:text-white transition-colors duration-300 pt-44"
    >
      
      {/* Floating Liquid Glass Icons — constrained inside hero overflow-hidden */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-[18%] left-[15%] opacity-90 animate-[float_6s_ease-in-out_infinite]">
          <div className="w-16 h-16 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/90 dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={reactIcon} alt="React" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute top-[28%] right-[18%] opacity-90 animate-[float_7s_ease-in-out_infinite_1s]">
          <div className="w-16 h-16 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/90 dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={illustratorIcon} alt="Illustrator" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute bottom-[25%] left-[25%] opacity-90 animate-[float_8s_ease-in-out_infinite_2s]">
          <div className="w-16 h-16 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/90 dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={figmaIcon} alt="Figma" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute bottom-[15%] right-[15%] opacity-90 animate-[float_6.5s_ease-in-out_infinite_0.5s]">
          <div className="w-16 h-16 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/90 dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={dockerIcon} alt="Docker" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute top-[48%] right-[10%] opacity-90 animate-[float_7.5s_ease-in-out_infinite_1.5s]">
          <div className="w-16 h-16 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/90 dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img src={githubIcon} alt="GitHub" className="w-8 h-8 object-contain dark:invert" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-normal tracking-tight mb-12 leading-tight">
          <span className="block mb-4 md:mb-6">Empowering Businesses</span>
          <span className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-4">
            <span className="relative inline-block align-middle transition-all duration-500 ease-in-out">
              <span className="relative inline-flex overflow-hidden bg-white/60 dark:bg-white/[0.03] backdrop-blur-[40px] saturate-[2] px-10 py-3 md:py-4 rounded-full border border-white/80 dark:border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500">
                {/* Invisible word to set dynamic width */}
                <span className="invisible whitespace-nowrap h-[1.2em] flex items-center text-3xl md:text-6xl">{widthWord}</span>
                
                {/* Rolling words list */}
                <div 
                  className={`absolute inset-0 w-full ${isAnimating ? 'transition-transform duration-700 ease-[cubic-bezier(0.76, 0, 0.24, 1)]' : ''}`}
                  style={{ transform: `translateY(-${currentWordIndex * 100}%)` }}
                >
                  {[...words, words[0]].map((word, i) => (
                    <div 
                      key={i} 
                      className="h-full w-full flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-400 whitespace-nowrap px-8 text-3xl md:text-6xl font-normal"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </span>
            </span>
            <span className="opacity-90">with Ai</span>
          </span>
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          We build intelligent, scalable, and secure digital solutions to help your business thrive in the modern world.
        </p>

        {/* Email Input Form — Lavender in light mode */}
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="flex items-center bg-[#ABA6FF] dark:bg-white/[0.07] border border-[#9B95FF] dark:border-white/10 rounded-full p-1 pl-6 shadow-[0_8px_40px_rgba(113,99,233,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 dark:hover:border-white/20"
        >
          <input 
            type="email" 
            placeholder="shahin.ki.jai@gmail.com" 
            className="bg-transparent border-none outline-none text-black dark:text-white placeholder-gray-600 dark:placeholder-gray-500 w-64 md:w-80 font-light"
            required
          />
          <button 
            type="submit" 
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
