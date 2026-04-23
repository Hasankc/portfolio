'use client';
import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Loader2, RefreshCw } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

interface Repo { id:number; name:string; description:string|null; html_url:string; homepage:string|null; topics:string[]; language:string|null; stargazers_count:number; forks_count:number; fork:boolean; }

const LANG_COLORS: Record<string,string> = { TypeScript:'#3178c6', JavaScript:'#f7df1e', Python:'#3572A5', Vue:'#41b883', HTML:'#e34c26', CSS:'#563d7c' };

export function Projects() {
  const { t, isRTL } = useLang();
  const [repos,   setRepos]   = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [filter,  setFilter]  = useState('all');
  const ref = useRef<HTMLElement>(null);

  const FEATURED = [
    { id:'adverse', name:t('proj_adverse_name'), desc:t('proj_adverse_desc'), url:'https://github.com/Hasankc', topics:['react','web3','nodejs','blockchain','google-cloud'], lang:'TypeScript', award:t('proj_adverse_award') },
    { id:'tinbike', name:t('proj_tinbike_name'), desc:t('proj_tinbike_desc'), url:'https://github.com/Hasankc', topics:['react-native','nodejs','mongodb','mobile'], lang:'JavaScript', award:null },
  ];

  const load = async () => {
    setLoading(true); setError(false);
    try {
      const r = await fetch('https://api.github.com/users/Hasankc/repos?sort=updated&per_page=12', { headers:{ Accept:'application/vnd.github.v3+json' } });
      if (!r.ok) throw new Error('');
      const d: Repo[] = await r.json();
      setRepos(d.filter(x => !x.fork).slice(0,9));
    } catch { setError(true); }
    finally   { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(es => { if (es[0].isIntersecting) es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 70)); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const langs = ['all', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];
  const shown = filter === 'all' ? repos : repos.filter(r => r.language === filter);

  return (
    <section id="projects" ref={ref} data-section="projects" className="sec sec-alt" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="projects-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 10 }}>{t('proj_label')}</p>
          <h2 className="subhead">
            {t('proj_heading')}{' '}
            <span className="grad" style={{ paddingRight: 4 }}>{t('proj_heading_grad')}</span>
          </h2>
          <p style={{ color: 'var(--text2)', marginTop: 10, fontSize: 15 }}>{t('proj_subtext')}</p>
        </div>

        {/* Featured projects */}
        <div id="projects-featured" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 48 }}>
          {FEATURED.map((p, i) => (
            <div key={p.id} id={`project-featured-${p.id}`} className="reveal gborder card" style={{ padding: 26, transitionDelay:`${i*80}ms`, position:'relative', overflow:'hidden' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                    <h3 id={`project-featured-${p.id}-name`} style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, color:'var(--text1)' }}>{p.name}</h3>
                    {p.award && <span style={{ fontSize:10, padding:'3px 8px', borderRadius:20, background:'rgba(217,119,6,.1)', color:'#d97706', border:'1px solid rgba(217,119,6,.25)', fontWeight:700, fontFamily:'var(--font-mono)' }}>{p.award}</span>}
                  </div>
                  {p.lang && (
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
                      <span style={{ width:9, height:9, borderRadius:'50%', background:LANG_COLORS[p.lang]??'#888', flexShrink:0 }}/>
                      <span style={{ fontSize:12, color:'var(--text3)' }}>{p.lang}</span>
                    </div>
                  )}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on GitHub`} style={{ color:'var(--text3)', transition:'color .2s', flexShrink:0 }} onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--text3)')}>
                  <Github size={17}/>
                </a>
              </div>
              <p id={`project-featured-${p.id}-desc`} style={{ fontSize:13, color:'var(--text2)', lineHeight:1.75, marginBottom:14 }}>{p.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {p.topics.map(topic => <span key={topic} className="tag">{topic}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub repos */}
        <div id="projects-github-section" className="reveal">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:20 }}>
            <h3 style={{ fontSize:17, fontWeight:700, color:'var(--text1)' }}>
              {t('proj_from_github')}{' '}
              <a href="https://github.com/Hasankc" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:'var(--accent)', textDecoration:'none', fontWeight:500 }}>@Hasankc</a>
            </h3>
            {!loading && !error && langs.length > 1 && (
              <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                {langs.map(l => (
                  <button key={l} id={`projects-filter-${l.toLowerCase()}`} data-active={filter===l} onClick={() => setFilter(l)} style={{ padding:'5px 12px', borderRadius:6, fontSize:12, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .2s', fontWeight:500, background:filter===l?'rgba(13,148,136,.1)':'var(--card)', color:filter===l?'var(--accent)':'var(--text2)', border:`1px solid ${filter===l?'rgba(13,148,136,.3)':'var(--border2)'}` }}>
                    {l === 'all' ? (isRTL ? 'الكل' : 'All') : l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign:'center', padding:56 }}><Loader2 size={26} style={{ color:'var(--accent)', animation:'spin 1s linear infinite' }}/></div>
          ) : error ? (
            <div className="card" style={{ padding:36, textAlign:'center' }}>
              <p style={{ color:'var(--text2)', marginBottom:14, fontSize:14 }}>{t('proj_error_text')}</p>
              <button onClick={load} className="btn btn-outline" style={{ margin:'0 auto', gap:6 }}><RefreshCw size={13}/>{t('proj_retry')}</button>
            </div>
          ) : (
            <div id="projects-github-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:14 }}>
              {shown.map((repo, i) => (
                <div key={repo.id} id={`project-repo-${repo.name.toLowerCase().replace(/[^a-z0-9]/g,'-')}`} className="reveal card" style={{ padding:18, transitionDelay:`${i*50}ms` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
                    <h4 style={{ fontWeight:600, fontSize:14, color:'var(--text1)', lineHeight:1.3 }}>{repo.name}</h4>
                    <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                      {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live demo" style={{ color:'var(--text3)', transition:'color .2s' }} onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--text3)')}><ExternalLink size={13}/></a>}
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color:'var(--text3)', transition:'color .2s' }} onMouseEnter={e=>(e.currentTarget.style.color='var(--accent)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--text3)')}><Github size={13}/></a>
                    </div>
                  </div>
                  <p style={{ fontSize:12, color:'var(--text2)', lineHeight:1.6, marginBottom:10, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{repo.description ?? t('proj_no_desc')}</p>
                  {repo.topics.length > 0 && <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:10 }}>{repo.topics.slice(0,3).map(topic=><span key={topic} className="tag" style={{ fontSize:10, padding:'2px 7px' }}>{topic}</span>)}</div>}
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    {repo.language && <div style={{ display:'flex', alignItems:'center', gap:4 }}><span style={{ width:8, height:8, borderRadius:'50%', background:LANG_COLORS[repo.language]??'#888' }}/><span style={{ fontSize:11, color:'var(--text3)' }}>{repo.language}</span></div>}
                    <div style={{ display:'flex', alignItems:'center', gap:3, fontSize:11, color:'var(--text3)' }}><Star size={10}/>{repo.stargazers_count}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:3, fontSize:11, color:'var(--text3)' }}><GitFork size={10}/>{repo.forks_count}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign:'center', marginTop:28 }}>
            <a href="https://github.com/Hasankc?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Github size={14}/>{t('proj_see_all')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
