import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin, ScrollTrigger);

/* Plane animation driven by scroll.
   Each scroll increment advances the plane along the path.
   Animation pauses when scroll stops / section is passed.   */
const PlaneAnimation = () => {
  const ref = useRef(null);

  useGSAP(() => {
    // Ensure stage is visible from the start (no opacity fade-in needed for scrub)
    gsap.set('#pa-stage', { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',   // animation starts when section nears viewport
        end: 'bottom 20%',  // completes as section leaves bottom of viewport
        scrub: 1.5,         // smooth 1.5 s lag — cinematic feel
      },
    });

    /* Path draws as plane flies */
    tl.from('#pa-path', { drawSVG: 0, duration: 4 }, 0)

    /* Plane follows the path */
    .fromTo(
      '#pa-plane',
      { scale: 0.6 },
      {
        scale: 1.2,
        duration: 4,
        motionPath: {
          path: '#pa-path',
          align: '#pa-path',
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      },
      0
    )

    /* Tail erases behind the plane in the last portion */
    .to('#pa-path', { drawSVG: '94% 94%', duration: 2, ease: 'power2.inOut' });

  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[55%] max-w-[520px] pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        id="pa-stage"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-40 -180 1250 1100"
        style={{ width: '100%', overflow: 'visible' }}
      >
        {/* Curved motion path */}
        <path
          id="pa-path"
          fill="none"
          stroke="url(#paGrad)"
          strokeWidth="4"
          d="M-92 17.713c154.32 237.253 348.7 486.913 585.407 466.93 137.542-17.257 247.733-123.595 279.259-239.307 27.368-100.43-21.323-229.59-140.017-241.76-118.693-12.172-208.268 98.897-231.122 199.803-34.673 151.333 12.324 312.301 125.096 429.074C639.395 749.225 815.268 819.528 995 819"
        />

        {/* Paper plane */}
        <g id="pa-plane">
          <path fill="url(#paGrad)" opacity="0.3" d="m82.8 35 215.9 94.6L79 92l3.8-57Z" />
          <path fill="url(#paGrad)"                d="m82.8 35 52-23.5 163.9 118.1-216-94.5Z" />
          <path fill="url(#paGrad)" opacity="0.3" d="m76.8 107.1 214.4 19.6L74.7 131l2.1-23.9Z" />
          <path fill="url(#paGrad)"                d="M298.8 130.4 1.9 103.3l54-45 242.9 72.1Z" />
        </g>

        <defs>
          <linearGradient id="paGrad" x1="154" x2="160" y1="49" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0"   stopColor="#7163E9" />
            <stop offset="0.5" stopColor="#9B8EF0" />
            <stop offset="1"   stopColor="#C4BBFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default PlaneAnimation;
