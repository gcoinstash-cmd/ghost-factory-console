import { ProductItem } from '../catalogData';

/**
 * Canonical list of 60 high-scrutiny / regulated assets requiring mandatory compliance disclaimers.
 * Reconciles 35 Track 1 high-scrutiny prototypes + all 25 Track 2 Flagship SCADA prototypes (#86–#110).
 */
export const REGULATED_ASSET_IDS = new Set<number>([
  5, 8, 10, 14, 17, 24, 27, 30, 31, 32, 33, 34, 35, 41, 43, 47, 49, 53, 54, 55,
  57, 58, 61, 62, 63, 65, 66, 67, 68, 69, 70, 73, 80, 82, 84, 86, 87, 88, 89,
  90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
  107, 108, 109, 110, 111, 113, 114
]);

/**
 * Checks whether an asset belongs to a regulated vertical requiring mandatory compliance disclaimers.
 * Regulated verticals: clinical trials, medical, medspa, dental, veterinary, health, wellness,
 * private credit, wealth, commercial debt, litigation finance, aviation, defense, hypersonic,
 * fusion/tokamak, orbital/space, and deep SCADA systems.
 */
export const isRegulatedSector = (product: ProductItem): boolean => {
  if (REGULATED_ASSET_IDS.has(product.id)) {
    return true;
  }
  if (product.id >= 86 && product.id !== 112) return true;

  const domain = product.domain || '';
  // Explicitly cover all 5 required regulated sectors:
  // 1. Clinical (Clinical & Medical Operations)
  // 2. Legal / 3. Financial & Fintech (Institutional Capital & Wealth)
  // 4. Aviation & Aerospace (Deep Tech SCADA)
  // 5. Heavy-Industrial & SCADA (Industrial Robotics & Autonomous SCADA, Energy SCADA)
  if ([
    'Clinical & Medical Operations',
    'Institutional Capital & Wealth',
    'Deep Tech SCADA',
    'Energy SCADA',
    'Industrial Robotics & Autonomous SCADA'
  ].includes(domain)) {
    return true;
  }

  const v = (product.vertical || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  // Check specific legal or aviation assets
  if (
    cat.includes('law') || name.includes('law') ||
    cat.includes('litigation') || name.includes('litigation') ||
    cat.includes('aviation') || name.includes('aviation') ||
    cat.includes('charter') || name.includes('fbo') ||
    cat.includes('scada') || name.includes('scada')
  ) {
    return true;
  }

  if (['hospitality', 'creative', 'fitness'].includes(v) && product.id < 86) {
    return false;
  }

  const combined = `${product.name} ${product.category || ''} ${product.vertical || ''} ${product.archetype_name || ''}`;

  const regulatedRegexes = [
    /\bclinical\b/i,
    /\btrial\b/i,
    /\bmedical\b/i,
    /\bmedicine\b/i,
    /\bmedspa\b/i,
    /\bdental\b/i,
    /\bdentist\b/i,
    /\bveterinary\b/i,
    /\bvet\b/i,
    /\bhospital\b(?!ity)/i, // Matches hospital but explicitly NOT hospitality
    /\bhealth\b/i,
    /\bhyperbaric\b/i,
    /\brecovery\b/i,
    /\bwellness\b/i,
    /\bclinic\b/i,
    /\btherapy\b/i,
    /\bphysio\b/i,
    /\bdoctor\b/i,
    /\bpharma\b/i,
    /\bbiotech\b/i,
    /\bcredit\b/i,
    /\bsyndication\b/i,
    /\bwealth\b/i,
    /\bfinance\b/i,
    /\bcapital\b/i,
    /\bdebt\b/i,
    /\bbank\b/i,
    /\bfamily office\b/i,
    /\bfund\b/i,
    /\bsatstacker\b/i,
    /\bloan\b/i,
    /\bmortgage\b/i,
    /\bsecurities\b/i,
    /\bm&a\b/i,
    /\badvisory\b/i,
    /\bfinancial\b/i,
    /\btreasury\b/i,
    /\blegal\b/i,
    /\blitigation\b/i,
    /\blaw\b/i,
    /\battorney\b/i,
    /\bcounsel\b/i,
    /\bcompliance\b/i,
    /\baviation\b/i,
    /\bfbo\b/i,
    /\baerospace\b/i,
    /\bsupersonic\b/i,
    /\bdrone\b/i,
    /\bswarm\b/i,
    /\bdefense\b/i,
    /\bspace\b/i,
    /\borbital\b/i,
    /\bsatellite\b/i,
    /\bmilitary\b/i,
    /\bperimeter\b/i,
    /\bairliner\b/i,
    /\btokamak\b/i,
    /\bfusion\b/i,
    /\bsubsea\b/i,
    /\bcrawler\b/i,
    /\bbathymetric\b/i,
    /\bquantum\b/i,
    /\bcryostat\b/i,
    /\bscada\b/i,
    /\bcryo\b/i,
    /\bcryogenic\b/i,
    /\bpropellant\b/i,
    /\bcleanroom\b/i,
    /\bsemiconductor\b/i,
    /\bgeothermal\b/i,
    /\bwellhead\b/i,
    /\bhft\b/i,
    /\bmicrowave telemetry\b/i,
    /\bwind tunnel\b/i,
    /\baerodynamics\b/i
  ];

  return regulatedRegexes.some(r => r.test(combined));
};

export const VERTICAL_COMPLIANCE_DISCLAIMER = 
  "SIMULATED DATA PROTOTYPE — NOT CERTIFIED FOR OPERATIONAL, REGULATORY, OR LIFE-CRITICAL USE";
