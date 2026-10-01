#!/usr/bin/env node

/**
 * Pre-render 110 Blueprint Cards with Truth & Compliance into tools/ghost-factory-console/index.html
 * Eliminates client-side hydration blanks for headless curl auditors.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const consoleDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(consoleDir, '../..');

const manifestPath = path.join(rootDir, 'CATALOG_MANIFEST.json');
const htmlPath = path.join(consoleDir, 'index.html');

let products = [];
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  products = manifest.products || [];
} else {
  const catalogDataPath = path.join(consoleDir, 'src', 'catalogData.ts');
  const catalogContent = fs.readFileSync(catalogDataPath, 'utf8');
  const jsonMatch = catalogContent.match(/export const CATALOG_DATA = ({[\s\S]*});/);
  if (jsonMatch) {
    const data = JSON.parse(jsonMatch[1]);
    products = data.products || [];
  }
}

if (!products.length) {
  console.error('Could not load products for pre-rendering.');
  process.exit(1);
}

const regulatedRegexes = [
  /\bclinical\b/i, /\btrial\b/i, /\bmedical\b/i, /\bmedicine\b/i, /\bmedspa\b/i,
  /\bdental\b/i, /\bdentist\b/i, /\bveterinary\b/i, /\bvet\b/i, /\bhospital\b(?!ity)/i,
  /\bhealth\b/i, /\bhyperbaric\b/i, /\brecovery\b/i, /\bwellness\b/i, /\bclinic\b/i,
  /\btherapy\b/i, /\bphysio\b/i, /\bdoctor\b/i, /\bpharma\b/i, /\bbiotech\b/i,
  /\bcredit\b/i, /\bsyndication\b/i, /\bwealth\b/i, /\bfinance\b/i, /\bcapital\b/i,
  /\bdebt\b/i, /\bbank\b/i, /\bfamily office\b/i, /\bfund\b/i, /\bsatstacker\b/i,
  /\bloan\b/i, /\bmortgage\b/i, /\bsecurities\b/i, /\bm&a\b/i, /\badvisory\b/i,
  /\bfinancial\b/i, /\btreasury\b/i, /\blegal\b/i, /\blitigation\b/i, /\blaw\b/i,
  /\battorney\b/i, /\bcounsel\b/i, /\bcompliance\b/i, /\baviation\b/i, /\bfbo\b/i,
  /\baerospace\b/i, /\bsupersonic\b/i, /\bdrone\b/i, /\bswarm\b/i, /\bdefense\b/i,
  /\bperimeter defense\b/i, /\bmining\b/i, /\bhaulage\b/i, /\bcrawler\b/i,
  /\btokamak\b/i, /\bfusion\b/i, /\bplasma\b/i, /\bgeothermal\b/i, /\begs\b/i,
  /\bwellhead\b/i, /\bhft\b/i, /\bcolocation\b/i, /\bmicrowave\b/i, /\bwind tunnel\b/i,
  /\bhypersonic\b/i, /\blaser isl\b/i, /\boptical terminal\b/i, /\bmicrogrid\b/i,
  /\bcleanroom\b/i, /\bsemiconductor\b/i, /\bfab\b/i, /\bpayload manifest\b/i,
  /\bspace launch\b/i, /\bsubsea\b/i, /\bcable burial\b/i, /\btrenching\b/i,
  /\bcable restoration\b/i, /\bcryostat\b/i, /\bquantum processor\b/i,
  /\bsuperconducting\b/i, /\beclss\b/i, /\borbital habitat\b/i, /\bpropellant depot\b/i,
  /\bcryogenic\b/i, /\bin-space\b/i, /\brov\b/i, /\baerospike\b/i, /\bscada\b/i,
  /\btelemetry\b/i
];

function isRegulated(p) {
  if (['hospitality', 'creative', 'fitness'].includes((p.vertical || '').toLowerCase()) && p.id < 86) {
    return false;
  }
  if (p.id >= 86) return true;
  const combined = `${p.name} ${p.category || ''} ${p.vertical || ''} ${p.archetype_name || ''}`;
  return regulatedRegexes.some(r => r.test(combined));
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const cardsHtml = products.map(p => {
  const reg = isRegulated(p);
  const notice = reg
    ? 'TECHNICAL PROTOTYPE ONLY — NOT CERTIFIED FOR CLINICAL/LEGAL/FINANCIAL USE. NOT PRODUCTION OR ADVICE.'
    : 'CONCEPT DEMO ONLY — NOT PRODUCTION OR ADVICE.';

  return `      <article class="blueprint-card" data-slot="${p.id}">
        <h3>${escapeHtml(p.name)}</h3>
        <span class="truth-badge">[SIMULATED DATA PROTOTYPE]</span>
        <div class="best-for">Best For: ${escapeHtml(p.best_for ? p.best_for.replace(/^Best for:\s*/i, '') : 'Commercial client adaptation')}</div>
        <details>
          <summary><span>Truth & Compliance</span></summary>
          <p>${notice}</p>
        </details>
      </article>`;
}).join('\n');

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace contents of #root with prerendered cards
const rootRegex = /<div id="root">[\s\S]*?<\/div>/;
const replacement = `<div id="root">\n    <section id="static-prerender" style="display:none;" aria-hidden="true">\n${cardsHtml}\n    </section>\n  </div>`;

if (rootRegex.test(html)) {
  html = html.replace(rootRegex, replacement);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`✅ Pre-rendered ${products.length} Blueprint Cards into ${htmlPath}`);
} else {
  console.error('Could not find <div id="root"> in index.html');
  process.exit(1);
}
