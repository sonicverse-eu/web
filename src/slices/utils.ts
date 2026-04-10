export function textValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

export function linkValue(value: unknown, fallback = '') {
  const href = textValue(value, fallback).trim();
  return href || fallback;
}