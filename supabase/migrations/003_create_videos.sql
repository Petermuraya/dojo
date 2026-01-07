-- Migration: 003_create_videos.sql
-- Creates `videos` table for training drill library and RLS policies

CREATE TABLE IF NOT EXISTS public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  provider text,
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  program text,
  level_lock text, -- belt or level required to view
  visibility text DEFAULT 'students', -- values: public|students|level
  duration_seconds integer,
  thumbnail_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Public select for published & public visibility
CREATE POLICY "Public videos visible"
  ON public.videos
  FOR SELECT
  USING (published = true AND visibility = 'public');

-- Authenticated users can select videos
CREATE POLICY "Authenticated select videos"
  ON public.videos
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Owners can insert their videos (owner_id must equal auth.uid())
CREATE POLICY "Owners can insert video"
  ON public.videos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND owner_id = auth.uid());

-- Owners can update/delete their own videos
CREATE POLICY "Owners can update own video"
  ON public.videos
  FOR UPDATE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can delete own video"
  ON public.videos
  FOR DELETE
  USING (owner_id = auth.uid());

-- Admin review: optional policy placeholder for admin role
-- CREATE POLICY "Admin full access" ON public.videos FOR ALL USING (auth.role() = 'admin');

-- Public view: safe projection for anonymous consumption
CREATE OR REPLACE VIEW public.public_videos AS
  SELECT id, title, description, url, provider, thumbnail_url, duration_seconds, created_at
  FROM public.videos
  WHERE published = true AND visibility = 'public';

GRANT SELECT ON public.public_videos TO anon;

CREATE INDEX IF NOT EXISTS idx_videos_owner ON public.videos (owner_id);
CREATE INDEX IF NOT EXISTS idx_videos_program ON public.videos (program);
