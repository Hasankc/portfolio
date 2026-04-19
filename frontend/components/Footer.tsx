import { Github, Linkedin, Mail, Heart, Download } from 'lucide-react';

const NAV = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects'   },
  { href: '#ai-chat',    label: 'AI Chat'    },
  { href: '#contact',    label: 'Contact'    },
];

const SOCIALS = [
  { id: 'github',   Icon: Github,   href: 'https://github.com/Hasankc',              label: 'GitHub'   },
  { id: 'email',    Icon: Mail,     href: 'mailto:alhasanal_qaysi@yahoo.com',         label: 'Email'    },
  { id: 'linkedin', Icon: Linkedin, href: 'https://linkedin.com/in/alhasan-al-qaysi', label: 'LinkedIn' },
];

export function Footer() {
  return (
    /* id="footer" — site footer */
    <footer
      id="footer"
      data-component="footer"
      data-testid="footer"
      style={{ borderTop: '1px solid var(--border2)', background: 'var(--bg2)', padding: '52px 0 28px' }}
    >
      <div id="footer-inner" className="wrap">

        {/* id="footer-grid" — three column grid */}
        <div
          id="footer-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36, marginBottom: 40 }}
        >

          {/* id="footer-brand" — name + tagline + CV download */}
          <div id="footer-brand">
            <div id="footer-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, color: 'var(--text1)', marginBottom: 12 }}>
              Alhasan Al-Qaysi
            </div>
            <p id="footer-tagline" style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 230, marginBottom: 16 }}>
              Full-stack developer in Helsinki. Building fast, accessible, honest software.
            </p>
            {/* id="footer-cv-download" — CV download button in footer */}
            <a
              id="footer-cv-download"
              data-testid="footer-cv-download"
              href="/Alhasan_Alqaysi_CV.pdf"
              download="Alhasan_Al-Qaysi_CV.pdf"
              className="btn btn-outline"
              style={{ padding: '7px 14px', fontSize: 12, gap: 5, width: 'fit-content' }}
            >
              <Download size={12} />
              Download CV
            </a>
          </div>

          {/* id="footer-nav" — quick nav links */}
          <div id="footer-nav">
            <div id="footer-nav-title" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Navigation
            </div>
            <div id="footer-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV.map(({ href, label }) => (
                <a
                  key={href}
                  id={`footer-nav-${label.toLowerCase().replace(' ', '-')}`}
                  href={href}
                  style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* id="footer-social" — social icon buttons */}
          <div id="footer-social">
            <div id="footer-social-title" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              Connect
            </div>
            <div id="footer-social-icons" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SOCIALS.map(({ id, Icon, href, label }) => (
                <a
                  key={id}
                  id={`footer-social-${id}`}
                  data-testid={`footer-social-${id}`}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--card)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)', textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* id="footer-bottom" — copyright + attribution */}
        <div
          id="footer-bottom"
          style={{ borderTop: '1px solid var(--border2)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}
        >
          <p id="footer-copyright" style={{ fontSize: 12, color: 'var(--text3)' }}>
            © {new Date().getFullYear()} Alhasan Al-Qaysi. All rights reserved.
          </p>
          <p id="footer-attribution" style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 5 }}>
            Built with <Heart id="footer-heart" size={11} style={{ color: '#ef4444' }} /> using Next.js &amp; FastAPI
          </p>
        </div>

      </div>
    </footer>
  );
}
