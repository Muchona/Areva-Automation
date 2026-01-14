import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-950 pt-32 pb-32 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h1 className="text-7xl font-black tracking-tighter leading-none uppercase italic">LET'S <br /><span className="text-brandRed">AUTOMATE.</span></h1>
            <p className="text-xl text-slate-400 max-w-lg font-medium">Whether you're planning a new build or retrofitting, Areva engineers are ready to run a deep-tissue site audit.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border border-slate-800 rounded-[40px] hover:border-brandRed/30 transition-all">
                <Phone className="w-8 h-8 text-brandRed mb-6" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">HQ Phone</p>
                <p className="text-xl font-black tracking-tight">+353 (0) 47 80000</p>
              </div>
              <div className="p-8 bg-white/5 border border-slate-800 rounded-[40px] hover:border-brandRed/30 transition-all">
                <Mail className="w-8 h-8 text-brandRed mb-6" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</p>
                <p className="text-xl font-black tracking-tight">info@areva.eu</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-[60px] text-slate-900 shadow-3xl">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Personnel</label>
                   <input type="text" className="w-full bg-slate-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-brandRed font-bold" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Corporate Email</label>
                   <input type="email" className="w-full bg-slate-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-brandRed font-bold" placeholder="work@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">Industry Vertical</label>
                <input type="text" className="w-full bg-slate-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-brandRed font-bold" placeholder="e.g. Pharma, 3PL, F&B" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">The Challenge</label>
                <textarea rows={4} className="w-full bg-slate-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-brandRed font-bold" placeholder="Describe your SKU density challenges..."></textarea>
              </div>
              <button className="w-full bg-brandRed text-black py-6 rounded-[32px] font-black text-xl uppercase italic transition-all hover:bg-brandRed/90 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brandRed/20">Initialize Consultation</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;