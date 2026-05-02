import React from 'react';
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
import CursorGlow from './components/CursorGlow';

// Import Icons
import photoshopIcon from './assets/icons/photoshop.png';
import illustratorIcon from './assets/icons/adobe-illustrator.png';
import figmaIcon from './assets/icons/figma.png';
import dockerIcon from './assets/icons/Docker.png';
import githubIcon from './assets/icons/github.png';

function App() {
  return (
    <div className="bg-black min-h-screen font-sans text-white relative overflow-x-hidden">
      {/* Dynamic Mouse Tracking Glow (placed behind everything) */}
      <div className="fixed inset-0 z-0">
        <CursorGlow />
      </div>

      {/* App Content */}
      <div className="relative z-10 bg-transparent">
        <Navbar />
        <main>
          {/* Main content area on black */}
          <div className="relative">
            <div className="relative z-10">
              <HeroSection />
              <LogoCarousel />
            </div>
          </div>
          
          <AboutSection />
          <ExpertiseSection />
          <PortfolioSection />
          <TrustSection />
          <FAQSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
