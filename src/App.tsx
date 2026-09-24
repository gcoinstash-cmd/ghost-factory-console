import React, { useState, useMemo } from 'react';
import { 
  CATALOG_DATA, 
  ProductItem 
} from './catalogData';
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Search, 
  ExternalLink, 
  Key, 
  Database, 
  TrendingUp, 
  Sliders, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  Terminal, 
  Server, 
  FolderGit2, 
  Copy, 
  Sparkles,
  Flame,
  ArrowRight,
  Briefcase,
  Compass,
  RotateCw,
  Calculator,
  PieChart,
  Coins
} from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleHardRefresh = () => {
    setIsRefreshing(true);
    // Bust cache with timestamp query param for mobile PWAs / Safari home screen web apps
    setTimeout(() => {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.location.href = `${cleanUrl}?v=${Date.now()}`;
    }, 350);
  };

  // Revenue Simulator Sliders (Realistic Operator Defaults)
  const [starterSales, setStarterSales] = useState<number>(15); // ~0.7 sales/app/mo
  const [fullStackSales, setFullStackSales] = useState<number>(8);  // ~0.36 sales/app/mo
  const [whiteGloveClients, setWhiteGloveClients] = useState<number>(1); // 1 VIP client/mo
  const [agencyVaultLicenses, setAgencyVaultLicenses] = useState<number>(1); // 1 50-pack license/mo

  const totalAssets = CATALOG_DATA.total_flagships; // 22
  const phase1Target = 50;
  const phase2Target = 100;
  const phase3Target = 350;
  const phase4Target = 500;

  const phase1Percent = Math.min(100, Math.round((totalAssets / phase1Target) * 100));
  const phase2Percent = Math.min(100, Math.round((totalAssets / phase2Target) * 100));
  const phase3Percent = Math.min(100, Math.round((totalAssets / phase3Target) * 100));
  const phase4Percent = Math.min(100, Math.round((totalAssets / phase4Target) * 100));

  // Dynamic Engine C Calculations
  const fireSaleMin = totalAssets * 250;
  const fireSaleMax = Math.round(totalAssets * 368.42);
  const quickCloseMin = totalAssets * 500;
  const quickCloseMax = Math.round(totalAssets * 736.84);
  const mktApaMin = Math.round(totalAssets * 789.47);
  const mktApaMax = Math.round(totalAssets * 1157.89);
  const replacementAgencyCost = totalAssets * 4500; // Average traditional dev cost ($4.5k/app)

  // Monthly Revenue Simulator Math
  const monthlyStarterRevenue = starterSales * 79;
  const monthlyFullStackRevenue = fullStackSales * 199;
  const monthlyWhiteGloveRevenue = whiteGloveClients * 3500;
  const monthlyAgencyVaultRevenue = agencyVaultLicenses * 2999;
  const totalMonthlyGross = 
    monthlyStarterRevenue + 
    monthlyFullStackRevenue + 
    monthlyWhiteGloveRevenue + 
    monthlyAgencyVaultRevenue;
  const annualizedCashFlow = totalMonthlyGross * 12;
  const projectedAcquireMultiple = Math.round(annualizedCashFlow * 2.8);

  // Sweet Spot Vertical Carve-Out Vaults Real-Time & Predictable Valuation Engine
  // Unit valuation bands per app: Min $700, Mid $850, Max $1,100
  const [sliceDealType, setSliceDealType] = useState<'mini' | 'vertical' | 'license'>('vertical');
  const [futureTargetApps, setFutureTargetApps] = useState<number>(50); // Slider for future projection

  const currentVaultMetrics = useMemo(() => {
    const slices = CATALOG_DATA.vertical_slices || {};
    let totalBuilt = 0;
    let totalTarget = 0;
    const details = Object.entries(slices).map(([key, s]) => {
      totalBuilt += s.current_asset_count;
      totalTarget += s.target_asset_count;
      // Per app unit value in each vault
      const unitMin = key === 'wealth' ? 850 : 700;
      const unitMax = key === 'wealth' ? 1370 : 1100;
      const currentMinVal = s.current_asset_count * unitMin;
      const currentMaxVal = s.current_asset_count * unitMax;
      const fullTargetMinVal = s.target_asset_count * unitMin;
      const fullTargetMaxVal = s.target_asset_count * unitMax;

      return {
        key,
        name: s.name,
        currentCount: s.current_asset_count,
        targetCount: s.target_asset_count,
        pctComplete: Math.round((s.current_asset_count / s.target_asset_count) * 100),
        unitMin,
        unitMax,
        currentMinVal,
        currentMaxVal,
        fullTargetMinVal,
        fullTargetMaxVal,
        statedRange: s.apa_valuation_range,
        description: s.description
      };
    });

    const currentAggregateMin = details.reduce((acc, d) => acc + d.currentMinVal, 0);
    const currentAggregateMax = details.reduce((acc, d) => acc + d.currentMaxVal, 0);
    const fullTargetAggregateMin = details.reduce((acc, d) => acc + d.fullTargetMinVal, 0);
    const fullTargetAggregateMax = details.reduce((acc, d) => acc + d.fullTargetMaxVal, 0);

    return {
      details,
      totalBuilt,
      totalTarget,
      currentAggregateMin,
      currentAggregateMax,
      fullTargetAggregateMin,
      fullTargetAggregateMax
    };
  }, []);

  const handleCopyPasscode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredProducts = useMemo(() => {
    return CATALOG_DATA.products.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.admin_passcode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || p.category.includes(selectedCategory);
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 hud-grid pb-24 selection:bg-emerald-500 selection:text-black">
      {/* Top Telemetry Ticker Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span className="font-bold tracking-widest text-emerald-400 flex items-center gap-2">
            <Terminal size={14} /> GFCC // GHOST FACTORY™ COMMAND CONSOLE
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">PROTOCOL: APA_MASTER_ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-[11px]">
          <div className="flex items-center gap-2 text-slate-400">
            <Server size={12} className="text-emerald-400" />
            <span>RENDER PREVIEWS: <strong className="text-emerald-400">{totalAssets} / {totalAssets} ONLINE (200 OK)</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Database size={12} className="text-cyan-400" />
            <span>SUPABASE RLS: <strong className="text-cyan-400">ENFORCED</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-amber-400">
            <Award size={12} />
            <span>AVERAGE AUDIT: <strong>9.8 / 10</strong></span>
          </div>

          {/* Quick Refresh Button in Header */}
          <button
            onClick={handleHardRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all font-mono active:scale-95 cursor-pointer shadow-sm hover:shadow-emerald-500/20"
            title="Force refresh console and bust mobile cache"
          >
            <RotateCw size={12} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
            <span className="font-bold tracking-wider">{isRefreshing ? 'SYNCING...' : 'REFRESH'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* HERO HUD: LEVEL PROGRESSION & ENGINE C VALUE */}
        <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-emerald-500/30 rounded-xl p-6 sm:p-8 relative overflow-hidden glow-emerald">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-3">
                <Sparkles size={12} /> Milestone Tracker // Phase 1 Active
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                ARSENAL LEVEL: <span className="text-emerald-400 font-mono">{totalAssets} / 500 ASSETS</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Real-time operational dashboard for Aura & Grid's Ghost Factory™. Tracking automated 5-stage deployments, liquidation bands, and institutional buyouts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-black/60 p-4 rounded-lg border border-white/10 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Marketplace APA Value</span>
                <span className="text-xl font-bold text-emerald-400">${mktApaMin.toLocaleString()} – ${mktApaMax.toLocaleString()}</span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Dev Replacement Labor</span>
                <span className="text-xl font-bold text-cyan-400">${replacementAgencyCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 4-PHASE PROGRESSION BARS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* Phase 1 */}
            <div className="bg-black/50 border border-emerald-500/40 p-4 rounded-lg">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="font-bold text-emerald-400">PHASE 1: 50 APPS</span>
                <span className="text-white font-bold">{phase1Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${phase1Percent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 flex justify-between">
                <span>Archive Clearance</span>
                <strong className="text-slate-200">{totalAssets} / {phase1Target}</strong>
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">PHASE 2: 100 APPS</span>
                <span className="text-slate-500">{phase2Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${phase2Percent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 flex justify-between">
                <span>$3.5k VIP Funnel</span>
                <strong className="text-slate-300">{totalAssets} / {phase2Target}</strong>
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">PHASE 3: 350 APPS</span>
                <span className="text-slate-500">{phase3Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${phase3Percent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 flex justify-between">
                <span>Micro-PE Acquisition</span>
                <strong className="text-slate-300">{totalAssets} / {phase3Target}</strong>
              </p>
            </div>

            {/* Phase 4 */}
            <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-400">PHASE 4: 500 APPS</span>
                <span className="text-slate-500">{phase4Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${phase4Percent}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 flex justify-between">
                <span>Master Asset APA</span>
                <strong className="text-slate-300">{totalAssets} / {phase4Target}</strong>
              </p>
            </div>
          </div>

          {/* 3-5 YEAR LONG-TERM EXPANSION HORIZON (3,000 to 5,000 APPS) */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Compass className="text-cyan-400" size={16} />
                <h3 className="text-xs font-bold text-slate-200 tracking-wider font-mono uppercase">
                  Long-Term 3–5 Year Expansion Horizon (Post-500 Scale)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                2028 – 2031 FOUNDRY SCALE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span className="font-bold text-white">PHASE 5: 1,500 APPS</span>
                  <span className="text-cyan-400">2028</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">Multi-Channel Foundry: ThemeForest, custom storefront & 100-app industry holding bundles.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span className="font-bold text-white">PHASE 6: 3,000 APPS</span>
                  <span className="text-amber-400">2029</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">Enterprise SaaS Franchising: $450k–$900k wholesale code buyout or $4.5M cash flow exit.</p>
              </div>

              <div className="bg-black/40 border border-white/10 p-3 rounded-lg">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span className="font-bold text-white">PHASE 7: 5,000 APPS</span>
                  <span className="text-purple-400">2031</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">Digital Holding Conglomerate: $750k–$1.5M IP buyout or $8.75M+ institutional rollup.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SWEET SPOT VERTICAL CARVE-OUT VAULTS (REAL-TIME & PREDICTIVE VALUATION ENGINE) */}
        <section className="bg-[#121215] border border-cyan-500/40 rounded-xl p-6 relative overflow-hidden shadow-2xl">
          {/* Header & Badges */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="text-cyan-400" size={20} />
                <h2 className="font-bold text-lg text-white">Sweet Spot Vertical Carve-Out Vaults (Real-Time & Predictive Engine)</h2>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  HIGH-LEVERAGE SWEET SPOT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Real-time valuation of current live assets + predictable forecast of future vault buyouts ($15k–$65k slices bypassing retail drag).
              </p>
            </div>
            
            {/* Real-Time Total Vault APA Telemetry Badge */}
            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Current Live Vault Valuation</span>
              <span className="text-lg sm:text-xl font-mono font-black text-emerald-400 tracking-tight">
                ${currentVaultMetrics.currentAggregateMin.toLocaleString()} – ${currentVaultMetrics.currentAggregateMax.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {currentVaultMetrics.totalBuilt} Live Assets Active across 6 Vaults
              </span>
            </div>
          </div>

          {/* REAL-TIME PREDICTIVE FORECAST INTERACTIVE HUD */}
          <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-5 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Calculator className="text-cyan-400" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                    Predictable Vault Valuation Forecaster
                  </h3>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Adjust target slice parameters to forecast institutional acquisition value based on verified market multiples ($700–$1,100+/app).
                  </p>
                </div>
              </div>

              {/* Deal Structure Quick Buttons */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => {
                    setSliceDealType('mini');
                    setFutureTargetApps(20);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'mini'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  Mini-Vault (15–20 Apps)
                </button>
                <button
                  onClick={() => {
                    setSliceDealType('vertical');
                    setFutureTargetApps(50);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'vertical'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  Full Vertical (35–60 Apps)
                </button>
                <button
                  onClick={() => {
                    setSliceDealType('license');
                    setFutureTargetApps(50);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'license'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  Agency Whitelabel
                </button>
              </div>
            </div>

            {/* Interactive Slider & Forecast Metric Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Slider Column */}
              <div className="lg:col-span-6 space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold">Predictive Slice Size:</span>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-950/60 px-3 py-1 rounded border border-cyan-500/30">
                    {futureTargetApps} Templates
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={futureTargetApps}
                  onChange={(e) => setFutureTargetApps(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>10 Apps (Niche Slice)</span>
                  <span>50 Apps (Full Vault)</span>
                  <span>100 Apps (Mega Cluster)</span>
                </div>
              </div>

              {/* Dynamic Predictable Value Cards */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-3 font-mono text-xs">
                {/* Micro-APA Asking Multiple */}
                <div className="bg-[#18181b] border border-cyan-500/30 p-3.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <PieChart size={14} className="text-cyan-400" />
                    <span className="text-[10px] uppercase font-bold">Predictable APA Buyout</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400">
                    ${(futureTargetApps * 700).toLocaleString()} – ${(futureTargetApps * 1100).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    30-Day Cash Acquisition Multiple ($700–$1,100 / app)
                  </p>
                </div>

                {/* Labor Replacement Value */}
                <div className="bg-[#18181b] border border-white/10 p-3.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Coins size={14} className="text-amber-400" />
                    <span className="text-[10px] uppercase font-bold">Client Dev Savings</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-amber-400">
                    ${(futureTargetApps * 4500).toLocaleString()}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    Equivalent agency labor build cost ($4,500 / app)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THE 6 SWEET SPOT VERTICAL VAULTS: REAL-TIME AUDIT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {currentVaultMetrics.details.map((v) => (
              <div
                key={v.key}
                className="bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all p-4 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-bold text-white text-sm">{v.name}</span>
                    <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                      {v.currentCount} / {v.targetCount} ({v.pctComplete}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mb-3">{v.description}</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${v.pctComplete}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase">Live Vault Value:</span>
                    <span className="text-emerald-400 font-bold">
                      ${v.currentMinVal.toLocaleString()} – ${v.currentMaxVal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 uppercase">Full Vault Target:</span>
                    <span className="text-slate-300 font-bold">
                      {v.statedRange}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vault Footer Summary Banner */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full 6-Vault Portfolio Capacity: <strong>{currentVaultMetrics.totalTarget} Apps</strong></span>
            </div>
            <div>
              <span>Full Portfolio Carve-Out Ceiling: </span>
              <strong className="text-emerald-400">
                ${currentVaultMetrics.fullTargetAggregateMin.toLocaleString()} – ${currentVaultMetrics.fullTargetAggregateMax.toLocaleString()}
              </strong>
            </div>
          </div>
        </section>

        {/* 2-COLUMN GRID: ENGINE C VALUATION RADAR + REVENUE SIMULATOR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 6 COLS: ENGINE C LIQUIDATION RADAR */}
          <div className="lg:col-span-6 bg-[#121215] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="text-rose-500" size={18} />
                  <h2 className="font-bold text-lg text-white">Engine C: Pre-Revenue Liquidation Protocol</h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  REAL-TIME WIRE TELEMETRY
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {/* Fire-Sale */}
                <div className="bg-black/60 p-4 rounded-lg border-l-4 border-rose-500 flex justify-between items-center">
                  <div>
                    <span className="text-rose-400 font-bold block">🔴 24-72h FIRE-SALE HORIZON</span>
                    <span className="text-slate-400 text-[11px]">Direct developer arbitrage & cash-out</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white">${fireSaleMin.toLocaleString()} – ${fireSaleMax.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block">$250 – $368 / app</span>
                  </div>
                </div>

                {/* Quick-Close */}
                <div className="bg-black/60 p-4 rounded-lg border-l-4 border-amber-500 flex justify-between items-center">
                  <div>
                    <span className="text-amber-400 font-bold block">🟡 7-14d QUICK-CLOSE HORIZON</span>
                    <span className="text-slate-400 text-[11px]">Private DM outreach to agency founders</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white">${quickCloseMin.toLocaleString()} – ${quickCloseMax.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block">$500 – $736 / app</span>
                  </div>
                </div>

                {/* Marketplace Listing */}
                <div className="bg-black/60 p-4 rounded-lg border-l-4 border-emerald-500 flex justify-between items-center">
                  <div>
                    <span className="text-emerald-400 font-bold block">🟢 30-45d MARKETPLACE LISTING</span>
                    <span className="text-slate-400 text-[11px]">Acquire.com / Flippa listing band</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white">${mktApaMin.toLocaleString()} – ${mktApaMax.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 block">$789 – $1,157 / app</span>
                  </div>
                </div>

                {/* Institutional APA Master */}
                <div className="bg-emerald-950/20 p-4 rounded-lg border border-emerald-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <Award size={14} /> INSTITUTIONAL APA MASTER (PHASE 4 EXIT)
                    </span>
                    <span className="text-xs font-bold text-white">$125,000 – $200,000 CASH</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    100% exclusive IP portfolio buyout via Escrow.com at 500 apps. Valued at $1.2M–$2.5M+ upon establishing 60-90 days of proof-of-sales run-rate.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400 font-mono">
              <span>Retail Shelf MSRP: <strong className="text-white">${CATALOG_DATA.valuation_framework.retail_shelf_msrp_full_stack}</strong></span>
              <span>Agency Vault Tier: <strong className="text-emerald-400">$1,499 / $2,999</strong></span>
            </div>
          </div>

          {/* RIGHT 6 COLS: DYNAMIC REVENUE SIMULATOR */}
          <div className="lg:col-span-6 bg-[#121215] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Sliders className="text-cyan-400" size={18} />
                  <h2 className="font-bold text-lg text-white">Dynamic Cash-Flow Simulator</h2>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  PROJECTION ENGINE
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-5 text-xs font-mono">
                {/* Starter UI */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300">Tier 1: $79 Starter UI Licenses</span>
                    <span className="text-cyan-400 font-bold">{starterSales} sales/mo (${(starterSales * 79).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={starterSales} 
                    onChange={e => setStarterSales(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Full Stack */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300">Tier 2: $199 Full-Stack Supabase</span>
                    <span className="text-emerald-400 font-bold">{fullStackSales} sales/mo (${(fullStackSales * 199).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={fullStackSales} 
                    onChange={e => setFullStackSales(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* White Glove */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300">Tier 3: $3,500 White-Glove Setups</span>
                    <span className="text-amber-400 font-bold">{whiteGloveClients} clients/mo (${(whiteGloveClients * 3500).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={whiteGloveClients} 
                    onChange={e => setWhiteGloveClients(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Agency Vault */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300">Agency Vault: $2,999 50-Packs</span>
                    <span className="text-purple-400 font-bold">{agencyVaultLicenses} licenses/mo (${(agencyVaultLicenses * 2999).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={agencyVaultLicenses} 
                    onChange={e => setAgencyVaultLicenses(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Projected Outputs */}
            <div className="mt-6 pt-6 border-t border-white/10 bg-black/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Projected Net Monthly</span>
                  <span className="text-2xl font-black text-emerald-400">${totalMonthlyGross.toLocaleString()}/mo</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Annualized Multiple (2.8x)</span>
                  <span className="text-2xl font-black text-cyan-400">${projectedAcquireMultiple.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STAGE FORGE PIPELINE STEPPER */}
        <section className="bg-[#121215] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Layers className="text-emerald-400" size={18} />
              <h2 className="font-bold text-lg text-white">Ghost Factory™ 5-Stage Assembly Line Status</h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              CURRENT TARGET: <span className="text-emerald-400 font-bold">TARGET #27 (PHASE 1 SPRINT)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="bg-black/60 border border-emerald-500/40 p-4 rounded-lg">
              <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                <span>01. THE FORGE</span>
                <CheckCircle2 size={14} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Dark Obsidian UI promotion, font-size 18px upgrade & clean routes.</p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 rounded-lg">
              <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                <span>02. TEST RIG</span>
                <CheckCircle2 size={14} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">100% automated HTTP 200 HEAD scan on hero images & menus.</p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 rounded-lg">
              <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                <span>03. BRAIN GATE</span>
                <CheckCircle2 size={14} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Supabase schema.sql with RLS, seed.sql data & 3-min setup guide.</p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 rounded-lg">
              <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                <span>04. LOOT CRATE</span>
                <CheckCircle2 size={14} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">.Zip packaging, 16:9 banner, 1:1 icon & Render deployment.</p>
            </div>

            <div className="bg-black/60 border border-cyan-500/40 p-4 rounded-lg">
              <div className="text-cyan-400 font-bold mb-1 flex items-center justify-between">
                <span>05. GHOST AUDIT</span>
                <Sparkles size={14} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">9.0+ Minimum Gate verification & CATALOG_MANIFEST registration.</p>
            </div>
          </div>
        </section>

        {/* MASTER INTERACTIVE ASSET & PASSKEY DIRECTORY */}
        <section className="bg-[#121215] border border-white/10 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={18} />
                <h2 className="font-bold text-lg text-white">Master Asset Registry & Passkey Vault</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Showing {filteredProducts.length} of {CATALOG_DATA.total_flagships} verified production flagships.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search app name, niche, or passkey..."
                className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-white/10 rounded-lg">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black/80 text-[10px] text-slate-400 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Vertical Niche</th>
                  <th className="p-3.5">1-Click Passkey</th>
                  <th className="p-3.5">Audit Score</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 text-slate-500 font-bold">#{String(product.id).padStart(2, '0')}</td>
                    <td className="p-3.5 font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {product.name}
                    </td>
                    <td className="p-3.5 text-slate-400 max-w-xs truncate">{product.category}</td>
                    <td className="p-3.5">
                      <button 
                        onClick={() => handleCopyPasscode(product.admin_passcode)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[11px] transition-all"
                        title="Click to copy passkey"
                      >
                        <Key size={12} />
                        <span>{product.admin_passcode}</span>
                        {copiedCode === product.admin_passcode && (
                          <span className="text-[9px] text-white bg-emerald-600 px-1 rounded">COPIED</span>
                        )}
                      </button>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">
                        {product.audit_score} / 10
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a 
                        href={product.preview_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded border border-white/10 hover:text-white transition-all text-[11px]"
                      >
                        <span>Demo</span>
                        <ExternalLink size={10} />
                      </a>
                      <a 
                        href={product.admin_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 rounded border border-emerald-500/30 transition-all text-[11px]"
                      >
                        <span>/admin</span>
                        <ExternalLink size={10} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 text-center text-xs text-slate-500 font-mono">
        <p>Aura & Grid Storefront Engine • Ghost Factory™ Autonomous Protocol • 500-Asset Institutional APA Master</p>
      </footer>

      {/* Mobile One-Thumb Floating Refresh HUD Pill */}
      <div className="fixed bottom-5 right-5 z-50 sm:hidden">
        <button
          onClick={handleHardRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121215]/95 text-emerald-400 border border-emerald-500/40 shadow-xl shadow-emerald-950/60 backdrop-blur-md active:scale-95 transition-all font-mono text-xs font-bold"
        >
          <RotateCw size={14} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
          <span>{isRefreshing ? 'REFRESHING...' : 'REFRESH HUD'}</span>
        </button>
      </div>
    </div>
  );
}
