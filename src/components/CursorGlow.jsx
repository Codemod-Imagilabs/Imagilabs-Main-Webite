import React, { useState, useEffect, useRef } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  // Smooth follow effect
  useEffect(() => {
    let animationFrame;
    const updatePosition = () => {
      setTargetPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1
      }));
      animationFrame = requestAnimationFrame(updatePosition);
    };
    animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => setOpacity(0);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* SVG Filter for Liquid Distortion */}
      <svg className="hidden">
        <filter id="liquid-filter">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="turb">
            <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Main Liquid Glow */}
      <div 
        className="absolute"
        style={{
          left: targetPos.x,
          top: targetPos.y,
          width: '700px',
          height: '700px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(75,58,217,0.4) 0%, rgba(75,58,217,0.1) 40%, transparent 70%)',
          filter: 'url(#liquid-filter) blur(60px)',
          opacity: opacity,
          transition: 'opacity 1s ease-out',
        }}
      />

      {/* Secondary Ripple Layer */}
      <div 
        className="absolute"
        style={{
          left: targetPos.x,
          top: targetPos.y,
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(75,58,217,0.5) 0%, transparent 60%)',
          filter: 'url(#liquid-filter) blur(40px)',
          opacity: opacity * 0.7,
          transition: 'opacity 0.8s ease-out',
        }}
      />
    </div>
  );
};

export default CursorGlow;
