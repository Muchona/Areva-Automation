import React from 'react';
import { Briefcase, Users, Target, Rocket, ArrowRight, Globe, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  const openPositions = [
    { title: "Senior Automation Engineer", type: "Full-time", location: "Monaghan, Ireland", category: "Engineering" },
    { title: "WCS Software Developer", type: "Full-time", location: "Remote / Ireland", category: "Software" },
    { title: "Project Installation Manager", type: "Full-time", location: "Global (Field Based)", category: "Operations" },
    { title: "Customer Success Lead", type: "Full-time", location: "Monaghan, Ireland", category: "Sales" }
  ];

  return (
    <div className="bg-slate-950 text-white pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <section className="mb-32 space-y-8 max-w-4xl">
          <div className="inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
            <Users className="w-4 h-4 text-brandRed" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Join the Team</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">BUILD THE <br /><span className="text-slate-500">FUTURE OF FLOW.</span></h1>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            We are looking for innovators, engineers, and problem solvers to help us redefine global warehouse efficiency.
          </p>
        </section>

        {/* Culture / Values */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: <Target />, title: "Precision", text: "We value engineering accuracy and excellence in every shuttle we build." },
            { icon: <Zap />, title: "Velocity", text: "We work fast, iterate often, and deploy systems that solve real problems." },
            { icon: <Heart />, title: "Heritage", text: "Our Irish roots drive our global ambition and community focus." }
          ].map((v, i) => (
            <div key={i} className="p-10 bg-slate-900 border border-slate-800 rounded-[40px] hover:border-brandRed/30 transition-all group">
              <div className="text-brandRed group-hover:text-black group-hover:bg-brandRed p-4 rounded-2xl mb-6 w-fit transition-colors">{v.icon}</div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </section>

        {/* Jobs List */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-8">
            <h2 className="text-4xl font-black tracking-tight uppercase">OPEN <span className="text-brandRed">ROLES.</span></h2>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">4 Positions Available</span>
            </div>
          </div>
          
          <div className="grid gap-4">
            {openPositions.map((job, i) => (
              <div key={i} className="group p-8 bg-slate-900 border border-slate-800 rounded-[32px] hover:border-brandRed/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] font-black text-brandRed uppercase tracking-widest">{job.category}</p>
                  <h3 className="text-2xl font-black text-white">{job.title}</h3>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 text-xs">
                    <span className="flex items-center"><Globe className="w-3 h-3 mr-2" /> {job.location}</span>
                    <span className="flex items-center"><Briefcase className="w-3 h-3 mr-2" /> {job.type}</span>
                  </div>
                </div>
                <Link to="/contact" className="w-full md:w-auto bg-white/5 hover:bg-brandRed hover:text-black px-8 py-4 rounded-2xl border border-white/10 transition-all text-sm font-black uppercase tracking-widest text-center">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Perks Section */}
        <section className="mt-32 p-12 md:p-24 bg-brandRed text-black rounded-[60px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">NOT READY <br />YET?</h2>
            <p className="text-xl font-bold max-w-xl mx-auto opacity-80">Follow our journey on LinkedIn to see life at Areva Automation and get alerts for future openings.</p>
            <a href="#" className="inline-flex items-center space-x-3 bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all">
              <span>Visit LinkedIn</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;