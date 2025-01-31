import { render, screen, fireEvent } from '@testing-library/react';

import { describe, it } from 'node:test';
import { Button } from './components/Button/Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct aria attributes', () => {
    render(
      <Button aria-label="Test button" aria-describedby="description">
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
    expect(button).toHaveAttribute('aria-describedby', 'description');
  });
});