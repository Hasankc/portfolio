'use client';
import { useEffect, useRef } from 'react';
import { Code2, Zap, Users, Trophy } from 'lucide-react';

const STATS = [
  { id: 'years',   v: '5+',  label: 'Years Experience', Icon: Code2,  color: '#0d9488' },
  { id: 'bugs',    v: '50+', label: 'Bugs Squashed',    Icon: Zap,    color: '#d97706' },
  { id: 'orgs',    v: '1K+', label: 'Orgs on Platform', Icon: Users,  color: '#7c3aed' },
  { id: 'awards',  v: '1',   label: 'Hackathon Award',  Icon: Trophy, color: '#059669' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting)
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 90));
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    /* id="about" — scroll target for nav link */
    <section
      id="about"
      ref={ref}
      data-section="about"
      data-testid="about-section"
      className="sec"
    >
      <div id="about-inner" className="wrap">
        <div
          id="about-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '48px 64px', alignItems: 'center' }}
        >

          {/* id="about-text" — bio text column */}
          <div id="about-text" data-testid="about-text" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* id="about-header" — section label + heading */}
            <div id="about-header" className="reveal">
              <p id="about-label" className="label" style={{ marginBottom: 10 }}>// about me</p>
              <h2 id="about-heading" className="subhead">
                Passionate about{' '}
                <span id="about-heading-grad" className="grad" style={{ paddingRight: 4 }}>crafting</span>
                {' '}the web
              </h2>
            </div>

            {/* id="about-para-1" — current job paragraph */}
            <p id="about-para-1" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>
              I&apos;m a full-stack developer based in Helsinki with 5+ years building web applications
              people actually enjoy using. Currently at{' '}
              <strong id="about-employer" style={{ color: 'var(--text1)', fontWeight: 600 }}>
                Cyberday | Agendium Oy
              </strong>,
              building the frontend of a cybersecurity compliance platform trusted by 1,000+ organizations worldwide.
            </p>

            {/* id="about-para-2" — work philosophy */}
            <p id="about-para-2" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>
              I thrive in collaborative Agile teams and believe great software comes from empathy for users,
              clean thinking, and a constant drive to improve. I pick up new tools fast and love solving
              problems that actually matter.
            </p>

            {/* id="about-para-3" — hackathon / web3 */}
            <p id="about-para-3" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>
              Outside of work I explore Web3. In 2022 I took{' '}
              <strong id="about-award" style={{ color: 'var(--accent3)', fontWeight: 600 }}>
                2nd place at Junction 2022
              </strong>{' '}
              for building a marketplace using blockchain + Google Cloud Video Intelligence to ensure
              fair pay for content creators based on actual performance metrics.
            </p>

            {/* id="about-cta-buttons" — action buttons */}
            <div id="about-cta-buttons" className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <a id="about-cta-contact" href="#contact" className="btn btn-primary">Let&apos;s Work Together</a>
              <a
                id="about-cta-github"
                href="https://github.com/Hasankc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                View GitHub
              </a>
            </div>
          </div>

          {/* id="about-stats-grid" — the 4 stat cards */}
          <div
            id="about-stats-grid"
            data-testid="about-stats"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            {STATS.map(({ id, v, label, Icon, color }, i) => (
              /* id="about-stat-{id}" — individual stat card */
              <div
                key={id}
                id={`about-stat-${id}`}
                data-testid={`about-stat-${id}`}
                data-stat-value={v}
                className="reveal card"
                style={{ padding: 22, transitionDelay: `${i * 80}ms` }}
              >
                {/* id="about-stat-{id}-icon" — colored icon box */}
                <div
                  id={`about-stat-${id}-icon`}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${color}12`, border: `1px solid ${color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                {/* id="about-stat-{id}-value" — big number */}
                <div
                  id={`about-stat-${id}-value`}
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, color, lineHeight: 1 }}
                >
                  {v}
                </div>
                {/* id="about-stat-{id}-label" — descriptor text */}
                <div
                  id={`about-stat-${id}-label`}
                  style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6, fontWeight: 500 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
