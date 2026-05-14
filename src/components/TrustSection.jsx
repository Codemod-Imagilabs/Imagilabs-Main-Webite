import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ══════════════════════════════════════════════════
   GSAP Wave Dot Grid (from gsap.com/ui) — exact port
   ══════════════════════════════════════════════════ */
const DotGrid = () => {
  const stageRef = useRef(null);

  useGSAP(() => {
    const stage = stageRef.current;
    if (!stage) return;

    /* Position each box row via CSS transform (mask travels with it) */
    gsap.set(stage.querySelectorAll('.gbox'), { y: (i) => (i % 10) * 10 });

    const cols = stage.querySelectorAll('.gcol');
    const tl = gsap.timeline();

    /* Staggered vertical oscillation of each column */
    tl.to(cols, {
      duration: 1.5,
      y: 11,
      ease: 'sine.inOut',
      stagger: { amount: 3, repeat: -1, yoyo: true },
    }, 0);

    /* Per-column circle scale + y animation */
    for (let i = 0; i <= 9; i++) {
      const circles = stage.querySelectorAll(`.gcol-${i} circle`);
      tl.add(
        gsap.fromTo(
          circles,
          {
            y: (j) => gsap.utils.interpolate(77, -77, j / 10),
            transformOrigin: '50% 50%',
            scale: 0.133,
          },
          {
            y: (j) => gsap.utils.interpolate(i, -i, j / 10),
            scale: 0.8,
            duration: 1,
            ease: 'sine',
            repeat: -1,
            yoyo: true,
            yoyoEase: 'sine.in',
          }
        ),
        i / 10
      );
    }

    tl.play(50);
    return () => tl.kill();
  }, { scope: stageRef });

  return (
    <div className="w-44 h-48 mt-20 select-none pointer-events-none" style={{ overflow: 'visible' }}>
      <svg
        ref={stageRef}
        viewBox="0 0 98 108"
        className="w-full h-full"
        style={{ overflow: 'visible', fill: '#7163E9' }}
      >
        <defs>
          <mask id="dotMask">
            <rect width="10" height="10" fill="white" />
          </mask>
        </defs>

        {Array.from({ length: 10 }, (_, colIdx) => (
          <g
            key={colIdx}
            className={`gcol gcol-${colIdx}`}
            transform={`translate(${colIdx * 10} 0)`}
          >
            {Array.from({ length: 10 }, (_, rowIdx) => (
              /* gbox: NO svg transform — GSAP sets y via CSS so mask travels with it */
              <g key={rowIdx} className="gbox" mask="url(#dotMask)">
                <circle cx="5" cy="5" r="5" />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Single trust row — blob (Framer Motion) + shine
   ══════════════════════════════════════════════════ */
const TrustItem = ({ reason }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef   = useRef(null);
  const shineRef = useRef(null);

  const rawX  = useMotionValue(130);
  const rawY  = useMotionValue(30);
  const blobX = useSpring(rawX, { stiffness: 200, damping: 24, mass: 0.5 });
  const blobY = useSpring(rawY, { stiffness: 200, damping: 24, mass: 0.5 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (shineRef.current) {
      gsap.fromTo(shineRef.current, { x: '-160%' }, { x: '220%', duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseMove = (e) => {
    const rect = rowRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={rowRef}
      className="trust-item relative py-3 cursor-default"
      style={{ overflow: 'visible' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Framer Motion cursor blob — untouched */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="blob"
            initial={{ opacity: 0, scale: 0.45 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.45 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            style={{
              left: blobX, top: blobY,
              x: '-50%', y: '-118%',
              position: 'absolute', zIndex: 60, pointerEvents: 'none',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #7163E9 0%, #5547DC 55%, #4232C8 100%)',
              boxShadow: '0 24px 64px rgba(113,99,233,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
              padding: '18px 24px', width: '260px', overflow: 'hidden',
              color: 'rgba(255,255,255,0.92)', fontSize: '13.5px',
              fontWeight: 400, lineHeight: '1.65', letterSpacing: '0.01em',
            }}
          >
            {reason.description}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inner row — clipped for shine */}
      <div className="relative flex items-center gap-8 rounded-2xl overflow-hidden">
        {/* GSAP shine sweep */}
        <div
          ref={shineRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(113,99,233,0.13) 50%, transparent 70%)',
            transform: 'translateX(-160%)', zIndex: 1,
          }}
        />

        {/* Number badge — colour only, no position animation */}
        <div
          className={`
            relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center
            text-xl font-normal backdrop-blur-xl transition-all duration-300
            ${isHovered
              ? 'text-white shadow-[0_15px_40px_rgba(113,99,233,0.55)]'
              : reason.highlighted
              ? 'bg-gradient-to-br from-[#7163E9] via-[#6052E5] to-[#4B3AD9] text-white shadow-[0_15px_40px_rgba(75,58,217,0.4)] scale-110 border-t border-white/20'
              : 'border border-white/90 dark:border-white/[0.08] text-black/60 dark:text-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none'
            }
          `}
          style={
            isHovered
              ? { background: 'linear-gradient(135deg, #7163E9, #4B3AD9)' }
              : !reason.highlighted
              ? { background: 'linear-gradient(135deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,.01) 50%,rgba(255,255,255,.04) 100%)' }
              : {}
          }
        >
          {reason.number}
        </div>

        {/* Title */}
        <div className="relative z-10 pt-1">
          <motion.h3
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className={`text-xl md:text-2xl font-normal select-none transition-colors duration-300 ${
              isHovered ? 'text-[#7163E9]' : 'text-black/80 dark:text-white/80'
            }`}
          >
            {reason.title}
          </motion.h3>
          <motion.div
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ transformOrigin: 'left' }}
            className="h-px mt-1.5 rounded-full bg-gradient-to-r from-[#7163E9] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Main section
   ══════════════════════════════════════════════════ */
const TrustSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef    = useRef(null);

  const reasons = [
    { number: '01', title: 'Dedicated Team Support',             description: 'A dedicated team focused on understanding your business, solving challenges, and delivering the right solutions with full transparency and support.', highlighted: false  },
    { number: '02', title: 'Fast & Reliable Delivery',           description: 'We deliver high-quality solutions quickly without compromising performance, scalability, or user experience.',                                          highlighted: false },
    { number: '03', title: 'AI-Driven Innovation',               description: 'We use modern technology and intelligent automation to help businesses work smarter and grow faster.',                                                    highlighted: false },
    { number: '04', title: 'Clear Communication & Transparency', description: 'We ensure clear communication, regular updates, and a collaborative process throughout every project.',                                              highlighted: false },
    { number: '05', title: 'Long-Term Partnership',              description: 'We focus on building long-term partnerships through trust, reliability, and continuous support.',                                                        highlighted: false },
  ];

  useGSAP(() => {
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, { type: 'words,chars' });
      gsap.from(split.chars, {
        opacity: 0, y: 38, rotateX: -45,
        transformOrigin: '50% 50% -20px',
        stagger: 0.025, duration: 0.65, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none none' },
        onComplete: () => split.revert(),
      });
    }

    if (listRef.current) {
      gsap.from(listRef.current.querySelectorAll('.trust-item'), {
        opacity: 0, x: 60, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full py-32 bg-transparent border-y border-black/[0.05] dark:border-white/[0.05] relative z-10 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:pl-32 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-20">

        {/* Left: sticky heading + draggable fan */}
        <div className="lg:sticky lg:top-40 max-w-xl self-center lg:-ml-16 flex flex-col items-start">
          <h2
            ref={headingRef}
            className="text-5xl md:text-6xl font-normal tracking-tight leading-[1.2] text-black/80 dark:text-white/80"
          >
            Why Businesses <br />
            <span className="text-black dark:text-white">Trust Us</span>
          </h2>

          {/* ── GSAP Wave Dot Grid ── */}
          <DotGrid />
        </div>

        {/* Right: list */}
        <div ref={listRef} className="flex-1 w-full" style={{ overflow: 'visible' }}>
          {reasons.map((reason, index) => (
            <TrustItem key={index} reason={reason} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
