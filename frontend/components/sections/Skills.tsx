'use client';
import { useEffect, useRef, useState } from 'react';

type Cat = 'Frontend' | 'Backend' | 'Database' | 'Tools';

const SKILLS: { name: string; pct: number; cat: Cat; icon: string; id: string }[] = [
  { id: 'react',    name: 'React / Next.js',      pct: 92, cat: 'Frontend',  icon: '⚛️' },
  { id: 'ts',       name: 'TypeScript',            pct: 88, cat: 'Frontend',  icon: '🔷' },
  { id: 'vue',      name: 'Vue.js',                pct: 90, cat: 'Frontend',  icon: '💚' },
  { id: 'html-css', name: 'HTML & CSS',            pct: 96, cat: 'Frontend',  icon: '🎨' },
  { id: 'js',       name: 'JavaScript',            pct: 93, cat: 'Frontend',  icon: '🟡' },
  { id: 'node',     name: 'Node.js / Express',     pct: 85, cat: 'Backend',   icon: '🟢' },
  { id: 'python',   name: 'Python / FastAPI',      pct: 78, cat: 'Backend',   icon: '🐍' },
  { id: 'rest',     name: 'REST APIs',             pct: 90, cat: 'Backend',   icon: '🔌' },
  { id: 'postgres', name: 'PostgreSQL',            pct: 74, cat: 'Database',  icon: '🐘' },
  { id: 'mongo',    name: 'MongoDB',               pct: 80, cat: 'Database',  icon: '🍃' },
  { id: 'git',      name: 'Git / GitHub',          pct: 93, cat: 'Tools',     icon: '🐙' },
  { id: 'docker',   name: 'Docker',                pct: 68, cat: 'Tools',     icon: '🐳' },
  { id: 'cloud',    name: 'Azure / Google Cloud',  pct: 65, cat: 'Tools',     icon: '☁️' },
];

const CATS: Cat[] = ['Frontend', 'Backend', 'Database', 'Tools'];
const COLORS: Record<Cat, string> = {
  Frontend: '#0d9488',
  Backend:  '#7c3aed',
  Database: '#059669',
  Tools:    '#d97706',
};

export function Skills() {
  const [active,   setActive]   = useState<Cat>('Frontend');
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting) {
          setAnimated(true);
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 70));
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchCat = (c: Cat) => {
    setAnimated(false);
    setActive(c);
    setTimeout(() => setAnimated(true), 50);
  };

  const shown = SKILLS.filter(s => s.cat === active);
  const c     = COLORS[active];

  return (
    /* id="skills" — scroll target */
    <section
      id="skills"
      ref={ref}
      data-section="skills"
      data-testid="skills-section"
      data-active-category={active}
      className="sec sec-alt"
    >
      <div id="skills-inner" className="wrap">

        {/* id="skills-header" — label + heading */}
        <div id="skills-header" className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p id="skills-label" className="label" style={{ marginBottom: 10 }}>// skills &amp; technologies</p>
          <h2 id="skills-heading" className="subhead">
            My <span id="skills-heading-grad" className="grad" style={{ paddingRight: 4 }}>Technical</span> Stack
          </h2>
          <p id="skills-subtext" style={{ color: 'var(--text2)', marginTop: 10, maxWidth: 440, margin: '10px auto 0', fontSize: 15 }}>
            Honest self-assessments — not marketing numbers.
          </p>
        </div>

        {/* id="skills-tabs" — category filter buttons */}
        <div
          id="skills-tabs"
          data-testid="skills-tabs"
          className="reveal"
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}
        >
          {CATS.map(cat => (
            <button
              key={cat}
              id={`skills-tab-${cat.toLowerCase()}`}
              data-testid={`skills-tab-${cat.toLowerCase()}`}
              data-active={active === cat}
              onClick={() => switchCat(cat)}
              style={{
                padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all .22s', fontFamily: 'var(--font-body)',
                background: active === cat ? `${COLORS[cat]}14` : 'var(--card)',
                color: active === cat ? COLORS[cat] : 'var(--text2)',
                border: `1px solid ${active === cat ? COLORS[cat] + '35' : 'var(--border2)'}`,
                boxShadow: active === cat ? `0 0 0 3px ${COLORS[cat]}10` : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* id="skills-list" — the animated skill bars */}
        <div
          id="skills-list"
          data-testid="skills-list"
          style={{ maxWidth: 660, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {shown.map((s, i) => (
            /* id="skill-{id}" — individual skill row */
            <div
              key={s.id}
              id={`skill-${s.id}`}
              data-testid={`skill-${s.id}`}
              data-skill-name={s.name}
              data-skill-pct={s.pct}
              className="reveal card"
              style={{ padding: '14px 18px', transitionDelay: `${i * 55}ms` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span id={`skill-${s.id}-icon`} style={{ fontSize: 17 }}>{s.icon}</span>
                  <span id={`skill-${s.id}-name`} style={{ fontWeight: 500, fontSize: 14, color: 'var(--text1)' }}>{s.name}</span>
                </div>
                <span
                  id={`skill-${s.id}-pct`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: c }}
                >
                  {s.pct}%
                </span>
              </div>
              {/* id="skill-{id}-track" — gray background track */}
              <div id={`skill-${s.id}-track`} style={{ height: 5, borderRadius: 3, background: 'var(--bg3)', overflow: 'hidden' }}>
                {/* id="skill-{id}-fill" — animated colored fill */}
                <div
                  id={`skill-${s.id}-fill`}
                  style={{
                    height: '100%', borderRadius: 3,
                    background: `linear-gradient(90deg, ${c}, ${c}aa)`,
                    boxShadow: `0 0 8px ${c}40`,
                    width: animated ? `${s.pct}%` : '0%',
                    transition: `width .9s cubic-bezier(.4,0,.2,1) ${i * 70}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* id="skills-extra-tags" — misc tech chips */}
        <div
          id="skills-extra-tags"
          data-testid="skills-extra-tags"
          className="reveal"
          style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 40 }}
        >
          {['Web3', 'Blockchain', 'React Native', 'Microservices', 'Agile/Scrum', 'Google Cloud', 'CI/CD', 'Tailwind CSS'].map(t => (
            <span
              key={t}
              id={`skills-tag-${t.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="tag"
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
