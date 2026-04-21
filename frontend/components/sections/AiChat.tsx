'use client';
import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, Loader2 } from 'lucide-react';
import { useLang } from '@/components/LangProvider';

interface Msg { role: 'user' | 'assistant'; content: string; time: Date; }

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export function AiChat() {
  const { t, isRTL } = useLang();

  const INIT_MSG = t('ai_init');
  const SUGGESTED = [t('ai_s1'), t('ai_s2'), t('ai_s3'), t('ai_s4')];

  const [msgs,    setMsgs]    = useState<Msg[]>([{ role: 'assistant', content: INIT_MSG, time: new Date() }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);

  // FIX: use a ref to scroll ONLY the messages container, not the whole page
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // scroll the MESSAGES DIV to bottom — NOT window.scrollTo
  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => { scrollToBottom(); }, [msgs]);

  // update init message when language changes
  useEffect(() => {
    setMsgs([{ role: 'assistant', content: t('ai_init'), time: new Date() }]);
  }, [t('ai_init')]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) es[0].target.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 100)); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: text.trim(), time: new Date() };
    setMsgs(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const history = [...msgs, userMsg].map(({ role, content }) => ({ role, content }));
      const res = await fetch(`${BACKEND}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error('');
      const d = await res.json();
      setMsgs(p => [...p, { role: 'assistant', content: d.reply, time: new Date() }]);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: t('ai_error'), time: new Date() }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setMsgs([{ role: 'assistant', content: t('ai_init'), time: new Date() }]);
    setInput('');
  };

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section id="ai-chat" ref={sectionRef} data-section="ai-chat" className="sec" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="wrap">
        <div id="ai-chat-header" className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <p className="label" style={{ marginBottom: 10 }}>{t('ai_label')}</p>
          <h2 className="subhead">{t('ai_heading')} <span className="grad" style={{ paddingRight: 4 }}>{t('ai_heading2')}</span></h2>
          <p style={{ color: 'var(--text2)', marginTop: 10, fontSize: 15 }}>{t('ai_sub')}</p>
        </div>

        <div id="ai-chat-widget" className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="card" style={{ overflow: 'hidden', borderRadius: 16, boxShadow: '0 4px 40px rgba(13,148,136,.07)' }}>

            {/* header */}
            <div id="ai-chat-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border2)', background: 'var(--card2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text1)' }}>{t('ai_name')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span className="dot" style={{ width: 6, height: 6 }} />
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{t('ai_online')}</span>
                  </div>
                </div>
              </div>
              <button id="ai-chat-reset-btn" onClick={reset} title={t('ai_reset')} aria-label={t('ai_reset')} style={{ padding: 7, borderRadius: 8, background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>
                <RotateCcw size={15} />
              </button>
            </div>

            {/* 
              FIX: messages container scrolls internally — overflow:hidden on parent
              prevents the whole PAGE from jumping when new messages arrive.
              We use ref.scrollTop = ref.scrollHeight instead of scrollIntoView.
            */}
            <div
              id="ai-chat-messages"
              ref={messagesContainerRef}
              className="scroll-thin"
              style={{
                height: 360,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '18px 18px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {msgs.map((m, i) => (
                <div key={i} id={`ai-msg-${i}`} style={{ display: 'flex', gap: 9, alignItems: 'flex-end', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.role === 'user' ? 'var(--accent)' : 'var(--bg2)', border: '1px solid var(--border2)' }}>
                    {m.role === 'user' ? <User size={13} style={{ color: '#fff' }} /> : <Bot size={13} style={{ color: 'var(--accent)' }} />}
                  </div>
                  <div style={{ maxWidth: '78%' }}>
                    <div style={{ padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: 14, lineHeight: 1.65, background: m.role === 'user' ? 'var(--accent)' : 'var(--bg2)', color: m.role === 'user' ? '#fff' : 'var(--text1)', border: m.role === 'user' ? 'none' : '1px solid var(--border2)' }}>
                      {m.content}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3, textAlign: m.role === 'user' ? 'right' : 'left' }}>{fmt(m.time)}</div>
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg2)', border: '1px solid var(--border2)' }}>
                    <Bot size={13} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '14px 14px 14px 4px', background: 'var(--bg2)', border: '1px solid var(--border2)', display: 'flex', gap: 5, alignItems: 'center' }}>
                    <span className="td" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                    <span className="td" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                    <span className="td" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                  </div>
                </div>
              )}
            </div>

            {/* suggestions */}
            <div id="ai-chat-suggestions" style={{ padding: '8px 18px', borderTop: '1px solid var(--border2)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTED.map((s, i) => (
                <button key={i} onClick={() => send(s)} disabled={loading} style={{ fontSize: 11, padding: '4px 11px', borderRadius: 20, background: 'rgba(13,148,136,.08)', color: 'var(--accent-dk)', border: '1px solid rgba(13,148,136,.2)', cursor: 'pointer', opacity: loading ? .5 : 1, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  {s}
                </button>
              ))}
            </div>

            {/* input */}
            <div id="ai-chat-input-area" style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--border2)' }}>
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end', background: 'var(--bg2)', borderRadius: 11, padding: '9px 12px', border: '1px solid var(--border2)' }}>
                <textarea
                  id="ai-chat-textarea"
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder={t('ai_placeholder')}
                  rows={1}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 14, color: 'var(--text1)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxHeight: 100, direction: isRTL ? 'rtl' : 'ltr' }}
                />
                <button
                  id="ai-chat-send-btn"
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  style={{ width: 34, height: 34, borderRadius: 8, background: input.trim() && !loading ? 'var(--accent)' : 'var(--border2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all .2s' }}
                >
                  {loading ? <Loader2 size={14} style={{ color: 'var(--text2)', animation: 'spin 1s linear infinite' }} /> : <Send size={14} style={{ color: input.trim() ? '#fff' : 'var(--text3)' }} />}
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 7 }}>{t('ai_hint')}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
