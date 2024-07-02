import { MemoryRouter, useNavigate } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTokenStore } from '@/stores/token-store';

import { LogoutButton } from '..';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('@/stores/token-store', () => ({
  useTokenStore: vi.fn(),
}));

describe('Logout button', () => {
  const mockNavigate = vi.fn();
  const mockResetStore = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useTokenStore as unknown as Mock).mockReturnValue({ resetStore: mockResetStore });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render', () => {
    mockNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>,
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  it('should call resetStore and navigate when clicked', () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>,
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockResetStore).toHaveBeenCalled();
  });
});
