'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(80),
  email:   z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject too short').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});
type F = z.infer<typeof schema>;

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

const CONTACTS = [
  { id: 'email',    Icon: Mail,     label: 'Email',    val: 'alhasanal_qaysi@yahoo.com',        href: 'mailto:alhasanal_qaysi@yahoo.com' },
  { id: 'phone',    Icon: Phone,    label: 'Phone',    val: '+358 45 113 9969',                  href: 'tel:+358451139969' },
  { id: 'location', Icon: MapPin,   label: 'Location', val: 'Helsinki, Finland',                 href: null },
  { id: 'github',   Icon: Github,   label: 'GitHub',   val: 'github.com/Hasankc',               href: 'https://github.com/Hasankc' },
  { id: 'linkedin', Icon: Linkedin, label: 'LinkedIn', val: 'hasanalqaysi',                  href: 'https://linkedin.com/in/hasanalqaysi' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<F>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting)
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 85));
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onSubmit = async (data: F) => {
    try {
      const r = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) { const e = await r.json(); throw new Error(e.detail ?? 'Server error'); }
      setSent(true);
      reset();
      toast.success("Message sent! I'll reply soon.");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const fieldStyle = (err: boolean): React.CSSProperties => ({
    width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
    fontFamily: 'var(--font-body)', background: 'var(--bg2)', color: 'var(--text1)',
    border: `1px solid ${err ? '#ef4444' : 'var(--border2)'}`, outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  });

  return (
    /* id="contact" — scroll target */
    <section
      id="contact"
      ref={ref}
      data-section="contact"
      data-testid="contact-section"
      className="sec sec-alt"
    >
      <div id="contact-inner" className="wrap">

        {/* id="contact-header" */}
        <div id="contact-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p id="contact-label" className="label" style={{ marginBottom: 10 }}>// contact</p>
          <h2 id="contact-heading" className="subhead">
            Let&apos;s <span id="contact-heading-grad" className="grad" style={{ paddingRight: 4 }}>Connect</span>
          </h2>
          <p id="contact-subtext" style={{ color: 'var(--text2)', marginTop: 10, maxWidth: 460, margin: '10px auto 0', fontSize: 15 }}>
            Got a project, job opening, or just want to chat? I&apos;m always up for it.
          </p>
        </div>

        {/* id="contact-grid" — info card + form side by side */}
        <div
          id="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'start' }}
        >

          {/* id="contact-info-col" — left info column */}
          <div id="contact-info-col" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* id="contact-info-card" — the contact details card */}
            <div id="contact-info-card" data-testid="contact-info-card" className="reveal card" style={{ padding: 26 }}>
              <h3 id="contact-info-title" style={{ fontWeight: 700, fontSize: 16, color: 'var(--text1)', marginBottom: 18 }}>Get in touch</h3>
              <div id="contact-info-list" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CONTACTS.map(({ id, Icon, label, val, href }) => (
                  /* id="contact-info-{id}" — individual contact row */
                  <div key={id} id={`contact-info-${id}`} data-testid={`contact-info-${id}`} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                    <div id={`contact-info-${id}-icon`} style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(13,148,136,.09)', border: '1px solid rgba(13,148,136,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div id={`contact-info-${id}-text`}>
                      <div id={`contact-info-${id}-label`} style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 1 }}>{label}</div>
                      {href ? (
                        <a
                          id={`contact-info-${id}-link`}
                          data-testid={`contact-${id}-link`}
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{ fontSize: 13, color: 'var(--text1)', textDecoration: 'none', transition: 'color .2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text1)')}
                        >
                          {val}
                        </a>
                      ) : (
                        <span id={`contact-info-${id}-val`} style={{ fontSize: 13, color: 'var(--text1)' }}>{val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* id="contact-availability-card" — open to work badge */}
            <div id="contact-availability-card" data-testid="contact-availability" className="reveal card" style={{ padding: 18, transitionDelay: '80ms' }}>
              <div id="contact-availability-badge" style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <span className="dot" />
                <span id="contact-availability-text" style={{ fontWeight: 600, fontSize: 13, color: 'var(--text1)' }}>Open to opportunities</span>
              </div>
              <p id="contact-availability-desc" style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                Full-time, freelance, or interesting collabs. Helsinki-based, open to remote internationally.
              </p>
            </div>

          </div>

          {/* id="contact-form-col" — right column with form */}
          <div id="contact-form-col" className="reveal" style={{ transitionDelay: '100ms' }}>

            {/* id="contact-success" — shown after successful submission */}
            {sent ? (
              <div id="contact-success" data-testid="contact-success" className="card" style={{ padding: 44, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div id="contact-success-icon" style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(13,148,136,.1)', border: '1px solid rgba(13,148,136,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={26} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 id="contact-success-title" style={{ fontWeight: 700, fontSize: 19, color: 'var(--text1)' }}>Message sent!</h3>
                <p id="contact-success-text" style={{ color: 'var(--text2)', fontSize: 14 }}>Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
                <button id="contact-success-reset" onClick={() => setSent(false)} className="btn btn-outline" style={{ marginTop: 6 }}>Send another message</button>
              </div>
            ) : (
              /* id="contact-form" — the actual contact form */
              <form
                id="contact-form"
                data-testid="contact-form"
                onSubmit={handleSubmit(onSubmit)}
                className="card"
                style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }}
                noValidate
              >
                <div id="contact-form-row-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

                  {/* id="contact-field-name" */}
                  <div id="contact-field-name">
                    <label id="contact-label-name" htmlFor="contact-input-name" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                      Name <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      id="contact-input-name"
                      data-testid="contact-input-name"
                      {...register('name')}
                      placeholder="Your name"
                      style={fieldStyle(!!errors.name)}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                      onBlur={e  => { e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {errors.name && <p id="contact-error-name" data-testid="contact-error-name" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.name.message}</p>}
                  </div>

                  {/* id="contact-field-email" */}
                  <div id="contact-field-email">
                    <label id="contact-label-email" htmlFor="contact-input-email" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                      Email <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input
                      id="contact-input-email"
                      data-testid="contact-input-email"
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      style={fieldStyle(!!errors.email)}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                      onBlur={e  => { e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {errors.email && <p id="contact-error-email" data-testid="contact-error-email" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.email.message}</p>}
                  </div>
                </div>

                {/* id="contact-field-subject" */}
                <div id="contact-field-subject">
                  <label id="contact-label-subject" htmlFor="contact-input-subject" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                    Subject <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <input
                    id="contact-input-subject"
                    data-testid="contact-input-subject"
                    {...register('subject')}
                    placeholder="What's this about?"
                    style={fieldStyle(!!errors.subject)}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                    onBlur={e  => { e.target.style.borderColor = errors.subject ? '#ef4444' : 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.subject && <p id="contact-error-subject" data-testid="contact-error-subject" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.subject.message}</p>}
                </div>

                {/* id="contact-field-message" */}
                <div id="contact-field-message">
                  <label id="contact-label-message" htmlFor="contact-input-message" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                    Message <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea
                    id="contact-input-message"
                    data-testid="contact-input-message"
                    {...register('message')}
                    rows={5}
                    placeholder="Tell me about your project or opportunity…"
                    style={{ ...fieldStyle(!!errors.message), resize: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)'; }}
                    onBlur={e  => { e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border2)'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.message && <p id="contact-error-message" data-testid="contact-error-message" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.message.message}</p>}
                </div>

                {/* id="contact-submit-btn" — send button */}
                <button
                  id="contact-submit-btn"
                  data-testid="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', gap: 7 }}
                >
                  {isSubmitting
                    ? <><Loader2 id="contact-submit-spinner" size={15} style={{ animation: 'spin 1s linear infinite' }} />Sending…</>
                    : <><Send id="contact-submit-icon" size={15} />Send Message</>
                  }
                </button>

                <p id="contact-privacy-note" style={{ fontSize: 11, textAlign: 'center', color: 'var(--text3)' }}>
                  Your data stays private — no spam, ever.
                </p>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
