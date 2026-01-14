import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, Snowflake, UserMinus, Zap, Clock, Leaf, Users, Cpu, ShieldAlert, Terminal, Grid, Lock, Layout, History, Maximize, Key, ArrowRight, ChevronRight
} from 'lucide-react';

const WhyWorkWithUs: React.FC = () => {
  const benefits = [
    { icon: <Layers className="w-6 h-6" />, title: "Storage Density", text: "Increased storage density while maintaining optimum throughput" },
    { icon: <Snowflake className="w-6 h-6" />, title: "Cold Storage Energy", text: "Significant energy savings in cold storage" },
    { icon: <UserMinus className="w-6 h-6" />, title: "Overhead Reduction", text: "Less personnel, reduced salary overheads" },
    { icon: <Zap className="w-6 h-6" />, title: "High Throughput", text: "Higher throughput rates" },
    { icon: <Clock className="w-6 h-6" />, title: "Lead Times", text: "Reduced factory lead times" },
    { icon: <Leaf className="w-6 h-6" />, title: "Sustainability", text: "Creating a more sustainable storage solution" },
    { icon: <Users className="w-6 h-6" />, title: "Labour Reduction", text: "Reduction in labour requirements" },
    { icon: <Cpu className="w-6 h-6" />, title: "Industry 5.0", text: "INDUSTRY 5.0 Ready" },
    { icon: <ShieldAlert className="w-6 h-6" />, title: "Damage Elimination", text: "Elimination of damage to product and racking" },
    { icon: <Terminal className="w-6 h-6" />, title: "WMS Integration", text: "Easily integrated into existing WMS systems" },
    { icon: <Grid className="w-6 h-6" />, title: "Structural Stability", text: "Interconnected racking structure – ensuring total stability" },
    { icon: <Lock className="w-6 h-6" />, title: "Pallet Security", text: "Enhanced pallet security" },
    { icon: <Layout className="w-6 h-6" />, title: "Ergonomics", text: "Efficient and ergonomic order pick face system" },
    { icon: <History className="w-6 h-6" />, title: "System Lifespan", text: "Long lifespan" },
    { icon: <Maximize className="w-6 h-6" />, title: "Floor Flexibility", text: "Super flat flooring not required" },
    { icon: <Key className="w-6 h-6" />, title: "Turn-Key Fit", text: "Turn-key solution fits existing warehouse" }
  ];

  return (
    <div className="bg-slate-950 text-white pt-24 md:pt-32 pb-24 min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 right-0 w-full sm:w-[800px] h-[800px] bg-brandRed/10 rounded-full blur-[100px] md:blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="text-center mb-12 md:mb-24 space-y-4 md:space-y-6">
          <div className="inline-flex items-center space-x-2 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-brandRed rounded-full animate-pulse"></span>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Areva Advantage</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1.1] uppercase break-words italic">
            THE BENEFITS OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed via-brandRed/80 to-white">WORKING WITH US.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Areva Automation provides industry-leading competitive advantages that transform modern warehouse operations.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="group flex flex-col p-6 sm:p-8 bg-slate-900/50 border border-slate-800 rounded-[28px] md:rounded-[32px] hover:border-brandRed/50 transition-all duration-300 hover:bg-slate-900 h-full">
              <div className="inline-flex p-3 bg-slate-950 rounded-2xl border border-slate-800 text-brandRed group-hover:scale-110 group-hover:bg-brandRed group-hover:text-black transition-all mb-6 w-fit">
                {benefit.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-brandRed transition-colors">{benefit.title}</h3>
                <p className="text-sm sm:text-base font-bold text-white leading-snug">{benefit.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 md:mt-32">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 md:p-20 rounded-[40px] md:rounded-[60px] border border-slate-800 relative overflow-hidden text-center md:text-left">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="space-y-4 md:space-y-6 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none uppercase italic">
                  READY FOR THE <br className="hidden md:block" />
                  <span className="text-brandRed">NEXT GENERATION?</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-400 font-medium max-w-xl mx-auto md:mx-0">
                  Contact our engineering team today to see how these 16 benefits can be integrated into your specific facility.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/contact" className="bg-brandRed hover:bg-brandRed/90 text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl shadow-brandRed/20 flex items-center justify-center group/btn">
                  Request Site Audit
                  <ArrowRight className="ml-2 w-5 h-5 text-black group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link to="/products/system" className="border border-slate-700 hover:bg-white/5 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all flex items-center justify-center group">
                  Hardware Specs
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-brandRed/5 rounded-full blur-[80px] md:blur-[100px]"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyWorkWithUs;