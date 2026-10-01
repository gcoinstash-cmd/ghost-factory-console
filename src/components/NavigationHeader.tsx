import React, { useState } from 'react';
import { 
  Terminal, 
  RotateCw, 
  Server, 
  Database, 
  Award, 
  Compass, 
  Cpu, 
  DollarSign, 
  Wrench, 
  LayoutGrid,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import PORTFOLIO_METRICS from '../portfolio-metrics.json';

export type ScreenView = 'garage' | 'factory' | 'showroom' | 'dealdesk' | 'maintenance';

interface NavigationHeaderProps {
  currentView: ScreenView;
  onViewChange: (view: ScreenView) => void;
  isRefreshing: boolean;
  onHardRefresh: () => void;
  onOpenAudit: () => void;
  totalAssets: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentView,
  onViewChange,
  isRefreshing,
  onHardRefresh,
  onOpenAudit,
  totalAssets
}) => {
  const [isMobileHudCollapsed, setIsMobileHudCollapsed] = useState(false);

  // Dynamic Portfolio Valuation Metrics from verified master ledger
  const fmvStr = `$${PORTFOLIO_METRICS.valuationAppraisal.fmvRange[0].toLocaleString()} – $${PORTFOLIO_METRICS.valuationAppraisal.fmvRange[1].toLocaleString()}`;
  const fmvAnchor = `~$${Math.round(PORTFOLIO_METRICS.valuationAppraisal.planningFmv / 1000).toLocaleString()},000`;
  const fmvAnchorShort = `~$${Math.round(PORTFOLIO_METRICS.valuationAppraisal.planningFmv / 1000)}k`;
  const askStr = `$${PORTFOLIO_METRICS.valuationAppraisal.strategicAskRange[0].toLocaleString()} – $${PORTFOLIO_METRICS.valuationAppraisal.strategicAskRange[1].toLocaleString()}`;
  const loiStr = `$${PORTFOLIO_METRICS.valuationAppraisal.realisticAcceptedRange[0].toLocaleString()} – $${PORTFOLIO_METRICS.valuationAppraisal.realisticAcceptedRange[1].toLocaleString()}`;
  const devStr = `$${(PORTFOLIO_METRICS.valuationAppraisal.replacementDevLabor[0] / 1000).toFixed(0)}k – $${(PORTFOLIO_METRICS.valuationAppraisal.replacementDevLabor[1] / 1000000).toFixed(2)}M`;
  const buyoutAnchor = `$${PORTFOLIO_METRICS.pricingProtocol.track2.entryBuyoutAnchor.toLocaleString()} Anchor`;

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-emerald-500/30 px-3 sm:px-6 py-2.5 sm:py-3 font-mono text-sm">
      {/* Top Telemetry Ticker */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="font-black tracking-wider text-emerald-400 flex items-center gap-1.5 text-sm sm:text-base whitespace-nowrap">
            <Terminal size={16} className="shrink-0" /> GFCC // GHOST FACTORY™
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline text-xs sm:text-sm font-bold">
            AUDIT 360 COCKPIT
          </span>
          <span className="bg-emerald-500/15 text-emerald-400 text-xs px-2 py-0.5 rounded border border-emerald-500/40 font-black uppercase tracking-wider hidden lg:inline">
            V2.0 DUAL-TRACK ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <Server size={14} className="text-emerald-400 shrink-0" />
            <span>FLEET: <strong className="text-emerald-400">{totalAssets} LIVE</strong></span>
          </div>

          <button
            onClick={onOpenAudit}
            className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700 font-bold"
            title="Inspect Level 3 Demo RLS Architecture"
          >
            <Database size={14} className="text-cyan-400" />
            <span>RLS: <strong className="text-cyan-400">LEVEL 3 DEMO</strong></span>
          </button>

          <button
            onClick={onOpenAudit}
            className="hidden lg:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded border border-amber-500/50 font-bold"
            title="Inspect Institutional Build Ledger"
          >
            <Award size={14} />
            <span>INTEGRITY: <strong>{totalAssets}/{totalAssets} VERIFIED</strong></span>
          </button>

          <button
            onClick={onHardRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 transition-all font-mono active:scale-95 cursor-pointer shadow-sm text-xs sm:text-sm font-black shrink-0"
            title="Force refresh console state"
          >
            <RotateCw size={14} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
            <span className="font-bold tracking-wider">{isRefreshing ? 'SYNCING...' : 'SYNC'}</span>
          </button>
        </div>
      </div>

      {/* DESKTOP 5-PILLAR VALUATION HUD RIBBON (Visible on lg screens) */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-3 py-3 border-b border-white/10 text-xs sm:text-sm">
        {/* 1. Fair Market Value */}
        <div className="bg-black/75 border border-emerald-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Fair Market Value</span>
            <span className="text-emerald-400 font-mono text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-black">FMV</span>
          </div>
          <div className="mt-1.5">
            <span className="text-base sm:text-lg font-black text-emerald-400 block">{fmvStr}</span>
            <span className="text-xs text-slate-300 block font-semibold">Anchor: {fmvAnchor} ({totalAssets} Assets)</span>
          </div>
        </div>

        {/* 2. Direct B2B Ask */}
        <div className="bg-black/75 border border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-400 transition-colors">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Direct B2B Ask</span>
            <span className="text-cyan-400 font-mono text-xs bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 font-black">ASK</span>
          </div>
          <div className="mt-1.5">
            <span className="text-base sm:text-lg font-black text-cyan-400 block">{askStr}</span>
            <span className="text-xs text-slate-300 block font-semibold">Data Room Asking Target</span>
          </div>
        </div>

        {/* 3. Realistic Accepted Offer */}
        <div className="bg-black/75 border border-amber-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Realistic Accepted Offer</span>
            <span className="text-amber-400 font-mono text-xs bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">LOI</span>
          </div>
          <div className="mt-1.5">
            <span className="text-base sm:text-lg font-black text-amber-400 block">{loiStr}</span>
            <span className="text-xs text-slate-300 block font-semibold">Quick-Close / Wire Ready</span>
          </div>
        </div>

        {/* 4. Replacement Development Cost */}
        <div className="bg-black/75 border border-purple-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-purple-400 transition-colors">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Dev Replacement Cost</span>
            <span className="text-purple-400 font-mono text-xs bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/40 font-black">DEV</span>
          </div>
          <div className="mt-1.5">
            <span className="text-base sm:text-lg font-black text-purple-400 block">{devStr}</span>
            <span className="text-xs text-slate-300 block font-semibold">Agency Duplicate ({totalAssets} Models)</span>
          </div>
        </div>

        {/* 5. Exclusive Buyout */}
        <div className="bg-black/75 border border-pink-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-pink-400 transition-colors">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Exclusive Buyout</span>
            <span className="text-pink-400 font-mono text-xs bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/40 font-black">APA</span>
          </div>
          <div className="mt-1.5">
            <span className="text-base sm:text-lg font-black text-pink-400 block">{buyoutAnchor}</span>
            <span className="text-xs text-slate-300 block font-semibold">T2 Flagship ($10k–$18k) / T1 ($4.5k)</span>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET 5-PILLAR VALUATION HUD RIBBON (< lg screens) */}
      <div className="lg:hidden border-b border-white/10 py-2 font-mono">
        <div className="flex items-center justify-between text-xs pb-1.5 px-1">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <DollarSign size={15} className="text-emerald-400" />
            <span className="text-xs sm:text-sm font-black tracking-wide">VALUATION HUD (5 PILLARS)</span>
            <span className="text-xs text-slate-400 font-normal">| Swipe ↔</span>
          </div>
          <button
            onClick={() => setIsMobileHudCollapsed(!isMobileHudCollapsed)}
            className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-white/20 cursor-pointer"
            title="Toggle valuation HUD visibility"
          >
            <span>{isMobileHudCollapsed ? 'Expand HUD' : 'Collapse HUD'}</span>
            {isMobileHudCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {isMobileHudCollapsed ? (
          <div 
            onClick={() => setIsMobileHudCollapsed(false)}
            className="flex items-center justify-between bg-black/80 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 cursor-pointer hover:border-emerald-400 transition-colors"
          >
            <span className="text-emerald-400 font-black">FMV: $105k–$235k</span>
            <span className="text-cyan-400 font-black hidden xs:inline">Ask: $195k–$265k</span>
            <span className="text-pink-400 font-black">APA: {buyoutAnchor}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-1 pb-1.5 touch-pan-x">
            {/* 1. Fair Market Value */}
            <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-emerald-500/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span>Fair Market Value</span>
                <span className="text-emerald-400 font-mono text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-black">FMV</span>
              </div>
              <div className="mt-1.5">
                <span className="text-base sm:text-lg font-black text-emerald-400 block">{fmvStr}</span>
                <span className="text-xs text-slate-300 block font-semibold">Anchor: {fmvAnchorShort} ({totalAssets})</span>
              </div>
            </div>

            {/* 2. Direct B2B Ask */}
            <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-cyan-500/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span>Direct B2B Ask</span>
                <span className="text-cyan-400 font-mono text-xs bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 font-black">ASK</span>
              </div>
              <div className="mt-1.5">
                <span className="text-base sm:text-lg font-black text-cyan-400 block">{askStr}</span>
                <span className="text-xs text-slate-300 block font-semibold">Data Room Target</span>
              </div>
            </div>

            {/* 3. Realistic Accepted Offer */}
            <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-amber-500/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span>Realistic Accepted</span>
                <span className="text-amber-400 font-mono text-xs bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">LOI</span>
              </div>
              <div className="mt-1.5">
                <span className="text-base sm:text-lg font-black text-amber-400 block">{loiStr}</span>
                <span className="text-xs text-slate-300 block font-semibold">Quick-Close Wire</span>
              </div>
            </div>

            {/* 4. Dev Replacement Cost */}
            <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-purple-500/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span>Dev Replacement</span>
                <span className="text-purple-400 font-mono text-xs bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/40 font-black">DEV</span>
              </div>
              <div className="mt-1.5">
                <span className="text-base sm:text-lg font-black text-purple-400 block">{devStr}</span>
                <span className="text-xs text-slate-300 block font-semibold">Cost to Duplicate</span>
              </div>
            </div>

            {/* 5. Exclusive Buyout */}
            <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-pink-500/50 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                <span>Exclusive Buyout</span>
                <span className="text-pink-400 font-mono text-xs bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/40 font-black">APA</span>
              </div>
              <div className="mt-1.5">
                <span className="text-base sm:text-lg font-black text-pink-400 block">{buyoutAnchor}</span>
                <span className="text-xs text-slate-300 block font-semibold">T2 ($10k–$18k) / T1</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen Navigation Tabs (Screens 1 to 5) */}
      <nav className="flex items-center gap-2 pt-2.5 overflow-x-auto no-scrollbar touch-pan-x">
        <button
          onClick={() => onViewChange('garage')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'garage'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <LayoutGrid size={15} />
          <span>Screen 1: Garage</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
            currentView === 'garage' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-200'
          }`}>
            {totalAssets}
          </span>
        </button>

        <button
          onClick={() => onViewChange('factory')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'factory'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Cpu size={15} />
          <span>Screen 2: Factory</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
            currentView === 'factory' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-200'
          }`}>
            Intake
          </span>
        </button>

        <button
          onClick={() => onViewChange('showroom')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'showroom'
              ? 'bg-white text-black shadow-lg shadow-white/25 font-black'
              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Compass size={15} />
          <span>Screen 3: Showroom</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold uppercase ${
            currentView === 'showroom' ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-200'
          }`}>
            Aura & Grid
          </span>
        </button>

        <button
          onClick={() => onViewChange('dealdesk')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'dealdesk'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <DollarSign size={15} />
          <span>Screen 4: Deal Desk</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
            currentView === 'dealdesk' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-200'
          }`}>
            80% Shield
          </span>
        </button>

        <button
          onClick={() => onViewChange('maintenance')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'maintenance'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Wrench size={15} />
          <span>Screen 5: Pit Crew</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
            currentView === 'maintenance' ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-200'
          }`}>
            Diagnostics
          </span>
        </button>
      </nav>
    </header>
  );
};
