-- Migration: 009_add_can_reserve_function_and_policy.sql
-- Adds a helper function `can_reserve` to check class capacity and updates RLS policy for class_attendance inserts

-- Function: returns true if the class has capacity for another reservation
CREATE OR REPLACE FUNCTION public.can_reserve(p_class_id uuid)
RETURNS boolean
LANGUAGE sql STABLE
AS $$
  WITH cap AS (
    SELECT capacity FROM public.classes WHERE id = p_class_id
  ), cnt AS (
    SELECT COUNT(*)::int AS reserved_count FROM public.class_attendance WHERE class_id = p_class_id AND status IN ('reserved','attended')
  )
  SELECT (
    (SELECT capacity FROM cap) IS NULL -- if capacity not set, allow
    OR (SELECT reserved_count FROM cnt) < (SELECT capacity FROM cap)
  );
$$;

-- Update policy: allow users to insert only if can_reserve(class_id) is true or user is admin/instructor
DROP POLICY IF EXISTS "Users can insert attendance for themselves" ON public.class_attendance;
CREATE POLICY "Users can insert attendance for themselves"
  ON public.class_attendance
  FOR INSERT
  WITH CHECK (
    (auth.role() = 'authenticated' AND user_id = auth.uid() AND public.can_reserve(class_id))
    OR public.is_admin()
    OR public.is_instructor()
  );

-- Note: function runs with the privileges of the caller; ensure the policy allows intended behavior.
