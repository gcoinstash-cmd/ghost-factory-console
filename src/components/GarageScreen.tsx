import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Key, 
  ShieldCheck, 
  Database, 
  Activity, 
  Check, 
  ChevronRight,
  Car,
  AlertTriangle
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { NextBestActionBanner } from './NextBestActionBanner';

interface GarageScreenProps {
  products: ProductItem[];
  totalAssets: number;
  retainedFloor: number;
  availableApaSlots: number;
  planningValue: number;
  onEngageMission: () => void;
  missionCompleted: boolean;
  onOpenTestDrive: (product: ProductItem) => void;
}

export type RarityTier = 'Mythic Candidate' | 'Legendary' | 'Elite' | 'Rare' | 'Common';

export function getRarityTier(product: ProductItem): RarityTier {
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  if (product.id >= 86 || product.flagship_qualified || product.pricing_track?.includes('Track 2') || name.includes('eclss') || cat.includes('scada') || name.includes('mining') || name.includes('hypersonic') || name.includes('laser isl') || name.includes('aegis')) {
    return 'Mythic Candidate';
  }
  if (product.audit_score >= 9.6 && (product.vertical === 'heavy_fleet' || product.vertical === 'wealth' || product.vertical === 'medical')) {
    return 'Legendary';
  }
  if (product.audit_score >= 9.5) {
    return 'Elite';
  }
  if (product.audit_score >= 9.0) {
    return 'Rare';
  }
  return 'Common';
}

export function getDomainClass(product: ProductItem): string {
  const cat = product.category.toLowerCase();
  const v = product.vertical.toLowerCase();
  if (cat.includes('scada') || cat.includes('telemetry') || cat.includes('terminal')) return 'Deep Tech & SCADA';
  if (cat.includes('mining') || cat.includes('aegis') || cat.includes('wind tunnel')) return 'Industrial Robotics';
  if (v === 'wealth' || cat.includes('wealth') || cat.includes('bank') || cat.includes('capital')) return 'Wealth & Private Banking';
  if (v === 'medical' || cat.includes('clinical') || cat.includes('dental') || cat.includes('health')) return 'Medical & Health Systems';
  if (v === 'hospitality' || cat.includes('resort') || cat.includes('dining') || cat.includes('hotel')) return 'Luxury Hospitality';
  if (v === 'creative' || cat.includes('studio') || cat.includes('production') || cat.includes('atelier')) return 'Creative & Studios';
  if (v === 'automotive' || v === 'heavy_fleet' || cat.includes('fleet') || cat.includes('rental')) return 'Automotive & Fleet';
  return 'Boutique Operations';
}

