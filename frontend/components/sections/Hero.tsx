'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowDown, MapPin, ExternalLink } from 'lucide-react';

// these are the roles that cycle in the typewriter — tweak the order/wording
// to whatever feels most accurate for what you're applying to
const roles = [
  'Full-Stack Web Developer',
  'React & TypeScript Engineer',
  'Vue.js Specialist',
  'Node.js Developer',
  'Python Backend Dev',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [deleting, setDeleting]    = useState(false);

  // ref instead of state for the timeout id — no need to trigger re-renders for this
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && displayed.length < current.length) {
      // still typing forward — 60ms per char feels natural without being too slow
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === current.length) {
      // hold for 2 seconds so people can actually read it before we delete
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      // deleting is faster (30ms) — looks snappier going back than typing forward
      timeoutRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        30,
      );
    } else {
      // finished deleting — move to next role and start again
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center section-padding pt-24"
    >
      {/* background glow orbs — decorative only, pointer-events off */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* text content — order-2 on mobile so photo shows first on small screens */}
        <div className="space-y-8 order-2 lg:order-1">

          {/* availability pill — remember to update this when you land a job lol */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <span className="glow-dot" />
            <span className="text-[var(--text-secondary)]">Available for opportunities</span>
          </div>

          <div>
            <p
              className="text-[var(--accent)] text-lg mb-3 font-medium"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Hello, I&apos;m
            </p>
            <h1 className="section-title mb-4">
              Alhasan{' '}
              <span className="gradient-text">Al-Qaysi</span>
            </h1>

            {/* typewriter output — min-h stops layout from jumping when string is empty */}
            <div className="flex items-center gap-2 text-xl text-[var(--text-secondary)] font-light min-h-[2rem]">
              <span>{displayed}</span>
              <span
                className="inline-block w-0.5 h-6 animate-pulse"
                style={{ background: 'var(--accent)' }}
              />
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-lg">
            Full-stack developer with 5+ years building web apps in Helsinki. I care about
            fast, accessible products — from pixel-perfect UIs to the APIs behind them.
          </p>

          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
            <MapPin size={14} className="text-[var(--accent)]" />
            <span>Helsinki, Finland</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">Get in Touch</a>
            <a href="#projects" className="btn-secondary">
              <span className="flex items-center gap-2">
                View Projects <ExternalLink size={14} />
              </span>
            </a>
          </div>

          {/* socials + phone number */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Hasankc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)]"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:alhasanal_qaysi@yahoo.com"
              className="p-2.5 rounded-xl glass transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)]"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://linkedin.com/in/alhasan-al-qaysi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)]"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>

            <div className="w-px h-6 bg-[var(--border)] mx-2" />
            <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
              +358 45 113 9969
            </span>
          </div>
        </div>

        {/* photo column */}
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative">

            {/* pulsing glow ring behind the photo */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse-slow"
              style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            />

            {/* profile photo — 320x320, circular, floats up and down */}
            <div
              className="relative rounded-full overflow-hidden animate-float"
              style={{
                width: '320px',
                height: '320px',
                border: '2px solid var(--border)',
                boxShadow: '0 0 60px var(--accent-glow)',
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Alhasan Al-Qaysi"
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* floating stat chips — update numbers as they change */}
            <div
              className="absolute -bottom-4 -left-8 glass rounded-xl px-4 py-2.5 text-sm font-medium shadow-xl"
              style={{ border: '1px solid var(--border)' }}
            >
              <span className="text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>5+</span>
              <span className="text-[var(--text-secondary)] ml-1">years exp.</span>
            </div>
            <div
              className="absolute -top-4 -right-8 glass rounded-xl px-4 py-2.5 text-sm font-medium shadow-xl"
              style={{ border: '1px solid var(--border)' }}
            >
              <span className="text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>20+</span>
              <span className="text-[var(--text-secondary)] ml-1">bugs squashed</span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll nudge at the bottom */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="text-xs" style={{ fontFamily: 'var(--font-mono)' }}>scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
