#!/usr/bin/env node
/**
 * validate-content.mjs
 *
 * Validates all MDX/MD content files in src/content/ against their expected
 * frontmatter schemas and naming conventions. Exits with a non-zero code when
 * any violation is found so it can be used as a CI gate.
 *
 * Usage: node scripts/validate-content.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'src/content');

// ---------------------------------------------------------------------------
// Minimal frontmatter parser (avoids a runtime dependency on gray-matter here)
// ---------------------------------------------------------------------------

/**
 * Splits a raw file into { data: Record<string, unknown>, body: string }.
 * Only handles the simple YAML subset used in this repo's frontmatter.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!match) return { data: {}, body: raw };

  const yamlBlock = match[1];
  const body = raw.slice(match[0].length);

  const data = {};
  let currentKey = null;
  let currentArray = null;

  for (const line of yamlBlock.split('\n')) {
    // Array continuation
    if (currentArray !== null) {
      const itemMatch = line.match(/^  - (.+)$/);
      if (itemMatch) {
        currentArray.push(itemMatch[1].trim().replace(/^["']|["']$/g, ''));
        continue;
      } else {
        data[currentKey] = currentArray;
        currentArray = null;
        currentKey = null;
      }
    }

    // Inline array: tags: [foo, bar]
    const inlineArrayMatch = line.match(/^(\w[\w-]*):\s*\[(.*)]\s*$/);
    if (inlineArrayMatch) {
      data[inlineArrayMatch[1]] = inlineArrayMatch[2]
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      continue;
    }

    // Block array start
    const blockArrayMatch = line.match(/^(\w[\w-]*):\s*$/);
    if (blockArrayMatch) {
      currentKey = blockArrayMatch[1];
      currentArray = [];
      continue;
    }

    // Key-value
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const raw = kvMatch[2].trim().replace(/^["']|["']$/g, '');
      if (raw === 'true') data[key] = true;
      else if (raw === 'false') data[key] = false;
      else if (!isNaN(Number(raw)) && raw !== '') data[key] = Number(raw);
      else data[key] = raw;
    }
  }

  // Flush trailing array
  if (currentArray !== null && currentKey !== null) {
    data[currentKey] = currentArray;
  }

  return { data, body };
}

// ---------------------------------------------------------------------------
// Schema definitions (mirrors src/lib/content.ts)
// ---------------------------------------------------------------------------

/**
 * Each schema entry: { field, type, required, values? }
 * type: 'string' | 'date' | 'boolean' | 'number' | 'url' | 'string[]' | 'enum'
 */
const BLOG_SCHEMA = [
  { field: 'title', type: 'string', required: true },
  { field: 'description', type: 'string', required: true },
  { field: 'pubDate', type: 'date', required: true },
  { field: 'author', type: 'string', required: true },
  { field: 'tags', type: 'string[]', required: true },
  { field: 'image', type: 'string', required: false },
  { field: 'draft', type: 'boolean', required: false },
];

const LIBRARY_SCHEMA = [
  { field: 'title', type: 'string', required: true },
  { field: 'description', type: 'string', required: true },
  { field: 'pubDate', type: 'date', required: false },
  { field: 'author', type: 'string', required: false },
  { field: 'tags', type: 'string[]', required: true },
  { field: 'seoTitle', type: 'string', required: false },
  { field: 'seoDescription', type: 'string', required: false },
  { field: 'seoImage', type: 'string', required: false },
  { field: 'draft', type: 'boolean', required: false },
];

const PROJECTS_SCHEMA = [
  { field: 'title', type: 'string', required: true },
  { field: 'summary', type: 'string', required: true },
  { field: 'repoUrl', type: 'url', required: true },
  {
    field: 'status',
    type: 'enum',
    required: true,
    values: ['active', 'alpha', 'beta', 'stable', 'planned', 'paused', 'research', 'archived'],
  },
  { field: 'order', type: 'number', required: true },
];

const FEATURES_SCHEMA = [
  { field: 'title', type: 'string', required: true },
  { field: 'summary', type: 'string', required: true },
  { field: 'eyebrow', type: 'string', required: true },
  { field: 'order', type: 'number', required: true },
];

const FAQ_SCHEMA = [
  { field: 'question', type: 'string', required: true },
  { field: 'answer', type: 'string', required: true },
  { field: 'order', type: 'number', required: true },
];

// ---------------------------------------------------------------------------
// File naming conventions per collection
// ---------------------------------------------------------------------------

const COLLECTIONS = [
  {
    name: 'blog',
    schema: BLOG_SCHEMA,
    // Blog files must be named YYYY-MM-DD-slug.md(x)
    filenamePattern: /^\d{4}-\d{2}-\d{2}-.+\.mdx?$/,
    filenameHint: 'YYYY-MM-DD-slug.md(x)',
  },
  {
    name: 'library',
    schema: LIBRARY_SCHEMA,
    // Library: lowercase, hyphenated slug
    filenamePattern: /^[a-z0-9][a-z0-9-]*\.mdx?$/,
    filenameHint: 'lowercase-slug.md(x)',
  },
  {
    name: 'projects',
    schema: PROJECTS_SCHEMA,
    filenamePattern: /^[a-z0-9][a-z0-9-]*\.mdx?$/,
    filenameHint: 'lowercase-slug.md(x)',
  },
  {
    name: 'features',
    schema: FEATURES_SCHEMA,
    filenamePattern: /^[a-z0-9][a-z0-9-]*\.mdx?$/,
    filenameHint: 'lowercase-slug.md(x)',
  },
  {
    name: 'faq',
    schema: FAQ_SCHEMA,
    filenamePattern: /^[a-z0-9][a-z0-9-]*\.mdx?$/,
    filenameHint: 'lowercase-slug.md(x)',
  },
];

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T.*)?$/;
const URL_RE = /^https?:\/\/.+/;

