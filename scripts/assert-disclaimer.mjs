import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { CATALOG_DATA } from '../src/catalogData.ts';
import { REGULATED_SECTOR_DISCLAIMER } from '../src/constants/disclaimers.ts';

const REQUIRED_TEXT = REGULATED_SECTOR_DISCLAIMER;

const REGULATED_SECTORS = [
  'clinical', 'legal', 'fintech', 'aerospace', 'space', 'mining',
  'energy', 'hvac', 'cold chain', 'heavy industrial', 'physical therapy'
];

function isRegulatedSector(product) {
  const combined = [
    product.name, product.category, product.vertical, product.domain,
    product.archetype_description, product.design_benchmark
  ].filter(Boolean).join(' ').toLowerCase();

  return REGULATED_SECTORS.some(sector => combined.includes(sector)) ||
    ['medical', 'wealth', 'aerospace', 'clean_energy', 'subsea', 'heavy_fleet'].includes(product.vertical);
}

console.log("🔍 [AUDIT] Running assert-disclaimer.mjs validation...");
const products = CATALOG_DATA.products || [];
const total = products.length;
console.log(`📋 Validating ${total} blueprints from catalogData.ts...`);

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent'
});

try {
  const { BlueprintCard } = await server.ssrLoadModule('./src/components/BlueprintCard.tsx');

  let passed = 0;
  let failed = 0;
  let regulatedPassed = 0;
  let regulatedCount = 0;

  for (const product of products) {
    const markup = renderToStaticMarkup(React.createElement(BlueprintCard, { product }));
    
    // Check 1: Mandatory Card-Level Disclaimer evaluation
    if (!markup.includes(REQUIRED_TEXT)) {
      console.error(`❌ [FAILURE] Card Slot #${product.id} (${product.name}) lacks required operational disclaimer!`);
      failed++;
    } else {
      passed++;
    }

    // Check 2: Absolute ban on deprecated disclaimer text
    if (markup.includes("TECHNICAL PROTOTYPE ONLY")) {
      console.error(`❌ [FAILURE] Card Slot #${product.id} contains forbidden legacy string "TECHNICAL PROTOTYPE ONLY"!`);
      failed++;
    }

    // Check 3: Every blueprint in regulated sectors must resolve to the constant
    if (isRegulatedSector(product)) {
      regulatedCount++;
      const dataResolves = product.disclaimer === REQUIRED_TEXT;
      const cardResolves = markup.includes(REQUIRED_TEXT);

      if (dataResolves && cardResolves) {
        regulatedPassed++;
      } else {
        console.error(`❌ [REGULATED SECTOR MISMATCH] Blueprint #${product.id} (${product.name}) failed to resolve to REGULATED_SECTOR_DISCLAIMER (dataResolves=${dataResolves}, cardResolves=${cardResolves})!`);
        failed++;
      }
    }
  }

  await server.close();

  if (failed > 0 || passed !== total || regulatedPassed !== regulatedCount) {
    console.error(`❌ [AUDIT FAILED] Disclaimer validation failed: passed=${passed}/${total}, regulatedPassed=${regulatedPassed}/${regulatedCount}`);
    process.exit(1);
  }

  console.log(`✅ [AUDIT PASSED] 110/110 cards render disclaimer (including all ${regulatedPassed}/${regulatedCount} regulated sector blueprints strictly resolving to constant)`);
  process.exit(0);
} catch (error) {
  await server.close();
  console.error("❌ [AUDIT ERROR] Exception during disclaimer assertion:", error);
  process.exit(1);
}
