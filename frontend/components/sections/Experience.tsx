'use client';
import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

export function Experience() {
  const { t, isRTL } = useLang();
  const ref = useRef<HTMLElement>(null);

  const ITEMS = [
    {
      id: 'cyberday', icon: Briefcase, color: '#0d9488', type: 'work',
      title: t('exp_cyberday_title'), org: t('exp_cyberday_org'),
      period: t('exp_cyberday_period'), location: t('exp_cyberday_loc'),
      bullets: [t('exp_cyberday_b1'),t('exp_cyberday_b2'),t('exp_cyberday_b3'),t('exp_cyberday_b4'),t('exp_cyberday_b5'),t('exp_cyberday_b6')],
      tech: ['Vue.js','Python','REST APIs','Agile/Scrum','Git'],
    },
    {
      id: 'taitotalo', icon: GraduationCap, color: '#7c3aed', type: 'education',
      title: t('exp_taitotalo_title'), org: t('exp_taitotalo_org'),
      period: t('exp_taitotalo_period'), location: t('exp_taitotalo_loc'),
      bullets: [t('exp_taitotalo_b1')],
      tech: ['Python','ICT'],
    },
    {
      id: 'fso', icon: GraduationCap, color: '#7c3aed', type: 'education',
      title: t('exp_fso_title'), org: t('exp_fso_org'),
      period: t('exp_fso_period'), location: t('exp_fso_loc'),
      bullets: [t('exp_fso_b1')],
      tech: ['React','Node.js','TypeScript','GraphQL','Docker'],
    },
    {
      id: 'junction2022', icon: Trophy, color: '#d97706', type: 'award',
      title: t('exp_junction_title'), org: t('exp_junction_org'),
      period: t('exp_junction_period'), location: t('exp_junction_loc'),
      bullets: [t('exp_junction_b1'),t('exp_junction_b2')],
      tech: ['React','Node.js','Web3','Google Cloud','Blockchain'],
    },
    {
      id: 'integrify', icon: GraduationCap, color: '#7c3aed', type: 'education',
      title: t('exp_integrify_title'), org: t('exp_integrify_org'),
      period: t('exp_integrify_period'), location: t('exp_integrify_loc'),
      bullets: [t('exp_integrify_b1')],
      tech: ['JavaScript','React','Node.js','PostgreSQL'],
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 100)); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} data-section="experience" className="sec" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="experience-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 10 }}>{t('exp_label')}</p>
          <h2 className="subhead">
            {t('exp_heading')}{' '}
            <span className="grad" style={{ paddingRight: 4 }}>{t('exp_heading_grad')}</span>
          </h2>
        </div>

        <div id="experience-timeline" style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.id} id={`exp-${item.id}`} data-exp-type={item.type} className="reveal" style={{ display: 'flex', gap: 16, transitionDelay: `${i * 95}ms` }}>
                <div id={`exp-${item.id}-icon`} style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 13, background: `${item.color}12`, border: `1px solid ${item.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <div id={`exp-${item.id}-card`} className="card" style={{ flex: 1, padding: 22 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                    <div>
                      <div id={`exp-${item.id}-title`} style={{ fontWeight: 700, fontSize: 15, color: 'var(--text1)' }}>{item.title}</div>
                      <div id={`exp-${item.id}-org`}   style={{ fontSize: 13, color: item.color, fontWeight: 600, marginTop: 2 }}>{item.org}</div>
                      <div id={`exp-${item.id}-loc`}   style={{ fontSize: 12, color: 'var(--text3)', marginTop: 1 }}>{item.location}</div>
                    </div>
                    <span id={`exp-${item.id}-period`} style={{ fontSize: 11, padding: '4px 11px', borderRadius: 20, background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}22`, fontFamily: 'var(--font-mono)', fontWeight: 600, height: 'fit-content', whiteSpace: 'nowrap' }}>
                      {item.period}
                    </span>
                  </div>
                  <ul id={`exp-${item.id}-bullets`} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                    {item.bullets.map((b, j) => (
                      <li key={j} id={`exp-${item.id}-b${j}`} style={{ display: 'flex', gap: 9, fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 7 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div id={`exp-${item.id}-tech`} style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {item.tech.map(tech => (
                      <span key={tech} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 5, background: 'var(--bg2)', color: 'var(--text2)', fontFamily: 'var(--font-mono)', border: '1px solid var(--border2)', fontWeight: 500 }}>{tech}</span>
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
