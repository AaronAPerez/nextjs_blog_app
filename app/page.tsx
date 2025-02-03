'use client';

import { Suspense } from 'react';
import BlogList from "@/components/blog/BlogList";
import { Post } from "@/types/blog";
import Loading from '@/components/loading/Loading';
import { usePosts } from '@/hooks/usePosts';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  // Use the custom hook to fetch posts
  const { posts, loading, error } = usePosts();

  // Handle post click functionality
  const handlePostClick = (id: string) => {
    // Handle post click
    console.log(`Post clicked: ${id}`);
    // Add your navigation or other functionality here
  };

  // Show loading state while fetching posts
  if (loading) {
    return <Loading />;
  }

  // Show error state if fetching fails
  if (error) {
    return (
      <div role="alert" className="text-red-500 p-4">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <>
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our Blog
        </h1>
        
        <Suspense fallback={<Loading />}>
          <section 
            aria-label="Blog posts"
            className="space-y-8"
          >
            <ErrorBoundary>
            <BlogList
              posts={posts}
              onPostClick={handlePostClick}
            />
            </ErrorBoundary>
          </section>
        </Suspense>
      </main>
      
      <footer className="mt-auto py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav aria-label="Footer Navigation">
            {/* Add footer navigation content here */}
          </nav>
        </div>
      </footer>
    </>
  );
}