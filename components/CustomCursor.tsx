import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on touch devices

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Optimized GSAP setters
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.2 });
    };

    const onMouseEnterLink = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(ring, { 
        scale: 1.5, 
        backgroundColor: "rgba(163, 230, 53, 0.15)", 
        borderColor: "rgba(163, 230, 53, 0.5)",
        borderWidth: "1px",
        duration: 0.3 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "#A3E635",
        borderWidth: "2px",
        duration: 0.3 
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attach listeners to interactive elements
    const attachListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      links.forEach(link => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachListeners();

    // Use MutationObserver to watch for route changes and new elements
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border-2 border-brandRed rounded-full transition-colors duration-300 ease-out mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Inner Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-brandRed rounded-full"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;