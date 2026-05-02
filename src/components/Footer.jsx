import React from 'react';
import logo from '../assets/logos/logo.png';

const Footer = () => {
  return (
    <footer className="w-full py-20 bg-transparent border-t border-white/[0.05] relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top: Logo */}
        <div className="mb-12">
          <img src={logo} alt="Imagilabs Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/[0.1] mb-16"></div>

        {/* Middle: Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
          
          {/* Left: Get Started */}
          <div className="space-y-6">
            <h3 className="text-2xl font-normal text-white">Get Started</h3>
            <div className="space-y-4 text-white/40 text-lg font-light">
              <p className="hover:text-white transition-colors cursor-pointer">hello@imgilabs.in</p>
              <p className="hover:text-white transition-colors cursor-pointer">+91 7892713993</p>
              <p>Bengaluru, India</p>
            </div>
          </div>

          {/* Right: Subscribe Area */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-normal text-white leading-tight">
              Innovating the Future with <br /> Simplicity.
            </h3>
            
            {/* Newsletter Input */}
            <div className="relative max-w-md">
              <div className="flex items-center bg-white rounded-full p-1 pl-6 shadow-2xl transition-all duration-300">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border-none outline-none text-black placeholder-gray-400 w-full text-base"
                />
                <button className="bg-[#5B49E9] hover:bg-[#4B3AD9] text-white font-medium py-3 px-8 rounded-full transition-colors text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/[0.1] mb-12"></div>

        {/* Bottom: Copyright */}
        <div className="text-center text-white/40 text-sm font-light">
          <p>© 2026 Imagilabs Co. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
