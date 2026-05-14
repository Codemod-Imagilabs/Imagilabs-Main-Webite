import React from 'react';
import homeBg from './assets/home-bg/Homepage.png';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LogoCarousel from './components/LogoCarousel';
import AboutSection from './components/AboutSection';
import ExpertiseSection from './components/ExpertiseSection';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden transition-colors duration-300">
      {/* App Content */}
      <div className="relative z-10 bg-transparent">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          {/* Main content area on black */}
          <div id="homepage" className="relative">
            {/* Background PNG treated as a floating element */}
            <img 
              src={homeBg} 
              alt=""  
              className="absolute top-[40px] left-0 w-screen pointer-events-none -z-10"
              style={{ transform: 'scaleX(1.15)', transformOrigin: 'center top' }}
            />
            <div className="relative z-10">
              <HeroSection />
              
            </div>
          </div>
          
          <div id="about">
            <AboutSection />
          </div>
          
          {/* Ambient Glows */}
          <div id="services" className="relative">
            {/* Top Left Patch */}
            <div className="absolute top-1/4 -left-32 w-[450px] h-[200px] bg-[#7163E9]/40 rounded-full blur-[100px] pointer-events-none -z-10 -rotate-12" />
            <ExpertiseSection />
            <PortfolioSection />
          </div>

          <div className="relative">
            {/* Middle Right Patch */}
            <div className="absolute top-1/2 -right-32 w-[500px] h-[250px] bg-[#4B3AD9]/35 rounded-full blur-[110px] pointer-events-none -z-10 rotate-12 -translate-y-1/2" />
            <TrustSection />
          </div>

          <div className="relative">
            {/* Bottom Left Patch */}
            <div className="absolute top-1/3 -left-32 w-[450px] h-[200px] bg-[#7163E9]/40 rounded-full blur-[100px] pointer-events-none -z-10 -rotate-6" />
            <TestimonialsSection />
            
          </div>
          
          <div id="contact">
            <CTASection />
            <LogoCarousel />
          </div>
        </main>
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App;
