import React from 'react';

// Import Logo Images
import logoShipley from '../assets/company/image-removebg-preview.webp';
import logoShree from '../assets/company/image-removebg-preview (1).webp';
import logoAcademy from '../assets/company/image-removebg-preview (3).webp';
import logoNavStar from '../assets/company/image-removebg-preview (4).webp';
import logoLilac from '../assets/company/image-removebg-preview (6).webp';

const logoData = [
  { id: 1, img: logoShipley, name: "Shipleywins" },
  { id: 2, img: logoShree, name: "Shree Maruti Industries" },
  { id: 3, img: logoAcademy, name: "Academic Excellence" },
  { id: 4, img: logoNavStar, name: "NAV STAR INFOTECH" },
  { id: 5, img: logoLilac, name: "Lilac" },
];

const LogoCarousel = () => {
  return (
    <section className="w-full bg-transparent pt-4 pb-16 md:py-24 relative z-20 overflow-hidden">
      {/* Top border line - constrained like before */}
      <div className="max-w-7xl mx-auto border-t border-black/[0.08] dark:border-white/[0.15]" />
      {/* Logos scroll full width */}
      <div className="w-full py-8 md:py-16 relative overflow-hidden">
        {/* Simplified Loop: No overlapping, just a clean row */}
        <div className="flex w-fit animate-marquee gap-16 md:gap-40 px-10" style={{ transform: 'translateX(-33.33%)' }}>
          {/* First Set */}
          {logoData.map((logo) => (
            <div 
              key={`logo1-${logo.id}`} 
              className="flex items-center justify-center grayscale-0 opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer scale-110 flex-shrink-0"
            >
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-7 md:h-12 w-auto object-contain filter brightness-150 contrast-125" 
              />
            </div>
          ))}
          {/* Second Set */}
          {logoData.map((logo) => (
            <div 
              key={`logo2-${logo.id}`} 
              className="flex items-center justify-center grayscale-0 opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer scale-110 flex-shrink-0"
            >
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-7 md:h-12 w-auto object-contain filter brightness-150 contrast-125" 
              />
            </div>
          ))}
          {/* Third Set (ensures left side is never blank) */}
          {logoData.map((logo) => (
            <div 
              key={`logo3-${logo.id}`} 
              className="flex items-center justify-center grayscale-0 opacity-90 hover:opacity-100 transition-all duration-500 cursor-pointer scale-110 flex-shrink-0"
            >
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-7 md:h-12 w-auto object-contain filter brightness-150 contrast-125" 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Bottom border line - constrained like before */}
      <div className="max-w-7xl mx-auto border-b border-black/[0.08] dark:border-white/[0.15]" />
    </section>
  );
};

export default LogoCarousel;
