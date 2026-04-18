'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from 'lucide-react';

// form schema — mirrored on the backend too, so both sides enforce the same rules
// if you change limits here, update routes/contact.py to match
const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:   z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject is too short').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type FormData = z.infer<typeof schema>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

const contacts = [
  { icon: Mail,     label: 'Email',    value: 'alhasanal_qaysi@yahoo.com',       href: 'mailto:alhasanal_qaysi@yahoo.com' },
  { icon: Phone,    label: 'Phone',    value: '+358 45 113 9969',                 href: 'tel:+358451139969' },
  { icon: MapPin,   label: 'Location', value: 'Helsinki, Finland',                href: null },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Hasankc',              href: 'https://github.com/Hasankc' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/hasanalqaysi', href: 'https://www.linkedin.com/in/hasanalqaysi/' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail ?? 'Server returned an error');
      }

      setSent(true);
      reset();
      toast.success("Message sent! I'll get back to you soon.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong — please try again.';
      toast.error(msg);
    }
  };

  // shared input styles — pulled out to avoid repeating inline styles everywhere
  const inputStyle = (hasError: boolean) => ({
    border:     `1px solid ${hasError ? '#f87171' : 'var(--border)'}`,
    background: 'var(--bg-secondary)',
  });

  return (
    <section id="contact" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 reveal">
          <p
            className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // contact
          </p>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            Got a project, a job opening, or just want to talk tech? I&apos;m always up for a conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* left column — contact details */}
          <div className="lg:col-span-2 space-y-5">
            <div className="reveal glass-card p-6 space-y-5">
              <h3 className="font-semibold text-[var(--text-primary)] text-lg">Get in touch</h3>
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                  >
                    <Icon size={15} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--text-primary)]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal glass-card p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="glow-dot" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Open to new opportunities
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Looking for full-time roles, freelance work, or interesting side projects.
                Helsinki-based but open to remote internationally.
              </p>
            </div>
          </div>

          {/* right column — the actual form */}
          <div className="lg:col-span-3 reveal">
            {sent ? (
              // success state — show a confirmation instead of the form
              <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid var(--border)' }}
                >
                  <CheckCircle size={28} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Message sent!</h3>
                <p className="text-[var(--text-secondary)]">
                  Thanks for reaching out. I&apos;ll reply within 24 hours.
                </p>
                <button onClick={() => setSent(false)} className="btn-secondary mt-2">
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass-card p-7 space-y-5"
                noValidate  // let our own validation handle errors, not the browser
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">
                      Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all"
                      style={inputStyle(!!errors.name)}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">
                      Email <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all"
                      style={inputStyle(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Subject <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    {...register('subject')}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all"
                    style={inputStyle(!!errors.subject)}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Message <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell me about your project or what you're looking for…"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none focus:outline-none transition-all"
                    style={{ ...inputStyle(!!errors.message), fontFamily: 'var(--font-body)' }}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting
                    ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    : <><Send size={16} /> Send Message</>
                  }
                </button>

                <p className="text-xs text-center text-[var(--text-muted)]">
                  Your info stays private — no spam, no third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
