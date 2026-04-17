/**
 * Shared API utility for the frontend.
 * All backend calls go through these typed helpers.
 */

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BACKEND}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, detail);
  }

  return res.json() as Promise<T>;
}

// ── Contact ───────────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sendContactMessage(payload: ContactPayload) {
  return request<{ success: boolean; message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function sendChatMessage(
  messages: ChatMessage[],
  system?: string
) {
  return request<{ reply: string; success: boolean }>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages, system }),
  });
}

// ── GitHub ────────────────────────────────────────────────────────────────────
export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
    { headers: { Accept: 'application/vnd.github.v3+json' }, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new ApiError(res.status, 'GitHub API error');
  const data: GitHubRepo[] = await res.json();
  return data.filter((r) => !r.fork);
}
