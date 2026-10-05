import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { researchEntries, researchIndex, researchSlugs, evidenceLabel } from '../src/lib/research.ts';
import { evidenceContext, studyReadingDetails } from '../src/lib/research-reading.ts';
import { catalogChecked, indexedPublicationCount, researchCatalogs, pubmedId } from '../src/lib/research-catalog.ts';
import { publicationCategories, publicationNotice } from '../src/lib/research-catalog-format.ts';
import { sourceExcerpts, studyRecord } from '../src/lib/research-study.ts';

// Run after npm run build: node --import tsx scripts/check-research.mjs
// Audits the relevance-selected bibliography, explained studies, and static exports.
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
const library = readFileSync('out/science.html', 'utf8');
const keys = new Set();
assert.equal(researchSlugs.length, 8);
const excerptSnapshot = JSON.parse(readFileSync('src/lib/research-source-excerpts.json', 'utf8'));
assert.equal(excerptSnapshot.checked, catalogChecked, 'Excerpts and bibliography source dates match');
const rawRecords = existsSync('data/full-literature-records.json') ? JSON.parse(readFileSync('data/full-literature-records.json', 'utf8')) : null;
let readers = 0;
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
  assert.equal(catalog.count + catalog.excludedCount, catalog.searchCount, `${slug}: raw search and selection counts reconcile`);
  assert.ok(catalog.query.includes('[Date - Publication]'), `${slug}: date-bounded search`);
  assert.ok(catalog.count >= papers.length, `${slug}: selected explanations retained`);
  assert.ok(page.includes('Why included:'), `${slug}: inclusion reasons displayed`);
  assert.ok(page.includes('selected collection, not all research'), `${slug}: honest selection scope`);
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
    assert.ok(['title', 'reviewed-source'].includes(publication.relevance?.basis), `${slug}/${publication.id}: relevance basis`);
    assert.ok(publication.relevance.reason.trim(), `${slug}/${publication.id}: inclusion reason`);
    assert.ok(!['42757290', '42752426', '34546033', '33263328', '37180036', '42041438'].includes(publication.id), `${slug}: general policy and non-biomedical applications excluded`);
    const reader = studyRecord(slug, publication.id);
    assert.ok(reader, `${slug}/${publication.id}: reader data`);
    const readerPage = readFileSync(`out/science/${slug}/${publication.id}.html`, 'utf8');
    readers += 1;
    for (const field of ['title', 'authors', 'journal']) assert.ok(readerPage.includes(escape(publication[field])), `${slug}/${publication.id}: reader ${field}`);
    assert.ok(readerPage.includes(`href="/science/${slug}"`), `${slug}/${publication.id}: return to collection`);
    assert.ok(readerPage.includes(`href="https://pubmed.ncbi.nlm.nih.gov/${publication.id}/${publication.hasAbstract ? '#abstract' : ''}"`), `${slug}/${publication.id}: complete source reachable`);
    assert.ok(readerPage.includes(escape(publication.relevance.reason)), `${slug}/${publication.id}: reader inclusion reason`);
    const notice = publicationNotice(publication);
    if (notice) assert.ok(readerPage.includes(escape(notice)), `${slug}/${publication.id}: reader publication notice`);
    if (reader.entry) {
      for (const field of ['finding', 'limitation', 'model']) assert.ok(readerPage.includes(escape(reader.entry[field])), `${slug}/${publication.id}: reader ${field}`);
      for (const field of ['design', 'measures', 'context']) assert.ok(readerPage.includes(escape(reader.reading[field])), `${slug}/${publication.id}: reader ${field}`);
    } else if (reader.excerpt) {
      assert.ok(readerPage.includes(escape(reader.excerpt.text)), `${slug}/${publication.id}: attributed reader excerpt`);
      if (reader.excerpt.truncated) assert.ok(readerPage.includes('shortened quotation'), `${slug}/${publication.id}: shortened quotation clearly labeled`);
      assert.ok(readerPage.includes('brief excerpt cannot capture'), `${slug}/${publication.id}: excerpt scope`);
    } else {
      assert.ok(readerPage.includes('does not provide enough information to summarize'), `${slug}/${publication.id}: missing source is not invented`);
    }
    if (publication.types.includes('Retraction Notice') || publication.types.includes('Retracted Publication')) {
      assert.equal(publication.category, 'other', `${slug}/${publication.id}: separate retractions`);
      assert.ok(publicationNotice(publication), `${slug}/${publication.id}: label retractions`);
    }
  }
  console.log(`${slug}: ${catalog.count}/${catalog.searchCount} publications included, ${papers.length} explanations retained, static sources verified`);
}
assert.ok(researchIndex.every((entry) => !('finding' in entry) && !('limitation' in entry)), 'Full notes must stay off the client index');
for (const id of ['21564053', '28905366']) {
  const publication = researchCatalogs['mt-2'].papers.find((paper) => paper.id === id);
  assert.ok(publication.types.includes('Letter') && publication.types.includes('Case Reports'));
  assert.equal(publication.category, 'case-report', `${id}: mixed letter/case-report remains discoverable`);
}
for (const [slug, ids] of Object.entries({
  'bpc-157': ['42328738', '32334036', '30116973'],
  'retatrutide': ['42559975', '40735804', '39019866'],
  'tb-500': ['11311052', '24098025', '33620224'],
  'mt-2': ['23121206', '24355990', '24771717', '33460908', '35196505', '9050812'],
  'epitalon': ['25535022'],
  'ghk-cu': ['37107176'],
})) {
  for (const id of ids) assert.ok(researchCatalogs[slug].papers.some(paper => paper.id === id), `${slug}/${id}: direct analytical, safety, or negative findings retained`);
}
for (const id of ['22977870', '35107253', '31982792', '25420772']) assert.ok(!researchCatalogs.pinealon.papers.some(paper => paper.id === id), `${id}: unrelated longer sequences excluded`);
assert.ok(!researchCatalogs['ghk-cu'].papers.some(paper => paper.id === '33192260'), 'Free-GHK experiment is not GHK-Cu evidence');
console.log(`Verified ${researchEntries.length} citations across ${researchSlugs.length} exported compound pages.`);
console.log(`Verified expanded methods and measurement notes for ${Object.keys(studyReadingDetails).length} papers.`);
assert.equal(Object.keys(studyReadingDetails).length, researchEntries.length, 'Every selected paper has a full explanation');
console.log(`Verified ${indexedPublicationCount} compound-focused publication entries, with no full abstracts republished.`);
const selectedIds = new Set(Object.values(researchCatalogs).flatMap(catalog => catalog.papers.map(paper => paper.id)));
for (const [id, excerpt] of Object.entries(sourceExcerpts)) {
  assert.ok(selectedIds.has(id), `${id}: excerpt only for a relevant publication`);
  assert.ok(excerpt.text.trim() && excerpt.text.split(/\s+/).length <= 25, `${id}: short source quotation`);
  assert.ok(['abstract', 'conclusion'].includes(excerpt.kind), `${id}: excerpt kind`);
  assert.ok(excerpt.kind !== 'conclusion' || /\b(conclusions?|interpretation)\b/i.test(excerpt.section), `${id}: conclusion label requires an explicit source heading`);
  if (rawRecords) {
    const sections = rawRecords[id].abstract.filter(section => section.text.trim());
    assert.ok(sections.some(section => section.text.split(/\s+/).join(' ').includes(excerpt.text)), `${id}: exact source attribution`);
    const hash = createHash('sha256').update(sections.map(section => `${section.label ?? ''}:${section.text}`).join('\n')).digest('hex');
    assert.equal(excerpt.sourceHash, hash, `${id}: source fingerprint`);
  }
}
assert.equal(readers, indexedPublicationCount, 'Every selected publication has an exported reading page');
assert.equal(studyRecord('bpc-157', '42757290'), null, 'Excluded publications do not gain reader pages');
assert.equal(studyRecord('unknown-compound', '37366315'), null, 'Unknown collections have no reader');
assert.equal(studyRecord('pinealon', '37366315'), null, 'Wrong-collection PMID has no reader');
console.log(`Verified ${readers} individual reading pages and ${Object.keys(sourceExcerpts).length} attributed short excerpts${rawRecords ? ', compared with cached source abstracts' : ''}.`);
