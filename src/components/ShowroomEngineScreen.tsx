import React, { useState } from 'react';
import { 
  Compass, 
  ExternalLink, 
  Check, 
  Copy, 
  ChevronRight,
  Info,
  AlertTriangle
} from 'lucide-react';
import { ProductItem } from '../catalogData';
import { isRegulatedSector, VERTICAL_COMPLIANCE_DISCLAIMER } from '../utils/compliance';
import { LICENSE_MATRIX, getBlueprintPricing, LicenseType } from '../data/licenseMatrix';

interface ShowroomEngineScreenProps {
  products: ProductItem[];
  onOpenTestDrive: (product: ProductItem) => void;
}

export const ShowroomEngineScreen: React.FC<ShowroomEngineScreenProps> = ({
  products,
  onOpenTestDrive
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(products[0] || {} as ProductItem);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('standard');
  const [copiedLink, setCopiedLink] = useState(false);

  const isTrack2 = selectedProduct && (selectedProduct.id >= 86 || selectedProduct.flagship_qualified || selectedProduct.pricing_track?.includes('Track 2'));
  const pricing = getBlueprintPricing(selectedProduct);

  const licenseTiers: Record<LicenseType, { 
    name: string; 
    price: string; 
    term: string; 
    scope: string;
    eligible: boolean;
  }> = {
    standard: { 
      name: `${LICENSE_MATRIX.standard.name} (${LICENSE_MATRIX.standard.exclusivity})`, 
      price: pricing.standardPrice, 
      term: `${LICENSE_MATRIX.standard.term} — ${LICENSE_MATRIX.standard.rights}`, 
      scope: isTrack2 
        ? 'Full Tier-1 SCADA source blueprint, physics solver, Postgres schema, and operator console with unlimited end-client use.' 
        : 'Complete React 19 source, PostgreSQL schema, seed data, and unlimited end-client deployment rights.',
      eligible: true,
    },
    pro: { 
      name: `${LICENSE_MATRIX.pro.name} (${LICENSE_MATRIX.pro.exclusivity})`, 
      price: pricing.proPrice, 
      term: `${LICENSE_MATRIX.pro.term} — ${LICENSE_MATRIX.pro.rights}`, 
      scope: 'Multi-seat engineering agency pass with private updates, schema migrations, and technical release notes.',
      eligible: true,
    },
    exclusive_buyout: { 
      name: `${LICENSE_MATRIX.exclusive_buyout.name} (${LICENSE_MATRIX.exclusive_buyout.exclusivity})`, 
      price: pricing.isBuyoutEligible ? (pricing.buyoutAnchor || '$14,500 USD') : 'N/A (Vault Retained)', 
      term: pricing.isBuyoutEligible 
        ? `${LICENSE_MATRIX.exclusive_buyout.term} — ${LICENSE_MATRIX.exclusive_buyout.description}`
        : 'Permanent Vault Asset — Exclusivity buyout unavailable (80% floor)', 
      scope: pricing.isBuyoutEligible 
        ? 'Removes asset from sale. Asset Purchase Agreement (APA) exclusive ownership transfer for single asset (strictly excludes factory core).'
        : 'Permanent factory vault asset retained under the immutable 80% portfolio shield. Not available for buyout.',
      eligible: pricing.isBuyoutEligible,
    },
  };

  const currentTier = licenseTiers[selectedLicense] || licenseTiers.standard;

  const handleCopyListingLink = () => {
    navigator.clipboard.writeText(selectedProduct.gumroad_url || 'https://auraandgrid.gumroad.com');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* INSTITUTIONAL SHOWROOM HEADER (No Gamer Metaphors - Win B) */}
      <section className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-zinc-700/60 rounded-2xl p-7 sm:p-9 text-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-700/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 rounded-lg text-xs font-mono font-semibold text-zinc-300 uppercase tracking-widest">
              <Compass size={13} className="text-white" /> WIN B // AURA & GRID™ DEALERSHIP SHOWROOM
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Institutional Digital Dealership
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Public commercial storefront bridge. Source-code licenses, managed sandbox leases, and selective non-core asset transactions. Zero video-game styling; strictly institutional presentation.
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-700/80 p-5 rounded-xl text-xs space-y-1.5 font-mono">
            <div className="flex justify-between items-center gap-6">
              <span className="text-zinc-400 uppercase text-[10px]">Standard Retail MSRP:</span>
              <strong className="text-emerald-400 text-sm">$199 USD</strong>
            </div>
            <div className="flex justify-between items-center gap-6">
              <span className="text-zinc-400 uppercase text-[10px]">Commercial Team Seat:</span>
              <strong className="text-cyan-400 text-sm">$599 USD</strong>
            </div>
            <div className="flex justify-between items-center gap-6">
              <span className="text-zinc-400 uppercase text-[10px]">Hosted Managed Lease:</span>
              <strong className="text-amber-400 text-sm">$450/mo</strong>
            </div>
          </div>
        </div>

        {/* STRICT LEGAL TRUTH DISCLOSURE BANNER (Mandatory Compliance) */}
        <div className="mt-6 pt-5 border-t border-zinc-800 flex items-start gap-3 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-400 leading-relaxed font-mono">
          <Info size={18} className="text-zinc-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-zinc-200 block uppercase tracking-wider text-[11px] mb-0.5">
              Public Legal Disclosure & Product Truth Notice
            </strong>
            All products displayed in Aura & Grid are hosted interactive concept prototypes and deployable source-code blueprints built with simulated sample data. Commercial purchase grants a non-exclusive license to use, adapt, and deploy the code; it does not transfer corporate ownership, patents, or copyright to GhostFactoryOS proprietary frameworks or shared UI component libraries. Customer-configured deployment required for production use.
          </div>
        </div>
      </section>

      {/* DEALERSHIP SHOWROOM INTERFACE: SPEC SHEET & TEST DRIVE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inventory Selector (List of 85 Products) */}
        <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-2 pb-2 border-b border-zinc-800">
            <span className="font-bold uppercase tracking-wider">Showroom Catalog</span>
            <span>{products.length} Models</span>
          </div>

          <div className="space-y-1.5 max-h-[260px] sm:max-h-[380px] lg:max-h-[550px] overflow-y-auto overscroll-contain pr-1 touch-pan-y">
            {products.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-zinc-800 border-white/40 text-white shadow-lg'
                      : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        MODEL #{p.id.toString().padStart(3, '0')}
                      </span>
                      {isRegulatedSector(p) && (
                        <span className="text-[8px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-1 py-0.2 rounded uppercase">
                          DISCLAIMER
                        </span>
                      )}
                    </div>
                    <p className="font-bold">{p.name}</p>
                    <p className="text-[10px] text-zinc-400 line-clamp-1">{p.category}</p>
                  </div>
                  <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-zinc-600'} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Spec Sheet & Commercial Offering */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Spec Sheet Header */}
          <div className="border-b border-zinc-800 pb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    SPECIFICATION SHEET // MODEL #{selectedProduct.id?.toString().padStart(3, '0')}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${isTrack2 ? 'text-amber-400 bg-amber-950/40 border-amber-500/40 font-bold' : 'text-emerald-400 bg-emerald-950/30 border-emerald-500/30'}`}>
                    {isTrack2 ? 'TRACK 2 FLAGSHIP TIER-1 ($14.5k ANCHOR)' : 'TRACK 1 COMMERCIAL READY ($199 MSRP)'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedProduct.name}
                </h2>
                
                {/* High-Contrast Universal Truth Pill Badge */}
                <div className="mt-1.5 mb-1.5 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs font-mono uppercase tracking-wider shadow-md shadow-amber-400/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    [SIMULATED DATA PROTOTYPE]
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {selectedProduct.category}
                </p>
              </div>

              <button
                onClick={() => onOpenTestDrive(selectedProduct)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 font-mono shrink-0"
              >
                <ExternalLink size={14} />
                <span>TEST DRIVE DEMO</span>
              </button>
            </div>

            {/* Universal Product Truth & Regulatory Compliance Disclaimer */}
            <div className="mt-4 bg-amber-950/40 border border-amber-500/50 rounded-xl p-3.5 flex items-start gap-2.5 text-xs font-mono text-amber-200">
              <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <strong className="text-amber-300 block uppercase tracking-wider text-[10px] mb-0.5">
                  PRODUCT TRUTH & REGULATORY DISCLAIMER:
                </strong>
                {selectedProduct.disclaimer || (isRegulatedSector(selectedProduct) ? VERTICAL_COMPLIANCE_DISCLAIMER : "SIMULATED DATA PROTOTYPE — FOR CONCEPT DEMO ONLY — NOT PRODUCTION OR ADVICE")}
              </div>
            </div>
          </div>

          {/* License Tier Selector */}
          <div className="space-y-3 font-mono">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
              Select Commercial License Structure
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {(['standard', 'pro', 'exclusive_buyout'] as const).map((tierKey) => {
                const tier = licenseTiers[tierKey];
                const active = selectedLicense === tierKey;
                const isEligible = tier.eligible;
                return (
                  <div
                    key={tierKey}
                    onClick={() => {
                      if (isEligible) {
                        setSelectedLicense(tierKey);
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      !isEligible
                        ? 'bg-zinc-950/40 border-zinc-900 text-zinc-600 opacity-60 cursor-not-allowed'
                        : active
                        ? 'bg-zinc-800 border-emerald-400 text-white shadow-md cursor-pointer'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold">{LICENSE_MATRIX[tierKey].name}</span>
                        {!isEligible && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30 font-bold">
                            PERMANENT
                          </span>
                        )}
                      </div>
                      <span className="text-base font-black text-white mt-1 block">
                        {tier.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 block line-clamp-1">{tier.term}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active License Terms Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase">{currentTier.name}</span>
              <strong className="text-emerald-400 text-base">
                {currentTier.price}
              </strong>
            </div>
            <p className="text-zinc-400 leading-relaxed text-xs">
              <strong className="text-zinc-200">Scope of Rights:</strong> {currentTier.scope}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyListingLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer border border-zinc-700"
                >
                  {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedLink ? 'COPIED LISTING LINK' : 'COPY CHECKOUT URL'}</span>
                </button>
              </div>

              <a
                href={selectedProduct.gumroad_url || 'https://auraandgrid.gumroad.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <span>ACQUIRE LICENSE</span>
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold text-zinc-400 uppercase tracking-widest block">
              Technical Specifications & Architecture
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">Frontend Stack</span>
                <span className="text-white font-bold text-xs mt-0.5 block">React 19 + Tailwind</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">Relational Schema</span>
                <span className="text-white font-bold text-xs mt-0.5 block">Postgres + Seed SQL</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">Access Model</span>
                <span className="text-white font-bold text-xs mt-0.5 block">Postgres Schema with RLS Pattern</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">Deployment</span>
                <span className="text-emerald-400 font-bold text-xs mt-0.5 block">Render / Vercel Demo Online</span>
              </div>
            </div>

            {selectedProduct.id === 109 && (
              <div className="mt-3 bg-amber-950/20 border border-amber-500/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-amber-300 font-bold">Flagship Gate #4 Domain Physics:</span>
                  <span className="text-slate-200">Sabatier Bypass Valve (NOMINAL_FLOW / Closed-Loop CO2 Methanation)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold shrink-0">
                  CRITERION #4 PASSED
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
