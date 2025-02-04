import { useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

interface Post {
  id: string;
  likes: number;
}

export const PostInteractions = ({ post }: { post: Post }) => {
  const [likes, setLikes] = useState(post.likes);

  // Initialize socket connection with event handlers
  const { emit, connected } = useSocket({
    events: {
      'post_liked': (data) => {
        if (data.postId === post.id) {
          setLikes(prev => prev + 1);
        }
      }
    }
  });

  const handleLike = () => {
    emit('post_like', { postId: post.id });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        aria-label="Like post"
        disabled={!connected}
      >
        Like
      </button>
      <span aria-live="polite">
        {likes} likes
      </span>
      {!connected && (
        <span className="text-red-500" role="alert">
          Disconnected from server
        </span>
      )}
    </div>
  );
};