import { ProductItem } from '../catalogData';

/**
 * Checks whether an asset belongs to a regulated vertical requiring mandatory compliance disclaimers.
 * Regulated verticals: clinical trials, medical, medspa, dental, veterinary, health, private credit,
 * wealth, commercial debt, litigation finance, aviation, defense, hypersonic, fusion/tokamak, orbital/space.
 */
export const isRegulatedSector = (product: ProductItem): boolean => {
  const combined = `${product.name} ${product.category} ${product.vertical || ''} ${product.archetype_name || ''}`.toLowerCase();
  
  const regulatedKeywords = [
    'clinical',
    'trial',
    'medical',
    'medspa',
    'dental',
    'veterinary',
    'hospital',
    'health',
    'recovery',
    'credit',
    'syndication',
    'wealth',
    'finance',
    'capital',
    'debt',
    'bank',
    'family office',
    'legal',
    'litigation',
    'law',
    'aviation',
    'fbo',
    'aerospace',
    'supersonic',
    'drone',
    'defense',
    'space',
    'orbital',
    'tokamak',
    'fusion',
    'subsea',
    'quantum',
    'scada',
    'cryo',
    'cryogenic',
    'propellant',
    'cleanroom',
    'semiconductor',
    'geothermal',
    'hft'
  ];

  return regulatedKeywords.some(keyword => combined.includes(keyword));
};

export const VERTICAL_COMPLIANCE_DISCLAIMER = 
  "SIMULATED DATA PROTOTYPE — NOT MEDICAL/LEGAL/FINANCIAL ADVICE — NO COMPLIANCE CERTIFICATION IMPLIED.";
