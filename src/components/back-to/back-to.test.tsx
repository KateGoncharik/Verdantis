import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BackTo } from './back-to';

describe('BackTo component', () => {
  const dest = 'catalog';
  const path = '/catalog';
  it('should render button with correct text', () => {
    render(
      <MemoryRouter>
        <BackTo dest={dest} path={path} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: new RegExp(`back to ${dest}`, 'i') })).toBeInTheDocument();
  });
  it('should have link to correct section', () => {
    render(
      <MemoryRouter>
        <BackTo dest={dest} path={path} />
      </MemoryRouter>,
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', path);
  });
});
