CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id),
  parent_id INTEGER REFERENCES comments(id),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_parent_id_idx ON comments(parent_id);