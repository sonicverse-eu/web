export const STORAGE_KEY = 'sv-theme';
export const LIGHT_THEME = 'light' as const;
export const DARK_THEME = 'dark' as const;

export type Theme = 'light' | 'dark';

export function isTheme(value: unknown): value is Theme {
  return value === LIGHT_THEME || value === DARK_THEME;
}

export function resolveTheme(storedTheme: unknown, systemPrefersDark = false): Theme {
  if (isTheme(storedTheme)) return storedTheme;
  return systemPrefersDark ? DARK_THEME : LIGHT_THEME;
}

export function syncDocumentTheme(
  rootElement: HTMLElement,
  storedTheme: unknown,
  systemPrefersDark = false
): Theme {
  const theme = resolveTheme(storedTheme, systemPrefersDark);
  rootElement.setAttribute('data-theme', theme);
  return theme;
}
