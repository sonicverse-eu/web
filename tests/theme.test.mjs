import test from 'node:test';
import assert from 'node:assert/strict';

import {
	DARK_THEME,
	LIGHT_THEME,
	resolveTheme,
	syncDocumentTheme
} from '../src/utils/theme.mjs';

test('resolveTheme keeps a saved dark preference', () => {
	assert.equal(resolveTheme(DARK_THEME, false), DARK_THEME);
});

test('resolveTheme keeps a saved light preference', () => {
	assert.equal(resolveTheme(LIGHT_THEME, true), LIGHT_THEME);
});

test('resolveTheme falls back to the system preference when nothing is saved', () => {
	assert.equal(resolveTheme(null, true), DARK_THEME);
	assert.equal(resolveTheme(null, false), LIGHT_THEME);
});

test('syncDocumentTheme reapplies the saved theme on repeated syncs', () => {
	const rootElement = {
		attributes: new Map(),
		setAttribute(name, value) {
			this.attributes.set(name, value);
		},
		getAttribute(name) {
			return this.attributes.get(name);
		}
	};

	syncDocumentTheme(rootElement, DARK_THEME, false);
	rootElement.setAttribute('data-theme', LIGHT_THEME);
	syncDocumentTheme(rootElement, DARK_THEME, false);

	assert.equal(rootElement.getAttribute('data-theme'), DARK_THEME);
});
