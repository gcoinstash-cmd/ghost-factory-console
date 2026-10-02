import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { CATALOG_DATA } from '../src/catalogData.ts';

const REQUIRED_TEXT = "NOT CERTIFIED FOR OPERATIONAL, REGULATORY, OR LIFE-CRITICAL USE";

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

  for (const product of products) {
    const markup = renderToStaticMarkup(React.createElement(BlueprintCard, { product }));
    if (!markup.includes(REQUIRED_TEXT)) {
      console.error(`❌ [FAILURE] Card Slot #${product.id} (${product.name}) lacks required operational disclaimer!`);
      failed++;
    } else {
      passed++;
    }
  }

  await server.close();

  if (failed > 0 || passed !== total) {
    console.error(`❌ [AUDIT FAILED] Only ${passed}/${total} cards render disclaimer. Expected ${total}/${total}.`);
    process.exit(1);
  }

  console.log(`✅ [AUDIT PASSED] ${passed}/${total} cards render disclaimer`);
  process.exit(0);
} catch (error) {
  await server.close();
  console.error("❌ [AUDIT ERROR] Exception during disclaimer assertion:", error);
  process.exit(1);
}
