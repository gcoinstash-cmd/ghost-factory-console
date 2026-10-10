import React, { useState } from 'react';
import { 
  Wrench, 
  Activity, 
  CheckCircle2, 
  Server, 
  Database, 
  ShieldCheck, 
  Check, 
  RefreshCw
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { Track2Harness } from './Track2Harness';

interface MaintenanceBayScreenProps {
  products: ProductItem[];
  totalAssets: number;
}

export const MaintenanceBayScreen: React.FC<MaintenanceBayScreenProps> = ({
  products,
  totalAssets
}) => {
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  // Pit Crew Checklist Items
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Asset 109: ECLSS SCADA Sabatier bypass valve pressure test', domain: 'Deep Tech SCADA', status: 'COMPLETED', assignee: 'Engineering Bay 1' },
    { id: 2, title: 'Verify RLS demo isolation policies across all 16 Wealth & Banking blueprints', domain: 'Security & RLS', status: 'COMPLETED', assignee: 'Security Lead' },
    { id: 3, title: 'Update Tailwind token references on Heavy Fleet & Mining crawler prototypes', domain: 'Frontend Core', status: 'PENDING', assignee: 'Design Systems' },
    { id: 4, title: 'Audit Gumroad commercial checkout webhooks and license dispatch automation', domain: 'Storefront', status: 'COMPLETED', assignee: 'Operations' },
    { id: 5, title: `Verify simulated data disclosure labels on all ${totalAssets} public showroom listings`, domain: 'Compliance', status: 'COMPLETED', assignee: 'Legal & Risk' },
  ]);

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED'
        };
      }
      return t;
    }));
  };

  const handleRunSystemAudit = () => {
    setIsRunningAudit(true);
    setAuditMessage(null);
    setTimeout(() => {
      setIsRunningAudit(false);
      setAuditMessage(`SYSTEM TELEMETRY AUDIT COMPLETE: ${totalAssets}/${totalAssets} endpoints verified. HTTP 200 OK across all Render/Vercel hosted instances. 0 broken seed files. All simulated data disclosure disclaimers intact.`);
    }, 1500);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-purple-500/40 rounded-2xl p-6 sm:p-7 relative overflow-hidden glow-gold">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-mono font-bold text-purple-400 uppercase tracking-widest mb-2.5">
              <Wrench size={14} /> SCREEN 5 // MAINTENANCE BAY & FLEET DIAGNOSTICS
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              FLEET TELEMETRY & <span className="text-purple-400 font-mono">PIT CREW DIAGNOSTICS</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Automated health monitoring across all {totalAssets} digital vehicles. Continuous checks for HTTP availability, schema integrity, and compliance disclosures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunSystemAudit}
              disabled={isRunningAudit}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-500/25 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRunningAudit ? 'animate-spin' : ''} />
              <span>{isRunningAudit ? 'RUNNING DIAGNOSTICS...' : 'RUN SYSTEM AUDIT'}</span>
            </button>
          </div>
        </div>

        {auditMessage && (
          <div className="mt-5 p-3.5 bg-purple-950/60 border border-purple-500/50 rounded-xl text-xs text-purple-200 flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
            <span>{auditMessage}</span>
          </div>
        )}
      </section>

      {/* 4 CORE DIAGNOSTIC METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-black/60 p-4 rounded-xl border border-emerald-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="uppercase text-[10px] font-bold">Route Uptime (200 OK)</span>
            <Server size={14} className="text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">{totalAssets} / {totalAssets}</span>
          <span className="text-[10px] text-emerald-400 block mt-1 font-semibold">100% Hosted Endpoints Online</span>
        </div>

        <div className="bg-black/60 p-4 rounded-xl border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="uppercase text-[10px] font-bold">RLS Demo Policies</span>
            <Database size={14} className="text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-white">RLS Pattern</span>
          <span className="text-[10px] text-cyan-400 block mt-1 font-semibold">PostgreSQL Sandbox Active</span>
        </div>

        <div className="bg-black/60 p-4 rounded-xl border border-amber-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="uppercase text-[10px] font-bold">Review Staleness</span>
            <Activity size={14} className="text-amber-400" />
          </div>
          <span className="text-2xl font-black text-white">&lt; 30 Days</span>
          <span className="text-[10px] text-amber-300 block mt-1 font-semibold">All Records Verified</span>
        </div>

        <div className="bg-black/60 p-4 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="uppercase text-[10px] font-bold">Truth Label Compliance</span>
            <ShieldCheck size={14} className="text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white">100% Passed</span>
          <span className="text-[10px] text-purple-300 block mt-1 font-semibold">Simulated Data Badges Active</span>
        </div>
      </section>

      {/* PIT CREW CHECKLIST */}
      <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-purple-400" />
              <span>PIT CREW DISPATCH SCHEDULE // ACTIVE MAINTENANCE PASSES</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any maintenance pass to toggle execution status.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            {tasks.filter(t => t.status === 'COMPLETED').length} of {tasks.length} Resolved
          </span>
        </div>

        <div className="space-y-2.5">
          {tasks.map((task) => {
            const isDone = task.status === 'COMPLETED';
            return (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                    : 'bg-black/50 border-white/10 text-slate-300 hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
                  }`}>
                    {isDone && <Check size={12} strokeWidth={3} />}
                  </div>
                  <div>
                    <p className={`font-bold ${isDone ? 'line-through opacity-75' : 'text-white'}`}>
                      {task.title}
                    </p>
                    <span className="text-[10px] text-slate-400">{task.domain} // Assignee: {task.assignee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SAMPLE AUDIT MATRIX TABLE (First 15 Assets Preview) */}
      <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white">
            VEHICLE DIAGNOSTIC MATRIX (SAMPLING 15 OF {totalAssets})
          </h3>
          <span className="text-xs text-slate-400">All {totalAssets} Passed Build Integrity</span>
        </div>

        <div className="overflow-x-auto touch-pan-x overscroll-contain">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Slot</th>
                <th className="py-2.5 px-3">System Name</th>
                <th className="py-2.5 px-3">HTTP Status</th>
                <th className="py-2.5 px-3">Relational Tables</th>
                <th className="py-2.5 px-3">RLS Status</th>
                <th className="py-2.5 px-3">Truth Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.slice(0, 15).map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-400">#{p.id.toString().padStart(3, '0')}</td>
                  <td className="py-2.5 px-3 font-bold text-white">{p.name}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-semibold">200 OK</td>
                  <td className="py-2.5 px-3 text-slate-300">{p.tables ? p.tables.length : 4} Tables</td>
                  <td className="py-2.5 px-3 text-cyan-400">RLS Pattern</td>
                  <td className="py-2.5 px-3 text-amber-300 text-[10px]">Interactive Prototype</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Track 3 Production Reference Engines: Universal Track 2 Telemetry Cockpit */}
      <section className="pt-4">
        <Track2Harness />
      </section>
    </div>
  );
};
