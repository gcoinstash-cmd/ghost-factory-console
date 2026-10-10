import React from 'react';

export interface CockpitMetricsProps {
  className?: string;
  isCompact?: boolean;
}

export const CockpitMetrics: React.FC<CockpitMetricsProps> = ({
  className = '',
  isCompact: _isCompact = true
}) => {
  return (
    <section className={`w-full font-mono ${className}`}>
      {/* 4-CARD SLEEK HORIZONTAL INSTRUMENT STRIP (LEXUS DIGITAL GAUGE CLUSTER) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs w-full">
        
        {/* CARD 1: $3.63M (MSRP STICKER) */}
        <div 
          className="flex flex-col justify-between py-2 px-3 rounded-xl border border-purple-500/50 hover:border-purple-400 transition-colors bg-zinc-950/90 shadow-sm shadow-purple-950/20 group cursor-default"
          title="Portfolio Monopoly Asking Price & Strategic Transfer Ceiling ($3.63M MSRP — 160 Active Units combined retail anchor value)"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-purple-300 bg-purple-950/90 px-1.5 py-0.5 rounded border border-purple-500/50">
              RETAIL
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-bold truncate">
              MSRP STICKER
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-xl font-bold font-mono tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-transparent block">
              $3.63M
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              160 Units
            </span>
          </div>
        </div>

        {/* CARD 2: $2.28M (WHOLESALE BASELINE) */}
        <div 
          className="flex flex-col justify-between py-2 px-3 rounded-xl border border-amber-500/50 hover:border-amber-400 transition-colors bg-zinc-950/90 shadow-sm shadow-amber-950/20 group cursor-default"
          title="Commercial Fleet Volume Wholesale Appraisal ($2.28M Dev Replacement Benchmark — 160 Units × $14,250 avg)"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-amber-300 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-500/50">
              WHOLESALE
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-bold truncate">
              WHOLESALE BASELINE
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-xl font-bold font-mono tracking-tight text-amber-400 block">
              $2.28M
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Agency Dev
            </span>
          </div>
        </div>

        {/* CARD 3: $1.75M (HARD WALK-AWAY FLOOR) */}
        <div 
          className="flex flex-col justify-between py-2 px-3 rounded-xl border border-emerald-500/50 hover:border-emerald-400 transition-colors bg-zinc-950/90 shadow-sm shadow-emerald-950/20 group cursor-default"
          title="ASC 350-40 Factory Build Cost Reserve Floor ($1,751,840 Capitalized Dev Floor — 16,000 Engineering Hours @ $109.49/hr Senior Architect Floor)"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/50">
              FACTORY FLOOR {/* [audit-badge-exempt] */}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-bold truncate">
              HARD WALK-AWAY FLOOR
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-xl font-bold font-mono tracking-tight text-emerald-400 block">
              $1.75M
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Reserve Floor
            </span>
          </div>
        </div>

        {/* CARD 4: $1.05M (PANIC FLOOR) */}
        <div 
          className="flex flex-col justify-between py-2 px-3 rounded-xl border border-rose-500/50 hover:border-rose-400 transition-colors bg-zinc-950/90 shadow-sm shadow-rose-950/20 group cursor-default"
          title="Guaranteed Dealer Cash Downside Floor ($1.05M Panic Floor — Distress Liquidation Reserve strictly held >$1.0M)"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-mono font-black tracking-widest uppercase text-rose-300 bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-500/50">
              RESERVE
            </span>
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-bold truncate">
              PANIC FLOOR
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="text-xl font-bold font-mono tracking-tight text-rose-500 block">
              $1.05M
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
              Cash Floor
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CockpitMetrics;
