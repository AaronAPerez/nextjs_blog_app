import { forwardRef } from 'react';
import type { ButtonProps } from '../../types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    children,
    onClick,
    ...props
  }, ref) => {
    // Base button styles using Tailwind
    const baseStyles = 'rounded-md font-medium focus:outline-none focus:ring-2';
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      text: 'bg-transparent text-blue-600 hover:bg-blue-50'
    };
    
    // Size styles
    const sizeStyles = {
      small: 'px-3 py-1 text-sm',
      medium: 'px-4 py-2',
      large: 'px-6 py-3 text-lg'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
        type='submit'
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';