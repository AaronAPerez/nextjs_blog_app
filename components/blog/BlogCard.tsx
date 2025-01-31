'use client';

import { Post } from '../../types/blog';

interface BlogCardProps {
  post: Post;
  onClick?: (id: string) => void;
}


export const BlogCard = ({ post, onClick }: BlogCardProps) => {
    const formattedDate = new Date(post.publishDate).toLocaleDateString();
    
    return (
      <article 
        className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
        onClick={() => onClick?.(post.id)}
      >
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={`Cover image for ${post.title}`}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">
            <a 
              href={`/blog/${post.id}`}
              className="hover:text-blue-600"
              aria-label={`Read ${post.title}`}
            >
              {post.title}
            </a>
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-gray-600">{post.author.name}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.publishDate.toISOString()}>
              {formattedDate}
            </time>
          </div>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  };

  export default BlogCard;