import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import PlaneAnimation from './components/PlaneAnimation';
import MascotSection from './components/MascotSection';
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
              className="absolute top-[150px] left-0 w-screen pointer-events-none -z-10 scale-[1.15] md:scale-x-[1.15] md:scale-y-100 origin-top"
            />
            <div className="relative z-10">
              <HeroSection />
            </div>
          </div>
          
          {/* About + Expertise share a wrapper so the plane can span both */}
          <div className="relative">

            <div id="about" className="relative z-10">
              {/* Plane animation — left side, sits in the About section */}
              <PlaneAnimation />
              <AboutSection />
            </div>

            {/* 3D Mascot Character */}
            <div className="relative z-10">
              <MascotSection />
            </div>

            {/* Ambient Glows */}
            <div id="services" className="relative z-10">
              {/* Top Left Patch */}
              <div className="absolute top-1/4 -left-32 w-[450px] h-[200px] bg-[#7163E9]/40 rounded-full blur-[100px] pointer-events-none -z-10 -rotate-12" />
              <ExpertiseSection />
              <PortfolioSection />
            </div>
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
            
          </div>
        </main>
        <Footer theme={theme} />
      </div>
      <SpeedInsights />
    </div>
  );
}

export default App;
