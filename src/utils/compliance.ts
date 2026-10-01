import { ProductItem } from '../catalogData';

/**
 * Checks whether an asset belongs to a regulated vertical requiring mandatory compliance disclaimers.
 * Regulated verticals: clinical trials, medical, medspa, dental, veterinary, health, wellness,
 * private credit, wealth, commercial debt, litigation finance, aviation, defense, hypersonic,
 * fusion/tokamak, orbital/space, and deep SCADA systems.
 */
export const isRegulatedSector = (product: ProductItem): boolean => {
  const v = (product.vertical || '').toLowerCase();
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
  "SIMULATED DATA PROTOTYPE — NOT MEDICAL/LEGAL/FINANCIAL ADVICE — NO COMPLIANCE CERTIFICATION IMPLIED.";
