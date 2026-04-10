'use client';

import { DARK_THEME, LIGHT_THEME, STORAGE_KEY, syncDocumentTheme } from '@/lib/theme';

declare global {
  interface Window {
    __sonicverseApplyTheme?: (theme: 'light' | 'dark') => 'light' | 'dark';
    __sonicverseSyncTheme?: () => 'light' | 'dark';
    __sonicverseThemeBound?: boolean;
  }
}

function applyTheme(theme: 'light' | 'dark') {
  syncDocumentTheme(document.documentElement, theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  return theme;
}

function syncTheme() {
  try {
    return syncDocumentTheme(
      document.documentElement,
      localStorage.getItem(STORAGE_KEY),
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  } catch {
    return syncDocumentTheme(document.documentElement, null, false);
  }
}

export default function ThemeToggle() {
  const handleClick = () => {
    const current = window.__sonicverseSyncTheme?.() ?? syncTheme();
    const nextTheme = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    (window.__sonicverseApplyTheme ?? applyTheme)(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle btn btn-ghost btn-circle"
      aria-label="Toggle color theme"
      onClick={handleClick}
    >
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  );
}
