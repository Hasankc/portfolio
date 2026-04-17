/**
 * __tests__/lib.test.ts
 *
 * Tests for the utility functions and API helpers.
 * These are pure functions so they're easy to test without any DOM setup.
 */

import { cn, truncate, formatDate, clamp } from '@/lib/utils';

// ── cn() ──────────────────────────────────────────────────────────────────────
describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, '')).toBe('foo');
  });

  it('handles tailwind conflicts — last one wins', () => {
    // tailwind-merge should resolve p-2 vs p-4 to p-4
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
  });

  it('handles conditional class objects', () => {
    const isActive = true;
    expect(cn('base', { active: isActive, disabled: false })).toBe('base active');
  });
});

// ── truncate() ────────────────────────────────────────────────────────────────
describe('truncate()', () => {
  it('returns the original string if short enough', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates and adds ellipsis', () => {
    expect(truncate('hello world', 8)).toBe('hello w…');
  });

  it('handles strings exactly at the limit', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});

// ── clamp() ───────────────────────────────────────────────────────────────────
describe('clamp()', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles value equal to min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles value equal to max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

// ── formatDate() ──────────────────────────────────────────────────────────────
describe('formatDate()', () => {
  it('formats an ISO date string into a readable format', () => {
    // we just check it returns a non-empty string with the right year
    const result = formatDate('2023-06-15T00:00:00Z');
    expect(result).toContain('2023');
    expect(result.length).toBeGreaterThan(4);
  });

  it('handles different date formats', () => {
    const result = formatDate('2022-01-01');
    expect(result).toContain('2022');
  });
});
