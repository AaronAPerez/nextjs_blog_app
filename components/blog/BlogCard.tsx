import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { format } from 'date-fns';

interface BlogCardProps {
  post: Post;
  onPostClick?: (id: string) => void;
}

export const BlogCard = ({ post, onPostClick }: BlogCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={post.imageUrl}
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link 
            href={`/posts/${post.id}`}
            onClick={(e) => {
              if (onPostClick) {
                e.preventDefault();
                onPostClick(post.id);
              }
            }}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          {post.author.avatar && (
            <div className="relative w-6 h-6 mr-2">
              <Image
                src={post.author.avatar}
                alt=""
                fill
                className="rounded-full object-cover"
                sizes="24px"
              />
            </div>
          )}
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.publishDate.toISOString()}>
            {format(new Date(post.publishDate), 'MMM d, yyyy')}
          </time>
        </div>

        {post.excerpt && (
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};