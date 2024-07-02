import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { useTokenStore } from '@/stores/token-store';

import { ManagedNavigationButtons } from '..';

vi.mock('@/stores/token-store', () => ({
  useTokenStore: vi.fn(),
}));

describe('Managed navigation buttons component', () => {
  it('should render profile and logout buttons when user is login', () => {
    const mockType = 'password';
    (useTokenStore as unknown as Mock).mockImplementation(() => ({ type: mockType }));
    render(
      <MemoryRouter>
        <ManagedNavigationButtons />
      </MemoryRouter>,
    );
    const profileLink = screen.getByRole('link', { name: /profile/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(profileLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  it('should render register and login buttons if user unauthorized', () => {
    const mockType = 'anonymous';
    (useTokenStore as unknown as Mock).mockImplementation(() => ({ type: mockType }));
    render(
      <MemoryRouter>
        <ManagedNavigationButtons />
      </MemoryRouter>,
    );
    const loginLink = screen.getByRole('link', { name: /login/i });
    const registerLink = screen.getByRole('link', { name: /registration/i });
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
