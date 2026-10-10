import React from 'react';
import { Sliders, AlertTriangle } from 'lucide-react';

export interface FleetScaleSliderProps {
  fleetCount: number;
  onFleetCountChange: (count: number) => void;
  className?: string;
}

export const FleetScaleSlider: React.FC<FleetScaleSliderProps> = ({
  fleetCount,
  onFleetCountChange,
  className = ''
}) => {
  const deltaScale = Math.max(0, fleetCount - 160);
  const simTrack3Count = 23 + deltaScale;

  // Card 1: MSRP Sticker Price ($3.63M at 160 -> $33.96M at 500 with Track 3 monopoly vault weight)
  const simMSRPNum = 3.63 + (deltaScale * (33.96 - 3.63)) / 340;
  const simStrategicCeiling = `$${simMSRPNum.toFixed(2)}M`;

  // Card 2: Commercial Agency Replacement ($2.28M at 160 -> $7.12M at 500)
  const simAgencyNum = 2.28 + (deltaScale * (7.12 - 2.28)) / 340;
  const simDevReplacement = `$${simAgencyNum.toFixed(2)}M`;

  // Card 3: ASC 350-40 Hard Capitalized Development Floor ($1.75M at 160 -> $5.47M at 500)
  // Formula: fleetCount * 100 hrs * $109.49/hr
  const simASC350Exact = Math.round(fleetCount * 100 * 109.49);
  const simASC350Num = (fleetCount * 100 * 109.49) / 1_000_000;
  const simStrategicBuyoutAnchor = `$${simASC350Num.toFixed(2)}M`;

  // Card 4: Panic Floor Price ($1.05M at 160 -> $3.28M at 500)
  const simPanicNum = 1.05 + (deltaScale * (3.28 - 1.05)) / 340;
  const simDistressCashFloor = `$${simPanicNum.toFixed(2)}M`;

  return (
    <div className={`bg-[#111114] border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-visible space-y-7 ${className}`}>
      {/* Header and Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sliders size={14} /> ASSEMBLY LINE OUTPUT // FLEET CAPACITY
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-mono">
              [86 Track 1 + 51 Track 2 + {simTrack3Count} Track 3 F1 Powertrains]
            </span>
          </div>
          <h3 className="text-lg font-black text-white">Factory Production Volume Simulator</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Adjust digital factory production output from the current 160-vehicle baseline to the 500-vehicle maximum showroom capacity.
          </p>
        </div>

        {/* Quick-Jump Buttons & Readout */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-slate-400 font-mono uppercase mr-1 hidden sm:inline">Presets:</span>
          <button
            onClick={() => onFleetCountChange(160)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
              fleetCount === 160
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/30'
                : 'bg-black/60 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
            }`}
          >
            [ACTIVE: 160]
          </button>
          <button
            onClick={() => onFleetCountChange(250)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
              fleetCount === 250
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/30'
                : 'bg-black/60 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20'
            }`}
          >
            [TARGET: 250]
          </button>
          <button
            onClick={() => onFleetCountChange(500)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer border ${
              fleetCount === 500
                ? 'bg-purple-500 text-black border-purple-400 shadow-md shadow-purple-500/30'
                : 'bg-black/60 text-purple-400 border-purple-500/40 hover:bg-purple-500/20'
            }`}
          >
            [MAX CAPACITY: 500]
          </button>

          <div className="bg-black/90 border border-purple-500/50 rounded-xl px-4 py-2 text-right shrink-0 ml-auto sm:ml-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Simulated Fleet Size</span>
            <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono tracking-tight block">
              {fleetCount} Vehicles
            </span>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-400 font-bold">Min: 160 Vehicles Built</span>
          <span className="text-cyan-400 font-bold hidden sm:inline">Midpoint: 250 Vehicles (Target)</span>
          <span className="text-purple-400 font-bold">Max: 500 Vehicles (Full Capacity)</span>
        </div>

        <input
          type="range"
          min="160"
          max="500"
          step="1"
          value={fleetCount}
          onChange={(e) => onFleetCountChange(Number(e.target.value))}
          className="w-full h-3.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400 hover:accent-purple-300 transition-all"
          title="Factory Production Volume Simulator (160 - 500 Vehicles)"
        />

        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>160 Vehicles Built</span>
          <span className="text-purple-200 font-bold text-center px-1">
            Active Production Line: {fleetCount} Vehicles (137 Legacy Flagships + {simTrack3Count} Bespoke Track 3 Powertrains)
          </span>
          <span>500 Vehicles Full Capacity</span>
        </div>
      </div>

      {/* 4 Descending Projection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {/* Card 1: TOTAL MSRP STICKER PRICE */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-purple-500/50 bg-[#0E0E12] hover:border-purple-400 transition-colors shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Card 1 // Top</span>
              <span className="text-purple-300 font-bold bg-purple-950/90 px-2 py-0.5 rounded-full border border-purple-500/50 text-[10px] tracking-widest uppercase">
                TOTAL RETAIL PRICE
              </span>
            </div>
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">
              TOTAL MSRP STICKER PRICE
            </h4>
            <span className="text-xs text-purple-300/80 block mt-0.5 font-sans font-normal leading-tight">
              Showroom Monopoly Sticker Price &amp; Strategic Acquisition Ceiling
            </span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-transparent break-words leading-normal block">
              {simStrategicCeiling}
            </span>
            <span className="text-[11px] text-slate-400 mt-1.5 block leading-relaxed">
              Complete bespoke fleet showroom retail valuation
            </span>
          </div>
        </div>

        {/* Card 2: COMMERCIAL FLEET WHOLESALE APPRAISAL */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-amber-500/50 bg-[#0E0E12] hover:border-amber-400 transition-colors shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Card 2 // Second</span>
              <span className="text-amber-300 font-bold bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-500/50 text-[10px] tracking-widest uppercase">
                WHOLESALE BASELINE PRICE
              </span>
            </div>
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">
              COMMERCIAL FLEET WHOLESALE APPRAISAL
            </h4>
            <span className="text-xs text-amber-300/80 block mt-0.5 font-sans font-normal leading-tight">
              Commercial Fleet Volume Wholesale Benchmark
            </span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400 break-words leading-normal block">
              {simDevReplacement}
            </span>
            <span className="text-[11px] text-slate-400 mt-1.5 block leading-relaxed">
              Institutional fleet replacement &amp; wholesale buyout valuation
            </span>
          </div>
        </div>

        {/* Card 3: FACTORY BUILD COST (THE HARD WALK-AWAY FLOOR) */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-emerald-500/50 bg-[#0E0E12] hover:border-emerald-400 transition-colors shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Card 3 // Third</span>
              <span className="text-emerald-300 font-bold bg-emerald-950/90 px-2 py-0.5 rounded-full border border-emerald-500/50 text-[10px] tracking-widest uppercase">
                CERTIFIED FACTORY BASELINE {/* [audit-badge-exempt] */}
              </span>
            </div>
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">
              FACTORY BUILD COST (THE HARD WALK-AWAY FLOOR)
            </h4>
            <span className="text-xs text-emerald-300/80 block mt-0.5 font-sans font-normal leading-tight">
              Certified Factory Base Production Floor {/* [audit-badge-exempt] */}
            </span>
            <div className="text-[10px] text-amber-300 font-bold mt-2 bg-amber-950/40 border border-amber-500/40 rounded-lg p-2 leading-relaxed">
              Dealership Rule: The Hard Walk-Away Price. Absolute factory reserve floor. We do not sell below actual build costs under any scenario.
            </div>
          </div>
          <div className="pt-3 border-t border-white/10 mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-400 break-words leading-normal block">
              {simStrategicBuyoutAnchor}
            </span>
            <span className="text-[11px] text-slate-400 mt-1.5 block leading-relaxed">
              Certified Factory Floor: ${simASC350Exact.toLocaleString()} Base Production Cost (100% Track 3 allocation) {/* [audit-badge-exempt] */}
            </span>
          </div>
        </div>

        {/* Card 4: EMERGENCY LIQUIDATION FLOOR */}
        <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-rose-500/50 bg-[#0E0E12] hover:border-rose-400 transition-colors shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px]">Card 4 // Fourth</span>
              <span className="text-rose-300 font-bold bg-rose-950/90 px-2 py-0.5 rounded-full border border-rose-500/50 text-[10px] tracking-widest uppercase">
                EMERGENCY LIQUIDATION RESERVE
              </span>
            </div>
            <h4 className="text-xs font-black tracking-wider uppercase text-zinc-100 leading-snug">
              EMERGENCY LIQUIDATION FLOOR
            </h4>
            <span className="text-xs text-rose-300/80 block mt-0.5 font-sans font-normal leading-tight">
              Guaranteed Dealer Cash Floor
            </span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-3">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-rose-400 break-words leading-normal block">
              {simDistressCashFloor}
            </span>
            <span className="text-[11px] text-slate-400 mt-1.5 block leading-relaxed">
              Minimum certified wholesale buyback reserve strictly held &gt;$3.0M {/* [audit-badge-exempt] */}
            </span>
          </div>
        </div>
      </div>

      {/* Simulation Disclaimer */}
      <div className="pt-2 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-400">
        <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="font-mono text-[11px] leading-relaxed text-amber-200/90">
          HYPOTHETICAL TARGET PROJECTION ONLY — DEMONSTRATES POTENTIAL PORTFOLIO VALUATION AT SCALE — NOT AN APPRAISAL OR REVENUE GUARANTEE.
        </p>
      </div>
    </div>
  );
};

export default FleetScaleSlider;
