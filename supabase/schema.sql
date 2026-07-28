-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in your Supabase SQL Editor to set up the database
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
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
  id uuid primary key default uuid_generate_v4(),
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
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_posts_published on posts(published);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on both tables
alter table projects enable row level security;
alter table posts enable row level security;

-- PUBLIC READ: Anyone can read projects
create policy "Public can read projects"
  on projects for select
  using (true);

-- PUBLIC READ: Anyone can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- AUTHENTICATED WRITE: Only authenticated users can manage projects
create policy "Authenticated users can insert projects"
  on projects for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects"
  on projects for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects"
  on projects for delete
  using (auth.role() = 'authenticated');

-- AUTHENTICATED WRITE: Only authenticated users can manage posts
create policy "Authenticated users can insert posts"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update posts"
  on posts for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete posts"
  on posts for delete
  using (auth.role() = 'authenticated');

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
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- AUTHENTICATED DELETE: Only authenticated users can delete images
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');
