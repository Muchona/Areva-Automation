import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, ThermometerSnowflake, Shield, ArrowRight } from 'lucide-react';

const ArevaTaxi: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(163,230,53,0.15),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Official Hardware Showcase</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                AREVA <br /><span className="text-brandRed">TAXI™.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                The flagship of our fleet. A high-performance 4-way shuttle designed for demanding deep-lane environments.
              </p>
              <Link to="/contact" className="inline-flex items-center bg-brandRed text-black px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-brandRed/20">
                Book Site Audit <ArrowRight className="ml-2 w-5 h-5 text-black" />
              </Link>
            </div>
            <div className="relative rounded-[40px] overflow-hidden border border-slate-800 bg-slate-900 p-8">
               <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" alt="Hardware Detail" className="rounded-3xl grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          {[
            { label: "Payload Capacity", val: "1,500kg", icon: <Target className="w-8 h-8" /> },
            { label: "Travel Speed", val: "3.5 m/s", icon: <Zap className="w-8 h-8" /> },
            { label: "Precision", val: "+/- 1mm", icon: <Shield className="w-8 h-8" /> },
            { label: "Thermal Rating", val: "-30°C", icon: <ThermometerSnowflake className="w-8 h-8" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] text-center">
              <div className="text-brandRed mb-6 flex justify-center">{stat.icon}</div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-white">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArevaTaxi;