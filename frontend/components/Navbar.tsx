'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects'   },
  { href: '#ai-chat',    label: 'AI Chat'    },
  { href: '#contact',    label: 'Contact'    },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHref,  setActiveHref]  = useState('');

  // add a bit of blur/border to the nav once the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight whichever section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { threshold: 0.5 },
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b' : 'bg-transparent'
      }`}
      style={{ borderColor: scrolled ? 'var(--border)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* logo — clicking takes you back to the top */}
        <a
          href="#"
          className="flex items-center gap-2 text-[var(--accent)] font-bold text-lg tracking-tight"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Code2 size={20} />
          <span>Alhasan</span>
        </a>

        {/* desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeHref === href
                  ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* dark/light toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all hover:bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CV download — hidden on mobile, too cramped */}
          <a
            href="/Alhasan_Alqaysi_CV.pdf"
            download
            className="hidden md:inline-flex btn-primary text-sm"
          >
            Resume
          </a>

          {/* hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-glow)] transition-all"
              >
                {label}
              </a>
            ))}
            <a
              href="/Alhasan_Alqaysi_CV.pdf"
              download
              className="mt-2 btn-primary text-sm text-center"
              onClick={() => setMobileOpen(false)}
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
