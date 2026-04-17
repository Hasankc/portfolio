import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const navLinks = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects'   },
  { href: '#ai-chat',    label: 'AI Chat'    },
  { href: '#contact',    label: 'Contact'    },
];

const socials = [
  { icon: Github,   href: 'https://github.com/Hasankc',                  label: 'GitHub'   },
  { icon: Mail,     href: 'mailto:alhasanal_qaysi@yahoo.com',             label: 'Email'    },
  { icon: Linkedin, href: 'https://linkedin.com/in/alhasan-al-qaysi',    label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative border-t px-6 py-14" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* brand blurb */}
          <div className="space-y-4">
            <div
              className="flex items-center gap-2 text-[var(--accent)] font-bold text-lg"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Code2 size={20} />
              <span>Alhasan Al-Qaysi</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Full-stack developer in Helsinki. Building fast, accessible, and honest software.
            </p>
          </div>

          {/* quick nav */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social icons */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-xl flex items-center justify-center glass transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t text-sm text-[var(--text-muted)]"
          style={{ borderColor: 'var(--border)' }}
        >
          <p>© {new Date().getFullYear()} Alhasan Al-Qaysi. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={12} className="text-red-400" /> using Next.js, TypeScript &amp; FastAPI
          </p>
        </div>
      </div>
    </footer>
  );
}
