import React from 'react';
import { Sparkles, ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';

interface NextBestActionBannerProps {
  onEngageMission: () => void;
  missionCompleted?: boolean;
}

export const NextBestActionBanner: React.FC<NextBestActionBannerProps> = ({
  onEngageMission,
  missionCompleted = false
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500/80 bg-gradient-to-r from-amber-950/40 via-[#18120c] to-[#0A0A0B] p-5 sm:p-6 shadow-[0_0_30px_rgba(245,158,11,0.25)] font-mono transition-all">
      {/* Background glowing sweep */}
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2.5">
          {/* Badge line */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/60 text-xs sm:text-sm font-black tracking-wider uppercase animate-pulse">
              <Sparkles size={14} className="text-amber-400" /> WIN A // NEXT BEST ACTION
            </span>
            <span className="text-xs sm:text-sm text-slate-200 bg-black/70 px-2.5 py-1 rounded border border-white/20 font-bold">
              PRIORITY: CRITICAL (TIER-1 FLAGSHIP CANDIDATE)
            </span>
            <span className="text-xs sm:text-sm text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/40 font-bold">
              REWARD: +850 FACTORY XP
            </span>
          </div>

          {/* Mission Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex flex-wrap items-center gap-2">
            <span className="text-amber-400">NEXT MISSION:</span> Asset 109 — Add Sabatier Bypass Valve to ECLSS SCADA Schema
          </h2>

          {/* Subtext description */}
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-semibold">
            Orbital Habitat Closed-Loop ECLSS SCADA OS requires a documented secondary bypass loop in <code className="text-amber-300 bg-black/70 px-1.5 py-0.5 rounded border border-amber-500/40 font-bold">schema.sql</code> to satisfy Flagship Gate Criterion #4 (Domain Physics Solver & Complete Operator Journey).
          </p>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 flex items-center">
          {missionCompleted ? (
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-300 text-sm sm:text-base font-black shadow-lg shadow-emerald-500/20">
              <CheckCircle2 size={20} />
              <span>MISSION VERIFIED ✅</span>
            </div>
          ) : (
            <button
              onClick={onEngageMission}
              className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm sm:text-base uppercase tracking-wider transition-all transform active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer group"
            >
              <Cpu size={18} className="text-black group-hover:rotate-12 transition-transform" />
              <span>[ENGAGE MISSION]</span>
              <ArrowRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
