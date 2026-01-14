import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Spotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices to prevent interference with scroll/touch UX
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const spotlight = spotlightRef.current;
    const core = coreRef.current;
    if (!spotlight || !core) return;

    // Use quickTo for high-performance, inertial mouse tracking
    // The duration creates a smooth "lag" or "inertia" effect
    const xTo = gsap.quickTo(spotlight, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(spotlight, "y", { duration: 0.8, ease: "power3" });
    
    // Faster tracking for the core "hotspot" to make it feel more responsive
    const xCoreTo = gsap.quickTo(core, "x", { duration: 0.15, ease: "power2" });
    const yCoreTo = gsap.quickTo(core, "y", { duration: 0.15, ease: "power2" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the glow exactly on the pointer
      xTo(e.clientX - 400);
      yTo(e.clientY - 400);
      
      xCoreTo(e.clientX - 100);
      yCoreTo(e.clientY - 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial entrance animation
    gsap.to([spotlight, core], { 
      opacity: 1, 
      duration: 1.5, 
      ease: "power2.out",
      stagger: 0.2 
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {/* Primary Soft Glow (Atmospheric) */}
      <div 
        ref={spotlightRef}
        className="absolute w-[800px] h-[800px] rounded-full opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1) 0%, rgba(163, 230, 53, 0.03) 40%, transparent 75%)',
          willChange: 'transform',
          filter: 'blur(60px)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Inner Hotspot (The direct light source) */}
      <div 
        ref={coreRef}
        className="absolute w-[200px] h-[200px] rounded-full opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(163, 230, 53, 0.05) 50%, transparent 100%)',
          willChange: 'transform',
          filter: 'blur(25px)',
          mixBlendMode: 'plus-lighter'
        }}
      />
    </div>
  );
};

export default Spotlight;