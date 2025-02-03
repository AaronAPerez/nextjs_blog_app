'use client';

import { Post } from '../../types/blog';
import { useEffect } from 'react';

interface BlogPostProps {
  post: Post;
}

export const BlogPost = ({ post }: BlogPostProps) => {
  useEffect(() => {
    // Update document title for accessibility
    document.title = `${post.title} - Blog`;
  }, [post.title]);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <time 
              dateTime={post.publishDate.toISOString()}
              className="text-gray-600"
            >
              {new Date(post.publishDate).toLocaleDateString()}
            </time>
          </div>
        </div>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={`Cover image for ${post.title}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
      </header>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="mt-8 pt-8 border-t">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              {tag}
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
};

export default BlogPost;