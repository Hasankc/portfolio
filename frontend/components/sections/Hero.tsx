'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowDown, MapPin, Download } from 'lucide-react';

const ROLES = [
  'Full-Stack Developer',
  'React & TypeScript Engineer',
  'Vue.js Specialist',
  'Node.js Developer',
  'Python Backend Dev',
];

export function Hero() {
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [text,     setText]     = useState('');
  const [deleting, setDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  // typewriter effect — cycles through ROLES array
  useEffect(() => {
    const cur = ROLES[roleIdx];
    if (!deleting && text.length < cur.length) {
      timer.current = setTimeout(() => setText(cur.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === cur.length) {
      timer.current = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text.length > 0) {
      timer.current = setTimeout(() => setText(t => t.slice(0, -1)), 32);
    } else {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer.current);
  }, [text, deleting, roleIdx]);

  return (
    /* id="hero" — scroll target + section anchor */
    <section
      id="hero"
      data-section="hero"
      data-testid="hero-section"
      className="hero-bg"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: 60 }}
    >
      <div id="hero-inner" className="wrap" style={{ width: '100%' }}>
        <div
          id="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '56px 72px',
            alignItems: 'center',
          }}
        >

          {/* ── LEFT: text content ── */}
          <div id="hero-text" data-testid="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* id="hero-availability-badge" — the "open to work" pill */}
            <div
              id="hero-availability-badge"
              data-testid="hero-availability"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(13,148,136,.08)', border: '1px solid rgba(13,148,136,.2)',
                borderRadius: 20, padding: '6px 14px', width: 'fit-content',
              }}
            >
              <span id="hero-availability-dot" className="dot" style={{ width: 7, height: 7 }} />
              <span
                id="hero-availability-text"
                style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}
              >
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            {/* id="hero-name-block" — greeting + full name + typewriter */}
            <div id="hero-name-block">
              <p id="hero-greeting" className="label" style={{ marginBottom: 10 }}>Hello, I&apos;m</p>

              {/* id="hero-name" — the actual name heading */}
              <h1
                id="hero-name"
                data-testid="hero-name"
                className="headline"
              >
                Alhasan{' '}
                {/*
                  id="hero-name-gradient" — the "Al-Qaysi" part with gradient.
                  FIX: display:inline-block + paddingRight stops the gradient
                  from clipping the last letter of the name.
                */}
                <span
                  id="hero-name-gradient"
                  className="grad"
                  style={{ display: 'inline-block', paddingRight: 6 }}
                >
                  Al-Qaysi
                </span>
              </h1>

              {/* id="hero-typewriter" — animated role text */}
              <div
                id="hero-typewriter"
                data-testid="hero-typewriter"
                data-current-role={ROLES[roleIdx]}
                style={{ marginTop: 14, minHeight: 34, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <span id="hero-typewriter-text" style={{ fontSize: 20, fontWeight: 300, color: 'var(--text2)' }}>
                  {text}
                </span>
                {/* id="hero-cursor" — blinking cursor */}
                <span
                  id="hero-cursor"
                  style={{ width: 2, height: 24, background: 'var(--accent)', display: 'inline-block', animation: 'pulse-dot .9s ease-in-out infinite', flexShrink: 0 }}
                />
              </div>
            </div>

            {/* id="hero-bio" — short intro paragraph */}
            <p
              id="hero-bio"
              data-testid="hero-bio"
              style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 480 }}
            >
              Full-stack developer with{' '}
              <strong id="hero-bio-years" style={{ color: 'var(--text1)', fontWeight: 600 }}>5+ years</strong>
              {' '}building web applications in Helsinki. I craft fast, accessible, and beautiful
              products — from pixel-perfect UIs to robust APIs.
            </p>

            {/* id="hero-location" — location badge */}
            <div
              id="hero-location"
              data-testid="hero-location"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', fontSize: 13 }}
            >
              <MapPin id="hero-location-icon" size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span id="hero-location-text">Helsinki, Finland</span>
            </div>

            {/* id="hero-cta-buttons" — primary action buttons */}
            <div
              id="hero-cta-buttons"
              data-testid="hero-cta-buttons"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <a id="hero-cta-contact" data-testid="hero-cta-contact" href="#contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a id="hero-cta-projects" data-testid="hero-cta-projects" href="#projects" className="btn btn-outline">
                View Projects
              </a>
            </div>

            {/* id="hero-socials" — social links row */}
            <div
              id="hero-socials"
              data-testid="hero-socials"
              style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
            >
              <a
                id="hero-social-github"
                data-testid="hero-social-github"
                href="https://github.com/Hasankc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s', background: 'var(--card)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--accent)'; el.style.background = 'rgba(13,148,136,.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text2)'; el.style.background = 'var(--card)'; }}
              >
                <Github size={16} />
              </a>
              <a
                id="hero-social-email"
                data-testid="hero-social-email"
                href="mailto:alhasanal_qaysi@yahoo.com"
                aria-label="Send email"
                style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s', background: 'var(--card)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--accent)'; el.style.background = 'rgba(13,148,136,.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text2)'; el.style.background = 'var(--card)'; }}
              >
                <Mail size={16} />
              </a>
              <a
                id="hero-social-linkedin"
                data-testid="hero-social-linkedin"
                href="https://linkedin.com/in/alhasan-al-qaysi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s', background: 'var(--card)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--accent)'; el.style.color = 'var(--accent)'; el.style.background = 'rgba(13,148,136,.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border2)'; el.style.color = 'var(--text2)'; el.style.background = 'var(--card)'; }}
              >
                <Linkedin size={16} />
              </a>

              <div id="hero-socials-divider" style={{ width: 1, height: 18, background: 'var(--border2)', margin: '0 2px' }} />
              <span
                id="hero-phone"
                data-testid="hero-phone"
                style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}
              >
                +358 45 113 9969
              </span>
            </div>
          </div>

          {/* ── RIGHT: photo column ── */}
          <div id="hero-photo-col" style={{ display: 'flex', justifyContent: 'center' }}>
            {/* id="hero-photo-wrapper" — contains photo + glow + stat badges */}
            <div id="hero-photo-wrapper" style={{ position: 'relative' }}>

              {/* id="hero-photo-glow" — pulsing glow behind the photo */}
              <div
                id="hero-photo-glow"
                style={{
                  position: 'absolute', inset: -16, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)',
                  animation: 'float 5s ease-in-out infinite', pointerEvents: 'none',
                }}
              />

              {/* id="hero-photo-frame" — the circular photo container */}
              <div
                id="hero-photo-frame"
                data-testid="hero-photo-frame"
                data-img-error={imgError}
                className="float"
                style={{
                  width: 300, height: 300, borderRadius: '50%', overflow: 'hidden',
                  position: 'relative',
                  border: '3px solid rgba(13,148,136,.25)',
                  boxShadow: '0 8px 48px rgba(13,148,136,.14), 0 2px 8px rgba(0,0,0,.08)',
                  background: imgError
                    ? 'linear-gradient(135deg, var(--accent), var(--accent2))'
                    : 'var(--bg3)',
                }}
              >
                {!imgError ? (
                  /* id="hero-photo-img" — the actual profile image */
                  <Image
                    id="hero-photo-img"
                    src="/profile.jpg"
                    alt="Alhasan Al-Qaysi — Full-Stack Web Developer"
                    fill
                    sizes="300px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* id="hero-photo-fallback" — shows initials if photo fails to load */
                  <div
                    id="hero-photo-fallback"
                    data-testid="hero-photo-fallback"
                    style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 72, color: '#fff' }}>AQ</span>
                  </div>
                )}
              </div>

              {/* id="hero-badge-years" — "5+ yrs exp." floating chip */}
              <div
                id="hero-badge-years"
                data-testid="hero-badge-years"
                style={{
                  position: 'absolute', bottom: -10, left: -28,
                  background: 'var(--card)', border: '1px solid var(--border2)',
                  borderRadius: 12, padding: '10px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,.08)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span id="hero-badge-years-value" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>5+</span>
                <span id="hero-badge-years-label" style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>yrs exp.</span>
              </div>

              {/* id="hero-badge-orgs" — "1K+ orgs" floating chip */}
              <div
                id="hero-badge-orgs"
                data-testid="hero-badge-orgs"
                style={{
                  position: 'absolute', top: -10, right: -28,
                  background: 'var(--card)', border: '1px solid var(--border2)',
                  borderRadius: 12, padding: '10px 16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,.08)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span id="hero-badge-orgs-value" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent3)', lineHeight: 1 }}>1K+</span>
                <span id="hero-badge-orgs-label" style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>orgs.</span>
              </div>
            </div>
          </div>
        </div>

        {/* id="hero-scroll-cue" — bouncing arrow at the bottom */}
        <div id="hero-scroll-cue" style={{ textAlign: 'center', marginTop: 64 }}>
          <a
            id="hero-scroll-link"
            href="#about"
            aria-label="Scroll to about section"
            style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: 'var(--text3)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
          >
            <span id="hero-scroll-label" style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Scroll</span>
            <ArrowDown id="hero-scroll-arrow" size={15} style={{ animation: 'float 2s ease-in-out infinite' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
