import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}
const db = drizzle(process.env.DATABASE_URL);


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