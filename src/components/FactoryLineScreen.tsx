import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertOctagon, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../catalogData';

interface FactoryLineScreenProps {
  products: ProductItem[];
  totalAssets: number;
}

export const FactoryLineScreen: React.FC<FactoryLineScreenProps> = ({
  products: _products,
  totalAssets
}) => {
  // 5 Stages of the Assembly Line
  const stages = [
    { id: 1, name: '1. Concept & Wireframe', count: 12, desc: 'B2B niche workflow definition & domain research' },
    { id: 2, name: '2. Working Prototype', count: 18, desc: 'Tailwind UI, React components & mock sensor states' },
    { id: 3, name: '3. Hosted Demo Sandbox', count: 50, desc: 'Render deployment, Supabase schema & demo passcodes' },
    { id: 4, name: '4. Catalog Ready (MSRP)', count: 79, desc: 'Passed 8-point Intake Gate. Listed on Aura & Grid' },
    { id: 5, name: '5. Flagship Candidate', count: 6, desc: 'Passed Flagship Gate (ECLSS, Crawler, EGS Wellhead)' }
  ];

  // Interactive Intake Gate Checklist State (for a prospective asset, e.g. Asset #110)
  const [candidateName, setCandidateName] = useState('Deep-Sea Trench Bathymetric Sonar SCADA OS');
  const [candidateId, setCandidateId] = useState('110');
  const [candidateDomain, setCandidateDomain] = useState('Subsea Robotics & Bathymetry');
  
  const [check1, setCheck1] = useState(true); // Unique Asset ID
  const [check2, setCheck2] = useState(true); // Source Repo & Release
  const [check3, setCheck3] = useState(true); // README Setup
  const [check4, setCheck4] = useState(true); // Dependency Manifest
  const [check5, setCheck5] = useState(false); // Screenshots & Media (starts unchecked to demonstrate blocking)
  const [check6, setCheck6] = useState(true); // Simulated Data Disclaimer
  const [check7, setCheck7] = useState(true); // License SKU / APA Eligibility
  const [check8, setCheck8] = useState(true); // Maintenance Owner

  const [intakeSuccess, setIntakeSuccess] = useState(false);

  const allPassed = check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8;
  const passedCount = [check1, check2, check3, check4, check5, check6, check7, check8].filter(Boolean).length;

  const handleApproveIntake = () => {
    if (!allPassed) return;
    setIntakeSuccess(true);
    setTimeout(() => {
      setIntakeSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 relative overflow-hidden glow-cyan">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2.5">
              <Cpu size={14} /> SCREEN 2 // FACTORY ASSEMBLY LINE & INTAKE GATE
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              MANUFACTURING PIPELINE // <span className="text-cyan-400 font-mono">ROAD TO 500 VEHICLES</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Strict Gatekeeper Protocol. No product increments the official 500-vehicle portfolio counter until verified against all 8 quality & truth criteria.
            </p>
          </div>

          <div className="bg-black/70 p-4 rounded-xl border border-white/10 text-xs flex items-center gap-5">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Catalog Target</span>
              <span className="text-xl font-black text-cyan-400">500 UNITS</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Intake Standard</span>
              <span className="text-xl font-black text-emerald-400">8/8 CHECKS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STAGE ASSEMBLY LINE PROGRESSION */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} className="text-cyan-400" />
            <span>Manufacturing Progression // Visual Line Tracker</span>
          </span>
          <span className="text-cyan-400 font-semibold">{totalAssets} Units in Catalog Station</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {stages.map((st, i) => (
            <div 
              key={st.id} 
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                i === 3 
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                  : i === 4
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                  <span>STAGE {st.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    i === 3 ? 'bg-emerald-500/20 text-emerald-300' : i === 4 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {st.count} Units
                  </span>
                </div>
                <h4 className="text-sm font-black text-white">{st.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">{st.desc}</p>
              </div>

              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${i === 3 ? 'bg-emerald-400' : i === 4 ? 'bg-amber-400' : 'bg-cyan-500'}`} 
                  style={{ width: `${Math.min(100, (st.count / 85) * 100)}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACTORY INTAKE GATE ENFORCEMENT ENGINE */}
      <section className="bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                INTAKE VERIFICATION GATE // ASSET QUALIFIER SIMULATOR
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Test newly manufactured digital vehicles before registering them into the official 85 → 500 inventory counter.
            </p>
          </div>

          <div className="text-xs bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 font-bold">
            GATE SCORE: <span className={allPassed ? 'text-emerald-400' : 'text-amber-400'}>{passedCount} / 8 CHECKS PASSED</span>
          </div>
        </div>

        {/* Candidate Vehicle Specs Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">PROSPECTIVE SYSTEM DESIGNATION</label>
            <input 
              type="text" 
              value={candidateName} 
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">ASSIGNED SLOT ID</label>
            <input 
              type="text" 
              value={candidateId} 
              onChange={(e) => setCandidateId(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">DOMAIN VERTICAL</label>
            <input 
              type="text" 
              value={candidateDomain} 
              onChange={(e) => setCandidateDomain(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 8-Point Gate Checklist */}
        <div className="space-y-3">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block">
            The 8 Mandatory Factory Intake Checks (Must All Pass)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Check 1 */}
            <div 
              onClick={() => setCheck1(!check1)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check1 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check1 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check1 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">1. Unique Asset ID & Product Name</p>
                <p className="text-[11px] text-slate-400">Must have distinct alphanumeric slot ID and registered trademark-safe system name.</p>
              </div>
            </div>

            {/* Check 2 */}
            <div 
              onClick={() => setCheck2(!check2)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check2 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check2 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check2 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">2. Source Repository & Release Version</p>
                <p className="text-[11px] text-slate-400">Tag release commit with reproducible build script and version lock.</p>
              </div>
            </div>

            {/* Check 3 */}
            <div 
              onClick={() => setCheck3(!check3)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check3 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check3 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check3 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">3. README & Setup Instructions</p>
                <p className="text-[11px] text-slate-400">Includes 1-click npm install & Supabase schema migration instructions.</p>
              </div>
            </div>

            {/* Check 4 */}
            <div 
              onClick={() => setCheck4(!check4)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check4 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check4 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check4 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">4. Dependency Manifest & Third-Party Licensure</p>
                <p className="text-[11px] text-slate-400">SBOM check confirming 0 GPL-3 license contamination on proprietary tokens.</p>
              </div>
            </div>

            {/* Check 5 */}
            <div 
              onClick={() => setCheck5(!check5)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check5 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check5 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-red-400 bg-red-950 text-red-400'}`}>
                {check5 ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
              </div>
              <div>
                <p className="font-bold text-white">5. Screenshots & Visual Cover Media {check5 ? '✅' : '⚠️ (CLICK TO ATTACH)'}</p>
                <p className="text-[11px] text-slate-400">1200x630px high-contrast dark-mode cover and 4 UI panel captures.</p>
              </div>
            </div>

            {/* Check 6 */}
            <div 
              onClick={() => setCheck6(!check6)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check6 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check6 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check6 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">6. Simulated Data & Vertical Risk Disclaimer (Rule 1)</p>
                <p className="text-[11px] text-slate-400">Strict disclosure: Concept prototype using simulated data. No live production claims.</p>
              </div>
            </div>

            {/* Check 7 */}
            <div 
              onClick={() => setCheck7(!check7)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check7 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check7 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check7 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">7. License SKU & Transfer Eligibility</p>
                <p className="text-[11px] text-slate-400">Assigned SKU ($199 MSRP) and classified as Core Protected or APA Eligible.</p>
              </div>
            </div>

            {/* Check 8 */}
            <div 
              onClick={() => setCheck8(!check8)}
              className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                check8 ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-black/40 border-white/10 text-slate-400'
              }`}
            >
              <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${check8 ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>
                {check8 && <Check size={12} strokeWidth={3} />}
              </div>
              <div>
                <p className="font-bold text-white">8. Maintenance Owner & Review Date</p>
                <p className="text-[11px] text-slate-400">Assigned engineering pit crew member and scheduled audit cadence.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Verdict Barrier */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          allPassed 
            ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200' 
            : 'bg-red-950/30 border-red-500 text-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {allPassed ? (
              <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
            ) : (
              <AlertOctagon size={24} className="text-red-400 shrink-0" />
            )}
            <div className="text-xs">
              <p className="font-bold">
                {allPassed ? 'ALL 8 GATE REQUIREMENTS SATISFIED' : 'INTAKE GATE BARRIER ACTIVE // REGISTRATION BLOCKED'}
              </p>
              <p className="text-[11px] text-slate-300">
                {allPassed 
                  ? `Vehicle #${candidateId} has passed all quality standards and is certified for official catalog intake.` 
                  : `Cannot increment official 500-vehicle counter until all 8 gate parameters are satisfied (Missing: Check 5).`}
              </p>
            </div>
          </div>

          <button
            onClick={handleApproveIntake}
            disabled={!allPassed}
            className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 shrink-0 ${
              allPassed 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 cursor-pointer active:scale-95' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <CheckCircle2 size={15} />
            <span>APPROVE FOR FACTORY ENTRY</span>
          </button>
        </div>

        {intakeSuccess && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500 rounded-lg text-xs text-emerald-300 font-bold flex items-center gap-2">
            <Sparkles size={16} />
            <span>SUCCESS: Asset #{candidateId} verified and admitted to Ghost Factory inventory ledger!</span>
          </div>
        )}
      </section>
    </div>
  );
};
