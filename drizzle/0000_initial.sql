-- Create authors table first since posts reference it
CREATE TABLE IF NOT EXISTS "authors" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(256) NOT NULL,
  "email" VARCHAR(256) NOT NULL UNIQUE,
  "avatar" VARCHAR(512),
  "bio" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS "posts" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(256) NOT NULL,
  "content" TEXT NOT NULL,
  "excerpt" TEXT,
  "image_url" VARCHAR(512),
  "author_id" INTEGER REFERENCES "authors"("id"),
  "published_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tags table
CREATE TABLE IF NOT EXISTS "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts_tags junction table
CREATE TABLE IF NOT EXISTS "posts_tags" (
  "post_id" INTEGER REFERENCES "posts"("id"),
  "tag_id" INTEGER REFERENCES "tags"("id"),
  PRIMARY KEY ("post_id", "tag_id")
);
