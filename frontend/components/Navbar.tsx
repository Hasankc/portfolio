'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';

const NAV = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects'   },
  { href: '#ai-chat',    label: 'AI Chat'    },
  { href: '#contact',    label: 'Contact'    },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { threshold: 0.45, rootMargin: '-60px 0px 0px 0px' }
    );
    NAV.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navBg = scrolled
    ? theme === 'dark' ? 'rgba(10,15,14,0.92)' : 'rgba(245,240,235,0.92)'
    : 'transparent';

  return (
    /* id="navbar" — top-level nav element */
    <header
      id="navbar"
      data-component="navbar"
      data-scrolled={scrolled}
      role="banner"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background .35s, box-shadow .35s, backdrop-filter .35s',
        background: navBg,
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--border2)' : 'none',
      }}
    >
      <div
        id="navbar-inner"
        className="wrap"
        style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
      >
        {/* id="navbar-logo" — click to go back to top */}
        <a
          id="navbar-logo"
          data-testid="navbar-logo"
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
        >
          <div
            id="navbar-logo-icon"
            style={{
              width: 32, height: 32, borderRadius: 9, background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, flexShrink: 0,
            }}
          >
            A
          </div>
          <span
            id="navbar-logo-text"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text1)', letterSpacing: '-.02em' }}
          >
            Alhasan
          </span>
        </a>

        {/* id="navbar-links" — desktop navigation links */}
        <nav
          id="navbar-links"
          data-testid="navbar-links"
          style={{ display: 'flex', gap: 2, alignItems: 'center' }}
          className="hidden md:flex"
          aria-label="Main navigation"
        >
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              id={`nav-link-${label.toLowerCase().replace(' ', '-')}`}
              data-nav-href={href}
              data-active={active === href}
              href={href}
              style={{
                padding: '6px 13px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: 'none', transition: 'all .2s',
                color: active === href ? 'var(--accent)' : 'var(--text2)',
                background: active === href ? 'rgba(13,148,136,.1)' : 'transparent',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* id="navbar-actions" — theme toggle + resume button */}
        <div
          id="navbar-actions"
          style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
        >
          {/* id="navbar-theme-toggle" — light/dark switcher */}
          <button
            id="navbar-theme-toggle"
            data-testid="navbar-theme-toggle"
            data-current-theme={theme}
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 36, height: 36, borderRadius: 9, background: 'transparent',
              border: '1px solid var(--border2)', color: 'var(--text2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .2s', flexShrink: 0,
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* id="navbar-resume-btn" — downloads the CV PDF */}
          <a
            id="navbar-resume-btn"
            data-testid="navbar-resume-btn"
            href="/Alhasan_Alqaysi_CV.pdf"
            download="Alhasan_Al-Qaysi_CV.pdf"
            className="btn btn-primary hidden md:inline-flex"
            style={{ padding: '8px 16px', fontSize: 13, gap: 6 }}
          >
            <Download size={13} />
            Resume
          </a>

          {/* id="navbar-mobile-toggle" — opens/closes the mobile menu */}
          <button
            id="navbar-mobile-toggle"
            data-testid="navbar-mobile-toggle"
            className="md:hidden"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={open}
            aria-controls="navbar-mobile-menu"
            style={{
              width: 36, height: 36, borderRadius: 9, background: 'transparent',
              border: '1px solid var(--border2)', color: 'var(--text2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* id="navbar-mobile-menu" — dropdown on small screens */}
      {open && (
        <div
          id="navbar-mobile-menu"
          data-testid="navbar-mobile-menu"
          data-open={open}
          style={{
            borderTop: '1px solid var(--border2)',
            background: theme === 'dark' ? 'rgba(10,15,14,.97)' : 'rgba(245,240,235,.97)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div
            id="navbar-mobile-links"
            className="wrap"
            style={{ paddingTop: 12, paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {NAV.map(({ href, label }) => (
              <a
                key={href}
                id={`nav-mobile-link-${label.toLowerCase().replace(' ', '-')}`}
                href={href}
                onClick={() => setOpen(false)}
                style={{ padding: '10px 12px', borderRadius: 8, fontSize: 15, fontWeight: 500, color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s' }}
              >
                {label}
              </a>
            ))}
            {/* id="navbar-mobile-resume" — resume download inside mobile menu */}
            <a
              id="navbar-mobile-resume"
              href="/Alhasan_Alqaysi_CV.pdf"
              download="Alhasan_Al-Qaysi_CV.pdf"
              className="btn btn-primary"
              style={{ marginTop: 10, justifyContent: 'center', gap: 6 }}
              onClick={() => setOpen(false)}
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
