'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Post } from '@/types/blog';
import { Loading } from '@/components/Loading';
import { usePosts } from '@/hooks/usePosts';
import BlogForm from '@/components/blog/BlogForm';

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const { updatePost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading size="large" text="Loading post..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-md" role="alert">
          <h2 className="text-lg font-semibold mb-2">Error Loading Post</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-red-700 hover:text-red-900 underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Post Not Found</h2>
          <p>The post you&apos;re looking for does not exist or has been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-yellow-700 hover:text-yellow-900 underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 px-6">Edit Post</h1>
      <BlogForm 
        post={post} 
        onSubmit={updatePost} 
        isEditing 
      />
    </div>
  );
}