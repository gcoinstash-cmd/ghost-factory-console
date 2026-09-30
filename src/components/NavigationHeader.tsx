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

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-emerald-500/25 px-3 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm">
      {/* Top Telemetry Ticker */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 pb-2 border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
          </div>
          <span className="font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap">
            <Terminal size={14} className="shrink-0" /> GFCC // GHOST FACTORY™
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden md:inline text-xs font-semibold">
            AUDIT 360 COCKPIT
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold uppercase tracking-wider hidden lg:inline">
            V2.0 DUAL-TRACK ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px] sm:text-xs">
            <Server size={12} className="text-emerald-400 shrink-0" />
            <span>FLEET: <strong className="text-emerald-400">{totalAssets} LIVE</strong></span>
          </div>

          <button
            onClick={onOpenAudit}
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-900/60 px-2.5 py-1 rounded border border-slate-700/60"
            title="Inspect Level 3 Demo RLS Architecture"
          >
            <Database size={13} className="text-cyan-400" />
            <span>RLS: <strong className="text-cyan-400">LEVEL 3 DEMO</strong></span>
          </button>

          <button
            onClick={onOpenAudit}
            className="hidden lg:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-slate-900/60 px-2.5 py-1 rounded border border-amber-500/40"
            title="Inspect Institutional Build Ledger"
          >
            <Award size={13} />
            <span>INTEGRITY: <strong>{totalAssets}/{totalAssets} VERIFIED</strong></span>
          </button>

          <button
            onClick={onHardRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 transition-all font-mono active:scale-95 cursor-pointer shadow-sm text-xs shrink-0"
            title="Force refresh console state"
          >
            <RotateCw size={12} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
            <span className="font-bold tracking-wider">{isRefreshing ? 'SYNCING...' : 'SYNC'}</span>
          </button>
        </div>
      </div>

      {/* DESKTOP 5-PILLAR VALUATION HUD RIBBON (Visible on lg screens) */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-2.5 py-2.5 border-b border-white/10 text-xs">
        {/* 1. Fair Market Value */}
        <div className="bg-black/60 border border-emerald-500/30 rounded-xl p-2.5 flex flex-col justify-between hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Fair Market Value</span>
            <span className="text-emerald-400 font-mono text-[9px] bg-emerald-950/40 px-1 py-0.2 rounded border border-emerald-500/30">FMV</span>
          </div>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-black text-emerald-400 block">$85,500 – $148,375</span>
            <span className="text-[10px] text-slate-400 block font-sans">Anchor: ~$115,000 ({totalAssets} Assets)</span>
          </div>
        </div>

        {/* 2. Direct B2B Ask */}
        <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-2.5 flex flex-col justify-between hover:border-cyan-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Direct B2B Ask</span>
            <span className="text-cyan-400 font-mono text-[9px] bg-cyan-950/40 px-1 py-0.2 rounded border border-cyan-500/30">ASK</span>
          </div>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-black text-cyan-400 block">$145,000 – $185,000</span>
            <span className="text-[10px] text-slate-400 block font-sans">Data Room Asking Target</span>
          </div>
        </div>

        {/* 3. Realistic Accepted Offer */}
        <div className="bg-black/60 border border-amber-500/30 rounded-xl p-2.5 flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Realistic Accepted Offer</span>
            <span className="text-amber-400 font-mono text-[9px] bg-amber-950/40 px-1 py-0.2 rounded border border-amber-500/30">LOI</span>
          </div>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-black text-amber-400 block">$95,000 – $125,000</span>
            <span className="text-[10px] text-slate-400 block font-sans">Quick-Close / Wire Ready</span>
          </div>
        </div>

        {/* 4. Replacement Development Cost */}
        <div className="bg-black/60 border border-purple-500/30 rounded-xl p-2.5 flex flex-col justify-between hover:border-purple-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Dev Replacement Cost</span>
            <span className="text-purple-400 font-mono text-[9px] bg-purple-950/40 px-1 py-0.2 rounded border border-purple-500/30">DEV</span>
          </div>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-black text-purple-400 block">$700k – $1.69M</span>
            <span className="text-[10px] text-slate-400 block font-sans">Agency Duplicate ({totalAssets} Models)</span>
          </div>
        </div>

        {/* 5. Exclusive Buyout */}
        <div className="bg-black/60 border border-pink-500/30 rounded-xl p-2.5 flex flex-col justify-between hover:border-pink-400 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Exclusive Buyout</span>
            <span className="text-pink-400 font-mono text-[9px] bg-pink-950/40 px-1 py-0.2 rounded border border-pink-500/30">APA</span>
          </div>
          <div className="mt-1">
            <span className="text-sm sm:text-base font-black text-pink-400 block">$14,500 Anchor</span>
            <span className="text-[10px] text-slate-400 block font-sans">T2 Flagship ($10k–$18k) / T1 ($4.5k)</span>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET 5-PILLAR VALUATION HUD RIBBON (< lg screens) */}
      <div className="lg:hidden border-b border-white/10 py-1.5 font-mono">
        <div className="flex items-center justify-between text-[11px] pb-1 px-0.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <DollarSign size={13} className="text-emerald-400" />
            <span>VALUATION HUD (5 PILLARS)</span>
            <span className="text-[10px] text-slate-500 font-normal">| Swipe ↔</span>
          </div>
          <button
            onClick={() => setIsMobileHudCollapsed(!isMobileHudCollapsed)}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10 cursor-pointer"
            title="Toggle valuation HUD visibility"
          >
            <span>{isMobileHudCollapsed ? 'Expand' : 'Collapse'}</span>
            {isMobileHudCollapsed ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
          </button>
        </div>

        {isMobileHudCollapsed ? (
          <div 
            onClick={() => setIsMobileHudCollapsed(false)}
            className="flex items-center justify-between bg-black/60 border border-emerald-500/25 rounded-lg px-2.5 py-1 text-[10px] text-slate-300 cursor-pointer hover:border-emerald-400/50 transition-colors"
          >
            <span className="text-emerald-400 font-bold">FMV: $85.5k–$148.4k</span>
            <span className="text-cyan-400 font-bold">Ask: $145k–$185k</span>
            <span className="text-pink-400 font-bold">APA: $14.5k</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-0.5 pb-1 touch-pan-x">
            {/* 1. Fair Market Value */}
            <div className="min-w-[155px] max-w-[170px] shrink-0 snap-start bg-black/75 border border-emerald-500/40 rounded-xl p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Fair Market Value</span>
                <span className="text-emerald-400 font-mono bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-500/30">FMV</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-black text-emerald-400 block">$85,500 – $148,375</span>
                <span className="text-[9px] text-slate-400 block">Anchor: ~$115k ({totalAssets})</span>
              </div>
            </div>

            {/* 2. Direct B2B Ask */}
            <div className="min-w-[155px] max-w-[170px] shrink-0 snap-start bg-black/75 border border-cyan-500/40 rounded-xl p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Direct B2B Ask</span>
                <span className="text-cyan-400 font-mono bg-cyan-950/60 px-1 py-0.2 rounded border border-cyan-500/30">ASK</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-black text-cyan-400 block">$145,000 – $185,000</span>
                <span className="text-[9px] text-slate-400 block">Data Room Target</span>
              </div>
            </div>

            {/* 3. Realistic Accepted Offer */}
            <div className="min-w-[155px] max-w-[170px] shrink-0 snap-start bg-black/75 border border-amber-500/40 rounded-xl p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Realistic Accepted</span>
                <span className="text-amber-400 font-mono bg-amber-950/60 px-1 py-0.2 rounded border border-amber-500/30">LOI</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-black text-amber-400 block">$95,000 – $125,000</span>
                <span className="text-[9px] text-slate-400 block">Quick-Close Wire</span>
              </div>
            </div>

            {/* 4. Dev Replacement Cost */}
            <div className="min-w-[155px] max-w-[170px] shrink-0 snap-start bg-black/75 border border-purple-500/40 rounded-xl p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Dev Replacement</span>
                <span className="text-purple-400 font-mono bg-purple-950/60 px-1 py-0.2 rounded border border-purple-500/30">DEV</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-black text-purple-400 block">$700k – $1.69M</span>
                <span className="text-[9px] text-slate-400 block">Cost to Duplicate</span>
              </div>
            </div>

            {/* 5. Exclusive Buyout */}
            <div className="min-w-[155px] max-w-[170px] shrink-0 snap-start bg-black/75 border border-pink-500/40 rounded-xl p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Exclusive Buyout</span>
                <span className="text-pink-400 font-mono bg-pink-950/60 px-1 py-0.2 rounded border border-pink-500/30">APA</span>
              </div>
              <div className="mt-1">
                <span className="text-xs font-black text-pink-400 block">$14,500 Anchor</span>
                <span className="text-[9px] text-slate-400 block">T2 ($10k–$18k) / T1</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen Navigation Tabs (Screens 1 to 5) */}
      <nav className="flex items-center gap-1.5 sm:gap-2 pt-2 overflow-x-auto no-scrollbar touch-pan-x">
        <button
          onClick={() => onViewChange('garage')}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'garage'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <LayoutGrid size={13} />
          <span>Screen 1: Garage</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'garage' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            {totalAssets}
          </span>
        </button>

        <button
          onClick={() => onViewChange('factory')}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'factory'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Cpu size={13} />
          <span>Screen 2: Factory</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'factory' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            Intake
          </span>
        </button>

        <button
          onClick={() => onViewChange('showroom')}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'showroom'
              ? 'bg-white text-black shadow-lg shadow-white/25 font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Compass size={13} />
          <span>Screen 3: Showroom</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
            currentView === 'showroom' ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            Aura & Grid
          </span>
        </button>

        <button
          onClick={() => onViewChange('dealdesk')}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'dealdesk'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <DollarSign size={13} />
          <span>Screen 4: Deal Desk</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'dealdesk' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            80% Shield
          </span>
        </button>

        <button
          onClick={() => onViewChange('maintenance')}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            currentView === 'maintenance'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Wrench size={13} />
          <span>Screen 5: Pit Crew</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'maintenance' ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-300'
          }`}>
            Diagnostics
          </span>
        </button>
      </nav>
    </header>
  );
};
