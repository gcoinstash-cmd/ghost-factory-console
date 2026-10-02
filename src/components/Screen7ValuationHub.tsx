import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  Lock, 
  AlertTriangle, 
  Layers, 
  BarChart3, 
  Cpu 
} from 'lucide-react';

interface Screen7ValuationHubProps {
  totalAssets?: number;
  retainedFloor?: number;
  maxTransferable?: number;
}

export const Screen7ValuationHub: React.FC<Screen7ValuationHubProps> = ({
  totalAssets = 110,
  retainedFloor = 88,
  maxTransferable = 22,
}) => {
  const track1Count = 85;
  const track2Count = 25;

  return (
    <div className="space-y-8 font-mono pb-12">
      {/* Header Banner */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider">
                SCREEN 7 // VALUATION & FINANCIAL INTELLIGENCE HUB
              </span>
              <span className="text-xs text-slate-400">| Dual-Track M&A Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Master Portfolio Valuation Intelligence
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Orderly asset-by-asset economic model. Derives capital benchmarks across non-exclusive annual licensing, agency replacement cost, and selective micro-APA buyouts.
            </p>
          </div>

          {/* Top Metric: Total Individual Buyout Planning Anchor */}
          <div className="bg-[#111114] border-2 border-amber-500/60 rounded-2xl p-5 shrink-0 text-center shadow-xl shadow-amber-500/10">
            <span className="text-xs uppercase font-black tracking-widest text-amber-400 block mb-1">
              Dual-Track Buyout Anchor
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              $673,000
            </div>
            <span className="text-xs text-slate-300 block mt-1 font-semibold">
              Range: $562.0k – $976.5k
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {track1Count} T1 ($4.5k) + {track2Count} Flagships ($14.5k)
            </span>
          </div>
        </div>
      </div>

      {/* Vault Retention Gauge (80% Protected Floor) */}
      <div className="border border-emerald-500/30 bg-emerald-950/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Vault Retention Floor: 80% Hard-Locked
              </h2>
              <p className="text-xs text-slate-300">
                Guarantees portfolio retains ≥ 80% of all cataloged assets at every phase. Micro-APAs are capped.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {retainedFloor} UNITS VAULTED
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              MAX {maxTransferable} APA CAPACITY
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-black/60 rounded-full h-3 border border-white/10 overflow-hidden flex">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500" 
            style={{ width: `${(retainedFloor / totalAssets) * 100}%` }}
            title={`Vault Retained: ${retainedFloor} Assets`}
          />
          <div 
            className="bg-amber-500 h-full transition-all duration-500" 
            style={{ width: `${(maxTransferable / totalAssets) * 100}%` }}
            title={`Max Transferable Capacity: ${maxTransferable} Assets`}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
          <span>80% Minimum Retained Floor ({retainedFloor} Assets Permanent)</span>
          <span>20% Max APA Transfer Ceiling ({maxTransferable} Units Limit)</span>
        </div>
      </div>

      {/* SECTION 2: EXCLUSIVE BUYOUT & DEV REPLACEMENT (DESCENDING ORDER - BIGGEST TO SMALLEST) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <BarChart3 size={18} className="text-purple-400" />
              Section 2: Exclusive Buyout & Dev Replacement Hub
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Capital benchmark brackets arranged strictly from highest strategic valuation to liquidation floor.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            CAPITAL BENCHMARKS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: STRATEGIC ACQUISITION CEILING */}
          <div className="bg-[#111114] border border-purple-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Strategic Ceiling</span>
                <span className="text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40 text-xs">MONOPOLY PREMIUM</span>
              </div>
              <h3 className="text-sm font-bold text-white">Strategic Acquisition Ceiling</h3>
              <p className="text-xs text-slate-300 mt-1">Deep-tech niche enterprise acquisition for total catalog monopoly.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tracking-tight block">
                $1.38M – $2.64M+
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Strategic Niche Monopoly Premium
              </span>
            </div>
          </div>

          {/* Card 2: DEV AGENCY REPLACEMENT BENCHMARK */}
          <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Dev Benchmark</span>
                <span className="text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 text-xs">REPLACEMENT COST</span>
              </div>
              <h3 className="text-sm font-bold text-white">Dev Agency Replacement</h3>
              <p className="text-xs text-slate-300 mt-1">Engineering hours required to recreate 110 specialized prototypes.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight block">
                $890.0k – $1.62M
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                4,000+ engineering hours @ $150–$250/hr
              </span>
            </div>
          </div>

          {/* Card 3: DUAL-TRACK STRATEGIC BUYOUT RANGE */}
          <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Dual-Track Range</span>
                <span className="text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-xs">PORTFOLIO BUYOUT</span>
              </div>
              <h3 className="text-sm font-bold text-white">Dual-Track Strategic Buyout</h3>
              <p className="text-xs text-slate-300 mt-1">Asset-by-asset baseline: 85 Track 1 anchors + 25 Flagship anchors.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight block">
                $562.0k – $976.5k
              </span>
              <span className="text-xs text-amber-300 font-bold block mt-1">
                Anchor: $673.0k
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                {track1Count} T1 ($4.5k) + {track2Count} Flagship ($14.5k)
              </span>
            </div>
          </div>

          {/* Card 4: DISTRESS / QUICK-SALE CASH FLOOR */}
          <div className="bg-[#111114] border border-red-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-red-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Distress Floor</span>
                <span className="text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40 text-xs">LIQUIDATION</span>
              </div>
              <h3 className="text-sm font-bold text-white">Distress / Quick-Sale Floor</h3>
              <p className="text-xs text-slate-300 mt-1">Immediate liquidation baseline with aggressive buyer discounts.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono tracking-tight block">
                $118.5k – $228.0k
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                40–60% buyer discount quick realization
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: RECURRING LICENSING & LEASE HUB */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              Section 1: Recurring Commercial Licensing & Lease Hub
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Annualized non-exclusive licensing cash flow projections based on catalog volume.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            ANNUAL CASH FLOW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Annualized FMV */}
          <div className="bg-[#111114] border border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Annualized FMV</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-xs">FMV BASELINE</span>
              </div>
              <h3 className="text-sm font-bold text-white">Annual Fair Market Value</h3>
              <p className="text-xs text-slate-300 mt-1">Realistic recurring licensing cash flow for all 110 assets.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight block">
                $54.4k – $121.3k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Basis: $199 T1 retail / $1,500 T2 licenses
              </span>
            </div>
          </div>

          {/* Card 2: Direct B2B Enterprise Ask */}
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
                $88.0k – $155.0k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Includes managed leases and fleet licenses
              </span>
            </div>
          </div>

          {/* Card 3: Realistic Accepted Offer */}
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
                $62.0k – $104.8k / yr
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-semibold">
                Immediate contract execution target
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caution Disclaimer */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-slate-400">
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
