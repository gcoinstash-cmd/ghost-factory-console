import React from 'react';
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
  LayoutGrid
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
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-emerald-500/25 px-4 sm:px-6 py-3 font-mono text-xs sm:text-sm">
      {/* Top Telemetry Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="font-bold tracking-widest text-emerald-400 flex items-center gap-2">
            <Terminal size={15} /> GFCC // GHOST FACTORY™ OS
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline text-xs font-semibold">
            AUDIT 360 COCKPIT
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 font-bold uppercase tracking-wider hidden md:inline">
            V2.0 DUAL-TRACK ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Server size={13} className="text-emerald-400" />
            <span>FLEET: <strong className="text-emerald-400">{totalAssets} / {totalAssets} LIVE (200 OK)</strong></span>
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
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 transition-all font-mono active:scale-95 cursor-pointer shadow-sm text-xs"
            title="Force refresh console state"
          >
            <RotateCw size={13} className={isRefreshing ? 'animate-spin text-emerald-300' : ''} />
            <span className="font-bold tracking-wider">{isRefreshing ? 'SYNCING...' : 'SYNC'}</span>
          </button>
        </div>
      </div>

      {/* PERSISTENT 5-PILLAR VALUATION HUD RIBBON */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 py-2.5 border-b border-white/10 text-xs">
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
        <div className="bg-black/60 border border-pink-500/30 rounded-xl p-2.5 flex flex-col justify-between col-span-2 sm:col-span-1 hover:border-pink-400 transition-colors">
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

      {/* Screen Navigation Tabs (Screens 1 to 5) */}
      <nav className="flex items-center gap-2 pt-2.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onViewChange('garage')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            currentView === 'garage'
              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <LayoutGrid size={14} />
          <span>Screen 1: Garage HUD</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'garage' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            {totalAssets}
          </span>
        </button>

        <button
          onClick={() => onViewChange('factory')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            currentView === 'factory'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Cpu size={14} />
          <span>Screen 2: Factory Line</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'factory' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            Intake Gate
          </span>
        </button>

        <button
          onClick={() => onViewChange('showroom')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            currentView === 'showroom'
              ? 'bg-white text-black shadow-lg shadow-white/25 font-black'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Compass size={14} />
          <span>Screen 3: Showroom Engine</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
            currentView === 'showroom' ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            Aura & Grid
          </span>
        </button>

        <button
          onClick={() => onViewChange('dealdesk')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            currentView === 'dealdesk'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <DollarSign size={14} />
          <span>Screen 4: Deal Desk</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'dealdesk' ? 'bg-black/25 text-black' : 'bg-slate-800 text-slate-300'
          }`}>
            80% Shield
          </span>
        </button>

        <button
          onClick={() => onViewChange('maintenance')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            currentView === 'maintenance'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <Wrench size={14} />
          <span>Screen 5: Maintenance Bay</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
            currentView === 'maintenance' ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-300'
          }`}>
            Pit Crew
          </span>
        </button>
      </nav>
    </header>
  );
};
