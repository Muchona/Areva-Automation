import React, { Suspense, lazy, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Core UI Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import Spotlight from './components/Spotlight.tsx';
import Home from './pages/Home.tsx';

// Lazy load pages for performance
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Solutions = lazy(() => import('./pages/Solutions.tsx'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary.tsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.tsx'));
const Careers = lazy(() => import('./pages/Careers.tsx'));
const News = lazy(() => import('./pages/News.tsx'));
const WhyWorkWithUs = lazy(() => import('./pages/WhyWorkWithUs.tsx'));
const EngineeringStandards = lazy(() => import('./pages/EngineeringStandards.tsx'));

// Service Pages
const InstallationService = lazy(() => import('./pages/InstallationService.tsx'));
const MaintenanceService = lazy(() => import('./pages/MaintenanceService.tsx'));
const ConsultancyService = lazy(() => import('./pages/ConsultancyService.tsx'));

// Extra/Showcase Pages
const DeveloperPortal = lazy(() => import('./pages/DeveloperPortal.tsx'));
const DesignSystem = lazy(() => import('./pages/DesignSystem.tsx'));
const PortfolioShowcase = lazy(() => import('./pages/PortfolioShowcase.tsx'));
const BehanceCaseStudy = lazy(() => import('./pages/BehanceCaseStudy.tsx'));
const BehanceBuilder = lazy(() => import('./pages/BehanceBuilder.tsx'));
const BehanceEmbed = lazy(() => import('./pages/BehanceEmbed.tsx'));

// Product Pages
const ArevaTaxi = lazy(() => import('./pages/ArevaTaxi.tsx'));
const ArevaVTU = lazy(() => import('./pages/ArevaVTU.tsx'));
const ArevaWCS = lazy(() => import('./pages/ArevaWCS.tsx'));
const ArevaConveyor = lazy(() => import('./pages/ArevaConveyor.tsx'));
const ArevaRacking = lazy(() => import('./pages/ArevaRacking.tsx'));
const AutomationSystem = lazy(() => import('./pages/AutomationSystem.tsx'));

// Sector Pages
const ColdStorage = lazy(() => import('./pages/ColdStorage.tsx'));
const ManufacturingSector = lazy(() => import('./pages/ManufacturingSector.tsx'));
const LogisticsSector = lazy(() => import('./pages/LogisticsSector.tsx'));
const PharmaSector = lazy(() => import('./pages/PharmaSector.tsx'));

const PageLoader = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-950">
    <Loader2 className="w-10 h-10 text-brandRed animate-spin mb-4" />
    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 text-center">
      LOADING AREVA MODULES...
    </span>
  </div>
);

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col relative selection:bg-brandRed selection:text-white">
        <CustomCursor />
        <Spotlight />
        <Navbar />
        
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/news" element={<News />} />
              <Route path="/why-us" element={<WhyWorkWithUs />} />
              <Route path="/cases" element={<CaseStudies />} />
              <Route path="/videos" element={<VideoLibrary />} />
              <Route path="/engineering-standards" element={<EngineeringStandards />} />

              {/* Product Routes */}
              <Route path="/products" element={<Solutions />} />
              <Route path="/products/system" element={<AutomationSystem />} />
              <Route path="/products/taxi" element={<ArevaTaxi />} />
              <Route path="/products/vtu" element={<ArevaVTU />} />
              <Route path="/products/wcs" element={<ArevaWCS />} />
              <Route path="/products/conveyor" element={<ArevaConveyor />} />
              <Route path="/products/racking" element={<ArevaRacking />} />

              {/* Sector Routes */}
              <Route path="/sectors/cold-storage" element={<ColdStorage />} />
              <Route path="/sectors/manufacturing" element={<ManufacturingSector />} />
              <Route path="/sectors/logistics" element={<LogisticsSector />} />
              <Route path="/sectors/pharmaceuticals" element={<PharmaSector />} />

              {/* Service Routes */}
              <Route path="/services/consultancy" element={<ConsultancyService />} />
              <Route path="/services/installation" element={<InstallationService />} />
              <Route path="/services/maintenance" element={<MaintenanceService />} />
              
              {/* Dev & Showcase Routes */}
              <Route path="/developer" element={<DeveloperPortal />} />
              <Route path="/design" element={<DesignSystem />} />
              <Route path="/showcase" element={<PortfolioShowcase />} />
              <Route path="/showcase/case-study" element={<BehanceCaseStudy />} />
              <Route path="/showcase/builder" element={<BehanceBuilder />} />
              <Route path="/showcase/embed" element={<BehanceEmbed />} />
              
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <AIAssistant isOpen={isAssistantOpen} setIsOpen={setIsAssistantOpen} />
      </div>
    </Router>
  );
};

export default App;