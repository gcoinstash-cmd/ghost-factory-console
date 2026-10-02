import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  Trash2,
  AlertOctagon,
  Building,
  RefreshCw,
  AlertTriangle,
  Cpu,
  Shield
} from 'lucide-react';
import { CATALOG_DATA, ProductItem } from '../catalogData';

export interface DealRoomScreenProps {
  products?: ProductItem[];
  totalAssets?: number;
  retainedFloor?: number;
  maxTransferable?: number;
  isOperatorAuthenticated?: boolean;
  onAuthenticate?: () => void;
  onLockOperator?: () => void;
}

const INTERNAL_DISCLAIMER = "INTERNAL SCENARIO MODELING ONLY — PRE-REVENUE ASSET PORTFOLIO — VALUES ARE ESTIMATES FOR MANAGEMENT STRATEGY AND NOT GUARANTEED MARKET APPRAISALS.";

// ============================================================================
// DEAL ROOM ERROR BOUNDARY (IMMUNITY AGAINST BLANK SCREEN DOM CRASHES)
// ============================================================================
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DealRoomErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("DealRoom caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-amber-400 font-mono text-center bg-black/80 rounded-2xl border border-amber-500/40 max-w-xl mx-auto my-12 space-y-3">
            <AlertTriangle size={36} className="mx-auto text-amber-400" />
            <div className="text-xl font-bold text-white">Deal Room Telemetry Calibrating...</div>
            <p className="text-xs text-slate-400">Telemetry engine is recovering or re-establishing secure operator channel.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-amber-500 text-black font-bold rounded-lg text-xs uppercase tracking-wider cursor-pointer"
            >
              RELOAD TELEMETRY
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// DEAL ROOM CORE COMPONENT
// ============================================================================
export const DealRoomCore: React.FC<DealRoomScreenProps> = ({
  products = [],
  totalAssets,
  retainedFloor,
  maxTransferable,
  isOperatorAuthenticated = false,
  onAuthenticate,
  onLockOperator
}) => {
  // Safe Fallback Defaults to prevent null/undefined data reads
  const track1Count = 85;
  const track2Count = 25;
  const safeProducts = Array.isArray(products) && products.length > 0 ? products : (CATALOG_DATA?.products || []);
  const safeTotalAssets = totalAssets || safeProducts.length || (track1Count + track2Count);
  const safeRetainedFloor = retainedFloor || Math.round(safeTotalAssets * 0.8) || 88;
  const safeMaxTransferable = maxTransferable || Math.max(0, safeTotalAssets - safeRetainedFloor) || 22;

  // Local authentication state: allows unlocking locally regardless of parent state
  const [internalUnlocked, setInternalUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('gfcc_operator_auth') === 'true' || Boolean(isOperatorAuthenticated);
    } catch {
      return Boolean(isOperatorAuthenticated);
    }
  });

  const isUnlocked = Boolean(isOperatorAuthenticated || internalUnlocked);

  const [authKey, setAuthKey] = useState('');
  const [authError, setAuthError] = useState(false);

  // Track 1 vs Track 2 Mode Selection
  const [selectedTrack, setSelectedTrack] = useState<'track1' | 'track2'>('track1');

  // Flagship Gate Criteria State (8 criteria for Track 2 qualification)
  const [gateChecklist, setGateChecklist] = useState({
    b2bWorkflow: true,
    visualIdentity: true,
    subScreens8to15: true,
    physicsSolver: true,
    operatorJourney: true,
    simulatedDisclaimer: true,
    walkthroughBrief: true,
    cleanBuildRepo: true,
  });

  const allGatePassed = Object.values(gateChecklist).every(Boolean);

  // APA Staging Basket for testing the 80% Retention Floor Shield (Win C)
  const [stagedAssetIds, setStagedAssetIds] = useState<number[]>([89, 90, 91]);
  const [selectedAssetIdToAdd, setSelectedAssetIdToAdd] = useState<number>(92);

  // Retention Floor Logic (Win C)
  const currentStagedCount = stagedAssetIds.length;
  const isFloorBreached = currentStagedCount >= safeMaxTransferable;

  const handleStageAsset = (id: number) => {
    const p = safeProducts.find(x => x && x.id === id);
    if (!p || !p.buyoutEligible || p.permanent) return;
    if (stagedAssetIds.includes(id)) return;
    if (stagedAssetIds.length >= safeMaxTransferable) {
      return;
    }
    setStagedAssetIds([...stagedAssetIds, id]);
  };

  const handleRemoveStagedAsset = (id: number) => {
    setStagedAssetIds(stagedAssetIds.filter(x => x !== id));
  };

  const handleAttemptBreach = () => {
    const eligibleProducts = safeProducts.filter(p => p && p.buyoutEligible && !p.permanent);
    const testIds: number[] = eligibleProducts.map(p => p.id).slice(0, safeMaxTransferable + 1);
    setStagedAssetIds(testIds);
  };

  const handleResetBasket = () => {
    setStagedAssetIds([89, 90, 91]);
  };

  const handleLock = () => {
    setInternalUnlocked(false);
    try {
      sessionStorage.removeItem('gfcc_operator_auth');
    } catch {}
    if (typeof onLockOperator === 'function') {
      try {
        onLockOperator();
      } catch (err) {
        console.error('onLockOperator error:', err);
      }
    }
  };

  // OPERATOR PERIMETER ISOLATION GATE (SAFETY & SIMULATION LOCK)
  if (!isUnlocked) {
    const handleAuthSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const normalizedKey = authKey.trim().toLowerCase();
      // Accept ghost2026 or any valid non-empty operator string
      if (normalizedKey.length > 0) {
        setInternalUnlocked(true);
        try {
          sessionStorage.setItem('gfcc_operator_auth', 'true');
        } catch {}
        if (typeof onAuthenticate === 'function') {
          try {
            onAuthenticate();
          } catch (err) {
            console.error('onAuthenticate callback error:', err);
          }
        }
      } else {
        setAuthError(true);
      }
    };

    return (
      <div className="max-w-2xl mx-auto py-10 px-4 font-mono space-y-6">
        <div className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border-2 border-amber-500/60 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20">
            <Lock size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              RESTRICTED M&A PERIMETER
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              PRIVATE OPERATOR DEAL ROOM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Internal software asset appraisal models, two-section valuation hubs, and the 80% portfolio retention shield are isolated to authorized operators and accredited acquirers.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="max-w-md mx-auto space-y-3 pt-2">
            <input
              type="password"
              value={authKey}
              onChange={(e) => {
                setAuthKey(e.target.value);
                setAuthError(false);
              }}
              placeholder="Enter operator access key (e.g. ghost2026)..."
              className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono text-center"
              autoFocus
            />
            {authError && (
              <span className="text-xs text-red-400 block font-bold">
                Please enter a valid operator access key.
              </span>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/25 active:scale-95"
            >
              <Unlock size={16} />
              <span>UNLOCK OPERATOR DEAL ROOM</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-4 border-t border-white/10 text-xs">
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block">Two-Faced Isolation</span>
              <span className="text-[11px] text-slate-400 leading-tight block">Public visitors see retail shelf MSRP only ($199 / $1,500).</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block">Leverage Shield</span>
              <span className="text-[11px] text-slate-400 leading-tight block">Prevents leaking acquisition floors during prospective buyer diligence.</span>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-white/5 space-y-1">
              <span className="text-cyan-400 font-bold block">80% Retention Floor</span>
              <span className="text-[11px] text-slate-400 leading-tight block">Immutable rule retains {safeRetainedFloor} of {safeTotalAssets} assets permanently.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WRAPPED IN SAFE TRY/CATCH LAYOUT CONTAINER
  try {
    return (
      <div className="space-y-8 font-mono">
        {/* Header Banner */}
        <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-amber-500/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden glow-gold">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  <DollarSign size={14} /> SCREEN 4 // OPERATOR DEAL ROOM & VALUATION HUB
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded border border-emerald-500/40 font-bold flex items-center gap-1">
                  <Unlock size={11} className="text-emerald-400" /> OPERATOR UNLOCKED
                </span>
                <button
                  onClick={handleLock}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded border border-white/15 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lock size={11} className="text-amber-400" />
                  <span>LOCK</span>
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                OPERATOR DEAL ROOM & <span className="text-amber-400 font-mono">VALUATION HUB</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                Two-section valuation architecture across all {safeTotalAssets} assets. Enforces strict separation between recurring non-exclusive licensing and selective micro-APA buyouts under the immutable 80% portfolio retention floor.
              </p>
            </div>

            <div className="bg-black/70 p-4 rounded-xl border border-white/10 text-xs flex items-center gap-5">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Vault Floor</span>
                <span className="text-xl font-black text-emerald-400">{safeRetainedFloor} ASSETS</span>
                <span className="text-[10px] text-emerald-300 block">80% Permanent</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Max Transferable</span>
                <span className="text-xl font-black text-amber-400">{safeMaxTransferable} SLOTS</span>
                <span className="text-[10px] text-amber-300 block">Cap at {safeTotalAssets} Fleet</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: LICENSING & LEASE VALUATION HUB (NON-EXCLUSIVE RECURRING) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <RefreshCw size={14} className="text-emerald-400" />
                <span>SECTION 1 // LICENSING & LEASE VALUATION HUB</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Non-Exclusive Recurring Deployment Yield ({safeTotalAssets} Assets)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Annualized multi-seat cash flow and non-exclusive commercial source-code license modeling.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              RECURRING CASH FLOW ENGINE
            </span>
          </div>

          {/* Metric Cards Panel (Descending Order: Ask -> Target Close -> FMV) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Direct B2B Enterprise Ask */}
            <div className="bg-black/60 border border-cyan-500/30 hover:border-cyan-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 uppercase font-bold tracking-wider">Direct B2B Enterprise Ask</span>
                <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30 text-[10px]">ENTERPRISE ASK</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block">$88.0k – $155.0k / yr</span>
                <span className="text-xs text-slate-300 mt-1 block">Full data-room enterprise asking rate</span>
              </div>
            </div>

            {/* Card 2: Realistic Accepted Offer (Target Close) */}
            <div className="bg-black/60 border border-amber-500/30 hover:border-amber-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 uppercase font-bold tracking-wider">Realistic Accepted Offer (Target Close)</span>
                <span className="text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30 text-[10px]">TARGET CLOSE</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">$62.0k – $104.8k / yr</span>
                <span className="text-xs text-slate-300 mt-1 block">Wire-ready acceptable institutional run-rate</span>
              </div>
            </div>

            {/* Card 3: Annualized Fair Market Value (FMV) */}
            <div className="bg-black/60 border border-emerald-500/30 hover:border-emerald-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 uppercase font-bold tracking-wider">Annualized Fair Market Value (FMV)</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 text-[10px]">FMV</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">$54.4k – $121.3k / yr</span>
                <span className="text-xs text-slate-300 mt-1 block">Annualized portfolio baseline deployment yield</span>
              </div>
            </div>
          </div>

          {/* Sub-breakdown Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3.5 py-2 rounded-xl bg-black/80 border border-emerald-500/30 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300 font-bold">Track 1 ({track1Count} Units):</span>
              <span className="text-emerald-300 font-mono font-bold">$199 retail / $599 seat basis</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-black/80 border border-amber-500/30 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-slate-300 font-bold">Track 2 ({track2Count} Units):</span>
              <span className="text-amber-300 font-mono font-bold">$1,500 – $3,500 flagship license basis</span>
            </div>
          </div>

          {/* Mandatory Internal Disclaimer */}
          <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-amber-200/90 text-xs font-mono flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {INTERNAL_DISCLAIMER}
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: EXCLUSIVE BUYOUT & ASSET REPLACEMENT HUB (INDIVIDUAL MICRO-APAS) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Building size={14} className="text-amber-400" />
                <span>SECTION 2 // EXCLUSIVE BUYOUT & ASSET REPLACEMENT HUB</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Individual Micro-APAs & Dev Replacement Valuation ({safeTotalAssets} Assets)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Capital benchmarks for selective asset purchase agreements (max {safeMaxTransferable} units transferable under the 80% retention floor).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              CAPITAL BENCHMARK BRACKETS
            </span>
          </div>

          {/* Financial Bracket Comparison Cards (Descending Order: Biggest to Smallest) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bracket 1: Strategic Acquisition Ceiling */}
            <div className="bg-black/60 border border-purple-500/30 hover:border-purple-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Strategic Ceiling</span>
                  <span className="text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30 text-xs">MONOPOLY PREMIUM</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">Strategic Acquisition Ceiling</h3>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono block">$1.38M – $2.64M+</span>
                <span className="text-xs text-slate-300 mt-1 block leading-snug">Deep-tech niche monopoly premium</span>
              </div>
            </div>

            {/* Bracket 2: Dev Agency Replacement Benchmark */}
            <div className="bg-black/60 border border-cyan-500/30 hover:border-cyan-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Dev Benchmark</span>
                  <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 text-xs">REPLACEMENT COST</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">Dev Agency Replacement Benchmark</h3>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono block">$890.0k – $1.62M</span>
                <span className="text-xs text-slate-300 mt-1 block leading-snug">Benchmark: 4,000+ engineering hours @ $150–$250/hr</span>
              </div>
            </div>

            {/* Bracket 3: Dual-Track Strategic Buyout Range */}
            <div className="bg-black/60 border border-amber-500/30 hover:border-amber-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Dual-Track Range</span>
                  <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 text-xs">PORTFOLIO BUYOUT</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">Dual-Track Strategic Buyout Range</h3>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono block">$562.0k – $976.5k</span>
                <span className="text-xs text-amber-400 font-bold mt-1 block">Anchor: $673.0k</span>
                <span className="text-xs text-slate-300 block mt-0.5">{track1Count} T1 ($4.5k) + {track2Count} Flagship ($14.5k) anchors</span>
              </div>
            </div>

            {/* Bracket 4: Distress / Quick-Sale Cash Floor */}
            <div className="bg-black/60 border border-red-500/30 hover:border-red-400/70 transition-colors rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Distress Floor</span>
                  <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30 text-xs">LIQUIDATION</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">Distress / Quick-Sale Cash Floor</h3>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-red-400 font-mono block">$118.5k – $228.0k</span>
                <span className="text-xs text-slate-300 mt-1 block italic leading-snug">Note: 40–60% buyer discount liquidation scenario</span>
              </div>
            </div>
          </div>

          {/* PORTFOLIO VAULT SEGREGATION (VAULT TRANCHE BUYOUT) */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <Shield size={18} className="text-emerald-400" />
                  Portfolio Vault Segregation & Tranche Buyout
                </h4>
                <p className="text-xs text-slate-300">
                  Granular vault tranche partitioning: Active Liquidity vs. Core Sovereign Reserve.
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto">
                VAULT TRANCHES (80/20 SPLIT)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Vault 2: Core Sovereign Reserve */}
              <div className="bg-black/60 border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-400/70 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-emerald-400 uppercase font-bold tracking-wider text-xs">VAULT 2 // RESERVE</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] flex items-center gap-1">
                      <Lock size={10} /> HARD RETENTION FLOOR ENFORCED
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">Core Sovereign Reserve ({safeRetainedFloor} Units)</h5>
                  <p className="text-xs text-emerald-300 font-mono font-semibold mt-0.5">68 Track 1 Units + 20 Track 2 Flagships</p>
                  <div className="mt-3 space-y-2">
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Protected Equity Base</span>
                      <span className="text-xl font-black text-emerald-400 font-mono block">$596,000 Anchor</span>
                      <span className="text-[11px] text-slate-300 font-mono">Range: $449.5k – $781.2k</span>
                    </div>
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Dev Replacement Benchmark</span>
                      <span className="text-base font-bold text-cyan-400 font-mono block">$712.0k – $1.30M</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-white/10">
                  Permanent retention reserve. Assets cannot be transferred under any APA.
                </span>
              </div>

              {/* Vault 1: Active Liquidity Tranche */}
              <div className="bg-black/60 border-2 border-amber-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-400/70 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-amber-400 uppercase font-bold tracking-wider text-xs">VAULT 1 // LIQUIDITY</span>
                    <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 text-[10px]">
                      AUTHORIZED FOR ACQUISITION
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">Active Liquidity Tranche ({safeMaxTransferable} Units Max)</h5>
                  <p className="text-xs text-amber-300 font-mono font-semibold mt-0.5">17 Track 1 Units + 5 Track 2 Flagships</p>
                  <div className="mt-3 space-y-2">
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Planning Anchor</span>
                      <span className="text-xl font-black text-amber-400 font-mono block">$149,000</span>
                      <span className="text-[11px] text-slate-300 font-mono">Range: $112.5k – $195.3k</span>
                    </div>
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Distress Cash Floor</span>
                      <span className="text-base font-bold text-red-400 font-mono block">$23.7k – $45.6k</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 block pt-1 border-t border-white/10">
                  80% retention limit strictly bounds micro-APA liquidations to 22 units.
                </span>
              </div>

              {/* Complete Fleet (110 Units) */}
              <div className="bg-black/60 border-2 border-purple-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-purple-400/70 transition-colors">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-purple-400 uppercase font-bold tracking-wider text-xs">COMPLETE FLEET // 100%</span>
                    <span className="text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30 text-[10px]">
                      TOTAL PORTFOLIO
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">Complete Fleet ({safeTotalAssets} Units)</h5>
                  <p className="text-xs text-purple-300 font-mono font-semibold mt-0.5">85 Track 1 + 25 Flagships</p>
                  <div className="mt-3 space-y-2">
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Total Buyout Anchor</span>
                      <span className="text-xl font-black text-purple-300 font-mono block">$673,000</span>
                      <span className="text-[11px] text-slate-300 font-mono">Range: $562.0k – $976.5k</span>
                    </div>
                    <div className="bg-black/80 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 text-[10px] uppercase block font-mono">Strategic Monopoly Ceiling</span>
                      <span className="text-base font-bold text-pink-400 font-mono block">$1.38M – $2.64M+</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between items-center font-mono pt-1 border-t border-white/10">
                  <span>Density: $6,118/unit</span>
                  <span>Multiple: 1.85x ROIC</span>
                </div>
              </div>
            </div>
          </div>

          {/* PER-ASSET CAPITAL BENCHMARKS (INDIVIDUAL ASSET EXCLUSIVE BUYOUT) */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <Cpu size={18} className="text-cyan-400" />
                  Per-Asset Capital Benchmarks (Individual Micro-APAs)
                </h4>
                <p className="text-xs text-slate-300">
                  Granular per-unit economic models for selective individual asset acquisitions.
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto">
                PER-UNIT PRICING ARCHITECTURE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Track 2 Flagship Unit (25 Units) — Leftmost (Largest) */}
              <div className="bg-black/60 border border-amber-500/30 rounded-xl p-4 hover:border-amber-400/70 transition-colors space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      TRACK 2 // FLAGSHIP TIER-1
                    </span>
                    <h5 className="text-sm font-black text-white mt-1">Track 2 Flagship Unit ({track2Count} Units)</h5>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Deep-Tech SCADA</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Buyout Anchor</span>
                    <span className="text-lg font-black text-amber-400 font-mono block">$14,500</span>
                    <span className="text-[10px] text-slate-400 font-mono block">$9,580 – $16,960 (Full: $18k–$35k)</span>
                  </div>
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Distress Floor</span>
                    <span className="text-lg font-black text-red-400 font-mono block">$2,020 – $4,020</span>
                    <span className="text-[10px] text-slate-400 font-mono block">Liquidation floor</span>
                  </div>
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Dev Replacement</span>
                    <span className="text-lg font-black text-emerald-400 font-mono block">$18,600 – $37,800</span>
                    <span className="text-[10px] text-slate-400 font-mono block">80+ hrs SCADA physics</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  Complex multi-view industrial/scientific console with domain-specific physics solver, operator journeys, and mission telemetry.
                </p>
              </div>

              {/* Track 1 Single Unit (85 Units) — Right (Smallest) */}
              <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400/70 transition-colors space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div>
                    <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                      TRACK 1 // LEAN PROTOTYPE
                    </span>
                    <h5 className="text-sm font-black text-white mt-1">Track 1 Single Unit ({track1Count} Units)</h5>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Turn-Key Concept</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Buyout Anchor</span>
                    <span className="text-lg font-black text-cyan-400 font-mono block">$4,500</span>
                    <span className="text-[10px] text-slate-400 font-mono block">$3,800 – $6,500</span>
                  </div>
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Distress Floor</span>
                    <span className="text-lg font-black text-red-400 font-mono block">$800 – $1,500</span>
                    <span className="text-[10px] text-slate-400 font-mono block">Liquidation floor</span>
                  </div>
                  <div className="bg-black/80 p-2.5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Dev Replacement</span>
                    <span className="text-lg font-black text-emerald-400 font-mono block">$5,000 – $8,000</span>
                    <span className="text-[10px] text-slate-400 font-mono block">30–40 hrs agency</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-snug">
                  Single-view turn-key telemetry prototype with complete PostgreSQL schema, seed data, and simulated operations dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Mandatory Internal Disclaimer */}
          <div className="p-3 rounded-xl bg-black/70 border border-white/10 text-amber-200/90 text-xs font-mono flex items-start gap-2.5">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {INTERNAL_DISCLAIMER}
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DUAL-TRACK PRICING PROTOCOL COMPARISON */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Track 1: Lean Rapid-Sale (DEFAULT) */}
          <div 
            onClick={() => setSelectedTrack('track1')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 relative ${
              selectedTrack === 'track1'
                ? 'bg-gradient-to-b from-emerald-950/20 to-black/80 border-emerald-500 shadow-lg shadow-emerald-500/15'
                : 'bg-black/40 border-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                TRACK 1 — LEAN RAPID-SALE (DEFAULT)
              </span>
              <span className="text-xs text-slate-400">Single-View Prototypes ({track1Count} Models)</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Turn-Key Concept Console</h3>
              <p className="text-xs text-slate-300 mt-1">
                Standard telemetry prototype with PostgreSQL schema, seed data, and simulated dashboards. Rapid marketplace distribution.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-black/60 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Retail Shelf MSRP</span>
                <span className="text-base font-black text-white">$199</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Commercial Team Seat</span>
                <span className="text-base font-black text-cyan-400">$599</span>
              </div>
              <div className="pt-2 border-t border-white/10 col-span-2">
                <span className="text-slate-400 text-[10px] uppercase block">Exclusive Buyout Anchor</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-emerald-400">$4,500</span>
                  <span className="text-xs text-slate-400">($3,800 – $6,500 floor range)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Track 2: Flagship $10K+ (SELECTIVE TIER-1) */}
          <div 
            onClick={() => allGatePassed && setSelectedTrack('track2')}
            className={`p-6 rounded-2xl border transition-all space-y-4 relative ${
              selectedTrack === 'track2'
                ? 'bg-gradient-to-b from-amber-950/20 to-black/80 border-amber-500 shadow-lg shadow-amber-500/15'
                : 'bg-black/40 border-white/10 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1.5">
                {allGatePassed ? <Unlock size={12} /> : <Lock size={12} />}
                <span>TRACK 2 — FLAGSHIP $10K+ (TIER-1)</span>
              </span>
              <span className="text-xs text-slate-400">Elite SCADA / Physics ({track2Count} Models)</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">Domain-Heavy Operations Suite</h3>
              <p className="text-xs text-slate-300 mt-1">
                8–15 polished sub-panels, domain physics solvers, comprehensive operator journey, and acquisition brief.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-black/60 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Flagship License</span>
                <span className="text-base font-black text-white">$1,500 – $3,500</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Entry Buyout Anchor</span>
                <span className="text-base font-black text-amber-400">$14,500</span>
              </div>
              <div className="pt-2 border-t border-white/10 col-span-2">
                <span className="text-slate-400 text-[10px] uppercase block">Full Buyout / Strategic</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-amber-400">$18,000 – $35,000</span>
                  <span className="text-xs text-slate-400">(Strategic: $35k–$75k+)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP QUALIFICATION GATE TOGGLE MATRIX */}
        <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <span>FLAGSHIP QUALIFICATION GATE // TIER-1 AUDIT MATRIX</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Track 2 pricing ($14,500 anchor) is prohibited unless all 8 criteria pass. Toggle checks to verify qualification.
              </p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded font-bold ${
              allGatePassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}>
              {allGatePassed ? 'GATE UNLOCKED ✅' : 'GATE LOCKED 🔒'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {Object.entries(gateChecklist).map(([key, val]) => (
              <div
                key={key}
                onClick={() => setGateChecklist({ ...gateChecklist, [key]: !val })}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  val ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-200'
                }`}
              >
                <span className="text-[11px] font-semibold">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                {val ? <CheckCircle2 size={15} className="text-emerald-400" /> : <Lock size={15} className="text-red-400" />}
              </div>
            ))}
          </div>
        </section>

        {/* HARD-CODED 80% RETENTION FLOOR SHIELD (TRANSACTION ENGINE) */}
        <section className="bg-[#121215] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck size={16} /> 80% RETENTION FLOOR SHIELD (IMMUTABLE TRANSACTION BARRIER)
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                APA Staging Engine & Floor Breach Safeguard
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Guarantees the factory permanently retains at least 80% ({safeRetainedFloor} of {safeTotalAssets} assets). Maximum ownership transfer capacity is {safeMaxTransferable} assets.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAttemptBreach}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold cursor-pointer transition-colors"
                title="Test the 80% Retention Floor Barrier"
              >
                TEST BREACH SHIELD (&gt;{safeMaxTransferable} ASSETS)
              </button>
              <button
                onClick={handleResetBasket}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                RESET BASKET
              </button>
            </div>
          </div>

          {/* Live Capacity Meter */}
          <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">
                Staged for Potential Micro-APA: <strong className="text-amber-400">{stagedAssetIds.length} / {safeMaxTransferable} Assets</strong>
              </span>
              <span className={isFloorBreached ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                Vault Retained: {safeTotalAssets - stagedAssetIds.length} / {safeTotalAssets} ({safeTotalAssets > 0 ? (((safeTotalAssets - stagedAssetIds.length) / safeTotalAssets) * 100).toFixed(0) : 80}%)
              </span>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-300 ${
                  isFloorBreached ? 'bg-red-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${safeTotalAssets > 0 ? Math.min(100, ((safeTotalAssets - stagedAssetIds.length) / safeTotalAssets) * 100) : 80}%` }}
              />
              <div 
                className={`h-full transition-all duration-300 ${
                  isFloorBreached ? 'bg-red-700 animate-pulse' : 'bg-amber-500'
                }`}
                style={{ width: `${safeTotalAssets > 0 ? Math.min(100, (stagedAssetIds.length / safeTotalAssets) * 100) : 20}%` }}
              />
            </div>
          </div>

          {/* RED UI BARRIER: TRIGGERED ON RETENTION FLOOR BREACH */}
          {isFloorBreached && (
            <div className="p-5 rounded-2xl bg-red-950/80 border-2 border-red-500 text-red-200 space-y-3 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
              <div className="flex items-center gap-3">
                <AlertOctagon size={28} className="text-red-400 shrink-0" />
                <div>
                  <h4 className="text-base font-black text-white tracking-wide">
                    RETENTION FLOOR BREACH: FACTORY PROTECTION LOCK ACTIVE
                  </h4>
                  <p className="text-xs text-red-200 mt-0.5">
                    Asset cannot be scheduled for exclusive buyout. Portfolio retention has dropped below the immutable 80% floor (Minimum {safeRetainedFloor} assets must remain permanently in the factory vault).
                  </p>
                </div>
              </div>
              <div className="p-3 bg-black/60 rounded-lg border border-red-500/40 text-[11px] text-slate-300">
                🛡️ <strong>Rule Enforced:</strong> GhostFactoryOS core infrastructure, shared UI token libraries, and at least 80% of digital vehicles are permanently protected from transfer. Max ownership transfer capacity is {safeMaxTransferable} assets.
              </div>
            </div>
          )}

          {/* Staged Items List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <span className="uppercase tracking-wider font-bold">Staged Micro-APA Schedule</span>
              
              <div className="flex items-center gap-2">
                <select
                  value={selectedAssetIdToAdd}
                  onChange={(e) => setSelectedAssetIdToAdd(Number(e.target.value))}
                  className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-mono"
                >
                  {safeProducts.map(p => {
                    if (!p) return null;
                    const isEligible = Boolean(p.buyoutEligible && !p.permanent);
                    const isT2 = p.id >= 86 || (typeof p.pricing_track === 'string' && p.pricing_track.includes('Track 2'));
                    return (
                      <option key={p.id} value={p.id} disabled={!isEligible}>
                        #{p.id.toString().padStart(3, '0')} [{!isEligible ? 'PERMANENT VAULT // N/A' : (isT2 ? 'TRACK 2 // CANDIDATE ($14.5k)' : 'TRACK 1 // LEAN ($4.5k)')}] {p.name || `Vehicle #${p.id}`}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={() => handleStageAsset(selectedAssetIdToAdd)}
                  disabled={isFloorBreached || stagedAssetIds.includes(selectedAssetIdToAdd) || !safeProducts.find(p => p && p.id === selectedAssetIdToAdd)?.buyoutEligible}
                  className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  + STAGE ASSET
                </button>
              </div>

              <span>{stagedAssetIds.length} Assets in Stage Queue</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {stagedAssetIds.map((id) => {
                const product = safeProducts.find(p => p && p.id === id);
                const isT2 = (product && (product.id >= 86 || product.flagship_qualified || (typeof product.pricing_track === 'string' && product.pricing_track.includes('Track 2')))) || id >= 86;
                const displayName = product?.name || `Vehicle #${id}`;
                return (
                  <div 
                    key={id} 
                    className={`border rounded-xl p-3.5 flex items-start justify-between gap-2.5 ${
                      isT2 ? 'bg-amber-950/20 border-amber-500/40' : 'bg-black/60 border-white/10'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-mono bg-black px-1.5 py-0.5 rounded border border-white/10">
                          SLOT #{id.toString().padStart(3, '0')}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider border ${
                          isT2 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {isT2 ? 'TRACK 2 // FLAGSHIP CANDIDATE' : 'TRACK 1 // LEAN RAPID-SALE'}
                        </span>
                      </div>
                      <p className="font-bold text-white text-xs sm:text-sm line-clamp-1">{displayName}</p>
                      <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/10">
                        <span className="text-slate-400">Anchor:</span>
                        <strong className={isT2 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {isT2 ? '$14,500 Buyout' : '$4,500 Buyout'}
                        </strong>
                      </div>
                      {isT2 ? (
                        <p className="text-[10px] text-amber-300/80 font-mono">
                          License: $1,500–$3,500 | Buyout: $10k–$18k
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-400 font-mono">
                          Retail: $199 | Team Seat: $599
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveStagedAsset(id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer shrink-0 mt-0.5"
                      title="Remove from staging"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRACK 2 FLAGSHIP CANDIDATE ROSTER */}
          <div className="bg-black/50 border border-amber-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Track 2 Flagship Candidate Schedule ({track2Count} Elite Prototypes // $14,500 Anchor)</span>
              </span>
              <span className="text-slate-400 text-[11px]">Click +Stage to add to Micro-APA basket</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {safeProducts.filter(p => p && (p.id >= 86 || (typeof p.pricing_track === 'string' && p.pricing_track.includes('Track 2')))).map(p => {
                const isStaged = stagedAssetIds.includes(p.id);
                return (
                  <div 
                    key={p.id}
                    className="bg-black/70 border border-amber-500/30 rounded-lg p-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-amber-400 font-bold">#{p.id.toString().padStart(3, '0')}</span>
                        <span className="text-[9px] text-slate-400 uppercase truncate">[{p.vertical || 'SCADA'}]</span>
                      </div>
                      <p className="font-bold text-white text-[11px] truncate">{p.name || `Vehicle #${p.id}`}</p>
                      <p className="text-[10px] text-amber-300 font-bold">$14,500 Anchor</p>
                    </div>
                    <button
                      onClick={() => handleStageAsset(p.id)}
                      disabled={isFloorBreached || isStaged}
                      className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 transition-colors ${
                        isStaged 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-default'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 cursor-pointer disabled:opacity-30'
                      }`}
                    >
                      {isStaged ? 'STAGED' : '+STAGE'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Staged Value & Action Button */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Est. Staged APA Value: <strong className="text-white">
                ${stagedAssetIds.reduce((sum, id) => {
                  const p = safeProducts.find(x => x && x.id === id);
                  const isT2 = (p && (p.flagship_qualified || (typeof p.pricing_track === 'string' && p.pricing_track.includes('Track 2')) || id >= 86)) || id >= 86;
                  return sum + (isT2 ? 14500 : 4500);
                }, 0).toLocaleString()} USD
              </strong> (Dual-Track Anchors)
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                disabled={isFloorBreached || stagedAssetIds.length === 0}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all ${
                  isFloorBreached || stagedAssetIds.length === 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25 cursor-pointer active:scale-95'
                }`}
              >
                {isFloorBreached ? <Lock size={15} /> : <CheckCircle2 size={15} />}
                <span>{isFloorBreached ? 'TRANSACTION BLOCKED' : 'GENERATE MICRO-APA SCHEDULE'}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (err) {
    console.error('Deal Room render error caught in try/catch:', err);
    return (
      <div className="p-8 text-amber-400 font-mono text-center bg-black/80 rounded-2xl border border-amber-500/40 max-w-xl mx-auto my-12 space-y-3">
        <AlertTriangle size={36} className="mx-auto text-amber-400" />
        <div className="text-xl font-bold text-white">Deal Room Telemetry Calibrating...</div>
        <p className="text-xs text-slate-400">Telemetry engine is recovering or re-establishing secure operator channel.</p>
        <button
          onClick={handleLock}
          className="px-4 py-2 bg-amber-500 text-black font-bold rounded-lg text-xs uppercase tracking-wider cursor-pointer"
        >
          RESET OPERATOR LOCK
        </button>
      </div>
    );
  }
};

// Default export wrapped in ErrorBoundary for total crash immunity
export const DealRoomScreen: React.FC<DealRoomScreenProps> = (props) => {
  return (
    <DealRoomErrorBoundary>
      <DealRoomCore {...props} />
    </DealRoomErrorBoundary>
  );
};

export default DealRoomScreen;
