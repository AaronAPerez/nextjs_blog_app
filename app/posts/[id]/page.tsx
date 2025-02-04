import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import BlogPost from '@/components/blog/BlogPost';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(params.id)),
    with: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}