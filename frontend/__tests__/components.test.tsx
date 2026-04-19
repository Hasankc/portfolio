/**
 * components.test.tsx — component render tests
 * Tests that key UI elements are present and interactive
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// ── Mocks ────────────────────────────────────────────────────────────────────
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ''} />,
}));

const mockToggle = jest.fn();
jest.mock('@/components/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'light', toggle: mockToggle }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// ── Navbar ────────────────────────────────────────────────────────────────────
describe('Navbar', () => {
  beforeEach(() => render(<Navbar />));

  it('renders the brand name',          () => expect(screen.getByText('Alhasan')).toBeInTheDocument());
  it('has About nav link',              () => expect(screen.getAllByText('About').length).toBeGreaterThan(0));
  it('has Skills nav link',             () => expect(screen.getAllByText('Skills').length).toBeGreaterThan(0));
  it('has Projects nav link',           () => expect(screen.getAllByText('Projects').length).toBeGreaterThan(0));
  it('has Contact nav link',            () => expect(screen.getAllByText('Contact').length).toBeGreaterThan(0));
  it('has Resume download link',        () => {
    const links = screen.getAllByText('Resume');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].closest('a')).toHaveAttribute('download');
  });
  it('has theme toggle button',         () => expect(screen.getByLabelText(/toggle|switch/i)).toBeInTheDocument());
  it('calls toggle on theme click',     () => {
    fireEvent.click(screen.getByLabelText(/toggle|switch/i));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────
describe('Footer', () => {
  beforeEach(() => render(<Footer />));

  it('shows developer name',            () => expect(screen.getByText('Alhasan Al-Qaysi')).toBeInTheDocument());
  it('shows copyright with year',       () => expect(screen.getByText(new RegExp(new Date().getFullYear().toString()))).toBeInTheDocument());
  it('has GitHub link',                 () => {
    const link = screen.getByLabelText('GitHub');
    expect(link).toHaveAttribute('href', 'https://github.com/Hasankc');
  });
  it('has Email link',                  () => {
    const link = screen.getByLabelText('Email');
    expect(link).toHaveAttribute('href', 'mailto:alhasanal_qaysi@yahoo.com');
  });
  it('has LinkedIn link',               () => {
    const link = screen.getByLabelText('LinkedIn');
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/alhasan-al-qaysi');
  });
  it('has CV download button',          () => {
    const dlLinks = screen.getAllByText(/Download CV/i);
    expect(dlLinks.length).toBeGreaterThan(0);
  });
  it('shows Next.js attribution',       () => expect(screen.getByText(/Next\.js/i)).toBeInTheDocument());
});
