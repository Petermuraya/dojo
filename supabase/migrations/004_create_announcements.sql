-- Migration: 004_create_announcements.sql
-- Creates `announcements` table for instructor -> student communications

CREATE TABLE IF NOT EXISTS public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  audience text DEFAULT 'students', -- public | students | program-specific
  program text,
  pinned boolean DEFAULT false,
  published boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Public selection for published & audience public
CREATE POLICY "Public announcements visible"
  ON public.announcements
  FOR SELECT
  USING (published = true AND audience = 'public');

-- Authenticated users can select announcements
CREATE POLICY "Authenticated select announcements"
  ON public.announcements
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authors (instructors) can insert announcements where author_id = auth.uid()
CREATE POLICY "Authors can insert own announcement"
  ON public.announcements
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND author_id = auth.uid());

-- Authors can update/delete their own announcements
CREATE POLICY "Authors can update own announcement"
  ON public.announcements
  FOR UPDATE
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can delete own announcement"
  ON public.announcements
  FOR DELETE
  USING (author_id = auth.uid());

-- Public view for marketing or public site
CREATE OR REPLACE VIEW public.public_announcements AS
  SELECT id, title, body, program, pinned, created_at
  FROM public.announcements
  WHERE published = true AND audience = 'public'
  ORDER BY pinned DESC, created_at DESC;

GRANT SELECT ON public.public_announcements TO anon;

CREATE INDEX IF NOT EXISTS idx_announcements_author ON public.announcements (author_id);
CREATE INDEX IF NOT EXISTS idx_announcements_program ON public.announcements (program);
