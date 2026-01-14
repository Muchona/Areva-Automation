import React from 'react';
import { Factory, Truck, UserCheck, ShieldCheck, ArrowRight, Settings, CheckCircle2, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstallationService: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <section className="mb-32 space-y-8 max-w-4xl">
          <div className="inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
            <Factory className="w-4 h-4 text-brandRed" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Manufacturing & Installation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">FROM IRISH <br /><span className="text-slate-500">ENGINEERING TO YOU.</span></h1>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            Every Areva system is fabricated in our Monaghan facility and installed globally by our own specialized teams.
          </p>
        </section>

        {/* Process Steps */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { icon: <Settings />, title: "Precision Fabrication", desc: "shuttles and rails built to micron tolerances." },
            { icon: <Truck />, title: "Global Shipping", desc: "Expert logistics to your site, anywhere on earth." },
            { icon: <Ruler />, title: "On-Site Setup", desc: "Millimetre-accurate installation by Areva engineers." },
            { icon: <UserCheck />, title: "Commissioning", desc: "Full software integration and team training." }
          ].map((s, i) => (
            <div key={i} className="p-8 bg-slate-900 border border-slate-800 rounded-[32px] space-y-6">
              <div className="text-brandRed bg-brandRed/10 w-12 h-12 rounded-xl flex items-center justify-center">{s.icon}</div>
              <h3 className="text-lg font-black uppercase tracking-tight leading-snug">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Quality Section */}
        <section className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="space-y-12">
            <h2 className="text-5xl font-black tracking-tight leading-none uppercase">THE <span className="text-brandRed">AREVA</span> QUALITY SEAL.</h2>
            <div className="space-y-6">
              {[
                "100% In-House Manufacturing",
                "Rigorous 48-hour Stress Testing",
                "ISO 9001 Certified Procedures",
                "Turn-key Project Management"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-brandRed" />
                  <span className="text-xl font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center space-x-3 bg-brandRed text-black px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-brandRed/20 hover:scale-105 transition-all">
              <span>Book Site Assessment</span>
              <ArrowRight className="w-6 h-6 text-black" />
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-brandRed/10 rounded-full blur-[100px]"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
              className="relative rounded-[60px] border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              alt="Installation Process"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InstallationService;