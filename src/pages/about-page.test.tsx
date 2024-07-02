import { useScrollTrigger } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import AboutPage from './about-page';
import { teamMembers } from './about-page.constants';

vi.mock('./about-page.constants', () => ({
  cardStyle: { borderRadius: '5px' },
  gitLinkStyle: 'flex max-w-full items-center gap-1 no-underline',
  teamMembers: [
    {
      bio: 'member1',
      collaboration: 'collaboration1',
      contributions: 'contributions1',
      github: 'github1',
      name: 'name1',
      nickname: 'nickname1',
      role: 'role1',
    },
    {
      bio: 'member2',
      collaboration: 'collaboration2',
      contributions: 'contributions2',
      github: 'github2',
      name: 'name2',
      nickname: 'nickname2',
      role: 'role2',
    },
  ],
}));

vi.mock('@mui/material', async (importOriginal): Promise<unknown> => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useScrollTrigger: vi.fn(),
  };
});

describe('About us page', () => {
  it('should render the page title', () => {
    render(<AboutPage />);
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  it("should render all member's cards", () => {
    render(<AboutPage />);
    const memberCards = screen.getAllByTestId('member-card');
    expect(memberCards).toHaveLength(teamMembers.length);
  });
  it('should render each team member with correct details', () => {
    render(<AboutPage />);
    teamMembers.forEach((member) => {
      expect(screen.getByText(member.bio)).toBeInTheDocument();
      expect(screen.getByText(member.collaboration)).toBeInTheDocument();
      expect(screen.getByText(member.contributions)).toBeInTheDocument();
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.nickname)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    });
  });
  it('should render footer with RS School link', () => {
    render(<AboutPage />);
    const footerLink = screen.getByRole('link', { name: /rs-school/i });
    expect(footerLink).toBeInTheDocument();
    expect(footerLink).toHaveAttribute('href', 'https://rs.school/');
  });
  it('should have correct link to Github profile', () => {
    render(<AboutPage />);
    teamMembers.forEach((member) => {
      const link = screen.getByTestId(member.github);
      expect(link).toHaveAttribute('href', member.github);
    });
  });
  it('should render green color for footer when useScrollTrigger is true', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(true);
    render(<AboutPage />);
    const footer = screen.getByTestId('footer');
    expect(getComputedStyle(footer).backgroundColor).toBe('rgb(0, 128, 0)');
  });
  it('should render grey color for footer when useScrollTrigger is false', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(false);
    render(<AboutPage />);
    const footer = screen.getByTestId('footer');
    expect(getComputedStyle(footer).backgroundColor).toBe('rgb(128, 128, 128)');
  });
});
