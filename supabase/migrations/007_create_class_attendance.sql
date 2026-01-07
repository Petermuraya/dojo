-- Migration: 007_create_class_attendance.sql
-- Creates `class_attendance` table and adds triggers/policies to track attendance

CREATE TABLE IF NOT EXISTS public.class_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES public.classes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'reserved', -- reserved | canceled | attended
  checked_in boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS set_timestamp ON public.class_attendance;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.class_attendance
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp();

-- Enable RLS
ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own attendance (RSVP)
CREATE POLICY "Users can insert attendance for themselves"
  ON public.class_attendance
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Allow users to select their own attendance or admins
CREATE POLICY "Users can select own attendance"
  ON public.class_attendance
  FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Allow users to update their own attendance (e.g., cancel)
CREATE POLICY "Users can update own attendance"
  ON public.class_attendance
  FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin())
  WITH CHECK (user_id = auth.uid() OR public.is_admin());

-- Allow instructors/admins to manage attendance
CREATE POLICY "Instructors/admins manage attendance"
  ON public.class_attendance
  FOR ALL
  USING (public.is_admin() OR public.is_instructor())
  WITH CHECK (public.is_admin() OR public.is_instructor());

-- Trigger: increment profiles.metadata.attendance when a record becomes checked_in = true
CREATE OR REPLACE FUNCTION public.increment_attendance_on_checkin()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    IF (NEW.checked_in = true AND (OLD.checked_in IS NULL OR OLD.checked_in = false)) THEN
      UPDATE public.profiles
      SET metadata = jsonb_set(coalesce(metadata, '{}'::jsonb), '{attendance}', to_jsonb(coalesce((metadata->>'attendance')::int, 0) + 1))
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS attendance_checkin_trigger ON public.class_attendance;
CREATE TRIGGER attendance_checkin_trigger
AFTER UPDATE ON public.class_attendance
FOR EACH ROW
EXECUTE FUNCTION public.increment_attendance_on_checkin();

CREATE INDEX IF NOT EXISTS idx_class_attendance_user ON public.class_attendance (user_id);
CREATE INDEX IF NOT EXISTS idx_class_attendance_class ON public.class_attendance (class_id);