export const GarageScreen: React.FC<GarageScreenProps> = ({
  products,
  totalAssets,
  retainedFloor,
  availableApaSlots,
  planningValue,
  onEngageMission,
  missionCompleted,
  onOpenTestDrive
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyPasscode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const domainOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(getDomainClass(p)));
    return ['ALL', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const rarity = getRarityTier(p);
      const domain = getDomainClass(p);
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.admin_passcode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'ALL' || domain === selectedDomain;
      const matchesRarity = selectedRarity === 'ALL' || rarity === selectedRarity;
      return matchesSearch && matchesDomain && matchesRarity;
    });
  }, [products, searchTerm, selectedDomain, selectedRarity]);

  return (
    <div className="space-y-8 font-mono">
      {/* METRIC BANNER: Screen 1 Main Collection HUD (Rendered First as Requested) */}
      <section className="bg-gradient-to-br from-[#121215] to-[#0A0A0B] border border-emerald-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden glow-emerald">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/40 rounded-lg text-sm sm:text-base font-mono font-black text-emerald-400 uppercase tracking-widest mb-3">
              <Car size={18} /> SCREEN 1 // DIGITAL VEHICLE GARAGE HUD
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
              COLLECTION: <span className="text-emerald-400 font-mono">{totalAssets} / 500 DIGITAL VEHICLES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-2 max-w-3xl leading-relaxed font-semibold">
              Internal portfolio telemetry monitor. 100% pre-revenue interactive concept demos and SCADA prototypes running on simulated telemetry feeds.
            </p>
          </div>

          {/* 5 Core Valuation HUD Metric Badges */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-black/80 p-4 sm:p-5 rounded-xl border border-white/15 text-sm">
            <div className="p-1">
              <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Fair Market Value</span>
              <span className="text-base sm:text-xl font-black text-emerald-400">$85.5k – $148.4k</span>
              <span className="text-xs sm:text-sm text-emerald-300 block font-bold">Anchor: ~${planningValue.toLocaleString()}</span>
            </div>
            <div className="p-1 border-l border-white/15 pl-3">
              <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Direct B2B Ask</span>
              <span className="text-base sm:text-xl font-black text-cyan-400">$145.0k – $185.0k</span>
              <span className="text-xs sm:text-sm text-cyan-300 block font-bold">Data Room Ask</span>
            </div>
            <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3">
              <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Realistic Accepted</span>
              <span className="text-base sm:text-xl font-black text-amber-400">$95.0k – $125.0k</span>
              <span className="text-xs sm:text-sm text-amber-300 block font-bold">Negotiated LOI Wire</span>
            </div>
            <div className="p-1 border-t sm:border-t-0 border-l border-white/15 pt-2 sm:pt-1 pl-3">
              <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Dev Replacement</span>
              <span className="text-base sm:text-xl font-black text-purple-400">$700k – $1.69M</span>
              <span className="text-xs sm:text-sm text-purple-300 block font-bold">Cost to Duplicate</span>
            </div>
            <div className="p-1 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-1 sm:pl-3 col-span-2 sm:col-span-1">
              <span className="text-slate-300 block text-xs sm:text-sm uppercase font-black tracking-wider">Exclusive Buyout</span>
              <span className="text-base sm:text-xl font-black text-pink-400">$14,500 Anchor</span>
              <span className="text-xs sm:text-sm text-pink-300 block font-bold">T2 ($10k–$18k) / T1</span>
            </div>
          </div>
        </div>

        {/* 80% Retained Floor Progress Bar */}
        <div className="bg-black/60 border border-white/15 p-4 sm:p-5 rounded-xl space-y-2.5">
          <div className="flex flex-wrap justify-between items-center gap-2 text-sm sm:text-base">
            <span className="text-slate-200 flex items-center gap-2 font-bold">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              <span>Immutable Portfolio Retention Floor Shield:</span>
              <strong className="text-emerald-400">80% Locked ({retainedFloor} of {totalAssets} Vehicles Permanent)</strong>
            </span>
            <span className="text-amber-400 font-black">{availableApaSlots} Slots Transferable</span>
          </div>
          <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 h-full transition-all" style={{ width: `80%` }} title="80% Protected Factory Core" />
            <div className="bg-amber-500/80 h-full transition-all" style={{ width: `20%` }} title="20% Max APA Capacity" />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-slate-300 font-semibold">
            <span>🛡️ Factory Core Vault (GhostFactoryOS Proprietary IP)</span>
            <span>⚡ Selective Micro-APA Window (Max 20%)</span>
          </div>
        </div>
      </section>

      {/* WIN A: Next Best Action Banner (Positioned Directly Below Garage HUD) */}
      <NextBestActionBanner 
        onEngageMission={onEngageMission}
        missionCompleted={missionCompleted}
      />

      {/* FILTER & SEARCH CONTROL CONSOLE */}
      <section className="bg-[#121215] border border-white/15 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            placeholder="Search vehicle designation, domain, passcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/70 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-300" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
            >
              {domainOptions.map(d => (
                <option key={d} value={d}>{d === 'ALL' ? 'All Domain Classes' : d}</option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-black/70 border border-white/20 rounded-lg px-3.5 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Rarity Tiers</option>
            <option value="Mythic Candidate">Mythic Candidate</option>
            <option value="Legendary">Legendary</option>
            <option value="Elite">Elite</option>
            <option value="Rare">Rare</option>
            <option value="Common">Common</option>
          </select>

          <span className="text-slate-200 ml-auto md:ml-0 text-sm sm:text-base font-bold">
            Showing <strong className="text-emerald-400">{filteredProducts.length}</strong> of {totalAssets} Vehicles
          </span>
        </div>
      </section>

      {/* CAR CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const rarity = getRarityTier(product);
          const domain = getDomainClass(product);

          // Rarity styling tokens
          const rarityStyles: Record<RarityTier, { border: string; bg: string; text: string; glow: string }> = {
            'Mythic Candidate': { border: 'border-amber-400/90', bg: 'bg-amber-950/20', text: 'text-amber-300', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]' },
            'Legendary': { border: 'border-purple-500/70', bg: 'bg-purple-950/20', text: 'text-purple-300', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]' },
            'Elite': { border: 'border-cyan-500/60', bg: 'bg-cyan-950/20', text: 'text-cyan-300', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
            'Rare': { border: 'border-emerald-500/50', bg: 'bg-emerald-950/20', text: 'text-emerald-300', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
            'Common': { border: 'border-white/10', bg: 'bg-black/40', text: 'text-slate-300', glow: '' }
          };

          const rStyle = rarityStyles[rarity];

          return (
            <div
              key={product.id}
              className={`rounded-2xl border-2 ${rStyle.border} ${rStyle.bg} ${rStyle.glow} p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400/80 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Card Top: System Designation + Rarity & Domain Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold text-slate-300 bg-black/80 px-2.5 py-1 rounded border border-white/20">
                    SLOT #{product.id.toString().padStart(3, '0')}
                  </span>
                  
                  {/* Rarity Tier Pill */}
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full border ${rStyle.border} ${rStyle.text} bg-black/80`}>
                    {rarity}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-bold mt-1 line-clamp-1">
                    {product.category}
                  </p>
                </div>

                {/* Domain & Archetype pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded font-mono">
                    {domain}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-white/15 font-mono">
                    Arch {product.archetype_id || 'A'}
                  </span>
                </div>
              </div>

              {/* MANDATORY PRODUCT TRUTH BADGES (Rule 1 Strict Compliance) */}
              <div className="space-y-2.5 pt-3 border-t border-white/15 text-sm">
                <div className="flex items-center justify-between bg-black/70 p-2.5 rounded-lg border border-amber-500/40">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider">
                    <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                    <span>TRUTH BADGE:</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Interactive Prototype // Simulated Data Only
                  </span>
                </div>

                {/* Architecture specs */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Database size={13} className="text-cyan-400" />
                    <span>Postgres RLS Demo</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Activity size={13} className="text-emerald-400" />
                    <span className="text-emerald-400 font-black">200 OK Live</span>
                  </span>
                </div>

                {/* Admin Passcode Row */}
                <div className="flex items-center justify-between bg-black/70 p-2.5 rounded-lg border border-white/10 text-xs sm:text-sm font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Key size={13} /> Passcode:
                  </span>
                  <div className="flex items-center gap-2">
                    <code className="text-emerald-400 font-mono font-black bg-black px-2 py-1 rounded border border-emerald-500/40">
                      {product.admin_passcode}
                    </code>
                    <button
                      onClick={() => handleCopyPasscode(product.admin_passcode)}
                      className="text-slate-300 hover:text-white transition-colors cursor-pointer px-2 py-1 bg-slate-900 rounded border border-white/15"
                      title="Copy Passcode"
                    >
                      {copiedCode === product.admin_passcode ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <span className="text-xs font-bold text-slate-300 hover:text-white">COPY</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-2.5">
                <button
                  onClick={() => onOpenTestDrive(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm sm:text-base uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/25 active:scale-95"
                >
                  <ExternalLink size={16} />
                  <span>[TEST DRIVE]</span>
                </button>
                <a
                  href={product.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-white/20"
                  title="Direct New Window Link"
                >
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
