import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Filters } from './filters';

describe('Filters', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <Filters />
      </MemoryRouter>,
    );

    const filtersButton = screen.getByRole('button');

    expect(filtersButton).toBeInTheDocument();
  });
});
