'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useLang } from './LangProvider';
import { Sun, Moon, Menu, X, Download, Globe } from 'lucide-react';

export function Navbar() {
  const { theme, toggle }       = useTheme();
  const { t, toggleLang, lang, isRTL } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState('');

  const NAV = [
    { href: '#about',      label: t('nav_about')      },
    { href: '#skills',     label: t('nav_skills')     },
    { href: '#experience', label: t('nav_experience') },
    { href: '#projects',   label: t('nav_projects')   },
    { href: '#ai-chat',    label: t('nav_ai')         },
    { href: '#contact',    label: t('nav_contact')    },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { threshold: 0.45, rootMargin: '-60px 0px 0px 0px' }
    );
    NAV.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [lang]);

  const navBg = scrolled
    ? theme === 'dark' ? 'rgba(10,15,14,0.92)' : 'rgba(245,240,235,0.92)'
    : 'transparent';

  const btnStyle: React.CSSProperties = {
    width: 36, height: 36, borderRadius: 9, background: 'transparent',
    border: '1px solid var(--border2)', color: 'var(--text2)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all .2s', flexShrink: 0,
  };

  return (
    <header
      id="navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background .35s, box-shadow .35s',
        background: navBg,
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--border2)' : 'none',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div className="wrap" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>

        {/* Logo */}
        <a href="#" id="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>A</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text1)', letterSpacing: '-.02em' }}>Alhasan</span>
        </a>

        {/* Desktop nav */}
        <nav id="navbar-links" style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="hidden md:flex">
          {NAV.map(({ href, label }) => (
            <a key={href} href={href} id={`nav-link-${href.slice(1)}`} style={{ padding: '6px 13px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all .2s', color: active === href ? 'var(--accent)' : 'var(--text2)', background: active === href ? 'rgba(13,148,136,.1)' : 'transparent' }}>
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div id="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

          {/* Language toggle */}
          <button
            id="navbar-lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language"
            title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            style={{ ...btnStyle, gap: 4, padding: '0 10px', width: 'auto', fontSize: 12, fontWeight: 600 }}
          >
            <Globe size={13} />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Theme toggle */}
          <button id="navbar-theme-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} style={btnStyle}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Resume download */}
          <a
            id="navbar-resume-btn"
            href="/Alhasan_Alqaysi_CV.pdf"
            download="Alhasan_Al-Qaysi_CV.pdf"
            className="btn btn-primary hidden md:inline-flex"
            style={{ padding: '8px 16px', fontSize: 13, gap: 6 }}
          >
            <Download size={13} />
            {t('nav_resume')}
          </a>

          {/* Hamburger */}
          <button id="navbar-mobile-toggle" className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open} style={btnStyle}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="navbar-mobile-menu" style={{ borderTop: '1px solid var(--border2)', background: theme === 'dark' ? 'rgba(10,15,14,.97)' : 'rgba(245,240,235,.97)', backdropFilter: 'blur(18px)', direction: isRTL ? 'rtl' : 'ltr' }}>
          <div className="wrap" style={{ paddingTop: 12, paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, fontSize: 15, fontWeight: 500, color: 'var(--text2)', textDecoration: 'none' }}>{label}</a>
            ))}
            <a href="/Alhasan_Alqaysi_CV.pdf" download="Alhasan_Al-Qaysi_CV.pdf" className="btn btn-primary" style={{ marginTop: 10, justifyContent: 'center', gap: 6 }} onClick={() => setOpen(false)}>
              <Download size={14} />{t('nav_resume_dl')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
