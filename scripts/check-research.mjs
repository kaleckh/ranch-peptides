import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { researchEntries, researchIndex, researchSlugs, evidenceLabel } from '../src/lib/research.ts';
import { evidenceContext, studyReadingDetails } from '../src/lib/research-reading.ts';
import { catalogChecked, indexedPublicationCount, researchCatalogs, pubmedId } from '../src/lib/research-catalog.ts';
import { publicationCategories, publicationNotice } from '../src/lib/research-catalog-format.ts';

// Run after npm run build: node --import tsx scripts/check-research.mjs
// Audits the full bibliography, explained studies, and actual static exports.
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
  const notes = studyReadingDetails[entry.sourceId];
  assert.ok(notes, `${key}: missing study explanation`);
  for (const field of ['design', 'measures', 'context']) assert.ok(notes[field]?.trim(), `${key}: missing ${field}`);
  const publication = researchCatalogs[entry.slug].papers.find((paper) => paper.id === pubmedId(entry.sourceId));
  assert.ok(publication, `${key}: explained paper absent from index`);
  if (publicationNotice(publication)) assert.ok(page.includes(escape(publicationNotice(publication))), `${key}: missing publication notice`);
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
  const catalog = researchCatalogs[slug];
  assert.equal(catalog.count, catalog.papers.length, `${slug}: catalog count`);
  assert.ok(catalog.query.includes('[Date - Publication]'), `${slug}: date-bounded search`);
  assert.ok(catalog.count >= papers.length, `${slug}: complete expanded catalog`);
  const ids = new Set();
  for (const publication of catalog.papers) {
    assert.ok(/^\d+$/.test(publication.id) && !ids.has(publication.id), `${slug}: unique PMID ${publication.id}`);
    ids.add(publication.id);
    for (const field of ['title', 'authors', 'journal']) assert.ok(publication[field]?.trim(), `${slug}/${publication.id}: missing ${field}`);
    // Online-first publications can precede their journal-issue year.
    assert.ok(Number.isInteger(publication.year) && publication.year >= 1900 && publication.year <= Number(catalogChecked.slice(0, 4)) + 1, `${slug}/${publication.id}: journal year`);
    assert.ok(publication.category in publicationCategories, `${slug}/${publication.id}: publication type`);
    assert.ok(Array.isArray(publication.types) && Array.isArray(publication.topics) && Array.isArray(publication.notices), `${slug}/${publication.id}: indexing metadata`);
    assert.ok(!('abstract' in publication), `${slug}/${publication.id}: full abstracts must not be republished`);
    if (publication.types.includes('Retraction Notice') || publication.types.includes('Retracted Publication')) {
      assert.equal(publication.category, 'other', `${slug}/${publication.id}: separate retractions`);
      assert.ok(publicationNotice(publication), `${slug}/${publication.id}: label retractions`);
    }
  }
  console.log(`${slug}: ${catalog.count} indexed publications, ${papers.length} complete explanations, static sources verified`);
}
assert.ok(researchIndex.every((entry) => !('finding' in entry) && !('limitation' in entry)), 'Full notes must stay off the client index');
for (const id of ['21564053', '28905366']) {
  const publication = researchCatalogs['mt-2'].papers.find((paper) => paper.id === id);
  assert.ok(publication.types.includes('Letter') && publication.types.includes('Case Reports'));
  assert.equal(publication.category, 'case-report', `${id}: mixed letter/case-report remains discoverable`);
}
console.log(`Verified ${researchEntries.length} citations across ${researchSlugs.length} exported compound pages.`);
console.log(`Verified expanded methods and measurement notes for ${Object.keys(studyReadingDetails).length} papers.`);
assert.equal(Object.keys(studyReadingDetails).length, researchEntries.length, 'Every selected paper has a full explanation');
console.log(`Verified ${indexedPublicationCount} complete compound/publication matches, with no full abstracts republished.`);
