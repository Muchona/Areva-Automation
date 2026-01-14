
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Box, Shield, Zap, Globe, Users, Play, Newspaper, Mail, Briefcase, Info, Sun, Moon, Snowflake, Factory, Truck, Microscope, HelpCircle, Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  // Cross-provider file-saver helper
  const saveAs = (blob: Blob, name: string) => {
    if (FileSaver && (FileSaver as any).saveAs) {
      (FileSaver as any).saveAs(blob, name);
    } else if (typeof FileSaver === 'function') {
      (FileSaver as any)(blob, name);
    } else {
      // Fallback for direct browser download if library fails
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const savedTheme = localStorage.getItem('theme');
    const initialDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDark(initialDark);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleEmergencyBackup = async () => {
    setIsBackingUp(true);
    const zip = new JSZip();
    try {
      zip.file("README_BACKUP.txt", "Areva Automation Emergency Local Backup. Move these files to your repository manually.");
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `areva_backup_${Date.now()}.zip`);
    } catch (e) {
      console.error("Backup failed", e);
    } finally {
      setIsBackingUp(false);
    }
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const menus = [
    {
      title: 'Products',
      items: [
        { name: 'Areva Automation System', path: '/products/system', icon: <Box className="w-4 h-4" /> },
        { name: 'Areva Taxi™', path: '/products/taxi', icon: <Zap className="w-4 h-4" /> },
        { name: 'Areva VTU™', path: '/products/vtu', icon: <ChevronDown className="w-4 h-4" /> },
        { name: 'Areva Conveyor™', path: '/products/conveyor', icon: <Shield className="w-4 h-4" /> },
        { name: 'Areva Racking™', path: '/products/racking', icon: <Box className="w-4 h-4" /> },
        { name: 'Areva WCS™', path: '/products/wcs', icon: <Zap className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Sectors',
      items: [
        { name: 'Cold Storage / F&B', path: '/sectors/cold-storage', icon: <Snowflake className="w-4 h-4" /> },
        { name: 'Manufacturing', path: '/sectors/manufacturing', icon: <Factory className="w-4 h-4" /> },
        { name: 'Logistics & Distribution', path: '/sectors/logistics', icon: <Truck className="w-4 h-4" /> },
        { name: 'Pharmaceuticals', path: '/sectors/pharmaceuticals', icon: <Microscope className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Technical',
      items: [
        { name: 'Consultancy & Design', path: '/services/consultancy', icon: <Info className="w-4 h-4" /> },
        { name: 'Engineering Standards', path: '/engineering-standards', icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Showcase',
      items: [
        { name: 'Case Studies', path: '/cases', icon: <Box className="w-4 h-4" /> },
        { name: 'Video Library', path: '/videos', icon: <Play className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', path: '/about', icon: <Users className="w-4 h-4" /> },
        { name: 'Why Work With Us', path: '/why-us', icon: <HelpCircle className="w-4 h-4" /> },
        { name: 'Careers', path: '/careers', icon: <Briefcase className="w-4 h-4" /> },
        { name: 'News & Blog', path: '/news', icon: <Newspaper className="w-4 h-4" /> },
        { name: 'Contact Us', path: '/contact', icon: <Mail className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${isScrolled || mobileOpen ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3' : 'bg-transparent py-6'}`} onMouseLeave={() => setActiveMenu(null)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center space-x-2 group shrink-0">
              <div className="bg-brandRed p-1.5 rounded-lg group-hover:bg-brandRed/80 transition-colors shadow-lg shadow-brandRed/20">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                AREVA<span className="text-brandRed">AUTOMATION</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              <Link to="/" className={`px-4 py-2 text-sm font-bold transition-colors ${location.pathname === '/' ? 'text-brandRed' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>Home</Link>
              {menus.map((menu) => (
                <div key={menu.title} className="relative" onMouseEnter={() => setActiveMenu(menu.title)}>
                  <button className={`flex items-center space-x-1 px-4 py-2 text-sm font-bold transition-colors ${activeMenu === menu.title ? 'text-brandRed' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                    <span>{menu.title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menu.title ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top transform ${activeMenu === menu.title ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="p-3 grid gap-1">
                      {menu.items.map((item) => (
                        <Link key={item.name} to={item.path} className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group">
                          <span className="text-slate-400 dark:text-slate-500 group-hover:text-brandRed transition-colors">{item.icon}</span>
                          <span className="text-sm font-semibold">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={handleEmergencyBackup} className="ml-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-brandRed transition-all" title="Emergency Local Backup">
                {isBackingUp ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              </button>
              <button onClick={toggleTheme} className="ml-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brandRed dark:hover:text-brandRed transition-all">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/contact" className="ml-4 bg-brandRed hover:bg-brandRed/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brandRed/20 active:scale-95">Get a Quote</Link>
            </div>

            <div className="flex items-center lg:hidden space-x-1 sm:space-x-2">
              <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 focus:outline-none">
                {isDark ? <Sun className="w-5 h-5 sm:w-6 h-6" /> : <Moon className="w-5 h-5 sm:w-6 h-6" />}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-900 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors focus:outline-none shrink-0">
                {mobileOpen ? <X className="w-6 h-6 sm:w-8 h-8" /> : <Menu className="w-6 h-6 sm:w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[65] lg:hidden bg-white dark:bg-slate-950 transition-all duration-500 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          <div className="space-y-2">
            <Link to="/" className="block py-4 text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">Home</Link>
            {menus.map((menu) => (
              <div key={menu.title} className="border-b border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setMobileExpanded(mobileExpanded === menu.title ? null : menu.title)}
                  className="w-full flex justify-between items-center py-4 text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white focus:outline-none"
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileExpanded === menu.title ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid gap-2 overflow-hidden transition-all duration-300 ${mobileExpanded === menu.title ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {menu.items.map((item) => (
                    <Link key={item.name} to={item.path} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                      <span className="text-brandRed">{item.icon}</span>
                      <span className="text-sm font-bold">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4 pt-8">
            <Link to="/contact" className="w-full block text-center bg-brandRed text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brandRed/20">
              Get a Quote
            </Link>
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
              Areva Automation Ltd. Global Innovation Centre
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
