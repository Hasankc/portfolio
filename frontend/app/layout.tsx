import type { Metadata, Viewport } from 'next';
import { Syne, Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Alhasan Al-Qaysi | Full-Stack Web Developer',
  description:
    'Full-stack developer in Helsinki, Finland. 5+ years building fast, accessible web apps with React, TypeScript, Next.js, Vue.js, Node.js and Python.',
  keywords: ['full-stack developer', 'React', 'TypeScript', 'Next.js', 'Vue.js', 'Helsinki', 'Finland', 'web developer'],
  authors: [{ name: 'Alhasan Al-Qaysi' }],
  openGraph: {
    type: 'website',
    title: 'Alhasan Al-Qaysi | Full-Stack Web Developer',
    description: 'Full-stack developer in Helsinki, Finland. Building fast, beautiful, accessible products.',
    images: [{ url: '/profile.jpg', width: 800, height: 800, alt: 'Alhasan Al-Qaysi' }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${outfit.variable}`}>
      <head>
        {/* JetBrains Mono for code elements */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--card)',
                color: 'var(--text1)',
                border: '1px solid var(--border2)',
                borderRadius: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                boxShadow: '0 4px 20px rgba(0,0,0,.08)',
              },
              success: { iconTheme: { primary: '#0d9488', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
