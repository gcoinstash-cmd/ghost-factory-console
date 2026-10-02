import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertOctagon, 
  Check, 
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  AlertTriangle
} from 'lucide-react';
import { ProductItem } from '../catalogData';

interface FactoryLineScreenProps {
  products: ProductItem[];
  totalAssets: number;
}

export const FactoryLineScreen: React.FC<FactoryLineScreenProps> = ({
  products,
  totalAssets
}) => {
  // 5 Stages of the Assembly Line
  const stages = [
    { id: 1, name: '1. Concept & Wireframe', count: 14, desc: 'B2B niche workflow definition & domain research' },
    { id: 2, name: '2. Working Prototype', count: 20, desc: 'Tailwind UI, React components & mock sensor states' },
    { id: 3, name: '3. Hosted Demo Sandbox', count: 65, desc: 'Render deployment, Supabase schema & demo passcodes' },
    { id: 4, name: '4. Track 1 Lean Rapid-Sale', count: 85, desc: 'Passed 8-point Intake Gate ($199 MSRP / $4.5k Buyout Anchor)' },
    { id: 5, name: '5. Track 2 Flagship Tier-1', count: 25, desc: 'Passed 8-point Flagship Gate ($1,500 MSRP / $14.5k Anchor)' }
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

  // Stage 5 Track 2 Flagship Candidate Audit State (Assets #086 to #110)
  const [candidateFilter, setCandidateFilter] = useState('');
  const [candidateAudits, setCandidateAudits] = useState<Record<number, Record<string, boolean>>>({});

  const toggleCheck = (productId: number, checkKey: string) => {
    setCandidateAudits(prev => {
      const current = prev[productId] || {
        workflow: true,
        identity: true,
        screens: true,
        physics: true,
        journey: true,
        simulatedTerms: true,
        brief: true,
        disclosure: true
      };
      return {
        ...prev,
        [productId]: {
          ...current,
          [checkKey]: !current[checkKey]
        }
      };
    });
  };

  const flagshipCandidates = products.filter(p => p.id >= 86 || p.pricing_track?.includes('Track 2'));
  const filteredCandidates = flagshipCandidates.filter(p => 
    p.name.toLowerCase().includes(candidateFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(candidateFilter.toLowerCase()) ||
    p.vertical.toLowerCase().includes(candidateFilter.toLowerCase()) ||
    p.id.toString().includes(candidateFilter)
  );

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

      {/* STAGE 5: TRACK 2 FLAGSHIP CANDIDATE AUDIT STATION (24 MODELS) */}
      <section className="bg-gradient-to-br from-[#14120f] to-[#0A0A0B] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 glow-gold">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-amber-500/20 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-lg text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2.5">
              <ShieldCheck size={14} /> STAGE 5 // TRACK 2 FLAGSHIP QUALIFICATION STATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              TRACK 2 CANDIDATE FLEET // <span className="text-amber-400 font-mono">{flagshipCandidates.length} ELITE MODELS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every candidate digital vehicle from Slot #086 to Slot #110 is classified under Track 2 ($14,500 Anchor). Review the attached 8-point Flagship Qualification Gate checklist on each unit before final commercial release.
            </p>
          </div>

          <div className="bg-black/80 border border-amber-500/30 p-3.5 rounded-xl text-xs font-mono space-y-1">
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400">Candidate Fleet:</span>
              <strong className="text-amber-400 font-bold">{flagshipCandidates.length} Vehicles (#086–#{products[products.length - 1]?.id.toString().padStart(3, '0') || '110'})</strong>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400">Buyout Anchor:</span>
              <strong className="text-white font-bold">$14,500 USD (T2 Protocol)</strong>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-400">Commercial License:</span>
              <strong className="text-emerald-400 font-bold">$1,500 – $3,500 USD</strong>
            </div>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search candidate name, domain, or ID..."
              value={candidateFilter}
              onChange={(e) => setCandidateFilter(e.target.value)}
              className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
          <span className="text-xs text-slate-400 font-mono self-end sm:self-center">
            Showing <strong className="text-amber-400">{filteredCandidates.length}</strong> of {flagshipCandidates.length} Flagship Candidates
          </span>
        </div>

        {/* 24 Candidate Cards with Attached 8-Point Gate Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredCandidates.map((product) => {
            const checks = candidateAudits[product.id] || {
              workflow: true,
              identity: true,
              screens: true,
              physics: true,
              journey: true,
              simulatedTerms: true,
              brief: true,
              disclosure: true
            };
            const passedCount = Object.values(checks).filter(Boolean).length;
            const isAllPassed = passedCount === 8;

            return (
              <div 
                key={product.id}
                className="bg-black/70 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-amber-400 transition-all shadow-lg shadow-amber-500/5 relative overflow-hidden"
              >
                {/* Header: Slot + Name + Track 2 Badge */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        SLOT #{product.id.toString().padStart(3, '0')}
                      </span>
                      <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                        {product.vertical.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <span className="px-2.5 py-1 rounded font-black text-xs uppercase tracking-wider bg-amber-500/20 border border-amber-500/60 text-amber-300 shrink-0">
                    TRACK 2 // FLAGSHIP CANDIDATE
                  </span>
                </div>

                {/* Track 2 Pricing Schedule (No Track 1 numbers) */}
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Buyout Anchor</span>
                    <strong className="text-amber-400 font-bold text-sm">$14,500</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Flagship License</span>
                    <strong className="text-white font-bold text-sm">$1,500–$3,500</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Buyout Range</span>
                    <strong className="text-slate-200 font-bold text-sm">$10k–$18k</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Strategic APA</span>
                    <strong className="text-purple-300 font-bold text-sm">$35k–$75k+</strong>
                  </div>
                </div>

                {/* Mandatory Truth Label */}
                <div className="bg-black/80 border border-amber-500/30 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <AlertTriangle size={13} className="text-amber-400" />
                    <span>TRUTH BADGE:</span>
                  </div>
                  <span className="text-amber-400 text-right font-semibold text-[11px] sm:text-xs">
                    {product.truth_label || 'Interactive Prototype (Simulated Data Only) — Awaiting Flagship Qualification Audit'}
                  </span>
                </div>

                {/* ATTACHED 8-POINT FLAGSHIP QUALIFICATION GATE CHECKLIST */}
                <div className="space-y-2 pt-1 border-t border-white/10 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} className="text-amber-400" />
                      <span>Attached Flagship Qualification Gate Checklist:</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isAllPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {passedCount}/8 AUDIT CHECKS {isAllPassed ? 'PASSED ✅' : 'PENDING ⚠️'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div 
                      onClick={() => toggleCheck(product.id, 'workflow')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.workflow ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>1. High-Stakes B2B Workflow</span>
                      {checks.workflow ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'identity')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.identity ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>2. Visual Identity & Benchmark</span>
                      {checks.identity ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'screens')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.screens ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>3. 8–15 Interactive Sub-Panels</span>
                      {checks.screens ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'physics')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.physics ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>4. Domain Physics / SCADA Logic</span>
                      {checks.physics ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'journey')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.journey ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>5. Full Operator Journey</span>
                      {checks.journey ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'simulatedTerms')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.simulatedTerms ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>6. Simulated Domain Terminology</span>
                      {checks.simulatedTerms ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'brief')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.brief ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>7. Walkthrough Brief & Demo URL</span>
                      {checks.brief ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>

                    <div 
                      onClick={() => toggleCheck(product.id, 'disclosure')}
                      className={`p-2 rounded border cursor-pointer flex items-center justify-between transition-all ${
                        checks.disclosure ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-red-950/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <span>8. Simulated Data Disclosure (Rule 1)</span>
                      {checks.disclosure ? <Check size={12} className="text-emerald-400" /> : <X size={12} className="text-red-400" />}
                    </div>
                  </div>
                </div>

                {/* Footer Actions: Live Demo Direct Route */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Postgres Schema with RLS Pattern</span>
                  </div>

                  <a 
                    href={product.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                  >
                    <ExternalLink size={13} />
                    <span>[VIEW LIVE DEMO]</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
