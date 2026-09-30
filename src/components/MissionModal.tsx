import React, { useState } from 'react';
import { Terminal, Check, X, CheckCircle2, FileCode } from 'lucide-react';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export const MissionModal: React.FC<MissionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  isCompleted
}) => {
  const [step1Checked, setStep1Checked] = useState(isCompleted);
  const [step2Checked, setStep2Checked] = useState(isCompleted);
  const [step3Checked, setStep3Checked] = useState(isCompleted);
  const [isPatching, setIsPatching] = useState(false);
  const [patchOutput, setPatchOutput] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunPatch = () => {
    setIsPatching(true);
    setTimeout(() => {
      setIsPatching(false);
      setPatchOutput(`[OK] Schema patched: ALTER TABLE eclss_telemetry ADD COLUMN sabatier_bypass_valve VARCHAR(30) DEFAULT 'NOMINAL_FLOW';\n[OK] RLS demo policy attached: Allow read-only telemetry querying for anonymous demo tokens.\n[OK] Simulated physics solver verified: CO2 extraction rate nominal at 98.4%.`);
      setStep1Checked(true);
      setStep2Checked(true);
      setStep3Checked(true);
    }, 1200);
  };

  const allChecked = step1Checked && step2Checked && step3Checked;

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-mono">
      <div className="w-full max-w-3xl rounded-2xl border-2 border-amber-500/80 bg-[#0F0F12] text-slate-100 shadow-[0_0_40px_rgba(245,158,11,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-amber-500/30 bg-black/60 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
              <Terminal size={14} /> MISSION TERMINAL // ASSET_109_ECLSS_PATCH
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Mission Objective Card */}
          <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
              <span>TARGET VEHICLE: ASSET #109</span>
              <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">TIER-1 CANDIDATE</span>
            </div>
            <h3 className="text-lg font-black text-white">
              Orbital Habitat Closed-Loop ECLSS SCADA OS
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Objective: Integrate Sabatier bypass valve telemetry into PostgreSQL schema and update the simulated physics loop. This unlocks Flagship Gate Criterion #4 for Track 2 ($14,500 anchor) eligibility.
            </p>
          </div>

          {/* Mission Checklist */}
          <div className="space-y-3">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">
              Mission Checklist // Verification Steps
            </span>

            <div 
              onClick={() => setStep1Checked(!step1Checked)}
              className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                step1Checked ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                step1Checked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
              }`}>
                {step1Checked && <Check size={12} strokeWidth={3} />}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold">Step 1: SQL Schema Bypass Table Patch</p>
                <code className="text-[11px] text-amber-300/90 block bg-black/60 p-2 rounded border border-white/5">
                  ALTER TABLE eclss_telemetry ADD COLUMN sabatier_bypass_valve VARCHAR(30) DEFAULT 'NOMINAL_FLOW';
                </code>
              </div>
            </div>

            <div 
              onClick={() => setStep2Checked(!step2Checked)}
              className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                step2Checked ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                step2Checked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
              }`}>
                {step2Checked && <Check size={12} strokeWidth={3} />}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold">Step 2: Physics Loop Solver Calibration</p>
                <p className="text-[11px] text-slate-400">
                  Update mock sensor loop with Sabatier CO2 consumption rate (1.2 kg/day per human equivalent) and emergency purge trigger.
                </p>
              </div>
            </div>

            <div 
              onClick={() => setStep3Checked(!step3Checked)}
              className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                step3Checked ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                step3Checked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'
              }`}>
                {step3Checked && <Check size={12} strokeWidth={3} />}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold">Step 3: Truth Label Compliance Verification</p>
                <p className="text-[11px] text-slate-400">
                  Enforce strict label: <span className="text-amber-400 font-semibold">[Simulation Data Only / Interactive Concept Prototype]</span>. No claims of flight readiness or live spaceflight hardware qualification.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Patch Terminal */}
          <div className="bg-black/80 rounded-xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <FileCode size={14} /> ECLSS_SCADA_SOLVER.PY // SANDBOX
              </span>
              <button
                onClick={handleRunPatch}
                disabled={isPatching}
                className="px-3 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
              >
                {isPatching ? 'EXECUTING PATCH...' : 'RUN AUTO-PATCH'}
              </button>
            </div>
            {patchOutput && (
              <pre className="text-[11px] text-emerald-400 font-mono bg-black/90 p-3 rounded border border-emerald-500/30 overflow-x-auto whitespace-pre-wrap">
                {patchOutput}
              </pre>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 bg-black/60 px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Status: {allChecked ? <strong className="text-emerald-400">ALL CRITERIA SATISFIED</strong> : <span className="text-amber-400">PENDING APPROVAL</span>}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              disabled={!allChecked}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 size={15} />
              <span>MARK MISSION ACCOMPLISHED (+850 XP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
