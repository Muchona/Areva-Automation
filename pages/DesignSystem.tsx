import React, { useState } from 'react';
import { 
  Box, 
  Zap, 
  Layers, 
  Shield, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Move, 
  Search, 
  Mail, 
  Phone, 
  Globe, 
  Snowflake,
  Factory,
  Truck,
  Microscope,
  HelpCircle,
  Play,
  Share2,
  ExternalLink,
  ChevronDown,
  Target,
  Copy,
  Check,
  Chrome,
  AlertCircle,
  FileCode,
  Download,
  Terminal,
  Square,
  Type as TypeIcon,
  MousePointer2
} from 'lucide-react';

const ColorTile = ({ color, name, hex, wireframe }: { color: string, name: string, hex: string, wireframe: boolean }) => (
  <div className="space-y-2">
    <div className={`w-full h-24 rounded-2xl ${wireframe ? 'bg-transparent border-2 border-slate-700' : color + ' border border-white/10 shadow-inner'}`}>
      {wireframe && <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-slate-700 uppercase">Color Block</div>}
    </div>
    <div>
      <p className={`text-[10px] font-black uppercase tracking-widest ${wireframe ? 'text-slate-500' : 'text-white'}`}>{name}</p>
      <p className="text-[10px] text-slate-500 font-mono">{hex}</p>
    </div>
  </div>
);

const DesignSystem: React.FC = () => {
  const [wireframe, setWireframe] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const designTokens = {
    colors: {
      brandRed: "#A3E635",
      background: "#020617",
      surface: "#0F172A",
      border: "#1E293B",
      textPrimary: "#FFFFFF",
      textSecondary: "#94A3B8"
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const moffettLogoSvg = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#A3E635"/><path d="M30 30H70V70H30V30Z" fill="black" fill-opacity="0.2"/><path d="M40 40H60V60H40V40Z" fill="black"/></svg>`;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${wireframe ? 'bg-white text-black' : 'bg-slate-950 text-white'} pt-32 pb-64 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Helper Header */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-[40px] border transition-all ${wireframe ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="space-y-2">
            <h2 className={`text-2xl font-black uppercase tracking-tight ${wireframe ? 'text-black' : 'text-white'}`}>Design Asset Bridge</h2>
            <p className="text-slate-500 text-sm font-medium">Hit your Figma plugin limit? Use these manual export tools.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setWireframe(!wireframe)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                wireframe 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-white hover:bg-slate-200'
              }`}
            >
              {wireframe ? <MousePointer2 className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              <span>{wireframe ? 'Visual Mode' : 'Wireframe Mode'}</span>
            </button>
            
            <div className={`px-4 py-3 rounded-2xl border flex items-center space-x-3 ${wireframe ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
              <AlertCircle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Free Plan Bypass active</span>
            </div>
          </div>
        </div>

        {/* Brand Assets / SVG Bundle */}
        <section className="space-y-12">
          <div className="flex items-center justify-between border-b border-current/10 pb-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">01. SVG Assets</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Copy & Paste into Figma</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-[32px] border ${wireframe ? 'border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Moffett Icon</p>
                  <h3 className="text-xl font-bold">Standard Logo Mark</h3>
                </div>
                <button 
                  onClick={() => handleCopy('logo-svg', moffettLogoSvg)}
                  className={`p-3 rounded-xl transition-all ${wireframe ? 'bg-slate-200 hover:bg-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-brandRed'}`}
                >
                  {copiedId === 'logo-svg' ? <Check className="w-5 h-5 text-black" /> : <Copy className="w-5 h-5 text-black" />}
                </button>
              </div>
              <div className="flex items-center justify-center p-12 bg-slate-950/50 rounded-2xl border border-white/5 mb-6">
                 <div className="w-24 h-24" dangerouslySetInnerHTML={{ __html: moffettLogoSvg }} />
              </div>
              <pre className={`p-4 rounded-xl text-[10px] font-mono overflow-x-auto ${wireframe ? 'bg-slate-100' : 'bg-slate-950 text-slate-500'}`}>
                {moffettLogoSvg.substring(0, 60)}...
              </pre>
            </div>

            <div className={`p-8 rounded-[32px] border ${wireframe ? 'border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
               <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-brandRed">
                    <Terminal className="w-5 h-5" />
                    <h3 className="text-xl font-bold">Recommended Plugins</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">If <strong>html.to.design</strong> is locked, try these alternatives which often have separate free quotas:</p>
                  <div className="space-y-3">
                    {[
                      { name: "Builder.io", desc: "High quality AI conversion" },
                      { name: "Clonable", desc: "Fast visual scraping" },
                      { name: "Magicul", desc: "Direct URL to Figma conversion" }
                    ].map((p, i) => (
                      <div key={i} className={`p-4 rounded-2xl border ${wireframe ? 'border-slate-200' : 'bg-slate-950 border-slate-800'} flex items-center justify-between`}>
                        <div>
                          <p className="text-xs font-black">{p.name}</p>
                          <p className="text-[10px] text-slate-500">{p.desc}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Visual Styles */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black uppercase tracking-tight border-b border-current/10 pb-4">02. Visual Styles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <ColorTile color="bg-brandRed" name="Brand Green" hex="#A3E635" wireframe={wireframe} />
            <ColorTile color="bg-slate-950" name="Slate 950" hex="#020617" wireframe={wireframe} />
            <ColorTile color="bg-slate-900" name="Slate 900" hex="#0F172A" wireframe={wireframe} />
            <ColorTile color="bg-slate-800" name="Slate 800" hex="#1E293B" wireframe={wireframe} />
            <ColorTile color="bg-slate-700" name="Slate 700" hex="#334155" wireframe={wireframe} />
            <ColorTile color="bg-slate-500" name="Slate 500" hex="#64748B" wireframe={wireframe} />
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black uppercase tracking-tight border-b border-current/10 pb-4">03. Typography</h2>
          <div className="space-y-12">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black mb-4 flex items-center">
                <TypeIcon className="w-3 h-3 mr-2" /> Display Heading
              </p>
              <h1 className="text-8xl font-black tracking-tighter leading-[0.9] uppercase">The Power of Four</h1>
              <p className="mt-4 text-[10px] font-mono text-slate-500">96px / Black / -4% Tracking</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black mb-4 flex items-center">
                <TypeIcon className="w-3 h-3 mr-2" /> Section Heading
              </p>
              <h2 className="text-5xl font-black tracking-tight leading-none uppercase">Precision Engineering</h2>
              <p className="mt-4 text-[10px] font-mono text-slate-500">48px / Black / Tight Tracking</p>
            </div>
          </div>
        </section>

        {/* Component Manifest */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black uppercase tracking-tight border-b border-current/10 pb-4">04. Component Blueprints</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`p-10 rounded-[40px] border ${wireframe ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <p className="text-[10px] font-black text-brandRed uppercase tracking-widest mb-6">Action Button</p>
              <div className="flex items-center space-x-6">
                <button className={`px-10 py-5 rounded-2xl font-black text-lg flex items-center ${wireframe ? 'border-2 border-black' : 'bg-brandRed text-black shadow-xl shadow-brandRed/20'}`}>
                  Primary Action <ArrowRight className="ml-2 w-6 h-6 text-black" />
                </button>
                <div className="text-[10px] font-mono text-slate-500 space-y-1">
                  <p>Height: 64px</p>
                  <p>Radius: 16px</p>
                  <p>Font: 18px Bold</p>
                </div>
              </div>
            </div>

            <div className={`p-10 rounded-[40px] border ${wireframe ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <p className="text-[10px] font-black text-brandRed uppercase tracking-widest mb-6">Information Card</p>
              <div className={`p-8 rounded-[32px] border ${wireframe ? 'border-2 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <div className={`w-12 h-12 rounded-xl mb-6 ${wireframe ? 'border-2 border-slate-200' : 'bg-brandRed/10 text-brandRed flex items-center justify-center'}`}>
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Storage Density</h3>
                <p className="text-sm text-slate-500">Increased capacity by up to 80% using deep-lane logic.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;