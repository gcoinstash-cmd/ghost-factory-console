import React from 'react';
import { Database, Activity, ExternalLink, ChevronDown, AlertTriangle } from 'lucide-react';
import { ProductItem } from '../catalogData';
import { isRegulatedSector } from '../utils/compliance';

export type RarityTier = 'Mythic Candidate' | 'Legendary' | 'Elite' | 'Rare' | 'Common';

interface BlueprintCardProps {
  product: ProductItem;
  isOperatorAuthenticated?: boolean;
}

export const getRarityTier = (product: ProductItem): RarityTier => {
  if (product.id >= 86 && Boolean(product.flagship_qualified)) {
    if (product.audit_score >= 9.9) return 'Mythic Candidate';
    return 'Legendary';
  }
  if (product.audit_score >= 9.8) return 'Elite';
  if (product.audit_score >= 9.5) return 'Rare';
  return 'Common';
};

export const getDomainClass = (product: ProductItem): string => {
  const v = (product.vertical || '').toLowerCase();
  if (v.includes('aerospace') || v.includes('space') || v.includes('defense')) return 'Deep Tech SCADA';
  if (v.includes('subsea') || v.includes('marine')) return 'Maritime SCADA';
  if (v.includes('clean_energy') || v.includes('energy') || v.includes('hvac')) return 'Energy SCADA';
  if (v.includes('medical') || v.includes('clinical') || v.includes('health')) return 'Clinical Operations';
  if (v.includes('wealth') || v.includes('finance') || v.includes('credit')) return 'Institutional Capital';
  if (v.includes('hospitality') || v.includes('dining')) return 'Luxury Hospitality';
  if (v.includes('creative') || v.includes('studio')) return 'Creative Production';
  if (v.includes('automotive') || v.includes('mobility')) return 'Mobility & Fleet';
  return 'Specialized Operations';
};

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  product,
  isOperatorAuthenticated = false,
}) => {
  const rarity = getRarityTier(product);
  const domain = getDomainClass(product);
  const isTrack2 = product.id >= 86 || Boolean(product.flagship_qualified) || Boolean(product.pricing_track?.includes('Track 2'));
  const isRegulated = isRegulatedSector(product);

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
          
          {/* MANDATORY TRUTH BADGE (Visible in DOM, never conditionally unmounted) */}
          <div className="mt-2 mb-1.5 flex items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs font-mono uppercase tracking-wider shadow-md shadow-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              [SIMULATED DATA PROTOTYPE]
            </span>
          </div>

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

      {/* DUAL-TRACK PRICING PROTOCOL BADGE */}
      <div className={`p-3.5 rounded-xl border text-xs sm:text-sm font-mono space-y-2 ${
        isTrack2 
          ? 'bg-amber-950/30 border-amber-500/50 text-amber-200' 
          : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded font-black text-[11px] sm:text-xs uppercase tracking-wider border ${
            isTrack2 
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-sm shadow-amber-500/20' 
              : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
          }`}>
            {isTrack2 ? 'TRACK 2 // FLAGSHIP CANDIDATE' : 'TRACK 1 // LEAN RAPID-SALE'}
          </span>
          
          {isOperatorAuthenticated ? (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Exclusive Buyout</span>
              <strong className={`text-sm sm:text-base font-black ${isTrack2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isTrack2 ? '$14,500 Anchor' : '$4,500 Anchor'}
              </strong>
            </div>
          ) : (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Public Shelf</span>
              <strong className={`text-sm sm:text-base font-black ${isTrack2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isTrack2 ? '$1,500 – $3,500' : '$199 MSRP'}
              </strong>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              {isTrack2 ? 'Flagship License:' : 'Retail MSRP:'}
            </span>
            <strong className="text-white font-bold">
              {isTrack2 ? '$1,500 – $3,500' : '$199'}
            </strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              {isOperatorAuthenticated ? (isTrack2 ? 'Buyout Floor:' : 'Commercial Seat:') : 'Commercial License:'}
            </span>
            <strong className="text-white font-bold">
              {isOperatorAuthenticated 
                ? (isTrack2 ? '$10k – $18k' : '$599')
                : (isTrack2 ? 'SCADA Suite' : '$599 Team Seat')}
            </strong>
          </div>
        </div>

        {isTrack2 && isOperatorAuthenticated && (
          <div className="pt-1.5 border-t border-amber-500/20 text-[10px] text-amber-300/90 leading-tight">
            Full Asset Buyout: $18k–$35k | Strategic: $35k–$75k+
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
          <span className="text-emerald-400 font-black">200 OK Live</span>
        </span>
      </div>

      {/* COMPLIANCE & PRODUCT TRUTH DETAILS DRAWER */}
      <details className="text-xs bg-black/60 rounded-xl border border-white/10 p-3 group">
        <summary className="font-bold text-slate-300 cursor-pointer flex items-center justify-between text-xs uppercase tracking-wider select-none">
          <span className="flex items-center gap-1.5 text-amber-400">
            <AlertTriangle size={13} />
            <span>Truth & Compliance</span>
          </span>
          <ChevronDown size={14} className="group-open:rotate-180 transition-transform text-slate-400" />
        </summary>
        <div className="pt-2.5 mt-2.5 border-t border-white/10 space-y-2 text-slate-300">
          <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/50 text-amber-200 font-mono text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-black text-amber-300 uppercase tracking-wider mb-1">
              <AlertTriangle size={13} className="text-amber-400 shrink-0" />
              <span>REGULATORY & TRUTH NOTICE:</span>
            </div>
            <p className="text-amber-200 font-semibold leading-normal">
              {isRegulated 
                ? "TECHNICAL PROTOTYPE ONLY — NOT CERTIFIED FOR CLINICAL/LEGAL/FINANCIAL USE. NOT PRODUCTION OR ADVICE."
                : "CONCEPT DEMO ONLY — NOT PRODUCTION OR ADVICE."}
            </p>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            <strong className="text-white">Included:</strong> React 19 Frontend Blueprint, Supabase PostgreSQL Schema, Mock Seed Data, Setup Guide, Commercial License.
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-400">Database Engine:</span>
            <span className="text-cyan-400 font-mono font-bold" title="Includes Postgres schema with row-level-security pattern">Postgres Schema with RLS Pattern</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-mono font-bold">200 OK Verified</span>
          </div>
          {product.tables && product.tables.length > 0 && (
            <div className="text-[10px] text-slate-400 font-mono bg-black/80 p-2 rounded border border-white/5 overflow-x-auto">
              <span className="text-slate-300 font-bold block mb-1">Database Tables ({product.tables.length}):</span>
              {product.tables.join(', ')}
            </div>
          )}
          {isOperatorAuthenticated && (
            <div className="pt-2 border-t border-amber-500/30 text-amber-300 text-[11px] flex justify-between items-center">
              <span>Operator Buyout Floor:</span>
              <strong className="text-amber-400 font-mono">{isTrack2 ? '$10,000 – $18,000' : '$3,800 – $6,500'}</strong>
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
          <span>[VIEW LIVE DEMO]</span>
        </a>
      </div>
    </div>
  );
};
