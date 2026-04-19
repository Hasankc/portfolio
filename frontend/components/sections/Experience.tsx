'use client';
import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

const ITEMS = [
  {
    id: 'cyberday', icon: Briefcase, color: '#0d9488', type: 'work',
    title: 'Software Developer', org: 'Cyberday | Agendium Oy',
    period: '2023 – Present', location: 'Helsinki, Finland',
    bullets: [
      'Built and maintained Vue.js frontend for a cybersecurity compliance platform used by 1,000+ organizations.',
      'Created a reusable component library that cut repeated UI work across the entire app.',
      'Found and fixed 50+ high-priority bugs — silent failures, broken data displays, edge-case crashes.',
      'Improved initial load performance by removing dead code and reducing redundant API calls.',
      'Contributed to Python backend: REST API design and business logic supporting new frontend features.',
      'Worked in Agile sprints with designers and backend engineers.',
    ],
    tech: ['Vue.js', 'Python', 'REST APIs', 'Agile/Scrum', 'Git'],
  },
  {
    id: 'taitotalo', icon: GraduationCap, color: '#7c3aed', type: 'education',
    title: 'ICT / Python Programme', org: 'Taitotalo',
    period: 'Nov 2024 – Jun 2025', location: 'Helsinki, Finland',
    bullets: ['Python programming and broader ICT fundamentals.'],
    tech: ['Python', 'ICT'],
  },
  {
    id: 'fso', icon: GraduationCap, color: '#7c3aed', type: 'education',
    title: 'Full Stack Open', org: 'University of Helsinki',
    period: '2022 – 2023', location: 'Online',
    bullets: ['React, Node.js, TypeScript, GraphQL, CI/CD, containers, testing. One of the best online courses I\'ve done.'],
    tech: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Docker'],
  },
  {
    id: 'junction2022', icon: Trophy, color: '#d97706', type: 'award',
    title: '2nd Place — TX Web3 Challenge', org: 'Junction 2022 Hackathon',
    period: 'Nov 2022', location: 'Helsinki, Finland',
    bullets: [
      '48-hour hackathon. Built a Web3 marketplace + Google Cloud Video Intelligence ensuring fair pay for content creators.',
      'Judges liked the concept enough for 2nd place in the TX Web3 challenge track.',
    ],
    tech: ['React', 'Node.js', 'Web3', 'Google Cloud', 'Blockchain'],
  },
  {
    id: 'integrify', icon: GraduationCap, color: '#7c3aed', type: 'education',
    title: 'Software Development Academy', org: 'Integrify',
    period: 'Jan – Jun 2022', location: 'Helsinki, Finland',
    bullets: ['Intensive bootcamp — real full-stack code from week one. Where it all properly started.'],
    tech: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
  },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting)
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 100));
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    /* id="experience" — scroll target */
    <section
      id="experience"
      ref={ref}
      data-section="experience"
      data-testid="experience-section"
      className="sec"
    >
      <div id="experience-inner" className="wrap">

        {/* id="experience-header" */}
        <div id="experience-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p id="experience-label" className="label" style={{ marginBottom: 10 }}>// journey</p>
          <h2 id="experience-heading" className="subhead">
            Experience &amp;{' '}
            <span id="experience-heading-grad" className="grad" style={{ paddingRight: 4 }}>Education</span>
          </h2>
        </div>

        {/* id="experience-timeline" — the full list of items */}
        <div
          id="experience-timeline"
          data-testid="experience-timeline"
          style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              /* id="exp-{id}" — individual timeline entry */
              <div
                key={item.id}
                id={`exp-${item.id}`}
                data-testid={`exp-${item.id}`}
                data-exp-type={item.type}
                data-exp-org={item.org}
                className="reveal"
                style={{ display: 'flex', gap: 16, transitionDelay: `${i * 95}ms` }}
              >
                {/* id="exp-{id}-icon" — colored icon on the left */}
                <div
                  id={`exp-${item.id}-icon`}
                  style={{
                    flexShrink: 0, width: 52, height: 52, borderRadius: 13,
                    background: `${item.color}12`, border: `1px solid ${item.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
                  }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>

                {/* id="exp-{id}-card" — the content card */}
                <div id={`exp-${item.id}-card`} className="card" style={{ flex: 1, padding: 22 }}>

                  {/* id="exp-{id}-header" — title + period badge */}
                  <div id={`exp-${item.id}-header`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                    <div id={`exp-${item.id}-meta`}>
                      <div id={`exp-${item.id}-title`} style={{ fontWeight: 700, fontSize: 15, color: 'var(--text1)' }}>{item.title}</div>
                      <div id={`exp-${item.id}-org`} style={{ fontSize: 13, color: item.color, fontWeight: 600, marginTop: 2 }}>{item.org}</div>
                      <div id={`exp-${item.id}-location`} style={{ fontSize: 12, color: 'var(--text3)', marginTop: 1 }}>{item.location}</div>
                    </div>
                    <span
                      id={`exp-${item.id}-period`}
                      style={{ fontSize: 11, padding: '4px 11px', borderRadius: 20, background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}22`, fontFamily: 'var(--font-mono)', fontWeight: 600, height: 'fit-content', whiteSpace: 'nowrap' }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* id="exp-{id}-bullets" — bullet points */}
                  <ul id={`exp-${item.id}-bullets`} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                    {item.bullets.map((b, j) => (
                      <li
                        key={j}
                        id={`exp-${item.id}-bullet-${j}`}
                        style={{ display: 'flex', gap: 9, fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 7 }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* id="exp-{id}-tech" — tech stack chips */}
                  <div id={`exp-${item.id}-tech`} style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {item.tech.map(t => (
                      <span
                        key={t}
                        id={`exp-${item.id}-tech-${t.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        style={{ fontSize: 10, padding: '2px 8px', borderRadius: 5, background: 'var(--bg2)', color: 'var(--text2)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border2)', fontWeight: 500 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
