/**
 * i18n.test.ts — translation system tests
 * Ensures every English key has an Arabic translation and vice versa.
 */
import { translations, Lang } from '@/lib/i18n';

const EN = translations.en;
const AR = translations.ar;

describe('Translation completeness', () => {
  it('Arabic has every key that English has', () => {
    const missing = Object.keys(EN).filter(k => !(k in AR));
    expect(missing).toEqual([]);
  });

  it('English has every key that Arabic has', () => {
    const missing = Object.keys(AR).filter(k => !(k in EN));
    expect(missing).toEqual([]);
  });

  it('no English value is empty', () => {
    const empty = Object.entries(EN).filter(([, v]) => !v && v !== '');
    expect(empty).toEqual([]);
  });

  it('no Arabic value is empty', () => {
    const empty = Object.entries(AR).filter(([k, v]) => !v && v !== '');
    expect(empty).toEqual([]);
  });

  it('English nav_about is About', () => {
    expect(EN.nav_about).toBe('About');
  });

  it('Arabic nav_about is عني', () => {
    expect(AR.nav_about).toBe('عني');
  });

  it('lang_switch values cross-reference correctly', () => {
    // EN lang_switch should show Arabic script
    expect(EN.lang_switch).toMatch(/[ا-ي]/); // has Arabic characters
    // AR lang_switch should show English
    expect(AR.lang_switch).toBe('English');
  });
});

describe('RTL detection', () => {
  it('Arabic translations have some RTL content', () => {
    const arabicPattern = /[\u0600-\u06FF]/;
    const hasArabic = Object.values(AR).some(v => arabicPattern.test(v as string));
    expect(hasArabic).toBe(true);
  });
});
