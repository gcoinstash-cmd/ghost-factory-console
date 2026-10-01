import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  Activity, 
  ChevronDown,
  Car,
  AlertTriangle,
  Lock,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { NextBestActionBanner } from './NextBestActionBanner';
import { isRegulatedSector, VERTICAL_COMPLIANCE_DISCLAIMER } from '../utils/compliance';

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

export type RarityTier = 'Mythic Candidate' | 'Legendary' | 'Elite' | 'Rare' | 'Common';

export function getRarityTier(product: ProductItem): RarityTier {
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  if (product.id >= 86 || product.flagship_qualified || product.pricing_track?.includes('Track 2') || name.includes('eclss') || cat.includes('scada') || name.includes('mining') || name.includes('hypersonic') || name.includes('laser isl') || name.includes('aegis')) {
    return 'Mythic Candidate';
  }
  if (product.audit_score >= 9.6 && (product.vertical === 'heavy_fleet' || product.vertical === 'wealth' || product.vertical === 'medical')) {
    return 'Legendary';
  }
  if (product.audit_score >= 9.5) {
    return 'Elite';
  }
  if (product.audit_score >= 9.0) {
    return 'Rare';
  }
  return 'Common';
}

export function getDomainClass(product: ProductItem): string {
  const cat = product.category.toLowerCase();
  const v = product.vertical.toLowerCase();
  if (cat.includes('scada') || cat.includes('telemetry') || cat.includes('terminal')) return 'Deep Tech & SCADA';
  if (cat.includes('mining') || cat.includes('aegis') || cat.includes('wind tunnel')) return 'Industrial Robotics';
  if (v === 'wealth' || cat.includes('wealth') || cat.includes('bank') || cat.includes('capital')) return 'Wealth & Private Banking';
  if (v === 'medical' || cat.includes('clinical') || cat.includes('dental') || cat.includes('health')) return 'Medical & Health Systems';
  if (v === 'hospitality' || cat.includes('resort') || cat.includes('dining') || cat.includes('hotel')) return 'Luxury Hospitality';
  if (v === 'creative' || cat.includes('studio') || cat.includes('production') || cat.includes('atelier')) return 'Creative & Studios';
  if (v === 'automotive' || v === 'heavy_fleet' || cat.includes('fleet') || cat.includes('rental')) return 'Automotive & Fleet';
  return 'Boutique Operations';
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

  const domainOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(getDomainClass(p)));
    return ['ALL', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const rarity = getRarityTier(p);
      const domain = getDomainClass(p);
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm) ||
        (p.vertical || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'ALL' || domain === selectedDomain;
      const matchesRarity = selectedRarity === 'ALL' || rarity === selectedRarity;
      return matchesSearch && matchesDomain && matchesRarity;
    });
  }, [products, searchTerm, selectedDomain, selectedRarity]);

  // Dynamic valuation computation based on live catalog composition (85 T1 + 25 T2)
  const valuation = useMemo(() => {
    const t2Count = products.filter(p => p.flagship_qualified || p.pricing_track?.includes('Track 2') || p.id >= 86).length;
    const t1Count = products.length - t2Count;

    // Orderly FMV: T1 (~$500 - $1,150, anchor $765) + T2 (~$2,500 - $5,500, anchor $3,800)
    const minFmv = (t1Count * 500) + (t2Count * 2500);
    const maxFmv = (t1Count * 1150) + (t2Count * 5500);
    const planFmv = planningValue || (t1Count * 765) + (t2Count * 3800);

    // Direct B2B Ask (Data Room Target):
    const minAsk = 195000;
    const maxAsk = 265000;

    // Realistic Accepted (Negotiated LOI Wire):
    const minAccepted = 135000;
    const maxAccepted = 175000;

    // Dev Replacement Labor: T1 ($4k - $12k) + T2 ($15k - $40k)
    const minDev = (t1Count * 4000) + (t2Count * 15000);
    const maxDev = (t1Count * 12000) + (t2Count * 40000);

    return {
      fmvRangeStr: `$${(minFmv / 1000).toFixed(1)}k – $${(maxFmv / 1000).toFixed(1)}k`,
      planFmvStr: `$${Math.round(planFmv).toLocaleString()}`,
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-lg text-sm sm:text-base font-mono font-black text-emerald-400 uppercase tracking-widest mb-3">
              <Car size={18} /> SCREEN 1 // DIGITAL VEHICLE GARAGE HUD
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
              COLLECTION: <span className="text-emerald-400 font-mono">{totalAssets} / 500 DIGITAL VEHICLES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-3xl leading-relaxed font-semibold">
              Internal portfolio telemetry monitor. 100% pre-revenue interactive concept demos and SCADA prototypes running on simulated telemetry feeds.
            </p>
          </div>

          {/* 5 Core Valuation / Public Deliverable Badges (Two-Faced Separation) */}
          {isOperatorAuthenticated ? (
            <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-black/80 p-4 sm:p-5 rounded-xl border border-emerald-500/40 text-sm">
              <div className="p-1">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Fair Market Value</span>
                <span className="text-base sm:text-xl font-black text-emerald-400">{valuation.fmvRangeStr}</span>
                <span className="text-xs sm:text-sm text-emerald-300 block font-bold">Anchor: ~{valuation.planFmvStr}</span>
              </div>
              <div className="p-1 border-l border-white/15 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Direct B2B Ask</span>
                <span className="text-base sm:text-xl font-black text-cyan-400">{valuation.b2bAskStr}</span>
                <span className="text-xs sm:text-sm text-cyan-300 block font-bold">Data Room Ask</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Realistic Accepted</span>
                <span className="text-base sm:text-xl font-black text-amber-400">{valuation.acceptedStr}</span>
                <span className="text-xs sm:text-sm text-amber-300 block font-bold">Negotiated LOI Wire</span>
              </div>
              <div className="p-1 border-t sm:border-t-0 border-l border-white/15 pt-2 sm:pt-1 pl-3">
                <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Dev Replacement</span>
                <span className="text-base sm:text-xl font-black text-purple-400">{valuation.devCostStr}</span>
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
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            placeholder="Search blueprint, industry, or use case..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/70 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-300" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
            >
              {domainOptions.map(d => (
                <option key={d} value={d}>{d === 'ALL' ? 'All Domain Classes' : d}</option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Rarity Tiers</option>
            <option value="Mythic Candidate">Mythic Candidate</option>
            <option value="Legendary">Legendary</option>
            <option value="Elite">Elite</option>
            <option value="Rare">Rare</option>
            <option value="Common">Common</option>
          </select>

          <span className="text-slate-200 ml-auto md:ml-0 text-sm sm:text-base font-bold">
            Showing <strong className="text-emerald-400">{filteredProducts.length}</strong> of {totalAssets} Vehicles
          </span>
        </div>
      </section>

      {/* CAR CARDS GRID */}
      <section id="catalog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const rarity = getRarityTier(product);
          const domain = getDomainClass(product);
          const isTrack2 = product.id >= 86 || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'));

          // Rarity styling tokens
          const rarityStyles: Record<RarityTier, { border: string; bg: string; text: string; glow: string }> = {
            'Mythic Candidate': { border: 'border-amber-400/90', bg: 'bg-amber-950/20', text: 'text-amber-300', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]' },
            'Legendary': { border: 'border-purple-500/70', bg: 'bg-purple-950/20', text: 'text-purple-300', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]' },
            'Elite': { border: 'border-cyan-500/60', bg: 'bg-cyan-950/20', text: 'text-cyan-300', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
            'Rare': { border: 'border-emerald-500/50', bg: 'bg-emerald-950/20', text: 'text-emerald-300', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
            'Common': { border: 'border-white/10', bg: 'bg-black/40', text: 'text-slate-300', glow: '' }
          };

          const rStyle = rarityStyles[rarity];

          return (
            <div
              key={product.id}
              className={`rounded-2xl border-2 ${rStyle.border} ${rStyle.bg} ${rStyle.glow} p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400/80 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Card Top: System Designation + Rarity & Domain Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 bg-black/80 px-2.5 py-1 rounded border border-white/20">
                    SLOT #{product.id.toString().padStart(3, '0')}
                  </span>
                  
                  {/* Rarity Tier Pill */}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full border ${rStyle.border} ${rStyle.text} bg-black/80`}>
                    {rarity}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-bold mt-1 line-clamp-1">
                    {product.category}
                  </p>
                </div>

                {/* Domain & Archetype pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded font-mono">
                    {domain}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-white/15 font-mono">
                    Arch {product.archetype_id || 'A'}
                  </span>
                </div>
              </div>

              {/* DUAL-TRACK PRICING PROTOCOL BADGE (Two-Faced Separation) */}
              <div className={`p-3.5 rounded-xl border text-xs sm:text-sm font-mono space-y-2 ${
                isTrack2 
                  ? 'bg-amber-950/30 border-amber-500/50 text-amber-200' 
                  : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded font-black text-[11px] sm:text-xs uppercase tracking-wider border ${
                    isTrack2 
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm shadow-amber-500/20' 
                      : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  }`}>
                    {isTrack2 ? 'TRACK 2 // FLAGSHIP CANDIDATE' : 'TRACK 1 // LEAN RAPID-SALE'}
                  </span>
                  
                  {isOperatorAuthenticated ? (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Exclusive Buyout</span>
                      <strong className={`text-sm sm:text-base font-black ${isTrack2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {isTrack2 ? '$14,500 Anchor' : '$4,500 Anchor'}
                      </strong>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Public Shelf</span>
                      <strong className={`text-sm sm:text-base font-black ${isTrack2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {isTrack2 ? '$1,500 – $3,500' : '$199 MSRP'}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isTrack2 ? 'Flagship License:' : 'Retail MSRP:'}
                    </span>
                    <strong className="text-white font-bold">
                      {isTrack2 ? '$1,500 – $3,500' : '$199'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      {isOperatorAuthenticated ? (isTrack2 ? 'Buyout Floor:' : 'Commercial Seat:') : 'Commercial License:'}
                    </span>
                    <strong className="text-white font-bold">
                      {isOperatorAuthenticated 
                        ? (isTrack2 ? '$10k – $18k' : '$599')
                        : (isTrack2 ? 'SCADA Suite' : '$599 Team Seat')}
                    </strong>
                  </div>
                </div>

                {isTrack2 && isOperatorAuthenticated && (
                  <div className="pt-1.5 border-t border-amber-500/20 text-[10px] text-amber-300/90 leading-tight">
                    Full Asset Buyout: $18k–$35k | Strategic: $35k–$75k+
                  </div>
                )}
              </div>

              {/* MANDATORY PRODUCT TRUTH BADGE */}
              <div className="flex items-center justify-between gap-1.5 bg-black/70 p-2.5 rounded-lg border border-amber-500/40 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold uppercase tracking-wider shrink-0">
                  <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                  <span>TRUTH:</span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 truncate">
                  {product.truth_label || (isTrack2 ? 'Interactive Prototype (Simulated Data Only)' : 'Interactive Prototype // Simulated Data')}
                </span>
              </div>

              {/* MANDATORY VERTICAL COMPLIANCE DISCLAIMER (Regulated Sectors) */}
              {isRegulatedSector(product) && (
                <div className="bg-amber-950/40 border border-amber-500/50 rounded-lg p-2.5 flex items-start gap-2 text-[11px] font-mono text-amber-200">
                  <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    <strong className="text-amber-300">DISCLAIMER:</strong> {VERTICAL_COMPLIANCE_DISCLAIMER}
                  </span>
                </div>
              )}

              {/* Architecture specs */}
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
                <span className="flex items-center gap-1.5" title="Includes Postgres schema with row-level-security pattern">
                  <Database size={13} className="text-cyan-400" />
                  <span>Postgres RLS Pattern</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Activity size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-black">200 OK Live</span>
                </span>
              </div>

              {/* COLLAPSIBLE DELIVERABLES & SCHEMA DETAILS SHEET */}
              <details className="text-xs bg-black/60 rounded-xl border border-white/10 p-3 group">
                <summary className="font-bold text-slate-300 cursor-pointer flex items-center justify-between text-xs uppercase tracking-wider select-none">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Database size={13} />
                    <span>Deliverables & Schema</span>
                  </span>
                  <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-slate-400" />
                </summary>
                <div className="pt-2.5 mt-2.5 border-t border-white/10 space-y-2 text-slate-300">
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-white">Included:</strong> React 19 Frontend Blueprint, Supabase PostgreSQL Schema, Mock Seed Data, Setup Guide, Commercial License.
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Database Engine:</span>
                    <span className="text-cyan-400 font-mono font-bold" title="Includes Postgres schema with row-level-security pattern">Postgres Schema with RLS Pattern</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-mono font-bold">200 OK Verified</span>
                  </div>
                  {product.tables && product.tables.length > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono bg-black/80 p-2 rounded border border-white/5 overflow-x-auto">
                      <span className="text-slate-300 font-bold block mb-1">Database Tables ({product.tables.length}):</span>
                      {product.tables.join(', ')}
                    </div>
                  )}
                  {isOperatorAuthenticated && (
                    <div className="pt-2 border-t border-amber-500/30 text-amber-300 text-[11px] flex justify-between items-center">
                      <span>Operator Buyout Floor:</span>
                      <strong className="text-amber-400 font-mono">{isTrack2 ? '$10,000 – $18,000' : '$3,800 – $6,500'}</strong>
                    </div>
                  )}
                </div>
              </details>

              {/* UNIFIED PRIMARY ACTION BUTTON (Direct Route, No Exposed Passcode) */}
              <div className="pt-2">
                <a
                  href={product.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/25 active:scale-95"
                >
                  <ExternalLink size={16} />
                  <span>[VIEW LIVE DEMO]</span>
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
