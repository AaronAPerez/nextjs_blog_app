import { db } from '../lib/db';
import { authors, posts } from '../lib/db/schema';

async function seed() {
  try {
    // Insert an author
    const [author] = await db.insert(authors).values({
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'A passionate writer and developer'
    }).returning();

    // Insert a test post
    await db.insert(posts).values({
      title: 'Getting Started with Next.js',
      content: 'This is a test post content...',
      excerpt: 'Learn how to build modern web applications with Next.js',
      authorId: author.id,
      imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=post1'
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();