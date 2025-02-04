import { useEffect, useRef, useState } from 'react';
import { Post } from '@/types/blog';

interface UseInfiniteScrollProps {
  initialPosts?: Post[];
  pageSize?: number;
}

export const useInfiniteScroll = ({ 
  initialPosts = [], 
  pageSize = 10 
}: UseInfiniteScrollProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMorePosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/posts?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      
      if (data.posts.length < pageSize) {
        setHasMore(false);
      }
      
      setPosts(prevPosts => [...prevPosts, ...data.posts]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          fetchMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  return { posts, loading, hasMore, loaderRef };
};