import React from 'react';
import { Database, Activity, ExternalLink, ChevronDown, AlertTriangle } from 'lucide-react';
import { ProductItem } from '../catalogData';
import { OperationalDisclaimer } from './OperationalDisclaimer';

export type RarityTier = 'Elite' | 'Pro' | 'Core';

interface BlueprintCardProps {
  product: ProductItem;
  isOperatorAuthenticated?: boolean;
}

export const getRarityTier = (product: ProductItem): RarityTier => {
  if (product.rarity_tier) return product.rarity_tier;
  if (product.id >= 86 || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'))) {
    return 'Elite';
  }
  if (['A', 'C', 'E'].includes(product.archetype_id || '')) {
    return 'Pro';
  }
  return 'Core';
};

export const getDomainClass = (product: ProductItem): string => {
  if (product.domain) return product.domain;
  const name = (product.name || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  const v = (product.vertical || '').toLowerCase();

  // 1. Subsea / Mining -> Industrial Robotics & Autonomous SCADA
  if (
    v === 'subsea' ||
    name.includes('subsea') || name.includes('mining') || name.includes('crawler') ||
    name.includes('haulage') || name.includes('trenching') || name.includes('cable restoration') ||
    name.includes('rov') || cat.includes('mining') || cat.includes('subsea') || cat.includes('crawler')
  ) {
    return 'Industrial Robotics & Autonomous SCADA';
  }

  // 2. Barber, perfume, spa, retreat, and hospitality -> Lifestyle & Boutique Hospitality
  if (
    cat.includes('barber') || name.includes('barber') ||
    cat.includes('parfumerie') || cat.includes('fragrance') || name.includes('fragrance') || name.includes('apothecary') ||
    cat.includes('spa') || name.includes('spa') || name.includes('medspa') ||
    cat.includes('retreat') || name.includes('retreat') ||
    v === 'hospitality' || cat.includes('hospitality') || cat.includes('dining') || cat.includes('bistro') ||
    cat.includes('omakase') || cat.includes('supper') || cat.includes('winery') || cat.includes('vineyard') ||
    cat.includes('nightlife') || cat.includes('villa') || cat.includes('culinary') || cat.includes('estate')
  ) {
    return 'Lifestyle & Boutique Hospitality';
  }

  // 3. Energy SCADA
  if (
    name.includes('fusion') || name.includes('tokamak') || name.includes('geothermal') ||
    name.includes('microgrid') || name.includes('cryostat') || name.includes('semiconductor fab') ||
    name.includes('cleanroom') || v === 'clean_energy'
  ) {
    return 'Energy SCADA';
  }

  // 4. Deep Tech SCADA (Aerospace, Defense, Space)
  if (
    v.includes('aerospace') || v.includes('defense') || v.includes('deep_tech') ||
    name.includes('drone swarm') || name.includes('supersonic') || name.includes('hypersonic') ||
    name.includes('satellite') || name.includes('laser isl') || name.includes('payload manifest') ||
    name.includes('orbital') || name.includes('eclss') || name.includes('propellant depot')
  ) {
    return 'Deep Tech SCADA';
  }

  // 5. Clinical & Medical Operations
  if (
    v.includes('medical') || v.includes('clinical') ||
    name.includes('clinical trial') || name.includes('dental') || name.includes('veterinary') ||
    name.includes('hyperbaric') || name.includes('spine')
  ) {
    return 'Clinical & Medical Operations';
  }

  // 6. Institutional Capital & Wealth
  if (
    v.includes('wealth') || v.includes('finance') || v.includes('credit') ||
    name.includes('credit syndication') || name.includes('capital') || name.includes('family office') ||
    name.includes('horology') || name.includes('litigation') || name.includes('advisory')
  ) {
    return 'Institutional Capital & Wealth';
  }

  // 7. Mobility & Fleet Logistics
  if (
    v.includes('automotive') || v.includes('heavy_fleet') ||
    name.includes('aviation fbo') || name.includes('freight brokerage') || name.includes('maritime') ||
    name.includes('yacht') || name.includes('rental') || name.includes('tuning') || name.includes('detail') ||
    name.includes('ppf') || name.includes('cold storage') || name.includes('crane rigging')
  ) {
    return 'Mobility & Fleet Logistics';
  }

  // 8. Performance Athletics & Fitness
  if (
    v.includes('fitness') || name.includes('stride') || name.includes('boxing') ||
    name.includes('kinetic') || name.includes('recovery lab') || name.includes('fight club')
  ) {
    return 'Performance Athletics & Fitness';
  }

  // 9. Trades & Infrastructure
  if (
    v.includes('home_services') || name.includes('hvac') || name.includes('plumbing') ||
    name.includes('electrical') || name.includes('solar') || name.includes('roofing')
  ) {
    return 'Trades & Infrastructure';
  }

  // 10. Creative & Media Production
  if (v.includes('creative') || name.includes('studio') || name.includes('motion') || name.includes('ink') || name.includes('monolith') || name.includes('cinegrip')) {
    return 'Creative & Media Production';
  }

  return 'Specialized Operations';
};

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  product,
  isOperatorAuthenticated = false,
}) => {
  const rarity = getRarityTier(product);
  const domain = getDomainClass(product);
  const isTrack2 = product.id >= 86 || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'));

  const rarityStyles: Record<RarityTier, { border: string; bg: string; text: string; glow: string }> = {
    'Elite': { border: 'border-amber-400/90', bg: 'bg-amber-950/20', text: 'text-amber-300', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]' },
    'Pro': { border: 'border-cyan-500/60', bg: 'bg-cyan-950/20', text: 'text-cyan-300', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
    'Core': { border: 'border-white/10', bg: 'bg-black/40', text: 'text-slate-300', glow: '' }
  };

  const rStyle = rarityStyles[rarity];

  return (
    <div
      className={`rounded-2xl border-2 ${rStyle.border} ${rStyle.bg} ${rStyle.glow} p-6 flex flex-col justify-between space-y-4 hover:border-emerald-400/80 transition-all duration-300 group relative overflow-hidden font-mono`}
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
          
          {/* UNCONDITIONAL MANDATORY OPERATIONAL DISCLAIMER & TRUTH BADGE */}
          <OperationalDisclaimer />

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

      {/* BUYER TARGETING: Best For */}
      {product.best_for && (
        <div className="px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono flex items-start gap-2 shadow-inner">
          <span className="text-amber-400 font-black uppercase tracking-wider shrink-0 text-[11px]">Best For:</span>
          <span className="text-slate-200 font-medium text-[11px] leading-snug">{product.best_for.replace(/^Best for:\s*/i, '')}</span>
        </div>
      )}

      {/* DUAL-TRACK DEALERSHIP WINDOW STICKER */}
      <div className={`p-3.5 rounded-xl border text-xs font-mono space-y-2.5 transition-colors ${
        isTrack2 
          ? 'bg-amber-950/30 border-amber-500/50 text-amber-200' 
          : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-1 rounded font-black text-[10px] sm:text-xs uppercase tracking-wider border shrink-0 ${
            isTrack2 
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm shadow-amber-500/20' 
              : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
          }`}>
            {isTrack2 ? 'TRACK 2 // FLAGSHIP TIER-1' : 'TRACK 1 // LEAN RAPID-SALE'}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">
            {isTrack2 ? 'SCADA / Deep Tech' : 'Turnkey Template'}
          </span>
        </div>

        {/* Pricing Tier Grid */}
        {isTrack2 ? (
          <div className="space-y-1.5 pt-1 border-t border-amber-500/20 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 text-[11px]">Commercial License:</span>
              <span className="text-amber-300 font-bold font-mono">$1,500 – $3,500 USD</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 text-[11px]">Buyout Anchor:</span>
              <span className="text-amber-400 font-black font-mono">$14,500 USD</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] text-amber-200/70 border-t border-amber-500/15 pt-1">
              <span>Buyout Range:</span>
              <span className="font-mono">$10,000 – $18,000 USD</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 pt-1 border-t border-emerald-500/20 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 text-[11px]">Retail License:</span>
              <span className="text-emerald-300 font-bold font-mono">$199 USD</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 text-[11px]">Multi-Seat Team Pass:</span>
              <span className="text-cyan-300 font-bold font-mono">$599 USD</span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] text-emerald-200/80 border-t border-emerald-500/15 pt-1">
              <span>Exclusive Buyout Floor:</span>
              <span className="font-mono font-bold text-emerald-400">$3,800 – $6,500 ($4,500 Anchor)</span>
            </div>
          </div>
        )}
      </div>

      {/* Architecture specs */}
      <div className="flex items-center justify-between text-xs text-slate-300 font-bold px-1">
        <span className="flex items-center gap-1.5" title="Includes Postgres schema with row-level-security pattern">
          <Database size={13} className="text-cyan-400" />
          <span>Postgres RLS Pattern</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Activity size={13} className="text-emerald-400" />
          <span className="text-emerald-400 font-black">Demo online</span>
        </span>
      </div>

      {/* DATA NOTES DETAILS DRAWER */}
      <details className="text-xs bg-black/60 rounded-xl border border-white/10 p-3 group">
        <summary className="font-bold text-slate-300 cursor-pointer flex items-center justify-between text-xs uppercase tracking-wider select-none">
          <span className="flex items-center gap-1.5 text-amber-400"><AlertTriangle size={13} /><span>Data notes</span></span>
          <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-slate-400" />
        </summary>
        <div className="pt-2.5 mt-2.5 border-t border-white/10 space-y-2 text-slate-300">

          <p className="text-[11px] text-slate-300 leading-relaxed">
            <strong className="text-white">Included:</strong> React 19 Frontend Blueprint, Supabase PostgreSQL Schema, Mock Seed Data, Setup Guide, Commercial License.
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-400">Database Engine:</span>
            <span className="text-cyan-400 font-mono font-bold" title="Includes Postgres schema with row-level-security pattern">Postgres Schema with RLS Pattern</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-mono font-bold">Reference design</span>
          </div>
          {product.tables && product.tables.length > 0 && (
            <div className="text-[10px] text-slate-400 font-mono bg-black/80 p-2 rounded border border-white/5 overflow-x-auto">
              <span className="text-slate-300 font-bold block mb-1">Database Tables ({product.tables.length}):</span>
              {product.tables.join(', ')}
            </div>
          )}
        </div>
      </details>

      {/* UNIFIED PRIMARY ACTION BUTTON */}
      <div className="pt-2">
        <a
          href={product.preview_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-emerald-500/25 active:scale-95"
        >
          <ExternalLink size={16} />
          <span>[VIEW DEMO]</span>
        </a>
      </div>
    </div>
  );
};
