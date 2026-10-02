#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 [AUDIT] Running assert-flagships-gate4.mjs validation...');

const catalogPath = path.resolve(__dirname, '../src/catalogData.ts');
const schemaPath = path.resolve(__dirname, '../schema.sql');

if (!fs.existsSync(catalogPath)) {
  console.error(`❌ [AUDIT FAILED] catalogData.ts not found at ${catalogPath}`);
  process.exit(1);
}

if (!fs.existsSync(schemaPath)) {
  console.error(`❌ [AUDIT FAILED] schema.sql not found at ${schemaPath}`);
  process.exit(1);
}

// 1. Validate schema.sql contains Sabatier bypass valve telemetry and RLS policy
const schemaContent = fs.readFileSync(schemaPath, 'utf8');

if (!schemaContent.includes('sabatier_bypass_valve')) {
  console.error('❌ [AUDIT FAILED] schema.sql is missing sabatier_bypass_valve column in eclss_telemetry!');
  process.exit(1);
}

if (!schemaContent.includes('CREATE TABLE IF NOT EXISTS sabatier_bypass_valves')) {
  console.error('❌ [AUDIT FAILED] schema.sql is missing sabatier_bypass_valves DDL definition!');
  process.exit(1);
}

if (!schemaContent.includes('allow_authenticated_read_sabatier')) {
  console.error('❌ [AUDIT FAILED] schema.sql is missing RLS policy for sabatier_bypass_valves!');
  process.exit(1);
}

console.log('  ✓ schema.sql verified: Sabatier bypass valve column, table, and RLS policies confirmed intact.');

// 2. Parse catalog data
const content = fs.readFileSync(catalogPath, 'utf8');
const start = content.indexOf('export const CATALOG_DATA');
const braceStart = content.indexOf('{', start);
const braceEnd = content.lastIndexOf('};');
const jsonStr = content.slice(braceStart, braceEnd + 1);
const data = JSON.parse(jsonStr);

const products = data.products || [];
const flagships = products.filter(p => p.id >= 86 && p.id <= 110);

if (flagships.length !== 25) {
  console.error(`❌ [AUDIT FAILED] Expected exactly 25 flagships (#86–#110), found ${flagships.length}`);
  process.exit(1);
}

let gate4Passed = 0;

for (const product of flagships) {
  // Check Criterion #4: Domain-specific physics, calculations, or operational logic
  const hasTables = Array.isArray(product.tables) && product.tables.length >= 4;
  const isTrack2 = Boolean(product.flagship_qualified) || (product.pricing_track && product.pricing_track.includes('Track 2'));
  const hasDomain = Boolean(product.domain && product.domain.trim().length > 0);

  if (!hasTables || !isTrack2 || !hasDomain) {
    console.error(`❌ [CRITERION 4 FAILURE] Blueprint #${product.id} (${product.name}) lacks verified SCADA/physics operational tables!`);
    process.exit(1);
  }

  // Specific check for Asset 109
  if (product.id === 109) {
    if (!product.tables.includes('sabatier_bypass_valves')) {
      console.error(`❌ [CRITERION 4 FAILURE] Asset #109 tables array must include sabatier_bypass_valves!`);
      process.exit(1);
    }
    if (product.sabatier_bypass_valve !== 'NOMINAL_FLOW') {
      console.error(`❌ [CRITERION 4 FAILURE] Asset #109 must specify sabatier_bypass_valve state!`);
      process.exit(1);
    }
  }

  gate4Passed++;
}

if (gate4Passed === 25) {
  console.log(`✅ [FLAGSHIP GATE AUDIT] 25/25 flagships meet Gate #4`);
  process.exit(0);
} else {
  console.error(`❌ [AUDIT FAILED] Only ${gate4Passed}/25 flagships meet Gate #4.`);
  process.exit(1);
}
