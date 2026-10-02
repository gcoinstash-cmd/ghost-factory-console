#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to check
const catalogDataPath = path.resolve(__dirname, '../../src/catalogData.ts');
const catalogManifestPath = path.resolve(__dirname, '../../../../CATALOG_MANIFEST.json');

console.log('🔍 [AUDIT] Running assert_best_for.mjs validation...');

// Helper to extract JSON from catalogData.ts
function loadCatalogData() {
  const content = fs.readFileSync(catalogDataPath, 'utf8');
  const start = content.indexOf('export const CATALOG_DATA');
  const braceStart = content.indexOf('{', start);
  const braceEnd = content.lastIndexOf('};');
  const jsonStr = content.slice(braceStart, braceEnd + 1);
  return JSON.parse(jsonStr);
}

// Helper to load CATALOG_MANIFEST.json
function loadManifest() {
  if (fs.existsSync(catalogManifestPath)) {
    return JSON.parse(fs.readFileSync(catalogManifestPath, 'utf8'));
  }
  return null;
}

const DOMAIN_KEYWORD_MAP = {
  'Performance Athletics & Fitness': ['fitness', 'athletic', 'boxing', 'gym', 'biomechanics', 'recovery', 'athlete', 'sports', 'combat'],
  'Creative & Media Production': ['creative', 'soundstage', 'studio', 'production', 'architecture', 'cordwainer', 'vfx', '3d', 'animation', 'tattoo', 'camera', 'grip', 'motion', 'design', 'atelier', 'leather', 'master planner'],
  'Mobility & Fleet Logistics': ['supercar', 'exotic', 'auto', 'tuning', 'rental', 'repair', 'fleet', 'freight', 'aviation', 'jet', 'cold', 'reefer', 'crane', 'rigging', 'ppf', 'detailing', 'yacht', 'maritime', 'fbo', 'carrier', 'cargo', 'earthmoving', 'plant hire', 'concierge'],
  'Institutional Capital & Wealth': ['private equity', 'capital', 'wealth', 'family office', 'loan', 'debt', 'b2b', 'bitcoin', 'treasury', 'real estate private equity', 'law', 'legal', 'm&a', 'executive', 'board', 'litigation', 'trial', 'watch', 'horology', 'credit', 'trading', 'colocation', 'lp', 'syndicate', 'underwriter', 'consultant'],
  'Lifestyle & Boutique Hospitality': ['coffee', 'roastery', 'estate', 'villa', 'aesthetics', 'medspa', 'barber', 'grooming', 'vineyard', 'wine', 'cellar', 'jazz', 'speakeasy', 'retreat', 'dining', 'omakase', 'fragrance', 'parfumerie', 'restaurant', 'bistro', 'izakaya', 'burger', 'food truck', 'spa', 'hospitality', 'hotel', 'sanctuary', 'tasting', 'chef', 'pizzeria', 'nightclub', 'gastronomy', 'caterer', 'patisserie', 'smokehouse', 'barbecue', 'drive-thru', 'wok', 'banquet', 'catering', 'kitchen'],
  'Trades & Infrastructure': ['hvac', 'chiller', 'roofing', 'drone', 'plumbing', 'hydraulic', 'solar', 'pv', 'electrical', 'switchgear', 'ev', 'contractor', 'installer', 'backflow'],
  'Clinical & Medical Operations': ['pediatric', 'clinic', 'dental', 'dentist', 'veterinary', 'hospital', 'functional medicine', 'longevity', 'physical therapy', 'sports recovery', 'hyperbaric', 'clinical trial', 'cro', 'biopharma', 'contrast therapy', 'iv infusion'],
  'Industrial Robotics & Autonomous SCADA': ['open-pit', 'mining', 'haulage', 'subsea', 'crawler', 'seabed', 'rov', 'trenching', 'cable', 'marine contractor', 'deep-sea'],
  'Energy SCADA': ['fusion', 'tokamak', 'geothermal', 'wellhead', 'microgrid', 'battery', 'bess', 'cleanroom', 'wafer', 'quantum', 'cryostat', 'refrigerator', 'energy operator'],
  'Deep Tech SCADA': ['perimeter', 'drone swarm', 'supersonic', 'aerospike', 'hypersonic', 'wind tunnel', 'satellite', 'laser', 'manifest', 'launch', 'space', 'eclss', 'propellant', 'cryo', 'optical', 'station']
};

function validateProducts(products, sourceName) {
  console.log(`📋 Validating ${products.length} blueprints from ${sourceName}...`);
  let errors = [];

  products.forEach((p, idx) => {
    const id = p.id || (idx + 1);
    const domain = p.domain;
    const bestFor = p.bestFor || p.best_for;

    if (!domain) {
      errors.push(`[${sourceName} Asset #${id}] Missing assigned domain.`);
      return;
    }

    if (!bestFor || typeof bestFor !== 'string' || bestFor.trim().length === 0) {
      errors.push(`[${sourceName} Asset #${id}] Missing or empty bestFor string.`);
      return;
    }

    // Check if bestFor has valid domain correlation
    const allowedKeywords = DOMAIN_KEYWORD_MAP[domain];
    if (!allowedKeywords) {
      errors.push(`[${sourceName} Asset #${id}] Unknown domain: "${domain}".`);
      return;
    }

    const lowerBf = bestFor.toLowerCase();
    const hasKeyword = allowedKeywords.some(kw => lowerBf.includes(kw.toLowerCase()));
    if (!hasKeyword) {
      errors.push(`[${sourceName} Asset #${id}] Domain mismatch! Domain="${domain}", bestFor="${bestFor}" (expected keyword matching domain).`);
    }
  });

  return errors;
}

try {
  const catalogData = loadCatalogData();
  const catalogErrors = validateProducts(catalogData.products, 'catalogData.ts');

  let manifestErrors = [];
  const manifest = loadManifest();
  if (manifest && manifest.products) {
    manifestErrors = validateProducts(manifest.products, 'CATALOG_MANIFEST.json');
  }

  const allErrors = [...catalogErrors, ...manifestErrors];

  if (allErrors.length > 0) {
    console.error(`❌ [AUDIT FAILED] Found ${allErrors.length} taxonomy errors:`);
    allErrors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✅ [AUDIT PASSED] 100% of blueprints have verified bestFor strings matching their assigned domains!');
  process.exit(0);
} catch (err) {
  console.error('❌ [AUDIT CRASH]', err);
  process.exit(1);
}
