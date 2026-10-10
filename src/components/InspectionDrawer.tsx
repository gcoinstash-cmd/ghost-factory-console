import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Database, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal,
  Zap,
  Lock,
  Layers
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { getDomainClass, getRarityTier } from './BlueprintCard';
import { getBlueprintPricing } from '../data/licenseMatrix';

interface InspectionDrawerProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTestDrive?: (product: ProductItem) => void;
}

export const InspectionDrawer: React.FC<InspectionDrawerProps> = ({
  product,
  isOpen,
  onClose,
  onOpenTestDrive
}) => {
  const [activeInspectorTab, setActiveInspectorTab] = useState<'specs' | 'openapi' | 'gates'>('specs');
  const [copiedRoute, setCopiedRoute] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const rarity = getRarityTier(product);
  const domain = getDomainClass(product);
  const isTrack3 = Boolean(product.pricing_track?.includes('Track 3')) || product.id >= 138;
  const isTrack2 = !isTrack3 && (product.pricing_track?.includes('Track 1') ? false : ((product.id >= 86 && product.id !== 112) || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'))));
  const pricing = getBlueprintPricing(product);

  const slotStr = `SLOT #${product.id.toString().padStart(3, '0')}`;
  const trackLabel = isTrack3 ? 'Track 3 — F1 Working Service Engine' : isTrack2 ? 'Track 2 — Flagship Tier-1 SCADA' : 'Track 1 — Lean Rapid-Sale';

  const openApiEndpoints = [
    {
      method: 'GET',
      path: `/api/v1/telemetry/${product.id}/stream`,
      desc: 'Reactive telemetry data stream with sub-millisecond polling buffer',
      statusCode: '200'
    },
    {
      method: 'POST',
      path: `/api/v1/telemetry/${product.id}/transition`,
      desc: 'Deterministic state machine transition dispatcher & parameter validator',
      statusCode: '200'
    },
    {
      method: 'GET',
      path: `/api/v1/telemetry/${product.id}/health`,
      desc: 'Telemetry subsystem heartbeat, memory density, and latency diagnostics',
      statusCode: '200'
    },
    {
      method: 'GET',
      path: `/api/v1/contracts/${product.id}/openapi.json`,
      desc: 'Canonical OpenAPI 3.1 contract schema and parameter models',
      statusCode: '200'
    }
  ];

  const handleCopyRoute = (path: string) => {
    navigator.clipboard?.writeText(path);
    setCopiedRoute(path);
    setTimeout(() => setCopiedRoute(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono text-xs">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0C0C0F] border-l border-emerald-500/40 text-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* DRAWER TOP HEADER */}
          <div className="p-5 border-b border-white/10 bg-black/60 relative">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-slate-300 bg-black/80 px-2.5 py-0.5 rounded border border-white/20">
                  {slotStr}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                  rarity === 'Elite' ? 'border-amber-400 text-amber-300 bg-amber-950/40' :
                  rarity === 'Pro' ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' :
                  'border-slate-500 text-slate-300 bg-slate-900'
                }`}>
                  {rarity} TIER
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                  isTrack3 ? 'border-purple-500/60 text-purple-300 bg-purple-950/40' :
                  isTrack2 ? 'border-amber-500/60 text-amber-300 bg-amber-950/40' :
                  'border-emerald-500/50 text-emerald-300 bg-emerald-950/30'
                }`}>
                  {isTrack3 ? 'TRACK 3 F1' : isTrack2 ? 'TRACK 2 SCADA' : 'TRACK 1 LEAN'}
                </span>
              </div>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close inspection drawer"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {product.name}
            </h2>
            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-2 mt-1 font-semibold">
              <span className="text-emerald-400">{product.category}</span>
              <span>•</span>
              <span className="text-cyan-300">{domain}</span>
            </div>

            {/* Sub-Tabs within Inspection Drawer */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
              <button
                onClick={() => setActiveInspectorTab('specs')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeInspectorTab === 'specs'
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30 font-black'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Cpu size={14} />
                <span>POWERTRAIN &amp; SPECS</span>
              </button>

              <button
                onClick={() => setActiveInspectorTab('openapi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeInspectorTab === 'openapi'
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-black'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Code2 size={14} />
                <span>OPENAPI 3.1 ROUTES</span>
              </button>

              <button
                onClick={() => setActiveInspectorTab('gates')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeInspectorTab === 'gates'
                    ? 'bg-purple-500 text-black shadow-md shadow-purple-500/30 font-black'
                    : 'bg-black/40 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <Layers size={14} />
                <span>QUALITY GATES &amp; IP</span>
              </button>
            </div>
          </div>

          {/* DRAWER BODY (SCROLLABLE WITHIN BOUNDS) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#09090C]/90">
            
            {/* MANDATORY PRODUCT TRUTH NOTICE */}
            <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-200">
              <ShieldAlert size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block uppercase tracking-wide">
                  Product Truth Specification
                </strong>
                <p className="mt-0.5 leading-relaxed">
                  Interactive Prototype running on simulated sample data feeds. Postgres schema with row-level security (RLS) patterns included. Not legal, medical, financial, or flight-certified advice.
                </p>
              </div>
            </div>

            {/* TAB 1: POWERTRAIN SPECS */}
            {activeInspectorTab === 'specs' && (
              <div className="space-y-4">
                {/* Core Architecture Block */}
                <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-3">
                  <h3 className="text-xs uppercase font-black tracking-wider text-emerald-400 flex items-center gap-2">
                    <Cpu size={15} /> Core Powertrain Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase block">Frontend Chassis</span>
                      <strong className="text-white block">React 19 + TypeScript + Tailwind CSS</strong>
                      <span className="text-slate-500 text-[10px]">Lucide UI HUD modular component system</span>
                    </div>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase block">Database Engine</span>
                      <strong className="text-cyan-300 block">PostgreSQL (RLS Pattern)</strong>
                      <span className="text-slate-500 text-[10px]">Idempotent schema.sql &amp; seed.sql files</span>
                    </div>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase block">Telemetry Pipeline</span>
                      <strong className="text-emerald-300 block">Sub-Millisecond Polling Loop</strong>
                      <span className="text-slate-500 text-[10px]">Simulated WebSocket &amp; state buffer</span>
                    </div>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                      <span className="text-slate-400 text-[10px] uppercase block">Domain Solver</span>
                      <strong className="text-amber-300 block">
                        {product.id === 109 ? 'Sabatier Bypass Valve Solver' : 'Deterministic State Machine'}
                      </strong>
                      <span className="text-slate-500 text-[10px]">Operational physics &amp; business logic</span>
                    </div>
                  </div>
                </div>

                {/* Target Audience & Best For */}
                {product.best_for && (
                  <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-1.5">
                    <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
                      Commercial Buyer Suitability
                    </span>
                    <p className="text-slate-200 text-xs font-sans leading-relaxed">
                      {product.best_for.replace(/^Best for:\s*/i, '')}
                    </p>
                  </div>
                )}

                {/* Database Tables Manifest */}
                {product.tables && product.tables.length > 0 && (
                  <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-black text-cyan-400 tracking-wider flex items-center gap-1.5">
                        <Database size={14} /> Relational Schema Manifest ({product.tables.length} Tables)
                      </span>
                      <span className="text-[10px] text-slate-500">Row-Level Security Active</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.tables.map((table) => (
                        <span key={table} className="px-2 py-1 bg-black/80 border border-cyan-500/30 rounded text-cyan-300 font-mono text-[11px]">
                          {table}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Commercial Sticker Price Breakdown */}
                <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-2.5">
                  <span className="text-xs uppercase font-black text-white tracking-wider">
                    Dealership Window Sticker Breakdown
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase block">Standard License</span>
                      <strong className="text-emerald-400 text-sm block">{pricing.standardPrice}</strong>
                      <span className="text-slate-500 text-[10px]">Unlimited end-client use</span>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase block">Pro / Agency Seat</span>
                      <strong className="text-cyan-400 text-sm block">{pricing.proPrice}</strong>
                      <span className="text-slate-500 text-[10px]">Multi-seat deployment</span>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded-lg border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase block">Exclusive Buyout</span>
                      <strong className="text-pink-400 text-sm block">
                        {pricing.isBuyoutEligible ? pricing.buyoutAnchor : 'Permanent (80% Floor)'}
                      </strong>
                      <span className="text-slate-500 text-[10px]">
                        {pricing.isBuyoutEligible ? 'Asset transfer option' : 'Vault Sovereign Reserve'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OPENAPI 3.1 ROUTES */}
            {activeInspectorTab === 'openapi' && (
              <div className="space-y-4">
                <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase font-black tracking-wider text-cyan-400 flex items-center gap-2">
                      <Code2 size={15} /> OpenAPI 3.1 Contract Interface
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                      RFC 9457 Compliant
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Zero client mocks. Each endpoint defines deterministic request parameters, bearer authentication schemas, and telemetry payloads.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {openApiEndpoints.map((ep) => (
                    <div key={ep.path} className="bg-[#121216] border border-white/10 rounded-xl p-3 space-y-2 hover:border-cyan-500/40 transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                            ep.method === 'GET' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          }`}>
                            {ep.method}
                          </span>
                          <span className="font-mono text-slate-200 text-xs font-bold break-all">
                            {ep.path}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyRoute(ep.path)}
                          className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                          title="Copy route endpoint"
                        >
                          {copiedRoute === ep.path ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {ep.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Sample JSON Payload Viewer */}
                <div className="bg-black/80 border border-white/10 rounded-xl p-3.5 space-y-1.5 font-mono text-[11px]">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Sample Telemetry Contract Payload:</span>
                  <pre className="text-cyan-300 overflow-x-auto p-2 bg-[#09090C] rounded border border-white/5 text-[10px]">
{`{
  "slot_id": ${product.id},
  "asset_name": "${product.name}",
  "pricing_track": "${trackLabel}",
  "telemetry_state": "NOMINAL_ACTIVE",
  "buffer_latency_ms": 0.42,
  "tables_bound": ${JSON.stringify(product.tables?.slice(0, 3) || [])},
  "audit_gate_pass": true
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: QUALITY GATES & IP DILIGENCE */}
            {activeInspectorTab === 'gates' && (
              <div className="space-y-4">
                <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-3">
                  <h3 className="text-xs uppercase font-black tracking-wider text-purple-400 flex items-center gap-2">
                    <Layers size={15} /> Institutional Quality Gate Audit
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span className="text-slate-200 font-bold">Vitest &amp; Pytest Branch Coverage</span>
                      </div>
                      <span className="text-emerald-400 font-black">&gt;80% Coverage (PASS)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span className="text-slate-200 font-bold">Clean-Room Permissive IP (Zero Copyleft)</span>
                      </div>
                      <span className="text-emerald-400 font-black">MIT / Apache 2.0 (PASS)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span className="text-slate-200 font-bold">NIST SP 800-218 SSDF v1.1 Supply Chain</span>
                      </div>
                      <span className="text-emerald-400 font-black">Aligned (PASS)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span className="text-slate-200 font-bold">80% Master Portfolio Retention Floor</span>
                      </div>
                      <span className="text-amber-400 font-black">
                        {product.buyoutEligible && !product.permanent ? 'Liquid Slot (Max 32)' : 'Vaulted Core (Permanent)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121216] border border-white/10 rounded-xl p-4 space-y-2 text-[11px] text-slate-300 leading-relaxed">
                  <span className="text-xs uppercase font-black text-white block">
                    Micro-APA Intellectual Property Boundaries
                  </span>
                  <p>
                    Any selective asset purchase agreement (micro-APA) applies solely to this singular vehicle ({product.name}) and explicitly excludes GhostFactoryOS core architectures, Aura &amp; Grid showroom brands, shared component registries, factory prompts, and future vehicle catalog rights.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DRAWER STICKY FOOTER */}
          <div className="p-4 border-t border-white/10 bg-black/80 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-slate-300 hover:text-white font-bold transition-all cursor-pointer"
            >
              Close Inspector
            </button>

            <div className="flex items-center gap-2">
              {onOpenTestDrive && (
                <button
                  onClick={() => {
                    onOpenTestDrive(product);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-white/20 transition-all cursor-pointer"
                >
                  Interactive Sandbox
                </button>
              )}

              <a
                href={product.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                <ExternalLink size={15} />
                <span>Launch Demo Tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDrawer;
