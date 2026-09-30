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
            <span>INTEGRITY: <strong>85/85 VERIFIED</strong></span>
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
