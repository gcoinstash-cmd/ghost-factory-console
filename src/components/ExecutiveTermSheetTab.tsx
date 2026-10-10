import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Building, 
  Layers, 
  DollarSign, 
  Trash2,
  AlertOctagon,
  Cpu
} from 'lucide-react';
import { CATALOG_DATA, ProductItem } from '../catalogData';

interface ExecutiveTermSheetTabProps {
  products?: ProductItem[];
  totalAssets?: number;
  retainedFloor?: number;
  maxTransferable?: number;
}

export const ExecutiveTermSheetTab: React.FC<ExecutiveTermSheetTabProps> = ({
  products = CATALOG_DATA.products,
  totalAssets = 160,
  retainedFloor = 128,
  maxTransferable = 32
}) => {
  // Staging Basket for testing 80% Retention Floor enforcement
  const [stagedAssetIds, setStagedAssetIds] = useState<number[]>([89, 90, 91]);
  const [selectedAssetIdToAdd, setSelectedAssetIdToAdd] = useState<number>(92);

  const eligibleProducts = products.filter(p => p.buyoutEligible && !p.permanent);
  const currentStagedCount = stagedAssetIds.length;
  const isFloorBreached = currentStagedCount >= maxTransferable;

  const handleStageAsset = (id: number) => {
    if (stagedAssetIds.includes(id)) return;
    if (stagedAssetIds.length >= maxTransferable) return;
    setStagedAssetIds([...stagedAssetIds, id]);
  };

  const handleRemoveStagedAsset = (id: number) => {
    setStagedAssetIds(stagedAssetIds.filter(x => x !== id));
  };

  const handleAttemptBreach = () => {
    const testIds: number[] = eligibleProducts.map(p => p.id).slice(0, maxTransferable + 1);
    setStagedAssetIds(testIds);
  };

  const handleResetBasket = () => {
    setStagedAssetIds([89, 90, 91]);
  };

  return (
    <div className="space-y-6 font-mono w-full pb-8">
      {/* Header Banner */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={12} /> TAB 3 // EXECUTIVE TERM SHEET
              </span>
              <span className="text-[10px] text-slate-400">| Institutional Buyout Protocol</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Institutional Buyout Rules &amp; Clean-Room Diligence
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Standardized M&amp;A transaction framework enforcing the 80% master portfolio retention floor, ASC 350-40 capitalization standards, and clean-room IP audits.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
              80% Vault Floor: {retainedFloor} Retained / {maxTransferable} Liquid
            </span>
          </div>
        </div>
      </div>

      {/* DEALERSHIP RULE BOX: THE HARD WALK-AWAY PRICE */}
      <div className="bg-amber-950/30 border-2 border-amber-500/60 rounded-2xl p-5 space-y-2 text-amber-200">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <h2 className="text-sm font-black uppercase tracking-wider text-amber-300">
            Dealership Rule: The Hard Walk-Away Price ($1.75M Reserve Floor)
          </h2>
        </div>
        <p className="text-xs leading-relaxed text-slate-300">
          The Dealership Principal enforces an absolute internal reserve floor of <strong>$1,751,840</strong> (160 units × 100 engineering hours @ $109.49/hr Senior Architect replacement cost). GhostFactoryOS does not sell or negotiate below actual capitalized factory build costs under any scenario.
        </p>
      </div>

      {/* 80% RETENTION FLOOR SHIELD & STAGING BASKET */}
      <div className="bg-[#111114] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck size={14} /> 80% Master Portfolio Retention Floor Shield
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                {retainedFloor} of {totalAssets} Permanently Retained
              </span>
            </div>
            <h3 className="text-base font-black text-white mt-1">
              Active APA Staging Basket &amp; Capacity Guard
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetBasket}
              className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={handleAttemptBreach}
              className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              Test Breach (33)
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-bold">
              Capacity Utilization: <strong className={currentStagedCount >= maxTransferable ? 'text-red-400' : 'text-amber-400'}>{currentStagedCount} of {maxTransferable} Liquid Slots</strong>
            </span>
            <span className={`text-xs font-black ${currentStagedCount >= maxTransferable ? 'text-red-400' : 'text-emerald-400'}`}>
              {currentStagedCount >= maxTransferable ? 'BREACH PREVENTED — FLOOR LOCKED' : 'CAPACITY NOMINAL'}
            </span>
          </div>

          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex border border-white/10">
            <div 
              className="bg-emerald-500 h-full transition-all" 
              style={{ width: `80%` }} 
              title="80% Protected Factory Core" 
            />
            <div 
              className={`h-full transition-all ${currentStagedCount >= maxTransferable ? 'bg-red-500' : 'bg-amber-500'}`} 
              style={{ width: `${Math.min(20, (currentStagedCount / maxTransferable) * 20)}%` }} 
              title="Staged APA Slots" 
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>🛡️ 80% Sovereign Core Vault ({retainedFloor} Vehicles Permanent)</span>
            <span>⚡ Max 20% APA Capacity ({maxTransferable} Slots Maximum)</span>
          </div>
        </div>

        {/* Breach Alert if Capacity Exceeded */}
        {isFloorBreached && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/60 text-red-300 text-xs flex items-start gap-2.5">
            <AlertOctagon size={16} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block uppercase">Retention Floor Shield Engaged</strong>
              <p className="mt-0.5 leading-relaxed">
                Staged vehicles equal or exceed maximum allowed micro-APA transfer capacity ({maxTransferable} units). Additional transactions are locked to preserve the 80% portfolio retention floor.
              </p>
            </div>
          </div>
        )}

        {/* Staged Assets List */}
        <div className="pt-2 space-y-2">
          <span className="text-xs uppercase font-bold text-slate-400 block">
            Staged Vehicles for Review ({currentStagedCount}):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {stagedAssetIds.map((id) => {
              const p = products.find(x => x.id === id);
              if (!p) return null;
              return (
                <div key={id} className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">SLOT #{id.toString().padStart(3, '0')}</span>
                    <strong className="text-white block truncate max-w-[140px]">{p.name}</strong>
                  </div>
                  <button
                    onClick={() => handleRemoveStagedAsset(id)}
                    className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                    title="Remove vehicle"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MULTI-TRACK BUYOUT BRACKETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Track 1 Bracket */}
        <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-5 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 block w-fit">
            TRACK 1 // LEAN TUNER
          </span>
          <h4 className="text-base font-black text-white">Lean Rapid-Sale Templates</h4>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Retail MSRP:</span>
              <strong className="text-white font-mono">$199</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Team Seat:</span>
              <strong className="text-cyan-300 font-mono">$599</strong>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-white/10">
              <span className="text-slate-400">Buyout Anchor:</span>
              <strong className="text-emerald-400 font-mono text-sm">$4,500</strong>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Buyout Floor:</span>
              <span className="font-mono">$3,800–$6,500</span>
            </div>
          </div>
        </div>

        {/* Track 2 Bracket */}
        <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-5 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 block w-fit">
            TRACK 2 // HYPERCAR FLAGSHIP
          </span>
          <h4 className="text-base font-black text-white">Tier-1 SCADA Consoles</h4>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Flagship License:</span>
              <strong className="text-white font-mono">$1,500–$3,500</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Full Buyout Avg:</span>
              <strong className="text-amber-300 font-mono">$18,000–$35,000</strong>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-white/10">
              <span className="text-slate-400">Buyout Anchor:</span>
              <strong className="text-amber-400 font-mono text-sm">$14,500</strong>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Strategic Ceiling:</span>
              <span className="font-mono">$35,000–$75,000+</span>
            </div>
          </div>
        </div>

        {/* Track 3 Bracket */}
        <div className="bg-[#111114] border border-purple-500/40 rounded-2xl p-5 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30 block w-fit">
            TRACK 3 // F1 SKUNKWORKS
          </span>
          <h4 className="text-base font-black text-white">Production Reference Engines</h4>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Enterprise Seat:</span>
              <strong className="text-white font-mono">$1,500 / mo</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Baseline APA Floor:</span>
              <strong className="text-purple-300 font-mono">$35,000–$65,000</strong>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-white/10">
              <span className="text-slate-400">Monopoly License:</span>
              <strong className="text-pink-400 font-mono text-sm">$85,000</strong>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Vault Buyout Ceiling:</span>
              <span className="font-mono">$75,000–$150,000+</span>
            </div>
          </div>
        </div>
      </div>

      {/* CLEAN-ROOM IP DILIGENCE AUDIT MANIFEST */}
      <div className="bg-[#111114] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            Clean-Room Intellectual Property Diligence Manifest
          </h3>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40">
            AUDIT 360 PASSED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
            <strong className="text-emerald-400 block font-bold">100% Permissive Open Source IP</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Every dependency across all 160 digital vehicles is vetted for strictly permissive licenses (MIT, Apache 2.0, BSD). Zero GPL, AGPL, or SSPL copyleft packages to ensure clean M&amp;A chain-of-title.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
            <strong className="text-cyan-400 block font-bold">ASC 350-40 Capitalization Standard</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Valuation methodology grounded in 16,000 verified engineering hours evaluated at $109.49/hr Senior Systems Architect enterprise replacement rates, establishing the immutable $1.75M factory build floor.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
            <strong className="text-amber-400 block font-bold">NIST SP 800-218 SSDF v1.1 Alignment</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Secure Software Development Framework controls enforced: automated dependency audits, zero embedded secrets in client DOM, ephemeral sandboxes, and immutable build stamps.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
            <strong className="text-purple-400 block font-bold">Micro-APA IP Boundary Exclusions</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Asset purchase agreements convey code and assets strictly for the identified model. GhostFactoryOS core architectures, Aura &amp; Grid showroom brands, design tokens, and future products are permanently excluded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTermSheetTab;
