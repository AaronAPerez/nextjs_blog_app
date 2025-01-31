import { useState, useEffect } from 'react';
import { Post } from '../types/blog';

interface UseBlogSearchProps {
  posts: Post[];
  initialQuery?: string;
}

export const useBlogSearch = ({ posts, initialQuery = '' }: UseBlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  return {
    searchQuery,
    setSearchQuery,
    filteredPosts
  };
};