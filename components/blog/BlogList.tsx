'use client';

import { Post } from '../../types/blog';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: Post[];
  onPostClick?: (id: string) => void;
}

export const BlogList = ({ posts, onPostClick }: BlogListProps) => {
  return (
    <div 
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      role="feed"
      aria-label="Blog posts"
    >
      {posts.map(post => (
        <BlogCard
          key={post.id}
          post={post}
          onClick={onPostClick}
        />
      ))}
    </div>
  );
};

export default BlogList