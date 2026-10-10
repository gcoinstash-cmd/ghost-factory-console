import React, { useState } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Lock, 
  AlertTriangle, 
  BarChart3, 
  Cpu,
  Sliders,
  Calculator,
  ArrowUpRight,
  Maximize2,
  Activity,
  Rocket,
  Minus,
  Plus,
  Gauge,
  Sparkles,
  Zap
} from 'lucide-react';

interface Screen7ValuationHubProps {
  totalAssets?: number;
  retainedFloor?: number;
  maxTransferable?: number;
}

export const Screen7ValuationHub: React.FC<Screen7ValuationHubProps> = ({
  totalAssets = 160,
  retainedFloor = 128,
  maxTransferable = 32,
}) => {
  // Master Portfolio Anchors (160 Fleet Baseline)
  const activeFleet = 160;
  const track1Count = 86;
  const track2Count = 51;
  const track3Count = 23;
  const strategicBuyoutAnchor = 1751840; // ASC 350-40 Hard Floor
  const catalogShelfMsrp = 93614;
  const engineeringHoursBase = 16000;

  const [sliderVal, setSliderVal] = useState<number>(35);
  const floorVal = 1050000;
  const ceilingVal = 3630000;
  const projectedVal = Math.round(floorVal + (ceilingVal - floorVal) * (sliderVal / 100));

  // Fleet Scale Simulator State (160 -> 500 assets)
  // Track 3 Exclusivity Expansion Model: All expansion units strictly allocate to Track 3 F1 Engines.
  const [fleetCount, setFleetCount] = useState<number>(160);

  const deltaScale = Math.max(0, fleetCount - 160);
  const simTrack1Count = 86;
  const simTrack2Count = 51;
  const simTrack3Count = 23 + deltaScale;

  // Card 1: MSRP Sticker Price ($3.63M at 160 -> $33.96M at 500 with Track 3 monopoly vault weight)
  const simMSRPNum = 3.63 + (deltaScale * (33.96 - 3.63)) / 340;
  const simStrategicCeiling = `$${simMSRPNum.toFixed(2)}M`;

  // Card 2: Commercial Agency Replacement ($2.28M at 160 -> $7.12M at 500)
  const simAgencyNum = 2.28 + (deltaScale * (7.12 - 2.28)) / 340;
  const simDevReplacement = `$${simAgencyNum.toFixed(2)}M`;

  // Card 3: ASC 350-40 Hard Capitalized Development Floor ($1.75M at 160 -> $5.47M at 500)
  // Formula: fleetCount * 100 hrs * $109.49/hr
  const simASC350Exact = Math.round(fleetCount * 100 * 109.49);
  const simASC350Num = (fleetCount * 100 * 109.49) / 1_000_000;
  const simStrategicBuyoutAnchor = `$${simASC350Num.toFixed(2)}M`;

  // Card 4: Panic Floor Price ($1.05M at 160 -> $3.28M at 500)
  const simPanicNum = 1.05 + (deltaScale * (3.28 - 1.05)) / 340;
  const simDistressCashFloor = `$${simPanicNum.toFixed(2)}M`;

  const simVaultTranche = `${Math.round(fleetCount * 0.8)} Vaulted / ${Math.round(fleetCount * 0.2)} Liquid Slots`;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getScenarioTheme = (pct: number) => {
    if (pct <= 10) {
      return { 
        label: 'Distress Liquidation Realization ($1.05M)', 
        color: 'text-red-400 bg-red-950/80 border-red-500/40',
        textColor: 'text-red-400',
        borderColor: 'border-red-500/50',
        glow: 'rgba(239, 68, 68, 0.4)',
        thumbBorder: '#ef4444',
        shadowColor: 'rgba(239, 68, 68, 0.8)',
      };
    }
    if (pct <= 35) {
      return { 
        label: 'ASC 350-40 Senior Architect Hard Floor ($1.75M)', 
        color: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/40',
        textColor: 'text-cyan-400',
        borderColor: 'border-cyan-500/50',
        glow: 'rgba(6, 182, 212, 0.4)',
        thumbBorder: '#06b6d4',
        shadowColor: 'rgba(6, 182, 212, 0.8)',
      };
    }
    if (pct <= 65) {
      return { 
        label: 'Commercial Agency Build Valuation ($2.28M)', 
        color: 'text-amber-400 bg-amber-950/80 border-amber-500/40',
        textColor: 'text-amber-400',
        borderColor: 'border-amber-500/50',
        glow: 'rgba(245, 158, 11, 0.4)',
        thumbBorder: '#f59e0b',
        shadowColor: 'rgba(245, 158, 11, 0.8)',
      };
    }
    if (pct <= 85) {
      return { 
        label: 'Strategic Acquisition Target ($2.99M)', 
        color: 'text-purple-400 bg-purple-950/80 border-purple-500/40',
        textColor: 'text-purple-400',
        borderColor: 'border-purple-500/50',
        glow: 'rgba(168, 85, 247, 0.4)',
        thumbBorder: '#a855f7',
        shadowColor: 'rgba(168, 85, 247, 0.8)',
      };
    }
    return { 
      label: 'Strategic Deep-Tech Monopoly Ceiling ($3.63M)', 
      color: 'text-pink-400 bg-pink-950/80 border-pink-500/40',
      textColor: 'text-pink-400',
      borderColor: 'border-pink-500/50',
      glow: 'rgba(236, 72, 153, 0.4)',
      thumbBorder: '#ec4899',
      shadowColor: 'rgba(236, 72, 153, 0.8)',
    };
  };

  const scenarioTheme = getScenarioTheme(sliderVal);

  const STRESS_PRESETS = [
    { label: 'DISTRESS FLOOR', pct: 0, val: '$1.05M', tag: '0%', activeClass: 'bg-red-500 text-black border-red-400 shadow-lg shadow-red-500/30 font-black', idleClass: 'bg-black/60 text-red-400 border-red-500/40 hover:bg-red-500/20' },
    { label: 'ASC 350-40 BASELINE', pct: 35, val: '$1.75M', tag: '35%', activeClass: 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/30 font-black', idleClass: 'bg-black/60 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20' },
    { label: 'AGENCY VALUATION', pct: 50, val: '$2.28M', tag: '50%', activeClass: 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/30 font-black', idleClass: 'bg-black/60 text-amber-400 border-amber-500/40 hover:bg-amber-500/20' },
    { label: 'STRATEGIC ASK', pct: 75, val: '$2.99M', tag: '75%', activeClass: 'bg-purple-500 text-black border-purple-400 shadow-lg shadow-purple-500/30 font-black', idleClass: 'bg-black/60 text-purple-400 border-purple-500/40 hover:bg-purple-500/20' },
    { label: 'MONOPOLY CEILING', pct: 100, val: '$3.63M', tag: '100%', activeClass: 'bg-pink-500 text-black border-pink-400 shadow-lg shadow-pink-500/30 font-black', idleClass: 'bg-black/60 text-pink-400 border-pink-500/40 hover:bg-pink-500/20' },
  ];

  return (
    <div className="w-full min-h-screen overflow-y-visible space-y-8 font-mono pb-24">
      {/* Header Banner */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-6 sm:p-8 pb-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
                SCREEN 7 // VALUATION & FINANCIAL INTELLIGENCE HUB
              </span>
              <span className="text-xs text-slate-400">| Dual-Track M&A Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-normal pb-1">
              Master Portfolio Valuation Intelligence
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Orderly asset-by-asset economic model. Derives capital benchmarks across non-exclusive annual licensing, agency replacement cost, and selective micro-APA buyouts.
            </p>
          </div>

          {/* Top Metric: Enterprise Market Valuation */}
          <div className="bg-[#111114] border-2 border-purple-500/60 rounded-2xl p-5 shrink-0 text-center shadow-xl shadow-purple-500/10">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
              <span className="text-xs uppercase font-black tracking-widest text-purple-400 block">
                ENTERPRISE MARKET VALUATION
              </span>
              <span className="text-[10px] font-mono font-black text-pink-400 bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/40">
                MONOPOLY PREMIUM
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              $3.63M
            </div>
            <span className="text-xs text-purple-300 block mt-1 font-semibold">
              Strategic Acquisition Ceiling (Monopoly Premium)
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXCLUSIVE BUYOUT & DEV REPLACEMENT HUB (VERY TOP)                         */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <BarChart3 size={18} className="text-purple-400" />
              Exclusive Buyout & Dev Replacement Hub
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Capital benchmark brackets arranged strictly from highest strategic valuation to liquidation floor.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            CAPITAL BENCHMARKS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* CARD 1 (FIRST / HIGHEST VALUE — $3.63M) */}
          <div className="bg-[#111114] border border-purple-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Card 1 // Top</span>
                <span className="text-purple-300 font-bold bg-purple-950/90 px-2 py-0.5 rounded-full border border-purple-500/50 text-[10px] tracking-widest uppercase">TOTAL RETAIL PRICE</span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white uppercase tracking-wider">TOTAL MSRP STICKER PRICE</h3>
              <p className="text-xs text-slate-300 mt-1">Portfolio Monopoly Asking Price &amp; Strategic Transfer Ceiling</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-transparent font-mono tracking-tight block group-hover:scale-105 transition-transform">
                $3.63M
              </span>
              <span className="text-[11px] text-zinc-400 block mt-1 font-semibold">
                160 Active Units combined retail anchor value
              </span>
            </div>
          </div>

          {/* CARD 2 (SECOND / COMMERCIAL APPRAISAL — $2.28M) */}
          <div className="bg-[#111114] border border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Card 2 // Second</span>
                <span className="text-amber-300 font-bold bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-500/50 text-[10px] tracking-widest uppercase">WHOLESALE BASELINE PRICE</span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white uppercase tracking-wider">COMMERCIAL AGENCY REPLACEMENT APPRAISAL</h3>
              <p className="text-xs text-slate-300 mt-1">$2.28M Tier 2/3 Enterprise Dev Replacement Benchmark</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight block group-hover:scale-105 transition-transform">
                $2.28M
              </span>
              <span className="text-[11px] text-zinc-400 block mt-1 font-semibold">
                160 Units × $14,250 average institutional custom dev replacement
              </span>
            </div>
          </div>

          {/* CARD 3 (THIRD / HARD CAPITALIZED FLOOR — $1.75M) */}
          <div className="bg-[#111114] border border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Card 3 // Third</span>
                <span className="text-emerald-300 font-bold bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-500/50 text-[10px] tracking-widest uppercase">ASC 350-40 AUDITED REPLACEMENT BASELINE</span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white uppercase tracking-wider">AS-IS BARE MINIMUM (THE HARD WALK-AWAY FLOOR)</h3>
              <p className="text-xs text-slate-300 mt-1">$1,751,840 Audited Capitalized Development Floor</p>
              <div className="text-[11px] text-amber-300 font-bold mt-2 bg-amber-950/40 border border-amber-500/40 rounded-lg p-2 leading-relaxed">
                Dealership Rule: The Hard Walk-Away Price. We do not negotiate or sell below this baseline (160 units × 100 hrs @ $109.49/hr Senior Architect standard).
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight block group-hover:scale-105 transition-transform">
                $1.75M
              </span>
              <span className="text-[11px] text-zinc-400 block mt-1 font-semibold">
                16,000 Engineering Hours (@ $109.49/hr Senior Architect Floor)
              </span>
            </div>
          </div>

          {/* CARD 4 (FOURTH / LOWEST DOWNSIDE FLOOR — $1.05M) */}
          <div className="bg-[#111114] border border-rose-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-rose-400 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Card 4 // Bottom</span>
                <span className="text-rose-300 font-bold bg-rose-950/90 px-2 py-0.5 rounded-full border border-rose-500/50 text-[10px] tracking-widest uppercase">EMERGENCY LIQUIDATION RESERVE</span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white uppercase tracking-wider">THE PANIC FLOOR PRICE</h3>
              <p className="text-xs text-slate-300 mt-1">Distressed Acquisition &amp; Immediate Cash Downside Floor</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-rose-500 font-mono tracking-tight block group-hover:scale-105 transition-transform">
                $1.05M
              </span>
              <span className="text-[11px] text-zinc-400 block mt-1 font-semibold">
                Worst-case distress liquidation floor strictly maintained &gt;$1.0M
              </span>
            </div>
          </div>

          {/* Card 5: EXCLUSIVE VAULT BUYOUT */}
          <div className="bg-[#111114] border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Card 5 // Vault Engine</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-xs">MONOPOLY LICENSE</span>
              </div>
              <h3 className="text-sm font-bold text-white">Exclusive Vault Buyout</h3>
              <p className="text-xs text-slate-300 mt-1">Standalone Track 3 Turnkey Engines & Track 2 Hypercar Flagships.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight block">
                $85.0k
              </span>
              <span className="text-xs text-emerald-300 font-bold block mt-1">
                Per-Unit Monopoly Vault License
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECURRING COMMERCIAL LICENSING & LEASE HUB                                */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              Recurring Commercial Licensing & Lease Hub
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Annualized non-exclusive licensing cash flow projections arranged from highest enterprise ask to FMV baseline.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            ANNUAL CASH FLOW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Direct B2B Enterprise Ask (Data Room Ask) */}
          <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Data Room Ask</span>
                <span className="text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 text-xs">ENTERPRISE ASK</span>
              </div>
              <h3 className="text-sm font-bold text-white">Direct B2B Enterprise Ask</h3>
              <p className="text-xs text-slate-300 mt-1">Target quote for multi-brand agency enterprise licensing.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight block">
                $121.5k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Includes managed leases and fleet licenses
              </span>
            </div>
          </div>

          {/* Card 2: Realistic Accepted Offer (Target Close) */}
          <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Target Close</span>
                <span className="text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-xs">ACCEPTED OFFER</span>
              </div>
              <h3 className="text-sm font-bold text-white">Realistic Accepted Offer</h3>
              <p className="text-xs text-slate-300 mt-1">Estimated closing range for strategic portfolio licensing packages.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight block">
                $83.4k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Immediate contract execution target
              </span>
            </div>
          </div>

          {/* Card 3: Annualized FMV */}
          <div className="bg-[#111114] border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Annualized FMV</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-xs">FMV BASELINE</span>
              </div>
              <h3 className="text-sm font-bold text-white">Annual Fair Market Value</h3>
              <p className="text-xs text-slate-300 mt-1">Realistic recurring licensing cash flow for all 160 assets.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight block">
                $87.9k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Basis: $199 T1 retail / $2,500 T2 average license
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FACTORY PRODUCTION VOLUME SIMULATOR (160 -> 500 VEHICLES)                 */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Rocket size={20} className="text-purple-400" />
              FACTORY PRODUCTION VOLUME SIMULATOR (160 ➔ 500 VEHICLES)
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Interactive scale forecasting engine modeling Showroom MSRP, Fleet Wholesale, Factory Build Costs, and 80/20 sovereign vault capacity at scale.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider font-mono">
              80/20 Vault Tranche: {simVaultTranche}
            </span>
          </div>
        </div>

        <div className="bg-[#111114] border-2 border-purple-500/40 rounded-2xl p-6 pb-12 mb-16 hover:border-purple-400/80 transition-colors shadow-2xl relative overflow-visible space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Sliders size={14} /> ASSEMBLY LINE OUTPUT // FLEET CAPACITY
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-mono">
                  [86 Track 1 + 51 Track 2 + {simTrack3Count} Track 3 F1 Powertrains]
                </span>
              </div>
              <h3 className="text-lg font-black text-white">Factory Production Volume Simulator</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Adjust digital factory production output from the current 160-vehicle baseline to the 500-vehicle maximum showroom capacity.
              </p>
            </div>

            {/* Quick-Jump Buttons & Readout */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-slate-400 font-mono uppercase mr-1 hidden sm:inline">Presets:</span>
              <button
                onClick={() => setFleetCount(160)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                  fleetCount === 160
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/30'
                    : 'bg-black/60 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
                }`}
              >
                [ACTIVE: 160]
              </button>
              <button
                onClick={() => setFleetCount(250)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                  fleetCount === 250
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/30'
                    : 'bg-black/60 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20'
                }`}
              >
                [TARGET: 250]
              </button>
              <button
                onClick={() => setFleetCount(500)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
                  fleetCount === 500
                    ? 'bg-purple-500 text-black border-purple-400 shadow-md shadow-purple-500/30'
                    : 'bg-black/60 text-purple-400 border-purple-500/40 hover:bg-purple-500/20'
                }`}
              >
                [MAX CAPACITY: 500]
              </button>

              <div className="bg-black/90 border border-purple-500/50 rounded-xl px-4 py-2 text-right shrink-0 ml-auto sm:ml-2">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Simulated Fleet Size</span>
                <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono tracking-tight block">
                  {fleetCount} Vehicles
                </span>
              </div>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">Min: 160 Vehicles Built</span>
              <span className="text-cyan-400 font-bold hidden sm:inline">Midpoint: 250 Vehicles (Target)</span>
              <span className="text-purple-400 font-bold">Max: 500 Vehicles (Full Capacity)</span>
            </div>

            <input
              type="range"
              min="160"
              max="500"
              step="1"
              value={fleetCount}
              onChange={(e) => setFleetCount(Number(e.target.value))}
              className="w-full h-3.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 hover:accent-purple-300 transition-all"
              title="Factory Production Volume Simulator (160 - 500 Vehicles)"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>160 Vehicles Built</span>
              <span className="text-purple-200 font-bold">
                Active Production Line: {fleetCount} Vehicles (137 Legacy Flagships + {simTrack3Count} Bespoke Track 3 Powertrains)
              </span>
              <span>500 Vehicles Full Capacity</span>
            </div>
          </div>

          {/* Descending Output Cards (Largest Left -> Smallest Right) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Card 1: TOTAL MSRP STICKER PRICE */}
            <div className="flex flex-col justify-between p-5 pb-6 min-h-[290px] rounded-xl border border-purple-500/50 bg-[#111114] hover:border-purple-400 transition-colors shadow-md overflow-visible">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-[11px]">Card 1 // Top</span>
                  <span className="text-purple-300 font-bold bg-purple-950/90 px-2 py-0.5 rounded-full border border-purple-500/50 text-[10px] tracking-widest uppercase">
                    TOTAL RETAIL PRICE
                  </span>
                </div>
                <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">TOTAL MSRP STICKER PRICE</h4>
                <span className="text-xs text-purple-300/80 block mt-0.5 font-sans font-normal">Showroom Monopoly Sticker Price &amp; Strategic Acquisition Ceiling</span>
              </div>
              <div className="pt-3 border-t border-white/10 mt-auto">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-transparent break-words leading-normal block">
                  {simStrategicCeiling}
                </span>
                <span className="text-xs text-slate-400 mt-2 block leading-relaxed">
                  Complete bespoke fleet showroom retail valuation
                </span>
              </div>
            </div>

            {/* Card 2: COMMERCIAL FLEET WHOLESALE APPRAISAL */}
            <div className="flex flex-col justify-between p-5 pb-6 min-h-[290px] rounded-xl border border-amber-500/50 bg-[#111114] hover:border-amber-400 transition-colors shadow-md overflow-visible">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-[11px]">Card 2 // Second</span>
                  <span className="text-amber-300 font-bold bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-500/50 text-[10px] tracking-widest uppercase">
                    WHOLESALE BASELINE PRICE
                  </span>
                </div>
                <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">COMMERCIAL FLEET WHOLESALE APPRAISAL</h4>
                <span className="text-xs text-amber-300/80 block mt-0.5 font-sans font-normal">Commercial Fleet Volume Wholesale Benchmark</span>
              </div>
              <div className="pt-3 border-t border-white/10 mt-auto">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400 break-words leading-normal block">
                  {simDevReplacement}
                </span>
                <span className="text-xs text-slate-400 mt-2 block leading-relaxed">
                  Institutional fleet replacement &amp; wholesale buyout valuation
                </span>
              </div>
            </div>

            {/* Card 3: FACTORY BUILD COST (THE HARD WALK-AWAY FLOOR) */}
            <div className="flex flex-col justify-between p-5 pb-6 min-h-[290px] rounded-xl border border-emerald-500/50 bg-[#111114] hover:border-emerald-400 transition-colors shadow-md overflow-visible">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-[11px]">Card 3 // Third</span>
                  <span className="text-emerald-300 font-bold bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-500/50 text-[10px] tracking-widest uppercase">
                    CERTIFIED FACTORY BASELINE
                  </span>
                </div>
                <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">FACTORY BUILD COST (THE HARD WALK-AWAY FLOOR)</h4>
                <span className="text-xs text-emerald-300/80 block mt-0.5 font-sans font-normal">Certified Factory Base Production Floor</span>
                <div className="text-[11px] text-amber-300 font-bold mt-2 bg-amber-950/40 border border-amber-500/40 rounded-lg p-2 leading-relaxed">
                  Dealership Rule: The Hard Walk-Away Price. Absolute factory reserve floor. We do not sell below actual build costs under any scenario.
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 mt-auto">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-400 break-words leading-normal block">
                  {simStrategicBuyoutAnchor}
                </span>
                <span className="text-xs text-slate-400 mt-2 block leading-relaxed">
                  Certified Factory Floor: ${simASC350Exact.toLocaleString()} Base Production Cost (100% Track 3 allocation)
                </span>
              </div>
            </div>

            {/* Card 4: EMERGENCY LIQUIDATION FLOOR */}
            <div className="flex flex-col justify-between p-5 pb-6 min-h-[290px] rounded-xl border border-rose-500/50 bg-[#111114] hover:border-rose-400 transition-colors shadow-md overflow-visible">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-[11px]">Card 4 // Fourth</span>
                  <span className="text-rose-300 font-bold bg-rose-950/90 px-2 py-0.5 rounded-full border border-rose-500/50 text-[10px] tracking-widest uppercase">
                    EMERGENCY LIQUIDATION RESERVE
                  </span>
                </div>
                <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">EMERGENCY LIQUIDATION FLOOR</h4>
                <span className="text-xs text-rose-300/80 block mt-0.5 font-sans font-normal">Guaranteed Dealer Cash Floor</span>
              </div>
              <div className="pt-3 border-t border-white/10 mt-auto">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-rose-400 break-words leading-normal block">
                  {simDistressCashFloor}
                </span>
                <span className="text-xs text-slate-400 mt-2 block leading-relaxed">
                  Minimum certified wholesale buyback reserve strictly held &gt;$3.0M
                </span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-400">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="font-mono text-[11px] leading-relaxed text-amber-200/90">
              HYPOTHETICAL TARGET PROJECTION ONLY — DEMONSTRATES POTENTIAL PORTFOLIO VALUATION AT SCALE — NOT AN APPRAISAL OR REVENUE GUARANTEE.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PORTFOLIO VAULT TRANCHES & PER-ASSET BENCHMARKS                           */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        {/* SUBSECTION A: PORTFOLIO VAULT SEGREGATION (VAULT TRANCHE BUYOUT) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Shield size={20} className="text-emerald-400" />
                Portfolio Vault Segregation & Tranche Buyout
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Granular vault capital allocation partitioning: Core Sovereign Reserve vs. Active Liquidity.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
              VAULT TRANCHES (80/20 SPLIT)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Vault 2: Core Sovereign Reserve (120 Units) — Leftmost (Largest) */}
            <div className="bg-[#111114] border-2 border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-emerald-400 uppercase font-bold tracking-wider text-xs">VAULT 2 // SOVEREIGN RESERVE</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-[10px] flex items-center gap-1">
                    <Lock size={10} /> HARD RETENTION FLOOR ENFORCED
                  </span>
                </div>
                <h3 className="text-base font-black text-white">Core Sovereign Reserve ({retainedFloor} Units)</h3>
                <p className="text-xs text-slate-300 mt-1 font-mono font-semibold text-emerald-300">
                  69 Track 1 Units + 40 Track 2 + 11 Track 3 Engines
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 text-[11px] uppercase block font-mono">Protected Equity Base</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono block">$1.02M</span>
                    <span className="text-xs text-slate-300 font-mono">Protected Equity Average (Anchor)</span>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 text-[11px] uppercase block font-mono">Factory Build Benchmark</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono block">$1.49M</span>
                    <span className="text-xs text-slate-300 font-mono">Certified Build Benchmark Average</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                Permanent retention reserve. Assets cannot be transferred or alienated under any single APA.
              </div>
            </div>

            {/* Card 2: Vault 1: Active Liquidity Tranche (30 Units Max) — Right (Smallest) */}
            <div className="bg-[#111114] border-2 border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-lg">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-amber-400 uppercase font-bold tracking-wider text-xs">VAULT 1 // LIQUIDITY TRANCHE</span>
                  <span className="text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-[10px]">
                    AUTHORIZED FOR ACQUISITION
                  </span>
                </div>
                <h3 className="text-base font-black text-white">Active Liquidity Tranche ({maxTransferable} Units Max)</h3>
                <p className="text-xs text-slate-300 mt-1 font-mono font-semibold text-amber-300">
                  17 Track 1 Units + 10 Track 2 + 3 Track 3 Engines
                </p>
                <div className="mt-4 space-y-2">
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 text-[11px] uppercase block font-mono">Planning Anchor</span>
                    <span className="text-2xl font-black text-amber-400 font-mono block">$252,500</span>
                    <span className="text-xs text-slate-300 font-mono">Liquidity Planning Average</span>
                  </div>
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <span className="text-slate-400 text-[11px] uppercase block font-mono">Distress Cash Floor</span>
                    <span className="text-lg font-bold text-red-400 font-mono block">$178.8k</span>
                    <span className="text-xs text-slate-300 font-mono">Liquidation Cash Average</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                80% retention limit strictly bounds total micro-APA liquidations to 30 units.
              </div>
            </div>
          </div>

          {/* Complete Fleet Reference Strip */}
          <div className="bg-black/50 border border-purple-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold text-[10px]">
                COMPLETE FLEET
              </span>
              <span className="text-slate-200 font-bold">{totalAssets} Units Total ({track1Count} Track 1 + {track2Count} Flagships)</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span>Total Anchor: <strong className="text-purple-300">${strategicBuyoutAnchor.toLocaleString()}</strong></span>
              <span>Shelf MSRP: <strong className="text-emerald-400">${catalogShelfMsrp.toLocaleString()}</strong></span>
              <span>Dev Base: <strong className="text-cyan-400">15,100 hrs</strong></span>
              <span>Ceiling: <strong className="text-pink-400">$3.68M</strong></span>
              <span>Density: <strong className="text-amber-400">$12,450 / Unit</strong></span>
              <span>Multiple: <strong className="text-cyan-400">1.22x ROIC</strong></span>
            </div>
          </div>
        </div>

        {/* SUBSECTION B: PER-ASSET CAPITAL BENCHMARKS (INDIVIDUAL ASSET EXCLUSIVE BUYOUT) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Cpu size={20} className="text-cyan-400" />
                Per-Asset Capital Benchmarks (Individual Micro-APAs)
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Granular per-unit economic models distinguishing Track 2 Hypercar Flagships from Track 1 Lean Tuner vehicles.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
              PER-UNIT PRICING ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Track 2 Flagship Unit (50 Units) — Leftmost (Largest) */}
            <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-6 hover:border-amber-400 transition-colors shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    TRACK 2 // FLAGSHIP TIER-1
                  </span>
                  <h3 className="text-lg font-black text-white mt-1.5">Track 2 Flagship Unit ({track2Count} Units)</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Deep-Tech SCADA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Buyout Anchor</span>
                  <span className="text-xl font-black text-amber-400 font-mono block">$14,500</span>
                  <span className="text-[11px] text-slate-400 font-mono block">Full Buyout Avg: $26,500</span>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Distress Floor</span>
                  <span className="text-xl font-black text-red-400 font-mono block">$3,020</span>
                  <span className="text-[11px] text-slate-400 font-mono block">Liquidation Average</span>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Wholesale Build Cost</span>
                  <span className="text-xl font-black text-emerald-400 font-mono block">$28,200</span>
                  <span className="text-[11px] text-slate-400 font-mono block">80+ hrs Custom Assembly</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-semibold pt-1">
                Complex multi-view industrial/scientific console with domain-specific physics solver, operator journeys, and mission telemetry.
              </div>
            </div>

            {/* Card 2: Track 1 Single Unit (86 Units) — Right (Smallest) */}
            <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-6 hover:border-cyan-400 transition-colors shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    TRACK 1 // LEAN PROTOTYPE
                  </span>
                  <h3 className="text-lg font-black text-white mt-1.5">Track 1 Single Unit ({track1Count} Units)</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Turn-Key Concept</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Buyout Anchor</span>
                  <span className="text-xl font-black text-cyan-400 font-mono block">$4,500</span>
                  <span className="text-[11px] text-slate-400 font-mono block">Full Buyout Avg: $5,150</span>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Distress Floor</span>
                  <span className="text-xl font-black text-red-400 font-mono block">$1,150</span>
                  <span className="text-[11px] text-slate-400 font-mono block">Liquidation Average</span>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-slate-400 text-[10px] uppercase font-mono block">Wholesale Build Cost</span>
                  <span className="text-xl font-black text-emerald-400 font-mono block">$6,500</span>
                  <span className="text-[11px] text-slate-400 font-mono block">35 hrs Custom Assembly</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-semibold pt-1">
                Single-view turn-key telemetry prototype with complete PostgreSQL schema, seed data, and simulated operations dashboard.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POSITION 4: CAPITAL ALLOCATOR RATIOS & INTERACTIVE STRESS-TESTER          */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <Activity size={20} className="text-amber-400" />
              Capital Allocator Intelligence Suite
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              5 institutional telemetry modules for portfolio risk management, capital density, and dynamic scenario stress-testing.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
            5 ALLOCATOR MODULES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Capital Density Gauge */}
          <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs flex items-center gap-1.5">
                  <Calculator size={13} className="text-amber-400" /> Module 1: Capital Density
                </span>
                <span className="text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-xs">
                  DENSITY GAUGE
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Portfolio Capital Density</h3>
              <div className="mt-3">
                <span className="text-3xl font-black text-amber-400 font-mono tracking-tight block">
                  $12,450 / Asset
                </span>
                <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300 font-mono">
                  Formula: <strong className="text-amber-300">NAV Anchor ($1.88M)</strong> / Active Fleet ({totalAssets} Units)
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed font-semibold">
              Track 2 Flagship additions push density toward $14k+; Track 1 drives velocity.
            </div>
          </div>

          {/* Module 2: 80/20 Vault Liquidity Capacity Bar */}
          <div className="bg-[#111114] border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs flex items-center gap-1.5">
                  <Shield size={13} className="text-emerald-400" /> Module 2: Vault Liquidity
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-[11px] flex items-center gap-1">
                  <Lock size={10} /> HARD RETENTION FLOOR ENFORCED
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">80/20 Vault Liquidity Capacity Bar</h3>
              
              <div className="mt-3">
                {/* Visual Bar: 80% Emerald (Protected Vault) vs. 20% Gold (Authorized Liquidity) */}
                <div className="w-full bg-black/80 rounded-full h-4 border border-white/15 overflow-hidden flex shadow-inner">
                  <div 
                    className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-black text-black font-mono transition-all duration-500" 
                    style={{ width: '80%' }}
                    title="80% Protected Vault Floor"
                  >
                    80% PROTECTED VAULT
                  </div>
                  <div 
                    className="bg-amber-400 h-full flex items-center justify-center text-[10px] font-black text-black font-mono transition-all duration-500" 
                    style={{ width: '20%' }}
                    title="20% Authorized Liquidity Ceiling"
                  >
                    20% LIQUID
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold block">{retainedFloor} Units Vaulted</span>
                    <span className="text-[11px] text-slate-300 font-mono">$1.02M Protected Asset Base</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 sm:text-right">
                    <span className="text-amber-400 font-bold block">{maxTransferable} Units Max Liquid</span>
                    <span className="text-[11px] text-slate-300 font-mono">$252,500 Realization Capacity @ Anchor</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed font-semibold">
              Security Lock: HARD RETENTION FLOOR ENFORCED. Max 30 transferable units.
            </div>
          </div>

          {/* Module 3: Enterprise Replacement Multiple (ROIC) */}
          <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs flex items-center gap-1.5">
                  <ArrowUpRight size={13} className="text-cyan-400" /> Module 3: Rebuild Multiple
                </span>
                <span className="text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 text-xs">
                  1.22x ROIC
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Enterprise Replacement Multiple (ROIC)</h3>
              <div className="mt-3">
                <span className="text-3xl font-black text-cyan-400 font-mono tracking-tight block">
                  1.22x Rebuild Multiple
                </span>
                <div className="mt-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300 font-mono">
                  Comparative: <strong className="text-cyan-300">Dev Agency Cost ($2.30M)</strong> vs. Buyout Anchor ($1.88M)
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed font-semibold">
              Buyer Signal: Represents an 18% acquisition discount vs. 15,100+ custom agency dev hours.
            </div>
          </div>

          {/* Module 4: Valuation Spread & Asymmetry */}
          <div className="bg-[#111114] border border-purple-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs flex items-center gap-1.5">
                  <Maximize2 size={13} className="text-purple-400" /> Module 4: Spread & Asymmetry
                </span>
                <span className="text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40 text-xs">
                  3.7x ASYMMETRY
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Valuation Spread & Asymmetry</h3>
              <div className="mt-3 space-y-1.5">
                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-slate-300">Enterprise Valuation:</span>
                  <span className="text-purple-400 font-bold font-mono">$3.68M Strategic Deep-Tech Monopoly</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-black/60 border border-white/10">
                  <span className="text-slate-300">Liquidation Cell:</span>
                  <span className="text-red-400 font-bold font-mono">$985.0k+ Distress Realization</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed font-semibold">
              Delta: 3.7x Upside Asymmetry Window between enterprise valuation and liquidation cell.
            </div>
          </div>

          {/* Module 5: Interactive Scenario Stress-Tester */}
          <div className="col-span-1 md:col-span-2 bg-[#111114] border-2 border-emerald-500/50 rounded-2xl p-6 hover:border-emerald-400 transition-all shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <Sliders size={16} /> MODULE 5 // DYNAMIC STRESS-TESTER
                  </span>
                  <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-full border ${scenarioTheme.color} flex items-center gap-2 shadow-sm`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {scenarioTheme.label}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Interactive Scenario Stress-Tester</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                  Real-time dynamic sensitivity engine across liquidation floor ($985.0k+) to strategic monopoly ceiling ($3.68M).
                </p>
              </div>

              {/* Dynamic Readout Cockpit */}
              <div className="bg-black/90 border-2 border-emerald-500/50 rounded-2xl p-5 text-right shrink-0 shadow-xl shadow-emerald-500/10 min-w-[260px]">
                <div className="flex items-center justify-between text-xs text-slate-300 uppercase font-mono pb-1.5 border-b border-white/10 mb-1.5 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Activity size={14} className={scenarioTheme.textColor} /> Stress Level
                  </span>
                  <span className={`font-black font-mono text-sm ${scenarioTheme.textColor}`}>{sliderVal}% Index</span>
                </div>
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight block ${scenarioTheme.textColor}`}>
                  {formatCurrency(projectedVal)}
                </span>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono pt-1.5 font-bold">
                  <span>{(projectedVal / floorVal).toFixed(2)}x Floor Multiple</span>
                  <span className="text-emerald-400 font-black">+${Math.round((projectedVal - floorVal) / 1000)}k Lift</span>
                </div>
              </div>
            </div>

            {/* Quick-Jump Milestone Preset Soundboard */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm sm:text-base font-mono">
                <span className="uppercase tracking-wider flex items-center gap-2 font-black text-amber-400 text-sm sm:text-base">
                  <Zap size={18} className="text-amber-400" /> Milestone Quick-Presets:
                </span>
                <span className="text-xs sm:text-sm text-slate-300 hidden sm:inline font-bold">Click any preset to snap regulator</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {STRESS_PRESETS.map((preset) => {
                  const isSelected = Math.abs(sliderVal - preset.pct) <= 4;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => setSliderVal(preset.pct)}
                      className={`p-3.5 sm:p-4 rounded-2xl font-mono transition-all cursor-pointer border flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[78px] ${
                        isSelected ? preset.activeClass : preset.idleClass
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black opacity-85">[{preset.tag}]</span>
                        <span className="font-black text-base sm:text-lg tracking-tight">{preset.val}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider opacity-90 truncate max-w-full">
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Glowing Range Slider Cockpit Control */}
            <div className="bg-[#0c0d12] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Gauge size={18} className="text-cyan-400" /> Realization Regulator
                  </span>
                  <span className="px-3.5 py-1 rounded-lg bg-white/20 text-white font-mono text-sm sm:text-base font-black">
                    {sliderVal}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSliderVal((prev) => Math.max(0, prev - 5))}
                    className="px-3.5 py-1.5 rounded-lg bg-black/70 hover:bg-white/15 text-slate-200 hover:text-white border border-white/20 text-xs sm:text-sm font-mono font-black transition-all cursor-pointer active:scale-95"
                    title="Step backward 5%"
                  >
                    -5%
                  </button>
                  <button
                    onClick={() => setSliderVal((prev) => Math.min(100, prev + 5))}
                    className="px-3.5 py-1.5 rounded-lg bg-black/70 hover:bg-white/15 text-slate-200 hover:text-white border border-white/20 text-xs sm:text-sm font-mono font-black transition-all cursor-pointer active:scale-95"
                    title="Step forward 5%"
                  >
                    +5%
                  </button>
                </div>
              </div>

              {/* Slider Track with Fine-Tuning Step Controls */}
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => setSliderVal((prev) => Math.max(0, prev - 1))}
                  className="w-11 h-11 rounded-xl bg-black/70 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-400 border border-white/20 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
                  title="Fine-tune -1%"
                >
                  <Minus size={20} />
                </button>

                <div className="relative flex-1 py-3 flex items-center">
                  {/* Glowing Underlay Fill Track */}
                  <div className="absolute inset-x-0 h-5 bg-slate-950 rounded-full border border-slate-700/70 overflow-hidden shadow-inner">
                    {/* Active Gradient Fill Bar */}
                    <div
                      className="h-full rounded-full transition-all duration-75 relative"
                      style={{
                        width: `${sliderVal}%`,
                        background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 22%, #06b6d4 45%, #a855f7 75%, #ec4899 100%)',
                        boxShadow: `0 0 20px ${scenarioTheme.shadowColor}`
                      }}
                    >
                      {/* High-Tech Shimmer highlight on fill */}
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Tick Marks on track at 0%, 22%, 45%, 75%, 100% */}
                  <div className="absolute inset-x-0 h-5 pointer-events-none flex justify-between items-center px-1.5">
                    <span className="w-0.5 h-3 bg-white/60 rounded-full" />
                    <span className="w-0.5 h-3 bg-white/60 rounded-full" style={{ left: '22%', position: 'absolute' }} />
                    <span className="w-0.5 h-3 bg-white/60 rounded-full" style={{ left: '45%', position: 'absolute' }} />
                    <span className="w-0.5 h-3 bg-white/60 rounded-full" style={{ left: '75%', position: 'absolute' }} />
                    <span className="w-0.5 h-3 bg-white/60 rounded-full" />
                  </div>

                  {/* HTML Range Slider (overlayed with transparent track and prominent styled thumb) */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="relative z-10 w-full h-9 bg-transparent appearance-none cursor-grab active:cursor-grabbing focus:outline-none
                      [&::-webkit-slider-runnable-track]:bg-transparent
                      [&::-webkit-slider-thumb]:appearance-none 
                      [&::-webkit-slider-thumb]:w-8 
                      [&::-webkit-slider-thumb]:h-8 
                      [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:bg-white 
                      [&::-webkit-slider-thumb]:border-4 
                      [&::-webkit-slider-thumb]:border-emerald-400
                      [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(16,185,129,0.9)]
                      [&::-webkit-slider-thumb]:hover:scale-115 
                      [&::-webkit-slider-thumb]:active:scale-95 
                      [&::-webkit-slider-thumb]:transition-transform
                      [&::-moz-range-track]:bg-transparent
                      [&::-moz-range-thumb]:w-8 
                      [&::-moz-range-thumb]:h-8 
                      [&::-moz-range-thumb]:rounded-full 
                      [&::-moz-range-thumb]:bg-white 
                      [&::-moz-range-thumb]:border-4 
                      [&::-moz-range-thumb]:border-emerald-400
                      [&::-moz-range-thumb]:shadow-[0_0_20px_rgba(16,185,129,0.9)]"
                    title="Interactive Portfolio Stress-Tester Slider"
                  />
                </div>

                <button
                  onClick={() => setSliderVal((prev) => Math.min(100, prev + 1))}
                  className="w-11 h-11 rounded-xl bg-black/70 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-400 border border-white/20 flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 shadow-md"
                  title="Fine-tune +1%"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Interactive Milestone Zone Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
                {STRESS_PRESETS.map((preset) => {
                  const isPassed = sliderVal >= preset.pct;
                  const isTarget = Math.abs(sliderVal - preset.pct) <= 4;
                  return (
                    <div
                      key={preset.label}
                      onClick={() => setSliderVal(preset.pct)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer min-h-[78px] flex flex-col justify-center ${
                        isTarget 
                          ? `${preset.activeClass} scale-[1.02]`
                          : isPassed 
                            ? 'bg-black/70 border-white/30 text-white hover:border-white/50 shadow-sm' 
                            : 'bg-black/40 border-white/10 text-slate-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{preset.tag} Milestone</span>
                      <span className="text-base sm:text-lg font-black block font-mono mt-0.5">{preset.val}</span>
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider block opacity-90 truncate mt-0.5">
                        {preset.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Bottom Readout Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-mono gap-1.5 pt-3.5 border-t border-white/10">
                <span className="text-red-400 font-black">$985,000 (Liquidation Floor)</span>
                <span className="text-slate-100 font-black text-center flex items-center gap-2">
                  <Sparkles size={16} className={scenarioTheme.textColor} />
                  Active Readout: <span className={`text-sm sm:text-base ${scenarioTheme.textColor}`}>{formatCurrency(projectedVal)}</span> @ {sliderVal}%
                </span>
                <span className="text-pink-400 font-black">$3,680,000 (Monopoly Ceiling)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMPLIANCE & LEGAL SAFETY LOCK                                            */}
      {/* ========================================================================= */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-slate-400 mb-16">
        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">INTERNAL SCENARIO MODELING ONLY — PRE-REVENUE ASSET PORTFOLIO — VALUES ARE ESTIMATES FOR MANAGEMENT STRATEGY AND NOT GUARANTEED MARKET APPRAISALS.</strong>{' '}
          All digital vehicles are pre-revenue interactive concept demos and source-code blueprints using simulated data. These benchmarks represent replacement cost estimates, orderly non-exclusive licensing models, and strategic exclusive buyout ceilings.
        </p>
      </div>
    </div>
  );
};

export default Screen7ValuationHub;
