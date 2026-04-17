'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, Loader2 } from 'lucide-react';

interface Message {
  role:      'user' | 'assistant';
  content:   string;
  timestamp: Date;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

// quick-fire questions shown as chips — saves people having to think of something to ask
const SUGGESTED = [
  'What are your main skills?',
  'Tell me about your experience',
  'What projects have you worked on?',
  'Are you open to new roles?',
];

// this gets sent to the backend as the system prompt — gives the AI context
// about who Alhasan is so the answers are actually useful
const SYSTEM_CONTEXT = `
You are an AI assistant on Alhasan Al-Qaysi's portfolio website.
Alhasan is a full-stack web developer based in Helsinki, Finland with 2+ years of experience.
Tech: React, TypeScript, Next.js, Vue.js, Node.js, Python/FastAPI, PostgreSQL, MongoDB, Docker, Azure, Google Cloud.
Currently at Cyberday | Agendium Oy building a cybersecurity compliance platform used by 1,000+ organizations.
Won 2nd place at Junction 2022 for a Web3 marketplace project.
Languages: English (working proficiency), Finnish (B2).
Contact: alhasanal_qaysi@yahoo.com | GitHub: Hasankc
Be friendly and keep answers short — this is a portfolio chat, not a CV parser.
`.trim();

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role:      'assistant',
      content:   "Hi! 👋 I'm an AI that knows Alhasan's portfolio pretty well. Ask me anything about his skills, experience, or availability.",
      timestamp: new Date(),
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // scroll to bottom whenever a new message lands
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // send the full message history so the AI has context for follow-up questions
      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: history, system: SYSTEM_CONTEXT }),
      });

      if (!res.ok) throw new Error(`API responded with ${res.status}`);

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply, timestamp: new Date() },
      ]);
    } catch (err) {
      console.error('Chat API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role:      'assistant',
          content:   "Looks like the server is unreachable right now. You can reach Alhasan directly at alhasanal_qaysi@yahoo.com.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  // Enter sends, Shift+Enter adds a newline — standard chat UX
  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const reset = () => {
    setMessages([{
      role:      'assistant',
      content:   "Hi! 👋 I'm an AI that knows Alhasan's portfolio pretty well. Ask me anything about his skills, experience, or availability.",
      timestamp: new Date(),
    }]);
    setInput('');
  };

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <section id="ai-chat" ref={sectionRef} className="section-padding">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12 reveal">
          <p
            className="text-[var(--accent)] text-sm mb-3 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            // ai assistant
          </p>
          <h2 className="section-title">
            Ask Me <span className="gradient-text">Anything</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4">
            Powered by AI — trained on my portfolio. Ask about my stack, projects, or whether I&apos;m available.
          </p>
        </div>

        <div className="reveal glass-card overflow-hidden">

          {/* chat header bar */}
          <div
            className="flex items-center justify-between px-5 py-3.5 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent-glow)', border: '1px solid var(--border)' }}
              >
                <Sparkles size={16} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">Portfolio AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="glow-dot scale-75" />
                  <span className="text-xs text-[var(--text-muted)]">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={reset}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Reset conversation"
              title="Start a new conversation"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          {/* message list */}
          <div className="h-96 overflow-y-auto p-5 space-y-4 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* avatar dot */}
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-[var(--accent)] text-[#080c10]'
                      : 'bg-[var(--accent-glow)] text-[var(--accent)]'
                  }`}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                </div>

                <div className={`max-w-[80%] ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                  <div
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: 'var(--accent)', color: '#080c10', borderBottomRightRadius: '4px' }
                        : { background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderBottomLeftRadius: '4px' }
                    }
                  >
                    {msg.content}
                  </div>
                  <p className={`text-xs text-[var(--text-muted)] mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {fmt(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* typing indicator — three bouncing dots */}
            {loading && (
              <div className="flex items-end gap-3">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent-glow)', border: '1px solid var(--border)' }}
                >
                  <Bot size={13} className="text-[var(--accent)]" />
                </div>
                <div
                  className="rounded-2xl px-5 py-4 flex gap-1.5 items-center"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderBottomLeftRadius: '4px' }}
                >
                  <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent)]" />
                </div>
              </div>
            )}

            {/* invisible div we scroll into view on new messages */}
            <div ref={bottomRef} />
          </div>

          {/* suggested question chips */}
          <div
            className="px-5 py-3 border-t flex flex-wrap gap-2"
            style={{ borderColor: 'var(--border)' }}
          >
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
                style={{
                  background: 'var(--accent-glow)',
                  color:      'var(--accent)',
                  border:     '1px solid var(--border)',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* input box */}
          <div className="px-5 pb-5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <div
              className="flex items-end gap-3 rounded-xl p-3"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask something about Alhasan…"
                rows={1}
                className="flex-1 bg-transparent resize-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none leading-relaxed"
                style={{ maxHeight: '120px', fontFamily: 'var(--font-body)' }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: input.trim() && !loading ? 'var(--accent)' : 'var(--border)',
                  color:      input.trim() && !loading ? '#080c10'      : 'var(--text-muted)',
                }}
                aria-label="Send message"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
              Powered by AI · Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
