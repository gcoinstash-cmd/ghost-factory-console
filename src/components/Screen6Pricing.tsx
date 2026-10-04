import React from 'react';
import { 
  Check, 
  Layers, 
  Cpu, 
  Database, 
  Terminal, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';

export const Screen6Pricing: React.FC = () => {
  return (
    <div className="space-y-8 font-mono pb-12">
      {/* Header Banner */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
                SCREEN 6 // COMMERCIAL PRICING ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400">| Public Telemetry Shelf</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dual-Track Pricing & Licensing Protocol
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Transparent, standardized commercial licenses for deployment-ready blueprints. From turn-key single-view prototypes to SCADA-grade deep-tech physics engines.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-center">
              <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Track 1 Anchor</span>
              <span className="text-xl font-black text-cyan-400">$4,500</span>
            </div>
            <div className="px-4 py-3 rounded-xl bg-black/80 border border-purple-500/40 text-center">
              <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Track 2 Anchor</span>
              <span className="text-xl font-black text-purple-400">$14,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Primary Pricing & Deliverable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Track 1 Retail MSRP */}
        <div className="bg-[#111114] border border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/10 group">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Retail Shelf MSRP</span>
              <span className="text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 text-xs">TRACK 1</span>
            </div>
            <h2 className="text-lg font-black text-white">Track 1 Single License</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">Turn-Key Concept Console Source for solo operators.</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl font-black text-cyan-400 font-mono tracking-tight">$199</span>
              <span className="text-xs text-slate-400 block mt-1">Perpetual Non-Exclusive License</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-cyan-400 shrink-0" />
              <span>Full React 19 + Tailwind Codebase</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-cyan-400 shrink-0" />
              <span>Relational Postgres Schema & RLS</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-cyan-400 shrink-0" />
              <span>Simulated Sample Seed Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-cyan-400 shrink-0" />
              <span>1 Production Deployment Seat</span>
            </div>
          </div>
        </div>

        {/* Card 2: Commercial Team Seat */}
        <div className="bg-[#111114] border border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400 transition-all shadow-lg hover:shadow-amber-500/10 group">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Agency Multi-Seat</span>
              <span className="text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 text-xs">COMMERCIAL</span>
            </div>
            <h2 className="text-lg font-black text-white">Commercial Team Seat</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">Agency multi-seat pack for client projects and builders.</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-3xl font-black text-amber-400 font-mono tracking-tight">$599</span>
              <span className="text-xs text-slate-400 block mt-1">Commercial Agency Fleet Rights</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-amber-400 shrink-0" />
              <span>Unlimited End-Client Deployments</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-amber-400 shrink-0" />
              <span>White-Label Customization Permitted</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-amber-400 shrink-0" />
              <span>Developer Setup & Deploy Runbooks</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-amber-400 shrink-0" />
              <span>Commercial Sublicensing Rights</span>
            </div>
          </div>
        </div>

        {/* Card 3: Flagship Tier-1 License */}
        <div className="bg-[#111114] border border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-purple-400 transition-all shadow-lg hover:shadow-purple-500/10 group">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Deep-Tech SCADA</span>
              <span className="text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40 text-xs">TRACK 2</span>
            </div>
            <h2 className="text-lg font-black text-white">Flagship Tier-1 License</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">SCADA-grade operations console with physics solvers.</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono tracking-tight">$1,500 – $3,500</span>
              <span className="text-xs text-slate-400 block mt-1">Domain Physics & Operator Journeys</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-purple-400 shrink-0" />
              <span>8–15 Polished Sub-Panels & Views</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-purple-400 shrink-0" />
              <span>Domain Physics Calculations & Solvers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-purple-400 shrink-0" />
              <span>High-Stakes Niche Workflow Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-purple-400 shrink-0" />
              <span>Exclusive Buyout Eligible ($14,500 Anchor)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Core Deliverable Blueprint */}
        <div className="bg-[#111114] border border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/10 group">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-300 uppercase font-bold tracking-wider text-xs">Standard Deliverable</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 text-xs">BLUEPRINT</span>
            </div>
            <h2 className="text-lg font-black text-white">Full Stack Package</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">Turnkey schema, seed, and UI blueprint in every download.</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">React 19 + RLS</span>
              <span className="text-xs text-slate-400 block mt-1">Postgres Schema & Mock Seed Files</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>Production-Formatted schema.sql</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>Pre-Populated seed.sql Records</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>Row-Level Security (RLS) Patterns</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400 shrink-0" />
              <span>Step-by-Step Render / Vercel Guide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Table: Track 1 vs. Track 2 */}
      <div className="border border-white/10 bg-black/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Track 1 vs. Track 2 Tier Comparison Matrix
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Strict separation protocol: Track 1 Lean Prototypes vs. Track 2 Flagship SCADA Hypercars.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider hidden sm:inline">
            136/136 AUDITED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15 text-slate-400 font-bold uppercase tracking-wider text-xs">
                <th className="py-3.5 px-4">Architecture Parameter</th>
                <th className="py-3.5 px-4 text-cyan-400">Track 1: Lean Rapid-Sale (86 Assets)</th>
                <th className="py-3.5 px-4 text-purple-400">Track 2: Flagship Tier-1 (50 Assets)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Layers size={14} className="text-emerald-400 shrink-0" />
                  Primary Scope & Workflow
                </td>
                <td className="py-3 px-4">Turn-key single-view interactive dashboard</td>
                <td className="py-3 px-4 font-semibold text-purple-300">8–15 interactive screens & operator journeys</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Cpu size={14} className="text-cyan-400 shrink-0" />
                  Operational Logic & Solvers
                </td>
                <td className="py-3 px-4">Simulated telemetry charts & status feeds</td>
                <td className="py-3 px-4 font-semibold text-purple-300">Domain-specific physics, solvers & calculations</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Database size={14} className="text-amber-400 shrink-0" />
                  Database Blueprint
                </td>
                <td className="py-3 px-4">schema.sql + mock seed.sql</td>
                <td className="py-3 px-4 font-semibold text-purple-300">Relational schema with RLS security policies</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Terminal size={14} className="text-pink-400 shrink-0" />
                  Retail MSRP License
                </td>
                <td className="py-3 px-4 font-black text-cyan-400 font-mono">$199 USD</td>
                <td className="py-3 px-4 font-black text-purple-400 font-mono">$1,500 – $3,500 USD</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-400 shrink-0" />
                  Exclusive Buyout Anchor
                </td>
                <td className="py-3 px-4 font-black text-cyan-400 font-mono">$4,500 ($3,800–$6,500 range)</td>
                <td className="py-3 px-4 font-black text-purple-400 font-mono">$14,500 ($10,000–$18,000 range)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-300 flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  Target Buyer
                </td>
                <td className="py-3 px-4">Agencies, solo builders, marketplace buyers</td>
                <td className="py-3 px-4 font-semibold text-purple-300">Specialized B2B operators, PE sponsors, M&A teams</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="border border-white/10 bg-black/40 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400">
        <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">PRODUCT TRUTH NOTICE:</strong> All blueprints are provided as interactive concept demos and deployable source templates using simulated or sample data. Non-exclusive licenses do not convey ownership of GhostFactoryOS, Aura & Grid, shared frameworks, or factory build processes.
        </p>
      </div>
    </div>
  );
};

export default Screen6Pricing;