function validateField(field, type, value, values) {
  if (value === undefined || value === null || value === '') return null; // handled by required check

  switch (type) {
    case 'string':
      if (typeof value !== 'string') return `expected a string, got ${typeof value}`;
      if (value.trim() === '') return 'must not be blank';
      break;
    case 'date': {
      const asStr = String(value);
      if (!ISO_DATE_RE.test(asStr) && isNaN(Date.parse(asStr)))
        return `expected a date (YYYY-MM-DD), got "${value}"`;
      break;
    }
    case 'boolean':
      if (typeof value !== 'boolean') return `expected true or false, got "${value}"`;
      break;
    case 'number':
      if (typeof value !== 'number') return `expected a number, got "${value}"`;
      break;
    case 'url':
      if (typeof value !== 'string' || !URL_RE.test(value))
        return `expected a URL starting with http(s)://, got "${value}"`;
      break;
    case 'string[]':
      if (!Array.isArray(value)) return `expected an array of strings, got ${typeof value}`;
      for (const item of value) {
        if (typeof item !== 'string') return `array items must be strings, found ${typeof item}`;
      }
      break;
    case 'enum':
      if (!values.includes(String(value)))
        return `"${value}" is not one of: ${values.join(', ')}`;
      break;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Description length check (SEO best practice per CONTRIBUTING-CONTENT.md)
// ---------------------------------------------------------------------------

const DESCRIPTION_MAX = 160;

// ---------------------------------------------------------------------------
// Main validation loop
// ---------------------------------------------------------------------------

let totalErrors = 0;
let totalFiles = 0;
let totalWarnings = 0;

/** @param {string} rel Relative file path from repo root, for display */
function reportError(rel, message) {
  console.error(`  ✗ ${message}`);
  totalErrors += 1;
}

function reportWarning(rel, message) {
  console.warn(`  ⚠ ${message}`);
  totalWarnings += 1;
}

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_DIR, collection.name);

  if (!fs.existsSync(dir)) {
    // Collection directory is optional — skip silently
    continue;
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .sort();

  if (files.length === 0) continue;

  console.log(`\n📁 ${collection.name}/ (${files.length} file${files.length === 1 ? '' : 's'})`);

  for (const file of files) {
    totalFiles += 1;
    const rel = path.join('src/content', collection.name, file);
    const hasErrors = [];

    // ── Filename convention ──────────────────────────────────────────────────
    if (!collection.filenamePattern.test(file)) {
      console.log(`  ${file}`);
      reportError(rel, `filename should match ${collection.filenameHint}`);
      hasErrors.push(true);
    }

    // ── Parse frontmatter ────────────────────────────────────────────────────
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');

    if (!raw.trimStart().startsWith('---')) {
      if (!hasErrors.length) console.log(`  ${file}`);
      reportError(rel, 'missing YAML frontmatter block (file must start with ---)');
      continue;
    }

    const { data, body } = parseFrontmatter(raw);
    let printedFile = hasErrors.length > 0;

    const printFile = () => {
      if (!printedFile) {
        console.log(`  ${file}`);
        printedFile = true;
      }
    };

    // ── Required / type checks ───────────────────────────────────────────────
    for (const rule of collection.schema) {
      const value = data[rule.field];
      const missing = value === undefined || value === null || value === '';

      if (rule.required && missing) {
        printFile();
        reportError(rel, `missing required frontmatter field: "${rule.field}"`);
        continue;
      }

      if (!missing) {
        const err = validateField(rule.field, rule.type, value, rule.values);
        if (err) {
          printFile();
          reportError(rel, `frontmatter field "${rule.field}": ${err}`);
        }
      }
    }

    // ── Warnings ─────────────────────────────────────────────────────────────

    // description length (SEO)
    if (typeof data.description === 'string' && data.description.length > DESCRIPTION_MAX) {
      printFile();
      reportWarning(
        rel,
        `description is ${data.description.length} chars — keep it under ${DESCRIPTION_MAX} for SEO`
      );
    }

    // blog posts: warn if draft is not explicitly set
    if (collection.name === 'blog' && data.draft === undefined) {
      printFile();
      reportWarning(rel, 'draft field is not set — defaults to false (will be published)');
    }

    // empty body
    if (!body || body.trim().length === 0) {
      printFile();
      reportWarning(rel, 'content body is empty');
    }

    if (printedFile === false) {
      // No issues — print a clean checkmark
      console.log(`  ✓ ${file}`);
    } else if (hasErrors.length === 0 && totalErrors === 0 && totalWarnings === 0) {
      // Was printed due to a warning only
    }
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log('\n' + '─'.repeat(60));
console.log(
  `Validated ${totalFiles} file${totalFiles === 1 ? '' : 's'} across ${
    COLLECTIONS.filter((c) => fs.existsSync(path.join(CONTENT_DIR, c.name))).length
  } collection${COLLECTIONS.length === 1 ? '' : 's'}`
);

if (totalWarnings > 0) {
  console.warn(`${totalWarnings} warning${totalWarnings === 1 ? '' : 's'}`);
}

if (totalErrors > 0) {
  console.error(`\n❌ ${totalErrors} error${totalErrors === 1 ? '' : 's'} found — fix before merging.\n`);
  process.exit(1);
} else {
  console.log('\n✅ All content files passed validation.\n');
}
