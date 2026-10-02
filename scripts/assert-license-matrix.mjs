#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 [AUDIT] Running assert-license-matrix.mjs validation...');

const catalogPath = path.resolve(__dirname, '../src/catalogData.ts');
const content = fs.readFileSync(catalogPath, 'utf8');

const start = content.indexOf('export const CATALOG_DATA');
const braceStart = content.indexOf('{', start);
const braceEnd = content.lastIndexOf('};');
const jsonStr = content.slice(braceStart, braceEnd + 1);
const data = JSON.parse(jsonStr);

const products = data.products || [];
const total = products.length;

if (total !== 114) {
  console.error(`❌ [AUDIT FAILED] Expected 114 blueprints, found ${total}`);
  process.exit(1);
}

let violations = 0;
let consistentCount = 0;

for (const product of products) {
  if (typeof product.buyoutEligible !== 'boolean') {
    console.error(`❌ [AUDIT ERROR] Blueprint #${product.id} (${product.name}) lacks boolean buyoutEligible property!`);
    violations++;
    continue;
  }

  // Assertion: No blueprint may have both buyoutEligible=false and a buyout price
  if (product.buyoutEligible === false) {
    if (
      product.exclusive_buyout_anchor !== undefined ||
      product.exclusive_buyout_range !== undefined ||
      product.full_asset_buyout_range !== undefined ||
      product.strategic_acquisition_range !== undefined
    ) {
      console.error(
        `❌ [AUDIT VIOLATION] Blueprint #${product.id} (${product.name}) has buyoutEligible=false BUT contains a buyout price!`
      );
      violations++;
      continue;
    }
  }

  // Consistency check: Buyout eligible blueprints must carry a valid buyout anchor
  if (product.buyoutEligible === true) {
    if (!product.exclusive_buyout_anchor && (!product.exclusive_buyout_range || product.exclusive_buyout_range.length === 0)) {
      console.error(
        `❌ [AUDIT VIOLATION] Blueprint #${product.id} (${product.name}) has buyoutEligible=true BUT lacks buyout price anchor!`
      );
      violations++;
      continue;
    }
  }

  consistentCount++;
}

if (violations > 0 || consistentCount !== total) {
  console.error(`❌ [AUDIT FAILED] Found ${violations} licensing violations across ${total} blueprints.`);
  process.exit(1);
}

console.log(`✅ [LICENSE AUDIT PASSED] ${consistentCount}/${total} license-consistent`);
process.exit(0);
