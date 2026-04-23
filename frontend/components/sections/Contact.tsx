'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

const schema = z.object({
  name:    z.string().min(2).max(80),
  email:   z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(2000),
});
type F = z.infer<typeof schema>;

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export function Contact() {
  const { t, isRTL } = useLang();
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm<F>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 85)); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onSubmit = async (data: F) => {
    try {
      const r = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) { const e = await r.json(); throw new Error(e.detail ?? 'Error'); }
      setSent(true); reset();
      toast.success(t('contact_success_title'));
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const fieldStyle = (err: boolean): React.CSSProperties => ({
    width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
    fontFamily: 'var(--font-body)', background: 'var(--bg2)', color: 'var(--text1)',
    border: `1px solid ${err ? '#ef4444' : 'var(--border2)'}`, outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
    direction: isRTL ? 'rtl' : 'ltr',
  });

  const CONTACTS = [
    { id:'email',    Icon:Mail,     label:'Email',    val:'alhasanal_qaysi@yahoo.com',    href:'mailto:alhasanal_qaysi@yahoo.com' },
    { id:'phone',    Icon:Phone,    label:'Phone',    val:'+358 45 113 9969',              href:'tel:+358451139969' },
    { id:'location', Icon:MapPin,   label:'Location', val:t('hero_location'),              href:null },
    { id:'github',   Icon:Github,   label:'GitHub',   val:'github.com/Hasankc',           href:'https://github.com/Hasankc' },
    { id:'linkedin', Icon:Linkedin, label:'LinkedIn', val:'hasanalqaysi',                  href:'https://linkedin.com/in/hasanalqaysi' },
  ];

  return (
    <section id="contact" ref={ref} data-section="contact" className="sec sec-alt" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="contact-header" className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 10 }}>{t('contact_label')}</p>
          <h2 className="subhead">
            {t('contact_heading')}{' '}
            {t('contact_heading_grad') && <span className="grad" style={{ paddingRight: 4 }}>{t('contact_heading_grad')}</span>}
          </h2>
          <p style={{ color: 'var(--text2)', marginTop: 10, maxWidth: 460, margin: '10px auto 0', fontSize: 15 }}>{t('contact_subtext')}</p>
        </div>

        <div id="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'start' }}>

          {/* Info column */}
          <div id="contact-info-col" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div id="contact-info-card" className="reveal card" style={{ padding: 26 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text1)', marginBottom: 18 }}>{t('contact_card_title')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {CONTACTS.map(({ id, Icon, label, val, href }) => (
                  <div key={id} id={`contact-info-${id}`} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(13,148,136,.09)', border: '1px solid rgba(13,148,136,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 1 }}>{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--text1)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text1)')}>
                          {val}
                        </a>
                      ) : (
                        <span style={{ fontSize: 13, color: 'var(--text1)' }}>{val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="contact-availability-card" className="reveal card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <span className="dot" />
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text1)' }}>{t('contact_open_title')}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{t('contact_open_desc')}</p>
            </div>
          </div>

          {/* Form column */}
          <div id="contact-form-col" className="reveal" style={{ transitionDelay: '100ms' }}>
            {sent ? (
              <div id="contact-success" className="card" style={{ padding: 44, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(13,148,136,.1)', border: '1px solid rgba(13,148,136,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle size={26} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 19, color: 'var(--text1)' }}>{t('contact_success_title')}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{t('contact_success_text')}</p>
                <button id="contact-success-reset" onClick={() => setSent(false)} className="btn btn-outline" style={{ marginTop: 6 }}>{t('contact_send_another')}</button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="card" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div id="contact-field-name">
                    <label htmlFor="contact-input-name" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                      {t('contact_label_name')} <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input id="contact-input-name" {...register('name')} placeholder={t('contact_ph_name')} style={fieldStyle(!!errors.name)}
                      onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.boxShadow='0 0 0 3px var(--glow)'; }}
                      onBlur={e  => { e.target.style.borderColor=errors.name?'#ef4444':'var(--border2)'; e.target.style.boxShadow='none'; }} />
                    {errors.name && <p id="contact-error-name" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t('contact_err_name')}</p>}
                  </div>
                  <div id="contact-field-email">
                    <label htmlFor="contact-input-email" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                      {t('contact_label_email')} <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <input id="contact-input-email" {...register('email')} type="email" placeholder={t('contact_ph_email')} style={fieldStyle(!!errors.email)}
                      onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.boxShadow='0 0 0 3px var(--glow)'; }}
                      onBlur={e  => { e.target.style.borderColor=errors.email?'#ef4444':'var(--border2)'; e.target.style.boxShadow='none'; }} />
                    {errors.email && <p id="contact-error-email" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t('contact_err_email')}</p>}
                  </div>
                </div>
                <div id="contact-field-subject">
                  <label htmlFor="contact-input-subject" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                    {t('contact_label_subj')} <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <input id="contact-input-subject" {...register('subject')} placeholder={t('contact_ph_subj')} style={fieldStyle(!!errors.subject)}
                    onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.boxShadow='0 0 0 3px var(--glow)'; }}
                    onBlur={e  => { e.target.style.borderColor=errors.subject?'#ef4444':'var(--border2)'; e.target.style.boxShadow='none'; }} />
                  {errors.subject && <p id="contact-error-subject" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t('contact_err_subj')}</p>}
                </div>
                <div id="contact-field-message">
                  <label htmlFor="contact-input-message" style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 5, fontWeight: 600 }}>
                    {t('contact_label_msg')} <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea id="contact-input-message" {...register('message')} rows={5} placeholder={t('contact_ph_msg')} style={{ ...fieldStyle(!!errors.message), resize: 'none' }}
                    onFocus={e => { e.target.style.borderColor='var(--accent)'; e.target.style.boxShadow='0 0 0 3px var(--glow)'; }}
                    onBlur={e  => { e.target.style.borderColor=errors.message?'#ef4444':'var(--border2)'; e.target.style.boxShadow='none'; }} />
                  {errors.message && <p id="contact-error-message" style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{t('contact_err_msg')}</p>}
                </div>
                <button id="contact-submit-btn" type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ justifyContent: 'center', gap: 7 }}>
                  {isSubmitting ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />{t('contact_sending')}</> : <><Send size={15} />{t('contact_send')}</>}
                </button>
                <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--text3)' }}>{t('contact_privacy')}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
