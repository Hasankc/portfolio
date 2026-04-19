'use client';
import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, Loader2 } from 'lucide-react';

interface Msg { role: 'user' | 'assistant'; content: string; time: Date; }

const BACKEND   = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';
const SYSTEM    = "You are an AI assistant on Alhasan Al-Qaysi's portfolio. He is a full-stack developer in Helsinki with 5+ years experience. Stack: React, TypeScript, Next.js, Vue.js, Node.js, Python, PostgreSQL, MongoDB. Currently at Cyberday building compliance software for 1,000+ orgs. Won 2nd place Junction 2022 Web3 hackathon. Email: alhasanal_qaysi@yahoo.com. GitHub: Hasankc. Be friendly, concise, and helpful.";
const SUGGESTED = ['What are your main skills?', 'Tell me about your experience', 'Are you open to work?', 'What projects are you most proud of?'];
const INIT_MSG  = "Hi! 👋 I'm an AI trained on Alhasan's portfolio. Ask me anything about his skills, experience, or availability.";

export function AiChat() {
  const [msgs,    setMsgs]    = useState<Msg[]>([{ role: 'assistant', content: INIT_MSG, time: new Date() }]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // auto-scroll to newest message
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  // reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting)
          es[0].target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 100));
      },
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
        body: JSON.stringify({ messages: history, system: SYSTEM }),
      });
      if (!res.ok) throw new Error('');
      const d = await res.json();
      setMsgs(p => [...p, { role: 'assistant', content: d.reply, time: new Date() }]);
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: "Can't reach the server right now. Email Alhasan directly at alhasanal_qaysi@yahoo.com.", time: new Date() }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setMsgs([{ role: 'assistant', content: INIT_MSG, time: new Date() }]);
    setInput('');
  };

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    /* id="ai-chat" — scroll target */
    <section
      id="ai-chat"
      ref={sectionRef}
      data-section="ai-chat"
      data-testid="aichat-section"
      className="sec"
    >
      <div id="ai-chat-inner" className="wrap">

        {/* id="ai-chat-header" */}
        <div id="ai-chat-header" className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <p id="ai-chat-label" className="label" style={{ marginBottom: 10 }}>// ai assistant</p>
          <h2 id="ai-chat-heading" className="subhead">
            Ask Me <span id="ai-chat-heading-grad" className="grad" style={{ paddingRight: 4 }}>Anything</span>
          </h2>
          <p id="ai-chat-subtext" style={{ color: 'var(--text2)', marginTop: 10, fontSize: 15 }}>
            AI trained on my portfolio — ask about skills, projects, or availability.
          </p>
        </div>

        {/* id="ai-chat-widget" — the whole chat box */}
        <div id="ai-chat-widget" data-testid="ai-chat-widget" className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div id="ai-chat-card" className="card" style={{ overflow: 'hidden', borderRadius: 16, boxShadow: '0 4px 40px rgba(13,148,136,.07)' }}>

            {/* id="ai-chat-topbar" — avatar + status + reset button */}
            <div
              id="ai-chat-topbar"
              data-testid="ai-chat-topbar"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border2)', background: 'var(--card2)' }}
            >
              <div id="ai-chat-identity" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div id="ai-chat-avatar" style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} style={{ color: '#fff' }} />
                </div>
                <div id="ai-chat-meta">
                  <div id="ai-chat-name" style={{ fontWeight: 700, fontSize: 14, color: 'var(--text1)' }}>Portfolio AI</div>
                  <div id="ai-chat-status" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span id="ai-chat-status-dot" className="dot" style={{ width: 6, height: 6 }} />
                    <span id="ai-chat-status-text" style={{ fontSize: 11, color: 'var(--text3)' }}>Online</span>
                  </div>
                </div>
              </div>
              <button
                id="ai-chat-reset-btn"
                data-testid="ai-chat-reset"
                onClick={reset}
                title="Start new conversation"
                aria-label="Reset chat"
                style={{ padding: 7, borderRadius: 8, background: 'transparent', border: 'none', color: 'var(--text3)', cursor: 'pointer', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}
              >
                <RotateCcw size={15} />
              </button>
            </div>

            {/* id="ai-chat-messages" — scrollable message list */}
            <div
              id="ai-chat-messages"
              data-testid="ai-chat-messages"
              className="scroll-thin"
              style={{ height: 360, overflowY: 'auto', padding: '18px 18px 10px', display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {msgs.map((m, i) => (
                /* id="ai-msg-{i}" — individual message bubble */
                <div
                  key={i}
                  id={`ai-msg-${i}`}
                  data-testid={`ai-msg-${i}`}
                  data-msg-role={m.role}
                  style={{ display: 'flex', gap: 9, alignItems: 'flex-end', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}
                >
                  {/* id="ai-msg-{i}-avatar" */}
                  <div
                    id={`ai-msg-${i}-avatar`}
                    style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.role === 'user' ? 'var(--accent)' : 'var(--bg2)', border: '1px solid var(--border2)' }}
                  >
                    {m.role === 'user' ? <User size={13} style={{ color: '#fff' }} /> : <Bot size={13} style={{ color: 'var(--accent)' }} />}
                  </div>

                  <div id={`ai-msg-${i}-content`} style={{ maxWidth: '78%' }}>
                    {/* id="ai-msg-{i}-bubble" — the text bubble */}
                    <div
                      id={`ai-msg-${i}-bubble`}
                      style={{
                        padding: '10px 14px',
                        borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        fontSize: 14, lineHeight: 1.65,
                        background: m.role === 'user' ? 'var(--accent)' : 'var(--bg2)',
                        color: m.role === 'user' ? '#fff' : 'var(--text1)',
                        border: m.role === 'user' ? 'none' : '1px solid var(--border2)',
                      }}
                    >
                      {m.content}
                    </div>
                    {/* id="ai-msg-{i}-time" — timestamp */}
                    <div
                      id={`ai-msg-${i}-time`}
                      style={{ fontSize: 10, color: 'var(--text3)', marginTop: 3, textAlign: m.role === 'user' ? 'right' : 'left' }}
                    >
                      {fmt(m.time)}
                    </div>
                  </div>
                </div>
              ))}

              {/* id="ai-chat-typing" — animated typing dots while loading */}
              {loading && (
                <div id="ai-chat-typing" data-testid="ai-chat-typing" style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
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

              {/* id="ai-chat-bottom" — invisible scroll target */}
              <div id="ai-chat-bottom" ref={bottomRef} />
            </div>

            {/* id="ai-chat-suggestions" — quick question chips */}
            <div
              id="ai-chat-suggestions"
              data-testid="ai-chat-suggestions"
              style={{ padding: '8px 18px', borderTop: '1px solid var(--border2)', display: 'flex', flexWrap: 'wrap', gap: 6 }}
            >
              {SUGGESTED.map((s, i) => (
                <button
                  key={s}
                  id={`ai-suggestion-${i}`}
                  data-testid={`ai-suggestion-${i}`}
                  onClick={() => send(s)}
                  disabled={loading}
                  style={{ fontSize: 11, padding: '4px 11px', borderRadius: 20, background: 'rgba(13,148,136,.08)', color: 'var(--accent-dk)', border: '1px solid rgba(13,148,136,.2)', cursor: 'pointer', transition: 'opacity .2s', opacity: loading ? .5 : 1, fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* id="ai-chat-input-area" — text input + send button */}
            <div id="ai-chat-input-area" style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--border2)' }}>
              <div
                id="ai-chat-input-row"
                style={{ display: 'flex', gap: 9, alignItems: 'flex-end', background: 'var(--bg2)', borderRadius: 11, padding: '9px 12px', border: '1px solid var(--border2)' }}
              >
                {/* id="ai-chat-textarea" — where you type */}
                <textarea
                  id="ai-chat-textarea"
                  data-testid="ai-chat-textarea"
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
                  placeholder="Ask something about Alhasan…"
                  rows={1}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 14, color: 'var(--text1)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxHeight: 100 }}
                />
                {/* id="ai-chat-send-btn" — sends the message */}
                <button
                  id="ai-chat-send-btn"
                  data-testid="ai-chat-send-btn"
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  style={{ width: 34, height: 34, borderRadius: 8, background: input.trim() && !loading ? 'var(--accent)' : 'var(--border2)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all .2s' }}
                >
                  {loading
                    ? <Loader2 size={14} style={{ color: 'var(--text2)', animation: 'spin 1s linear infinite' }} />
                    : <Send size={14} style={{ color: input.trim() ? '#fff' : 'var(--text3)' }} />
                  }
                </button>
              </div>
              <p id="ai-chat-hint" style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 7 }}>
                Powered by AI · Enter to send · Shift+Enter for new line
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
