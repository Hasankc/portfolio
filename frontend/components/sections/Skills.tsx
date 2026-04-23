'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/components/LangProvider';

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

const COLORS: Record<Cat, string> = { Frontend:'#0d9488', Backend:'#7c3aed', Database:'#059669', Tools:'#d97706' };

export function Skills() {
  const { t, isRTL } = useLang();
  const [active,   setActive]   = useState<Cat>('Frontend');
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const CATS: { key: Cat; label: string }[] = [
    { key: 'Frontend',  label: t('skills_tab_frontend') },
    { key: 'Backend',   label: t('skills_tab_backend')  },
    { key: 'Database',  label: t('skills_tab_database') },
    { key: 'Tools',     label: t('skills_tab_tools')    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) { setAnimated(true); es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 70)); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchCat = (c: Cat) => { setAnimated(false); setActive(c); setTimeout(() => setAnimated(true), 50); };
  const shown = SKILLS.filter(s => s.cat === active);
  const c = COLORS[active];

  return (
    <section id="skills" ref={ref} data-section="skills" className="sec sec-alt" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="skills-header" className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p id="skills-label" className="label" style={{ marginBottom: 10 }}>{t('skills_label')}</p>
          <h2 id="skills-heading" className="subhead">
            {t('skills_heading')}{' '}
            <span id="skills-heading-grad" className="grad" style={{ paddingRight: 4 }}>{t('skills_heading_grad')}</span>
            {t('skills_heading_end') ? <>{' '}{t('skills_heading_end')}</> : null}
          </h2>
          <p id="skills-subtext" style={{ color: 'var(--text2)', marginTop: 10, maxWidth: 440, margin: '10px auto 0', fontSize: 15 }}>{t('skills_subtext')}</p>
        </div>

        <div id="skills-tabs" className="reveal" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {CATS.map(({ key, label }) => (
            <button key={key} id={`skills-tab-${key.toLowerCase()}`} data-active={active === key} onClick={() => switchCat(key)} style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .22s', fontFamily: 'var(--font-body)', background: active === key ? `${COLORS[key]}14` : 'var(--card)', color: active === key ? COLORS[key] : 'var(--text2)', border: `1px solid ${active === key ? COLORS[key]+'35' : 'var(--border2)'}` }}>
              {label}
            </button>
          ))}
        </div>

        <div id="skills-list" style={{ maxWidth: 660, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {shown.map((s, i) => (
            <div key={s.id} id={`skill-${s.id}`} data-skill-pct={s.pct} className="reveal card" style={{ padding: '14px 18px', transitionDelay: `${i * 55}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ fontSize: 17 }}>{s.icon}</span>
                  <span id={`skill-${s.id}-name`} style={{ fontWeight: 500, fontSize: 14, color: 'var(--text1)' }}>{s.name}</span>
                </div>
                <span id={`skill-${s.id}-pct`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: c }}>{s.pct}%</span>
              </div>
              <div id={`skill-${s.id}-track`} style={{ height: 5, borderRadius: 3, background: 'var(--bg3)', overflow: 'hidden' }}>
                <div id={`skill-${s.id}-fill`} style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${c}, ${c}aa)`, boxShadow: `0 0 8px ${c}40`, width: animated ? `${s.pct}%` : '0%', transition: `width .9s cubic-bezier(.4,0,.2,1) ${i * 70}ms` }} />
              </div>
            </div>
          ))}
        </div>

        <div id="skills-extra-tags" className="reveal" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginTop: 40 }}>
          {['Web3', 'Blockchain', 'React Native', 'Microservices', 'Agile/Scrum', 'Google Cloud', 'CI/CD', 'Tailwind CSS'].map(tag => (
            <span key={tag} id={`skills-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g,'-')}`} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
