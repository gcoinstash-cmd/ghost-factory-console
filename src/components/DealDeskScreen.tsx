import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles, 
  Trash2,
  AlertOctagon
} from 'lucide-react';
import { ProductItem } from '../catalogData';

interface DealDeskScreenProps {
  products: ProductItem[];
  totalAssets: number;
  retainedFloor: number;
  maxTransferable: number;
  isOperatorAuthenticated?: boolean;
  onAuthenticate?: () => void;
  onLockOperator?: () => void;
}

export const DealDeskScreen: React.FC<DealDeskScreenProps> = ({
  products,
  totalAssets,
  retainedFloor,
  maxTransferable,
  isOperatorAuthenticated = false,
  onAuthenticate,
  onLockOperator
}) => {
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
  const [stagedAssetIds, setStagedAssetIds] = useState<number[]>([89, 90, 91]); // Starts with 3 buyout-eligible candidates
  const [selectedAssetIdToAdd, setSelectedAssetIdToAdd] = useState<number>(92);

  // Retention Floor Logic (Win C)
  const currentStagedCount = stagedAssetIds.length;
  const isFloorBreached = currentStagedCount >= maxTransferable; // 17 limit

  const handleStageAsset = (id: number) => {
    const p = products.find(x => x.id === id);
    if (!p || !p.buyoutEligible || p.permanent) return;
    if (stagedAssetIds.includes(id)) return;
    if (stagedAssetIds.length >= maxTransferable) {
      // Hard floor block: cannot exceed maxTransferable
      return;
    }
    setStagedAssetIds([...stagedAssetIds, id]);
  };

  const handleRemoveStagedAsset = (id: number) => {
    setStagedAssetIds(stagedAssetIds.filter(x => x !== id));
  };

  const handleAttemptBreach = () => {
    // Fill up to limit and attempt to breach for testing using eligible candidate IDs
    const eligibleProducts = products.filter(p => p.buyoutEligible && !p.permanent);
    const testIds: number[] = eligibleProducts.map(p => p.id).slice(0, maxTransferable + 1);
    setStagedAssetIds(testIds);
  };

  const handleResetBasket = () => {
    setStagedAssetIds([89, 90, 91]);
  };

  // OPERATOR PERIMETER ISOLATION GATE
  if (!isOperatorAuthenticated) {
    const handleAuthSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (authKey.trim().length > 0) {
        onAuthenticate?.();
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
              PRIVATE DEAL ROOM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Internal software asset appraisal models, acquisition framework schedules, and the 80% portfolio retention shield are isolated to authorized operators and accredited acquirers.
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
              <span className="text-[11px] text-slate-400 leading-tight block">Immutable rule retains 88 of 110 assets permanently.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-amber-500/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden glow-gold">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                <DollarSign size={14} /> SCREEN 4 // DEAL DESK & APPRAISAL ENGINE
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded border border-emerald-500/40 font-bold flex items-center gap-1">
                <Unlock size={11} className="text-emerald-400" /> OPERATOR UNLOCKED
              </span>
              {onLockOperator && (
                <button
                  onClick={onLockOperator}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded border border-white/15 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Lock size={11} className="text-amber-400" />
                  <span>LOCK</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              DUAL-TRACK PRICING & <span className="text-amber-400 font-mono">80% RETENTION SHIELD</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Enforces strict dual-track separation and immutable portfolio retention floors. Exclusive buyouts are selective micro-APAs, never whole-factory liquidations.
            </p>
          </div>

          <div className="bg-black/70 p-4 rounded-xl border border-white/10 text-xs flex items-center gap-5">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Vault Floor</span>
              <span className="text-xl font-black text-emerald-400">{retainedFloor} ASSETS</span>
              <span className="text-[10px] text-emerald-300 block">80% Permanent</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Max Transferable</span>
              <span className="text-xl font-black text-amber-400">{maxTransferable} SLOTS</span>
              <span className="text-[10px] text-amber-300 block">Cap at {totalAssets} Fleet</span>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL-TRACK PRICING PROTOCOL COMPARISON */}
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
            <span className="text-xs text-slate-400">Single-View Prototypes</span>
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
            <span className="text-xs text-slate-400">Elite SCADA / Physics</span>
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

      {/* WIN C: HARD-CODED 80% RETENTION FLOOR SHIELD (TRANSACTION ENGINE) */}
      <section className="bg-[#121215] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck size={16} /> WIN C // HARD-CODED 80% RETENTION FLOOR SHIELD
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              APA Staging Engine & Floor Breach Safeguard
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Guarantees the factory permanently retains at least 80% ({retainedFloor} of {totalAssets} assets). Prevents portfolio liquidation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAttemptBreach}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold cursor-pointer transition-colors"
              title="Test the 80% Retention Floor Barrier"
            >
              TEST BREACH SHIELD (&gt;{maxTransferable} ASSETS)
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
              Staged for Potential Micro-APA: <strong className="text-amber-400">{stagedAssetIds.length} / {maxTransferable} Assets</strong>
            </span>
            <span className={isFloorBreached ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
              Vault Retained: {totalAssets - stagedAssetIds.length} / {totalAssets} ({(((totalAssets - stagedAssetIds.length) / totalAssets) * 100).toFixed(0)}%)
            </span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
            <div 
              className={`h-full transition-all duration-300 ${
                isFloorBreached ? 'bg-red-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, ((totalAssets - stagedAssetIds.length) / totalAssets) * 100)}%` }}
            />
            <div 
              className={`h-full transition-all duration-300 ${
                isFloorBreached ? 'bg-red-700 animate-pulse' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.min(100, (stagedAssetIds.length / totalAssets) * 100)}%` }}
            />
          </div>
        </div>

        {/* WIN C RED UI BARRIER: TRIGGERED ON RETENTION FLOOR BREACH */}
        {isFloorBreached && (
          <div className="p-5 rounded-2xl bg-red-950/80 border-2 border-red-500 text-red-200 space-y-3 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse">
            <div className="flex items-center gap-3">
              <AlertOctagon size={28} className="text-red-400 shrink-0" />
              <div>
                <h4 className="text-base font-black text-white tracking-wide">
                  RETENTION FLOOR BREACH: FACTORY PROTECTION LOCK ACTIVE
                </h4>
                <p className="text-xs text-red-200 mt-0.5">
                  Asset cannot be scheduled for exclusive buyout. Portfolio retention has dropped below the immutable 80% floor (Minimum {retainedFloor} assets must remain permanently in the factory vault).
                </p>
              </div>
            </div>
            <div className="p-3 bg-black/60 rounded-lg border border-red-500/40 text-[11px] text-slate-300">
              🛡️ <strong>Rule Enforced:</strong> GhostFactoryOS core infrastructure, shared UI token libraries, and at least 80% of digital vehicles are permanently protected from transfer. Max ownership transfer capacity is {maxTransferable} assets.
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
                {products.map(p => {
                  const isEligible = Boolean(p.buyoutEligible && !p.permanent);
                  const isT2 = p.id >= 86 || p.pricing_track?.includes('Track 2');
                  return (
                    <option key={p.id} value={p.id} disabled={!isEligible}>
                      #{p.id.toString().padStart(3, '0')} [{!isEligible ? 'PERMANENT VAULT // N/A' : (isT2 ? 'TRACK 2 // CANDIDATE ($14.5k)' : 'TRACK 1 // LEAN ($4.5k)')}] {p.name}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() => handleStageAsset(selectedAssetIdToAdd)}
                disabled={isFloorBreached || stagedAssetIds.includes(selectedAssetIdToAdd) || !products.find(p => p.id === selectedAssetIdToAdd)?.buyoutEligible}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold cursor-pointer disabled:opacity-40"
              >
                + STAGE ASSET
              </button>
            </div>

            <span>{stagedAssetIds.length} Assets in Stage Queue</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {stagedAssetIds.map((id) => {
              const product = products.find(p => p.id === id);
              const isT2 = (product && (product.id >= 86 || product.flagship_qualified || product.pricing_track?.includes('Track 2'))) || id >= 86;
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

        {/* TRACK 2 FLAGSHIP CANDIDATE ROSTER DRAWER */}
        <div className="bg-black/50 border border-amber-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Track 2 Flagship Candidate Schedule (24 Elite Prototypes // $14,500 Anchor)</span>
            </span>
            <span className="text-slate-400 text-[11px]">Click +Stage to add to Micro-APA basket</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {products.filter(p => p.id >= 86 || p.pricing_track?.includes('Track 2')).map(p => {
              const isStaged = stagedAssetIds.includes(p.id);
              return (
                <div 
                  key={p.id}
                  className="bg-black/70 border border-amber-500/30 rounded-lg p-2.5 flex items-center justify-between gap-2"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-amber-400 font-bold">#{p.id.toString().padStart(3, '0')}</span>
                      <span className="text-[9px] text-slate-400 uppercase truncate">[{p.vertical}]</span>
                    </div>
                    <p className="font-bold text-white text-[11px] truncate">{p.name}</p>
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

        {/* Deal Action Buttons */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Est. Staged APA Value: <strong className="text-white">
              ${stagedAssetIds.reduce((sum, id) => {
                const p = products.find(x => x.id === id);
                return sum + ((p?.flagship_qualified || p?.pricing_track?.includes('Track 2') || id >= 86) ? 14500 : 4500);
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
};
