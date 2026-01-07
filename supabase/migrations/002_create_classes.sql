-- Migration: 002_create_classes.sql
-- Creates `classes` table to store scheduled classes and basic RLS policies

CREATE TABLE IF NOT EXISTS public.classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  program text,
  level text,
  location text,
  capacity integer DEFAULT 0,
  start_time timestamptz,
  end_time timestamptz,
  published boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- re-use trigger_set_timestamp if present
-- (function created in previous migration)

ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Public select for published classes
CREATE POLICY "Public classes visible"
  ON public.classes
  FOR SELECT
  USING (published = true);

-- Authenticated users can select classes
CREATE POLICY "Authenticated select classes"
  ON public.classes
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Instructors (owner) can insert classes where instructor_id = auth.uid()
CREATE POLICY "Instructors can insert own class"
  ON public.classes
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND instructor_id = auth.uid());

-- Instructors can update/delete their own classes
CREATE POLICY "Instructors can update own class"
  ON public.classes
  FOR UPDATE
  USING (instructor_id = auth.uid())
  WITH CHECK (instructor_id = auth.uid());

CREATE POLICY "Instructors can delete own class"
  ON public.classes
  FOR DELETE
  USING (instructor_id = auth.uid());

-- Safe public view for marketing
CREATE OR REPLACE VIEW public.public_classes AS
  SELECT id, title, description, program, level, location, capacity, start_time, end_time
  FROM public.classes
  WHERE published = true;

GRANT SELECT ON public.public_classes TO anon;

CREATE INDEX IF NOT EXISTS idx_classes_start_time ON public.classes (start_time);
CREATE INDEX IF NOT EXISTS idx_classes_program ON public.classes (program);

-- Notes: consider adding additional policies for admin role (e.g. allow auth.role() = 'admin')
