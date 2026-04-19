'use client';
import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Loader2, RefreshCw } from 'lucide-react';

interface Repo {
  id: number; name: string; description: string | null;
  html_url: string; homepage: string | null; topics: string[];
  language: string | null; stargazers_count: number; forks_count: number; fork: boolean;
}

const FEATURED = [
  {
    id: 'adverse-marketplace',
    name: 'Adverse Marketplace',
    desc: 'Web3 marketplace ensuring fair pay for content creators based on actual performance. Built with React, Node.js, blockchain, and Google Cloud Video Intelligence API in 48 hours at Junction 2022.',
    url: 'https://github.com/Hasankc',
    topics: ['react', 'web3', 'nodejs', 'blockchain', 'google-cloud'],
    lang: 'TypeScript',
    award: '🏆 Junction 2022 — 2nd Place',
  },
  {
    id: 'tinbike',
    name: 'TinBike',
    desc: 'Mobile app concept for motorcyclists — connects nearby riders on a map and enables group rides. Think Tinder, but for finding riding buddies.',
    url: 'https://github.com/Hasankc',
    topics: ['react-native', 'nodejs', 'mongodb', 'mobile'],
    lang: 'JavaScript',
    award: null,
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3572A5',
  Vue: '#41b883', HTML: '#e34c26', CSS: '#563d7c',
};

export function Projects() {
  const [repos,   setRepos]   = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [filter,  setFilter]  = useState('all');
  const ref = useRef<HTMLElement>(null);

  const load = async () => {
    setLoading(true); setError(false);
    try {
      const r = await fetch('https://api.github.com/users/Hasankc/repos?sort=updated&per_page=12', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (!r.ok) throw new Error('');
      const d: Repo[] = await r.json();
      setRepos(d.filter(x => !x.fork).slice(0, 9));
    } catch { setError(true); }
    finally   { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting)
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 70));
      },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const langs = ['all', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];
  const shown = filter === 'all' ? repos : repos.filter(r => r.language === filter);

  return (
    /* id="projects" — scroll target */
    <section
      id="projects"
      ref={ref}
      data-section="projects"
      data-testid="projects-section"
      className="sec sec-alt"
    >
      <div id="projects-inner" className="wrap">

        {/* id="projects-header" */}
        <div id="projects-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p id="projects-label" className="label" style={{ marginBottom: 10 }}>// projects</p>
          <h2 id="projects-heading" className="subhead">
            Things I&apos;ve <span id="projects-heading-grad" className="grad" style={{ paddingRight: 4 }}>Built</span>
          </h2>
          <p id="projects-subtext" style={{ color: 'var(--text2)', marginTop: 10, fontSize: 15 }}>
            Hackathon projects, side work, and professional builds.
          </p>
        </div>

        {/* id="projects-featured" — always-visible highlight cards */}
        <div
          id="projects-featured"
          data-testid="projects-featured"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 48 }}
        >
          {FEATURED.map((p, i) => (
            <div
              key={p.id}
              id={`project-featured-${p.id}`}
              data-testid={`project-featured-${p.id}`}
              data-project-name={p.name}
              className="reveal gborder card"
              style={{ padding: 26, transitionDelay: `${i * 80}ms`, position: 'relative', overflow: 'hidden' }}
            >
              <div id={`project-featured-${p.id}-header`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 id={`project-featured-${p.id}-name`} style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text1)' }}>{p.name}</h3>
                    {p.award && (
                      <span id={`project-featured-${p.id}-award`} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 20, background: 'rgba(217,119,6,.1)', color: '#d97706', border: '1px solid rgba(217,119,6,.25)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {p.award}
                      </span>
                    )}
                  </div>
                  {p.lang && (
                    <div id={`project-featured-${p.id}-lang`} style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: LANG_COLORS[p.lang] ?? '#888', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>{p.lang}</span>
                    </div>
                  )}
                </div>
                <a
                  id={`project-featured-${p.id}-github-link`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on GitHub`}
                  style={{ color: 'var(--text3)', transition: 'color .2s', flexShrink: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
                >
                  <Github size={17} />
                </a>
              </div>
              <p id={`project-featured-${p.id}-desc`} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 14 }}>{p.desc}</p>
              <div id={`project-featured-${p.id}-topics`} style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.topics.map(t => (
                  <span key={t} id={`project-featured-${p.id}-topic-${t}`} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* id="projects-github-section" — live GitHub repos */}
        <div id="projects-github-section" className="reveal">

          {/* id="projects-github-header" — title + language filter */}
          <div id="projects-github-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <h3 id="projects-github-title" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text1)' }}>
              From GitHub{' '}
              <a id="projects-github-username" href="https://github.com/Hasankc" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>@Hasankc</a>
            </h3>

            {/* id="projects-lang-filter" — language filter buttons */}
            {!loading && !error && langs.length > 1 && (
              <div id="projects-lang-filter" data-testid="projects-lang-filter" style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {langs.map(l => (
                  <button
                    key={l}
                    id={`projects-filter-${l.toLowerCase()}`}
                    data-testid={`projects-filter-${l.toLowerCase()}`}
                    data-active={filter === l}
                    onClick={() => setFilter(l)}
                    style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all .2s', fontWeight: 500, background: filter === l ? 'rgba(13,148,136,.1)' : 'var(--card)', color: filter === l ? 'var(--accent)' : 'var(--text2)', border: `1px solid ${filter === l ? 'rgba(13,148,136,.3)' : 'var(--border2)'}` }}
                  >
                    {l === 'all' ? 'All' : l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* id="projects-github-loading" */}
          {loading ? (
            <div id="projects-github-loading" data-testid="projects-loading" style={{ textAlign: 'center', padding: 56 }}>
              <Loader2 size={26} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : error ? (
            /* id="projects-github-error" */
            <div id="projects-github-error" data-testid="projects-error" className="card" style={{ padding: 36, textAlign: 'center' }}>
              <p id="projects-error-text" style={{ color: 'var(--text2)', marginBottom: 14, fontSize: 14 }}>Couldn&apos;t load GitHub repos right now.</p>
              <button id="projects-retry-btn" data-testid="projects-retry" onClick={load} className="btn btn-outline" style={{ margin: '0 auto', gap: 6 }}>
                <RefreshCw size={13} />Retry
              </button>
            </div>
          ) : (
            /* id="projects-github-grid" — the repo cards */
            <div id="projects-github-grid" data-testid="projects-github-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {shown.map((repo, i) => (
                /* id="project-repo-{name}" — individual repo card */
                <div
                  key={repo.id}
                  id={`project-repo-${repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  data-testid={`project-repo-${repo.id}`}
                  data-repo-name={repo.name}
                  data-repo-lang={repo.language ?? 'none'}
                  className="reveal card"
                  style={{ padding: 18, transitionDelay: `${i * 50}ms` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 9 }}>
                    <h4 id={`repo-${repo.id}-name`} style={{ fontWeight: 600, fontSize: 14, color: 'var(--text1)', lineHeight: 1.3 }}>{repo.name}</h4>
                    <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                      {repo.homepage && (
                        <a id={`repo-${repo.id}-live`} href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live demo" style={{ color: 'var(--text3)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <a id={`repo-${repo.id}-github`} href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`${repo.name} on GitHub`} style={{ color: 'var(--text3)', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>
                        <Github size={13} />
                      </a>
                    </div>
                  </div>
                  <p id={`repo-${repo.id}-desc`} style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {repo.description ?? 'No description.'}
                  </p>
                  {repo.topics.length > 0 && (
                    <div id={`repo-${repo.id}-topics`} style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                      {repo.topics.slice(0, 3).map(t => (
                        <span key={t} id={`repo-${repo.id}-topic-${t}`} className="tag" style={{ fontSize: 10, padding: '2px 7px' }}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div id={`repo-${repo.id}-meta`} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {repo.language && (
                      <div id={`repo-${repo.id}-lang`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANG_COLORS[repo.language] ?? '#888' }} />
                        <span style={{ fontSize: 11, color: 'var(--text3)' }}>{repo.language}</span>
                      </div>
                    )}
                    <div id={`repo-${repo.id}-stars`} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--text3)' }}>
                      <Star size={10} />{repo.stargazers_count}
                    </div>
                    <div id={`repo-${repo.id}-forks`} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--text3)' }}>
                      <GitFork size={10} />{repo.forks_count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* id="projects-see-all" — link to full GitHub profile */}
          <div id="projects-see-all" style={{ textAlign: 'center', marginTop: 28 }}>
            <a
              id="projects-see-all-link"
              data-testid="projects-see-all"
              href="https://github.com/Hasankc?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Github size={14} />See all repositories
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
