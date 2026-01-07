-- Migration: 008_create_video_views.sql
-- Creates `video_views` table and a trigger to increment profiles.metadata.videos_watched

CREATE TABLE IF NOT EXISTS public.video_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE public.video_views ENABLE ROW LEVEL SECURITY;

-- Authenticated users can insert their own view records
CREATE POLICY "Users can insert video_views"
  ON public.video_views
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND user_id = auth.uid());

-- Users can select their own views (or admins)
CREATE POLICY "Users can select own video_views"
  ON public.video_views
  FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Optional admin manage policy
CREATE POLICY "Admins manage video_views"
  ON public.video_views
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Trigger: after insert, increment profiles.metadata.videos_watched
CREATE OR REPLACE FUNCTION public.increment_videos_watched()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE public.profiles
    SET metadata = jsonb_set(coalesce(metadata, '{}'::jsonb), '{videos_watched}', to_jsonb(coalesce((metadata->>'videos_watched')::int, 0) + 1))
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS video_view_increment_trigger ON public.video_views;
CREATE TRIGGER video_view_increment_trigger
AFTER INSERT ON public.video_views
FOR EACH ROW
EXECUTE FUNCTION public.increment_videos_watched();

CREATE INDEX IF NOT EXISTS idx_video_views_user ON public.video_views (user_id);
CREATE INDEX IF NOT EXISTS idx_video_views_video ON public.video_views (video_id);
