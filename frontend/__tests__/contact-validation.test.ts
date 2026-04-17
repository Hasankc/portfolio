/**
 * __tests__/contact-validation.test.ts
 *
 * Tests the Zod schema that drives the contact form.
 * These run fast because they don't touch the DOM at all.
 */

import { z } from 'zod';

// copied from Contact.tsx — if you change the schema there, update this too
const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:   z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject is too short').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

const valid = {
  name:    'Jane Recruiter',
  email:   'jane@example.com',
  subject: 'Job opportunity',
  message: 'Hi Alhasan, we have an opening that looks like a great fit for you.',
};

// ── happy path ────────────────────────────────────────────────────────────────
describe('contact form schema — valid input', () => {
  it('passes with all fields filled correctly', () => {
    const result = schema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});

// ── name field ────────────────────────────────────────────────────────────────
describe('contact form schema — name field', () => {
  it('rejects a single character name', () => {
    const result = schema.safeParse({ ...valid, name: 'J' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/2 characters/);
    }
  });

  it('rejects an empty name', () => {
    const result = schema.safeParse({ ...valid, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a name over 80 chars', () => {
    const result = schema.safeParse({ ...valid, name: 'a'.repeat(81) });
    expect(result.success).toBe(false);
  });

  it('accepts a name exactly 2 chars long', () => {
    const result = schema.safeParse({ ...valid, name: 'Jo' });
    expect(result.success).toBe(true);
  });
});

// ── email field ───────────────────────────────────────────────────────────────
describe('contact form schema — email field', () => {
  it('rejects an email without @', () => {
    const result = schema.safeParse({ ...valid, email: 'notanemail' });
    expect(result.success).toBe(false);
  });

  it('rejects an email without a domain', () => {
    const result = schema.safeParse({ ...valid, email: 'user@' });
    expect(result.success).toBe(false);
  });

  it('accepts a valid email', () => {
    expect(schema.safeParse({ ...valid, email: 'test@test.co.uk' }).success).toBe(true);
  });

  it('accepts emails with plus signs', () => {
    expect(schema.safeParse({ ...valid, email: 'user+tag@gmail.com' }).success).toBe(true);
  });
});

// ── subject field ─────────────────────────────────────────────────────────────
describe('contact form schema — subject field', () => {
  it('rejects a 2-char subject', () => {
    const result = schema.safeParse({ ...valid, subject: 'Hi' });
    expect(result.success).toBe(false);
  });

  it('accepts a 3-char subject', () => {
    expect(schema.safeParse({ ...valid, subject: 'Hey' }).success).toBe(true);
  });
});

// ── message field ─────────────────────────────────────────────────────────────
describe('contact form schema — message field', () => {
  it('rejects a short message', () => {
    const result = schema.safeParse({ ...valid, message: 'Hello' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/10 characters/);
    }
  });

  it('rejects a message over 2000 chars', () => {
    const result = schema.safeParse({ ...valid, message: 'a'.repeat(2001) });
    expect(result.success).toBe(false);
  });

  it('accepts a message exactly 10 chars', () => {
    expect(schema.safeParse({ ...valid, message: 'a'.repeat(10) }).success).toBe(true);
  });
});
