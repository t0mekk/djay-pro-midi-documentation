#!/usr/bin/env node
// Regenerates the action catalog embedded in tool/index.html from the function tables in REFERENCE.md.
// Run: node tool/build-actions.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const lines = readFileSync(join(here, '..', 'REFERENCE.md'), 'utf8').split('\n');

// Which physical control an action expects, guessed from its name.
function kindOf(keyPath) {
  const leaf = keyPath.split('.').pop();
  if (/(Rotary|Move|Relative)$/.test(leaf) || leaf === 'scrubbing') return 'encoder';
  if (/^(speed|pitch|gain|filter|highEQ|midEQ|lowEQ|crossfade|videoCrossfade|masterLevel|monitorLevel|monitorMix|volume|stopDelay|transition)$/.test(leaf)) return 'knob';
  if (/(lineVolume\d|WetDryValue|ParameterValue|Volume|VolumeEQ)$/.test(leaf)) return 'knob';
  return 'button';
}

// "a.b[1-3]c" -> ["a.b1c", "a.b2c", "a.b3c"]; no range -> [path]
function expand(path) {
  const m = path.match(/\[(\d+)-(\d+)\]/);
  if (!m) return [[path, '']];
  const out = [];
  for (let i = +m[1]; i <= +m[2]; i++) {
    for (const [p, n] of expand(path.replace(m[0], String(i)))) out.push([p, ` ${i}${n}`]);
  }
  return out;
}

const actions = [];
const seen = new Set();
let group = '';
let inFunctions = false;

for (const line of lines) {
  const h = line.match(/^(#{2,4})\s+(.*)$/);
  if (h) {
    if (h[1] === '##') inFunctions = /Functions Reference/.test(h[2]);
    else group = h[2].replace(/ Functions$/, '').trim();
    continue;
  }
  if (!inFunctions || !line.startsWith('|')) continue;
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 4 || !cells[1].includes('`')) continue;

  const [name, pathCell, desc, led] = cells;
  const paths = [...pathCell.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const names = paths.length > 1 && name.split('/').length === paths.length ? name.split('/').map((s) => s.trim()) : null;

  paths.forEach((raw, i) => {
    // "`application.gain` / `filter`" - later items inherit the first item's prefix
    const full = raw.includes('.') ? raw : paths[0].replace(/[^.]+$/, raw);
    for (const [keyPath, suffix] of expand(full)) {
      if (seen.has(keyPath)) continue;
      seen.add(keyPath);
      const leaf = keyPath.split('.').pop();
      const label = names ? names[i] : paths.length > 1 ? leaf : name;
      actions.push({
        k: keyPath,                      // {N} = deck placeholder
        n: (/\d+-\d+/.test(label) && suffix ? label.replace(/\d+-\d+/, suffix.trim()) : label + suffix).trim(),
        g: group,
        d: desc,
        led: led.includes('✅') ? 1 : 0,
        t: kindOf(keyPath),
      });
    }
  });
}

const page = join(here, 'index.html');
const html = readFileSync(page, 'utf8');
const marker = /\/\*ACTIONS-START\*\/[\s\S]*?\/\*ACTIONS-END\*\//;
if (!marker.test(html)) throw new Error('ACTIONS markers not found in index.html');
writeFileSync(page, html.replace(marker, () => `/*ACTIONS-START*/${JSON.stringify(actions)}/*ACTIONS-END*/`));
console.log(`${actions.length} actions in ${new Set(actions.map((a) => a.g)).size} groups`);
