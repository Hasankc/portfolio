'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Loader2, RefreshCw } from 'lucide-react';

interface GitHubRepo {
  id:               number;
  name:             string;
  description:      string | null;
  html_url:         string;
  homepage:         string | null;
  topics:           string[];
  language:         string | null;
  stargazers_count: number;
  forks_count:      number;
  updated_at:       string;
  fork:             boolean;
}

// these two always show at the top regardless of what the GitHub API returns —
// they're the projects I'm most proud of and want recruiters to see first
const featured = [
  {
    name:        'Adverse Marketplace',
    description: 'Web3 marketplace that ensures fair pay for content creators based on actual content performance — not flat rates. Built during Junction 2022 hackathon in 48 hours. Won 2nd place in the TX Web3 challenge track.',
    html_url:    'https://github.com/Hasankc',
    homepage:    null as string | null,
    topics:      ['react', 'web3', 'nodejs', 'blockchain', 'google-cloud'],
    language:    'TypeScript',
    award:       '🏆 Junction 2022 — 2nd Place',
  },
  {
    name:        'TinBike',
    description: 'Mobile app concept for motorcyclists — think Tinder but for finding riding buddies. Shows nearby riders on a map and lets you organise group rides. Built with React Native and MongoDB.',
    html_url:    'https://github.com/Hasankc',
    homepage:    null as string | null,
    topics:      ['react-native', 'nodejs', 'mongodb', 'mobile'],
    language:    'JavaScript',
    award:       null as string | null,
  },
];

// GitHub uses these colours for language dots — keeping them consistent
// with what people see on the actual GitHub profile
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python:     '#3572A5',
  Vue:        '#41b883',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Rust:       '#dea584',
  Go:         '#00ADD8',
};

export function Projects() {
  const [repos,   setRepos]   = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [filter,  setFilter]  = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        'https://api.github.com/users/Hasankc/repos?sort=updated&per_page=12',
        { headers: { Accept: 'application/vnd.github.v3+json' } },
      );
      if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
      const data: GitHubRepo[] = await res.json();
      // filter out forks — only show original work
      setRepos(data.filter((r) => !r.fork).slice(0, 9));
    } catch (err) {
      console.error('Failed to load GitHub repos:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80);
          });
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // build language filter options from whatever the API returned
  const languages = [
    'all',
    ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])),
  ];

  const filtered =
    filter === 'all' ? repos : repos.filter((r) => r.language === filter);

  return (
    <section id="projects" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 reveal">
          <p
            className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // projects
          </p>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            A mix of hackathon projects, side projects, and things I built to solve
            actual problems. More on GitHub.
          </p>
        </div>

        {/* featured projects — always visible at the top */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {featured.map((proj, i) => (
            <div
              key={proj.name}
              className="reveal gradient-border glass-card p-6 space-y-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {proj.name}
                    </h3>
                    {proj.award && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(251,191,36,0.12)',
                          color:      '#fbbf24',
                          border:     '1px solid rgba(251,191,36,0.25)',
                        }}
                      >
                        {proj.award}
                      </span>
                    )}
                  </div>
                  {proj.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: languageColors[proj.language] ?? '#888' }}
                      />
                      <span className="text-xs text-[var(--text-muted)]">{proj.language}</span>
                    </div>
                  )}
                </div>
                <a
                  href={proj.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all hover:text-[var(--accent)] text-[var(--text-muted)]"
                  aria-label={`${proj.name} on GitHub`}
                >
                  <Github size={18} />
                </a>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.topics.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* live GitHub repos section */}
        <div className="reveal">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">
              From GitHub
              <a
                href="https://github.com/Hasankc"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-[var(--accent)] hover:underline"
              >
                @Hasankc
              </a>
            </h3>

            {/* only show the language filter if the API loaded successfully */}
            {!loading && !error && languages.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setFilter(lang)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={
                      filter === lang
                        ? { background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border)' }
                        : { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }
                    }
                  >
                    {lang === 'all' ? 'All' : lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-[var(--accent)]" />
            </div>
          ) : error ? (
            // GitHub API occasionally rate-limits unauthenticated requests — just show a retry
            <div className="glass-card p-8 text-center space-y-4">
              <p className="text-[var(--text-secondary)]">
                Couldn&apos;t load repos right now — GitHub might be rate limiting us.
              </p>
              <button onClick={fetchRepos} className="btn-secondary inline-flex items-center gap-2">
                <RefreshCw size={14} /> Try again
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((repo, i) => (
                <div
                  key={repo.id}
                  className="glass-card p-5 space-y-3 reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-[var(--text-primary)] leading-tight">
                      {repo.name}
                    </h4>
                    <div className="flex gap-1 shrink-0">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                          aria-label="Live demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {repo.description ?? 'No description.'}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((t) => (
                        <span key={t} className="tag text-xs">{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-1">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: languageColors[repo.language] ?? '#888' }}
                        />
                        <span className="text-xs text-[var(--text-muted)]">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Star size={11} /><span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <GitFork size={11} /><span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href="https://github.com/Hasankc?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Github size={15} />
              See all 31 repos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
