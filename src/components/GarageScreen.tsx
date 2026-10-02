import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ChevronDown,
  Car,
  Lock,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { NextBestActionBanner } from './NextBestActionBanner';
import { BlueprintCard, getDomainClass, getRarityTier } from './BlueprintCard';

interface GarageScreenProps {
  products: ProductItem[];
  totalAssets: number;
  retainedFloor: number;
  availableApaSlots: number;
  planningValue: number;
  onEngageMission: () => void;
  missionCompleted: boolean;
  onOpenTestDrive: (product: ProductItem) => void;
  isOperatorAuthenticated?: boolean;
  onOpenOperatorAuth?: () => void;
}

export const GarageScreen: React.FC<GarageScreenProps> = ({
  products,
  totalAssets,
  retainedFloor,
  availableApaSlots,
  planningValue,
  onEngageMission,
  missionCompleted,
  onOpenTestDrive: _onOpenTestDrive,
  isOperatorAuthenticated = false,
  onOpenOperatorAuth
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const PAGE_SIZE = 24;

  const domainOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(getDomainClass(p)));
    const sorted = Array.from(set).sort((a, b) => a.localeCompare(b));
    return ['ALL', ...sorted];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const rarity = getRarityTier(p);
      const domain = getDomainClass(p);
      const isTrack2 = Boolean(p.flagship_qualified) || (p.pricing_track?.includes('Track 2') ?? false) || p.id >= 86;

      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm) ||
        (p.best_for || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.vertical || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDomain = selectedDomain === 'ALL' || domain === selectedDomain;
      const matchesRarity = selectedRarity === 'ALL' || rarity === selectedRarity;
      const matchesTrack = 
        selectedTrack === 'ALL' ||
        (selectedTrack === 'TRACK_1' && !isTrack2) ||
        (selectedTrack === 'TRACK_2' && isTrack2);

      return matchesSearch && matchesDomain && matchesRarity && matchesTrack;
    });
  }, [products, searchTerm, selectedDomain, selectedRarity, selectedTrack]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const displayedProducts = useMemo(() => {
    if (viewAll) return filteredProducts;
    const startIdx = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIdx, startIdx + PAGE_SIZE);
  }, [filteredProducts, viewAll, safeCurrentPage]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };
  const handleDomainChange = (val: string) => {
    setSelectedDomain(val);
    setCurrentPage(1);
  };
  const handleRarityChange = (val: string) => {
    setSelectedRarity(val);
    setCurrentPage(1);
  };
  const handleTrackChange = (val: string) => {
    setSelectedTrack(val);
    setCurrentPage(1);
  };

  // Dynamic appraisal computation based on catalog composition (85 T1 + 25 T2)
  const appraisal = useMemo(() => {
    const t2Count = products.filter(p => p.flagship_qualified || p.pricing_track?.includes('Track 2') || p.id >= 86).length;
    const t1Count = products.length - t2Count;

    // Orderly Appraisal: T1 (~$500 - $1,150, anchor $765) + T2 (~$2,500 - $5,500, anchor $3,800)
    const minAppraisal = (t1Count * 500) + (t2Count * 2500);
    const maxAppraisal = (t1Count * 1150) + (t2Count * 5500);
    const planAppraisal = planningValue || (t1Count * 765) + (t2Count * 3800);

    // Direct B2B Ask (Data Room Target):
    const minAsk = 195000;
    const maxAsk = 265000;

    // Realistic Accepted (Negotiated Wire Transfer):
    const minAccepted = 135000;
    const maxAccepted = 175000;

    // Dev Replacement Labor: T1 ($4k - $12k) + T2 ($15k - $40k)
    const minDev = (t1Count * 4000) + (t2Count * 15000);
    const maxDev = (t1Count * 12000) + (t2Count * 40000);

    return {
      appraisalRangeStr: `$${(minAppraisal / 1000).toFixed(1)}k – $${(maxAppraisal / 1000).toFixed(1)}k`,
      planAppraisalStr: `$${Math.round(planAppraisal).toLocaleString()}`,
      b2bAskStr: `$${(minAsk / 1000).toFixed(1)}k – $${(maxAsk / 1000).toFixed(1)}k`,
      acceptedStr: `$${(minAccepted / 1000).toFixed(1)}k – $${(maxAccepted / 1000).toFixed(1)}k`,
      devCostStr: `$${(minDev / 1000).toFixed(0)}k – $${(maxDev / 1000000).toFixed(2)}M`,
      t1Count,
      t2Count
    };
  }, [products]);

  return (
    <div className="space-y-8 font-mono">
      {/* METRIC BANNER: Screen 1 Main Collection HUD (Rendered First as Requested) */}
      <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-emerald-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden glow-emerald">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-lg text-sm sm:text-base font-mono font-black text-emerald-400 uppercase tracking-widest">
                <Car size={18} /> SCREEN 1 // DIGITAL VEHICLE GARAGE HUD
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-xs font-mono font-black text-emerald-300">
                <Sparkles size={13} className="text-emerald-400" />
                <span>v1.2.1-diligence-cleared</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
              COLLECTION: <span className="text-emerald-400 font-mono">{totalAssets} / 500 DIGITAL VEHICLES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-3xl leading-relaxed font-semibold">
              Internal portfolio telemetry monitor. 100% pre-revenue interactive concept demos and SCADA prototypes running on simulated telemetry feeds.
            </p>
          </div>

          {/* 5 Core Appraisal / Public Deliverable Badges (Two-Faced Separation) */}
          {isOperatorAuthenticated ? (
            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-black/80 p-4 sm:p-5 rounded-xl border border-emerald-500/40 text-sm">
              <div className="p-1">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Fair Market Value</span>
                <span className="text-base sm:text-xl font-black text-emerald-400">{appraisal.appraisalRangeStr}</span>
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold">Anchor: ~{appraisal.planAppraisalStr}</span>
              </div>
              <div className="p-1 border-l border-white/15 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Direct B2B Ask</span>
                <span className="text-base sm:text-xl font-black text-cyan-400">{appraisal.b2bAskStr}</span>
                <span className="text-xs sm:text-sm text-cyan-300 block font-bold">Data Room Ask</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Realistic Accepted</span>
                <span className="text-base sm:text-xl font-black text-amber-400">{appraisal.acceptedStr}</span>
                <span className="text-xs sm:text-sm text-amber-300 block font-bold">Negotiated Wire Transfer</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 border-l border-white/15 pt-2 sm:pt-1 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Dev Replacement</span>
                <span className="text-base sm:text-xl font-black text-purple-400">{appraisal.devCostStr}</span>
                <span className="text-xs sm:text-sm text-purple-300 block font-bold">Cost to Duplicate</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3 col-span-2 sm:col-span-1">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Exclusive Buyout</span>
                <span className="text-base sm:text-xl font-black text-pink-400">$14,500 Anchor</span>
                <span className="text-xs sm:text-sm text-pink-300 block font-bold">T2 ($10k–$18k) / T1</span>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-black/80 p-4 sm:p-5 rounded-xl border border-white/15 text-sm">
              <div className="p-1">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Track 1 Retail MSRP</span>
                <span className="text-base sm:text-xl font-black text-emerald-400">$199 USD</span>
                <span className="text-xs sm:text-sm text-slate-300 block font-semibold">Single-Client Blueprint</span>
              </div>
              <div className="p-1 border-l border-white/15 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Commercial Team</span>
                <span className="text-base sm:text-xl font-black text-cyan-400">$599 USD</span>
                <span className="text-xs sm:text-sm text-slate-300 block font-semibold">Agency Multi-Seat Pack</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Flagship License</span>
                <span className="text-base sm:text-xl font-black text-purple-400">$1,500 – $3,500</span>
                <span className="text-xs sm:text-sm text-slate-300 block font-semibold">Tier-1 SCADA Physics</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 border-l border-white/15 pt-2 sm:pt-1 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Core Deliverable</span>
                <span className="text-base sm:text-xl font-black text-amber-400">React 19 + RLS</span>
                <span className="text-xs sm:text-sm text-slate-300 block font-semibold">Postgres Schema & Seed</span>
              </div>
              <div 
                onClick={onOpenOperatorAuth}
                className="p-1 border-t sm:border-t-0 sm:border-l border-amber-500/50 pt-2 sm:pt-1 sm:pl-3 col-span-2 sm:col-span-1 bg-amber-950/20 rounded-lg cursor-pointer hover:bg-amber-950/40 transition-colors"
              >
                <span className="text-amber-300 block text-xs sm:text-sm uppercase font-black tracking-wider flex items-center gap-1">
                  <Lock size={12} /> Deal Room
                </span>
                <span className="text-base sm:text-lg font-black text-amber-400 block">RESTRICTED</span>
                <span className="text-xs sm:text-sm text-amber-300/80 block font-semibold underline">Unlock M&A Telemetry</span>
              </div>
            </div>
          )}
        </div>

        {/* 80% Retained Floor Progress Bar */}
        <div className="bg-black/60 border border-white/15 p-4 sm:p-5 rounded-xl space-y-2.5">
          <div className="flex flex-wrap justify-between items-center gap-2 text-sm sm:text-base">
            <span className="text-slate-200 flex items-center gap-2 font-bold">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              <span>Immutable Portfolio Retention Floor Shield:</span>
              <strong className="text-emerald-400">80% Locked ({retainedFloor} of {totalAssets} Vehicles Permanent)</strong>
            </span>
            <span className="text-amber-400 font-black">{availableApaSlots} Slots Transferable</span>
          </div>
          <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full transition-all" style={{ width: `80%` }} title="80% Protected Factory Core" />
            <div className="bg-amber-500/80 h-full transition-all" style={{ width: `20%` }} title="20% Max APA Capacity" />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-300 font-semibold">
            <span>🛡️ Factory Core Vault (GhostFactoryOS Proprietary IP)</span>
            <span>⚡ Selective Micro-APA Window (Max 20%)</span>
          </div>
        </div>
      </section>

      {/* WIN A: Next Best Action Banner (Positioned Directly Below Garage HUD) */}
      <NextBestActionBanner 
        onEngageMission={onEngageMission}
        missionCompleted={missionCompleted}
      />

      {/* GLOBAL HERO CTA & WHAT-YOU-GET DELIVERABLES SECTION */}
      <section className="bg-gradient-to-r from-emerald-950/30 via-black to-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              <ShieldCheck size={14} /> GHOSTFACTORY™ MASTER BLUEPRINT REPOSITORY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Browse 110 Commercial Software Blueprints
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              85 Lean Rapid-Sale prototypes ($199 MSRP) + 25 Tier-1 Flagship SCADA operational consoles ($1,500–$3,500).
              Each asset includes complete React 19 source, PostgreSQL schema, seed data, and commercial deployment rights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
            <a
              href="#catalog-grid"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              Browse 110 Blueprints ↓
            </a>
            <a
              href="https://auraandgrid.gumroad.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 uppercase tracking-wider transition-all"
            >
              Request Vault Catalog ➔
            </a>
          </div>
        </div>

        {/* What You Get Deliverables Strip */}
        <div className="pt-5 border-t border-white/10 space-y-3 font-mono">
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block">
            What You Get With Every Deployment-Ready Blueprint:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-1">
              <strong className="text-emerald-400 block font-bold text-[11px]">1. React 19 Frontend</strong>
              <span className="text-[10px] text-slate-400 block leading-tight">Tailwind CSS + Lucide UI blueprint</span>
            </div>
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-1">
              <strong className="text-cyan-400 block font-bold text-[11px]">2. Postgres Schema</strong>
              <span className="text-[10px] text-slate-400 block leading-tight">Relational schema with RLS patterns</span>
            </div>
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-1">
              <strong className="text-amber-400 block font-bold text-[11px]">3. Mock Seed Data</strong>
              <span className="text-[10px] text-slate-400 block leading-tight">Turnkey schema.sql & seed.sql files</span>
            </div>
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-1">
              <strong className="text-purple-400 block font-bold text-[11px]">4. Setup Guide</strong>
              <span className="text-[10px] text-slate-400 block leading-tight">Step-by-step Render/Vercel guide</span>
            </div>
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl space-y-1">
              <strong className="text-pink-400 block font-bold text-[11px]">5. Commercial License</strong>
              <span className="text-[10px] text-slate-400 block leading-tight">Perpetual single-client deployment</span>
            </div>
            <div className="bg-black/60 border border-amber-500/40 p-3 rounded-xl space-y-1 bg-amber-950/10">
              <strong className="text-amber-300 block font-bold text-[11px]">6. Simulated Truth</strong>
              <span className="text-[10px] text-amber-200/80 block leading-tight">Interactive prototype / sample data</span>
            </div>
          </div>
        </div>

        {/* Flagship Tier Comparison & Commercial License Summary (Dual Accordion) */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Drawer 1: Track 1 vs Track 2 Flagship Breakdown */}
          <details className="bg-black/60 border border-white/10 rounded-xl p-3.5 group">
            <summary className="font-bold text-slate-200 cursor-pointer flex items-center justify-between text-xs select-none">
              <span className="flex items-center gap-2 text-amber-400">
                <Sparkles size={14} />
                <span>Tier Comparison // Track 1 vs. Track 2 Flagship</span>
              </span>
              <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-slate-400" />
            </summary>
            <div className="pt-3 mt-3 border-t border-white/10 space-y-2.5 text-slate-300 text-[11px] leading-relaxed">
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-2.5 rounded-lg space-y-1">
                <strong className="text-emerald-400 block font-bold">Track 1 — Lean Rapid-Sale ($199 MSRP / $4,500 Anchor)</strong>
                <p className="text-slate-300">Single-view interactive telemetry prototypes, PostgreSQL schema.sql and seed data. Built for rapid agency client adaptation and fast deployment.</p>
              </div>
              <div className="bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg space-y-1">
                <strong className="text-amber-400 block font-bold">Track 2 — Flagship Tier-1 SCADA ($1,500–$3,500 MSRP / $14,500 Anchor)</strong>
                <p className="text-slate-300">8–15 interactive sub-panels, domain physics solvers (cryo, tokamak, EGS, aerodynamics), comprehensive operator journeys, and concept briefs.</p>
              </div>
            </div>
          </details>

          {/* Drawer 2: Commercial License Rights & Exclusion Summary */}
          <details className="bg-black/60 border border-white/10 rounded-xl p-3.5 group">
            <summary className="font-bold text-slate-200 cursor-pointer flex items-center justify-between text-xs select-none">
              <span className="flex items-center gap-2 text-cyan-400">
                <ShieldCheck size={14} />
                <span>Commercial License Rights & Exclusions Summary</span>
              </span>
              <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-slate-400" />
            </summary>
            <div className="pt-3 mt-3 border-t border-white/10 space-y-2 text-slate-300 text-[11px] leading-relaxed">
              <div className="flex items-start gap-1.5 text-emerald-300">
                <span className="font-bold">✓ INCLUDED:</span>
                <span className="text-slate-300">Perpetual commercial client deployment, unlimited branding/reskinning, hosting freedom (Vercel/Render/AWS), zero royalties.</span>
              </div>
              <div className="flex items-start gap-1.5 text-red-300">
                <span className="font-bold">✕ EXCLUDED:</span>
                <span className="text-slate-300">Raw marketplace resale (ThemeForest/Gumroad/Etsy), competing template foundry bundles, master GhostFactoryOS/Aura & Grid brand/core IP transfer.</span>
              </div>
              <div className="flex items-start gap-1.5 text-amber-300">
                <span className="font-bold">ℹ NOTICE:</span>
                <span className="text-slate-300">License grant only (not micro-APA ownership transfer unless contracted via formal APA). Sample/simulated data used for technical demonstration.</span>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* FILTER & SEARCH CONTROL CONSOLE */}
      <section className="bg-[#121215] border border-white/15 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            placeholder="Search blueprint, industry, or target..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-black/70 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Domain / Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-300" />
            <select
              value={selectedDomain}
              onChange={(e) => handleDomainChange(e.target.value)}
              className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
            >
              {domainOptions.map(d => (
                <option key={d} value={d}>{d === 'ALL' ? 'All Domain Classes' : d}</option>
              ))}
            </select>
          </div>

          {/* Pricing Track Filter (Track 1 / Flagship) */}
          <select
            value={selectedTrack}
            onChange={(e) => handleTrackChange(e.target.value)}
            className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Pricing Tracks (110)</option>
            <option value="TRACK_1">Track 1 — Lean Rapid-Sale (85)</option>
            <option value="TRACK_2">Track 2 — Flagship Tier-1 (25)</option>
          </select>

          {/* Rarity Filter */}
          <select
            value={selectedRarity}
            onChange={(e) => handleRarityChange(e.target.value)}
            className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Rarity Tiers</option>
            <option value="Elite">Elite (25 Flagship)</option>
            <option value="Pro">Pro (46 Advanced)</option>
            <option value="Core">Core (39 Turnkey)</option>
          </select>

          <span className="text-slate-200 ml-auto md:ml-0 text-sm sm:text-base font-bold">
            Showing <strong className="text-emerald-400">{filteredProducts.length}</strong> of {totalAssets} Vehicles
          </span>
        </div>
      </section>

      {/* CAR CARDS GRID (Paginated 24 Blueprints / View) */}
      <section id="catalog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <BlueprintCard
            key={product.id}
            product={product}
            isOperatorAuthenticated={isOperatorAuthenticated}
          />
        ))}
      </section>

      {/* PAGINATION TOOLBAR & FLEET CONTROLS (24 Blueprints / View) */}
      <section className="bg-[#121215] border border-white/15 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="text-slate-300 font-bold text-center md:text-left">
          Showing <span className="text-emerald-400">{filteredProducts.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1}</span>–
          <span className="text-emerald-400">{viewAll ? filteredProducts.length : Math.min(safeCurrentPage * PAGE_SIZE, filteredProducts.length)}</span> of{' '}
          <strong className="text-white">{filteredProducts.length}</strong> Filtered Vehicles ({totalAssets} Total)
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onClick={() => {
              if (safeCurrentPage > 1) {
                setCurrentPage(p => Math.max(1, p - 1));
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            disabled={safeCurrentPage === 1 || viewAll}
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
          >
            ‹ Prev
          </button>

          {!viewAll && Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => {
                setCurrentPage(pg);
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-8 h-8 rounded-lg font-bold transition-all cursor-pointer ${
                pg === safeCurrentPage
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'bg-black/60 border border-white/20 text-slate-400 hover:text-white hover:border-white/40'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => {
              if (safeCurrentPage < totalPages) {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            disabled={safeCurrentPage === totalPages || viewAll}
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
          >
            Next ›
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold transition-all cursor-pointer"
          >
            {viewAll ? `Paginate (24/view)` : `View All (${filteredProducts.length})`}
          </button>
        </div>
      </section>
    </div>
  );
};
