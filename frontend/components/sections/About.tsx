'use client';

import { useEffect, useRef } from 'react';
import { Code2, Zap, Heart, Trophy } from 'lucide-react';

// quick stat cards at the bottom of the about section
// TODO: update these as the numbers grow
const stats = [
  { label: 'Years Experience', value: '5+',  icon: Code2  },
  { label: 'Bugs Fixed',       value: '20+', icon: Zap    },
  { label: 'Orgs on Platform', value: '1K+', icon: Heart  },
  { label: 'Hackathon Wins',   value: '1',   icon: Trophy },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // stagger the reveal animations so elements don't all pop in at once
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* left — bio text */}
          <div className="space-y-6">

            <div className="reveal">
              <p
                className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                // about me
              </p>
              <h2 className="section-title">
                Passionate about{' '}
                <span className="gradient-text">crafting</span>{' '}
                the web
              </h2>
            </div>

            <p className="reveal text-[var(--text-secondary)] text-lg leading-relaxed">
              I&apos;m a full-stack developer based in Helsinki, Finland. Currently at{' '}
              <span className="text-[var(--accent)] font-medium">Cyberday | Agendium Oy</span>,
              building the frontend of a cybersecurity compliance platform that over 1,000
              organizations rely on day-to-day.
            </p>

            <p className="reveal text-[var(--text-secondary)] leading-relaxed">
              I started out just curious about how websites actually work. That curiosity
              turned into a career. I like clean code, good design, and solving problems
              that actually matter to users — not just ticking story points.
            </p>

            <p className="reveal text-[var(--text-secondary)] leading-relaxed">
              Outside of work I&apos;ve been exploring Web3. In 2022 I won 2nd place at{' '}
              <span className="text-[var(--accent)] font-medium">Junction 2022</span> for
              building a marketplace that uses blockchain + Google Cloud Video Intelligence
              to make sure content creators get paid fairly based on how their work performs.
            </p>

            <div className="reveal flex gap-4 pt-2">
              <a href="#contact" className="btn-primary">Let&apos;s Work Together</a>
              <a
                href="https://github.com/Hasankc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* right — stat cards grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className="reveal glass-card p-7 space-y-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                >
                  <Icon size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <div
                    className="text-4xl font-bold gradient-text"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {value}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
