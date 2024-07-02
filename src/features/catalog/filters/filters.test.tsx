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

    const filtersTitle = screen.getByText(/apply filters/i);

    expect(filtersTitle).toBeInTheDocument();
  });
});
