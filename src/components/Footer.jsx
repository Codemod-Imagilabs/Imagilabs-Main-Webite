import React from 'react';
import logo from '../assets/logos/logo.png';

const Footer = ({ theme }) => {
  return (
    <footer className="w-full py-12 md:py-20 bg-transparent border-t border-zinc-200/50 dark:border-zinc-900 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Middle: Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-12 md:mb-16">
          
          {/* Left: Logo & Tagline */}
          <div className="space-y-6 text-left">
            <div className="cursor-pointer w-fit">
              <img 
                src={logo} 
                alt="Imagilabs Logo" 
                className={`h-10 md:h-14 w-auto object-contain transition-all duration-300 ${theme === 'light' ? 'invert' : ''}`} 
              />
            </div>
            <p className="text-lg md:text-2xl font-light text-black/60 dark:text-white/60 leading-relaxed max-w-md">
              Innovating the Future with Simplicity.
            </p>
          </div>

          {/* Right: Get Started */}
          <div className="flex md:justify-end">
            <div className="space-y-4 md:space-y-6 text-left">
              <h3 className="text-xl md:text-2xl font-normal text-black dark:text-white">Get Started</h3>
              <div className="space-y-3 text-black/40 dark:text-white/40 text-base md:text-lg font-light">
                <a 
                  href="mailto:hello@imagilabs.in" 
                  className="block hover:text-black dark:hover:text-white transition-colors cursor-pointer w-fit"
                >
                  hello@imagilabs.in
                </a>
                <a 
                  href="https://wa.me/917892713993?text=Hi%20Imagilabs!%20I'm%20interested%20in%20starting%20a%20project%20with%20you.%20Let's%20connect%20and%20discuss%20the%20details." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block hover:text-black dark:hover:text-white transition-colors cursor-pointer w-fit"
                >
                  +91 7892713993
                </a>
                <p className="w-fit">Bengaluru, India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom: Divider Line */}
        <div className="w-full h-px bg-zinc-200/60 dark:bg-zinc-900 mb-8"></div>

        {/* Bottom: Copyright */}
        <div className="text-center text-black/30 dark:text-white/30 text-sm font-light">
          <p>© 2026 Imagilabs Co. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
