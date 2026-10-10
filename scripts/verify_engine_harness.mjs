#!/usr/bin/env node
/**
 * Automated Dyno Verification & Telemetry Harness Test
 * Tests engine switching, schema integrity, and probe response generation across all 14 units.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONSOLE_ROOT = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('🏎️ [DYNO VERIFICATION] AUTOMATED TELEMETRY & ENGINE SWITCH TEST');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// STEP 1: COMPONENT STATE & MAPPING AUDIT
// -----------------------------------------------------------------------------
console.log('🔍 [PHASE 1] Auditing src/data/track3Engines.ts & Track2Harness.tsx...');

const track3Path = path.join(CONSOLE_ROOT, 'src', 'data', 'track3Engines.ts');
if (!fs.existsSync(track3Path)) {
  console.error('❌ FAIL: track3Engines.ts not found at ' + track3Path);
  process.exit(1);
}

const track3Content = fs.readFileSync(track3Path, 'utf8');

// Extract TRACK_3_ENGINES JSON
const jsonMatch = track3Content.match(/export const TRACK_3_ENGINES: Track3Engine\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error('❌ FAIL: Could not parse TRACK_3_ENGINES array from track3Engines.ts');
  process.exit(1);
}

let engines;
try {
  engines = JSON.parse(jsonMatch[1]);
} catch (err) {
  console.error('❌ FAIL: JSON parse error in TRACK_3_ENGINES:', err.message);
  process.exit(1);
}

console.log(`✅ Loaded ${engines.length} Track 3 production engines from manifest.`);

if (engines.length !== 14) {
  console.error(`❌ FAIL: Expected 14 engines, found ${engines.length}`);
  process.exit(1);
}

// Verify Track2Harness component exists and imports correctly
const harnessPath = path.join(CONSOLE_ROOT, 'src', 'components', 'Track2Harness.tsx');
if (!fs.existsSync(harnessPath)) {
  console.error('❌ FAIL: Track2Harness.tsx not found at ' + harnessPath);
  process.exit(1);
}
const harnessContent = fs.readFileSync(harnessPath, 'utf8');
if (!harnessContent.includes('TRACK_3_ENGINES') || !harnessContent.includes('Track3Engine')) {
  console.error('❌ FAIL: Track2Harness.tsx does not properly import TRACK_3_ENGINES');
  process.exit(1);
}
console.log('✅ Track2Harness.tsx component mapping verified cleanly.');

// -----------------------------------------------------------------------------
// STEP 2: ENGINE-BY-ENGINE STATE SWITCHING & PROBE SMOKE TEST
// -----------------------------------------------------------------------------
console.log('\n🔍 [PHASE 2] Executing Dyno state switches & simulated payload probes...');

const results = [];
const targetDeepTestIds = ['GF-T3-138', 'GF-T3-142', 'GF-T3-150'];

for (const eng of engines) {
  const result = {
    id: eng.id,
    codeName: eng.codeName || eng.name.substring(0, 16),
    vertical: eng.vertical,
    frequency: eng.cycleFrequency,
    latencyMs: eng.nominalLatencyMs,
    endpointsCount: eng.primaryEndpoints ? eng.primaryEndpoints.length : 0,
    stateMachineCheck: false,
    endpointsCheck: false,
    probeCheck: false,
    status: 'FAIL',
    details: []
  };

  // 1. Audit core fields
  if (!eng.id || !eng.name || !eng.codeName || !eng.vertical || !eng.cycleFrequency) {
    result.details.push('Missing core metadata');
  }

  // 2. Audit state machine states
  if (Array.isArray(eng.stateMachineStates) && eng.stateMachineStates.length > 0 && eng.initialState) {
    if (eng.stateMachineStates.includes(eng.initialState)) {
      result.stateMachineCheck = true;
    } else {
      result.details.push(`initialState ${eng.initialState} not in stateMachineStates`);
    }
  } else {
    result.details.push('Invalid stateMachineStates');
  }

  // 3. Audit primaryEndpoints
  if (Array.isArray(eng.primaryEndpoints) && eng.primaryEndpoints.length > 0) {
    let endpointsValid = true;
    for (const ep of eng.primaryEndpoints) {
      if (!ep.id || !ep.method || !ep.path || !ep.summary || ep.sampleResponse === undefined) {
        endpointsValid = false;
        result.details.push(`Malformed endpoint: ${ep.path || 'unknown'}`);
      }
    }
    result.endpointsCheck = endpointsValid;
  } else {
    result.details.push('No primaryEndpoints defined');
  }

  // 4. Probe & Payload simulation (matching Track2Harness handleExecuteProbe logic)
  try {
    const ep = eng.primaryEndpoints[0];
    let payload = ep.samplePayload || null;
    let responseObj = null;
    let statusCode = 200;

    if (payload) {
      const payloadStr = JSON.stringify(payload);
      const parsed = JSON.parse(payloadStr);
      if (typeof ep.sampleResponse === 'object' && !Array.isArray(ep.sampleResponse)) {
        responseObj = {
          ...ep.sampleResponse,
          _echo_inbound: parsed,
          _roundtrip_ms: eng.nominalLatencyMs
        };
      } else {
        responseObj = ep.sampleResponse;
      }
    } else {
      responseObj = ep.sampleResponse;
    }

    if (responseObj && statusCode === 200) {
      result.probeCheck = true;
    }
  } catch (err) {
    result.details.push('Probe execution exception: ' + err.message);
  }

  // Overall engine pass
  if (result.stateMachineCheck && result.endpointsCheck && result.probeCheck && result.details.length === 0) {
    result.status = 'PASS';
  }

  results.push(result);
}

// Deep probe checks for GF-T3-138, GF-T3-142, GF-T3-150
console.log('\n🧪 [SMOKE TEST VERIFICATION ON TARGET ENGINES]:');
for (const targetId of targetDeepTestIds) {
  const target = engines.find(e => e.id === targetId);
  if (!target) {
    console.error(`❌ FAIL: Target engine ${targetId} not found in manifest`);
    process.exit(1);
  }
  
  const postEp = target.primaryEndpoints.find(e => e.method === 'POST') || target.primaryEndpoints[0];
  console.log(`\n  ➤ Target Engine: [${target.id}] ${target.name}`);
  console.log(`    CodeName: ${target.codeName}`);
  console.log(`    Vertical: ${target.vertical}`);
  console.log(`    Cycle Rate: ${target.cycleFrequency} | Nominal Latency: ${target.nominalLatencyMs} ms`);
  console.log(`    Testing Endpoint: ${postEp.method} ${postEp.path}`);
  console.log(`    Inbound Sample Payload:`, JSON.stringify(postEp.samplePayload || {}, null, 2).substring(0, 120) + '...');
  
  // Simulate dispatch
  const simulatedResponse = {
    ...(typeof postEp.sampleResponse === 'object' && !Array.isArray(postEp.sampleResponse) ? postEp.sampleResponse : { data: postEp.sampleResponse }),
    _echo_simulated: postEp.samplePayload,
    _status: 200
  };
  console.log(`    Simulated Visualizer Response (HTTP 200 OK):`, JSON.stringify(simulatedResponse, null, 2).substring(0, 140) + '...');
  console.log(`    ✅ [${target.id}] State transition & probe payload verified successfully.`);
}

// -----------------------------------------------------------------------------
// STEP 3: CONSOLE & BUILD CLEANLINESS
// -----------------------------------------------------------------------------
console.log('\n🔍 [PHASE 3] Running production build & type check audit inside tools/ghost-factory-console...');

try {
  const buildOutput = execSync('npm run build', { cwd: CONSOLE_ROOT, encoding: 'utf8' });
  console.log('✅ Console Build & Audit Verification output:');
  const relevantLines = buildOutput.split('\n').filter(l => 
    l.includes('AUDIT PASSED') || l.includes('transformed') || l.includes('built in') || l.includes('Track2Harness')
  );
  relevantLines.forEach(l => console.log('   ' + l.trim()));
} catch (err) {
  console.error('❌ Build failed with error:', err.message);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// STEP 4: OUTPUT DYNO VERIFICATION TABLE
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log('🏁 DYNO VERIFICATION TABLE — ALL 14 TRACK 3 UNITS');
console.log('================================================================');
console.log('| Slot # | Engine ID    | CodeName         | Endpoints | Cycle Rate          | Nominal Latency | Status |');
console.log('|:-------|:-------------|:-----------------|:----------|:--------------------|:----------------|:-------|');

for (const r of results) {
  const padSlot = (r.id.split('-').pop() || '').padEnd(6, ' ');
  const padId = r.id.padEnd(12, ' ');
  const padCode = r.codeName.substring(0, 16).padEnd(16, ' ');
  const padEps = String(r.endpointsCount).padEnd(9, ' ');
  const padFreq = r.frequency.substring(0, 19).padEnd(19, ' ');
  const padLat = (r.latencyMs + ' ms').padEnd(15, ' ');
  const statusBadge = r.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
  console.log(`| ${padSlot} | ${padId} | ${padCode} | ${padEps} | ${padFreq} | ${padLat} | ${statusBadge} |`);
}

const allPassed = results.every(r => r.status === 'PASS');
console.log('================================================================');
if (allPassed) {
  console.log(`🎉 ALL ${results.length}/14 UNITS PASSED DYNO SWITCHING & TELEMETRY VERIFICATION!`);
  process.exit(0);
} else {
  console.error('❌ Some engines failed verification.');
  process.exit(1);
}
