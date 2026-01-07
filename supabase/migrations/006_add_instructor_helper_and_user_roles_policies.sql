-- Migration: 006_add_instructor_helper_and_user_roles_policies.sql
-- Adds `is_instructor()` helper and secures `user_roles` with RLS policies

-- Create helper to detect instructor role
CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS boolean
LANGUAGE sql STABLE
AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'instructor'
  );
$$;

-- Ensure RLS is enabled on user_roles and add appropriate policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage user_roles fully
CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Allow users to view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Notes: initial admin should be seeded via direct SQL with service_role key:
-- INSERT INTO public.user_roles (user_id, role) VALUES ('<USER_UUID>', 'admin');
