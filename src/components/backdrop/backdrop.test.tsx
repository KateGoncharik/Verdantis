import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoadingBackdrop } from './backdrop';

describe('LoadingBackdrop component', () => {
  it('should render Backdrop and CircularProgress when request is pending', () => {
    render(<LoadingBackdrop open={true} />);
    const backdropElement = screen.getByTestId('backdrop');
    const circularProgressElement = screen.getByTestId('circular-progress');
    expect(backdropElement).toBeVisible();
    expect(circularProgressElement).toBeVisible();
  });
  it('should not render Backdrop and CircularProgress when request is done', () => {
    render(<LoadingBackdrop open={false} />);
    const backdropElement = screen.queryByTestId('backdrop');
    const circularProgressElement = screen.queryByTestId('circular-progress');
    expect(backdropElement).not.toBeVisible();
    expect(circularProgressElement).not.toBeVisible();
  });
});
