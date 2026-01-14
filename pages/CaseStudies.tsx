import React from 'react';
import { ArrowUpRight, ThermometerSnowflake, Boxes, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudies: React.FC = () => {
  const cases = [
    {
      title: "European Cold Chain Specialist",
      category: "Cold Storage (-30°C)",
      result: "78% Space Increase",
      desc: "Implemented a multi-level ASRS for a leader in frozen food distribution, removing 12 forklift routes and doubling throughput.",
      icon: <ThermometerSnowflake className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Global FMCG Manufacturer",
      category: "High SKU Volume",
      result: "40% Labor Cost Reduction",
      desc: "A bespoke deep-lane system managing over 45,000 pallet positions with automated buffering for production lines.",
      icon: <Boxes className="w-8 h-8 text-orange-500" />
    },
    {
      title: "Third Party Logistics (3PL)",
      category: "Omni-Channel Fulfillment",
      result: "99.99% Inventory Accuracy",
      desc: "Integration of Areva WCS with client ERP to provide real-time tracking of high-value electronics.",
      icon: <Warehouse className="w-8 h-8 text-brandRed" />
    }
  ];

  return (
    <div className="bg-slate-950 py-24 min-h-screen text-white pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-6">
          <p className="text-brandRed font-black uppercase tracking-[0.4em] text-xs">Global Success Matrix</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">PROVEN <span className="text-slate-500">VELOCITY.</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">We've helped companies across five continents reclaim their warehouse space and accelerate their supply chains using Areva technology.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {cases.map((item, i) => (
            <div key={i} className="group relative bg-slate-900 rounded-[50px] overflow-hidden border border-white/5 shadow-2xl hover:border-brandRed/30 transition-all hover:-translate-y-2">
              <div className="p-12">
                <div className="mb-10">{item.icon}</div>
                <p className="text-brandRed font-black text-[10px] uppercase tracking-widest mb-2">{item.category}</p>
                <h3 className="text-3xl font-black uppercase tracking-tight italic mb-6 leading-tight">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-10 font-medium">{item.desc}</p>
                
                <div className="pt-10 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-black text-white">{item.result}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Key Performance Metric</p>
                  </div>
                  <button className="bg-slate-800 p-5 rounded-3xl group-hover:bg-brandRed group-hover:text-black transition-all">
                    <ArrowUpRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 bg-slate-900 rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-brandRed/5 pointer-events-none blur-[120px]"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase italic tracking-tighter">Ready to reclaim your space?</h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-medium text-lg leading-relaxed">Our engineering team can show you exactly how much density you can gain with a custom-engineered Areva system.</p>
          <Link to="/contact" className="bg-brandRed hover:bg-brandRed/90 text-black px-12 py-6 rounded-2xl font-black text-xl transition-all inline-block shadow-2xl shadow-brandRed/40 uppercase italic">
            Request Site Audit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;