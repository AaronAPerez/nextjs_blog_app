// Define reusable interfaces and types
export interface BaseProps {
    className?: string;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
  }
  
  export interface ButtonProps extends BaseProps {
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
  }