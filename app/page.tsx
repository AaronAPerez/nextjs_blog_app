import { Suspense } from 'react';
import BlogList from "@/components/blog/BlogList";
import { Post } from "@/types/blog";
import Loading from '@/components/loading/Loading';


// Sample data - replace with data fetching
const samplePosts: Post[] = [
  // sample posts 
];

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our Blog
        </h1>
        
        {/* Add loading state for better UX */}
        <Suspense fallback={<Loading />}>
          <section 
            aria-label="Blog posts"
            className="space-y-8"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlogList
                posts={samplePosts}
                onPostClick={(id) => {
                  // Handle post click
                  console.log(`Post clicked: ${id}`);
                }}
              />
            </div>
          </section>
        </Suspense>
      </main>
      
      {/* Add footer with accessibility considerations */}
      <footer className="mt-auto py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav aria-label="Footer Navigation">
            {/* Add footer navigation */}
          </nav>
        </div>
      </footer>
    </>
  );
}
