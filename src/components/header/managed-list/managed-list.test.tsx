import { MemoryRouter, useNavigate } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useTokenStore } from '@/stores/token-store';

import { ManagedList } from '..';
import { buttonsLabels } from '../navigation.constants';

vi.mock('@/stores/token-store', () => ({
  useTokenStore: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../navigation.constants', () => ({
  buttonsLabels: ['button1', 'button2'],
}));

describe('ManagedList component', () => {
  const mockNavigate = vi.fn();
  const mockResetStore = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useTokenStore as unknown as Mock).mockImplementation(() => ({ resetStore: mockResetStore }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render logout button if type is password', () => {
    const mockType = 'password';
    (useTokenStore as unknown as Mock).mockImplementation(() => ({ resetStore: mockResetStore, type: mockType }));
    render(
      <MemoryRouter>
        <ManagedList />
      </MemoryRouter>,
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
  it('should render register and login buttons if user did not login', () => {
    const mockType = null;
    (useTokenStore as unknown as Mock).mockReturnValue({ type: mockType });
    render(
      <MemoryRouter>
        <ManagedList />
      </MemoryRouter>,
    );
    buttonsLabels.forEach((button) => {
      expect(screen.getByText(new RegExp(button, 'i'))).toBeInTheDocument();
    });
  });
  it('should call resetStore and useNavigate when click on logout button', () => {
    const mockType = 'password';
    (useTokenStore as unknown as Mock).mockImplementation(() => ({ resetStore: mockResetStore, type: mockType }));
    render(
      <MemoryRouter>
        <ManagedList />
      </MemoryRouter>,
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockResetStore).toHaveBeenCalled();
  });
});
