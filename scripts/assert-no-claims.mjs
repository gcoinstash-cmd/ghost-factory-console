import fs from 'node:fs';
import path from 'node:path';

console.log("🔍 [AUDIT] Running assert-no-claims.mjs validation...");

// Customer-facing components that must never contain live/compliance claims
const CUSTOMER_FACING_FILES = [
  'src/components/BlueprintCard.tsx',
  'src/components/NavigationHeader.tsx',
  'src/components/ShowroomEngineScreen.tsx',
  'src/components/TestDriveModal.tsx',
  'src/components/AuditModal.tsx',
  'src/components/GarageScreen.tsx',
  'src/App.tsx',
];

// Patterns that imply live/certified/compliant status as claims about a blueprint
const FORBIDDEN_CLAIM_PATTERNS = [
  { name: '200 OK', regex: /200\s*OK/i },
  { name: 'Live (Standalone)', regex: /\bLive\b/i },
  { name: 'Truth & Compliance', regex: /truth\s*&\s*compliance/i },
  { name: 'Compliant', regex: /\bcompliant\b/i },
  { name: 'Verified', regex: /\bverified\b/i },
  // Certified when NOT preceded by "NOT " (disclaimers like "NOT CERTIFIED" are required and permitted)
  { name: 'Certified (Claim)', regex: /(?<!NOT\s+)\bcertified\b/i }
];

let totalViolations = 0;

for (const relPath of CUSTOMER_FACING_FILES) {
  const fullPath = path.resolve(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Warning: ${relPath} not found.`);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Skip pure comment lines if desired, or check all lines in customer-facing code
    for (const { name, regex } of FORBIDDEN_CLAIM_PATTERNS) {
      if (regex.test(line)) {
        console.error(`❌ [CLAIM VIOLATION] ${relPath}:${idx + 1} contains "${name}": "${line.trim()}"`);
        totalViolations++;
      }
    }
  });
}

if (totalViolations > 0) {
  console.error(`\n❌ [CLAIM AUDIT FAILED] Found ${totalViolations} forbidden claim word(s) in customer-facing components.`);
  process.exit(1);
}

console.log("✅ [CLAIM AUDIT PASSED] 0 forbidden claim words found in customer-facing components!");
process.exit(0);
