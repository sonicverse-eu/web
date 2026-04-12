/**
 * Validates all MDX files in src/content/:
 *   1. Frontmatter — required fields per collection
 *   2. MDX syntax — compiled via @mdx-js/mdx to catch parse errors early
 */

import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'src', 'content');

/** Required frontmatter fields per collection, with expected JS typeof. */
const SCHEMAS = {
  blog: {
    title: 'string',
    description: 'string',
    pubDate: 'string',
    author: 'string',
    tags: 'array',
    draft: 'boolean',
  },
};

async function findMdxFiles(dir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(full)));
    } else if (entry.isFile() && extname(entry.name) === '.mdx') {
      files.push(full);
    }
  }
  return files;
}

async function validateFile(filePath) {
  const errors = [];

  let raw;
  try {
    raw = await readFile(filePath, 'utf-8');
  } catch (err) {
    return [`Could not read file: ${err.message}`];
  }

  // --- Frontmatter ---
  let frontmatter;
  try {
    ({ data: frontmatter } = matter(raw));
  } catch (err) {
    errors.push(`Frontmatter parse error: ${err.message}`);
    return errors;
  }

  const collection = relative(CONTENT_DIR, filePath).split('/')[0];
  const schema = SCHEMAS[collection];

  if (schema) {
    for (const [field, expectedType] of Object.entries(schema)) {
      if (!(field in frontmatter)) {
        errors.push(`Missing required frontmatter field: "${field}"`);
        continue;
      }
      const value = frontmatter[field];
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== expectedType) {
        errors.push(
          `Frontmatter field "${field}" must be ${expectedType}, got ${actualType}`,
        );
      }
    }
  }

  // --- MDX syntax ---
  try {
    await compile(raw, { format: 'mdx' });
  } catch (err) {
    errors.push(`MDX syntax error: ${err.message}`);
  }

  return errors;
}

async function main() {
  const files = await findMdxFiles(CONTENT_DIR);

  if (files.length === 0) {
    console.log('No MDX files found — nothing to validate.');
    return;
  }

  let failCount = 0;

  for (const file of files) {
    const rel = relative(ROOT, file);
    const errors = await validateFile(file);

    if (errors.length === 0) {
      console.log(`  \u2713  ${rel}`);
    } else {
      failCount++;
      console.error(`  \u2717  ${rel}`);
      for (const err of errors) {
        console.error(`       ${err}`);
      }
    }
  }

  const total = files.length;
  const passed = total - failCount;
  console.log(`\n${total} file(s) checked: ${passed} passed, ${failCount} failed`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Validation script error:', err);
  process.exit(1);
});
