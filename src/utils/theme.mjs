export const STORAGE_KEY = 'sv-theme';
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export function isTheme(value) {
	return value === LIGHT_THEME || value === DARK_THEME;
}

export function resolveTheme(storedTheme, systemPrefersDark = false) {
	if (isTheme(storedTheme)) {
		return storedTheme;
	}

	return systemPrefersDark ? DARK_THEME : LIGHT_THEME;
}

export function syncDocumentTheme(rootElement, storedTheme, systemPrefersDark = false) {
	const theme = resolveTheme(storedTheme, systemPrefersDark);
	rootElement.setAttribute('data-theme', theme);
	return theme;
}
