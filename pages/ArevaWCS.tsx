
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Share2, Eye, LineChart, ShieldCheck, Workflow, ArrowRight } from 'lucide-react';

const ArevaWCS: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(6,182,212,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-cyan-600/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">The System Brain</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                AREVA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-200">WCS™.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                The Warehouse Control System orchestrates every movement, optimizing SKU placement and shuttle traffic with millisecond accuracy.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-cyan-600 hover:bg-cyan-500 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-cyan-600/20 active:scale-95 flex items-center">
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/products/system" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  Hardware Integration
                </Link>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[40px] border border-slate-800 p-10 font-mono text-sm overflow-hidden relative">
              <div className="space-y-2 opacity-80">
                <p className="text-green-500">>>> INITIALIZING ArevaWCS_SystemCore_v4...</p>
                <p className="text-slate-400">>>> Establishing link with 48 active shuttles...</p>
                <p className="text-cyan-500">>>> [WCS] Node_01: ONLINE</p>
                <p className="text-cyan-500">>>> [WCS] Node_02: ONLINE</p>
                <p className="text-slate-400">>>> Pathfinding mesh update: 1,429 routes calculated.</p>
                <p className="text-slate-500">>>> PALLET_MOVE_REQUEST_ID_88301... SUCCESS</p>
                <p className="animate-pulse">_</p>
              </div>
           </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Digital Twin", desc: "Real-time 3D visualization of every pallet and taxi position.", icon: <Eye className="w-8 h-8" /> },
              { label: "ERP Bridge", desc: "Seamless bi-directional sync with global ERP systems.", icon: <Share2 className="w-8 h-8" /> },
              { label: "Heat Mapping", desc: "Dynamic SKU slotting based on real-world velocity data.", icon: <LineChart className="w-8 h-8" /> },
              { label: "Pathfinding", desc: "AI-driven collision avoidance for multi-shuttle fleets.", icon: <Workflow className="w-8 h-8" /> }
            ].map((pillar, i) => (
              <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500/30 transition-all group">
                <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">{pillar.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ArevaWCS;
