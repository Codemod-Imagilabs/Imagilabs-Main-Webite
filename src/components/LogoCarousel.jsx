import React from 'react';

// Import Logo Images
import logoShipley from '../assets/company/image-removebg-preview.png';
import logoShree from '../assets/company/image-removebg-preview (1).png';
import logoAcademy from '../assets/company/image-removebg-preview (3).png';
import logoNavStar from '../assets/company/image-removebg-preview (4).png';
import logoLilac from '../assets/company/image-removebg-preview (6).png';

const logoData = [
  { id: 1, img: logoShipley, name: "Shipleywins" },
  { id: 2, img: logoShree, name: "Shree Maruti Industries" },
  { id: 3, img: logoAcademy, name: "Academic Excellence" },
  { id: 4, img: logoNavStar, name: "NAV STAR INFOTECH" },
  { id: 5, img: logoLilac, name: "Lilac" },
];

const LogoCarousel = () => {
  return (
    <section className="w-full bg-transparent py-24 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto border-y border-white/[0.15] py-12 md:py-16 relative">
        {/* Simplified Loop: No overlapping, just a clean row */}
        <div className="flex w-fit animate-marquee gap-24 md:gap-40 px-10">
          {/* First Set */}
          {logoData.map((logo) => (
            <div 
              key={`logo1-${logo.id}`} 
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer scale-110 flex-shrink-0"
            >
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-10 md:h-12 w-auto object-contain filter brightness-125 contrast-125" 
              />
            </div>
          ))}
          {/* Second Set (identical repeat for seamlessness) */}
          {logoData.map((logo) => (
            <div 
              key={`logo2-${logo.id}`} 
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer scale-110 flex-shrink-0"
            >
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-10 md:h-12 w-auto object-contain filter brightness-125 contrast-125" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;
