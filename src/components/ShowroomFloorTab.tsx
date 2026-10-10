import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Car, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  Activity, 
  Maximize2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { getDomainClass, getRarityTier, RarityTier } from './BlueprintCard';
import { getBlueprintPricing } from '../data/licenseMatrix';
import { REGULATED_SECTOR_DISCLAIMER } from '../constants/disclaimers';

interface ShowroomFloorTabProps {
  products: ProductItem[];
  totalAssets?: number;
  onInspect: (product: ProductItem) => void;
  onTestDrive: (product: ProductItem) => void;
}

export const ShowroomFloorTab: React.FC<ShowroomFloorTabProps> = ({
  products,
  totalAssets = 160,
  onInspect,
  onTestDrive
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 9; // 3x3 Responsive Card Matrix (160 items = 18 Pages)

  const domainOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(getDomainClass(p)));
    const sorted = Array.from(set).sort((a, b) => a.localeCompare(b));
    return ['ALL', ...sorted];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const rarity = getRarityTier(p);
      const domain = getDomainClass(p);
      const isTrack3 = (p.pricing_track?.includes('Track 3') ?? false) || (p.id >= 138) || (p.tag?.startsWith('GF-T3') ?? false) || (p.tag === 'T3-NEXUS-01');
      const isTrack2 = !isTrack3 && (p.pricing_track?.includes('Track 1') ? false : (Boolean(p.flagship_qualified) || (p.pricing_track?.includes('Track 2') ?? false) || (p.id >= 86 && p.id !== 112)));
      const isTrack1 = !isTrack3 && !isTrack2;

      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm) ||
        (p.best_for || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.vertical || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDomain = selectedDomain === 'ALL' || domain === selectedDomain;
      const matchesRarity = selectedRarity === 'ALL' || rarity === selectedRarity;
      const matchesTrack = 
        selectedTrack === 'ALL' ||
        (selectedTrack === 'TRACK_1' && isTrack1) ||
        (selectedTrack === 'TRACK_2' && isTrack2) ||
        (selectedTrack === 'TRACK_3' && isTrack3);

      return matchesSearch && matchesDomain && matchesRarity && matchesTrack;
    });
  }, [products, searchTerm, selectedDomain, selectedRarity, selectedTrack]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const displayedProducts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIdx, startIdx + PAGE_SIZE);
  }, [filteredProducts, safeCurrentPage, PAGE_SIZE]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleDomainChange = (val: string) => {
    setSelectedDomain(val);
    setCurrentPage(1);
  };

  const handleTrackChange = (val: string) => {
    setSelectedTrack(val);
    setCurrentPage(1);
  };

  const handleRarityChange = (val: string) => {
    setSelectedRarity(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 font-mono w-full pb-8">
      {/* FILTER & SHOWROOM CONTROLS BAR */}
      <div className="bg-[#111115] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Car size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  EXECUTIVE SHOWROOM FLOOR
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  {filteredProducts.length} Vehicles Matching Filter
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Paginated 3×3 Vehicle Matrix
              </h2>
            </div>
          </div>

          {/* Quick Page Info & Controls */}
          <div className="flex items-center gap-2 self-start lg:self-auto text-xs">
            <span className="text-slate-400 text-xs font-bold mr-1">
              Page <strong className="text-emerald-400">{safeCurrentPage}</strong> of <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-200 hover:text-white hover:border-emerald-500/60 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-200 hover:text-white hover:border-emerald-500/60 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Input & Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Search Box */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search vehicle name or keyword..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-black/80 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono font-bold"
            />
          </div>

          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={(e) => handleDomainChange(e.target.value)}
            className="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-mono font-bold cursor-pointer"
          >
            {domainOptions.map(d => (
              <option key={d} value={d}>{d === 'ALL' ? 'All Domain Classes' : d}</option>
            ))}
          </select>

          {/* Track Filter */}
          <select
            value={selectedTrack}
            onChange={(e) => handleTrackChange(e.target.value)}
            className="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Powertrain Tracks (160)</option>
            <option value="TRACK_1">Track 1 — Lean Rapid-Sale (86)</option>
            <option value="TRACK_2">Track 2 — Flagship Tier-1 SCADA (51)</option>
            <option value="TRACK_3">Track 3 — F1 Skunkworks Engines (23)</option>
          </select>

          {/* Rarity Filter */}
          <select
            value={selectedRarity}
            onChange={(e) => handleRarityChange(e.target.value)}
            className="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400 font-mono font-bold cursor-pointer"
          >
            <option value="ALL">All Showroom Tiers</option>
            <option value="Elite">Elite Tier (Flagships)</option>
            <option value="Pro">Pro Tier (Advanced)</option>
            <option value="Core">Core Tier (Turnkey)</option>
          </select>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5 text-[11px]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mr-1">
            QUICK FILTERS:
          </span>
          <button
            onClick={() => handleSearchChange(searchTerm === 'FinTech' ? '' : 'FinTech')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono font-bold text-[10px] transition-colors cursor-pointer ${
              searchTerm === 'FinTech' 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-sm shadow-emerald-500/20' 
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            FinTech (27 Units)
          </button>
          <button
            onClick={() => handleSearchChange(searchTerm === 'Telemetry' ? '' : 'Telemetry')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono font-bold text-[10px] transition-colors cursor-pointer ${
              searchTerm === 'Telemetry' 
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-sm shadow-cyan-500/20' 
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Telemetry (60 Units)
          </button>
          <button
            onClick={() => handleSearchChange(searchTerm === 'Edge AI' ? '' : 'Edge AI')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono font-bold text-[10px] transition-colors cursor-pointer ${
              searchTerm === 'Edge AI' 
                ? 'bg-purple-500 text-black border-purple-400 shadow-sm shadow-purple-500/20' 
                : 'bg-purple-950/40 border-purple-500/40 text-purple-300 hover:bg-purple-950/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Edge AI (5 Units)
          </button>
          <button
            onClick={() => handleSearchChange(searchTerm === 'Zero-Trust' ? '' : 'Zero-Trust')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono font-bold text-[10px] transition-colors cursor-pointer ${
              searchTerm === 'Zero-Trust' 
                ? 'bg-pink-500 text-black border-pink-400 shadow-sm shadow-pink-500/20' 
                : 'bg-pink-950/40 border-pink-500/40 text-pink-300 hover:bg-pink-950/70'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            Zero-Trust (3 Units)
          </button>
        </div>
      </div>

      {/* 3×3 RESPONSIVE CARD MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product) => {
          const rarity = getRarityTier(product);
          const domain = getDomainClass(product);
          const isTrack3 = Boolean(product.pricing_track?.includes('Track 3')) || product.id >= 138;
          const isTrack2 = !isTrack3 && (product.pricing_track?.includes('Track 1') ? false : ((product.id >= 86 && product.id !== 112) || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'))));
          const pricing = getBlueprintPricing(product);

          return (
            <div
              key={product.id}
              onClick={() => onInspect(product)}
              className="bg-[#111115] border border-white/10 hover:border-emerald-400/80 rounded-2xl p-5 flex flex-col justify-between min-h-[240px] space-y-3 shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Top Slot Pill & Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-300 bg-black/80 px-2.5 py-0.5 rounded border border-white/15">
                  SLOT #{product.id.toString().padStart(3, '0')}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    rarity === 'Elite' ? 'border-amber-400/80 text-amber-300 bg-amber-950/40' :
                    rarity === 'Pro' ? 'border-cyan-400/80 text-cyan-300 bg-cyan-950/40' :
                    'border-white/10 text-slate-300 bg-black/60'
                  }`}>
                    {rarity}
                  </span>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isTrack3 ? 'border-purple-500/60 text-purple-300 bg-purple-950/40' :
                    isTrack2 ? 'border-amber-500/60 text-amber-300 bg-amber-950/40' :
                    'border-emerald-500/50 text-emerald-300 bg-emerald-950/30'
                  }`}>
                    {isTrack3 ? 'T3 F1' : isTrack2 ? 'T2 SCADA' : 'T1 LEAN'}
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <div>
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-tight line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-1 line-clamp-1">
                  {product.category}
                </p>
                <span className="inline-block text-[11px] text-cyan-300 mt-1 font-mono">
                  {domain}
                </span>
              </div>

              {/* Dealership Sticker & Architecture Specs */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">License MSRP:</span>
                  <strong className={`${isTrack3 ? 'text-purple-300' : isTrack2 ? 'text-amber-300' : 'text-emerald-300'} font-black font-mono`}>
                    {isTrack3 ? '$1,500/mo' : pricing.standardPrice}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Buyout Anchor:</span>
                  <span className="text-pink-300 font-bold font-mono">
                    {pricing.isBuyoutEligible ? pricing.buyoutAnchor : '80% Vault Core'}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Database size={11} />
                    <span>Postgres RLS Pattern</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    Demo Online
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onInspect(product)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-950/60 text-emerald-300 hover:text-emerald-200 border border-emerald-500/50 hover:border-emerald-400 font-black text-xs uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Maximize2 size={13} className="text-emerald-400" />
                  <span>Inspect Specs</span>
                </button>

                <a
                  href={product.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
                  title="Launch direct demo"
                >
                  <ExternalLink size={13} />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM PAGINATION TOOLBAR */}
      <div className="bg-[#111115] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="text-slate-300 font-bold text-center sm:text-left">
          Showing <span className="text-emerald-400">{filteredProducts.length === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1}</span>–
          <span className="text-emerald-400">{Math.min(safeCurrentPage * PAGE_SIZE, filteredProducts.length)}</span> of{' '}
          <strong className="text-white">{filteredProducts.length}</strong> Filtered Vehicles ({totalAssets} Total)
        </div>

        {/* Page Nav Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safeCurrentPage <= 1}
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
          >
            ‹ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
            // Show first, last, and window around current
            if (pg === 1 || pg === totalPages || (pg >= safeCurrentPage - 2 && pg <= safeCurrentPage + 2)) {
              return (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-bold transition-all cursor-pointer text-xs ${
                    pg === safeCurrentPage
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                      : 'bg-black/60 border border-white/20 text-slate-400 hover:text-white'
                  }`}
                >
                  {pg}
                </button>
              );
            }
            if (pg === safeCurrentPage - 3 || pg === safeCurrentPage + 3) {
              return <span key={pg} className="text-slate-600 px-0.5">…</span>;
            }
            return null;
          })}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage >= totalPages}
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowroomFloorTab;
