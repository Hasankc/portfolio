/**
 * lib.test.ts — utility function tests
 * Run: npm test
 */
import { cn, truncate, clamp, formatDate } from '@/lib/utils';

describe('cn() — class name merger', () => {
  it('merges multiple class strings', () => expect(cn('a', 'b')).toBe('a b'));
  it('ignores falsy values',          () => expect(cn('a', false, undefined, null, '')).toBe('a'));
  it('resolves tailwind conflicts',   () => expect(cn('p-2', 'p-4')).toBe('p-4'));
  it('handles conditional objects',   () => expect(cn('base', { active: true, off: false })).toBe('base active'));
  it('handles empty call',            () => expect(cn()).toBe(''));
});

describe('truncate()', () => {
  it('returns original if within limit', () => expect(truncate('hi', 10)).toBe('hi'));
  it('truncates long strings',           () => expect(truncate('hello world', 8)).toBe('hello w…'));
  it('exact length returns unchanged',   () => expect(truncate('hello', 5)).toBe('hello'));
  it('handles empty string',             () => expect(truncate('', 10)).toBe(''));
  it('handles limit of 1',              () => expect(truncate('abc', 1)).toBe('…'));
});

describe('clamp()', () => {
  it('returns value within range', () => expect(clamp(5, 0, 10)).toBe(5));
  it('clamps to minimum',          () => expect(clamp(-5, 0, 10)).toBe(0));
  it('clamps to maximum',          () => expect(clamp(15, 0, 10)).toBe(10));
  it('handles value at min',       () => expect(clamp(0, 0, 10)).toBe(0));
  it('handles value at max',       () => expect(clamp(10, 0, 10)).toBe(10));
  it('handles equal min and max',  () => expect(clamp(5, 5, 5)).toBe(5));
});

describe('formatDate()', () => {
  it('includes the year',         () => expect(formatDate('2023-06-15')).toContain('2023'));
  it('returns a non-empty string',() => expect(formatDate('2022-01-01').length).toBeGreaterThan(4));
  it('handles different formats', () => expect(formatDate('2024-12-31')).toContain('2024'));
});
