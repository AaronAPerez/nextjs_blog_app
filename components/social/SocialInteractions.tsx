import { useState, memo } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';


interface SocialInteractionsProps {
  postId: string;
  initialLikes: number;
  initialComments: number;
  initialBookmarks: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export const SocialInteractions = memo(({
  postId,
  initialLikes,
  initialComments,
  initialBookmarks,
  isLiked: initialIsLiked = false,
  isBookmarked: initialIsBookmarked = false,
}: SocialInteractionsProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [commentsCount] = useState(initialComments);
  const [bookmarksCount, setBookmarksCount] = useState(initialBookmarks);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Social interaction handlers
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: isBookmarked ? 'DELETE' : 'POST',
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        setBookmarksCount(prev => isBookmarked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <div className="flex items-center justify-between py-2">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`group flex items-center space-x-1 ${
          isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        <Heart 
          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
            isLiked ? 'fill-current' : ''
          }`}
        />
        <span className="text-sm">{likesCount}</span>
      </button>

      {/* Comment Button */}
      <button
        onClick={() => window.location.href = `#comments-${postId}`}
        className="group flex items-center space-x-1 text-gray-500 hover:text-blue-500"
        aria-label="View comments"
      >
        <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="text-sm">{commentsCount}</span>
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className={`group flex items-center space-x-1 ${
          isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
      >
        <Bookmark 
          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
            isBookmarked ? 'fill-current' : ''
          }`}
        />
        <span className="text-sm">{bookmarksCount}</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="group flex items-center space-x-1 text-gray-500 hover:text-green-500"
        aria-label="Share post"
      >
        <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
      </button>

      {/* Share Dialog */}
      {showShareDialog && (
        <dialog
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          open
          onClose={() => setShowShareDialog(false)}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/posts/${postId}`
                  );
                  setShowShareDialog(false);
                }}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Link
              </button>
              {/* Add more share options */}
            </div>
            <button
              onClick={() => setShowShareDialog(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
});

SocialInteractions.displayName = 'SocialInteractions';