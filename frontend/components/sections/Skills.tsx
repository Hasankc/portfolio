'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name:     string;
  level:    number;  // 0-100 — subjective self-rating, not gospel
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

// honestly these percentages are rough self-assessments.
// "90% React" doesn't mean I know every edge case — it means I'm very comfortable with it
const skills: Skill[] = [
  { name: 'React / Next.js',      level: 90, category: 'frontend'  },
  { name: 'TypeScript',           level: 85, category: 'frontend'  },
  { name: 'Vue.js',               level: 88, category: 'frontend'  },
  { name: 'HTML / CSS',           level: 95, category: 'frontend'  },
  { name: 'JavaScript (ES2024)',  level: 92, category: 'frontend'  },
  { name: 'Node.js / Express',    level: 83, category: 'backend'   },
  { name: 'Python / FastAPI',     level: 75, category: 'backend'   },
  { name: 'REST APIs',            level: 88, category: 'backend'   },
  { name: 'PostgreSQL',           level: 72, category: 'database'  },
  { name: 'MongoDB',              level: 78, category: 'database'  },
  { name: 'Git / GitHub',         level: 90, category: 'tools'     },
  { name: 'Docker',               level: 65, category: 'tools'     },
  { name: 'Azure / Google Cloud', level: 62, category: 'tools'     },
];

// each category gets its own accent colour so the tab + bars match
const categoryColors: Record<Skill['category'], string> = {
  frontend: '#38bdf8',
  backend:  '#a78bfa',
  database: '#34d399',
  tools:    '#fb923c',
};

const categoryLabels: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend:  'Backend',
  database: 'Databases',
  tools:    'Tools & Cloud',
};

const tabs: Skill['category'][] = ['frontend', 'backend', 'database', 'tools'];

// little emoji icons — nothing fancy, just makes the list easier to scan
const techIcons: Record<string, string> = {
  'React / Next.js':      '⚛️',
  'TypeScript':           '🔷',
  'Vue.js':               '💚',
  'HTML / CSS':           '🎨',
  'JavaScript (ES2024)':  '🟡',
  'Node.js / Express':    '🟢',
  'Python / FastAPI':     '🐍',
  'REST APIs':            '🔌',
  'PostgreSQL':           '🐘',
  'MongoDB':              '🍃',
  'Git / GitHub':         '🐙',
  'Docker':               '🐳',
  'Azure / Google Cloud': '☁️',
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<Skill['category']>('frontend');
  const [animated, setAnimated]   = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // when switching tabs, briefly reset animated so bars re-fill
  const handleTabChange = (tab: Skill['category']) => {
    setActiveTab(tab);
    setAnimated(false);
    setTimeout(() => setAnimated(true), 50);
  };

  const filtered = skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14 reveal">
          <p
            className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // skills &amp; technologies
          </p>
          <h2 className="section-title">
            My <span className="gradient-text">Technical</span> Stack
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            Tools I use day to day. Frontend is where I spend most of my time,
            but I can hold my own on the backend side too.
          </p>
        </div>

        {/* category tab switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={
                activeTab === tab
                  ? {
                      background: `${categoryColors[tab]}20`,
                      color:       categoryColors[tab],
                      border:      `1px solid ${categoryColors[tab]}40`,
                      boxShadow:   `0 0 20px ${categoryColors[tab]}15`,
                    }
                  : {
                      background: 'transparent',
                      color:      'var(--text-secondary)',
                      border:     '1px solid var(--border)',
                    }
              }
            >
              {categoryLabels[tab]}
            </button>
          ))}
        </div>

        {/* skill bars */}
        <div className="space-y-5">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="glass-card p-5 reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{techIcons[skill.name] ?? '🔧'}</span>
                  <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: categoryColors[activeTab], fontFamily: 'var(--font-mono)' }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* the actual bar — animates width from 0 when animated=true */}
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--border-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width:           animated ? `${skill.level}%` : '0%',
                    background:      `linear-gradient(90deg, ${categoryColors[activeTab]}, ${categoryColors[activeTab]}80)`,
                    boxShadow:       `0 0 10px ${categoryColors[activeTab]}50`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* misc tech chips at the bottom for things that don't need a full bar */}
        <div className="mt-14 flex flex-wrap justify-center gap-3 reveal">
          {['Agile / Scrum', 'Microservices', 'Web3', 'Google Cloud', 'Blockchain', 'React Native'].map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

      </div>
    </section>
  );
}
