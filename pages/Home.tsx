import Home from './pages/Home';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import Taxi3D from '../components/Taxi3D.tsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entrance animations
    gsap.from(".hero-text", { 
      y: 100, 
      opacity: 0, 
      duration: 1.5, 
      stagger: 0.2, 
      ease: "power4.out" 
    });

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => setScrollProgress(self.progress),
      scrub: true
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[30vw] font-black italic">AREVA</h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center z-10">
            <div className="space-y-10">
              <div className="hero-text inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                <div className="w-2 h-2 bg-brandRed rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Industry 5.0 Precision</span>
              </div>
              
              <h1 className="hero-text text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] uppercase italic">
                AUTOMATE<br />
                <span className="text-brandRed">VELOCITY.</span>
              </h1>
              
              <p className="hero-text text-xl text-slate-400 font-medium leading-relaxed max-w-lg border-l-4 border-brandRed pl-6">
                Engineered 4-way pallet shuttle systems built for ultra-high density and sub-zero resilience.
              </p>

              <div className="hero-text flex flex-wrap gap-4">
                <Link to="/contact" className="bg-brandRed text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-brandRed/30">
                  Request Site Audit
                </Link>
                <Link to="/products" className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  View Systems
                </Link>
              </div>
            </div>

            <div className="relative h-[600px] hidden lg:block">
              <Taxi3D progress={scrollProgress} />
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 animate-bounce">
            <span className="text-[8px] font-black uppercase tracking-widest mb-2">Scroll to Assemble</span>
            <ChevronRight className="rotate-90 w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <ShieldCheck className="w-10 h-10 text-brandRed" />, 
              title: "Precision Rails", 
              text: "Moffett-engineered racking built to millimetre tolerance for high-speed shuttle transit." 
            },
            { 
              icon: <Zap className="w-10 h-10 text-brandRed" />, 
              title: "Sub-Zero Specs", 
              text: "Hardware rated for continuous operation at -30°C. Perfect for cold chain leaders." 
            },
            { 
              icon: <Activity className="w-10 h-10 text-brandRed" />, 
              title: "AI Orchestration", 
              text: "Real-time pathfinding algorithms eliminate bottlenecks and maximize pallet throughput." 
            }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-slate-900/50 border border-slate-800 rounded-[48px] hover:border-brandRed/30 transition-all group">
              <div className="mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandRed/5 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Ready to reclaim your space?</h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Our engineers provide detailed site audits to show you exactly how much storage density you can gain.
          </p>
          <Link to="/contact" className="inline-flex items-center space-x-4 bg-brandRed text-white px-12 py-6 rounded-3xl font-black text-xl uppercase italic hover:scale-105 transition-all shadow-2xl shadow-brandRed/40">
            <span>Get Started</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
