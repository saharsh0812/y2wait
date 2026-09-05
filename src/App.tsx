import React, { useState, useEffect, useRef } from 'react';
import {
  Truck, User, ShieldCheck, MapPin, ArrowRight,
  Bot, X, Upload, CheckCircle2,
  Layers, HelpCircle, Radio, Menu, Crown,
  History, LogOut, Settings, PhoneCall,
  Info, Camera, Bus, ShoppingBag, Building,
  AlertTriangle, Package, Clock, QrCode, TrendingDown,
  Activity, ArrowLeft, ChevronDown,
  Star, PlayCircle, Lock, Search, Flame, Eye, Box, Send, Plus, Check, Award, ChevronRight
} from 'lucide-react';

// --- CONSTANTS & MOCK DATA ---

const platformFeatures = [
  { id: 1, url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1600", title: "Enterprise Bidding", subtitle: "Experience zero-commission loads and simplified logistics for businesses.", tag: "CORPORATE" },
  { id: 2, url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1600", title: "Bus Parcel Delivery", subtitle: "Ship small parcels between cities using our reliable inter-city Volvo network.", tag: "NETWORK" },
  { id: 3, url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600", title: "Highway Freight Hub", subtitle: "Zero-commission loads for outstation fleets. Maximize your earnings.", tag: "FREIGHT" },
  { id: 4, url: "https://images.unsplash.com/photo-1586528116311-ad8ed7b66bfc?auto=format&fit=crop&q=80&w=1600", title: "Safe Traffic QR", subtitle: "One scan for Police checks. No physical papers. Absolute peace of mind.", tag: "SECURITY" },
];

const mandiProducts = [
  { id: 1, name: "Premium Synthetic Engine Oil", type: "Lubricants", price: "4,500", tag: "OEM Certified", stock: "In Stock", img: "https://images.unsplash.com/photo-1635767798638-3e2523d06eb1?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "MRF Heavy Commercial Radial", type: "Tires", price: "18,500", tag: "Heavy Duty", stock: "In Stock", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Tata Signa Brake Pads Set", type: "Spare Parts", price: "3,200", tag: "Genuine Part", stock: "In Stock", img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=400" },
  { id: 4, type: "Electricals", name: "Exide Heavy Duty Fleet Battery", price: "14,000", tag: "Warranty", stock: "Few Left", img: "https://images.unsplash.com/photo-1528659105436-1e612a201c13?auto=format&fit=crop&q=80&w=400" }
];

// --- TYPE DEFINITIONS ---
type Role = 'driver' | 'transporter' | 'trader' | 'corporate' | null;
type View = 'landing' | 'dashboard' | 'premium' | 'history' | 'support' | 'settings' | 'about' | 'services' | 'safe_qr' | 'feature_detail' | 'contact';
type ModuleTab = 'freight' | 'bus_cargo' | 'mandi' | 'ads' | 'corporate';
type ListingTab = 'all' | 'my_listings' | 'command_center';

// --- STANDALONE COMPONENTS ---
const BackToDashboardBtn = ({ onClick, text }: { onClick: () => void, text: string }) => (
  <div className="mb-8 w-full max-w-[1600px] mx-auto px-4 sm:px-8 relative z-20 text-left">
    <button type="button" onClick={onClick} className="flex items-center text-[#EA580C] font-black bg-[#0F172A] px-6 py-3 rounded-xl shadow-xl w-fit group hover:bg-black transition-all border border-slate-800 cursor-pointer">
      <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> {text}
    </button>
  </div>
);

// --- PHOTOREALISTIC TATA SIGNA HEAVY CONTAINER LORRY 360° STAGE ---
const PhotorealisticTataLorry360Stage = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [degreeAngle, setDegreeAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const normAngle = (degreeAngle % 360 + 360) % 360;
  const rotationRad = (normAngle * Math.PI) / 180;
  
  // Smooth Y-axis 3D perspective rotation (Manual drag/tap interaction only)
  const floatY = Math.sin(rotationRad * 2) * 2;
  const rotateYDeg = Math.sin(rotationRad) * 32;

  return (
    <div 
      className="relative w-full max-w-3xl min-h-[460px] sm:min-h-[520px] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible group"
      style={{ perspective: '1600px' }}
      onMouseDown={(e) => { setIsDragging(true); setStartX(e.clientX); }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        setStartX(e.clientX);
        setDegreeAngle((prev) => (prev + dx * 0.8) % 360);
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={(e) => { setIsDragging(true); setStartX(e.touches[0].clientX); }}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        setStartX(e.touches[0].clientX);
        setDegreeAngle((prev) => (prev + dx * 0.8) % 360);
      }}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* 100% PHOTOREALISTIC TATA HEAVY CONTAINER LORRY (Rests directly on top of the podium disc) */}
      <div 
        className="relative z-20 w-full flex flex-col items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${floatY}px) rotateY(${rotateYDeg}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <img
          src="/y2wait_tata_truck_clean_3d_transparent.png"
          alt="Real Tata Signa Y2WAIT Heavy Container Lorry"
          className="w-[100%] h-auto max-h-[480px] sm:max-h-[520px] object-contain cursor-pointer transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
          style={{
            mixBlendMode: 'normal',
            filter: 'none',
            opacity: 1
          }}
        />
      </div>

      {/* Realistic Tire Contact Shadow (Tight underneath wheels) */}
      <div className={`w-[82%] h-4 rounded-full -mt-6 sm:-mt-8 z-10 blur-xs transition-colors duration-500 ${theme === 'dark' ? 'bg-black/95' : 'bg-slate-950/80'}`}></div>

      {/* Unique 3D Metallic Glass Turntable Podium Base (Truck sits flush on top!) */}
      <div className={`relative w-[95%] sm:w-[92%] h-24 rounded-[100%] border-2 transition-all duration-500 flex items-center justify-center -mt-10 z-0 shadow-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0B0F17] border-[#EA580C]/80 shadow-[0_20px_50px_rgba(234,88,12,0.3)]'
          : 'bg-gradient-to-b from-[#E2E8F0] via-[#F1F5F9] to-[#CBD5E1] border-[#EA580C] shadow-[0_20px_40px_rgba(234,88,12,0.25)]'
      }`}>
        <div className={`w-[85%] h-14 rounded-[100%] border ${theme === 'dark' ? 'border-orange-500/40 bg-slate-900/60' : 'border-orange-500/50 bg-white/60'}`}></div>
        <div className={`w-[65%] h-8 rounded-[100%] border ${theme === 'dark' ? 'border-amber-400/30' : 'border-amber-500/40'}`}></div>
        <div className="absolute top-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#EA580C] to-transparent"></div>
      </div>

      {/* Interactive Control Pill */}
      <div className={`absolute -bottom-6 z-30 backdrop-blur-md px-4 py-1.5 rounded-full border text-[11px] font-black tracking-wide uppercase flex items-center space-x-2 shadow-lg ${
        theme === 'dark' ? 'bg-slate-900/90 border-slate-700 text-slate-300' : 'bg-white/90 border-slate-300 text-slate-800'
      }`}>
        <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping"></span>
        <span>Drag mouse or swipe to rotate 3D Tata Lorry</span>
      </div>
    </div>
  );
};

// --- VAHAK & PORTER INSPIRED QUICK SEARCH WIDGET ---
const HeroQuickLoadSearchWidget = ({ onSearch }: { onSearch: (from: string, to: string, type: string) => void }) => {
  const [tab, setTab] = useState<'find' | 'post'>('find');
  const [pickup, setPickup] = useState('Delhi NCR');
  const [drop, setDrop] = useState('Mumbai');
  const [vehicle, setVehicle] = useState('32ft MX Container');

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white text-left space-y-6">
      
      {/* Widget Header & Tabs */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 flex-wrap gap-4">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setTab('find')}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center ${tab === 'find' ? 'bg-[#EA580C] text-white shadow-lg shadow-orange-950/50 scale-105' : 'bg-slate-800/80 text-slate-400 hover:text-white'}`}
          >
            <Search className="h-4 w-4 mr-2" /> Find Freight Loads
          </button>
          <button
            type="button"
            onClick={() => setTab('post')}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center ${tab === 'post' ? 'bg-[#EA580C] text-white shadow-lg shadow-orange-950/50 scale-105' : 'bg-slate-800/80 text-slate-400 hover:text-white'}`}
          >
            <Truck className="h-4 w-4 mr-2" /> Post Available Fleet
          </button>
        </div>
        <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span> 1,420 Active Loads Online
        </span>
      </div>

      {/* Form Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pickup City */}
        <div>
          <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Pickup Origin
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 h-5 w-5 text-[#EA580C]" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup city"
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-white font-bold text-sm focus:border-[#EA580C] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Drop City */}
        <div>
          <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Destination Drop
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 h-5 w-5 text-teal-400" />
            <input
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Enter destination city"
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-white font-bold text-sm focus:border-teal-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Truck / Cargo Type */}
        <div>
          <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Truck Body / Cargo Type
          </label>
          <div className="relative">
            <Box className="absolute left-4 top-4 h-5 w-5 text-orange-400" />
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-12 pr-8 py-3.5 text-white font-bold text-sm focus:border-[#EA580C] focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="32ft MX Container">32ft Multi-Axle Container</option>
              <option value="24ft Open Body">24ft Open Body Fleet</option>
              <option value="19ft Eicher Truck">19ft Eicher Truck</option>
              <option value="Trailer 40ft">40ft Heavy Duty Trailer</option>
              <option value="Volvo Bus Cargo">Volvo Inter-city Bus Express</option>
            </select>
            <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Quick City Buttons & CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Popular Hubs:</span>
          {['Delhi ➔ Mumbai', 'Jaipur ➔ Ahmedabad', 'Bengaluru ➔ Chennai'].map((route, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const parts = route.split(' ➔ ');
                setPickup(parts[0]);
                setDrop(parts[1]);
              }}
              className="text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 px-3 py-1 rounded-xl transition-all cursor-pointer"
            >
              {route}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onSearch(pickup, drop, vehicle)}
          className="w-full sm:w-auto bg-[#EA580C] hover:bg-orange-700 text-white font-black px-10 py-4 rounded-2xl text-base shadow-[0_10px_30px_rgba(234,88,12,0.5)] transition-all flex items-center justify-center cursor-pointer hover:scale-105 transform"
        >
          {tab === 'find' ? 'Search Matches Now' : 'Post Fleet Instantly'} <ArrowRight className="h-5 w-5 ml-2.5" />
        </button>
      </div>

    </div>
  );
};

export default function App() {
  // --- APP STATE ---
  const [activeView, setActiveView] = useState<View>('landing');
  const [activeModule, setActiveModule] = useState<ModuleTab>('freight');
  const [listingTab, setListingTab] = useState<ListingTab>('all');
  const [busTab, setBusTab] = useState<ListingTab>('all');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoText, setDemoText] = useState("");

  // Dynamic Scroll Truck State
  const deliverySectionRef = useRef<HTMLDivElement>(null);
  const roadTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [platformStats, setPlatformStats] = useState({ trucks: 0, parcels: 0, verified: 0, cities: 0 });
  const t = (en: string, hi: string) => language === 'en' ? en : hi;

  // --- AUTH STATE ---
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' | null; step: 'role' | 'mobile' | 'password' | 'otp' | 'details' | 'forgot_otp' | 'reset_password' | 'forgot_phone' | 'forgot_new_password' }>({ open: false, mode: null, step: 'role' });
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({ firstName: '', lastName: '', mobile: '', email: '', password: '', confirmPassword: '', otp: '', businessName: '', gst: '', dl: '', dp: '' });
  const [otpVal, setOtpVal] = useState('');

  // Safe QR docs
  const [qrDocs, setQrDocs] = useState({ dl: false, rc: false, ins: false, permit: false });
  const allDocsUploaded = qrDocs.dl && qrDocs.rc && qrDocs.ins && qrDocs.permit;

  // Form states
  const [newTruck, setNewTruck] = useState({ origin: '', dest: '', capacity: '', charges: '', vehicleNumber: '' });
  const [newLoad, setNewLoad] = useState({ material: '', weight: '', origin: '', destination: '', targetPrice: '' });
  const [newBus, setNewBus] = useState({ route: '', serviceType: 'Standard', price: '', vehicleNumber: '', capacity: '', productType: '', weight: '' });
  const [newBid, setNewBid] = useState({ demand: '', route: '', initialL1: '' });

  const [siteTheme, setSiteTheme] = useState<'dark' | 'light'>('dark');
  const [negotiationTarget, setNegotiationTarget] = useState<any>(null);
  const [counterOffer, setCounterOffer] = useState('');

  // --- MODULE STATES ---
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [expandedListingId, setExpandedListingId] = useState<string | null>(null);
  const [safetyEnabled, setSafetyEnabled] = useState<boolean>(false);

  // Real-time Filters
  const [freightSearch, setFreightSearch] = useState('');
  const [freightCapacityFilter, setFreightCapacityFilter] = useState('');
  const [busSearch, setBusSearch] = useState('');
  const [busTypeFilter, setBusTypeFilter] = useState('');

  // Live Production Repositories (Initial empty states, populates from MongoDB API)
  const [driversList, setDriversList] = useState<any[]>([]);
  const [loadsList, setLoadsList] = useState<any[]>([]);
  const [busSpaceList, setBusSpaceList] = useState<any[]>([]);
  const [corporateBids, setCorporateBids] = useState<any[]>([]);

  // Real MongoDB Live API Fetch on App Load
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const [trucksRes, loadsRes] = await Promise.all([
          fetch("https://y2wait-backend.onrender.com/api/trucks").catch(() => null),
          fetch("https://y2wait-backend.onrender.com/api/loads").catch(() => null)
        ]);

        if (trucksRes && trucksRes.ok) {
          const data = await trucksRes.json();
          setDriversList(data.trucks || data.data || data || []);
        }

        if (loadsRes && loadsRes.ok) {
          const data = await loadsRes.json();
          setLoadsList(data.loads || data.data || data || []);
        }
      } catch (err) {
        console.error("MongoDB initial fetch error:", err);
      }
    };

    fetchRealData();
  }, []);

  // Update platform stats dynamically based on real MongoDB records
  useEffect(() => {
    const totalTrucks = driversList.length;
    const totalLoads = loadsList.length;
    const verifiedCount = driversList.filter((d: any) => d.verified !== false).length;
    const uniqueCities = new Set(
      [...driversList, ...loadsList]
        .flatMap((i: any) => [i.origin, i.destination, i.currentLoc, i.destLoc])
        .filter(Boolean)
    ).size;

    setPlatformStats({
      trucks: totalTrucks,
      parcels: totalLoads,
      verified: verifiedCount,
      cities: uniqueCities
    });
  }, [driversList, loadsList]);

  // Handle Scroll Progress for Highway Truck Roadmap Animation (Bound directly to roadTrackRef)
  useEffect(() => {
    const handleScroll = () => {
      const el = roadTrackRef.current || deliverySectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start: Top of roadmap track enters viewport (rect.top <= windowHeight * 0.85) => progress = 0.0 (Node 01)
      // End: Bottom of roadmap track approaches top of viewport (rect.bottom <= windowHeight * 0.25) => progress = 1.0 (Node 04)
      const startThreshold = windowHeight * 0.85;
      const endThreshold = windowHeight * 0.25;

      const totalDistance = (startThreshold - endThreshold) + rect.height;
      const currentScrollPosition = startThreshold - rect.top;

      const rawProgress = currentScrollPosition / totalDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  // Typing effect for demo
  useEffect(() => {
    if (showDemo) {
      const fullText = "Simulating Real-Time Y2Wait Freight Radar Matchmaking...";
      let i = 0;
      setDemoText("");
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDemoText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showDemo]);

  // Derived lists
  const combinedFeed = [...driversList, ...loadsList].filter((item: any) => {
    const orig = (item.origin || item.currentLoc || '').toLowerCase();
    const dest = (item.destination || item.destLoc || '').toLowerCase();
    const matchSearch = !freightSearch || orig.includes(freightSearch.toLowerCase()) || dest.includes(freightSearch.toLowerCase());
    const matchCap = !freightCapacityFilter || String(item.capacity || item.weight) === freightCapacityFilter;
    return matchSearch && matchCap;
  });

  const filteredBusFeed = busSpaceList.filter((b: any) => {
    const rt = (b.route || '').toLowerCase();
    const op = (b.operator || '').toLowerCase();
    const matchSearch = !busSearch || rt.includes(busSearch.toLowerCase()) || op.includes(busSearch.toLowerCase());
    const matchType = !busTypeFilter || b.serviceType === busTypeFilter;
    return matchSearch && matchType;
  });

  const safeBids = corporateBids || [];
  const myActiveItem = combinedFeed.find((i: any) => i.isMine);
  const originLabel = myActiveItem ? (myActiveItem.origin || 'Mumbai') : 'Delhi';
  const destLabel = myActiveItem ? (myActiveItem.destination || 'Kolkata') : 'Patna';

  // Helper actions
  const handlePageChange = (v: View) => {
    setActiveView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeLogin = () => {
    setIsLoggedIn(true);
    setAuthModal({ open: false, mode: null, step: 'role' });
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedRole(null);
    setUser({ firstName: '', lastName: '', mobile: '', email: '', password: '', confirmPassword: '', otp: '', businessName: '', gst: '', dl: '', dp: '' });
    setActiveView('landing');
  };

  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/918210160012?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleFileUpload = (field: string, e: any) => {
    if (e.target.files && e.target.files[0]) {
      alert(`${field} uploaded successfully!`);
    }
  };

  const handleProfilePicUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, dp: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostTruck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTruck.origin) return;
    try {
      const response = await fetch("https://y2wait-backend.onrender.com/api/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: newTruck.origin,
          destination: newTruck.dest,
          capacity: newTruck.capacity,
          charges: newTruck.charges,
          vehicleNumber: newTruck.vehicleNumber,
          driverName: user.firstName || 'Verified Driver',
          phone: user.mobile
        })
      });
      if (response.ok) {
        const data = await response.json();
        setDriversList([data.truck || data, ...driversList]);
        setPlatformStats((prev: any) => ({ ...prev, trucks: prev.trucks + 1, cities: prev.cities + 2 }));
        setListingTab('my_listings');
        setNewTruck({ origin: '', dest: '', capacity: '', charges: '', vehicleNumber: '' });
        setBookingStep(1);
        alert("Truck posted successfully!");
      } else {
        alert("Failed to post truck.");
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend.");
    }
  };

  const handlePostLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoad.origin) return;
    try {
      const response = await fetch("https://y2wait-backend.onrender.com/api/loads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          material: newLoad.material,
          weight: newLoad.weight,
          origin: newLoad.origin,
          destination: newLoad.destination,
          targetPrice: newLoad.targetPrice,
          companyName: user.businessName || user.firstName,
          phone: user.mobile
        })
      });
      if (response.ok) {
        const data = await response.json();
        setLoadsList([data.load || data, ...loadsList]);
        setPlatformStats((prev: any) => ({ ...prev, parcels: prev.parcels + 1, cities: prev.cities + 2 }));
        setListingTab('my_listings');
        setNewLoad({ material: '', weight: '', origin: '', destination: '', targetPrice: '' });
        setBookingStep(1);
        alert("Load posted successfully!");
      } else {
        alert("Failed to post load.");
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend.");
    }
  };

  const handlePostBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBus.route) return alert(t("Please enter Route.", "कृपया रूट डालें।"));
    const isDriver = selectedRole === 'driver' || selectedRole === 'transporter';
    const capacityText = isDriver ? `${newBus.capacity} Space` : `${newBus.productType} (${newBus.weight} KG)`;
    const busPayload = {
      id: `BUS-${Math.floor(Math.random() * 9000)}`,
      operator: user.businessName || user.firstName || 'Travels',
      phone: user.mobile,
      dp: user.dp,
      route: newBus.route,
      capacity: capacityText,
      price: Number(newBus.price) || 500,
      isMine: true,
      serviceType: newBus.serviceType || 'Standard',
      busImg: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400'
    };
    setBusSpaceList([busPayload, ...busSpaceList]);
    setNewBus({ route: '', serviceType: 'Standard', price: '', vehicleNumber: '', capacity: '', productType: '', weight: '' });
    setBusTab('my_listings');
    setBookingStep(1);
  };

  const handlePostBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBid.demand) return;
    const created = { id: `#${Math.floor(10000 + Math.random() * 90000)}`, company: user.businessName || 'Corporate', demand: newBid.demand, route: newBid.route, L1: Number(newBid.initialL1) || 50000, time: '7 Days Left', l1Holder: 'Awaiting Bids' };
    setCorporateBids([created, ...corporateBids]);
    setNewBid({ demand: '', route: '', initialL1: '' });
  };

  const processBid = () => {
    if (!counterOffer) return alert("Please enter amount.");
    alert(`Bid of ₹${counterOffer} placed for ${negotiationTarget?.data?.id}`);
    setNegotiationTarget(null);
    setCounterOffer('');
  };

  // --- REUSABLE COMPONENTS ---
  const renderLayeredStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 max-w-lg mx-auto">
      <div className={`flex items-center ${bookingStep >= 1 ? 'text-[#EA580C] font-black' : 'text-slate-400 font-medium'}`}><span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mr-2 ${bookingStep >= 1 ? 'bg-[#EA580C] text-white shadow-md' : 'bg-slate-100'}`}>1</span><span className="text-sm">Location</span></div>
      <div className={`h-0.5 w-8 sm:w-16 ${bookingStep >= 2 ? 'bg-[#EA580C]' : 'bg-slate-200'}`}></div>
      <div className={`flex items-center ${bookingStep >= 2 ? 'text-[#EA580C] font-black' : 'text-slate-400 font-medium'}`}><span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mr-2 ${bookingStep >= 2 ? 'bg-[#EA580C] text-white shadow-md' : 'bg-slate-100'}`}>2</span><span className="text-sm">Details</span></div>
      <div className={`h-0.5 w-8 sm:w-16 ${bookingStep >= 3 ? 'bg-[#EA580C]' : 'bg-slate-200'}`}></div>
      <div className={`flex items-center ${bookingStep >= 3 ? 'text-[#EA580C] font-black' : 'text-slate-400 font-medium'}`}><span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm mr-2 ${bookingStep >= 3 ? 'bg-[#EA580C] text-white shadow-md' : 'bg-slate-100'}`}>3</span><span className="text-sm">Confirm</span></div>
    </div>
  );

  const renderLiveRadar = () => (
    <div className="w-full bg-[#0F172A] border border-slate-800 rounded-[2rem] p-8 shadow-2xl animate-fade-in mt-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#EA580C] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center"><MapPin className="h-6 w-6 text-[#EA580C] mr-2" /> Live Command Radar</h2>
          <p className="text-sm text-slate-400 mt-1 font-medium">Real-time GPS positioning on Grid</p>
        </div>
        <button type="button" onClick={() => setSafetyEnabled(!safetyEnabled)} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg cursor-pointer ${safetyEnabled ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
          <AlertTriangle className="h-4 w-4 inline mr-2" /> Road Safety: {safetyEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        <div className="flex-[2] relative rounded-[1.5rem] overflow-hidden bg-[#000000] shadow-inner border border-slate-800 h-[450px]">
          {safetyEnabled && (
            <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="h-20 w-20 text-red-500 mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              <h3 className="text-4xl font-black text-red-500 mb-4 tracking-tight">High Risk Zone</h3>
              <p className="text-slate-300 text-lg font-bold mb-8">Alert on route to {destLabel}. 3 Fatal Accidents in 48 Hrs.<br />Foggy conditions ahead.</p>
              <button type="button" onClick={() => setSafetyEnabled(false)} className="bg-red-600 text-white px-10 py-4 rounded-xl text-base font-black hover:bg-red-700 shadow-xl cursor-pointer">Acknowledge</button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="border border-teal-500/20 rounded-full w-[100%] h-[100%] absolute animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="border border-teal-500/30 rounded-full w-[70%] h-[70%] absolute"></div>
            <div className="border border-teal-500/50 rounded-full w-[40%] h-[40%] absolute"></div>
            <div className="w-4 h-4 bg-[#EA580C] rounded-full absolute shadow-[0_0_20px_#EA580C]"></div>

            {myActiveItem ? (
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 800 600">
                <path d="M 200 300 Q 400 100 600 300" fill="transparent" stroke="#EA580C" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse opacity-60" />
                <circle cx="200" cy="300" r="8" fill="#EA580C" />
                <text x="170" y="330" fill="#94A3B8" fontSize="14" fontWeight="bold">{originLabel}</text>
                <circle cx="600" cy="300" r="8" fill="#EA580C" className="animate-ping" />
                <circle cx="600" cy="300" r="6" fill="#EA580C" />
                <text x="570" y="330" fill="#94A3B8" fontSize="14" fontWeight="bold">{destLabel}</text>
                <g className="animate-truck-move-dynamic">
                  <rect x="-20" y="-10" width="40" height="20" fill="#EA580C" rx="4" />
                </g>
              </svg>
            ) : (
              <div className="text-slate-500 font-bold z-10 bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-800">Scanning active fleet grid...</div>
            )}
          </div>

          {myActiveItem && (
            <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur p-5 rounded-2xl border border-slate-700 w-80 z-20 shadow-2xl">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Active Trip Telemetry</h4>
              <div className="flex justify-between items-center mb-3">
                <span className="font-black text-white truncate max-w-[40%] text-base">{originLabel}</span>
                <ArrowRight className="h-5 w-5 text-slate-500" />
                <span className="font-black text-white truncate max-w-[40%] text-base">{destLabel}</span>
              </div>
              <div className="text-[10px] text-teal-400 font-black flex items-center mt-4 bg-teal-500/10 w-fit px-3 py-1.5 rounded-lg border border-teal-500/20">
                <Radio className="h-4 w-4 mr-2 animate-pulse" /> GPS Connection Active
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-black p-8 rounded-[1.5rem] border border-slate-800 shadow-inner flex-1">
            <h4 className="text-white font-black text-base mb-8">Tracking Timeline</h4>
            <div className="relative border-l-2 border-slate-800 ml-5 space-y-10 pb-4">
              <div className="relative">
                <div className="absolute -left-[25px] bg-black p-1"><CheckCircle2 className="h-6 w-6 text-emerald-500" /></div>
                <div className="pl-6">
                  <h4 className="font-black text-white text-base">Booked</h4>
                  <p className="text-xs text-slate-500 font-bold">Order Confirmed</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] bg-black p-1"><Truck className="h-6 w-6 text-[#EA580C]" /></div>
                <div className="pl-6">
                  <h4 className="font-black text-white text-base">Picked Up</h4>
                  <p className="text-xs text-slate-500 font-bold">Package Loaded</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] bg-black p-1"><Radio className="h-6 w-6 text-teal-400 animate-pulse" /></div>
                <div className="pl-6">
                  <h4 className="font-black text-teal-400 text-base">In Transit</h4>
                  <p className="text-xs text-slate-500 font-bold">Current Location</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[25px] bg-black p-1"><Package className="h-6 w-6 text-slate-700" /></div>
                <div className="pl-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-black text-slate-400 text-base">Shipped</h4>
                  <p className="text-xs text-slate-600 font-bold">Pending Arrival</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dynamic Truck Highway position calculations based on scrollProgress
  // Exact SVG pixel alignment (viewBox 0 0 1000 220) so truck drives directly on the road
  const calcTruckPosition = (p: number) => {
    const x = 80 + p * 840; // 80px to 920px
    let y = 100;
    let angle = 0;

    if (p < 0.35) {
      const t = p / 0.35;
      y = 100 - Math.sin(t * Math.PI) * 45;
      angle = -Math.cos(t * Math.PI) * 20;
    } else if (p < 0.75) {
      const t = (p - 0.35) / 0.4;
      y = 100 + Math.sin(t * Math.PI) * 45;
      angle = Math.cos(t * Math.PI) * 20;
    } else {
      const t = (p - 0.75) / 0.25;
      y = 100 - Math.sin(t * Math.PI) * 35;
      angle = -Math.cos(t * Math.PI) * 15;
    }

    return { x, y, angle };
  };

  const truckPos = calcTruckPosition(scrollProgress);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#EA580C] selection:text-white flex flex-col overflow-x-hidden relative">

      {/* 🇮🇳 REAL INDIA MAP WATERMARK */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0F172A] opacity-5"></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Outline_Map_of_India.svg"
          alt=""
          className="w-[90%] max-w-5xl h-auto opacity-[0.06] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] mix-blend-multiply"
        />
      </div>

      {/* --- TOP ANNOUNCEMENT / UTILITY BAR --- */}
      <div className="bg-[#0B1120] text-slate-300 text-xs font-bold py-2.5 px-6 border-b border-slate-800 z-50">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#EA580C]"><PhoneCall className="h-3.5 w-3.5 mr-2" /> Helpdesk: +91 82101 60012</span>
            <span className="hidden md:flex items-center text-slate-400"><Clock className="h-3.5 w-3.5 mr-2 text-slate-400" /> Mon - Sat: 9:00 AM - 8:00 PM</span>
            <span className="hidden lg:flex items-center text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> 100% Verified Freight Matching</span>
          </div>
          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => setShowDemo(true)} className="text-white hover:text-[#EA580C] flex items-center transition-colors cursor-pointer">
              <PlayCircle className="h-3.5 w-3.5 mr-1 text-[#EA580C]" /> Live Demo Simulator
            </button>
            <span className="text-slate-600">|</span>
            <button type="button" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="hover:text-white transition-colors cursor-pointer">
              🌐 {language === 'en' ? 'English' : 'हिंदी'}
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handlePageChange('landing')}>
            <div className="bg-[#EA580C] p-2.5 rounded-xl text-white shadow-md shadow-orange-500/20">
              <Truck className="h-7 w-7" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A]">Y2<span className="text-[#EA580C]">Wait</span></span>
          </div>

          <nav className="hidden lg:flex space-x-8 text-sm font-black text-slate-700">
            {[{ v: 'landing', e: 'HOME', h: 'होम' }, { v: 'about', e: 'ABOUT US', h: 'हमारे बारे में' }, { v: 'services', e: 'SERVICES', h: 'सेवाएं' }, { v: 'premium', e: 'PRICING', h: 'कीमत' }, { v: 'contact', e: 'CONTACT', h: 'संपर्क करें' }].map((page: any) => (
              <button type="button" key={page.v} onClick={() => handlePageChange(page.v as View)} className={`hover:text-[#EA580C] transition-colors uppercase tracking-wide cursor-pointer ${activeView === page.v ? 'text-[#EA580C] border-b-2 border-[#EA580C] pb-1' : ''}`}>{t(page.e, page.h)}</button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button type="button" onClick={() => handlePageChange('dashboard')} className="text-sm font-black text-[#EA580C] hidden sm:block border border-[#EA580C] bg-orange-50 px-5 py-2.5 rounded-xl hover:bg-[#EA580C] hover:text-white transition-colors shadow-md cursor-pointer">Dashboard</button>
                <div className="h-11 w-11 bg-slate-200 rounded-full cursor-pointer flex items-center justify-center overflow-hidden border-2 border-[#0F172A] shadow-md hover:scale-105 transition-transform" onClick={() => setDrawerOpen(true)}>
                  {user.dp ? <img src={user.dp} className="h-full w-full object-cover" alt="" /> : <User className="h-6 w-6 text-slate-500" />}
                </div>
              </div>
            ) : (
              <>
                <button type="button" onClick={() => setAuthModal({ open: true, mode: 'login', step: 'role' })} className="text-[#0F172A] font-black text-sm hover:text-[#EA580C] transition-colors px-4 cursor-pointer">
                  Login
                </button>
                <button type="button" onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })} className="bg-[#EA580C] text-white px-7 py-3 rounded-xl font-black text-sm hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 cursor-pointer">
                  Create Account
                </button>
                <button type="button" className="lg:hidden text-slate-600 cursor-pointer" onClick={() => setDrawerOpen(true)}><Menu className="h-7 w-7" /></button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- DRAWER (Profile & Settings) --- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[150] flex">
          <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm" onClick={() => setDrawerOpen(false)}></div>
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col animate-fade-in z-50 border-r border-slate-100">
            {isLoggedIn ? (
              <>
                <div className="p-10 border-b border-slate-100 flex flex-col items-center bg-slate-50 relative">
                  <button type="button" onClick={() => setDrawerOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-white p-2 rounded-lg border shadow-sm cursor-pointer"><X className="h-5 w-5" /></button>
                  <label className="h-28 w-28 rounded-full bg-slate-200 mb-4 border-4 border-[#0F172A] flex items-center justify-center overflow-hidden cursor-pointer group relative shadow-inner">
                    {user.dp ? <img src={user.dp} className="h-full w-full object-cover" alt="" /> : <User className="h-12 w-12 text-slate-400" />}
                    <div className="absolute inset-0 bg-black/60 hidden group-hover:flex items-center justify-center"><Camera className="h-8 w-8 text-white" /></div>
                    <input type="file" className="hidden" onChange={handleProfilePicUpload} accept="image/*" />
                  </label>
                  <h3 className="font-black text-2xl text-slate-900">{user.firstName || 'Partner'}</h3>
                  <span className="text-xs font-black bg-[#EA580C] text-white px-4 py-1.5 rounded-full uppercase mt-2.5 shadow-md tracking-widest">{selectedRole}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
                  {[
                    { i: Layers, l: 'My Dashboard', v: 'dashboard' },
                    { i: History, l: 'Order History', v: 'history' },
                    { i: QrCode, l: 'Security QR', v: 'safe_qr', s: 'Free' },
                    { i: Crown, l: 'Subscriptions', v: 'premium' },
                    { i: Activity, l: 'Services Hub', v: 'services' },
                    { i: Info, l: 'About Us', v: 'about' },
                    { i: HelpCircle, l: 'Help Center', v: 'contact' },
                    { i: Settings, l: 'Settings', v: 'settings' },
                  ].map((item: any) => (
                    <button type="button" key={item.l} onClick={() => { setDrawerOpen(false); handlePageChange(item.v as View); }} className="w-full flex items-center p-4 text-sm font-black text-slate-700 hover:bg-orange-50 rounded-xl transition-colors group border border-transparent hover:border-orange-100 cursor-pointer">
                      <item.i className={`h-5 w-5 mr-4 ${item.v === 'dashboard' ? 'text-[#0F172A]' : 'text-slate-400 group-hover:text-[#EA580C]'}`} />
                      {item.l}
                      {item.s && <span className="ml-auto bg-emerald-100 text-emerald-600 text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider">{item.s}</span>}
                    </button>
                  ))}
                </div>
                <div className="p-8 border-t border-slate-100 bg-slate-50">
                  <button type="button" onClick={handleLogout} className="w-full bg-red-50 text-red-600 p-4 rounded-xl text-sm font-black hover:bg-red-100 transition-colors flex justify-center items-center border border-red-100 shadow-sm cursor-pointer"><LogOut className="h-5 w-5 mr-3" /> Sign Out</button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-6">
                <button type="button" onClick={() => setDrawerOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-white p-2 rounded-lg border shadow-sm cursor-pointer"><X className="h-5 w-5" /></button>
                <Lock className="h-20 w-20 text-slate-300" />
                <h3 className="text-3xl font-black text-slate-900">Please Login</h3>
                <p className="text-base text-slate-500 font-medium">Access features by joining the network.</p>
                <button type="button" onClick={() => { setDrawerOpen(false); setAuthModal({ open: true, mode: 'login', step: 'role' }); }} className="bg-[#EA580C] text-white px-10 py-4 rounded-xl font-black text-lg w-full mt-4 shadow-xl hover:bg-orange-700 transition-colors cursor-pointer">Login Now</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- AUTH MODAL --- */}
      {authModal.open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0F172A]/90 backdrop-blur-md animate-fade-in pointer-events-auto">
          <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex overflow-hidden h-[550px] border border-slate-200 relative">
            <div className="hidden md:flex w-1/2 relative bg-[#0F172A] flex-col justify-end p-12">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7b66bfc?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h2 className="text-white text-4xl font-black mb-4 leading-tight">Powering the Future of Logistics.</h2>
                <p className="text-slate-300 text-base font-medium">Seamlessly connect and manage your operations on Y2Wait.</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 sm:p-12 relative flex flex-col justify-center bg-white pointer-events-auto">
              <button type="button" onClick={() => setAuthModal({ open: false, mode: null, step: 'role' })} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 bg-slate-50 p-2 rounded-xl border z-50 cursor-pointer"><X className="h-5 w-5" /></button>

              {/* STEP 1: SELECT ROLE */}
              {authModal.step === 'role' && (
                <div className="space-y-8 animate-fade-in text-center relative z-20">
                  <h3 className="text-3xl font-black text-slate-900">{authModal.mode === 'login' ? 'Login to Account' : 'Create an Account'}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { role: 'driver', label: 'Driver' },
                      { role: 'transporter', label: 'Transporter' },
                      { role: 'trader', label: 'Trader' },
                      { role: 'corporate', label: 'Corporate' }
                    ].map((r: any) => (
                      <button type="button" key={r.role} onClick={() => {
                        setSelectedRole(r.role as Role);
                        setAuthModal({ ...authModal, step: authModal.mode === 'register' ? 'details' : 'mobile' });
                      }} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#EA580C] hover:shadow-md transition-all font-black text-slate-700 text-sm shadow-sm hover:text-[#EA580C] cursor-pointer">
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 (CREATE ACCOUNT): ENTER DETAILS */}
              {authModal.step === 'details' && (
                <div className="space-y-5 animate-fade-in overflow-y-auto max-h-full pb-4 pr-2 relative z-20">
                  <h3 className="text-2xl font-black text-slate-900 text-center border-b border-slate-100 pb-4 mb-6">Enter Your Details</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center mb-4">Role: <span className="text-[#EA580C]">{selectedRole}</span></p>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" value={user.firstName} onChange={(e: any) => setUser({ ...user, firstName: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />
                    <input type="text" placeholder="Last Name" value={user.lastName} onChange={(e: any) => setUser({ ...user, lastName: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />
                  </div>

                  <input type="tel" maxLength={10} placeholder="10-Digit Mobile Number" value={user.mobile} onChange={(e: any) => setUser({ ...user, mobile: e.target.value.replace(/\D/g, '') })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />

                  {(selectedRole === 'trader' || selectedRole === 'corporate' || selectedRole === 'transporter') && (
                    <input type="text" placeholder="Business / Company Name" value={user.businessName} onChange={(e: any) => setUser({ ...user, businessName: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />
                  )}
                  {selectedRole === 'driver' && (
                    <input type="text" placeholder="Driving License Number" value={user.dl} onChange={(e: any) => setUser({ ...user, dl: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />
                  )}

                  <input type="password" placeholder="Set a Secure Password" value={user.password} onChange={(e: any) => setUser({ ...user, password: e.target.value })} className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner mt-4" />

                  <button type="button" onClick={async () => {
                    if (!user.firstName || user.mobile.length !== 10 || !user.password) return alert("Please fill all required fields correctly.");
                    try {
                      const response = await fetch("https://y2wait-backend.onrender.com/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          mobileNum: `${user.mobile}`,
                          password: user.password,
                          role: selectedRole,
                          businessName: user.businessName,
                          dl: user.dl
                        })
                      });
                      if (response.ok) {
                        alert("Account Created Successfully! You can now login.");
                        setAuthModal({ open: false, mode: null, step: 'role' });
                        setUser({ firstName: '', lastName: '', mobile: '', email: '', password: '', confirmPassword: '', businessName: '', gst: '', dl: '', dp: '' });
                        handlePageChange('landing');
                      } else {
                        const data = await response.json();
                        const errorMessage = data.message || data.error || "This account already exists! Please log in.";
                        alert("Registration Failed: " + errorMessage);
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Could not connect to backend.");
                    }
                  }} className="w-full bg-[#EA580C] text-white font-black py-4 rounded-xl shadow-lg mt-6 hover:bg-orange-700 transition-colors text-base cursor-pointer">Create Account</button>
                </div>
              )}

              {/* STEP 2 (LOGIN): ENTER MOBILE */}
              {authModal.step === 'mobile' && (
                <div className="space-y-8 animate-fade-in text-center relative z-20">
                  <div className="flex justify-center mb-6"><div className="bg-orange-50 p-5 rounded-full border border-orange-100 shadow-inner"><Lock className="h-10 w-10 text-[#EA580C]" /></div></div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Login</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest border border-slate-200 w-fit mx-auto px-4 py-1.5 rounded-full shadow-sm">Role: <span className="text-[#EA580C]">{selectedRole}</span></p>

                  <input type="tel" maxLength={10} value={user.mobile} onChange={(e: any) => setUser({ ...user, mobile: e.target.value.replace(/\D/g, '') })} placeholder="10-Digit Mobile Number" className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-black outline-none focus:border-[#EA580C] shadow-inner" />
                  <div className="flex flex-col gap-4 pt-2">
                    <button type="button" onClick={() => setAuthModal({ ...authModal, step: 'password' })} disabled={user.mobile.length !== 10} className="w-full bg-[#0F172A] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg hover:bg-slate-800 text-lg cursor-pointer">Continue</button>
                  </div>
                </div>
              )}

              {/* STEP 2.5 (LOGIN): ENTER PASSWORD */}
              {authModal.step === 'password' && (
                <div className="space-y-6 animate-fade-in text-center relative z-20">
                  <div className="flex justify-center mb-4"><div className="bg-slate-50 p-4 rounded-full border border-slate-200 shadow-inner"><Lock className="h-8 w-8 text-[#0F172A]" /></div></div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Enter Password</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest border border-slate-200 w-fit mx-auto px-4 py-1.5 rounded-full shadow-sm mb-6">Mobile: <span className="text-[#EA580C]">{user.mobile}</span></p>

                  <input type="password" value={user.password} onChange={(e: any) => setUser({ ...user, password: e.target.value })} placeholder="Secure Password" className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-black outline-none focus:border-[#EA580C] shadow-inner" />

                  <div className="flex justify-end mt-1 mb-2 pr-2">
                    <button
                      type="button"
                      onClick={() => setAuthModal({ ...authModal, step: 'forgot_phone' })}
                      className="text-sm font-bold text-[#EA580C] hover:text-orange-700 hover:underline transition-all cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 pt-2">
                    <button type="button" onClick={async () => {
                      try {
                        const response = await fetch("https://y2wait-backend.onrender.com/api/auth/send-otp", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ mobileNum: `${user.mobile}`, password: user.password, role: selectedRole })
                        });
                        if (response.ok) {
                          setAuthModal({ ...authModal, step: 'otp' });
                        } else {
                          const data = await response.json();
                          alert("Error: " + (data.error || data.message || JSON.stringify(data)));
                        }
                      } catch (error) {
                        console.error(error);
                        alert("Could not connect to backend.");
                      }
                    }} disabled={!user.password} className="w-full bg-[#EA580C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg hover:bg-orange-700 text-lg cursor-pointer">Verify & Send OTP</button>
                  </div>
                </div>
              )}

              {/* FORGOT PASSWORD - STEP 1 */}
              {authModal.step === 'forgot_phone' && (
                <div className="space-y-6 animate-fade-in text-center relative z-20">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Reset Password</h3>
                  <p className="text-sm text-slate-500 font-bold mb-6">Enter your registered mobile number to receive an OTP.</p>

                  <input type="tel" maxLength={10} value={user.mobile} onChange={(e: any) => setUser({ ...user, mobile: e.target.value.replace(/\D/g, '') })} placeholder="10-Digit Mobile Number" className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-black outline-none focus:border-[#EA580C] shadow-inner" />

                  <button type="button" onClick={async () => {
                    if (user.mobile.length !== 10) return alert("Please enter a valid 10-digit number.");
                    try {
                      const response = await fetch("https://y2wait-backend.onrender.com/api/auth/forgot-password-otp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ mobileNum: user.mobile, role: selectedRole })
                      });
                      if (response.ok) {
                        setAuthModal({ ...authModal, step: 'forgot_otp' });
                      } else {
                        const data = await response.json();
                        alert("Error: " + (data.error || data.message));
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Could not connect to backend.");
                    }
                  }} disabled={user.mobile.length !== 10} className="w-full bg-[#0F172A] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg hover:bg-slate-800 text-lg mt-4 cursor-pointer">Send Reset OTP</button>

                  <button type="button" onClick={() => setAuthModal({ ...authModal, step: 'password' })} className="w-full text-sm font-bold text-slate-500 hover:text-slate-900 mt-2 cursor-pointer">Back to Login</button>
                </div>
              )}

              {/* FORGOT PASSWORD - STEP 2 */}
              {authModal.step === 'forgot_otp' && (
                <div className="space-y-6 animate-fade-in text-center relative z-20">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Enter OTP</h3>
                  <p className="text-sm text-slate-500 font-bold mb-6">Enter the OTP sent to <span className="text-[#EA580C]">{user.mobile}</span></p>

                  <input
                    type="text"
                    maxLength={6}
                    value={user.otp}
                    onChange={(e: any) => setUser({ ...user, otp: e.target.value.replace(/\D/g, '') })}
                    placeholder="Enter 6-Digit OTP"
                    className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-bold tracking-normal outline-none focus:border-[#EA580C] focus:tracking-[0.3em] transition-all shadow-inner"
                  />

                  <button type="button" onClick={async () => {
                    if (!user.otp || user.otp.length < 4) return alert("Please enter the complete OTP.");
                    setAuthModal({ ...authModal, step: 'forgot_new_password' });
                  }} disabled={!user.otp} className="w-full bg-[#0F172A] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg hover:bg-slate-800 text-lg mt-4 cursor-pointer">Verify OTP</button>
                </div>
              )}

              {/* FORGOT PASSWORD - STEP 3 */}
              {authModal.step === 'forgot_new_password' && (
                <div className="space-y-6 animate-fade-in text-center relative z-20">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create New Password</h3>

                  <input type="password" value={user.password} onChange={(e: any) => setUser({ ...user, password: e.target.value })} placeholder="New Password" className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-bold outline-none focus:border-[#EA580C] shadow-inner" />

                  <input type="password" value={user.confirmPassword} onChange={(e: any) => setUser({ ...user, confirmPassword: e.target.value })} placeholder="Confirm New Password" className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-xl font-bold outline-none focus:border-[#EA580C] shadow-inner" />

                  <button type="button" onClick={async () => {
                    if (user.password !== user.confirmPassword) return alert("Passwords do not match!");
                    if (user.password.length < 6) return alert("Password must be at least 6 characters.");

                    try {
                      const response = await fetch("https://y2wait-backend.onrender.com/api/auth/reset-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          mobileNum: user.mobile,
                          otp: user.otp,
                          newPassword: user.password,
                          role: selectedRole
                        })
                      });
                      if (response.ok) {
                        alert("Password reset successfully! Please login with your new password.");
                        setUser({ ...user, password: '', confirmPassword: '', otp: '' });
                        setAuthModal({ ...authModal, step: 'password' });
                      } else {
                        const data = await response.json();
                        alert("Error: " + (data.error || data.message));
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Could not connect to backend.");
                    }
                  }} disabled={!user.password || !user.confirmPassword} className="w-full bg-[#EA580C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl transition-colors shadow-lg hover:bg-orange-700 text-lg mt-4 cursor-pointer">Update Password</button>
                </div>
              )}

              {/* STEP 3 (LOGIN): VERIFY OTP */}
              {authModal.step === 'otp' && (
                <div className="space-y-6 animate-fade-in text-center relative z-20">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Enter OTP</h3>
                  <p className="text-xs text-slate-500 font-bold bg-slate-50 py-3 rounded-xl border border-slate-100 tracking-widest mb-6">OTP sent to {user.mobile}</p>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpVal}
                    onChange={(e: any) => setOtpVal(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter OTP"
                    className="w-full border-2 border-slate-200 rounded-xl p-4 text-center text-2xl font-bold tracking-normal outline-none focus:border-[#EA580C] focus:tracking-[0.3em] transition-all shadow-inner mt-4"
                  />
                  <button type="button" onClick={async () => {
                    if (otpVal.length !== 4) return;
                    try {
                      const response = await fetch("https://y2wait-backend.onrender.com/api/auth/verify-otp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          mobileNum: user.mobile,
                          otp: otpVal
                        })
                      });
                      if (response.ok) {
                        executeLogin();
                      } else {
                        alert("Invalid OTP! Please try again.");
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Could not connect to backend.");
                    }
                  }} disabled={otpVal.length !== 4} className="w-full bg-[#EA580C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg mt-6 transition-colors text-base cursor-pointer">Verify & Login</button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- DEMO OVERLAY --- */}
      {showDemo && (
        <div className="fixed inset-0 z-[400] bg-[#0F172A]/95 flex flex-col items-center justify-center p-6 backdrop-blur-md pointer-events-auto">
          <button type="button" onClick={() => setShowDemo(false)} className="absolute top-8 right-8 text-white hover:text-[#EA580C] z-50 cursor-pointer"><X className="h-10 w-10" /></button>
          <Bot className="h-32 w-32 text-[#EA580C] mb-8 animate-bounce drop-shadow-[0_0_20px_rgba(234,88,12,0.6)]" />
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-2xl md:text-5xl font-mono text-white font-black border-r-4 border-[#EA580C] pr-3 animate-pulse">{demoText}</h2>
          </div>
          <div className="mt-16 max-w-2xl text-center space-y-8">
            <p className="text-slate-300 text-xl font-medium leading-relaxed">This AI engine matches drivers and loads in real-time, eliminating empty returns and reducing carbon footprints based on your identity profile.</p>
            <button type="button" onClick={() => setShowDemo(false)} className="bg-[#EA580C] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:bg-orange-700 transition-colors cursor-pointer">End Demo Simulation</button>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full relative z-10">

        {/* LANDING VIEW */}
        {activeView === 'landing' && (
          <>
            {/* ======================================================== */}
            {/* HERO SECTION (INSPIRED BY CARRYON LOGISTICS THEME) */}
            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* HERO SECTION (360° Y2WAIT TRUCK & VAHAK-INSPIRED LAYOUT) */}
            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* HERO SECTION (CARRYON LOGISTICS THEME FORMAT) */}
            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* HERO SECTION (CARRYON LOGISTICS THEME FORMAT WITH Y2WAIT OVAL LOGO BADGE) */}
            {/* ======================================================== */}
            <section className={`relative w-full transition-colors duration-500 pt-12 pb-36 overflow-hidden border-b-8 border-[#EA580C] ${siteTheme === 'dark' ? 'hero-carryon-container-dark text-white' : 'hero-carryon-container-light text-slate-900'}`}>
              
              {/* Theme Mode Switcher Floating Button */}
              <div className="absolute top-6 right-8 z-30">
                <button
                  type="button"
                  onClick={() => setSiteTheme(siteTheme === 'dark' ? 'light' : 'dark')}
                  className="bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 px-5 py-2.5 rounded-full text-xs font-black flex items-center space-x-2 shadow-xl hover:border-[#EA580C] transition-all cursor-pointer"
                >
                  {siteTheme === 'dark' ? (
                    <><span>☀️</span> <span>Light Theme</span></>
                  ) : (
                    <><span>🌙</span> <span>Dark Theme</span></>
                  )}
                </button>
              </div>

              <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-20 space-y-12 text-center">
                
                {/* Centered Headline Header Block */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/15 px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase text-[#EA580C] shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping mr-1"></span>
                    <span>{t("INDIA'S #1 3D FREIGHT MATCHMAKING GRID", "भारत का नंबर 1 3D फ्रेट ग्रिड")}</span>
                  </div>

                  <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] tracking-tight font-heading drop-shadow-2xl">
                    {t("Empowering", "सशक्त बनाना")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#EA580C] to-red-500">
                      {t("Transporters.", "ट्रांसपोर्टर्स।")}
                    </span>{" "}
                    <span className={siteTheme === 'dark' ? 'text-white' : 'text-slate-900'}>{t("Pure Profits.", "प्योर प्रॉफिट्स।")}</span>
                  </h1>

                  <p className={`text-lg sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed ${siteTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {t(
                      "Create instant direct matches for outstation Indian truck fleets, instant bus cargo delivery, reverse bidding & Safe Traffic QR.",
                      "सीधे जुड़ें। 3D ट्रक नेटवर्क, इंस्टेंट बस पार्सल डिलीवरी एवं सेफ ट्रैफिक QR।"
                    )}
                  </p>

                  <div className="flex flex-wrap justify-center gap-5 pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })}
                      className="bg-[#EA580C] text-white px-9 py-5 rounded-2xl font-black text-lg hover:bg-orange-700 transition-all shadow-[0_10px_30px_rgba(234,88,12,0.5)] flex items-center group cursor-pointer hover:scale-105 transform"
                    >
                      {t("Get Started Now", "शुरू करें")} <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDemo(true)}
                      className={`backdrop-blur-md border px-8 py-5 rounded-2xl font-black text-lg transition-all flex items-center cursor-pointer hover:scale-105 transform ${siteTheme === 'dark' ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'}`}
                    >
                      <PlayCircle className="h-6 w-6 mr-3 text-[#EA580C]" /> {t("Watch Live Demo", "डेमो देखें")}
                    </button>
                  </div>
                </div>

                {/* 3-Column Showcase: Left Y2WAIT Logo & Smart Logistics Card + Center 3D Tata Lorry + Right Fleet Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
                  
                  {/* Left Column: Floating Oval Badge (Official Y2Wait Logo) & Rounded Square Card */}
                  <div className="lg:col-span-3 text-left space-y-6">
                    
                    {/* Floating Oval Badge with Official Y2WAIT Logo */}
                    <div className="inline-flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border-2 border-[#EA580C] shadow-[0_10px_25px_rgba(234,88,12,0.3)]">
                      <div className="w-9 h-9 rounded-full bg-[#EA580C] flex items-center justify-center text-white shadow-md">
                        <Truck className="h-5 w-5" />
                      </div>
                      <span className="text-2xl font-black text-white tracking-tight font-heading">
                        Y2<span className="text-[#EA580C]">Wait</span>
                      </span>
                    </div>

                    {/* Cornered Square Card */}
                    <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-5 hover:border-[#EA580C]/60 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/20 border border-[#EA580C]/40 flex items-center justify-center text-[#EA580C]">
                        <Box className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">Smart Logistics Solutions</h3>
                        <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Manage your complex freight logistics effortlessly with 100% verified outstation trucks & direct matching.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })}
                        className="w-full bg-[#EA580C] hover:bg-orange-700 text-white font-black py-3 rounded-xl text-xs transition-colors cursor-pointer shadow-lg"
                      >
                        Find Freight Loads ➔
                      </button>
                    </div>
                  </div>

                  {/* Centerpiece: Photorealistic Tata Signa Y2WAIT Heavy Lorry 360° Stage */}
                  <div className="lg:col-span-6 relative flex flex-col justify-center items-center">
                    <PhotorealisticTataLorry360Stage theme={siteTheme} />
                  </div>

                  {/* Right Column: Fleet Management Card */}
                  <div className="lg:col-span-3 text-left bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 hover:border-teal-500/60 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Safe Traffic QR & Fleet</h3>
                      <p className="text-xs text-slate-400 font-bold mt-1 leading-relaxed">Police-verified GPS trip telemetry, digital waybills & instantaneous load matching across 28 States & UTs.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })}
                      className="w-full bg-slate-800 hover:bg-teal-600 text-white font-black py-3 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Post Available Fleet ➔
                    </button>
                  </div>

                </div>

                {/* Trust Badges Bar */}
                <div className={`pt-8 border-t flex flex-wrap justify-center items-center gap-10 text-xs font-bold ${siteTheme === 'dark' ? 'border-slate-800/80 text-slate-400' : 'border-slate-300 text-slate-600'}`}>
                  <span className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 mr-2" /> 100% KYC Verified Drivers
                  </span>
                  <span className="flex items-center">
                    <Award className="h-5 w-5 text-orange-400 mr-2" /> Direct Load Matching Guarantee
                  </span>
                  <span className="flex items-center">
                    <Radio className="h-5 w-5 text-teal-400 mr-2 animate-pulse" /> Live Telemetry Radar
                  </span>
                </div>

                {/* Vahak & Porter Inspired Quick Search & Post Bar */}
                <div className="pt-4">
                  <HeroQuickLoadSearchWidget
                    onSearch={(pickup, drop, vehicle) => {
                      setNewLoad({ ...newLoad, origin: pickup, destination: drop, material: vehicle });
                      setAuthModal({ open: true, mode: 'register', step: 'role' });
                    }}
                  />
                </div>

              </div>
            </section>

            {/* LIVE PLATFORM STATS COUNTER STRIP */}
            <section className="max-w-[1400px] mx-auto px-6 relative z-30 -mt-16 mb-28">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[80px] -z-10"></div>
                {[
                  { i: Truck, c: platformStats.trucks, l: 'Trucks Listed' },
                  { i: Package, c: platformStats.parcels, l: 'Parcels Shipped' },
                  { i: ShieldCheck, c: platformStats.verified, l: 'Verified Drivers' },
                  { i: MapPin, c: platformStats.cities, l: 'Cities Covered' }
                ].map((stat: any, i: number) => (
                  <div key={stat.l} className={`flex-1 ${i === 0 ? '' : 'md:pl-8'} ${i > 1 ? 'pt-6 md:pt-0' : ''}`}>
                    <div className={`text-4xl sm:text-5xl font-black ${i % 2 === 0 ? 'text-[#EA580C]' : 'text-[#0F172A]'} flex items-center justify-center mb-2`}><stat.i className="h-9 w-9 mr-3 shrink-0 text-[#EA580C]" /> {stat.c}+</div>
                    <div className="text-xs text-slate-500 font-black uppercase tracking-widest leading-tight">{stat.l}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 1: WE SPECIALISE IN TRANSPORTATION (TRANSPI SCREENSHOT 2) */}
            {/* ======================================================== */}
            <section className="max-w-[1600px] mx-auto px-6 sm:px-12 py-16 mb-28">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Side: Overlapping Oval / Arch Photo Frames */}
                <div className="lg:col-span-6 relative flex justify-center items-center">
                  <div className="relative w-full max-w-lg h-[460px] sm:h-[520px]">
                    
                    {/* Primary Oval Frame */}
                    <div className="absolute top-0 left-0 w-[55%] h-[85%] overflow-hidden mask-oval border-4 border-white shadow-2xl bg-slate-200 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                      <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7b66bfc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover scale-110" alt="Logistics Professional" />
                    </div>

                    {/* Secondary Arch Frame */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[82%] overflow-hidden mask-arch border-4 border-white shadow-2xl bg-slate-300 z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Fleet Vehicle" />
                    </div>

                    {/* Red Accent Decorative Circle Badge */}
                    <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-[#EA580C] text-white p-6 rounded-full shadow-2xl z-30 flex flex-col items-center justify-center border-4 border-white animate-bounce" style={{ animationDuration: '6s' }}>
                      <Award className="h-9 w-9 mb-1" />
                      <span className="text-[10px] font-black tracking-widest uppercase">Certified</span>
                    </div>

                  </div>
                </div>

                {/* Right Side: Specialized Capabilities Content */}
                <div className="lg:col-span-6 space-y-8 text-left">
                  <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full border border-orange-100 inline-block">
                    WE SPECIALISE IN THE TRANSPORTATION
                  </span>

                  <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] leading-tight tracking-tight">
                    Manage your Complex Logistics with Speed & Focus
                  </h2>

                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    Y2Wait is India's leading worldwide freight matchmaking platform. We uphold industry standards and simplify the trade of commercial merchandise, heavy freight, and inter-city express cargo across the nation.
                  </p>

                  {/* Bullet Matrix */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-4 text-sm font-bold text-slate-800">
                    {[
                      'Outstation Heavy Freight', 'Inter-city Bus Express',
                      'Automotive & Spare Parts', 'Cold Chain & Agricultural',
                      'Enterprise Corporate Bids', 'Fashion & Consumer Retail'
                    ].map((item: string) => (
                      <div key={item} className="flex items-center space-x-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shrink-0"></div>
                        <span className="text-slate-800 font-bold">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <button type="button" onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })} className="bg-[#EA580C] hover:bg-orange-700 text-white font-black px-10 py-4.5 rounded-2xl shadow-xl transition-all flex items-center cursor-pointer group hover:scale-105 transform">
                      Discover More <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 2: SPECIALIST LOGISTICS SERVICES (TRANSPI SCREENSHOT 3) */}
            {/* ======================================================== */}
            <section className="bg-slate-100/80 py-28 px-6 border-y border-slate-200">
              <div className="max-w-[1600px] mx-auto space-y-16 text-left">
                
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm inline-block">
                    SHIPPING SERVICES
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
                    Specialist Y2Wait Logistics Solutions
                  </h2>
                  <p className="text-slate-500 font-medium text-lg">
                    Tailored freight and transport solutions designed to streamline supply chains for every stakeholder.
                  </p>
                </div>

                {/* 3 Asymmetric Service Cards */}
                <div className="grid md:grid-cols-3 gap-10">
                  {[
                    {
                      title: 'Express Bus Transportation',
                      desc: 'Ship small to medium parcels between cities using our reliable inter-city Volvo bus network with guaranteed same-day dispatch.',
                      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
                      icon: Bus,
                      tag: 'EXPRESS CARGO'
                    },
                    {
                      title: 'Road Outstation Freight',
                      desc: 'Zero-commission direct matchmaking for outstation trucks. Find high-value return loads and maximize revenue.',
                      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
                      icon: Truck,
                      tag: 'HEAVY TRUCKS'
                    },
                    {
                      title: 'Bulk Enterprise Auctions',
                      desc: 'Transparent reverse bidding platform for corporate freight demands, ensuring lowest L1 cost and verified vehicle dispatch.',
                      img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
                      icon: Building,
                      tag: 'CORPORATE'
                    }
                  ].map((service: any) => (
                    <div key={service.title} className="bg-white rounded-[2.5rem] card-cut-corner border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between hover:-translate-y-2">
                      <div>
                        {/* Image Header with Asymmetric Crop */}
                        <div className="h-64 relative overflow-hidden">
                          <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={service.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
                          <span className="absolute top-6 left-6 bg-[#0F172A]/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                            {service.tag}
                          </span>

                          {/* Floating Orange Icon Circle */}
                          <div className="absolute -bottom-7 right-8 bg-[#EA580C] text-white p-4 rounded-full shadow-2xl border-4 border-white group-hover:scale-110 transition-transform">
                            <service.icon className="h-7 w-7" />
                          </div>
                        </div>

                        <div className="p-8 pt-10 space-y-4">
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#EA580C] transition-colors">{service.title}</h3>
                          <p className="text-slate-600 text-sm font-medium leading-relaxed">{service.desc}</p>
                        </div>
                      </div>

                      <div className="p-8 pt-0">
                        <button type="button" onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })} className="text-xs font-black text-slate-900 group-hover:text-[#EA580C] uppercase tracking-widest flex items-center pt-4 border-t border-slate-100 w-full cursor-pointer">
                          READ MORE <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 3: Y2WAIT PAN-INDIA FREIGHT CORRIDOR */}
            {/* ======================================================== */}
            <section ref={deliverySectionRef} className="py-32 bg-[#0B1120] text-white relative overflow-hidden border-b border-slate-800">
              
              {/* Background ambient lighting glows */}
              <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#EA580C]/15 rounded-full blur-[180px] pointer-events-none"></div>
              <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#06B6D4]/15 rounded-full blur-[180px] pointer-events-none"></div>

              <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-20 text-center space-y-16">
                
                <div className="max-w-4xl mx-auto space-y-4">
                  <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 inline-block shadow-lg">
                    ALL-INDIA FREIGHT MATCHMAKING NETWORK
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-heading">
                    Connecting Freight Seamlessly <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#EA580C] to-teal-400">Across All of India</span>
                  </h2>
                  <p className="text-slate-300 font-medium text-lg max-w-3xl mx-auto leading-relaxed">
                    Nationwide zero-commission logistics matching connecting 28 States & 185+ cities from Origin to Destination.
                  </p>
                </div>

                {/* PAN-INDIA HIGHWAY STAGE CONTAINER */}
                <div className="relative w-full py-12 px-6 sm:px-12 bg-slate-900/90 rounded-[3rem] border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">
                  
                  {/* Subtle Pan-India Background Grid Telemetry */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:24px_24px]"></div>

                  {/* Top Header inside Stage */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-6 border-b border-slate-800/80 relative z-20">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#EA580C]">PAN-INDIA HIGHWAY CORRIDOR</span>
                        <h3 className="text-xl font-black text-white">28 States & UTs Connected in Real-Time</h3>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                      <Radio className="h-4 w-4 text-[#EA580C] animate-pulse" />
                      <span>National Highway Progress: <strong className="text-white">{Math.round(scrollProgress * 100)}%</strong></span>
                    </div>
                  </div>

                  {/* 3D WINDING HIGHWAY ROAD TRACK WITH CLEAN RADAR PULSE PINS */}
                  <div ref={roadTrackRef} className="relative w-full mb-12 py-10 bg-[#0B1120] rounded-[2.5rem] border border-slate-800 shadow-inner overflow-visible px-4 sm:px-12">
                    
                    {/* Highway Asphalt Texture */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-36 bg-[#161F33] border-y-4 border-amber-400/40 pointer-events-none rounded-2xl">
                      <div className="w-full h-full opacity-25 bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>

                    {/* SVG Winding Road Path with Integrated Logistics Nodes */}
                    <svg className="w-full h-64 relative z-10 overflow-visible" viewBox="0 0 1000 220" fill="none">
                      {/* Outer glow road */}
                      <path d="M 80 100 C 240 15, 400 185, 600 100 C 760 15, 840 175, 920 100" stroke="#EA580C" strokeWidth="16" strokeOpacity="0.2" strokeLinecap="round" />
                      {/* Asphalt main road */}
                      <path d="M 80 100 C 240 15, 400 185, 600 100 C 760 15, 840 175, 920 100" stroke="#1F293D" strokeWidth="10" strokeLinecap="round" />
                      {/* Animated Dashed Lane Marker */}
                      <path d="M 80 100 C 240 15, 400 185, 600 100 C 760 15, 840 175, 920 100" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="10 10" className="road-dash-line" />

                      {/* LOGISTICS NODE 01: CARGO DEMAND */}
                      <g transform="translate(80, 100)">
                        <circle r="22" fill="#EA580C" fillOpacity="0.25" className="animate-ping" />
                        <circle r="14" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2.5" />
                        <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">01</text>
                        {/* Node Badge Label */}
                        <rect x="-50" y="-38" width="100" height="22" fill="#0F172A" rx="6" stroke="#EA580C" strokeWidth="1.5" />
                        <text x="0" y="-24" fill="#EA580C" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">CARGO DEMAND</text>
                      </g>

                      {/* LOGISTICS NODE 02: DIRECT FLEET MATCH */}
                      <g transform="translate(360, 140)">
                        <circle r="22" fill="#06B6D4" fillOpacity="0.25" className="animate-ping" />
                        <circle r="14" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2.5" />
                        <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">02</text>
                        {/* Node Badge Label */}
                        <rect x="-55" y="24" width="110" height="22" fill="#0F172A" rx="6" stroke="#06B6D4" strokeWidth="1.5" />
                        <text x="0" y="38" fill="#06B6D4" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DIRECT FLEET MATCH</text>
                      </g>

                      {/* LOGISTICS NODE 03: SAFE QR TRANSIT */}
                      <g transform="translate(630, 95)">
                        <circle r="22" fill="#F59E0B" fillOpacity="0.25" className="animate-ping" />
                        <circle r="14" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
                        <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">03</text>
                        {/* Node Badge Label */}
                        <rect x="-55" y="-38" width="110" height="22" fill="#0F172A" rx="6" stroke="#F59E0B" strokeWidth="1.5" />
                        <text x="0" y="-24" fill="#F59E0B" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SAFE QR TRANSIT</text>
                      </g>

                      {/* LOGISTICS NODE 04: INSTANT PAYOUT */}
                      <g transform="translate(920, 100)">
                        <circle r="22" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
                        <circle r="14" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                        <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">04</text>
                        {/* Node Badge Label */}
                        <rect x="-55" y="24" width="110" height="22" fill="#0F172A" rx="6" stroke="#10B981" strokeWidth="1.5" />
                        <text x="0" y="38" fill="#10B981" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">INSTANT PAYOUT</text>
                      </g>

                      {/* DYNAMIC SCROLL MOVING Y2WAIT TRUCK GRAPHIC (EXACT SVG ROAD ALIGNMENT) */}
                      <g
                        transform={`translate(${truckPos.x}, ${truckPos.y}) rotate(${truckPos.angle})`}
                        className="transition-transform duration-100 ease-out z-30"
                      >
                        {/* Headlight Beam */}
                        <polygon points="25,-10 95,-35 95,35 25,10" fill="url(#headlight-gradient-integrated)" opacity="0.85" />

                        {/* Truck Shadow */}
                        <rect x="-35" y="-18" width="60" height="36" fill="#000000" opacity="0.5" rx="6" />

                        {/* Truck Trailer Body with Y2WAIT Branding */}
                        <rect x="-35" y="-16" width="42" height="32" fill="#EA580C" rx="4" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x="-28" y="4" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">Y2WAIT</text>

                        {/* Truck Cabin */}
                        <rect x="7" y="-14" width="18" height="28" fill="#0F172A" rx="4" stroke="#FFFFFF" strokeWidth="1.5" />
                        <rect x="14" y="-11" width="8" height="22" fill="#38BDF8" opacity="0.8" rx="2" />

                        {/* Wheels */}
                        <circle cx="-24" cy="-16" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                        <circle cx="-24" cy="16" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                        <circle cx="-8" cy="-16" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                        <circle cx="-8" cy="16" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                        <circle cx="16" cy="-14" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                        <circle cx="16" cy="14" r="4" fill="#000000" stroke="#94A3B8" strokeWidth="1.5" />
                      </g>

                      <defs>
                        <linearGradient id="headlight-gradient-integrated" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* 4 PAN-INDIA LOGISTICS MILESTONE CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-left">
                    {[
                      {
                        num: '01',
                        stage: 'OWNER / TRADER',
                        region: 'Origin Hub',
                        title: 'Cargo Owner Posts Load',
                        desc: 'Trader posts commodity weight, origin, destination & target fare anywhere in India with zero broker fee.',
                        icon: User,
                        tag: 'PAN-INDIA DEMAND',
                        color: 'border-orange-500 bg-orange-500/10 text-orange-400',
                        badgeColor: 'bg-[#EA580C]',
                        active: scrollProgress >= 0.05
                      },
                      {
                        num: '02',
                        stage: 'TRANSPORTER',
                        region: 'Verified Fleet',
                        title: 'Transporter Accepts Load',
                        desc: 'Verified outstation truck driver receives instant 100% direct match on Y2Wait Live Radar.',
                        icon: Truck,
                        tag: 'DIRECT MATCH',
                        color: 'border-teal-500 bg-teal-500/10 text-teal-400',
                        badgeColor: 'bg-teal-600',
                        active: scrollProgress >= 0.3
                      },
                      {
                        num: '03',
                        stage: 'LOAD IN-TRANSIT',
                        region: 'Highway Grid',
                        title: 'Highway Safe QR Transit',
                        desc: 'Interstate trip protected with real-time GPS telemetry, police Safe QR & AI hazard alerts across India.',
                        icon: Radio,
                        tag: 'GPS TELEMETRY',
                        color: 'border-amber-500 bg-amber-500/10 text-amber-400',
                        badgeColor: 'bg-amber-600',
                        active: scrollProgress >= 0.6
                      },
                      {
                        num: '04',
                        stage: 'DESTINATION',
                        region: 'Destination Unload',
                        title: 'Destination Unload & Pay',
                        desc: 'Instant digital proof of delivery (POD) verified and direct escrow payout released to driver.',
                        icon: Award,
                        tag: 'INSTANT PAYOUT',
                        color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
                        badgeColor: 'bg-emerald-600',
                        active: scrollProgress >= 0.85
                      }
                    ].map((step: any) => (
                      <div
                        key={step.num}
                        className={`p-8 rounded-[2rem] transition-all duration-500 border flex flex-col justify-between group hover:-translate-y-2 ${
                          step.active
                            ? 'bg-slate-900 border-[#EA580C] shadow-[0_15px_40px_rgba(234,88,12,0.3)] scale-[1.02]'
                            : 'bg-slate-900/60 border-slate-800 opacity-90'
                        }`}
                      >
                        <div>
                          {/* Card Header */}
                          <div className="flex items-center justify-between mb-6">
                            <span className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-base shadow-lg ${step.badgeColor} text-white`}>
                              {step.num}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${step.color}`}>
                              {step.tag}
                            </span>
                          </div>

                          {/* Role & Region Badge */}
                          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                            <span className="flex items-center"><step.icon className="h-4 w-4 mr-1.5 text-[#EA580C]" /> {step.stage}</span>
                            <span className="text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded">{step.region}</span>
                          </div>

                          {/* Title & Description */}
                          <h4 className="font-black text-2xl text-white mb-3 tracking-tight group-hover:text-[#EA580C] transition-colors mt-2">
                            {step.title}
                          </h4>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            {step.desc}
                          </p>
                        </div>

                        {/* Card Footer Status indicator */}
                        <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                          <span className={step.active ? 'text-emerald-400 flex items-center' : 'text-slate-500'}>
                            {step.active ? <CheckCircle2 className="h-4 w-4 mr-1.5 inline animate-pulse" /> : <Clock className="h-4 w-4 mr-1.5 inline" />}
                            {step.active ? 'Grid Connected' : 'Awaiting Progress'}
                          </span>
                          <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-[#EA580C] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM PIPELINE CALLOUT BAR */}
                  <div className="mt-12 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center text-left gap-6 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#EA580C] p-3 rounded-xl text-white shadow-lg shrink-0">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-white font-black text-lg">Are you a Cargo Owner or Fleet Transporter in India?</div>
                        <div className="text-xs text-slate-400 font-medium">Join 3,200+ verified partners trading zero-commission loads across 28 Indian States right now.</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })} className="bg-[#EA580C] hover:bg-orange-700 text-white font-black px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm shrink-0 cursor-pointer">
                      Join Pan-India Network ➔
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 4: OUR INDUSTRY-EXPLICIT COMPETENCE (TRANSPI SCREENSHOT 5) */}
            {/* ======================================================== */}
            <section className="max-w-[1600px] mx-auto px-6 sm:px-12 py-28">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Side: Arch Masked Image of Warehouse Professional */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-md h-[520px] overflow-hidden mask-arch border-4 border-slate-100 shadow-2xl bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Logistics Competence" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-white text-left">
                      <div className="text-xs font-black uppercase tracking-widest text-[#EA580C] mb-1">Empowering Fleet Grid</div>
                      <div className="text-2xl font-black">99.9% On-Time Transit Matching</div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Reddish-Orange Competence Card Container */}
                <div className="lg:col-span-7 text-left space-y-8">
                  <div className="space-y-3">
                    <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full border border-orange-100 inline-block">
                      OUR COMPETENCE
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
                      Our Fleet-Explicit Competence
                    </h2>
                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                      We offer a unified freight ecosystem with proprietary AI matching, highway police QR clearance, zero-commission loads, and instant reverse bidding.
                    </p>
                  </div>

                  {/* Reddish-Orange Container with 2-Column Checkmark Matrix */}
                  <div className="bg-[#EA580C] text-white p-8 sm:p-12 rounded-[2.5rem] card-asymmetric-lg shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 text-sm font-bold">
                      {[
                        'Direct Matchmaking (No Brokers)',
                        'Zero Commission Loads',
                        'Instant Safe Traffic QR Clearance',
                        'AI Highway Accident Hazard Alert',
                        'Real-time GPS Command Radar',
                        'Inter-city Volvo Bus Cargo',
                        'Corporate Reverse Bidding L1',
                        'Fleet Mandi Discount Hub'
                      ].map((item: string) => (
                        <div key={item} className="flex items-center space-x-3">
                          <div className="h-6 w-6 rounded-full bg-white text-[#EA580C] flex items-center justify-center shrink-0 shadow-md">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </div>
                          <span className="text-white font-black text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ======================================================== */}
            {/* IDENTITY SELECTION CARDS */}
            {/* ======================================================== */}
            <section className="max-w-[1600px] mx-auto px-6 sm:px-12 text-center space-y-16 mb-32">
              <div className="max-w-3xl mx-auto space-y-4">
                <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-orange-50 px-5 py-2 rounded-full border border-orange-100 inline-block">
                  GET STARTED
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A]">{t("Select Your Identity", "अपनी पहचान चुनें")}</h2>
                <p className="text-slate-500 font-medium text-lg">Choose your role to access customized logistics tools.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { role: 'driver', icon: <Truck />, title: 'Driver / Fleet', desc: 'List empty trucks' },
                  { role: 'transporter', icon: <User />, title: 'Transporter', desc: 'Manage trader loads' },
                  { role: 'trader', icon: <Package />, title: 'Local Trader', desc: 'Ship individual parcels' },
                  { role: 'corporate', icon: <Building />, title: 'Corporate', desc: 'Bulk advanced bidding' }
                ].map((item: any) => (
                  <button type="button" key={item.role} onClick={() => { setSelectedRole(item.role as Role); setAuthModal({ open: true, mode: 'register', step: 'details' }); }}
                    className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-lg hover:shadow-2xl hover:border-[#EA580C] transition-all flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2">
                    <div className="h-24 w-24 bg-slate-50 text-slate-500 rounded-[1.5rem] flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-[#EA580C] group-hover:text-white transition-colors shadow-inner [&>svg]:h-12 [&>svg]:w-12">{item.icon}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-base text-slate-500 font-medium">{item.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* ======================================================== */}
            {/* USER TESTIMONIALS */}
            {/* ======================================================== */}
            <section className="py-32 bg-[#0F172A] text-white">
              <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
                <div className="text-center mb-20 space-y-4">
                  <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 inline-block">
                    TESTIMONIALS
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">What Our Users Say</h2>
                  <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">Real experiences from our growing network of partners across India.</p>
                </div>

                <div className="flex overflow-x-auto space-x-8 pb-10 no-scrollbar snap-x cursor-grab">
                  {[
                    { name: "Rajesh K.", role: "Fleet Owner", quote: "Y2Wait's radar completely eliminated my empty return trips. My monthly revenue jumped by 40%. The UI is incredibly easy to use." },
                    { name: "Suresh Singh", role: "Independent Driver", quote: "The safe QR code feature saved me from endless highway checks. It's the most secure way to haul freight in India right now." },
                    { name: "Amit Patel", role: "Corporate Manager", quote: "Enterprise reverse bidding helped my manufacturing plant reduce logistics costs drastically. The bidding terminal is flawless." },
                    { name: "Vikram D.", role: "Transporter", quote: "Bus parcel service is a game changer for urgent small loads. It's fast, reliable, and the escrow fee is very reasonable." }
                  ].map((testimonial: any, i: number) => (
                    <div key={i} className="min-w-[360px] sm:min-w-[420px] bg-[#0B0F19] p-10 sm:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl snap-center flex flex-col justify-between hover:border-[#EA580C] transition-colors group">
                      <div>
                        <div className="flex text-[#EA580C] mb-8"><Star className="h-6 w-6 fill-current" /><Star className="h-6 w-6 fill-current" /><Star className="h-6 w-6 fill-current" /><Star className="h-6 w-6 fill-current" /><Star className="h-6 w-6 fill-current" /></div>
                        <p className="text-lg text-slate-300 italic mb-10 leading-relaxed">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center space-x-5 border-t border-slate-800 pt-8">
                        <div className="h-16 w-16 rounded-full bg-slate-800 border-2 border-[#EA580C] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"><User className="text-white h-8 w-8" /></div>
                        <div className="text-left">
                          <h4 className="font-black text-white text-xl">{testimonial.name}</h4>
                          <p className="text-xs text-[#EA580C] font-black uppercase tracking-widest mt-1">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* PLATFORM FEATURES GRID */}
            {/* ======================================================== */}
            <section className="bg-slate-100/80 py-32 px-6">
              <div className="max-w-[1600px] mx-auto space-y-16">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-[#EA580C] font-black text-xs uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-slate-200 shadow-sm inline-block">
                    CORE TOOLS
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-[#0F172A]">Y2Wait Platform Features</h2>
                  <p className="text-slate-500 text-xl font-medium">Click any module to explore the tools driving modern efficiency.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  {platformFeatures.map((b: any) => (
                    <div key={b.id} onClick={() => { setSelectedFeature(b); handlePageChange('feature_detail'); }} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-2 text-left">
                      <div className="h-72 relative overflow-hidden">
                        <img src={b.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                        <div className={`absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 opacity-90`}></div>
                        <span className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm">{b.tag}</span>
                      </div>
                      <div className="p-10">
                        <h3 className="text-3xl font-black text-slate-900 mb-4 flex items-center">{b.title} <ArrowRight className="h-6 w-6 ml-auto text-slate-300 group-hover:text-[#EA580C] transition-colors" /></h3>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">{b.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* FEATURE DETAIL PAGE */}
        {activeView === 'feature_detail' && selectedFeature && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20 animate-fade-in z-10 relative">
            <button type="button" onClick={() => handlePageChange('landing')} className="flex items-center text-[#EA580C] font-black text-base mb-10 transition-colors hover:text-[#0F172A] bg-white px-6 py-3 rounded-xl shadow-md border cursor-pointer"><ArrowLeft className="h-5 w-5 mr-3" /> Back to Main Screen</button>
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 text-left">
              <div className="h-[500px] relative">
                <img src={selectedFeature?.url} className="w-full h-full object-cover" alt="" />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0F172A] opacity-90`}></div>
                <div className="absolute inset-0 flex flex-col justify-end p-16">
                  <span className="bg-[#EA580C] text-white px-5 py-2 rounded-full w-fit text-xs font-black tracking-widest mb-6 shadow-lg uppercase border border-orange-400">{selectedFeature?.tag}</span>
                  <h1 className="text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">{selectedFeature?.title}</h1>
                </div>
              </div>
              <div className="p-16 space-y-10">
                <h3 className="text-4xl font-black text-slate-900">Feature Overview</h3>
                <p className="text-slate-600 text-2xl font-medium leading-relaxed max-w-4xl">{selectedFeature?.subtitle} Built with high-scale architecture on Y2Wait to support millions of concurrent transactions, ensuring reliability and security across the entire logistics grid.</p>
                <div className="bg-slate-50 border border-slate-200 p-10 rounded-3xl flex items-center space-x-8 max-w-lg shadow-inner">
                  <Activity className="h-12 w-12 text-[#EA580C]" />
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-2">Enterprise Ready</div>
                    <div className="text-base font-bold text-slate-500 uppercase tracking-widest">Fully integrated module</div>
                  </div>
                </div>
                <button type="button" onClick={() => setAuthModal({ open: true, mode: 'register', step: 'role' })} className="bg-[#0F172A] text-white px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-800 transition-colors shadow-2xl cursor-pointer">Start Using This Feature</button>
              </div>
            </div>
          </section>
        )}

        {/* LOGGED IN DASHBOARD MODULES */}
        {isLoggedIn && activeView === 'dashboard' && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10 relative">

            {/* TOP MODULE TABS */}
            <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl mb-12 gap-6">
              <h2 className="text-3xl font-black text-slate-900 w-full lg:w-auto text-center lg:text-left tracking-tight">
                {activeModule === 'freight' && 'Book Freight & Radar'}
                {activeModule === 'bus_cargo' && 'Bus Parcel Delivery'}
                {activeModule === 'corporate' && 'Enterprise Auctions'}
                {activeModule === 'mandi' && 'Fleet Mandi Hub'}
                {activeModule === 'ads' && 'Truck Advertising'}
              </h2>

              {/* Module-specific Sub Tabs */}
              <div className="flex flex-wrap justify-center bg-slate-100 p-2 rounded-2xl w-full lg:w-auto border border-slate-200 shadow-inner gap-2">
                {[
                  { id: 'freight', label: 'Book Freight' },
                  { id: 'bus_cargo', label: 'Bus Parcel' },
                  { id: 'corporate', label: 'Enterprise Bids' },
                  { id: 'mandi', label: 'Fleet Mandi' },
                  { id: 'ads', label: 'Truck Ads' }
                ].map((tab: any) => (
                  <button type="button" key={tab.id} onClick={() => { setActiveModule(tab.id as ModuleTab); setListingTab('all'); setBusTab('all'); setBookingStep(1); }}
                    className={`px-6 py-3.5 rounded-xl text-sm font-black transition-all cursor-pointer ${activeModule === tab.id ? 'bg-[#0F172A] text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-white'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Module-specific Sub Tabs for Freight/Bus */}
            {(activeModule === 'freight' || activeModule === 'bus_cargo') && (
              <div className="flex justify-center mb-10">
                <div className="flex bg-slate-100 p-2 rounded-2xl w-fit border border-slate-200 shadow-inner">
                  <button type="button" onClick={() => { if (activeModule === 'freight') { setListingTab('all'); } else { setBusTab('all'); } }} className={`px-10 py-3.5 rounded-xl text-sm font-black transition-all cursor-pointer ${(activeModule === 'freight' ? listingTab : busTab) === 'all' ? 'bg-white text-[#EA580C] shadow' : 'text-slate-500 hover:text-slate-900'}`}>Market Feed</button>
                  <button type="button" onClick={() => { if (activeModule === 'freight') { setListingTab('my_listings'); } else { setBusTab('my_listings'); } }} className={`px-10 py-3.5 rounded-xl text-sm font-black transition-all cursor-pointer ${(activeModule === 'freight' ? listingTab : busTab) === 'my_listings' ? 'bg-white text-[#EA580C] shadow' : 'text-slate-500 hover:text-slate-900'}`}>My Listings</button>
                  <button type="button" onClick={() => { if (activeModule === 'freight') { setListingTab('command_center'); } else { setBusTab('command_center'); } }} className={`px-10 py-3.5 rounded-xl text-sm font-black transition-all cursor-pointer ${(activeModule === 'freight' ? listingTab : busTab) === 'command_center' ? 'bg-[#0F172A] text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}>Radar</button>
                </div>
              </div>
            )}

            {/* MODULE: FREIGHT */}
            {activeModule === 'freight' && (
              <div className="space-y-10 animate-fade-in">
                {listingTab === 'all' && (
                  <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-[#EA580C] p-3 rounded-2xl shadow-inner"><Activity className="h-7 w-7 text-white" /></div>
                        <h3 className="font-black text-slate-900 text-2xl">Live Freight Market</h3>
                      </div>
                      <div className="flex space-x-4 w-full md:w-auto">
                        <div className="bg-white border border-slate-300 px-5 py-4 rounded-xl flex items-center shadow-inner flex-1 md:flex-none">
                          <Search className="h-5 w-5 mr-3 text-slate-400" />
                          <input type="text" placeholder="Search Origin/Dest..." value={freightSearch} onChange={(e: any) => setFreightSearch(e.target.value)} className="text-sm font-bold outline-none w-full md:w-40 text-slate-700" />
                        </div>
                        <select value={freightCapacityFilter} onChange={(e: any) => setFreightCapacityFilter(e.target.value)} className="bg-[#0F172A] text-white border border-slate-800 px-7 py-4 rounded-xl shadow-md text-sm font-black outline-none cursor-pointer">
                          <option value="">All Capacities</option>
                          <option value="15">15 Tons</option>
                          <option value="16">16 Tons</option>
                          <option value="20">20 Tons</option>
                        </select>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="bg-white border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
                            <th className="p-8 pl-10">Vehicle / Asset</th>
                            <th className="p-8">Route Details</th>
                            <th className="p-8">Capacity & Type</th>
                            <th className="p-8">Est. Fare</th>
                            <th className="p-8 text-right pr-10">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                          {combinedFeed.map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                              <tr className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => setExpandedListingId(expandedListingId === item.id ? null : item.id)}>
                                <td className="p-8 pl-10">
                                  <div className="flex items-center space-x-5">
                                    <div className="h-16 w-24 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shadow-sm">
                                      <img src={item.truckImg || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400'} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                      <div className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded border border-slate-200 uppercase w-fit mb-1">{item.id || `LOD-${idx}`}</div>
                                      <div className="font-black text-slate-900 text-lg">{item.isMine ? (item.driverName || item.companyName) : 'View Contact'}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-8">
                                  <div className="flex items-center space-x-3 font-black text-slate-900 text-lg bg-slate-100 w-fit px-5 py-2.5 rounded-xl border border-slate-200">
                                    <span>{item.origin || item.currentLoc}</span>
                                    <ArrowRight className="h-5 w-5 text-[#EA580C]" />
                                    <span>{item.destination || item.destLoc}</span>
                                  </div>
                                </td>
                                <td className="p-8 font-bold text-slate-600 text-lg">
                                  {item.capacity || item.weight} Tons <br /> <span className="text-xs text-slate-400 uppercase tracking-widest">{item.type || item.material || 'General'}</span>
                                </td>
                                <td className="p-8 font-black text-slate-900 text-3xl text-[#EA580C]">
                                  ₹{(item.charges || item.targetPrice).toLocaleString('en-IN')}
                                </td>
                                <td className="p-8 text-right pr-10">
                                  <div className="flex justify-end items-center text-slate-400 group-hover:text-[#0F172A]">
                                    <span className="text-xs font-black mr-3 uppercase tracking-widest">Details</span>
                                    <div className={`p-2.5 rounded-full transition-all ${expandedListingId === item.id ? 'bg-[#0F172A] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                                      <ChevronDown className={`h-6 w-6 transition-transform ${expandedListingId === item.id ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              {expandedListingId === item.id && (
                                <tr className="bg-slate-50 border-b border-slate-200 shadow-inner">
                                  <td colSpan={5} className="p-8">
                                    <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 animate-fade-in">
                                      <div className="flex items-center space-x-8">
                                        <div className="h-20 w-20 rounded-full bg-slate-100 border-4 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                                          {item.dp ? <img src={item.dp} className="h-full w-full object-cover" alt="" /> : <User className="h-10 w-10 text-slate-400" />}
                                        </div>
                                        <div>
                                          <div className="font-black text-slate-900 text-2xl mb-3">{item.driverName || item.companyName || 'Verified Transporter'}</div>
                                          <div className="flex space-x-5 text-sm font-bold text-slate-600">
                                            <span className="flex items-center bg-slate-100 px-4 py-2 rounded-xl border border-slate-200"><PhoneCall className="h-5 w-5 mr-2 text-[#EA580C]" /> {item.phone || '+91 9876543210'}</span>
                                            <span className="flex items-center bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-emerald-600"><CheckCircle2 className="h-5 w-5 mr-2" /> KYC Verified</span>
                                          </div>
                                        </div>
                                      </div>
                                      <button type="button" onClick={(e: any) => { e.stopPropagation(); openWhatsApp(`I want to connect regarding Freight ID: ${item.id}`); }} className="bg-[#0F172A] text-white font-black px-12 py-5 rounded-xl shadow-xl hover:bg-slate-800 transition-colors text-lg w-full md:w-auto cursor-pointer">
                                        Contact / Bid Now
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                          {combinedFeed.length === 0 && <tr><td colSpan={5} className="p-16 text-center text-slate-500 font-bold text-lg">No active listings match your search.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {listingTab === 'my_listings' && (
                  <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl h-fit">
                      <h3 className="font-black text-3xl text-slate-900 mb-8 border-b border-slate-100 pb-5">Post Requirements</h3>
                      {renderLayeredStepIndicator()}
                      {selectedRole === 'driver' || selectedRole === 'transporter' ? (
                        <form onSubmit={handlePostTruck} className="space-y-5">
                          {bookingStep === 1 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="text" placeholder="Origin Location" value={newTruck.origin} onChange={(e: any) => setNewTruck({ ...newTruck, origin: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <input type="text" placeholder="Destination" value={newTruck.dest} onChange={(e: any) => setNewTruck({ ...newTruck, dest: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <button type="button" onClick={() => setBookingStep(2)} className="w-full bg-[#0F172A] text-white p-5 rounded-xl font-black text-lg hover:bg-slate-800 transition-colors shadow-lg mt-4 cursor-pointer">Next Step</button>
                            </div>
                          )}
                          {bookingStep === 2 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="text" placeholder="Vehicle No (e.g. MH04AB1234)" value={newTruck.vehicleNumber} onChange={(e: any) => setNewTruck({ ...newTruck, vehicleNumber: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <input type="text" placeholder="Capacity (Tons)" value={newTruck.capacity} onChange={(e: any) => setNewTruck({ ...newTruck, capacity: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setBookingStep(1)} className="flex-1 bg-slate-100 text-slate-700 font-black p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">Back</button>
                                <button type="button" onClick={() => setBookingStep(3)} className="flex-[2] bg-[#0F172A] text-white font-black p-5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg cursor-pointer">Next</button>
                              </div>
                            </div>
                          )}
                          {bookingStep === 3 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="number" placeholder="Expected Price (₹)" value={newTruck.charges} onChange={(e: any) => setNewTruck({ ...newTruck, charges: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <label className="border-2 border-dashed border-slate-300 bg-slate-50 p-8 rounded-2xl text-center cursor-pointer block hover:bg-slate-100 transition-colors">
                                <Camera className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                                <span className="text-sm text-slate-600 font-black uppercase tracking-widest">Upload Truck Image</span>
                                <input type="file" className="hidden" onChange={(e: any) => handleFileUpload('truck_pic', e)} />
                              </label>
                              <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setBookingStep(2)} className="flex-1 bg-slate-100 text-slate-700 font-black p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">Back</button>
                                <button type="submit" className="flex-[2] bg-[#EA580C] text-white font-black p-5 rounded-xl hover:bg-orange-700 shadow-xl transition-colors text-lg cursor-pointer">Post Listing</button>
                              </div>
                            </div>
                          )}
                        </form>
                      ) : (
                        <form onSubmit={handlePostLoad} className="space-y-5">
                          {bookingStep === 1 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="text" placeholder="Pickup Location" value={newLoad.origin} onChange={(e: any) => setNewLoad({ ...newLoad, origin: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <input type="text" placeholder="Drop Location" value={newLoad.destination} onChange={(e: any) => setNewLoad({ ...newLoad, destination: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <button type="button" onClick={() => setBookingStep(2)} className="w-full bg-[#0F172A] text-white p-5 rounded-xl font-black text-lg hover:bg-slate-800 transition-colors shadow-lg mt-4 cursor-pointer">Next Step</button>
                            </div>
                          )}
                          {bookingStep === 2 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="text" placeholder="Material Type" value={newLoad.material} onChange={(e: any) => setNewLoad({ ...newLoad, material: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <input type="text" placeholder="Weight (Tons)" value={newLoad.weight} onChange={(e: any) => setNewLoad({ ...newLoad, weight: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setBookingStep(1)} className="flex-1 bg-slate-100 text-slate-700 font-black p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">Back</button>
                                <button type="button" onClick={() => setBookingStep(3)} className="flex-[2] bg-[#0F172A] text-white font-black p-5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg cursor-pointer">Next</button>
                              </div>
                            </div>
                          )}
                          {bookingStep === 3 && (
                            <div className="animate-fade-in space-y-5">
                              <input type="number" placeholder="Offer Price (₹)" value={newLoad.targetPrice} onChange={(e: any) => setNewLoad({ ...newLoad, targetPrice: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold focus:border-[#EA580C] outline-none shadow-inner" required />
                              <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setBookingStep(2)} className="flex-1 bg-slate-100 text-slate-700 font-black p-5 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer">Back</button>
                                <button type="submit" className="flex-[2] bg-[#EA580C] text-white font-black p-5 rounded-xl hover:bg-orange-700 shadow-md transition-colors cursor-pointer">Post Load</button>
                              </div>
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                    <div className="lg:col-span-2">
                      {renderLiveRadar()}
                    </div>
                  </div>
                )}

                {listingTab === 'command_center' && renderLiveRadar()}
              </div>
            )}

            {/* MODULE: BUS CARGO */}
            {activeModule === 'bus_cargo' && (
              <div className="space-y-10 animate-fade-in">

                {busTab === 'all' && (
                  <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-[#EA580C] p-3 rounded-2xl shadow-inner"><Bus className="h-7 w-7 text-white" /></div>
                        <h3 className="font-black text-slate-900 text-2xl">Active Bus Cargo</h3>
                      </div>
                      <div className="flex space-x-4 w-full md:w-auto">
                        <div className="bg-white border border-slate-300 px-5 py-4 rounded-xl flex items-center shadow-inner flex-1 md:flex-none">
                          <Search className="h-5 w-5 mr-3 text-slate-400" />
                          <input type="text" placeholder="Search route..." value={busSearch} onChange={(e: any) => setBusSearch(e.target.value)} className="text-sm font-bold outline-none w-full md:w-48 text-slate-700" />
                        </div>
                        <select value={busTypeFilter} onChange={(e: any) => setBusTypeFilter(e.target.value)} className="bg-[#0F172A] text-white border border-slate-800 px-7 py-4 rounded-xl shadow-md text-sm font-black outline-none cursor-pointer">
                          <option value="">All Types</option>
                          <option value="Fragile">Fragile</option>
                          <option value="Express">Express</option>
                          <option value="Standard">Standard</option>
                        </select>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="bg-white border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
                            <th className="p-8 pl-10">Bus Operator</th>
                            <th className="p-8">Route</th>
                            <th className="p-8">Space & Type</th>
                            <th className="p-8">Price/Kg</th>
                            <th className="p-8 text-right pr-10">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                          {filteredBusFeed.map((bus: any, idx: number) => (
                            <React.Fragment key={idx}>
                              <tr className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => setExpandedListingId(expandedListingId === bus.id ? null : bus.id)}>
                                <td className="p-8 pl-10">
                                  <div className="flex items-center space-x-5">
                                    <div className="h-16 w-24 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 shadow-sm">
                                      <img src={bus.busImg} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                      <div className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded border border-slate-200 uppercase w-fit mb-1">{bus.id}</div>
                                      <div className="font-black text-slate-900 text-lg">{bus.operator}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-8 font-black text-slate-900 text-lg">
                                  <span className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 inline-block">{bus.route}</span>
                                </td>
                                <td className="p-8 font-bold text-slate-600 text-base">
                                  {bus.capacity} <br />
                                  <span className={`text-[10px] font-black uppercase tracking-widest mt-1.5 inline-flex items-center px-2.5 py-1 rounded-md ${bus.serviceType === 'Fragile' ? 'bg-orange-50 text-[#EA580C] border border-orange-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                    {bus.serviceType === 'Fragile' && <Package className="h-3 w-3 mr-1" />}
                                    {bus.serviceType === 'Express' && <Truck className="h-3 w-3 mr-1" />}
                                    {bus.serviceType === 'Standard' && <Box className="h-3 w-3 mr-1" />}
                                    {bus.serviceType}
                                  </span>
                                </td>
                                <td className="p-8 font-black text-slate-900 text-3xl text-[#EA580C]">
                                  ₹{bus.price}
                                </td>
                                <td className="p-8 text-right pr-10">
                                  <div className="flex justify-end items-center text-slate-400 group-hover:text-[#0F172A]">
                                    <span className="text-xs font-black mr-3 uppercase tracking-widest">Details</span>
                                    <div className={`p-2.5 rounded-full transition-all ${expandedListingId === bus.id ? 'bg-[#0F172A] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                                      <ChevronDown className={`h-6 w-6 transition-transform ${expandedListingId === bus.id ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              {expandedListingId === bus.id && (
                                <tr className="bg-slate-50 border-b border-slate-200 shadow-inner">
                                  <td colSpan={5} className="p-8">
                                    <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
                                      <div className="flex items-center space-x-6">
                                        <div className="h-16 w-16 rounded-full bg-slate-100 border-4 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
                                          <Bus className="h-8 w-8 text-slate-400" />
                                        </div>
                                        <div>
                                          <div className="font-black text-slate-900 text-xl mb-2">{bus.operator}</div>
                                          <div className="flex space-x-4 text-sm font-bold text-slate-600">
                                            <span className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"><PhoneCall className="h-4 w-4 mr-2 text-[#EA580C]" /> Contact Operator</span>
                                            <span className="flex items-center bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 text-emerald-600"><CheckCircle2 className="h-4 w-4 mr-2" /> Verified Route</span>
                                          </div>
                                        </div>
                                      </div>
                                      <button type="button" onClick={(e: any) => { e.stopPropagation(); openWhatsApp(`I want to book parcel space on ${bus.route} via ${bus.operator}`); }} className="bg-[#0F172A] text-white font-black px-10 py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-colors text-base w-full md:w-auto cursor-pointer">
                                        Book Space Now
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                          {filteredBusFeed.length === 0 && <tr><td colSpan={5} className="p-16 text-center text-slate-500 font-bold text-lg">No active bus networks match your filter.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {busTab === 'my_listings' && (
                  <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl h-fit">
                      {selectedRole === 'driver' || selectedRole === 'transporter' ? (
                        <form onSubmit={handlePostBus} className="space-y-6">
                          <h3 className="font-black text-3xl text-slate-900 border-b border-slate-100 pb-5 mb-8">List Bus Capacity</h3>
                          <div className="space-y-5">
                            <label className="text-xs font-bold text-slate-700 block uppercase tracking-widest">Route (Origin - Destination)</label>
                            <input type="text" placeholder="e.g. Patna - Delhi" value={newBus.route} onChange={(e: any) => setNewBus({ ...newBus, route: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-700 block pt-2 uppercase tracking-widest">Vehicle No.</label>
                                <input type="text" placeholder="e.g. MH04 AB1234" value={newBus.vehicleNumber} onChange={(e: any) => setNewBus({ ...newBus, vehicleNumber: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-700 block pt-2 uppercase tracking-widest">Space (KG)</label>
                                <input type="number" placeholder="e.g. 500" value={newBus.capacity} onChange={(e: any) => setNewBus({ ...newBus, capacity: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                              </div>
                            </div>

                            <label className="text-xs font-bold text-slate-700 block pt-4 uppercase tracking-widest">Select Service Type</label>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Fragile' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Fragile' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Package className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Fragile' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Fragile</div></div>
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Express' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Express' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Truck className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Express' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Express</div></div>
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Standard' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Standard' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Box className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Standard' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Standard</div></div>
                            </div>

                            <label className="text-xs font-bold text-slate-700 block pt-4 uppercase tracking-widest">Price per Kg (₹)</label>
                            <input type="number" placeholder="₹" value={newBus.price} onChange={(e: any) => setNewBus({ ...newBus, price: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />

                            <button type="submit" className="w-full bg-[#EA580C] text-white font-black p-5 rounded-xl hover:bg-orange-700 transition-colors shadow-xl mt-8 text-lg cursor-pointer">Post Available Space</button>
                          </div>
                        </form>
                      ) : (
                        <form onSubmit={handlePostBus} className="space-y-6">
                          <h3 className="font-black text-3xl text-slate-900 border-b border-slate-100 pb-5 mb-8">Send Bus Parcel</h3>
                          <div className="space-y-5">
                            <label className="text-xs font-bold text-slate-700 block uppercase tracking-widest">Route (Origin - Destination)</label>
                            <input type="text" placeholder="e.g. Patna - Delhi" value={newBus.route} onChange={(e: any) => setNewBus({ ...newBus, route: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-700 block pt-2 uppercase tracking-widest">Product Type</label>
                                <input type="text" placeholder="e.g. Electronics" value={newBus.productType} onChange={(e: any) => setNewBus({ ...newBus, productType: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-700 block pt-2 uppercase tracking-widest">Weight (KG)</label>
                                <input type="number" placeholder="Total KG" value={newBus.weight} onChange={(e: any) => setNewBus({ ...newBus, weight: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                              </div>
                            </div>

                            <label className="text-xs font-bold text-slate-700 block pt-4 uppercase tracking-widest">Select Service Type</label>
                            <div className="grid grid-cols-3 gap-4 mb-8">
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Fragile' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Fragile' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Package className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Fragile' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Fragile</div></div>
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Express' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Express' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Truck className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Express' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Express</div></div>
                              <div onClick={() => setNewBus({ ...newBus, serviceType: 'Standard' })} className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-colors ${newBus.serviceType === 'Standard' ? 'border-[#EA580C] bg-orange-50' : 'border-slate-200'}`}><Box className={`h-8 w-8 mx-auto mb-3 ${newBus.serviceType === 'Standard' ? 'text-[#EA580C]' : 'text-slate-400'}`} /><div className="text-[10px] font-black uppercase tracking-wider">Standard</div></div>
                            </div>

                            <label className="text-xs font-bold text-slate-700 block pt-4 uppercase tracking-widest">Offered Total Price (₹)</label>
                            <input type="number" placeholder="₹" value={newBus.price} onChange={(e: any) => setNewBus({ ...newBus, price: e.target.value })} className="w-full border border-slate-300 p-5 rounded-xl text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />

                            <button type="submit" className="w-full bg-[#0F172A] text-white font-black p-5 rounded-xl hover:bg-slate-800 transition-colors shadow-xl mt-8 text-lg cursor-pointer">Post Parcel Demand</button>
                          </div>
                        </form>
                      )}
                    </div>
                    <div className="lg:col-span-2">
                      {renderLiveRadar()}
                    </div>
                  </div>
                )}

                {busTab === 'command_center' && renderLiveRadar()}
              </div>
            )}

            {/* MODULE: ENTERPRISE BIDS */}
            {activeModule === 'corporate' && (
              <div className="space-y-10 animate-fade-in">
                <div className="bg-[#0F172A] text-white p-20 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C] rounded-full blur-[150px] opacity-20"></div>
                  <h2 className="text-6xl font-black mb-8 relative z-10 tracking-tight">Corporate Bidding & Reverse Auction</h2>
                  <p className="text-slate-300 font-medium text-xl relative z-10 max-w-3xl mx-auto leading-relaxed">Live bulk shipment auctions with real-time bidding for enterprise clients.</p>
                </div>

                {selectedRole === 'corporate' && (
                  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col md:flex-row gap-6 max-w-5xl mx-auto -mt-16 relative z-20">
                    <input type="text" placeholder="Demand (e.g. 50 Tons)" value={newBid.demand} onChange={(e: any) => setNewBid({ ...newBid, demand: e.target.value })} className="flex-1 border border-slate-300 rounded-xl p-5 text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                    <input type="text" placeholder="Route (Origin-Dest)" value={newBid.route} onChange={(e: any) => setNewBid({ ...newBid, route: e.target.value })} className="flex-1 border border-slate-300 rounded-xl p-5 text-base font-bold outline-none focus:border-[#EA580C] shadow-inner" required />
                    <button type="button" onClick={handlePostBid} className="bg-[#EA580C] text-white px-12 py-5 rounded-xl font-black text-xl shadow-lg hover:bg-orange-700 transition-colors cursor-pointer">List Auction</button>
                  </div>
                )}

                <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl mt-12">
                  <div className="p-8 border-b border-slate-200 bg-slate-50"><h3 className="font-black text-3xl text-slate-900">Active Auctions</h3></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead className="bg-white border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">
                        <tr><th className="p-8 pl-10">ID & Company</th><th className="p-8">Route / Demand</th><th className="p-8">Time Left</th><th className="p-8">L1 (Lowest Bid)</th><th className="p-8 text-right pr-10">Action</th></tr>
                      </thead>
                      <tbody className="text-sm font-medium text-slate-700 divide-y divide-slate-100">
                        {safeBids.map((bid: any) => (
                          <tr key={bid.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-8 pl-10"><div className="font-black text-xl text-slate-900 mb-1">{bid.id}</div><div className="text-sm text-slate-500 font-bold">{bid.company}</div></td>
                            <td className="p-8"><div className="font-bold text-slate-900 text-lg">{bid.route}</div><div className="text-[10px] text-[#EA580C] font-black mt-2 bg-orange-50 border border-orange-100 w-fit px-3 py-1 rounded-full uppercase tracking-widest">{bid.demand}</div></td>
                            <td className="p-8 font-bold text-red-500 flex items-center mt-6 text-base"><Clock className="h-5 w-5 mr-2" /> {bid.time}</td>
                            <td className="p-8 font-black text-4xl text-slate-900">₹{bid.L1.toLocaleString('en-IN')}</td>
                            <td className="p-8 text-right pr-10"><button type="button" onClick={() => setNegotiationTarget({ type: 'bid', data: bid })} className="bg-[#0F172A] text-white px-10 py-4 rounded-xl text-sm font-black hover:bg-slate-800 transition-colors shadow-lg cursor-pointer">View / Bid</button></td>
                          </tr>
                        ))}
                        {safeBids.length === 0 && <tr><td colSpan={5} className="p-16 text-center text-slate-500 font-bold text-lg">No active enterprise auctions.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE: TRUCK ADS */}
            {activeModule === 'ads' && (
              <div className="space-y-16 animate-fade-in py-10 relative">
                {(selectedRole === 'driver' || selectedRole === 'transporter') ? (
                  <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl max-w-5xl mx-auto px-10 relative">
                    <img src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8451.jpg?w=800" className="mx-auto h-80 mb-10 object-contain drop-shadow-xl" alt="Digital Marketing Animated" />
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 capitalize tracking-tight">Ad Platform Coming Soon</h2>
                    <p className="text-xl text-slate-500 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">We are actively tying up with leading corporates to bring you exclusive bonus income through truck advertising. We will launch soon!</p>
                    <button type="button" className="bg-[#EA580C] text-white px-12 py-5 rounded-xl font-black text-xl shadow-xl hover:bg-orange-700 transition-colors cursor-pointer">Wait For Launch</button>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#0F172A] rounded-[3rem] p-20 text-center text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C] rounded-full blur-[150px] opacity-30"></div>
                      <h2 className="text-6xl font-black mb-8 relative z-10 tracking-tight">Reach Millions On The Move</h2>
                      <p className="text-2xl text-slate-300 font-medium max-w-4xl mx-auto relative z-10 leading-relaxed">
                        Transform our extensive fleet network into your moving billboards. High visibility, low CPM, and route-targeted advertising across India.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      {['Rear Door Panel', 'Full Side Wrap', 'Cabin Crown'].map((p: string, i: number) => (
                        <div key={p} className={`bg-white rounded-[2.5rem] border overflow-hidden shadow-xl p-10 text-center flex flex-col justify-between hover:border-[#EA580C] transition-all group relative ${i === 1 ? 'border-4 border-[#EA580C] transform lg:-translate-y-6 shadow-2xl' : 'border-slate-200'}`}>
                          {i === 1 && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-[#EA580C] text-white text-[10px] font-black px-6 py-2 rounded-b-2xl uppercase tracking-widest shadow-md">Most Popular</div>}
                          <div className="flex-1">
                            <div className={`h-56 rounded-2xl mb-8 flex items-center justify-center border-2 border-dashed ${i === 1 ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-300'} mt-4`}><Truck className={`h-20 w-20 ${i === 1 ? 'text-[#EA580C]' : 'text-slate-400 group-hover:text-[#EA580C]'} transition-colors`} /></div>
                            <h4 className="font-black text-3xl text-slate-900 mb-4">{t(p, p)}</h4>
                            <p className="text-base text-slate-500 font-medium mb-10">Packages and placements vary according to requirement where they want placement and pay.</p>
                          </div>
                          <button type="button" onClick={() => openWhatsApp(`I want to place an ad: ${p}`)} className={`${i === 1 ? 'bg-[#EA580C]' : 'bg-[#0F172A]'} text-white px-8 py-5 rounded-xl font-black text-lg w-full hover:opacity-90 transition-opacity shadow-lg cursor-pointer`}>Select Placement</button>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm mt-16">
                      <div className="text-center py-12 bg-slate-50 border-b border-slate-200"><h3 className="text-4xl font-black text-slate-900">Pricing & Packages</h3></div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-lg min-w-[600px]">
                          <thead className="bg-[#0F172A] text-white">
                            <tr><th className="p-8 pl-12 font-bold uppercase tracking-widest text-sm">Vehicle Type</th><th className="p-8 font-bold uppercase tracking-widest text-sm">Placement</th><th className="p-8 font-bold uppercase tracking-widest text-sm">Base Price / Month</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                            <tr className="hover:bg-slate-50 transition-colors"><td className="p-8 pl-12">Box Truck</td><td className="p-8">Rear Door</td><td className="p-8 font-black text-2xl text-[#EA580C]">₹15,000</td></tr>
                            <tr className="hover:bg-slate-50 transition-colors"><td className="p-8 pl-12">Semi-Trailer</td><td className="p-8">Side Panel</td><td className="p-8 font-black text-2xl text-[#EA580C]">₹35,000</td></tr>
                            <tr className="hover:bg-slate-50 transition-colors"><td className="p-8 pl-12">Full Container</td><td className="p-8">Full Wrap</td><td className="p-8 font-black text-2xl text-[#EA580C]">₹80,000</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* MODULE: FLEET MANDI */}
            {activeModule === 'mandi' && (
              <div className="space-y-12 animate-fade-in py-10 relative">

                <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl max-w-5xl mx-auto px-10 relative">
                  <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=800" className="mx-auto h-80 mb-10 object-contain drop-shadow-xl" alt="E-Commerce Animated" />
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 capitalize tracking-tight">Marketplace Coming Soon</h2>
                  <p className="text-xl text-slate-500 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">We are tying up with big fuel and tire companies to bring you massive group buying discounts. Wait for the official launch!</p>
                  <button type="button" className="bg-[#EA580C] text-white px-12 py-5 rounded-xl font-black text-xl shadow-xl hover:bg-orange-700 transition-colors cursor-pointer">Wait For Launch</button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto -mt-16 mb-16 p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl gap-8 relative z-20">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-50 p-4 rounded-full border border-orange-100"><ShoppingBag className="h-8 w-8 text-[#EA580C]" /></div>
                    <p className="text-2xl text-slate-900 font-black">List Your Products plz click this</p>
                  </div>
                  <button type="button" onClick={() => openWhatsApp('I want to list my products')} className="bg-[#0F172A] w-full md:w-auto text-white px-10 py-5 rounded-xl text-lg font-black hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center cursor-pointer">Direct WhatsApp <ArrowRight className="h-5 w-5 ml-3" /></button>
                </div>

                <div className="bg-[#0F172A] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-slate-800 p-12 gap-10 opacity-40 select-none pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 px-10 py-5 rounded-2xl border border-slate-700 backdrop-blur-md">
                    <h2 className="text-white font-black text-3xl tracking-widest uppercase">Preview Only</h2>
                  </div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635767798638-3e2523d06eb1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                  <div className="md:w-2/3 relative z-10 flex flex-col justify-center text-left">
                    <div className="bg-[#EA580C] text-white w-fit px-5 py-2 rounded-full text-xs font-black tracking-widest mb-6 shadow-md flex items-center"><Flame className="h-4 w-4 mr-2" /> HOT GROUP BUY</div>
                    <h2 className="text-5xl font-black text-white mb-6 leading-tight">Premium Synthetic Engine Oil Drum</h2>
                    <p className="text-slate-300 text-xl mb-10 font-medium max-w-2xl leading-relaxed">Join 450+ fleet owners to unlock wholesale pricing on our top-tier lubricant. Guaranteed protection for heavy-duty engines.</p>
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl font-black text-[#EA580C]">₹12,499 <span className="text-xl text-slate-400 line-through">₹18,000</span></div>
                      <button type="button" className="bg-[#EA580C] text-white px-8 py-4 rounded-xl text-base font-black shadow-lg flex items-center cursor-pointer">Team Up to Save <ArrowRight className="h-5 w-5 ml-3" /></button>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-center relative z-10">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full text-center">
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">DEAL ENDS IN</p>
                      <div className="flex justify-center space-x-4 mb-8">
                        <div className="bg-slate-100 px-5 py-4 rounded-xl font-black text-3xl">14<span className="block text-xs text-slate-400 mt-1">HRS</span></div>
                        <div className="text-3xl font-bold text-slate-300 pt-3">:</div>
                        <div className="bg-slate-100 px-5 py-4 rounded-xl font-black text-3xl">45<span className="block text-xs text-slate-400 mt-1">MIN</span></div>
                        <div className="text-3xl font-bold text-slate-300 pt-3">:</div>
                        <div className="bg-red-50 text-red-600 px-5 py-4 rounded-xl font-black text-3xl">22<span className="block text-xs text-red-400 mt-1">SEC</span></div>
                      </div>
                      <div className="flex justify-between text-sm font-bold mb-3"><span>450 / 500</span><span className="text-slate-500">Joined</span></div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6"><div className="bg-[#EA580C] w-[90%] h-full"></div></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                  <h3 className="text-3xl font-black text-slate-900">Trending Deals</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-40 pointer-events-none select-none">
                  {mandiProducts.map((item: any) => (
                    <div key={item.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col text-left">
                      <div className="h-56 overflow-hidden relative bg-slate-100 p-4 flex items-center justify-center border-b border-slate-100">
                        <img src={item.img} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-md" alt="" />
                        <div className="absolute top-6 right-6 bg-white p-2.5 rounded-full shadow-lg"><ShoppingBag className="h-4 w-4 text-[#EA580C]" /></div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-black text-xl text-slate-900 mb-2">{item.name}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border border-slate-200 w-fit px-2 py-1 rounded">{item.tag}</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-end mb-6">
                            <div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</div><div className="text-3xl font-black text-[#EA580C]">₹{item.price}</div></div>
                            <div className="text-right text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded border border-emerald-100"><CheckCircle2 className="h-4 w-4 inline mr-1" />{item.stock}</div>
                          </div>
                          <button type="button" className="w-full bg-[#0F172A] text-white px-4 py-4 rounded-xl text-sm font-black transition-colors shadow-lg cursor-pointer">Buy Now</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* --- SUPPLEMENTARY PAGES --- */}

        {/* SERVICES PAGE */}
        {activeView === 'services' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-24 text-center animate-fade-in space-y-16 relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="max-w-4xl mx-auto space-y-6">
              <span className="bg-[#EA580C]/10 text-[#EA580C] px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-[#EA580C]/20 shadow-inner">How We Provide Services</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">Your Stories, Our Value</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 pt-12 text-left">
              {[
                { i: Flame, t: 'Farmer Loss Returned', s: 'A farmer in Bihar was losing 30% of his tomato crop to spoilage due to slow transit and middlemen delays. Direct outstation truck matchmaking via Y2Wait solved his transit, eliminated middlemen cuts, and now he makes 50% more profit season on season.', img: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=600' },
                { i: TrendingDown, t: 'Fleet Owner Success Story', s: 'A fleet owner with 10 trucks was struggling with empty returns, facing 30% revenue loss. By utilizing our live radar, he now finds loads within 2 hours, boosting his monthly revenue by 40% and eliminating empty miles completely.', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600' },
              ].map((story: any) => (
                <div key={story.t} className="bg-white rounded-[2rem] border overflow-hidden shadow-2xl flex flex-col group hover:border-[#EA580C] transition-all">
                  <div className="h-64 relative overflow-hidden">
                    <img src={story.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  </div>
                  <div className="p-10 flex-1 space-y-4">
                    <div className="flex items-center space-x-3 text-[#EA580C]"><story.i className="h-8 w-8" /><h3 className="font-black text-2xl text-slate-900 capitalize tracking-tight">{story.t}</h3></div>
                    <p className="text-slate-600 text-base font-medium leading-relaxed">{story.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SAFE QR PAGE */}
        {activeView === 'safe_qr' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20 animate-fade-in relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-slate-200 text-center mt-10">
              {!allDocsUploaded ? (
                <>
                  <div className="bg-orange-50 w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-lg">
                    <QrCode className="h-16 w-16 text-[#EA580C] animate-pulse" />
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Safe Traffic QR</h2>
                  <p className="text-slate-500 font-medium mb-16 max-w-3xl mx-auto text-xl leading-relaxed">
                    Upload your critical documents to generate a unique QR code. Streamline police cross-checks from 15 minutes to seconds, and protect yourself against highway scams.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    {['Driving License', 'Vehicle Registration (RC)', 'Insurance Policy', 'Route Permit'].map((doc: string) => {
                      const docKey = doc.toLowerCase().includes('dl') ? 'dl' : doc.toLowerCase().includes('rc') ? 'rc' : doc.toLowerCase().includes('insur') ? 'ins' : 'permit';
                      const isUploaded = qrDocs[docKey as keyof typeof qrDocs];
                      return (
                        <label key={doc} className={`border-2 border-dashed p-8 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${isUploaded ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-300 hover:bg-slate-50 hover:border-[#EA580C]'}`}>
                          <div>
                            <h4 className={`font-black text-xl ${isUploaded ? 'text-emerald-700' : 'text-slate-800'}`}>{doc}</h4>
                            <p className="text-sm text-slate-500 font-medium mt-1">{isUploaded ? 'Document Verified' : 'Click to upload PDF/Image'}</p>
                            {isUploaded && <p className="text-xs text-emerald-600 font-black mt-3 bg-emerald-100 w-fit px-3 py-1 rounded-full"><CheckCircle2 className="h-4 w-4 inline mr-1" /> Ready</p>}
                          </div>
                          {isUploaded ? <CheckCircle2 className="h-10 w-10 text-emerald-500" /> : <Upload className="h-10 w-10 text-slate-400" />}
                          <input type="file" className="hidden" onChange={(e: any) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setQrDocs({ ...qrDocs, [docKey]: true });
                            }
                          }} />
                        </label>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="animate-fade-in py-10">
                  <div className="bg-emerald-500 w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <Check className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">All Documents Verified</h2>
                  <p className="text-slate-500 font-medium mb-12 text-lg">Your Safe QR code is ready for highway inspections.</p>

                  <div className="bg-white p-10 border-4 border-[#0F172A] rounded-[3rem] w-fit mx-auto shadow-2xl relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0F172A] text-white px-6 py-2 rounded-full font-black tracking-widest text-sm uppercase">Y2Wait Verified</div>
                    <QrCode className="h-64 w-64 text-[#0F172A] mx-auto" />
                    <p className="text-sm font-bold text-slate-400 mt-6 tracking-widest uppercase">ID: Y2W-{Math.floor(Math.random() * 900000)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABOUT US */}
        {activeView === 'about' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-24 text-center animate-fade-in space-y-24 relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="max-w-4xl mx-auto space-y-8">
              <span className="bg-[#0F172A] text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">The Future of Freight</span>
              <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.1]">Revolutionizing Logistics through <span className="text-[#EA580C]">Transparency.</span></h2>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
                We are building the digital backbone of the global supply chain at Y2Wait. Connecting fleets, simplifying freight, and delivering absolute clarity to B2B stakeholders everywhere.
              </p>
            </div>

            <div className="space-y-12">
              <div className="text-center"><h3 className="text-4xl font-black text-slate-900 mb-4">Driven by Purpose</h3><p className="text-slate-500 font-medium text-lg">Our foundation is built on cutting-edge corporate modernism.</p></div>
              <div className="grid md:grid-cols-2 gap-10 text-left">
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <Activity className="h-12 w-12 text-[#EA580C] mb-8 bg-orange-50 p-3 rounded-2xl border border-orange-100" />
                  <h3 className="font-black text-2xl mb-4 text-slate-900">Our Mission</h3>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">To eliminate friction in the global logistics network by providing a unified, high-scale platform. We empower carriers and shippers with real-time data, ensuring every load is moved with maximum efficiency.</p>
                </div>
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <Eye className="h-12 w-12 text-[#EA580C] mb-8 bg-orange-50 p-3 rounded-2xl border border-orange-100" />
                  <h3 className="font-black text-2xl mb-4 text-slate-900">Our Vision</h3>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">A fully interconnected freight ecosystem where opacity is obsolete, and predictive intelligence drives strategic logistics decisions. Aligned with India's goal to reduce logistics costs to 9% of GDP.</p>
                </div>
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <ShieldCheck className="h-12 w-12 text-[#0F172A] mb-8 bg-slate-100 p-3 rounded-2xl border border-slate-200" />
                  <h3 className="font-black text-2xl mb-4 text-slate-900">Enterprise Reliability</h3>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">Bank-grade security and 99.99% uptime for operations that never sleep.</p>
                </div>
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <Layers className="h-12 w-12 text-[#0F172A] mb-8 bg-slate-100 p-3 rounded-2xl border border-slate-200" />
                  <h3 className="font-black text-2xl mb-4 text-slate-900">Partner Ecosystem</h3>
                  <p className="text-base font-medium text-slate-500 leading-relaxed">Fostering deep collaborations between independent fleets and global hubs.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRICING PAGE */}
        {activeView === 'premium' && (
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-24 text-center animate-fade-in space-y-16 relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="bg-[#0F172A]/10 text-[#0F172A] px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-[#0F172A]/20 shadow-inner">Pricing Plans</span>
              <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">Simple, Transparent Pricing</h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">Power your logistics business with plans designed for single drivers, growing fleets, and large-scale enterprises.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12 text-left">
              <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-lg flex flex-col h-full hover:shadow-2xl hover:border-[#EA580C] hover:-translate-y-2 transition-all cursor-pointer group">
                <h3 className="font-black text-3xl text-slate-900 mb-4 group-hover:text-[#EA580C] transition-colors">Starter</h3>
                <div className="text-6xl font-black text-slate-900 mb-8">₹0<span className="text-xl text-slate-400 font-bold">/mo</span></div>
                <button type="button" className="w-full bg-slate-100 text-slate-700 font-black py-4.5 rounded-xl mb-10 hover:bg-slate-200 transition-colors text-lg cursor-pointer">Current Plan</button>
                <ul className="space-y-6 text-base font-bold text-slate-600 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-slate-300 mr-4 shrink-0" /> Standard route visibility</li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-slate-300 mr-4 shrink-0" /> Zero Match Fee applies on Y2Wait</li>
                </ul>
              </div>

              <div className="bg-[#0F172A] text-white p-12 rounded-[2.5rem] shadow-2xl transform md:-translate-y-8 relative flex flex-col h-full hover:shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:-translate-y-10 transition-all cursor-pointer border border-[#0F172A]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EA580C] text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">Recommended</div>
                <h3 className="font-black text-3xl text-white mb-4">Platinum</h3>
                <div className="text-6xl font-black text-white mb-8">₹999<span className="text-xl text-slate-400 font-bold">/mo</span></div>
                <button type="button" className="w-full bg-[#EA580C] text-white font-black py-4.5 rounded-xl mb-10 shadow-lg hover:bg-orange-700 transition-colors text-lg cursor-pointer">Upgrade Now</button>
                <ul className="space-y-6 text-base font-bold text-slate-300 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-[#EA580C] mr-4 shrink-0" /> Zero Commission on 50 loads</li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-[#EA580C] mr-4 shrink-0" /> Dedicated Account Manager</li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-[#EA580C] mr-4 shrink-0" /> Live GPS Tracking Access</li>
                </ul>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-lg flex flex-col h-full hover:shadow-2xl hover:border-[#0F172A] hover:-translate-y-2 transition-all cursor-pointer group">
                <h3 className="font-black text-3xl text-slate-900 mb-4 group-hover:text-[#0F172A] transition-colors">Enterprise</h3>
                <div className="text-6xl font-black text-slate-900 mb-8">Custom</div>
                <button type="button" className="w-full bg-[#0F172A] text-white font-black py-4.5 rounded-xl mb-10 hover:bg-slate-800 transition-colors shadow-md text-lg cursor-pointer">Contact Sales</button>
                <ul className="space-y-6 text-base font-bold text-slate-600 flex-1">
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-slate-300 mr-4 shrink-0 group-hover:text-[#0F172A] transition-colors" /> Full API Integrations</li>
                  <li className="flex items-start"><CheckCircle2 className="h-6 w-6 text-slate-300 mr-4 shrink-0 group-hover:text-[#0F172A] transition-colors" /> Custom Fleet Management</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* NEGOTIATION MODAL */}
        {negotiationTarget && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 relative shadow-2xl pointer-events-auto text-left">
              <button type="button" onClick={() => setNegotiationTarget(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 cursor-pointer"><X className="h-5 w-5" /></button>
              <h3 className="text-xl font-black text-slate-900 mb-4">Place Your Bid - {negotiationTarget.data.id}</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm mb-6 font-bold text-slate-600">
                <div>{negotiationTarget.data.route}</div>
                <div className="mt-1">Current L1: <span className="text-[#EA580C] text-lg font-black">₹{negotiationTarget.data.L1.toLocaleString('en-IN')}</span></div>
              </div>
              <div className="space-y-3 mb-6">
                <label className="text-xs font-bold text-slate-600 uppercase">Your Counter Bid</label>
                <input type="number" value={counterOffer} onChange={(e: any) => setCounterOffer(e.target.value)} placeholder="Amount (INR)" className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm font-bold outline-none focus:border-[#EA580C] shadow-inner" />
              </div>
              <button type="button" onClick={processBid} className="w-full bg-[#EA580C] text-white font-black text-sm py-4 rounded-xl hover:bg-orange-700 transition-all shadow-md cursor-pointer">Submit Bid</button>
            </div>
          </div>
        )}

        {/* CONTACT PAGE WITH CHATBOT & FAQ */}
        {activeView === 'contact' && (
          <div className="max-w-[1400px] mx-auto px-6 py-24 animate-fade-in relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="text-center mb-16 mt-8">
              <h2 className="text-5xl font-black text-slate-900 mb-6">Contact & Support</h2>
              <p className="text-xl text-slate-500 font-medium">We're here to help you 24/7 with your logistics needs.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 text-left">
              <div className="space-y-12">
                <div className="bg-[#0F172A] p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden hover:scale-[1.02] transition-transform cursor-default">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#EA580C] rounded-full blur-[100px] opacity-30"></div>
                  <PhoneCall className="h-16 w-16 text-[#EA580C] mb-6" />
                  <h3 className="text-3xl font-black mb-2">Call Our Helpdesk</h3>
                  <p className="text-slate-400 font-medium mb-8">Available Mon-Sat, 9 AM to 8 PM</p>
                  <div className="text-5xl font-black text-[#EA580C] tracking-tight">+91 82101 60012</div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-200">
                  <div className="flex items-center space-x-5 mb-8 pb-8 border-b border-slate-100">
                    <div className="bg-orange-50 p-4 rounded-full"><Bot className="h-10 w-10 text-[#EA580C]" /></div>
                    <div>
                      <h4 className="font-black text-2xl text-slate-900">Y2Wait AI Assistant</h4>
                      <p className="text-sm font-bold text-emerald-500 flex items-center mt-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Online Now</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-8 h-72 overflow-y-auto mb-8 space-y-4 border border-slate-100 shadow-inner">
                    <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm w-fit border border-slate-200">
                      <p className="text-base font-bold text-slate-700">Namaste! How can I help you today with your Y2Wait logistics?</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white border border-slate-300 rounded-2xl p-3 shadow-inner">
                    <input type="text" placeholder="Type your message..." className="flex-1 outline-none px-5 py-3 text-base font-bold text-slate-700" />
                    <button type="button" className="bg-[#EA580C] p-4 rounded-xl text-white hover:bg-orange-700 shadow-md transition-colors cursor-pointer"><Send className="h-6 w-6" /></button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-200 h-fit">
                <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center"><HelpCircle className="h-10 w-10 text-[#EA580C] mr-5" /> Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {[
                    { q: "How does Y2Wait 'Empowering Transporters' work?", a: "We empower transporters by removing middlemen. You connect directly with the shipper, meaning 100% of the negotiated fare goes to you." },
                    { q: "How to generate Safe QR?", a: "Go to your Profile Drawer > Security QR. Upload your DL, RC, and Permit. Once verified, a unique QR is generated to speed up highway police checks." },
                    { q: "How can I bid on Enterprise Loads?", a: "Register as a 'Corporate' or 'Transporter'. Go to the Enterprise Auctions tab in your dashboard, view active demands, and place your lowest competitive bid (L1)." },
                    { q: "What is Fleet Mandi?", a: "It's our group-buying marketplace. By combining the purchasing power of thousands of fleet owners, we negotiate wholesale prices for engine oil, tires, and spare parts." }
                  ].map((faq: any, i: number) => (
                    <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <summary className="p-6 font-black text-xl text-slate-800 cursor-pointer list-none flex justify-between items-center group-open:bg-orange-50 group-open:text-[#EA580C] transition-colors">
                        {faq.q}
                        <Plus className="h-6 w-6 group-open:rotate-45 transition-transform text-slate-400 group-open:text-[#EA580C]" />
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 font-medium text-lg leading-relaxed bg-orange-50">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OTHER FALLBACKS */}
        {(activeView === 'history' || activeView === 'settings') && (
          <div className="max-w-[800px] mx-auto px-6 py-24 text-center animate-fade-in relative z-10">
            <BackToDashboardBtn onClick={() => handlePageChange(isLoggedIn ? 'dashboard' : 'landing')} text={t("Back to Main Screen", "मुख्य स्क्रीन पर वापस")} />
            <div className="bg-white p-16 rounded-[3rem] border border-slate-200 shadow-2xl mt-10">
              <div className="h-28 w-28 bg-slate-50 border border-slate-100 rounded-full mx-auto flex items-center justify-center mb-10 shadow-inner"><Settings className="h-12 w-12 text-[#EA580C]" /></div>
              <h2 className="text-5xl font-black text-slate-900 mb-5 capitalize tracking-tight">{activeView.replace('_', ' ')} Module</h2>
              <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-xl mx-auto">This section is securely integrated into the backend architecture and requires appropriate permissions to view raw data.</p>
            </div>
          </div>
        )}

      </main>

      {/* --- MEGA FOOTER --- */}
      <footer className="bg-[#0B1120] text-slate-400 py-20 px-6 relative z-10 border-t-4 border-[#EA580C] mt-24 text-left">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handlePageChange('landing')}>
              <div className="bg-[#EA580C] p-2 rounded-xl text-white">
                <Truck className="h-7 w-7" />
              </div>
              <span className="text-3xl font-black text-white tracking-tight">Y2<span className="text-[#EA580C]">Wait</span></span>
            </div>
            <p className="text-sm font-medium leading-relaxed">Empowering Transporters. Pure Profits. India's Logistics Backbone built for scale and transparency.</p>
            <div className="flex space-x-4 pt-2">
              <span className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-[#EA580C] transition-all hover:scale-110 font-bold">f</span>
              <span className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-[#EA580C] transition-all hover:scale-110 font-bold">in</span>
              <span className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-[#EA580C] transition-all hover:scale-110 font-bold">X</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-xl tracking-wide">Company</h4>
            <ul className="space-y-5 text-base font-medium">
              <li><button type="button" onClick={() => handlePageChange('about')} className="hover:text-[#EA580C] transition-colors cursor-pointer">About Us</button></li>
              <li><button type="button" onClick={() => handlePageChange('support')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Contact Support</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 text-xl tracking-wide">Platform</h4>
            <ul className="space-y-5 text-base font-medium">
              <li><button type="button" onClick={() => handlePageChange('premium')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Pricing Plans</button></li>
              <li><button type="button" onClick={() => handlePageChange('services')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Services Hub</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black mb-8 text-xl tracking-wide">Newsletter</h4>
            <div className="flex border-2 border-slate-800 rounded-2xl overflow-hidden focus-within:border-[#EA580C] transition-colors bg-black/50 p-1">
              <input type="email" placeholder="Enter Email Address" className="bg-transparent px-6 py-4 text-base outline-none w-full text-white font-medium" />
              <button type="button" className="bg-[#EA580C] text-white px-8 text-sm font-black rounded-xl hover:bg-orange-700 transition-colors shadow-lg cursor-pointer">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-20 pt-10 border-t border-slate-800/50 text-sm flex flex-col md:flex-row justify-between items-center text-slate-500 font-bold">
          <p>Y2Wait Logistics Tech © {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}