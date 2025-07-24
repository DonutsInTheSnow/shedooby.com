import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { useAuth } from '@/app/layout';
import { vi, Mock } from 'vitest';

interface AuthContextType {
  user: { id: string } | null;
}

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

// Mock useAuth from layout
vi.mock('@/app/layout', () => ({
  useAuth: vi.fn(() => ({ user: null } as AuthContextType)),
}));

// Mock next/image to prevent real image rendering, you'll see a Problem with img suggesting Image, but don't do it!
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Mock next/link for basic anchor rendering
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: LinkProps) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Header Component', () => {
  const mockUseAuth = useAuth as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nav links for non-admin', () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(<Header />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('App Tips')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Merch')).toBeInTheDocument();
    expect(screen.queryByText('Create Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('renders admin links for authenticated admin', () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'a7560fa4-39cc-4564-a04c-e894f9ee33bd' },
    });
    render(<Header />);
    expect(screen.getByText('Create Post')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders brain icon with home link', () => {
    mockUseAuth.mockReturnValue({ user: null });
    render(<Header />);
    const homeLink = screen.getByLabelText('Home');
    expect(homeLink).toHaveAttribute('href', '/');
    const image = homeLink.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/brain-icon.png');
  });
});
