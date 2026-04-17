/**
 * __tests__/components.test.tsx
 *
 * Component tests for the Navbar and Footer.
 * We're testing that the right links/text render — not implementation details.
 *
 * NOTE: components that use next/image or next/link need the mocks below.
 * If you add more components that use Next.js internals, add mocks for them too.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── mocks ─────────────────────────────────────────────────────────────────────

// next/image doesn't work in jsdom — mock it with a plain img
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// ThemeProvider uses localStorage — mock it
const mockToggle = jest.fn();
jest.mock('@/components/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: mockToggle }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// ── Navbar ────────────────────────────────────────────────────────────────────
describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders the logo/name', () => {
    expect(screen.getByText('Alhasan')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    const links = ['About', 'Skills', 'Experience', 'Projects', 'AI Chat', 'Contact'];
    links.forEach((label) => {
      // getAllByText because mobile + desktop nav both render the same labels
      const els = screen.getAllByText(label);
      expect(els.length).toBeGreaterThan(0);
    });
  });

  it('renders the Resume download link', () => {
    const resumeLink = screen.getByText('Resume');
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/Alhasan_Alqaysi_CV.pdf');
  });

  it('has a theme toggle button', () => {
    const btn = screen.getByLabelText('Toggle theme');
    expect(btn).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    const btn  = screen.getByLabelText('Toggle theme');
    await user.click(btn);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────
describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('shows the developer name', () => {
    expect(screen.getByText('Alhasan Al-Qaysi')).toBeInTheDocument();
  });

  it('has a GitHub link', () => {
    const ghLinks = screen.getAllByLabelText('GitHub');
    expect(ghLinks[0]).toHaveAttribute('href', 'https://github.com/Hasankc');
  });

  it('has an email link', () => {
    const emailLinks = screen.getAllByLabelText('Email');
    expect(emailLinks[0]).toHaveAttribute('href', 'mailto:alhasanal_qaysi@yahoo.com');
  });

  it('shows the current year in the copyright', () => {
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
