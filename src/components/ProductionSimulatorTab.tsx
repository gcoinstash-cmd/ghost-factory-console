import React, { useState } from 'react';
import { Rocket, Shield, Sliders, TrendingUp, AlertTriangle } from 'lucide-react';
import { FleetScaleSlider } from './FleetScaleSlider';

interface ProductionSimulatorTabProps {
  initialFleetCount?: number;
}

export const ProductionSimulatorTab: React.FC<ProductionSimulatorTabProps> = ({
  initialFleetCount = 160
}) => {
  const [fleetCount, setFleetCount] = useState<number>(initialFleetCount);

  const deltaScale = Math.max(0, fleetCount - 160);
  const simTrack3Count = 23 + deltaScale;
  const simVaultTranche = `${Math.round(fleetCount * 0.8)} Vaulted / ${Math.round(fleetCount * 0.2)} Liquid Slots`;

  return (
    <div className="space-y-6 font-mono w-full pb-8">
      {/* Top Simulator Banner */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <Rocket size={12} /> TAB 2 // FACTORY PRODUCTION VOLUME SIMULATOR
              </span>
              <span className="text-[10px] text-slate-400">| 160 ➔ 500 Fleet Capacity</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Factory Production Volume Simulator
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Interactive scale forecasting engine modeling Showroom MSRP, Fleet Wholesale, Factory Build Costs, and 80/20 sovereign vault capacity at scale.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono">
              80/20 Sovereign Vault: {simVaultTranche}
            </span>
          </div>
        </div>
      </div>

      {/* Embedded Slider & 4-Card Projections */}
      <FleetScaleSlider
        fleetCount={fleetCount}
        onFleetCountChange={setFleetCount}
      />

      {/* Production Line Allocation Breakdown (Clean Framing) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111114] border border-white/10 rounded-xl p-4 space-y-1.5">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
            Track 1 Lean Fleet Allocation
          </span>
          <span className="text-xl font-black text-cyan-400 font-mono block">86 Vehicles</span>
          <span className="text-[11px] text-slate-400 block">Baseline rapid-sale templates ($199 MSRP / $4,500 Anchor)</span>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-xl p-4 space-y-1.5">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
            Track 2 Flagship SCADA Allocation
          </span>
          <span className="text-xl font-black text-amber-400 font-mono block">51 Vehicles</span>
          <span className="text-[11px] text-slate-400 block">Domain-heavy physics solvers ($2,500 MSRP / $14,500 Anchor)</span>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-xl p-4 space-y-1.5">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
            Track 3 F1 Powertrain Allocation
          </span>
          <span className="text-xl font-black text-purple-400 font-mono block">{simTrack3Count} Engines</span>
          <span className="text-[11px] text-slate-400 block">100% of simulator expansion units strictly allocate to Track 3</span>
        </div>
      </div>
    </div>
  );
};

export default ProductionSimulatorTab;
