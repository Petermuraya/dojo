-- Migration: 001_create_profiles.sql
-- Creates `profiles` table for user metadata linked to auth.users
-- Enables RLS and adds recommended policies plus a public view

-- Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text,
  program text,
  location text,
  belt text,
  avatar_url text,
  is_public boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- trigger function to keep updated_at current
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON public.profiles;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1) Public rows (is_public = true) are selectable by anyone
CREATE POLICY "Public profiles are visible"
  ON public.profiles
  FOR SELECT
  USING (is_public = true);

-- 2) Authenticated users can select all profiles
CREATE POLICY "Authenticated select"
  ON public.profiles
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- 3) Allow authenticated users to insert only their own profile (id must equal auth.uid())
CREATE POLICY "Users can insert their profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND id = auth.uid());

-- 4) Allow owners to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- 5) Allow owners to delete their own profile (optional)
CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (id = auth.uid());

-- Public view: a safe public-facing projection (grant select to anon role)
CREATE OR REPLACE VIEW public.public_profiles AS
  SELECT id, full_name, program, location, belt, avatar_url, created_at
  FROM public.profiles
  WHERE is_public = true;

GRANT SELECT ON public.public_profiles TO anon;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON public.profiles (full_name);

-- Notes:
--  - To run this migration: paste into the Supabase SQL editor or run via psql with a service-role key.
--  - Review and adapt policies if you need role-based admin access (e.g. allow auth.role() = 'admin').
--  - The `profiles` table references `auth.users(id)` so ensure the auth extension is present (standard in Supabase projects).
