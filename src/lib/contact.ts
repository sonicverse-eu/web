import { randomUUID } from 'crypto';

export const CONTACT_THREAD_ID_PATTERN = /^SV-\d{8}-[A-F0-9]{8}$/;

export function buildThreadId(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `SV-${date}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export function getValidThreadId(value?: string | null): string {
  return value && CONTACT_THREAD_ID_PATTERN.test(value) ? value : buildThreadId();
}
