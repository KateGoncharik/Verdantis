import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RootLayout } from './root-layout';

vi.mock('../PageContent', () => ({
  PageContent: vi.fn(() => <main>PageContent</main>),
}));

describe('RootLayout', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>,
    );

    const section = screen.getByRole('main');

    expect(section).toBeInTheDocument();
  });
});
