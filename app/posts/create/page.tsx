'use client';


import BlogForm from '@/components/blog/BlogForm';
import { usePosts } from '@/hooks/usePosts';

export default function CreatePost() {
  const { createPost } = usePosts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 px-6">Create New Post</h1>
      <BlogForm onSubmit={createPost} />
    </div>
  );
}