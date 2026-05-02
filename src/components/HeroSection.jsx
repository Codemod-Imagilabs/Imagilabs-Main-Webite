import React, { useState, useEffect } from 'react';

// Import Icons
import photoshopIcon from '../assets/icons/photoshop.png';
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
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden bg-transparent text-white">
      
      {/* Fixed Liquid Glass Icons (Anchored to Hero Section) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] opacity-70">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]">
            <img src={photoshopIcon} alt="Photoshop" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute top-[25%] right-[15%] opacity-70">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]">
            <img src={illustratorIcon} alt="Illustrator" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[20%] opacity-70">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]">
            <img src={figmaIcon} alt="Figma" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute bottom-[20%] right-[10%] opacity-70">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]">
            <img src={dockerIcon} alt="Docker" className="w-8 h-8 object-contain" />
          </div>
        </div>
        <div className="absolute top-[45%] right-[5%] opacity-70">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-2xl saturate-[1.6] flex justify-center items-center border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.05)]">
            <img src={githubIcon} alt="GitHub" className="w-8 h-8 object-contain invert" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-normal tracking-tight mb-12 leading-tight">
          <span className="block mb-4 md:mb-6">Empowering the Future</span>
          <span className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-4">
            <span className="relative inline-block align-middle overflow-hidden transition-all duration-500 ease-in-out">
              <span className="relative inline-flex bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-[40px] saturate-[1.8] px-10 py-3 md:py-4 rounded-full border border-white/[0.12] shadow-[0_0_30px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500">
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
                      className="h-full w-full flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 whitespace-nowrap px-8 text-3xl md:text-6xl font-normal"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </span>
            </span>
            <span className="opacity-90">with Technology</span>
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          We build intelligent, scalable, and secure digital solutions to help your business thrive in the modern world.
        </p>

        {/* Email Input Form */}
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1 pl-6 shadow-2xl transition-all duration-300 hover:shadow-brand-purple/20 hover:border-white/20"
        >
          <input 
            type="email" 
            placeholder="franky.ki.jai@gmail.com" 
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-64 md:w-80"
            required
          />
          <button 
            type="submit" 
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
          >
            Send Email
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
