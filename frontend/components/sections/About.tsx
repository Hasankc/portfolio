'use client';
import { useEffect, useRef } from 'react';
import { Code2, Zap, Users, Trophy } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

export function About() {
  const { t, isRTL } = useLang();
  const ref = useRef<HTMLElement>(null);

  const STATS = [
    { id: 'years',  v: '5+',  label: t('about_stat_years'),  Icon: Code2,  color: '#0d9488' },
    { id: 'bugs',   v: '50+', label: t('about_stat_bugs'),   Icon: Zap,    color: '#d97706' },
    { id: 'orgs',   v: '1K+', label: t('about_stat_orgs'),   Icon: Users,  color: '#7c3aed' },
    { id: 'awards', v: '1',   label: t('about_stat_awards'), Icon: Trophy, color: '#059669' },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 90)); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} data-section="about" className="sec" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '48px 64px', alignItems: 'center' }}>

          {/* Text */}
          <div id="about-text" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div id="about-header" className="reveal">
              <p id="about-label" className="label" style={{ marginBottom: 10 }}>{t('about_section_label')}</p>
              <h2 id="about-heading" className="subhead">
                {t('about_heading')}{' '}
                <span id="about-heading-grad" className="grad" style={{ paddingRight: 4 }}>{t('about_heading_grad')}</span>
                {t('about_heading_end') ? <>{' '}{t('about_heading_end')}</> : null}
              </h2>
            </div>
            <p id="about-p1" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>{t('about_p1')}</p>
            <p id="about-p2" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>{t('about_p2')}</p>
            <p id="about-p3" className="reveal" style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85 }}>{t('about_p3')}</p>
            <div id="about-cta-buttons" className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
              <a id="about-cta-contact" href="#contact" className="btn btn-primary">{t('about_cta_work')}</a>
              <a id="about-cta-github" href="https://github.com/Hasankc" target="_blank" rel="noopener noreferrer" className="btn btn-outline">{t('about_cta_github')}</a>
            </div>
          </div>

          {/* Stats grid */}
          <div id="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {STATS.map(({ id, v, label, Icon, color }, i) => (
              <div key={id} id={`about-stat-${id}`} className="reveal card" style={{ padding: 22, transitionDelay: `${i * 80}ms` }}>
                <div id={`about-stat-${id}-icon`} style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div id={`about-stat-${id}-value`} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, color, lineHeight: 1 }}>{v}</div>
                <div id={`about-stat-${id}-label`} style={{ fontSize: 12, color: 'var(--text2)', marginTop: 6, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
