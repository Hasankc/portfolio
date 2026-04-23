'use client';
import { Github, Linkedin, Mail, Heart, Download } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

export function Footer() {
  const { t, isRTL } = useLang();

  const NAV = [
    { href:'#about',      label:t('nav_about')      },
    { href:'#skills',     label:t('nav_skills')     },
    { href:'#experience', label:t('nav_experience') },
    { href:'#projects',   label:t('nav_projects')   },
    { href:'#ai-chat',    label:t('nav_ai')         },
    { href:'#contact',    label:t('nav_contact')    },
  ];

  const SOCIALS = [
    { id:'github',   Icon:Github,   href:'https://github.com/Hasankc',            label:'GitHub'   },
    { id:'email',    Icon:Mail,     href:'mailto:alhasanal_qaysi@yahoo.com',       label:'Email'    },
    { id:'linkedin', Icon:Linkedin, href:'https://linkedin.com/in/hasanalqaysi',   label:'LinkedIn' },
  ];

  return (
    <footer id="footer" style={{ borderTop: '1px solid var(--border2)', background: 'var(--bg2)', padding: '52px 0 28px', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36, marginBottom: 40 }}>

          {/* Brand */}
          <div id="footer-brand">
            <div id="footer-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, color: 'var(--text1)', marginBottom: 12 }}>
              {t('hero_name')}
            </div>
            <p id="footer-tagline" style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 230, marginBottom: 16 }}>
              {t('footer_tagline')}
            </p>
            <a id="footer-cv-download" href="/Alhasan_Alqaysi_CV.pdf" download="Alhasan_Al-Qaysi_CV.pdf" className="btn btn-outline" style={{ padding: '7px 14px', fontSize: 12, gap: 5, width: 'fit-content' }}>
              <Download size={12} />{t('footer_dl_cv')}
            </a>
          </div>

          {/* Nav links */}
          <div id="footer-nav">
            <div id="footer-nav-title" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>{t('footer_nav_title')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV.map(({ href, label }) => (
                <a key={href} id={`footer-nav-${href.slice(1)}`} href={href} style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color='var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color='var(--text2)')}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div id="footer-social">
            <div id="footer-social-title" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>{t('footer_soc_title')}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SOCIALS.map(({ id, Icon, href, label }) => (
                <a key={id} id={`footer-social-${id}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--card)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor='var(--accent)'; el.style.color='var(--accent)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor='var(--border2)'; el.style.color='var(--text2)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div id="footer-bottom" style={{ borderTop: '1px solid var(--border2)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p id="footer-copyright" style={{ fontSize: 12, color: 'var(--text3)' }}>
            © {new Date().getFullYear()} {t('hero_name')}. {t('footer_rights')}
          </p>
          <p id="footer-attribution" style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 5 }}>
            {t('footer_built')} <Heart size={11} style={{ color: '#ef4444' }} /> {t('footer_using')}
          </p>
        </div>
      </div>
    </footer>
  );
}
