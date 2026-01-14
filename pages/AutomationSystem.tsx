
import React from 'react';
import { Zap, Maximize, Cpu, CheckCircle2 } from 'lucide-react';
import Racking3D from '../components/Racking3D.tsx';
import { Link } from 'react-router-dom';

const AutomationSystem: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">TOTAL <br /><span className="text-brandRed">ASRS FLOW.</span></h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Our integrated system architecture combines hardware precision with software intelligence to deliver the world's most dense storage solution.
            </p>
            <div className="flex space-x-4">
              <Link to="/contact" className="bg-brandRed px-10 py-5 rounded-2xl font-black text-lg">Request Site Audit</Link>
            </div>
          </div>
          <div className="bg-slate-900 rounded-[60px] border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
             <Racking3D />
             <div className="absolute bottom-8 left-8 bg-slate-950/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-brandRed">Digital Twin: Active Simulation</p>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {[
            { title: "Areva Taxi™", icon: <Zap />, desc: "4-way shuttle navigating racks with mm precision." },
            { title: "Areva VTU™", icon: <Maximize />, desc: "High-throughput lifts bridging storage tiers in seconds." },
            { title: "Areva WCS™", icon: <Cpu />, desc: "Software brain optimizing SKU placement for velocity." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900 p-10 rounded-[40px] border border-slate-800 hover:border-brandRed/40 transition-all">
              <div className="text-brandRed mb-8">{item.icon}</div>
              <h3 className="text-2xl font-black mb-4 uppercase">{item.title}</h3>
              <p className="text-slate-400 mb-8">{item.desc}</p>
              <CheckCircle2 className="w-6 h-6 text-brandRed" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationSystem;
