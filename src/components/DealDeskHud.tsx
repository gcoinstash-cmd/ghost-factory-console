import React from 'react';

interface DealDeskHudProps {
  catalogAppraisalStr?: string;
  catalogAnchor?: string;
  askStr?: string;
  acquisitionStr?: string;
  devStr?: string;
  buyoutAnchor?: string;
  totalAssets?: number;
}

export const DealDeskHud: React.FC<DealDeskHudProps> = ({
  catalogAppraisalStr = '$105,000 – $235,250',
  catalogAnchor = '$160,000 Anchor',
  askStr = '$195,000 – $265,000',
  acquisitionStr = '$135,000 – $175,000',
  devStr = '$715k – $2.02M',
  buyoutAnchor = '$14,500 Anchor',
  totalAssets = 114,
}) => {
  return (
    <div className="py-3 border-b border-white/10 text-xs sm:text-sm font-mono space-y-2">
      {/* 5-PILLAR OPERATOR INTERNAL ASK & VALUATION HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
        {/* 1. Internal Ask Range (unaudited) */}
        <div className="bg-black/75 border border-emerald-500/40 rounded-xl p-3.5 flex flex-col justify-between hover:border-emerald-400 transition-colors w-full">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Internal Ask Range (unaudited)</span>
            <span className="text-emerald-400 font-mono text-xs bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/40 font-black">INTERNAL</span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block tracking-tight">{catalogAppraisalStr}</span>
            <span className="text-sm text-slate-200 block font-semibold leading-relaxed mt-0.5">Anchor: {catalogAnchor} ({totalAssets} Assets)</span>
          </div>
        </div>

        {/* 2. Direct B2B Ask */}
        <div className="bg-black/75 border border-cyan-500/40 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-400 transition-colors w-full">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Direct B2B Ask</span>
            <span className="text-cyan-400 font-mono text-xs bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/40 font-black">ASK</span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-cyan-400 block tracking-tight">{askStr}</span>
            <span className="text-sm text-slate-200 block font-semibold leading-relaxed mt-0.5">Data Room Asking Target</span>
          </div>
        </div>

        {/* 3. Realistic Accepted Offer */}
        <div className="bg-black/75 border border-amber-500/40 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-400 transition-colors w-full">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Realistic Accepted Offer</span>
            <span className="text-amber-400 font-mono text-xs bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 font-black">ACQUISITION</span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-amber-400 block tracking-tight">{acquisitionStr}</span>
            <span className="text-sm text-slate-200 block font-semibold leading-relaxed mt-0.5">Institutional Wire Ready</span>
          </div>
        </div>

        {/* 4. Estimated cost to rebuild (not market value) */}
        <div className="bg-black/75 border border-purple-500/40 rounded-xl p-3.5 flex flex-col justify-between hover:border-purple-400 transition-colors w-full">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Estimated cost to rebuild (not market value)</span>
            <span className="text-purple-400 font-mono text-xs bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/40 font-black">DEV</span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-purple-400 block tracking-tight">{devStr}</span>
            <span className="text-sm text-slate-200 block font-semibold leading-relaxed mt-0.5">Agency Duplicate ({totalAssets} Models)</span>
          </div>
        </div>

        {/* 5. Exclusive Buyout */}
        <div className="bg-black/75 border border-pink-500/40 rounded-xl p-3.5 flex flex-col justify-between hover:border-pink-400 transition-colors w-full">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Exclusive Buyout</span>
            <span className="text-pink-400 font-mono text-xs bg-pink-950/80 px-1.5 py-0.5 rounded border border-pink-500/40 font-black">APA</span>
          </div>
          <div className="mt-2">
            <span className="text-xl sm:text-2xl font-black text-pink-400 block tracking-tight">{buyoutAnchor}</span>
            <span className="text-sm text-slate-200 block font-semibold leading-relaxed mt-0.5">T2 Flagship ($10k–$18k) / T1 ($4.5k)</span>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Under Panel */}
      <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-slate-400 text-xs text-center font-mono">
        Pre-revenue portfolio. Figures are management estimates, not an appraisal.
      </div>
    </div>
  );
};

export default DealDeskHud;
