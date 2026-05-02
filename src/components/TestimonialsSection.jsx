import React, { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "The team delivered beyond our expectations. From strategy to execution, everything was on point. Our product finally looks and feels premium.",
      name: "Abraham Doe",
      title: "Product Designer",
      rating: 5,
      size: "small"
    },
    {
      quote: "Working with this team has been a game-changer for our tech startup. Not only did they deliver a sleek and functional portfolio design, but they also helped us clarify our brand identity in the process. The collaboration felt seamless—fast turnaround times.",
      name: "Abraham Doe",
      title: "Product Designer",
      rating: 5,
      size: "large"
    },
    {
      quote: "The best agency we've worked with. Clean code, stunning design, and very responsive communication throughout the project. Highly recommend their services.",
      name: "Abraham Doe",
      title: "Product Designer",
      rating: 5,
      size: "medium"
    },
    {
      quote: "From our first call, it was clear we were working with professionals. The way they handle the project, communicated updates, and delivered creative solutions was amazing. It really stood out was their minimalist aesthetic",
      name: "Abraham Doe",
      title: "Product Designer",
      rating: 5,
      size: "small"
    }
  ];

  // Handle initial scroll to middle
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  // Handle scroll tracking to update active dot
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const totalScrollable = scrollWidth - clientWidth;
        if (totalScrollable <= 0) return;
        
        const scrollPercentage = scrollLeft / totalScrollable;
        const index = Math.round(scrollPercentage * (testimonials.length - 1));
        setActiveIndex(index);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [testimonials.length]);

  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const { scrollWidth } = scrollRef.current;
      const cardWidth = scrollWidth / testimonials.length;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  // Handle drag-to-scroll for mouse
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="w-full py-32 bg-transparent border-y border-white/[0.05] relative overflow-hidden z-10">
      {/* Header Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-5xl font-normal tracking-tight">
          What Our Clients Say
        </h2>
        <p className="text-white/40 text-lg md:text-xl font-light tracking-wide">
          Type your creative idea in a simple sentence.
        </p>
      </div>

      {/* Full Width Testimonials Carousel */}
      <div className="w-full relative px-4 md:px-0">
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex flex-nowrap items-end overflow-x-auto gap-8 pb-12 no-scrollbar snap-x pl-[5%] pr-[5%] ${isDown ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'}`}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl snap-center group hover:border-white/20 transition-all duration-500 relative overflow-hidden flex flex-col justify-between ${
                testimonial.size === 'large' ? 'w-[550px] md:w-[650px] min-h-[340px]' : 
                testimonial.size === 'medium' ? 'w-[500px] md:w-[580px] min-h-[300px]' : 
                'w-[450px] md:w-[520px] min-h-[260px]'
              }`}
            >
              {/* Glass Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote */}
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 font-light">
                "{testimonial.quote}"
              </p>

              {/* Author Info Row */}
              <div className="flex items-center justify-between w-full mt-auto pt-6 border-t border-white/[0.05]">
                <div className="flex items-center gap-4">
                  {/* Profile Image Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-white opacity-90 border border-white/10 flex-shrink-0"></div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-normal text-white">{testimonial.name}</h4>
                    <p className="text-white/40 text-xs">{testimonial.title}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white opacity-80" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Pagination Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index 
              ? 'bg-brand-purple shadow-[0_0_10px_#7163E9] scale-125' 
              : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
