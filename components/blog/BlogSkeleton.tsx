import { memo } from 'react';

interface SkeletonProps {
  count?: number;
}

const PostSkeleton = memo(() => (
  <div 
    className="animate-pulse border-b border-gray-200 p-4"
    role="status"
    aria-label="Loading post"
  >
    <div className="flex space-x-4">
      {/* Avatar skeleton */}
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      
      <div className="flex-1 space-y-4">
        {/* Author and date skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
        
        {/* Title skeleton */}
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        
        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
        
        {/* Action buttons skeleton */}
        <div className="flex justify-between pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-5 w-5 rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  </div>
));

export const BlogSkeleton = ({ count = 3 }: SkeletonProps) => (
  <div 
    className="space-y-4"
    aria-label="Loading blog posts"
  >
    {Array.from({ length: count }).map((_, i) => (
      <PostSkeleton key={i} />
    ))}
  </div>
);

PostSkeleton.displayName = 'PostSkeleton';
export default BlogSkeleton;