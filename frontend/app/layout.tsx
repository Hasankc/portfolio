import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CursorGlow } from '@/components/CursorGlow';
import { StarField } from '@/components/StarField';

export const metadata: Metadata = {
  title: 'Alhasan Al-Qaysi | Full-Stack Web Developer',
  description:
    'Full-stack web developer based in Helsinki, Finland. Specializing in React, TypeScript, Next.js, Vue.js, Node.js and Python. Building fast, beautiful, and accessible web applications.',
  keywords: [
    'full-stack developer',
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'Helsinki',
    'Finland',
    'web developer',
    'Vue.js',
  ],
  authors: [{ name: 'Alhasan Al-Qaysi' }],
  creator: 'Alhasan Al-Qaysi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hasankc.netlify.app',
    title: 'Alhasan Al-Qaysi | Full-Stack Web Developer',
    description: 'Full-stack web developer based in Helsinki, Finland.',
    siteName: 'Alhasan Al-Qaysi Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Alhasan Al-Qaysi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alhasan Al-Qaysi | Full-Stack Web Developer',
    description: 'Full-stack web developer based in Helsinki, Finland.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <StarField />
          <CursorGlow />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
              },
              success: {
                iconTheme: { primary: '#38bdf8', secondary: '#080c10' },
              },
              error: {
                iconTheme: { primary: '#f87171', secondary: '#080c10' },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
