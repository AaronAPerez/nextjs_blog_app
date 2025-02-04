import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, Heart, Flag } from 'lucide-react';
import { format } from 'node:util';

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
  likesCount: number;
}

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export const CommentSection = ({ postId, initialComments }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  // Real-time updates
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || '');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_comment' && data.postId === postId) {
        handleNewComment(data.comment);
      }
    };

    return () => ws.close();
  }, [postId]);

  // Handle new comments in real-time
  const handleNewComment = (newComment: Comment) => {
    setComments(prevComments => {
      if (newComment.parentId) {
        return prevComments.map(comment => 
          comment.id === newComment.parentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newComment]
              }
            : comment
        );
      }
      return [...prevComments, newComment];
    });
  };

  // Auto-resize textarea
  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.style.height = 'auto';
      commentInputRef.current.style.height = 
        `${commentInputRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  // Submit comment
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          parentId: replyingTo
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        handleNewComment(comment);
        setNewComment('');
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Like comment
  const handleLikeComment = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, likesCount: comment.likesCount + 1 }
            : comment
        )
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Report comment
  const handleReportComment = async (commentId: string) => {
    try {
      await fetch(`/api/comments/${commentId}/report`, { method: 'POST' });
      alert('Comment reported. Thank you for helping keep our community safe.');
    } catch (error) {
      console.error('Error reporting comment:', error);
    }
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.likesCount - a.likesCount;
  });

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div 
      className={`flex space-x-3 ${isReply ? 'ml-12' : ''}`}
      id={`comment-${comment.id}`}
    >
      {comment.author.avatar && (
        <Image
          src={comment.author.avatar}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{comment.author.name}</span>
              <span className="text-gray-500 text-sm">
                {format(new Date(comment.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
            
            <button
              onClick={() => handleReportComment(comment.id)}
              className="text-gray-400 hover:text-red-500"
              aria-label="Report comment"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
          
          <p className="mt-1">{comment.content}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={() => handleLikeComment(comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
              aria-label="Like comment"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{comment.likesCount}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Reply</span>
              </button>
            )}
          </div>
        </div>

        {comment.replies?.map(reply => (
          <CommentComponent 
            key={reply.id} 
            comment={reply} 
            isReply 
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <div className="flex space-x-3">
        <div className="flex-1">
          <textarea
            ref={commentInputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
            className="w-full min-h-[100px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            aria-label={replyingTo ? "Reply input" : "Comment input"}
          />
          
          <div className="flex justify-between mt-2">
            {replyingTo && (
              <button
                onClick={() => setReplyingTo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel Reply
              </button>
            )}
            
            <button
              onClick={handleSubmitComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              {replyingTo ? 'Reply' : 'Comment'}
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setSortBy('recent')}
          className={`text-sm ${
            sortBy === 'recent' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          Most Recent
        </button>
        <button
          onClick={() => setSortBy('popular')}
          className={`text-sm ${
            sortBy === 'popular' ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          Most Popular
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};