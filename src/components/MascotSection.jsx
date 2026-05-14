import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import MascotCharacter from './MascotCharacter';

/* ── Full scene ── */
function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#7163E9" />
      <Environment preset="city" />
      <MascotCharacter mouse={mouse} />
    </>
  );
}

/* ── Section wrapper ── */
export default function MascotSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="w-full py-0 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Canvas */}
        <div ref={containerRef} className="w-full mx-auto relative" style={{ height: '240px', maxWidth: '320px' }}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 40 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            shadows
          >
            <Scene mouse={mouse} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
