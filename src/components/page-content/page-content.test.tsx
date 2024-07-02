import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageContent } from '.';

describe('PageContent', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <PageContent />
      </MemoryRouter>,
    );

    const section = screen.getByRole('main');

    expect(section).toBeInTheDocument();
  });
});
