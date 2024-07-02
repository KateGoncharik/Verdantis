import { MemoryRouter } from 'react-router-dom';

import { useScrollTrigger } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { Header } from '.';

vi.mock('@mui/material', async (importOriginal): Promise<unknown> => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useScrollTrigger: vi.fn(),
  };
});

describe('Header', () => {
  it('should contain logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByAltText(/logo/i)).toBeTruthy();
  });
  it('should render main color for header when useScrollTrigger is true', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByTestId('header');
    expect(getComputedStyle(header).backgroundColor).toBe('rgb(21, 101, 192)');
  });
  it('should render dark main color for header when useScrollTrigger is false', () => {
    (useScrollTrigger as unknown as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = screen.getByTestId('header');
    expect(getComputedStyle(header).backgroundColor).toBe('rgb(25, 118, 210)');
  });
});
