import React, { useState } from 'react';
import logo from '../assets/logos/logo.png';

const Footer = ({ theme }) => {
  const [email, setEmail] = useState('');

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    window.location.href = `mailto:hello@imagilabs.in?subject=Newsletter Subscription Request&body=Hi Imagilabs Team,%0D%0A%0D%0AI would like to subscribe to your newsletter. My email address is: ${email}%0D%0A%0D%0ABest regards`;
  };
  return (
    <footer className="w-full py-8 md:py-20 bg-transparent border-t border-black/[0.05] dark:border-white/[0.05] relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top: Logo */}
        <div className="mb-8 md:mb-12">
          <img src={logo} alt="Imagilabs Logo" className={`h-10 md:h-16 w-auto object-contain transition-all duration-300 ${theme === 'light' ? 'invert' : ''}`} />
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-black/[0.08] dark:bg-white/[0.1] mb-12 md:mb-16"></div>

        {/* Middle: Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-12 md:mb-20">
          
          {/* Left: Get Started */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-normal text-black dark:text-white">Get Started</h3>
            <div className="space-y-4 text-black/40 dark:text-white/40 text-base md:text-lg font-light">
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
              <p>Bengaluru, India</p>
            </div>
          </div>

          {/* Right: Subscribe Area */}
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-normal text-black dark:text-white leading-tight">
              Innovating the Future with <br /> Simplicity.
            </h3>
            
            {/* Newsletter Input */}
            <form onSubmit={handleSubscribeSubmit} className="relative max-w-md">
              <div className="flex items-center bg-white rounded-full p-1 pl-4 md:pl-6 shadow-2xl transition-all duration-300">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-black placeholder-gray-400 w-full text-sm md:text-base"
                  required
                />
                <button type="submit" className="bg-[#5B49E9] hover:bg-[#4B3AD9] text-white font-medium py-2.5 px-6 md:py-3 md:px-8 rounded-full transition-colors text-xs md:text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-black/[0.08] dark:bg-white/[0.1] mb-12"></div>

        {/* Bottom: Copyright */}
        <div className="text-center text-black/40 dark:text-white/40 text-sm font-light">
          <p>© 2026 Imagilabs Co. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
