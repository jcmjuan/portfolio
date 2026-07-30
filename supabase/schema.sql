-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in your Supabase SQL Editor to set up the database
-- ============================================================

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  full_content text default '',
  tags text[] default '{}',
  repo_url text,
  live_url text,
  cover_image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Posts table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text default '',
  cover_image_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_projects_featured on projects(featured);
create index if not exists idx_projects_created_at on projects(created_at desc);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_posts_published on posts(published);
create index if not exists idx_posts_published_created on posts(published, created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on both tables
alter table projects enable row level security;
alter table posts enable row level security;

-- PUBLIC READ: Anyone can read projects
DROP POLICY IF EXISTS "Public can read projects" ON projects;
create policy "Public can read projects"
  on projects for select
  using (true);

-- PUBLIC READ: Anyone can read published posts
DROP POLICY IF EXISTS "Public can read published posts" ON posts;
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- AUTHENTICATED WRITE: Only authenticated users can manage projects
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
create policy "Authenticated users can insert projects"
  on projects for insert
  with check (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
create policy "Authenticated users can update projects"
  on projects for update
  using (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
create policy "Authenticated users can delete projects"
  on projects for delete
  using (auth.uid() IS NOT NULL);

-- AUTHENTICATED WRITE: Only authenticated users can manage posts
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
create policy "Authenticated users can insert posts"
  on posts for insert
  with check (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update posts" ON posts;
create policy "Authenticated users can update posts"
  on posts for update
  using (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete posts" ON posts;
create policy "Authenticated users can delete posts"
  on posts for delete
  using (auth.uid() IS NOT NULL);

-- AUTHENTICATED READ: Authenticated users can read all posts (including drafts)
DROP POLICY IF EXISTS "Authenticated users can read all posts" ON posts;
create policy "Authenticated users can read all posts"
  on posts for select
  using (auth.uid() IS NOT NULL);

-- ============================================================
-- STORAGE POLICIES (images bucket)
-- ============================================================

-- PUBLIC READ: Anyone can view images
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- AUTHENTICATED INSERT: Only authenticated users can upload images
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- AUTHENTICATED DELETE: Only authenticated users can delete images
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.uid() IS NOT NULL);
