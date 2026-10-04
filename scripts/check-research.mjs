import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { researchEntries, researchIndex, researchSlugs, evidenceLabel } from '../src/lib/research.ts';
import { evidenceContext, studyReadingDetails } from '../src/lib/research-reading.ts';

// Run after npm run build: node --import tsx scripts/check-research.mjs
// Audits the curated dataset and its actual static exports, without live fetching.
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
const library = readFileSync('out/science.html', 'utf8');
const keys = new Set();
assert.equal(researchSlugs.length, 8);
for (const entry of researchEntries) {
  const key = `${entry.slug}:${entry.sourceId}`;
  assert.ok(!keys.has(key), `Duplicate citation: ${key}`);
  keys.add(key);
  for (const field of ['compound', 'area', 'model', 'focus', 'finding', 'limitation', 'authors', 'journal', 'sourceId']) {
    assert.ok(typeof entry[field] === 'string' && entry[field].trim(), `${key}: missing ${field}`);
    assert.ok(!entry[field].includes('??'), `${key}: corrupted ${field}`);
  }
  assert.ok(Number.isInteger(entry.year) && entry.year >= 1900 && entry.year <= 2026, `${key}: year`);
  assert.ok(['human', 'preclinical'].includes(entry.evidence), `${key}: evidence`);
  const url = new URL(entry.source);
  assert.ok(['pubmed.ncbi.nlm.nih.gov', 'pmc.ncbi.nlm.nih.gov'].includes(url.hostname), `${key}: primary source`);
  const identifier = entry.sourceId.split(' ')[1];
  assert.ok(url.pathname.includes(identifier), `${key}: source identifier mismatch`);
  if (entry.slug === 'tb-500') assert.equal(entry.related, true, `${key}: label related thymosin evidence`);
  const page = readFileSync(`out/science/${entry.slug}.html`, 'utf8');
  for (const field of ['finding', 'limitation', 'model', 'authors', 'journal', 'sourceId']) {
    assert.ok(page.includes(escape(entry[field])), `${key}: exported ${field}`);
  }
  assert.ok(page.includes(escape(evidenceLabel(entry))), `${key}: exported classification`);
  assert.ok(page.includes(escape(evidenceContext(entry))), `${key}: evidence explanation`);
  assert.ok(page.includes(`href="${entry.source}"`), `${key}: source link`);
}
for (const [sourceId, notes] of Object.entries(studyReadingDetails)) {
  const entry = researchEntries.find((paper) => paper.sourceId === sourceId);
  assert.ok(entry, `${sourceId}: reading notes need a matching citation`);
  const page = readFileSync(`out/science/${entry.slug}.html`, 'utf8');
  for (const [field, value] of Object.entries(notes)) {
    assert.ok(typeof value === 'string' && value.trim(), `${sourceId}: empty ${field}`);
    assert.ok(page.includes(escape(value)), `${sourceId}: exported ${field}`);
  }
}
for (const slug of researchSlugs) {
  const papers = researchEntries.filter((entry) => entry.slug === slug);
  const page = readFileSync(`out/science/${slug}.html`, 'utf8');
  assert.equal((page.match(/<details id="study-/g) ?? []).length, papers.length, `${slug}: disclosure count`);
  assert.ok(library.includes(`href="/science/${slug}"`), `${slug}: library link`);
  const product = readFileSync(`out/products/${slug}.html`, 'utf8');
  assert.ok(product.includes(`href="/science/${slug}"`), `${slug}: product link`);
  assert.ok(page.includes('href="/science"'), `${slug}: return link`);
  console.log(`${slug}: ${papers.length} papers, static notes and source links verified`);
}
assert.ok(researchIndex.every((entry) => !('finding' in entry) && !('limitation' in entry)), 'Full notes must stay off the client index');
console.log(`Verified ${researchEntries.length} citations across ${researchSlugs.length} exported compound pages.`);
console.log(`Verified expanded methods and measurement notes for ${Object.keys(studyReadingDetails).length} papers.`);
