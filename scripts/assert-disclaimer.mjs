import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { CATALOG_DATA } from '../src/catalogData.ts';
import { REGULATED_SECTOR_DISCLAIMER } from '../src/constants/disclaimers.ts';

const REQUIRED_TEXT = REGULATED_SECTOR_DISCLAIMER;

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

  for (const product of products) {
    const markup = renderToStaticMarkup(React.createElement(BlueprintCard, { product }));
    if (!markup.includes(REQUIRED_TEXT)) {
      console.error(`❌ [FAILURE] Card Slot #${product.id} (${product.name}) lacks required operational disclaimer!`);
      failed++;
    } else {
      passed++;
      const domain = product.domain || '';
      const vertical = product.vertical || '';
      if (
        domain.includes('SCADA') ||
        domain.includes('Clinical') ||
        domain.includes('Capital') ||
        domain.includes('Mobility') ||
        vertical === 'aerospace' ||
        vertical === 'clinical' ||
        vertical === 'legal' ||
        vertical === 'wealth'
      ) {
        regulatedPassed++;
      }
    }
  }

  await server.close();

  if (failed > 0 || passed !== total) {
    console.error(`❌ [AUDIT FAILED] Only ${passed}/${total} cards render disclaimer. Expected ${total}/${total}.`);
    process.exit(1);
  }

  console.log(`✅ [AUDIT PASSED] ${passed}/${total} cards render disclaimer (including all ${regulatedPassed} regulated sector blueprints)`);
  process.exit(0);
} catch (error) {
  await server.close();
  console.error("❌ [AUDIT ERROR] Exception during disclaimer assertion:", error);
  process.exit(1);
}
