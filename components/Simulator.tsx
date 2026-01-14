import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { X, Calculator, Loader2, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  };
};

interface SimulatorProps {
  onClose: () => void;
}

const Simulator: React.FC<SimulatorProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    pallets: 5000,
    throughput: 50,
    shifts: 2,
    laborCost: 45000
  });

  const auditLogs = [
    "Analyzing Static Load Stress...",
    "Calculating Pathfinding Latency...",
    "Simulating Deep-Lane Buffer Logic...",
    "Optimizing Thermal Recovery Gaps...",
    "Generating Final ROI Matrix..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setAuditStep(prev => (prev + 1) % auditLogs.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const runSimulation = async () => {
    setLoading(true);
    setResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Lead Areva Structural Audit for: ${formData.pallets} pallets, ${formData.throughput} PPH, ${formData.shifts} shifts, $${formData.laborCost} labor.`,
        config: {
          thinkingConfig: { thinkingBudget: 20000 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              spaceSavingsPercent: { type: Type.NUMBER },
              laborReductionAnnual: { type: Type.NUMBER },
              roiMonths: { type: Type.NUMBER },
              efficiencyGain: { type: Type.STRING },
              summary: { type: Type.STRING }
            },
            required: ["spaceSavingsPercent", "laborReductionAnnual", "roiMonths", "efficiencyGain", "summary"]
          }
        }
      });
      setResult(JSON.parse(response.text || '{}'));
    } catch (e) {
      console.error("Simulation error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-6xl rounded-[60px] overflow-hidden shadow-3xl flex flex-col lg:flex-row animate-in zoom-in duration-500">
        
        <div className="p-10 lg:p-16 lg:w-5/12 space-y-12 bg-slate-950/40 border-r border-white/5">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter text-nowrap">AREVA <span className="text-brandRed">ROI</span></h2>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white"><X /></button>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pallet Positions</label>
              <input type="number" value={formData.pallets} onChange={e => setFormData({...formData, pallets: parseInt(e.target.value)})} className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none" />
            </div>
            <button onClick={runSimulation} disabled={loading} className="w-full bg-brandRed hover:bg-brandRed/90 text-black py-6 rounded-3xl font-black text-xl flex items-center justify-center space-x-4 transition-all">
              {loading ? <Loader2 className="animate-spin w-7 h-7" /> : <Calculator className="w-7 h-7" />}
              <span>{loading ? 'Audit in Progress' : 'Generate Audit'}</span>
            </button>
          </div>
        </div>

        <div className="p-10 lg:p-16 lg:w-7/12 bg-slate-900 relative flex flex-col justify-center min-h-[500px]">
          {loading ? (
            <div className="text-center space-y-8 animate-pulse">
               <div className="flex justify-center"><Loader2 className="w-16 h-16 text-brandRed animate-spin" /></div>
               <div>
                 <p className="text-brandRed font-black uppercase tracking-[0.3em] text-xs">Areva Logic Engine Thinking</p>
                 <p className="text-white text-2xl font-black italic uppercase mt-4">{auditLogs[auditStep]}</p>
               </div>
            </div>
          ) : result ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
              <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter border-b border-white/10 pb-4">Diagnostic Report</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-slate-950/80 p-8 rounded-[40px] border border-white/5">
                  <TrendingUp className="text-brandRed w-6 h-6 mb-4" />
                  <p className="text-6xl font-black text-white">{result.spaceSavingsPercent}%</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase mt-2">Space Recovery</p>
                </div>
                <div className="bg-slate-950/80 p-8 rounded-[40px] border border-white/5">
                  <DollarSign className="text-green-500 w-6 h-6 mb-4" />
                  <p className="text-4xl font-black text-white">${result.laborReductionAnnual?.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase mt-2">Annual Savings</p>
                </div>
              </div>
              <p className="text-slate-400 font-medium italic text-xl leading-relaxed">"{result.summary}"</p>
              <button onClick={onClose} className="w-full border border-slate-700 text-slate-500 py-6 rounded-3xl font-black text-xs uppercase hover:text-white transition-all">Close Diagnostic</button>
            </div>
          ) : (
            <div className="text-center opacity-30 space-y-6">
               <ShieldCheck className="w-24 h-24 mx-auto text-slate-600" />
               <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-sm">Awaiting Logic Parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulator;