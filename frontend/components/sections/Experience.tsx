'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

// I decided to combine work, education, and awards into one timeline
// rather than having separate sections — it tells a cleaner story
// and keeps the page from getting too long
const timeline = [
  {
    type:     'work',
    icon:     Briefcase,
    title:    'Software Developer',
    company:  'Cyberday | Agendium Oy',
    period:   '2023 – Present',
    location: 'Helsinki, Finland',
    color:    '#38bdf8',
    bullets: [
      'Build and maintain Vue.js frontend for a cybersecurity compliance platform used by 1,000+ organizations.',
      'Created a reusable component library that cut down repeated UI work across the whole app.',
      'Tracked down and fixed 20+ high-priority bugs — things breaking silently in production, edge cases in data display, broken user flows.',
      'Improved initial load performance by auditing and removing dead code + redundant API calls.',
      'Worked in Agile sprints alongside designers and backend engineers — a lot of async Slack threads and occasional messy standups.',
      'Also contributed to the Python backend: mostly REST API work and business logic to support new frontend features.',
    ],
    tech: ['Vue.js', 'Python', 'REST APIs', 'Agile/Scrum'],
  },
  {
    type:     'education',
    icon:     GraduationCap,
    title:    'ICT / Python Programme',
    company:  'Taitotalo',
    period:   'Nov 2024 – Jun 2025',
    location: 'Helsinki, Finland',
    color:    '#a78bfa',
    bullets: [
      'Focused on Python programming and broader ICT concepts. Good refresher on fundamentals.',
    ],
    tech: ['Python', 'ICT'],
  },
  {
    type:     'education',
    icon:     GraduationCap,
    title:    'Full Stack Open',
    company:  'University of Helsinki',
    period:   '2022 – 2023',
    location: 'Online',
    color:    '#a78bfa',
    bullets: [
      'Covered React, Node.js, TypeScript, GraphQL, CI/CD, containers, and testing. Probably the most practical online course I\'ve done.',
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Docker'],
  },
  {
    type:     'award',
    icon:     Trophy,
    title:    '2nd Place — TX Web3 Challenge Track',
    company:  'Junction 2022 Hackathon',
    period:   'Nov 2022',
    location: 'Helsinki, Finland',
    color:    '#fbbf24',
    bullets: [
      '48-hour hackathon. Built a marketplace MVP using blockchain + Google Cloud Video Intelligence API.',
      'The idea: content creators get paid based on actual content performance, not just flat rates. Judges liked it enough for 2nd place.',
    ],
    tech: ['React', 'Node.js', 'Web3', 'Google Cloud', 'Blockchain'],
  },
  {
    type:     'education',
    icon:     GraduationCap,
    title:    'Software Development Academy',
    company:  'Integrify',
    period:   'Jan – Jun 2022',
    location: 'Helsinki, Finland',
    color:    '#a78bfa',
    bullets: [
      'Intensive bootcamp that got me writing real full-stack code from week one. Where it all properly started.',
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16 reveal">
          <p
            className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // experience &amp; education
          </p>
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="relative">
          {/* the vertical line connecting all the cards — gradient fades out at the bottom */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-secondary), transparent)' }}
          />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="reveal relative md:pl-20">

                  {/* icon box — sits on top of the vertical line */}
                  <div
                    className="hidden md:flex absolute left-0 w-16 h-16 rounded-2xl items-center justify-center"
                    style={{
                      background: `${item.color}15`,
                      border:     `1px solid ${item.color}30`,
                      boxShadow:  `0 0 20px ${item.color}10`,
                    }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>

                  <div className="glass-card p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <p style={{ color: item.color }} className="font-medium">
                          {item.company}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">{item.location}</p>
                      </div>
                      <span
                        className="shrink-0 text-xs px-3 py-1.5 rounded-full"
                        style={{
                          background:  `${item.color}15`,
                          color:        item.color,
                          border:      `1px solid ${item.color}25`,
                          fontFamily:  'var(--font-mono)',
                        }}
                      >
                        {item.period}
                      </span>
                    </div>

                    {item.bullets.length > 0 && (
                      <ul className="space-y-2">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                            <span
                              className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                              style={{ background: item.color }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tech.map((t) => (
                        <span key={t} className="code-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
