import React from 'react';

export interface CockpitMetricsProps {
  className?: string;
  isCompact?: boolean;
}

export const CockpitMetrics: React.FC<CockpitMetricsProps> = ({
  className = '',
  isCompact = true
}) => {
  return (
    <section className={`w-full font-mono ${className}`}>
      {/* 4-CARD EXECUTIVE VALUATION HUD HIERARCHY (DESCENDING ORDER: $3.63M -> $2.28M -> $1.75M -> $1.05M) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs w-full">
        
        {/* CARD 1 (FIRST / HIGHEST VALUE — $3.63M) */}
        <div className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-purple-500/50 hover:border-purple-400 transition-all ${isCompact ? 'min-h-[145px]' : 'min-h-[220px]'} bg-zinc-950/90 shadow-xl shadow-purple-950/20 w-full group`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CARD 1 // TOP</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-purple-300 bg-purple-950/90 border border-purple-500/50">
                TOTAL RETAIL PRICE
              </span>
            </div>
            <h4 className="text-[11px] font-black tracking-wider uppercase text-zinc-300 leading-snug">
              TOTAL MSRP STICKER PRICE
            </h4>
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight my-1 bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-transparent block group-hover:scale-105 transition-transform">
              $3.63M
            </span>
            <p className="text-[11px] text-zinc-300 font-medium leading-snug">
              Portfolio Monopoly Asking Price &amp; Strategic Transfer Ceiling
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2 pt-1.5 border-t border-zinc-800/80 block w-full truncate">
            160 Active Units combined retail anchor value
          </span>
        </div>

        {/* CARD 2 (SECOND / COMMERCIAL APPRAISAL — $2.28M) */}
        <div className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-amber-500/50 hover:border-amber-400 transition-all ${isCompact ? 'min-h-[145px]' : 'min-h-[220px]'} bg-zinc-950/90 shadow-xl shadow-amber-950/20 w-full group`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CARD 2 // SECOND</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-amber-300 bg-amber-950/90 border border-amber-500/50">
                WHOLESALE BASELINE PRICE
              </span>
            </div>
            <h4 className="text-[11px] font-black tracking-wider uppercase text-zinc-300 leading-snug">
              COMMERCIAL FLEET WHOLESALE APPRAISAL
            </h4>
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight my-1 text-amber-400 block group-hover:scale-105 transition-transform">
              $2.28M
            </span>
            <p className="text-[11px] text-zinc-300 font-medium leading-snug">
              Commercial Fleet Volume Wholesale Benchmark
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2 pt-1.5 border-t border-zinc-800/80 block w-full truncate">
            160 Units × $14,250 average custom dev replacement
          </span>
        </div>

        {/* CARD 3 (THIRD / HARD CAPITALIZED FLOOR — $1.75M) */}
        <div className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-emerald-500/50 hover:border-emerald-400 transition-all ${isCompact ? 'min-h-[145px]' : 'min-h-[220px]'} bg-zinc-950/90 shadow-xl shadow-emerald-950/20 w-full group`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CARD 3 // THIRD</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-emerald-300 bg-emerald-950/90 border border-emerald-500/50">
                CERTIFIED FACTORY BASELINE {/* [audit-badge-exempt] */}
              </span>
            </div>
            <h4 className="text-[11px] font-black tracking-wider uppercase text-zinc-300 leading-snug">
              FACTORY BUILD COST (THE HARD WALK-AWAY FLOOR)
            </h4>
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight my-1 text-emerald-400 block group-hover:scale-105 transition-transform">
              $1.75M
            </span>
            <p className="text-[11px] text-zinc-300 font-medium leading-snug">
              Certified Factory Base Production Floor {/* [audit-badge-exempt] */}
            </p>
            {!isCompact && (
              <div className="text-[10px] text-amber-300 font-bold leading-tight px-1.5 py-1 bg-amber-950/40 border border-amber-500/40 rounded mt-1.5">
                Dealership Rule: The Hard Walk-Away Price. We do not sell below actual build costs.
              </div>
            )}
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2 pt-1.5 border-t border-zinc-800/80 block w-full truncate">
            16,000 Engineering Hours (@ $109.49/hr Senior Architect Floor)
          </span>
        </div>

        {/* CARD 4 (FOURTH / LOWEST DOWNSIDE FLOOR — $1.05M) */}
        <div className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-rose-500/50 hover:border-rose-400 transition-all ${isCompact ? 'min-h-[145px]' : 'min-h-[220px]'} bg-zinc-950/90 shadow-xl shadow-rose-950/20 w-full group`}>
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CARD 4 // FOURTH</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-black tracking-widest uppercase text-rose-300 bg-rose-950/90 border border-rose-500/50">
                EMERGENCY LIQUIDATION RESERVE
              </span>
            </div>
            <h4 className="text-[11px] font-black tracking-wider uppercase text-zinc-300 leading-snug">
              EMERGENCY LIQUIDATION FLOOR
            </h4>
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight my-1 text-rose-500 block group-hover:scale-105 transition-transform">
              $1.05M
            </span>
            <p className="text-[11px] text-zinc-300 font-medium leading-snug">
              Guaranteed Dealer Cash Downside Floor
            </p>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2 pt-1.5 border-t border-zinc-800/80 block w-full truncate">
            Worst-case distress liquidation floor strictly maintained &gt;$1.0M
          </span>
        </div>

      </div>
    </section>
  );
};

export default CockpitMetrics;
