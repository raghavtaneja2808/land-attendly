import React, { useState, useEffect, useRef } from 'react';

/* CONFIGURATION */
const APP_URL = "https://attendly-xi.vercel.app/";
const APK_URL = "/Attendly.apk"; // APK file in public folder

// --- ICONS (Native SVGs to avoid dependency conflicts) ---
const IconWrapper = ({ children, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Share = (props) => (
  <IconWrapper {...props}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
  </IconWrapper>
);
const PlusSquare = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </IconWrapper>
);
const ChevronRight = (props) => (
  <IconWrapper {...props}>
    <polyline points="9 18 15 12 9 6"/>
  </IconWrapper>
);
const PieChart = (props) => (
  <IconWrapper {...props}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
  </IconWrapper>
);
const AlertCircle = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </IconWrapper>
);
const Lock = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </IconWrapper>
);
const Download = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </IconWrapper>
);
const X = (props) => (
  <IconWrapper {...props}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </IconWrapper>
);
const CheckCircle = (props) => (
  <IconWrapper {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </IconWrapper>
);
const XCircle = (props) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </IconWrapper>
);
const Megaphone = (props) => (
  <IconWrapper {...props}>
    <path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
  </IconWrapper>
);
const Briefcase = (props) => (
  <IconWrapper {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </IconWrapper>
);
const Activity = (props) => (
  <IconWrapper {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </IconWrapper>
);
const Zap = (props) => (
  <IconWrapper {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </IconWrapper>
);
const Calendar = (props) => (
  <IconWrapper {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </IconWrapper>
);

// --- SHARED COMPONENTS ---
const AttendlyLogo = ({ size = "md" }) => {
  const dims = size === "lg" ? "w-14 h-14" : "w-10 h-10";
  const iconSize = size === "lg" ? "32" : "24";
  const strokeWidth = size === "lg" ? "4" : "3";
  
  return (
    <div className={`${dims} items-center justify-center rounded-full bg-[#FF9500] flex shadow-orange-200 shadow-md`}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={strokeWidth}>
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState('today');

  // Animation States
  const [isVisible, setIsVisible] = useState({
    hero: false,
    mockup: false,
    features: false,
    steps: false
  });

  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // --- SCROLL OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroRef.current) setIsVisible(prev => ({ ...prev, hero: true }));
          if (entry.target === mockupRef.current) setIsVisible(prev => ({ ...prev, mockup: true }));
          if (entry.target === featuresRef.current) setIsVisible(prev => ({ ...prev, features: true }));
          if (entry.target === stepsRef.current) setIsVisible(prev => ({ ...prev, steps: true }));
        }
      });
    }, { threshold: 0.15 });

    if (heroRef.current) observer.observe(heroRef.current);
    if (mockupRef.current) observer.observe(mockupRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (stepsRef.current) observer.observe(stepsRef.current);

    // --- LOGIC ---
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const checkIsIOS = /iphone|ipad|ipod/.test(userAgent);
    const checkIsAndroid = /android/.test(userAgent);
    
    setIsIOS(checkIsIOS);
    setIsAndroid(checkIsAndroid);
    setIsDesktop(!checkIsIOS && !checkIsAndroid);

    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(checkStandalone);

    // Auto-show iOS guide if on iOS browser
    const hasSeenGuide = sessionStorage.getItem('attendly_guide_seen');
    if (checkIsIOS && !checkStandalone && !hasSeenGuide) {
      setTimeout(() => setShowInstallGuide(true), 3000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleDismissGuide = () => {
    setShowInstallGuide(false);
    sessionStorage.setItem('attendly_guide_seen', 'true');
  };

  const handleOpenApp = () => {
    console.log('[Analytics] open_app_clicked');
    window.location.href = APP_URL;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-700 antialiased overflow-x-hidden">
      
      {/* GLOBAL STYLES FOR SCROLLBAR HIDING */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .animate-enter {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-enter.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
          scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm py-2 md:py-3' : 'bg-transparent border-transparent py-3 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-full bg-[#FF9500] flex shadow-orange-200 shadow-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="md:hidden">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="hidden md:block">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900">attendly.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#mockup" className="hover:text-orange-600 transition-colors">preview</a>
            <a href="#features" className="hover:text-orange-600 transition-colors">features</a>
            <a href="#how-it-works" className="hover:text-orange-600 transition-colors">how it works</a>
          </div>

          {/* Nav Button Logic */}
          <div className="hidden md:flex gap-3">
            {/* If Android, show APK button */}
            {isAndroid && (
               <a
                 href={APK_URL}
                 className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-xl shadow-slate-200 flex items-center gap-2"
               >
                 <Download className="w-4 h-4" /> Download APK
               </a>
            )}

            {/* If iOS or Desktop, show Web App button */}
            {(isIOS || isDesktop) && (
              <button
                onClick={handleOpenApp}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-xl shadow-slate-200"
              >
                Open Web App
              </button>
            )}

            {/* If Desktop, ALSO show small APK download link/icon */}
            {isDesktop && (
               <a
                 href={APK_URL}
                 download="attendly.apk"
                 className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 p-2.5 rounded-full transition-transform active:scale-95"
                 title="Download APK for Android"
               >
                 <Download className="w-4 h-4" />
               </a>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-16 md:pb-20">
        
        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="max-w-5xl mx-auto px-4 md:px-6 text-center mb-16 md:mb-32">
          <div className={`transition-all duration-1000 delay-100 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[#FF9500] text-[10px] md:text-xs font-bold uppercase tracking-wide mb-6 md:mb-8">
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#FF9500] animate-pulse"></span>
              v1.0 Live for Chitkara
            </div>

            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 text-slate-900">
              padh le, bhai. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9500] to-orange-500">
                no drama.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium px-2">
              The smart attendance companion that tells you
              <span className="text-slate-900 font-semibold"> exactly</span> how many lectures you can skip without ruining your life.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 md:gap-4 px-4 md:px-0">

              {/* BUTTON LOGIC:
                  - Desktop: Show Both
                  - iOS: Show Web App (+ Add to Home)
                  - Android: Show APK
              */}

              {/* Web App Button: Show on iOS or Desktop */}
              {(isIOS || isDesktop) && (
                <button
                  onClick={handleOpenApp}
                  className="w-full max-w-xs md:max-w-none md:w-auto h-12 md:h-14 px-8 md:px-10 bg-[#FF9500] hover:bg-orange-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                >
                  <span>Open Web App</span>
                  <ChevronRight className="w-4 md:w-5 h-4 md:h-5 opacity-90" />
                </button>
              )}

              {/* APK Button: Show on Android or Desktop */}
              {(isAndroid || isDesktop) && (
                <a
                  href={APK_URL}
                  download={isDesktop ? "attendly.apk" : undefined}
                  className={`w-full max-w-xs md:max-w-none md:w-auto h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl font-bold text-base md:text-lg border transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3 ${
                    isDesktop
                      ? "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                      : "bg-[#FF9500] hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20"
                  }`}
                >
                  <Download className="w-4 md:w-5 h-4 md:h-5" />
                  <span>Download APK</span>
                </a>
              )}

              {/* Add to Home Screen: Show ONLY on iOS (if not already installed) */}
              {isIOS && !isStandalone && (
                <button
                  onClick={() => setShowInstallGuide(true)}
                  className="w-full max-w-xs md:max-w-none md:w-auto h-12 md:h-14 px-6 md:px-8 bg-white hover:bg-slate-50 text-slate-600 rounded-xl md:rounded-2xl font-bold text-base md:text-lg border border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                >
                  <PlusSquare className="w-4 md:w-5 h-4 md:h-5" />
                  <span>Add to Home Screen</span>
                </button>
              )}
            </div>

            <p className="mt-6 md:mt-8 text-xs md:text-sm text-slate-400 font-medium">
              {isAndroid ? "Compatible with Android 10+" : (isDesktop ? "Available for iOS, Android & Web" : "Optimized for iOS Safari & PWA")}
            </p>
          </div>
        </section>

        {/* --- DEVICE PREVIEW (MOCKUP) --- */}
        <section id="mockup" className="mb-24 md:mb-32 px-4">
          <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden">

            {/* Ambient Backgrounds */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-orange-100/30 rounded-full blur-[120px] -z-10"></div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Left Content - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:block order-2 lg:order-1 space-y-8">
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                  Your attendance,<br/>
                  <span className="text-[#FF9500]">beautifully simplified.</span>
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                  We don't just show numbers; we show context. See your attendance health, calculate impact instantly, and track your skip budget with a UI that doesn't hurt your eyes.
                </p>

                <div className="space-y-5 pt-4">
                  {[
                    "Real-time 'Safe' or 'Danger' badges",
                    "Visual Skip Budget Gauge",
                    "Medical & Duty Leave accounting",
                    "Instant 'What-If' Simulation"
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 transition-all duration-700 delay-[${i * 100}ms] ${isVisible.mockup ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF9500] flex items-center justify-center shrink-0 border border-orange-100">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Title - Shown only on mobile */}
              <div className="lg:hidden text-center mb-6">
                <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
                  Your attendance,<br/>
                  <span className="text-[#FF9500]">beautifully simplified.</span>
                </h3>
              </div>

              {/* Right Mockup - iPhone 15 Pro Style */}
              <div ref={mockupRef} className={`order-1 lg:order-2 flex justify-center items-center perspective-1000 transition-all duration-1000 delay-200 ${isVisible.mockup ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
                {/* IPHONE CHASSIS */}
                <div className="relative w-[260px] h-[540px] md:w-[320px] md:h-[660px] bg-slate-900 rounded-[45px] md:rounded-[55px] shadow-2xl border-[10px] md:border-[12px] border-slate-800 overflow-hidden ring-4 ring-slate-300/20 transform transition-transform duration-700 lg:hover:rotate-0 lg:rotate-3 lg:hover:scale-105 mx-auto">
                  
                  {/* Dynamic Island */}
                  <div className="absolute top-0 inset-x-0 h-6 md:h-8 z-30 flex justify-center items-start pt-2 md:pt-3">
                    <div className="w-20 md:w-28 h-5 md:h-7 bg-black rounded-full flex items-center justify-center space-x-2">
                       <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/20 ml-auto mr-2 md:mr-3"></div>
                    </div>
                  </div>

                  {/* Status Bar Fake */}
                  <div className="absolute top-0 inset-x-0 h-10 md:h-12 z-20 flex justify-between px-4 md:px-6 items-center pt-1.5 md:pt-2">
                    <span className="text-white text-[8px] md:text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1 md:gap-1.5">
                       <div className="w-2 md:w-3 h-2 md:h-3 bg-white/20 rounded-full"></div>
                       <div className="w-2 md:w-3 h-2 md:h-3 bg-white/20 rounded-full"></div>
                    </div>
                  </div>

                  {/* --- APP UI START --- */}
                  <div className="w-full h-full flex flex-col pt-10 md:pt-12 bg-white overflow-hidden font-sans rounded-[35px] md:rounded-[42px]">
                    
                    {/* Header */}
                    <div className="px-5 pb-4 bg-white flex items-center gap-4 border-b border-gray-50/50">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="#FF9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-[#1A1A1A]">Attendance Details</span>
                    </div>

                    {/* ScrollView Content - HIDDEN SCROLLBAR */}
                    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12 space-y-4 no-scrollbar bg-gray-50/50">
                      
                      {/* Subject Card */}
                      <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div>
                            <h4 className="text-xl font-bold text-[#1A1A1A]">Data Structures</h4>
                            <p className="text-xs text-gray-400 mt-1 font-medium">CS101 • Aug - Dec</p>
                          </div>
                          <div className="bg-[#10B981]/10 px-3 py-1.5 rounded-full border border-[#10B981]/20">
                            <span className="text-[#10B981] text-xs font-bold">Excellent</span>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-4 relative z-10">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-4xl font-black text-[#1A1A1A] tracking-tight">92.5<span className="text-lg text-gray-400 font-medium">%</span></span>
                            <span className="text-xs text-gray-400 font-medium">37/40 classes</span>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full w-[92.5%] bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981]"></div>
                          </div>
                        </div>

                        {/* Wave SVG Background */}
                        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 pointer-events-none">
                           <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                              <path fill="#10B981" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                           </svg>
                        </div>
                      </div>

                      {/* Skip Budget Card */}
                      <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-between">
                         <div>
                            <h4 className="text-3xl font-bold text-[#1A1A1A]">7 <span className="text-sm font-medium text-gray-400">left</span></h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Skip Budget</p>
                         </div>
                         {/* CSS Gauge Simulation */}
                         <div className="w-20 h-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-[8px] border-gray-100 border-b-0 border-l-0 border-r-0"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-[8px] border-[#10B981] border-b-0 border-l-0 border-r-0 transform rotate-[-45deg]"></div>
                         </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="flex gap-3">
                         <div className="flex-1 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 mb-2 opacity-60">
                               <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                               <span className="text-[10px] font-bold uppercase text-gray-500">Attended</span>
                            </div>
                            <span className="text-2xl font-bold text-[#1A1A1A]">37</span>
                         </div>
                         <div className="flex-1 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 mb-2 opacity-60">
                               <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                               <span className="text-[10px] font-bold uppercase text-gray-500">Absent</span>
                            </div>
                            <span className="text-2xl font-bold text-[#1A1A1A]">03</span>
                         </div>
                      </div>

                      {/* Delivered & Medical */}
                      <div className="flex gap-3">
                        <div className="flex-1 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 mb-2 opacity-60">
                               <Megaphone className="w-3.5 h-3.5 text-[#3B82F6]" />
                               <span className="text-[10px] font-bold uppercase text-gray-500">Delivered</span>
                            </div>
                            <span className="text-2xl font-bold text-[#1A1A1A]">40</span>
                         </div>
                         <div className="flex-1 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl p-3">
                            <div className="flex items-center gap-1.5 mb-2 opacity-60">
                               <Activity className="w-3.5 h-3.5 text-[#EC4899]" />
                               <span className="text-[10px] font-bold uppercase text-gray-500">Medical</span>
                            </div>
                            <span className="text-2xl font-bold text-[#1A1A1A]">01</span>
                         </div>
                      </div>
                      
                      {/* Simulator Prompt */}
                      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                         <h5 className="font-bold text-sm text-[#1A1A1A] mb-4">What if I skip...</h5>
                         <div className="flex gap-2">
                            <button 
                              onClick={() => setActiveSimulatorTab('today')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeSimulatorTab === 'today' ? 'bg-[#FF9500] text-white shadow-lg shadow-orange-200' : 'bg-gray-50 text-gray-500'}`}
                            >
                              Today
                            </button>
                            <button 
                              onClick={() => setActiveSimulatorTab('tomorrow')}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeSimulatorTab === 'tomorrow' ? 'bg-[#FF9500] text-white shadow-lg shadow-orange-200' : 'bg-gray-50 text-gray-500'}`}
                            >
                              Tomorrow
                            </button>
                         </div>
                      </div>

                    </div>
                  </div>
                  {/* --- APP UI END --- */}
                
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section id="features" ref={featuresRef} className="max-w-7xl mx-auto px-4 md:px-6 mb-20 md:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 md:mb-4">More information, less stress.</h2>
            <p className="text-slate-500 text-base md:text-lg">Every pixel designed to give you clarity at 8:00 AM.</p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Feature 1 */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <PieChart className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Smart Calculations</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                We use the official attendance formula: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px] md:text-xs font-bold text-slate-700">(Attended + DL + ML) / Delivered</code>. No estimation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-[#FCE7F3] text-[#9D174D] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Briefcase className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Duty & Medical Leaves</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Approved DLs and MLs are automatically fetched and added to your attended count, keeping your percentage accurate.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-orange-50 text-[#FF9500] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Zap className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Skip Budget Gauge</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                See exactly how many classes you can miss while staying above 75%. If you're low, we show you the recovery path.
              </p>
            </div>

             {/* Feature 4 */}
             <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-red-50 text-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <AlertCircle className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Danger Zone Alerts</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                We highlight subjects dropping near 75% in red so you never accidentally hit the detention list.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-green-50 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Lock className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Privacy First</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Your credentials are used locally to fetch data. We never store your password or attendance history on our servers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-purple-50 text-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Calendar className="w-6 md:w-7 h-6 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">Timetable Sync</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Your daily schedule is auto-imported. No manual entry required. Just login and view your day.
              </p>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS (ANIMATED STEPS) --- */}
        <section id="how-it-works" ref={stepsRef} className="py-16 md:py-24 max-w-4xl mx-auto px-4 md:px-6 border-t border-slate-200">
          <div className={`space-y-8 md:space-y-12 transition-all duration-1000 delay-100 ${isVisible.steps ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {[
              { num: "01", title: "Connect Account", text: "Login with your university credentials safely." },
              { num: "02", title: "Auto-Analysis", text: "We fetch your history, timetable, and leaves instantly." },
              { num: "03", title: "Plan Bunks", text: "Use the simulator to see if you can sleep in tomorrow." }
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 md:gap-8 group">
                <div className="w-14 md:w-20 h-14 md:h-20 rounded-2xl md:rounded-3xl bg-white border-2 border-slate-200 text-slate-300 flex items-center justify-center font-black text-xl md:text-3xl shadow-sm group-hover:border-[#FF9500] group-hover:text-[#FF9500] transition-all duration-300 shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-[#FF9500] transition-colors">{step.title}</h3>
                  <p className="text-slate-500 text-sm md:text-lg font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-10 md:py-12 px-4 md:px-6 text-center border-t border-slate-200 bg-white">
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
             <AttendlyLogo size="md" />
             <span className="font-bold text-lg md:text-xl text-slate-900">attendly.</span>
          </div>
          <p className="text-slate-500 text-xs md:text-sm mb-4 md:mb-6">
            Built by{' '}
            <a href="https://www.linkedin.com/in/raghav-taneja-bb84412b7/" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-[#FF9500] inline-flex items-center gap-1">
              Raghav Taneja
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            . Not affiliated with Chitkara University.
          </p>
          <a href="mailto:raghavtaneja2808@gmail.com" className="text-slate-400 text-xs md:text-sm hover:text-[#FF9500] transition-colors mb-6 md:mb-8 block">
            raghavtaneja2808@gmail.com
          </a>
          <div className="flex justify-center gap-4 md:gap-6 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mt-6">
            <a href="#" className="hover:text-[#FF9500]">Privacy</a>
            <a href="#" className="hover:text-[#FF9500]">Terms</a>
            <a href="#" className="hover:text-[#FF9500]">Contact</a>
          </div>
        </footer>

      </main>

      {/* --- IOS INSTALL GUIDE OVERLAY --- */}
      {showInstallGuide && !isAndroid && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleDismissGuide}></div>
          <div className="relative w-full max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl p-8 animate-enter visible">
            <button onClick={handleDismissGuide} className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#FF9500]">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Install attendly</h3>
              <p className="text-slate-500 mt-2">Add to Home Screen for the full experience.</p>
            </div>
            <div className="space-y-4 bg-[#F5F5F5] p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-700">
                <Share className="w-5 h-5 text-blue-500" />
                <span>Tap <strong>Share</strong> in Safari</span>
              </div>
              <div className="h-px bg-slate-200 w-full"></div>
              <div className="flex items-center gap-4 text-sm text-slate-700">
                <PlusSquare className="w-5 h-5 text-slate-900" />
                <span>Select <strong>Add to Home Screen</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;