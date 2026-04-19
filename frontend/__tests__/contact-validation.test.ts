/**
 * contact-validation.test.ts — form schema validation
 * These run without DOM — fast pure logic tests
 */
import { z } from 'zod';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:   z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject too short').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

const VALID = { name:'Jane Smith', email:'jane@example.com', subject:'Hello there', message:'This is a test message long enough.' };

describe('Contact form — valid input', () => {
  it('passes with all fields correct', () => expect(schema.safeParse(VALID).success).toBe(true));
});

describe('Contact form — name field', () => {
  it('rejects single character',     () => expect(schema.safeParse({...VALID,name:'J'}).success).toBe(false));
  it('rejects empty string',         () => expect(schema.safeParse({...VALID,name:''}).success).toBe(false));
  it('rejects > 80 chars',           () => expect(schema.safeParse({...VALID,name:'a'.repeat(81)}).success).toBe(false));
  it('accepts exactly 2 chars',      () => expect(schema.safeParse({...VALID,name:'Jo'}).success).toBe(true));
  it('accepts normal name',          () => expect(schema.safeParse({...VALID,name:'Alhasan Al-Qaysi'}).success).toBe(true));
});

describe('Contact form — email field', () => {
  it('rejects missing @',            () => expect(schema.safeParse({...VALID,email:'notanemail'}).success).toBe(false));
  it('rejects missing domain',       () => expect(schema.safeParse({...VALID,email:'user@'}).success).toBe(false));
  it('accepts valid email',          () => expect(schema.safeParse({...VALID,email:'test@test.co.uk'}).success).toBe(true));
  it('accepts email with plus',      () => expect(schema.safeParse({...VALID,email:'user+tag@gmail.com'}).success).toBe(true));
  it('accepts subdomain email',      () => expect(schema.safeParse({...VALID,email:'a@b.c.com'}).success).toBe(true));
});

describe('Contact form — subject field', () => {
  it('rejects 2-char subject',        () => expect(schema.safeParse({...VALID,subject:'Hi'}).success).toBe(false));
  it('accepts 3-char subject',        () => expect(schema.safeParse({...VALID,subject:'Hey'}).success).toBe(true));
  it('rejects > 120 chars',           () => expect(schema.safeParse({...VALID,subject:'a'.repeat(121)}).success).toBe(false));
});

describe('Contact form — message field', () => {
  it('rejects short message',         () => expect(schema.safeParse({...VALID,message:'Hello'}).success).toBe(false));
  it('accepts exactly 10 chars',      () => expect(schema.safeParse({...VALID,message:'a'.repeat(10)}).success).toBe(true));
  it('rejects > 2000 chars',          () => expect(schema.safeParse({...VALID,message:'a'.repeat(2001)}).success).toBe(false));
  it('includes correct error message',() => {
    const r = schema.safeParse({...VALID,message:'short'});
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toMatch(/10 characters/);
  });
});
