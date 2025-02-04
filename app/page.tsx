'use client';

import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import { usePosts } from '@/hooks/usePosts';
import DatabaseStatus from '@/components/DatabaseStatus';
import { HomeIcon } from 'lucide-react';
import NavItem from './NavItem';



export default function Home() {
  // Use the custom hook to fetch posts
  const { loading, error } = usePosts();


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
          {/* <Navigation/> */}
          <NavItem href="/dashboard" // Must be a non-empty string
            icon={<HomeIcon />}
            children={undefined} />
        </h1>

        <Suspense fallback={<Loading />}>
          <section
            aria-label="Blog posts"
            className="space-y-8"
          >
          </section>
        </Suspense>
        <footer className="mt-auto py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <nav aria-label="Footer Navigation">
      
              <DatabaseStatus />
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}