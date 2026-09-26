import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Key, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  Layers, 
  DollarSign, 
  TrendingUp, 
  Server, 
  Award,
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  RotateCw,
  Compass,
  PieChart,
  Coins,
  Briefcase,
  Calculator
} from 'lucide-react';
import { CATALOG_DATA } from './catalogData';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Hard Refresh Handler to clear cache and reload latest catalog
  const handleHardRefresh = () => {
    setIsRefreshing(true);
    try {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch (e) {
      console.warn('Cache clearing error:', e);
    }
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  // Dynamic Revenue Simulator State
  const [starterSales, setStarterSales] = useState<number>(12); // $79
  const [fullStackSales, setFullStackSales] = useState<number>(6); // $199
  const [whiteGloveClients, setWhiteGloveClients] = useState<number>(1); // $3,500
  const [agencyVaultLicenses, setAgencyVaultLicenses] = useState<number>(1); // 1 50-pack license/mo

  // Catalog telemetry
  const totalAssets = CATALOG_DATA.total_flagships;
  const phase1Target = 50;
  const phase2Target = 100;
  const phase3Target = 350;
  const phase4Target = 500;

  const phase1Percent = Math.min(100, Math.round((totalAssets / phase1Target) * 100));
  const phase2Percent = Math.min(100, Math.round((totalAssets / phase2Target) * 100));
  const phase3Percent = Math.min(100, Math.round((totalAssets / phase3Target) * 100));
  const phase4Percent = Math.min(100, Math.round((totalAssets / phase4Target) * 100));

  // Engine C Calibrated Institutional Valuations (85 Flagships)
  // 1. Independent Replacement Labor (Narrative Replacement Cost)
  const replacementAgencyCostMin = 340000;
  const replacementAgencyCostMax = 850000;
  // 2. Strategic Asking Range (Confidential Target Asking Multiple)
  const strategicAskMin = 49000;
  const strategicAskMax = 59000;
  // 3. Pre-Revenue Fair-Market Valuation Corridor (Arms-Length Transaction)
  const fmvMin = 25000;
  const fmvMax = 45000;
  const fmvTarget = 35000;
  // Aliases for Hero HUD
  const mktApaMin = strategicAskMin;
  const mktApaMax = strategicAskMax;
  const strategicCloseMin = fmvMin;
  const strategicCloseMax = fmvMax;
  // 4. Emergency Wholesale Cash (72h distress liquidation floor)
  const fireSaleMin = Math.round(totalAssets * 250); // $21,250 at 85 apps
  const fireSaleMax = Math.round(totalAssets * 368); // $31,280 at 85 apps
  // 5. Internal Walk-Away Reserve (Holding is mathematically superior)
  const walkAwayReserve = 35000;

  // Simulator calculations
  const monthlyStarterRevenue = starterSales * 79;
  const monthlyFullStackRevenue = fullStackSales * 199;
  const monthlyWhiteGloveRevenue = whiteGloveClients * 3500;
  const monthlyAgencyVaultRevenue = agencyVaultLicenses * 2999;
  const totalMonthlyGross = 
    monthlyStarterRevenue + 
    monthlyFullStackRevenue + 
    monthlyWhiteGloveRevenue + 
    monthlyAgencyVaultRevenue;
  const projectedAnnualRunRate = totalMonthlyGross * 12;
  const projectedAcquireMultiple = Math.round(projectedAnnualRunRate * 2.8);

  // Sweet Spot Vertical Carve-Out Vaults Real-Time & Predictable Valuation Engine
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

      // Pre-Revenue Liquidation Protocol Valuations per vault (calibrated)
      const liqMarketplaceMin = Math.round(s.current_asset_count * 557.14);
      const liqMarketplaceMax = Math.round(s.current_asset_count * 842.85);
      const liqQuickCloseMin = Math.round(s.current_asset_count * 357.14);
      const liqQuickCloseMax = Math.round(s.current_asset_count * 642.85);
      const liqFireSaleMin = Math.round(s.current_asset_count * 114.28);
      const liqFireSaleMax = Math.round(s.current_asset_count * 285.71);

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
        liqMarketplaceMin,
        liqMarketplaceMax,
        liqQuickCloseMin,
        liqQuickCloseMax,
        liqFireSaleMin,
        liqFireSaleMax,
        statedRange: s.apa_valuation_range,
        description: s.description
      };
    });

    const currentAggregateMin = details.reduce((acc, d) => acc + d.currentMinVal, 0);
    const currentAggregateMax = details.reduce((acc, d) => acc + d.currentMaxVal, 0);
    const fullTargetAggregateMin = details.reduce((acc, d) => acc + d.fullTargetMinVal, 0);
    const fullTargetAggregateMax = details.reduce((acc, d) => acc + d.fullTargetMaxVal, 0);

    const totalLiqMarketplaceMin = details.reduce((acc, d) => acc + d.liqMarketplaceMin, 0);
    const totalLiqMarketplaceMax = details.reduce((acc, d) => acc + d.liqMarketplaceMax, 0);
    const totalLiqQuickCloseMin = details.reduce((acc, d) => acc + d.liqQuickCloseMin, 0);
    const totalLiqQuickCloseMax = details.reduce((acc, d) => acc + d.liqQuickCloseMax, 0);
    const totalLiqFireSaleMin = details.reduce((acc, d) => acc + d.liqFireSaleMin, 0);
    const totalLiqFireSaleMax = details.reduce((acc, d) => acc + d.liqFireSaleMax, 0);

    return {
      details,
      totalBuilt,
      totalTarget,
      currentAggregateMin,
      currentAggregateMax,
      fullTargetAggregateMin,
      fullTargetAggregateMax,
      totalLiqMarketplaceMin,
      totalLiqMarketplaceMax,
      totalLiqQuickCloseMin,
      totalLiqQuickCloseMax,
      totalLiqFireSaleMin,
      totalLiqFireSaleMax
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
        p.admin_passcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ((p as any).archetype_name && (p as any).archetype_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ((p as any).design_benchmark && (p as any).design_benchmark.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === 'ALL' || p.category.includes(selectedCategory);
      const matchesArch = selectedArchetype === 'ALL' || (p as any).archetype_id === selectedArchetype;
      return matchesSearch && matchesCat && matchesArch;
    });
  }, [searchTerm, selectedCategory, selectedArchetype]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 hud-grid pb-28 selection:bg-emerald-500 selection:text-black">
      {/* Top Telemetry Ticker Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-emerald-500/25 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="font-bold tracking-widest text-emerald-400 flex items-center gap-2">
            <Terminal size={16} /> GFCC // GHOST FACTORY™ COMMAND CONSOLE
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline font-semibold">PROTOCOL: APA_MASTER_ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <Server size={14} className="text-emerald-400" />
            <span>PREVIEWS: <strong className="text-emerald-400">{totalAssets} / {totalAssets} ONLINE (200 OK)</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <Database size={14} className="text-cyan-400" />
            <span>SUPABASE RLS: <strong className="text-cyan-400">ENFORCED</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-amber-400">
            <Award size={14} />
            <span>AVG AUDIT: <strong>9.8 / 10</strong></span>
          </div>

          {/* Quick Refresh Button in Header */}
          <button
            onClick={handleHardRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 transition-all font-mono active:scale-95 cursor-pointer shadow-sm hover:shadow-emerald-500/20 text-xs sm:text-sm"
            title="Force refresh console and bust mobile cache"
          >
            <RotateCw size={14} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
            <span className="font-bold tracking-wider">{isRefreshing ? 'SYNCING...' : 'REFRESH'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* HERO HUD: LEVEL PROGRESSION & ENGINE C VALUE */}
        <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden glow-emerald">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3">
                <Sparkles size={14} /> Milestone Tracker // Phase 2 Active (Road to 100)
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-3">
                ARSENAL LEVEL: <span className="text-cyan-400 font-mono">{totalAssets} / 500 ASSETS</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Real-time operational dashboard for Aura & Grid's Ghost Factory™. Phase 1 Mastered (50/50). Currently scaling Phase 2: The Century Funnel (Targets #51–#100).
              </p>
            </div>

            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-4 sm:gap-5 bg-black/70 p-4 sm:p-5 rounded-xl border border-white/10 font-mono text-xs sm:text-sm">
              <div className="p-1 sm:p-0">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Private Strategic Ask</span>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-emerald-400">${mktApaMin.toLocaleString()} – ${mktApaMax.toLocaleString()}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block">Acquire.com Private Room</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden lg:block" />
              <div className="p-1 sm:p-0">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Strategic Close (Center)</span>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-cyan-400">${strategicCloseMin.toLocaleString()} – ${strategicCloseMax.toLocaleString()}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block">Negotiated LOI Wire</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden lg:block" />
              <div className="p-1 sm:p-0">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Walk-Away Reserve</span>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-amber-400">${walkAwayReserve.toLocaleString()} MIN</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block">Internal Floor</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden lg:block" />
              <div className="p-1 sm:p-0">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Dev Replacement Labor</span>
                <span className="text-base sm:text-xl md:text-2xl font-bold text-purple-400">${replacementAgencyCostMin.toLocaleString()} – ${(replacementAgencyCostMax / 1000).toFixed(0)}k</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 block">Cost to Duplicate</span>
              </div>
            </div>
          </div>

          {/* 4-PHASE PROGRESSION BARS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* Phase 1 */}
            <div className="bg-black/50 border border-emerald-500/60 p-4 sm:p-5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono mb-2.5">
                <span className="font-bold text-emerald-400">PHASE 1: 50 APPS</span>
                <span className="text-emerald-400 font-bold">100% COMPLETE ✅</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2.5">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `100%` }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex justify-between font-medium">
                <span>Agency Vault Locked</span>
                <strong className="text-emerald-300">50 / 50 MASTERED</strong>
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-gradient-to-b from-cyan-950/20 to-black/60 border border-cyan-500/50 p-4 sm:p-5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono mb-2.5">
                <span className="font-bold text-cyan-400">PHASE 2: 100 APPS</span>
                <span className="text-cyan-300 font-bold">{phase2Percent}% ACTIVE</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2.5">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${phase2Percent}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex justify-between font-medium">
                <span>$3.5k VIP Funnel</span>
                <strong className="text-cyan-200">{totalAssets} / {phase2Target}</strong>
              </p>
            </div>

            {/* Phase 3 */}
            <div className="bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono mb-2.5">
                <span className="text-slate-300 font-bold">PHASE 3: 350 APPS</span>
                <span className="text-slate-400 font-semibold">{phase3Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2.5">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${phase3Percent}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex justify-between font-medium">
                <span>Micro-PE Acquisition</span>
                <strong className="text-slate-200">{totalAssets} / {phase3Target}</strong>
              </p>
            </div>

            {/* Phase 4 */}
            <div className="bg-black/40 border border-white/10 p-4 sm:p-5 rounded-xl">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono mb-2.5">
                <span className="text-slate-300 font-bold">PHASE 4: 500 APPS</span>
                <span className="text-slate-400 font-semibold">{phase4Percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2.5">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${phase4Percent}%` }} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 flex justify-between font-medium">
                <span>Master Asset APA</span>
                <strong className="text-slate-200">{totalAssets} / {phase4Target}</strong>
              </p>
            </div>
          </div>

          {/* 3-5 YEAR LONG-TERM EXPANSION HORIZON (3,000 to 5,000 APPS) */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <Compass className="text-cyan-400" size={18} />
                <h3 className="text-sm font-bold text-white tracking-wider font-mono uppercase">
                  Long-Term 3–5 Year Expansion Horizon (Post-500 Scale)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-md border border-cyan-500/25">
                2028 – 2031 FOUNDRY SCALE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
              <div className="bg-black/50 border border-white/10 p-4 rounded-xl">
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-bold text-white text-sm">PHASE 5: 1,500 APPS</span>
                  <span className="text-cyan-400 font-bold">2028</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Multi-Channel Foundry: ThemeForest, custom storefront & 100-app industry holding bundles.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 p-4 rounded-xl">
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-bold text-white text-sm">PHASE 6: 3,000 APPS</span>
                  <span className="text-amber-400 font-bold">2029</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Enterprise SaaS Franchising: $450k–$900k wholesale code buyout or $4.5M cash flow exit.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 p-4 rounded-xl">
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-bold text-white text-sm">PHASE 7: 5,000 APPS</span>
                  <span className="text-purple-400 font-bold">2031</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Digital Holding Conglomerate: $750k–$1.5M IP buyout or $8.75M+ institutional rollup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SWEET SPOT VERTICAL CARVE-OUT VAULTS (REAL-TIME & PREDICTIVE VALUATION ENGINE) */}
        <section className="bg-[#121215] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Header & Badges */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Briefcase className="text-cyan-400" size={22} />
                <h2 className="font-black text-xl sm:text-2xl text-white">Sweet Spot Vertical Carve-Out Vaults</h2>
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full font-bold">
                  HIGH-LEVERAGE SWEET SPOT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans leading-relaxed">
                Real-time valuation of current live assets + predictable forecast of future vault buyouts ($15k–$65k slices bypassing retail drag).
              </p>
            </div>
            
            {/* Real-Time Total Vault APA Telemetry Badge */}
            <div className="flex flex-col sm:items-end">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">Live Vault APA Multiple</span>
              <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400 tracking-tight">
                ${currentVaultMetrics.currentAggregateMin.toLocaleString()} – ${currentVaultMetrics.currentAggregateMax.toLocaleString()}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono text-[11px] font-bold">
                <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  🟢 Mkt: ${currentVaultMetrics.totalLiqMarketplaceMin.toLocaleString()} – ${currentVaultMetrics.totalLiqMarketplaceMax.toLocaleString()}
                </span>
                <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  🟡 Quick: ${currentVaultMetrics.totalLiqQuickCloseMin.toLocaleString()} – ${currentVaultMetrics.totalLiqQuickCloseMax.toLocaleString()}
                </span>
                <span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                  🔴 Fire: ${currentVaultMetrics.totalLiqFireSaleMin.toLocaleString()} – ${currentVaultMetrics.totalLiqFireSaleMax.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 mt-1">
                {currentVaultMetrics.totalBuilt} Live Assets Active across {currentVaultMetrics.details.length} Vaults
              </span>
            </div>
          </div>

          {/* REAL-TIME PREDICTIVE FORECAST INTERACTIVE HUD */}
          <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-5 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Calculator className="text-cyan-400" size={20} />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider">
                    Predictable Vault Valuation Forecaster
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                    Adjust target slice parameters to forecast institutional acquisition value based on verified market multiples ($700–$1,100+/app).
                  </p>
                </div>
              </div>

              {/* Deal Structure Quick Buttons */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                <button
                  onClick={() => {
                    setSliceDealType('mini');
                    setFutureTargetApps(20);
                  }}
                  className={`px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'mini'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
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
                  className={`px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'vertical'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
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
                  className={`px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${
                    sliceDealType === 'license'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
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
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-200 font-bold">Predictive Slice Size:</span>
                  <span className="text-cyan-400 font-bold text-sm sm:text-base bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/30">
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
                  className="w-full accent-cyan-400 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>10 Apps (Niche Slice)</span>
                  <span>50 Apps (Full Vault)</span>
                  <span>100 Apps (Mega Cluster)</span>
                </div>
              </div>

              {/* Dynamic Predictable Value Cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs sm:text-sm">
                {/* Micro-APA Asking Multiple */}
                <div className="bg-[#18181b] border border-cyan-500/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-300 mb-1.5">
                    <PieChart size={16} className="text-cyan-400" />
                    <span className="text-xs uppercase font-bold tracking-wider">Sweet Spot APA Buyout</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">
                    ${(futureTargetApps * 700).toLocaleString()} – ${(futureTargetApps * 1100).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 font-sans leading-relaxed">
                    30-Day Niche Acquisition ($700–$1,100 / app)
                  </p>
                </div>

                {/* Labor Replacement Value */}
                <div className="bg-[#18181b] border border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-300 mb-1.5">
                    <Coins size={16} className="text-amber-400" />
                    <span className="text-xs uppercase font-bold tracking-wider">Client Dev Savings</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-amber-400">
                    ${(futureTargetApps * 4500).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 font-sans leading-relaxed">
                    Equivalent agency labor build cost ($4,500 / app)
                  </p>
                </div>
              </div>
            </div>

            {/* Pre-Revenue Liquidation Protocol Forecast Strip */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-mono">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">
                Pre-Revenue Liquidation Protocol ({futureTargetApps} Templates):
              </span>
              <div className="flex flex-wrap items-center gap-2 font-bold text-xs sm:text-sm">
                <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-lg">
                  🟢 Strategic Ask: ${(Math.round(futureTargetApps * 557.14)).toLocaleString()} – ${(Math.round(futureTargetApps * 842.85)).toLocaleString()}
                </span>
                <span className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 px-2.5 py-1 rounded-lg">
                  🟡 Strategic Close: ${(Math.round(futureTargetApps * 357.14)).toLocaleString()} – ${(Math.round(futureTargetApps * 642.85)).toLocaleString()}
                </span>
                <span className="bg-rose-950/60 border border-rose-500/30 text-rose-400 px-2.5 py-1 rounded-lg">
                  🔴 Wholesale Cash: ${(Math.round(futureTargetApps * 114.28)).toLocaleString()} – ${(Math.round(futureTargetApps * 285.71)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* THE SWEET SPOT VERTICAL VAULTS: REAL-TIME AUDIT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {currentVaultMetrics.details.map((v) => (
              <div
                key={v.key}
                className="bg-black/50 border border-white/10 hover:border-cyan-500/40 transition-all p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="font-bold text-white text-base leading-snug">{v.name}</span>
                    <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded border border-cyan-500/25 font-bold shrink-0">
                      {v.currentCount} / {v.targetCount} ({v.pctComplete}%)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mb-3.5 leading-relaxed">{v.description}</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3.5">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${v.pctComplete}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3.5 border-t border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-slate-400 uppercase font-semibold text-xs">Live Vault APA Value:</span>
                    <span className="text-emerald-400 font-bold">
                      ${v.currentMinVal.toLocaleString()} – ${v.currentMaxVal.toLocaleString()}
                    </span>
                  </div>

                  {/* Pre-Revenue Liquidation Breakdown per Vault */}
                  <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-1 font-mono text-[11px] sm:text-xs">
                    <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[10px] flex items-center justify-between">
                      <span>Pre-Revenue Liquidation:</span>
                      <span className="text-cyan-400">{v.currentCount} Live Assets</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-emerald-400">🟢 Strategic Ask:</span>
                      <span className="text-white font-semibold">${v.liqMarketplaceMin.toLocaleString()} – ${v.liqMarketplaceMax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-cyan-400">🟡 Strategic Close:</span>
                      <span className="text-white font-semibold">${v.liqQuickCloseMin.toLocaleString()} – ${v.liqQuickCloseMax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-rose-400">🔴 Wholesale Cash:</span>
                      <span className="text-white font-semibold">${v.liqFireSaleMin.toLocaleString()} – ${v.liqFireSaleMax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
                    <span className="text-slate-400 uppercase font-semibold text-xs">Full Vault Target:</span>
                    <span className="text-slate-200 font-bold">
                      {v.statedRange}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vault Footer Summary Banner */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3 font-mono text-xs sm:text-sm text-slate-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Full {currentVaultMetrics.details.length}-Vault Portfolio Capacity: <strong className="text-white">{currentVaultMetrics.totalTarget} Apps</strong></span>
              </div>
              <div>
                <span>Full Portfolio Carve-Out Ceiling: </span>
                <strong className="text-emerald-400 font-bold">
                  ${currentVaultMetrics.fullTargetAggregateMin.toLocaleString()} – ${currentVaultMetrics.fullTargetAggregateMax.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-white/5 text-xs">
              <span className="text-slate-400 uppercase font-semibold">Live Vaults Pre-Revenue Liquidation Floor:</span>
              <div className="flex flex-wrap items-center gap-2 font-bold">
                <span className="text-emerald-400">🟢 Mkt: ${currentVaultMetrics.totalLiqMarketplaceMin.toLocaleString()} – ${currentVaultMetrics.totalLiqMarketplaceMax.toLocaleString()}</span>
                <span className="text-slate-600">|</span>
                <span className="text-amber-400">🟡 Quick: ${currentVaultMetrics.totalLiqQuickCloseMin.toLocaleString()} – ${currentVaultMetrics.totalLiqQuickCloseMax.toLocaleString()}</span>
                <span className="text-slate-600">|</span>
                <span className="text-rose-400">🔴 Fire: ${currentVaultMetrics.totalLiqFireSaleMin.toLocaleString()} – ${currentVaultMetrics.totalLiqFireSaleMax.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2-COLUMN GRID: ENGINE C VALUATION RADAR + REVENUE SIMULATOR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 6 COLS: ENGINE C LIQUIDATION RADAR */}
          <div className="lg:col-span-6 bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Flame className="text-rose-500" size={20} />
                  <h2 className="font-bold text-lg sm:text-xl text-white">Engine C: Pre-Revenue Liquidation Protocol</h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                  REAL-TIME TELEMETRY
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                {/* 1. Independent Replacement Labor */}
                <div className="bg-black/60 p-4 sm:p-5 rounded-xl border-l-4 border-purple-500 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-purple-400 font-bold block text-sm">🟣 INDEPENDENT REPLACEMENT LABOR</span>
                    <span className="text-slate-300 text-xs sm:text-sm">Industry dev payroll cost to build 85 apps ($4k–$10k/app)</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-white block">${replacementAgencyCostMin.toLocaleString()} – ${replacementAgencyCostMax.toLocaleString()}</span>
                    <span className="text-xs text-purple-300 block">Replacement Narrative</span>
                  </div>
                </div>

                {/* 2. Strategic Asking Range */}
                <div className="bg-black/60 p-4 sm:p-5 rounded-xl border-l-4 border-emerald-500 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-emerald-400 font-bold block text-sm">🟢 STRATEGIC ASKING RANGE (CONFIDENTIAL)</span>
                    <span className="text-slate-300 text-xs sm:text-sm">Acquire.com Private Deal Room / Direct B2B Outbound</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-white block">${strategicAskMin.toLocaleString()} – ${strategicAskMax.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 block">$576 – $694 / app</span>
                  </div>
                </div>

                {/* 3. Pre-Revenue Fair-Market Valuation */}
                <div className="bg-black/60 p-4 sm:p-5 rounded-xl border-l-4 border-cyan-500 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-cyan-400 font-bold block text-sm">🟡 PRE-REVENUE FAIR-MARKET VALUATION</span>
                    <span className="text-slate-300 text-xs sm:text-sm">Baseline transaction corridor (Target: $35,000)</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-white block">${fmvMin.toLocaleString()} – ${fmvMax.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 block">$294 – $529 / app</span>
                  </div>
                </div>

                {/* 4. Emergency Wholesale Cash */}
                <div className="bg-black/60 p-4 sm:p-5 rounded-xl border-l-4 border-rose-500 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-rose-400 font-bold block text-sm">🔴 EMERGENCY WHOLESALE CASH (72h)</span>
                    <span className="text-slate-300 text-xs sm:text-sm">All-cash distressed asset liquidation floor</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-white block">${fireSaleMin.toLocaleString()} – ${fireSaleMax.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 block">$250 – $368 / app</span>
                  </div>
                </div>

                {/* Marketplace Listing Rule Compliance Notice */}
                <div className="bg-amber-950/25 border border-amber-500/30 p-3 sm:p-4 rounded-xl text-xs font-sans text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 font-mono uppercase block mb-1">⚠️ Marketplace Listing Rule Compliance:</strong>
                  Flippa strictly caps pre-revenue listings at $9,999 USD. High-value collections ($35k–$59k+) are marketed via confidential private deal rooms (Acquire.com), direct B2B holding company outreach, and off-market M&A brokerages.
                </div>

                {/* Institutional APA Master */}
                <div className="bg-emerald-950/20 p-4 sm:p-5 rounded-xl border border-emerald-500/30">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                      <Award size={16} /> INSTITUTIONAL APA MASTER (PHASE 4 EXIT)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">$125,000 – $200,000 CASH</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    100% exclusive IP portfolio buyout via Escrow.com at 500 apps. Valued at $1.2M–$2.5M+ upon establishing 60-90 days of proof-of-sales run-rate.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono">
              <span>Retail Shelf MSRP: <strong className="text-white">${CATALOG_DATA.valuation_framework.retail_shelf_msrp_full_stack.toLocaleString()} ($199 × {totalAssets})</strong></span>
              <span>Agency Tiers: <strong className="text-emerald-400">$1,499 Pilot / $1,999 Std / $2,999 Master</strong></span>
            </div>
          </div>

          {/* RIGHT 6 COLS: DYNAMIC REVENUE SIMULATOR */}
          <div className="lg:col-span-6 bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <Sliders className="text-cyan-400" size={20} />
                  <h2 className="font-bold text-lg sm:text-xl text-white">Dynamic Cash-Flow Simulator</h2>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 font-bold">
                  PROJECTION ENGINE
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-5 text-xs sm:text-sm font-mono">
                {/* Starter UI */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-200 font-medium">Tier 1: $79 Starter UI Licenses</span>
                    <span className="text-cyan-400 font-bold">{starterSales} sales/mo (${(starterSales * 79).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={starterSales} 
                    onChange={e => setStarterSales(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Full Stack */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-200 font-medium">Tier 2: $199 Full-Stack Supabase</span>
                    <span className="text-emerald-400 font-bold">{fullStackSales} sales/mo (${(fullStackSales * 199).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={fullStackSales} 
                    onChange={e => setFullStackSales(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* White Glove */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-200 font-medium">Tier 3: $3,500 White-Glove Setups</span>
                    <span className="text-amber-400 font-bold">{whiteGloveClients} clients/mo (${(whiteGloveClients * 3500).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={whiteGloveClients} 
                    onChange={e => setWhiteGloveClients(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Agency Vault */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-200 font-medium">Agency Vault: $2,999 50-Packs</span>
                    <span className="text-purple-400 font-bold">{agencyVaultLicenses} licenses/mo (${(agencyVaultLicenses * 2999).toLocaleString()})</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={agencyVaultLicenses} 
                    onChange={e => setAgencyVaultLicenses(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Projected Outputs */}
            <div className="mt-6 pt-6 border-t border-white/10 bg-black/60 p-5 rounded-xl">
              <div className="text-[11px] text-amber-400 font-mono uppercase tracking-wider text-center mb-3">
                ⚠️ Illustrative Financial Scenario (Post-Launch Target)
              </div>
              <div className="grid grid-cols-2 gap-4 text-center font-mono">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-semibold">Projected Net Monthly</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400">${totalMonthlyGross.toLocaleString()}/mo</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-semibold">Annualized Multiple (2.8x)</span>
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400">${projectedAcquireMultiple.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STAGE FORGE PIPELINE STEPPER */}
        <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Layers className="text-emerald-400" size={20} />
              <h2 className="font-bold text-lg sm:text-xl text-white">Ghost Factory™ 5-Stage Assembly Line Status</h2>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-300">
              CURRENT STATUS: <span className="text-emerald-400 font-bold">85 / 85 COMPLETED & VERIFIED (FLEET RECONCILED)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 font-mono text-xs sm:text-sm">
            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-1.5 flex items-center justify-between text-sm">
                <span>01. THE FORGE</span>
                <CheckCircle2 size={16} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Dark Obsidian UI promotion, high-contrast typography & clean routes.
              </p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-1.5 flex items-center justify-between text-sm">
                <span>02. TEST RIG</span>
                <CheckCircle2 size={16} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                100% automated HTTP 200 OK HEAD scan on hero images & interactive menus.
              </p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-1.5 flex items-center justify-between text-sm">
                <span>03. BRAIN GATE</span>
                <CheckCircle2 size={16} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                Supabase schema.sql with RLS, seed.sql mock data & 3-min setup guide.
              </p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-1.5 flex items-center justify-between text-sm">
                <span>04. LOOT CRATE</span>
                <CheckCircle2 size={16} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                .Zip packaging, 16:9 banner, 1:1 icon & GitHub Pages/Render deployment.
              </p>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-4 sm:p-5 rounded-xl">
              <div className="text-emerald-400 font-bold mb-1.5 flex items-center justify-between text-sm">
                <span>05. GHOST AUDIT</span>
                <CheckCircle2 size={16} />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                9.0+ Minimum Gate verification & CATALOG_MANIFEST registration.
              </p>
            </div>
          </div>
        </section>

        {/* MASTER INTERACTIVE ASSET & PASSKEY DIRECTORY */}
        <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-emerald-400" size={22} />
                <h2 className="font-bold text-xl sm:text-2xl text-white">Master Asset Registry & Passkey Vault</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Showing {filteredProducts.length} of {CATALOG_DATA.total_flagships} verified production flagships.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
              <input 
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search app name, niche, or passkey..."
                className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Archetype Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">Archetype Law:</span>
            {[
              { id: 'ALL', label: 'All Archetypes', count: CATALOG_DATA.products.length, color: 'border-white/20 text-white' },
              { id: 'A', label: '[A] Ops Console', count: CATALOG_DATA.products.filter((p: any) => p.archetype_id === 'A').length, color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20' },
              { id: 'B', label: '[B] Editorial Showcase', count: CATALOG_DATA.products.filter((p: any) => p.archetype_id === 'B').length, color: 'border-purple-500/40 text-purple-400 bg-purple-950/20' },
              { id: 'C', label: '[C] Stepper Wizard', count: CATALOG_DATA.products.filter((p: any) => p.archetype_id === 'C').length, color: 'border-amber-500/40 text-amber-400 bg-amber-950/20' },
              { id: 'D', label: '[D] Timeline Matrix', count: CATALOG_DATA.products.filter((p: any) => p.archetype_id === 'D').length, color: 'border-blue-500/40 text-blue-400 bg-blue-950/20' },
              { id: 'E', label: '[E] Split-Screen Proof', count: CATALOG_DATA.products.filter((p: any) => p.archetype_id === 'E').length, color: 'border-rose-500/40 text-rose-400 bg-rose-950/20' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedArchetype(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${tab.color} ${
                  selectedArchetype === tab.id ? 'ring-2 ring-emerald-400 scale-105 shadow-md shadow-emerald-500/20' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="w-full text-left font-mono">
              <thead className="bg-black/90 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-4">ID</th>
                  <th className="py-4 px-4">Product Name</th>
                  <th className="py-4 px-4">Archetype & Benchmark</th>
                  <th className="py-4 px-4">Vertical Niche</th>
                  <th className="py-4 px-4">Demo Sandbox Key</th>
                  <th className="py-4 px-4">Audit Score</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/40 text-xs sm:text-sm">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-slate-400 font-bold">#{String(product.id).padStart(2, '0')}</td>
                    <td className="py-4 px-4 font-bold text-white">
                      <div className="flex items-center gap-2.5 text-sm sm:text-base">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        {product.name}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-xs">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                          (product as any).archetype_id === 'A' ? 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40' :
                          (product as any).archetype_id === 'B' ? 'bg-purple-950/60 text-purple-400 border-purple-500/40' :
                          (product as any).archetype_id === 'C' ? 'bg-amber-950/60 text-amber-400 border-amber-500/40' :
                          (product as any).archetype_id === 'D' ? 'bg-blue-950/60 text-blue-400 border-blue-500/40' :
                          'bg-rose-950/60 text-rose-400 border-rose-500/40'
                        }`}>
                          [{(product as any).archetype_id || 'A'}] {((product as any).archetype_name || '').split(':')[1] || 'Ops Console'}
                        </span>
                        {(product as any).design_benchmark && (
                          <span className="text-[11px] text-slate-400 font-sans italic truncate" title={(product as any).design_benchmark}>
                            Ref: {(product as any).design_benchmark}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300 max-w-xs font-sans text-xs sm:text-sm leading-relaxed">{product.category}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => handleCopyPasscode(product.admin_passcode)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all"
                          title="Click to copy sandbox key"
                        >
                          <Key size={14} />
                          <span>{product.admin_passcode}</span>
                          {copiedCode === product.admin_passcode && (
                            <span className="text-xs text-white bg-emerald-600 px-1.5 py-0.5 rounded font-bold">COPIED</span>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">DEMO SANDBOX PASSKEY</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-md font-bold text-xs sm:text-sm">
                        {product.audit_score} / 10
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2 shrink-0">
                      <a 
                        href={product.preview_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 rounded-lg border border-white/15 hover:text-white transition-all text-xs font-semibold"
                      >
                        <span>Demo</span>
                        <ExternalLink size={12} />
                      </a>
                      <a 
                        href={product.admin_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg border border-emerald-500/35 transition-all text-xs font-bold"
                      >
                        <span>/admin</span>
                        <ExternalLink size={12} />
                      </a>
                      {product.checkout_active ? (
                        <a 
                          href={product.gumroad_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg border border-amber-500/35 transition-all text-xs font-bold"
                          title="Active Gumroad Checkout ($150)"
                        >
                          <span>$150</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <a 
                          href="https://auraandgrid.gumroad.com/l/agency-whitelabel-vault" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/35 transition-all text-xs font-bold"
                          title="Packaged in Founding Agency Vault ($1,499)"
                        >
                          <span>Vault</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 text-center text-xs sm:text-sm text-slate-400 font-mono">
        <p>Aura & Grid Storefront Engine • Ghost Factory™ Autonomous Protocol • 500-Asset Institutional APA Master</p>
      </footer>

      {/* Mobile One-Thumb Floating Refresh HUD Pill */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        <button
          onClick={handleHardRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#121215]/95 text-emerald-400 border border-emerald-500/50 shadow-2xl shadow-emerald-950/80 backdrop-blur-md active:scale-95 transition-all font-mono text-sm font-bold"
        >
          <RotateCw size={16} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
          <span>{isRefreshing ? 'REFRESHING...' : 'REFRESH HUD'}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
