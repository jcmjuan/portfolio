export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_content: string;
  tags: string[];
  repo_url: string | null;
  live_url: string | null;
  cover_image_url: string | null;
  featured: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ProjectFormValues {
  title: string;
  slug: string;
  description: string;
  full_content: string;
  tags: string;
  repo_url: string;
  live_url: string;
  cover_image_url: string;
  featured: boolean;
}

export interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  published: boolean;
}
