'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/blog';
import { format } from 'date-fns';
import { Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

interface BlogPostProps {
  post: Post;
  onDelete?: (id: string) => Promise<void>;
}

export default function BlogPost({ post, onDelete }: BlogPostProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    router.push(`/posts/${post.id}/edit`);
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(post.id);
      toast.success('Post deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to posts
      </button>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {post.author.avatar && (
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src={post.author.avatar}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium">{post.author.name}</p>
              <time 
                dateTime={post.publishDate.toISOString()}
                className="text-gray-500"
              >
                {format(new Date(post.publishDate), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              className="flex items-center text-blue-600 hover:text-blue-800"
              aria-label="Edit post"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center text-red-600 hover:text-red-800 
                       disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

