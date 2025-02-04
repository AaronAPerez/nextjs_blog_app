import { useState, useEffect, useCallback } from 'react';
import { Post } from '@/types/blog';

interface RealTimeUpdate {
  type: 'like' | 'comment' | 'bookmark' | 'new_post';
  postId: string;
  data: any;
  userId: string;
}

export function useRealTime(initialPosts: Post[]) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || '');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        setSocket(new WebSocket(process.env.NEXT_PUBLIC_WS_URL || ''));
      }, 3000);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // Handle real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const update: RealTimeUpdate = JSON.parse(event.data);
      
      switch (update.type) {
        case 'like':
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === update.postId
                ? { ...post, likesCount: post.likesCount + 1 }
                : post
            )
          );
          break;

        case 'comment':
          setPosts(prevPosts =>
            prevPosts.map(post =>
              post.id === update.postId
                ? { 
                    ...post, 
                    commentsCount: post.commentsCount + 1,
                    latestComment: update.data.comment 
                  }
                : post
            )
          );
          break;

        case 'new_post':
          setPosts(prevPosts => [update.data.post, ...prevPosts]);
          break;

        case 'bookmark':
          setPosts(prevPosts =>
            prevPosts.map(post =>
              post.id === update.postId
                ? { ...post, bookmarksCount: post.bookmarksCount + 1 }
                : post
            )
          );
          break;
      }
    };
  }, [socket]);

  // Send WebSocket updates
  const sendUpdate = useCallback((update: Omit<RealTimeUpdate, 'userId'>) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(update));
    }
  }, [socket]);

  return { posts, sendUpdate };
}