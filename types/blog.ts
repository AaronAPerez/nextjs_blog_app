export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: Author;
  publishDate: Date;
  imageUrl?: string;
  tags: string[];
}

// Zod schema for form validation
import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(256),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional()
});