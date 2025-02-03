'use client';

import { HTMLAttributes } from 'react';

// Interface for component props
interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  // Size variants for the loading spinner
  size?: 'small' | 'medium' | 'large';
  // Optional text to display below the spinner
  text?: string;
  // Whether to show the loading text
  showText?: boolean;
  // Whether loading takes up full container width
  fullWidth?: boolean;
}


export const Loading = ({
  size = 'medium',
  text = 'Loading...',
  showText = true,
  fullWidth = false,
  className = '',
  ...props
}: LoadingProps) => {
  // Map size variants to dimensions
  const sizeStyles = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div 
      role="status"
      className={`flex flex-col items-center justify-center ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Spinner element */}
      <div 
        className={`
          ${sizeStyles[size]}
          rounded-full
          border-gray-300
          border-t-blue-600
          animate-spin
        `}
        aria-hidden="true"
      />
      
      {/* Loading text - visually hidden but available to screen readers */}
      <span className="sr-only">Content is loading</span>
      
      {/* Optional visible loading text */}
      {showText && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  );
};

export default Loading;