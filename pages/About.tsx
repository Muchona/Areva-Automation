import React, { useEffect, useRef } from 'react';
import { Target, Heart, Award, Box, Globe, Factory } from 'lucide-react';
import gsap from 'gsap';

const About: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(".intro-reveal", { y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" });
  }, []);

  const coreValues = [
    { icon: <Target className="w-12 h-12" />, title: "Precision Engineering", desc: "Every shuttle is built to micron-level tolerance in our global innovation centre." },
    { icon: <Heart className="w-12 h-12" />, title: "Customer Centric", desc: "We design bespoke systems around your specific SKU challenges." },
    { icon: <Award className="w-12 h-12" />, title: "Safety Standards", desc: "Automating storage protects your most valuable asset: your people." }
  ];

  return (
    <div className="bg-slate-950 text-white pt-32 overflow-hidden">
      <section ref={introRef} className="relative py-24 px-4 border-b border-slate-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="intro-reveal inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
                <Box className="w-4 h-4 text-brandRed" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Our Heritage</span>
              </div>
              <h1 className="intro-reveal text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                INNOVATION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-white">IN OUR DNA.</span>
              </h1>
              <p className="intro-reveal text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Areva Automation simplifies the complex world of warehouse storage through world-leading 4-way shuttle technology.
              </p>
            </div>
            <div className="relative grid grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-[40px]">
                <Globe className="text-brandRed w-8 h-8 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Global Reach</p>
                <p className="text-lg font-bold">5 Continents</p>
              </div>
              <div className="p-8 bg-brandRed text-black rounded-[40px] shadow-xl shadow-brandRed/20">
                <Factory className="text-black w-8 h-8 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest opacity-60">Production</p>
                <p className="text-lg font-bold">In-House Built</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {coreValues.map((value, i) => (
            <div key={i} className="p-10 bg-slate-900 border border-slate-800 rounded-[50px] hover:border-brandRed/50 transition-all group">
              <div className="inline-block mb-8 p-5 bg-slate-950 rounded-2xl border border-slate-800 group-hover:bg-brandRed group-hover:text-black transition-all text-brandRed">
                {value.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase text-white">{value.title}</h3>
              <p className="text-slate-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;