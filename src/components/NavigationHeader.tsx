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
  ChevronUp,
  Lock,
  Unlock
} from 'lucide-react';

export type ScreenView = 'garage' | 'factory' | 'showroom' | 'dealdesk' | 'maintenance';

interface NavigationHeaderProps {
  currentView: ScreenView;
  onViewChange: (view: ScreenView) => void;
  isRefreshing: boolean;
  onHardRefresh: () => void;
  onOpenAudit: () => void;
  totalAssets: number;
  isOperatorAuthenticated: boolean;
  onOpenOperatorAuth: () => void;
  onLockOperator: () => void;
}

const IS_OPERATOR_MODE = import.meta.env.VITE_OPERATOR_MODE === 'true';
const DealDeskHud = IS_OPERATOR_MODE ? React.lazy(() => import('./DealDeskHud')) : null;

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentView,
  onViewChange,
  isRefreshing,
  onHardRefresh,
  onOpenAudit,
  totalAssets,
  isOperatorAuthenticated,
  onOpenOperatorAuth,
  onLockOperator
}) => {
  const [isMobileHudCollapsed, setIsMobileHudCollapsed] = useState(false);

  // Dynamic Portfolio Appraisal Metrics (Public Telemetry & Master Protocol Values)
  const catalogAppraisalStr = '$105,000 – $235,250';
  const catalogAnchor = '~$160,000';
  const askStr = '$195,000 – $265,000';
  const acquisitionStr = '$135,000 – $175,000';
  const devStr = '$715k – $2.02M';
  const buyoutAnchor = '$14,500 Anchor';

  const showInternalDealDesk = IS_OPERATOR_MODE && isOperatorAuthenticated;

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

          {/* Operator Status Pill */}
          {isOperatorAuthenticated ? (
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded border border-emerald-500/50 font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
              <Unlock size={12} className="text-emerald-400" />
              <span className="hidden sm:inline">OPERATOR MODE</span> ACTIVE
            </span>
          ) : (
            <span className="bg-slate-800/80 text-slate-300 text-xs px-2.5 py-0.5 rounded border border-white/15 font-bold uppercase tracking-wider hidden sm:inline">
              PUBLIC STOREFRONT
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Operator Lock / Unlock button */}
          {isOperatorAuthenticated ? (
            <button
              onClick={onLockOperator}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 font-bold transition-colors cursor-pointer text-xs"
              title="Lock Private Deal Room (Hide internal deal math)"
            >
              <Lock size={13} className="text-amber-400" />
              <span>LOCK</span>
            </button>
          ) : (
            <button
              onClick={onOpenOperatorAuth}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-black transition-all cursor-pointer text-xs"
              title="Unlock Private Deal Room with Operator Key"
            >
              <Lock size={13} className="text-amber-400" />
              <span className="hidden xs:inline">OPERATOR</span> ACCESS
            </button>
          )}

          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <Server size={14} className="text-emerald-400 shrink-0" />
            <span>FLEET: <strong className="text-emerald-400">{totalAssets} DEMO</strong></span>
          </div>

          <button
            onClick={onOpenAudit}
            className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded border border-slate-700 font-bold"
            title="Inspect Postgres Schema with RLS Pattern Architecture"
          >
            <Database size={14} className="text-cyan-400" />
            <span>RLS: <strong className="text-cyan-400">Postgres Pattern</strong></span>
          </button>

          <button
            onClick={onOpenAudit}
            className="hidden lg:flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded border border-amber-500/50 font-bold"
            title="Inspect Institutional Build Ledger"
          >
            <Award size={14} />
            <span>CATALOG: <strong>{totalAssets}/{totalAssets} ACTIVE</strong></span>
          </button>

          <div
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold"
            title="Production Diligence Freeze Lock"
          >
            <span>Build: v1.3.1</span>
          </div>

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

      {/* DESKTOP 5-PILLAR RIBBON (Visible on lg screens) */}
      {showInternalDealDesk && DealDeskHud ? (
        <React.Suspense fallback={null}>
          <DealDeskHud
            catalogAppraisalStr={catalogAppraisalStr}
            catalogAnchor={catalogAnchor}
            askStr={askStr}
            acquisitionStr={acquisitionStr}
            devStr={devStr}
            buyoutAnchor={buyoutAnchor}
            totalAssets={totalAssets}
          />
        </React.Suspense>
      ) : (
        /* 2. PUBLIC STOREFRONT: RETAIL SHELF PRICING & CUSTOMER DELIVERABLES */
        <div className="hidden lg:grid lg:grid-cols-5 gap-3 py-3 border-b border-white/10 text-xs sm:text-sm">
          {/* 1. Reference Design Inventory */}
          <div className="bg-black/75 border border-emerald-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-emerald-400 transition-colors">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
              <span>Catalog Inventory</span>
              <span className="text-emerald-400 font-mono text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-black">FLEET</span>
            </div>
            <div className="mt-1.5">
              <span className="text-base sm:text-lg font-black text-emerald-400 block">{totalAssets} Blueprints</span>
              <span className="text-xs text-slate-300 block font-semibold">85 Track 1 + 25 Flagship SCADA</span>
            </div>
          </div>

          {/* 2. Track 1 Retail Shelf */}
          <div className="bg-black/75 border border-cyan-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
              <span>Track 1 Retail MSRP</span>
              <span className="text-cyan-400 font-mono text-xs bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 font-black">$199</span>
            </div>
            <div className="mt-1.5">
              <span className="text-base sm:text-lg font-black text-cyan-400 block">$199 USD</span>
              <span className="text-xs text-slate-300 block font-semibold">Turn-Key Concept Console Source</span>
            </div>
          </div>

          {/* 3. Commercial Team Seat */}
          <div className="bg-black/75 border border-amber-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
              <span>Commercial Team Seat</span>
              <span className="text-amber-400 font-mono text-xs bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">TEAM</span>
            </div>
            <div className="mt-1.5">
              <span className="text-base sm:text-lg font-black text-amber-400 block">$599 USD</span>
              <span className="text-xs text-slate-300 block font-semibold">Agency Multi-Seat Commercial License</span>
            </div>
          </div>

          {/* 4. Track 2 Flagship License */}
          <div className="bg-black/75 border border-purple-500/40 rounded-xl p-3 flex flex-col justify-between hover:border-purple-400 transition-colors">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
              <span>Flagship Tier-1 License</span>
              <span className="text-purple-400 font-mono text-xs bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/40 font-black">SCADA</span>
            </div>
            <div className="mt-1.5">
              <span className="text-base sm:text-lg font-black text-purple-400 block">$1,500 – $3,500</span>
              <span className="text-xs text-slate-300 block font-semibold">Full Physics Solver & Operator Console</span>
            </div>
          </div>

          {/* 5. Operator Deal Room Lock */}
          <div 
            onClick={onOpenOperatorAuth}
            className="bg-amber-950/20 border-2 border-amber-500/50 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1"><Lock size={12} /> Deal Room</span>
              <span className="text-amber-400 font-mono text-xs bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">M&A</span>
            </div>
            <div className="mt-1.5">
              <span className="text-base sm:text-lg font-black text-amber-400 group-hover:underline block">RESTRICTED</span>
              <span className="text-xs text-amber-300/80 block font-semibold">Click to Unlock M&A Telemetry</span>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE & TABLET 5-PILLAR DEAL DESK HUD RIBBON (< lg screens) */}
      <div className="lg:hidden border-b border-white/10 py-2 font-mono">
        <div className="flex items-center justify-between text-xs pb-1.5 px-1">
          <div className="flex items-center gap-1.5 text-slate-200 font-bold">
            <DollarSign size={15} className="text-emerald-400" />
            <span className="text-xs sm:text-sm font-black tracking-wide">
              {showInternalDealDesk ? 'DEAL DESK HUD (OPERATOR)' : 'PUBLIC SHELF PRICING'}
            </span>
            <span className="text-xs text-slate-400 font-normal">| Swipe ↔</span>
          </div>
          <button
            onClick={() => setIsMobileHudCollapsed(!isMobileHudCollapsed)}
            className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-white/20 cursor-pointer"
            title="Toggle view visibility"
          >
            <span>{isMobileHudCollapsed ? 'Expand' : 'Collapse'}</span>
            {isMobileHudCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>

        {isMobileHudCollapsed ? (
          showInternalDealDesk && DealDeskHud ? (
            <div 
              onClick={() => setIsMobileHudCollapsed(false)}
              className="flex items-center justify-between bg-black/80 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 cursor-pointer hover:border-emerald-400 transition-colors"
            >
              <span className="text-emerald-400 font-black">Deal Desk Active</span>
              <span className="text-cyan-400 font-black hidden xs:inline">Ask: {askStr}</span>
              <span className="text-pink-400 font-black">APA: {buyoutAnchor}</span>
            </div>
          ) : (
            <div 
              onClick={() => setIsMobileHudCollapsed(false)}
              className="flex items-center justify-between bg-black/80 border border-amber-500/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 cursor-pointer hover:border-amber-400 transition-colors"
            >
              <span className="text-emerald-400 font-black">{totalAssets} Blueprints</span>
              <span className="text-cyan-400 font-black">T1: $199</span>
              <span className="text-purple-400 font-black hidden xs:inline">T2: $1,500</span>
              <span 
                onClick={(e) => { e.stopPropagation(); onOpenOperatorAuth(); }}
                className="text-amber-400 font-black flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
              >
                <Lock size={11} /> Deal Room
              </span>
            </div>
          )
        ) : (
          showInternalDealDesk && DealDeskHud ? (
            <React.Suspense fallback={null}>
              <DealDeskHud
                catalogAppraisalStr={catalogAppraisalStr}
                catalogAnchor={catalogAnchor}
                askStr={askStr}
                acquisitionStr={acquisitionStr}
                devStr={devStr}
                buyoutAnchor={buyoutAnchor}
                totalAssets={totalAssets}
              />
            </React.Suspense>
          ) : (
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-1 pb-1.5 touch-pan-x">
              <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-emerald-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Track 1 Retail MSRP</span>
                  <span className="text-emerald-400 font-mono text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-black">MSRP</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-base sm:text-lg font-black text-emerald-400 block">$199 USD</span>
                  <span className="text-xs text-slate-300 block font-semibold">Unlimited End-Client Use</span>
                </div>
              </div>

              <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-cyan-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Commercial Team Pass</span>
                  <span className="text-cyan-400 font-mono text-xs bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 font-black">TEAM</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-base sm:text-lg font-black text-cyan-400 block">$599 USD</span>
                  <span className="text-xs text-slate-300 block font-semibold">Agency Multi-Seat Pack</span>
                </div>
              </div>

              <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-purple-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Flagship Commercial</span>
                  <span className="text-purple-400 font-mono text-xs bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/40 font-black">TIER-1</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-base sm:text-lg font-black text-purple-400 block">$1,500 – $3,500</span>
                  <span className="text-xs text-slate-300 block font-semibold">SCADA Physics Prototypes</span>
                </div>
              </div>

              <div className="min-w-[210px] shrink-0 snap-start bg-black/85 border-2 border-pink-500/50 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Exclusive Buyout</span>
                  <span className="text-pink-400 font-mono text-xs bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/40 font-black">APA</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-base sm:text-lg font-black text-pink-400 block">{buyoutAnchor}</span>
                  <span className="text-xs text-slate-300 block font-semibold">Track 1 ($4.5k) / T2 ($10k+)</span>
                </div>
              </div>

              <div 
                onClick={onOpenOperatorAuth}
                className="min-w-[210px] shrink-0 snap-start bg-amber-950/30 border-2 border-amber-500/70 rounded-xl p-3 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <span>Private Deal Room</span>
                  <span className="text-amber-400 font-mono text-xs bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">AUTH</span>
                </div>
                <div className="mt-1.5">
                  <span className="text-base sm:text-lg font-black text-amber-400 block flex items-center gap-1.5">
                    <Lock size={15} /> RESTRICTED
                  </span>
                  <span className="text-xs text-amber-200 block font-semibold">Tap to Unlock M&A Telemetry</span>
                </div>
              </div>
            </div>
          )
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
          {isOperatorAuthenticated ? <Unlock size={15} /> : <Lock size={15} />}
          <span>Screen 4: Deal Room</span>
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
            currentView === 'dealdesk' 
              ? 'bg-black/25 text-black' 
              : isOperatorAuthenticated ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
          }`}>
            {isOperatorAuthenticated ? 'UNLOCKED' : 'AUTH REQ'}
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
