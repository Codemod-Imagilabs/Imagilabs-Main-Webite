import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LogoCarousel from './components/LogoCarousel';

// Lazy-load sections below the fold to code-split heavy libraries (GSAP, Framer Motion)
const AboutSection = lazy(() => import('./components/AboutSection'));
const ExpertiseSection = lazy(() => import('./components/ExpertiseSection'));
const TrustSection = lazy(() => import('./components/TrustSection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const CTASection = lazy(() => import('./components/CTASection'));
const PortfolioSection = lazy(() => import('./components/PortfolioSection'));
const PlaneAnimation = lazy(() => import('./components/PlaneAnimation'));
const MascotSection = lazy(() => import('./components/MascotSection'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });
  const [renderMascot, setRenderMascot] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));
      const handle = idleCallback(() => setRenderMascot(true));
      return () => {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(handle);
        } else {
          clearTimeout(handle);
        }
      };
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            <div className="relative z-10">
              <HeroSection />
            </div>
          </div>
          
          {/* Lazy loaded parts wrapped in a single Suspense context */}
          <Suspense fallback={null}>
            <LogoCarousel />

            {/* About + Expertise share a wrapper so the plane can span both */}
            <div className="relative">
              <div id="about" className="relative z-10">
                {/* Plane animation — left side, sits in the About section */}
                <PlaneAnimation />
                <AboutSection />
              </div>

              {/* 3D Mascot Character */}
              <div className="relative z-10">
                {!isMobile && renderMascot && <MascotSection />}
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

            <Footer theme={theme} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;
