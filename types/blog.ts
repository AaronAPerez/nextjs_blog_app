export interface Post {
    id: string;
    title: string;
    content: string;
    author: Author;
    publishDate: Date;
    tags: string[];
    imageUrl?: string;
    excerpt: string;
  }
  
  export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  }