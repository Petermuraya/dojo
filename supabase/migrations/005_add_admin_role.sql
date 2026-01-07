-- Migration: 005_add_admin_role.sql
-- Adds `user_roles` table, `is_admin()` helper and updates RLS policies to allow admin override

-- Create a simple user_roles table to assign roles such as 'admin'
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  PRIMARY KEY (user_id, role)
);

-- Helper to check admin membership
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE
AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  );
$$;

-- Update policies for `profiles`
DROP POLICY IF EXISTS "Public profiles are visible" ON public.profiles;
CREATE POLICY "Public profiles are visible"
  ON public.profiles
  FOR SELECT
  USING (is_public = true OR public.is_admin());

DROP POLICY IF EXISTS "Authenticated select" ON public.profiles;
CREATE POLICY "Authenticated select"
  ON public.profiles
  FOR SELECT
  USING (auth.role() = 'authenticated' OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert their profile" ON public.profiles;
CREATE POLICY "Users can insert their profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK ((auth.role() = 'authenticated' AND id = auth.uid()) OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;
CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (id = auth.uid() OR public.is_admin());

-- Update policies for `classes`
DROP POLICY IF EXISTS "Public classes visible" ON public.classes;
CREATE POLICY "Public classes visible"
  ON public.classes
  FOR SELECT
  USING (published = true OR public.is_admin());

DROP POLICY IF EXISTS "Authenticated select classes" ON public.classes;
CREATE POLICY "Authenticated select classes"
  ON public.classes
  FOR SELECT
  USING (auth.role() = 'authenticated' OR public.is_admin());

DROP POLICY IF EXISTS "Instructors can insert own class" ON public.classes;
CREATE POLICY "Instructors can insert own class"
  ON public.classes
  FOR INSERT
  WITH CHECK (((auth.role() = 'authenticated' AND instructor_id = auth.uid()) OR public.is_admin()));

DROP POLICY IF EXISTS "Instructors can update own class" ON public.classes;
CREATE POLICY "Instructors can update own class"
  ON public.classes
  FOR UPDATE
  USING (instructor_id = auth.uid() OR public.is_admin())
  WITH CHECK (instructor_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Instructors can delete own class" ON public.classes;
CREATE POLICY "Instructors can delete own class"
  ON public.classes
  FOR DELETE
  USING (instructor_id = auth.uid() OR public.is_admin());

-- Update policies for `videos`
DROP POLICY IF EXISTS "Public videos visible" ON public.videos;
CREATE POLICY "Public videos visible"
  ON public.videos
  FOR SELECT
  USING (published = true AND visibility = 'public' OR public.is_admin());

DROP POLICY IF EXISTS "Authenticated select videos" ON public.videos;
CREATE POLICY "Authenticated select videos"
  ON public.videos
  FOR SELECT
  USING (auth.role() = 'authenticated' OR public.is_admin());

DROP POLICY IF EXISTS "Owners can insert video" ON public.videos;
CREATE POLICY "Owners can insert video"
  ON public.videos
  FOR INSERT
  WITH CHECK (((auth.role() = 'authenticated' AND owner_id = auth.uid()) OR public.is_admin()));

DROP POLICY IF EXISTS "Owners can update own video" ON public.videos;
CREATE POLICY "Owners can update own video"
  ON public.videos
  FOR UPDATE
  USING (owner_id = auth.uid() OR public.is_admin())
  WITH CHECK (owner_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Owners can delete own video" ON public.videos;
CREATE POLICY "Owners can delete own video"
  ON public.videos
  FOR DELETE
  USING (owner_id = auth.uid() OR public.is_admin());

-- Update policies for `announcements`
DROP POLICY IF EXISTS "Public announcements visible" ON public.announcements;
CREATE POLICY "Public announcements visible"
  ON public.announcements
  FOR SELECT
  USING (published = true AND audience = 'public' OR public.is_admin());

DROP POLICY IF EXISTS "Authenticated select announcements" ON public.announcements;
CREATE POLICY "Authenticated select announcements"
  ON public.announcements
  FOR SELECT
  USING (auth.role() = 'authenticated' OR public.is_admin());

DROP POLICY IF EXISTS "Authors can insert own announcement" ON public.announcements;
CREATE POLICY "Authors can insert own announcement"
  ON public.announcements
  FOR INSERT
  WITH CHECK (((auth.role() = 'authenticated' AND author_id = auth.uid()) OR public.is_admin()));

DROP POLICY IF EXISTS "Authors can update own announcement" ON public.announcements;
CREATE POLICY "Authors can update own announcement"
  ON public.announcements
  FOR UPDATE
  USING (author_id = auth.uid() OR public.is_admin())
  WITH CHECK (author_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Authors can delete own announcement" ON public.announcements;
CREATE POLICY "Authors can delete own announcement"
  ON public.announcements
  FOR DELETE
  USING (author_id = auth.uid() OR public.is_admin());

-- Notes: assign admin roles by inserting into public.user_roles (user_id, 'admin')
