'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowDown, MapPin, Download } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

export function Hero() {
  const { t, isRTL } = useLang();

  // typewriter cycles through all 5 roles
  const ROLES = [t('hero_role_1'), t('hero_role_2'), t('hero_role_3'), t('hero_role_4'), t('hero_role_5')];

  const [roleIdx,  setRoleIdx]  = useState(0);
  const [text,     setText]     = useState('');
  const [deleting, setDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const cur = ROLES[roleIdx];
    if (!deleting && text.length < cur.length) {
      timer.current = setTimeout(() => setText(cur.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === cur.length) {
      timer.current = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text.length > 0) {
      timer.current = setTimeout(() => setText(t2 => t2.slice(0, -1)), 32);
    } else {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timer.current);
  }, [text, deleting, roleIdx]);

  // reset typewriter when language changes
  useEffect(() => {
    setText('');
    setDeleting(false);
    setRoleIdx(0);
  }, [isRTL]);

  return (
    <section
      id="hero"
      data-section="hero"
      className="hero-bg"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, paddingBottom: 60, direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div id="hero-inner" className="wrap" style={{ width: '100%' }}>
        <div id="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px 72px', alignItems: 'center' }}>

          {/* Text column */}
          <div id="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Availability badge */}
            <div id="hero-availability-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(13,148,136,.08)', border: '1px solid rgba(13,148,136,.2)', borderRadius: 20, padding: '6px 14px', width: 'fit-content' }}>
              <span className="dot" style={{ width: 7, height: 7 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}>
                {t('hero_available').toUpperCase()}
              </span>
            </div>

            {/* Name block */}
            <div id="hero-name-block">
              <p id="hero-greeting" className="label" style={{ marginBottom: 10 }}>{t('hero_greeting')}</p>
              <h1 id="hero-name" className="headline">
                {/* Full name — grad span has paddingRight to prevent letter clipping */}
                <span id="hero-name-gradient" className="grad" style={{ display: 'inline-block', paddingRight: 6 }}>
                  {t('hero_name')}
                </span>
              </h1>

              {/* Typewriter */}
              <div id="hero-typewriter" style={{ marginTop: 14, minHeight: 34, display: 'flex', alignItems: 'center', gap: 4, direction: isRTL ? 'rtl' : 'ltr' }}>
                <span id="hero-typewriter-text" style={{ fontSize: 20, fontWeight: 300, color: 'var(--text2)' }}>{text}</span>
                <span id="hero-cursor" style={{ width: 2, height: 24, background: 'var(--accent)', display: 'inline-block', animation: 'pulse-dot .9s ease-in-out infinite', flexShrink: 0 }} />
              </div>
            </div>

            {/* Bio */}
            <p id="hero-bio" style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, maxWidth: 480 }}>
              {t('hero_bio')}
            </p>

            {/* Location */}
            <div id="hero-location" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', fontSize: 13 }}>
              <MapPin size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>{t('hero_location')}</span>
            </div>

            {/* CTA buttons */}
            <div id="hero-cta-buttons" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a id="hero-cta-contact"  href="#contact"  className="btn btn-primary">{t('hero_cta_contact')}</a>
              <a id="hero-cta-projects" href="#projects" className="btn btn-outline">{t('hero_cta_projects')}</a>
            </div>

            {/* Socials */}
            <div id="hero-socials" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'github',   Icon: Github,   href: 'https://github.com/Hasankc',              label: 'GitHub'   },
                { id: 'email',    Icon: Mail,     href: 'mailto:alhasanal_qaysi@yahoo.com',         label: 'Email'    },
                { id: 'linkedin', Icon: Linkedin, href: 'https://linkedin.com/in/hasanalqaysi',     label: 'LinkedIn' },
              ].map(({ id, Icon, href, label }) => (
                <a
                  key={id}
                  id={`hero-social-${id}`}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: 9, border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s', background: 'var(--card)', flexShrink: 0 }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor='var(--accent)'; el.style.color='var(--accent)'; el.style.background='rgba(13,148,136,.08)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor='var(--border2)'; el.style.color='var(--text2)'; el.style.background='var(--card)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
              <div style={{ width: 1, height: 18, background: 'var(--border2)', margin: '0 2px' }} />
              <span id="hero-phone" style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>+358 45 113 9969</span>
            </div>
          </div>

          {/* Photo column */}
          <div id="hero-photo-col" style={{ display: 'flex', justifyContent: 'center' }}>
            <div id="hero-photo-wrapper" style={{ position: 'relative' }}>

              {/* glow behind photo */}
              <div id="hero-photo-glow" style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)', animation: 'float 5s ease-in-out infinite', pointerEvents: 'none' }} />

              {/* circular photo frame */}
              <div id="hero-photo-frame" className="float" style={{ width: 300, height: 300, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '3px solid rgba(13,148,136,.25)', boxShadow: '0 8px 48px rgba(13,148,136,.14), 0 2px 8px rgba(0,0,0,.08)', background: imgError ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'var(--bg3)' }}>
                {!imgError ? (
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
                  <div id="hero-photo-fallback" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 72, color: '#fff' }}>AQ</span>
                  </div>
                )}
              </div>

              {/* stat chip — experience */}
              <div id="hero-badge-years" style={{ position: 'absolute', bottom: -10, left: isRTL ? 'auto' : -28, right: isRTL ? -28 : 'auto', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 12, padding: '10px 16px', boxShadow: '0 4px 20px rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>5+</span>
                <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>{t('hero_badge_years')}</span>
              </div>

              {/* stat chip — orgs */}
              <div id="hero-badge-orgs" style={{ position: 'absolute', top: -10, right: isRTL ? 'auto' : -28, left: isRTL ? -28 : 'auto', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 12, padding: '10px 16px', boxShadow: '0 4px 20px rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--accent3)', lineHeight: 1 }}>1K+</span>
                <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>{t('hero_badge_orgs')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div id="hero-scroll-cue" style={{ textAlign: 'center', marginTop: 64 }}>
          <a href="#about" aria-label="Scroll to about section" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: 'var(--text3)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color='var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color='var(--text3)')}>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.15em', textTransform: 'uppercase' }}>{t('hero_scroll')}</span>
            <ArrowDown size={15} style={{ animation: 'float 2s ease-in-out infinite' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
