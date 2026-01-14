import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowUp, Globe, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Areva Taxi™", path: "/products/taxi" },
        { name: "Areva VTU™", path: "/products/vtu" },
        { name: "Areva WCS™", path: "/products/wcs" },
        { name: "Areva Conveyor™", path: "/products/conveyor" },
        { name: "Areva Racking™", path: "/products/racking" }
      ]
    },
    {
      title: "Sectors",
      links: [
        { name: "Cold Storage", path: "/sectors/cold-storage" },
        { name: "Manufacturing", path: "/sectors/manufacturing" },
        { name: "Logistics & 3PL", path: "/sectors/logistics" },
        { name: "Pharmaceuticals", path: "/sectors/pharmaceuticals" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Consultancy", path: "/services/consultancy" },
        { name: "Installation", path: "/services/installation" },
        { name: "Maintenance", path: "/services/maintenance" },
        { name: "Engineering Standards", path: "/engineering-standards" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Our Story", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "News & Logs", path: "/news" },
        { name: "Developer Portal", path: "/developer" },
        { name: "Design System", path: "/design" }
      ]
    }
  ];

  return (
    <footer className="relative bg-slate-950 pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brandRed/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-brandRed p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Box className="w-8 h-8 text-black" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                AREVA<span className="text-brandRed">AUTOMATION</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md italic">
              "Engineering the assembly of efficiency through patented 4-way autonomous pallet navigation."
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brandRed hover:border-brandRed/50 hover:bg-brandRed/5 transition-all group"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 rounded-[40px] border border-white/5 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandRed/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-xl font-black uppercase text-white tracking-tight">System Pulse</h4>
                  <p className="text-slate-400 text-sm font-medium">Monthly ASRS engineering briefings.</p>
                </div>
                <div className="flex-grow w-full relative">
                  <input 
                    type="email" 
                    placeholder="Enter business email" 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brandRed transition-all"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-brandRed text-black px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brandRed/90 transition-all shadow-lg shadow-brandRed/20">
                    Join List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-24">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">
                {section.title}
              </h5>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-slate-400 hover:text-white text-sm font-bold flex items-center group transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-brandRed opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 space-y-6">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-white/5 pb-4">
              HQ Presence
            </h5>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-brandRed/10 p-2 rounded-lg text-brandRed shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tight">Global Innovation Centre</p>
                  <p className="text-[11px] text-slate-500 font-medium">Headquarters</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-brandRed/10 p-2 rounded-lg text-brandRed shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tight">+353 (0) 47 80000</p>
                  <p className="text-[11px] text-slate-500 font-medium">Mon-Fri 08:30 - 17:30</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-brandRed/10 p-2 rounded-lg text-brandRed shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tight">info@areva.eu</p>
                  <p className="text-[11px] text-slate-500 font-medium">Business Inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <span>&copy; {new Date().getFullYear()} Areva Automation Ltd.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">ISO 9001:2015</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Globe className="w-3 h-3 text-brandRed" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Service Available</span>
            </div>
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-brandRed text-black flex items-center justify-center hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-brandRed/20 group"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 h-1 w-full bg-gradient-to-r from-transparent via-brandRed to-transparent opacity-20"></div>
    </footer>
  );
};

export default Footer;