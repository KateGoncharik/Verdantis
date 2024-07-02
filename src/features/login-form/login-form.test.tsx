import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ReactQueryProvider } from '@/test/utils/react-query-provider';

import { LoginForm } from './login-form';

describe('login form component', () => {
  it('renders form without errors', () => {
    expect(() =>
      render(
        <ReactQueryProvider>
          <LoginForm />
        </ReactQueryProvider>,
      ),
    ).not.toThrow();
  });
});
