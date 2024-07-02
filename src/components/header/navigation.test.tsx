import { MemoryRouter } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { Navigation } from './navigation';

vi.mock('@mui/material/useMediaQuery', () => ({
  default: vi.fn(),
}));

describe('Navigation', () => {
  it('render "about" section link, when screen is larger then theme "lg" - 800px', () => {
    (useMediaQuery as Mock).mockReturnValue(true);
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );
    expect(screen.getByText('about')).toBeTruthy();
  });
  it('render collapsed menu when resolution smaller then theme "lg" - 800px', () => {
    (useMediaQuery as Mock).mockReturnValue(false);
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
    );
    expect(screen.getByText(/menu/i)).toBeTruthy();
  });
});
