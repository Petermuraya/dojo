import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { useSupabaseAuth } from '../contexts/SupabaseProvider';

type Profile = {
  id: string;
  full_name?: string;
  program?: string;
  location?: string;
  belt?: string;
  metadata?: any;
};

type ClassItem = {
  id: string;
  title: string;
  start_time: string;
  end_time?: string;
  location?: string;
  program?: string;
};

type Announcement = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  program?: string;
};

export default function Dashboard() {
  const { user } = useSupabaseAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nextClass, setNextClass] = useState<ClassItem | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let classesSub: any = null;
    let annSub: any = null;
    let attendanceSub: any = null;

    const load = async () => {
      setLoading(true);

      // load profile
      const { data: profData, error: profErr } = await supabase
        .from('profiles')
        .select('id, full_name, program, location, belt, metadata')
        .eq('id', user.id)
        .maybeSingle();
      if (!profErr && profData) setProfile(profData as Profile);

      // fetch upcoming classes (limit a few, we'll pick best match)
      const now = new Date().toISOString();
      const { data: classesData } = await supabase
        .from('classes')
        .select('id, title, start_time, end_time, location, program, capacity')
        .gt('start_time', now)
        .eq('published', true)
        .order('start_time', { ascending: true })
        .limit(5);

      let chosen: ClassItem | null = null;
      if (classesData && classesData.length > 0) {
        if (profData?.program) {
          chosen = (classesData as ClassItem[]).find((c) => c.program === profData.program) || (classesData as ClassItem[])[0];
        } else {
          chosen = (classesData as ClassItem[])[0];
        }
      }
      setNextClass(chosen);

      // if chosen has id, fetch reservation count
      if (chosen) {
        const { data: cnt } = await supabase
          .from('class_attendance')
          .select('id', { count: 'exact' })
          .eq('class_id', chosen.id)
          .in('status', ['reserved', 'attended']);
        setCurrentReservationCount((cnt && (cnt.count as number)) || 0);
        setSelectedClassCapacity((chosen as any).capacity ?? null);
      } else {
        setCurrentReservationCount(0);
        setSelectedClassCapacity(null);
      }

      // fetch announcements (public + student + program)
      const { data: anns } = await supabase
        .from('announcements')
        .select('id, title, body, program, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(10);

      const filtered = (anns || []).filter((a: any) => {
        if (!a) return false;
        if (a.program && profData?.program) return a.program === profData.program;
        return true; // include public/students by default because RLS will have filtered
      });
      setAnnouncements(filtered as Announcement[]);

      setLoading(false);

      // realtime subscriptions to refresh lists
      classesSub = supabase
        .channel('public:classes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'classes' }, () => {
          // reload classes
          (async () => {
            const { data: cls } = await supabase
              .from('classes')
              .select('id, title, start_time, end_time, location, program')
              .gt('start_time', new Date().toISOString())
              .eq('published', true)
              .order('start_time', { ascending: true })
              .limit(5);
            if (cls && cls.length > 0) {
              const pick = profile?.program ? (cls as ClassItem[]).find((c) => c.program === profile.program) || (cls as ClassItem[])[0] : (cls as ClassItem[])[0];
              setNextClass(pick || null);
            } else {
              setNextClass(null);
            }
          })();
        })
        .subscribe();

      annSub = supabase
        .channel('public:announcements')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, () => {
          (async () => {
            const { data: fresh } = await supabase
              .from('announcements')
              .select('id, title, body, program, created_at')
              .eq('published', true)
              .order('created_at', { ascending: false })
              .limit(10);
            setAnnouncements((fresh || []) as Announcement[]);
          })();
        })
        .subscribe();

      // subscribe to attendance changes for this user
      attendanceSub = supabase
        .channel(`public:class_attendance:user:${user.id}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'class_attendance', filter: `user_id=eq.${user.id}` }, (payload) => {
          // reload attendance for current next class
          (async () => {
            if (nextClass) {
              const { data: att } = await supabase
                .from('class_attendance')
                .select('id, status, checked_in')
                .eq('class_id', nextClass.id)
                .eq('user_id', user.id)
                .maybeSingle();
              setAttendance(att || null);
            }
          })();
        })
        .subscribe();
    };

    load();

    return () => {
      try {
        if (classesSub) supabase.removeChannel(classesSub);
        if (annSub) supabase.removeChannel(annSub);
        if (attendanceSub) supabase.removeChannel(attendanceSub);
      } catch (err) {}
    };
  }, [user, profile?.program]);

  const [attendance, setAttendance] = useState<any | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [videoHistory, setVideoHistory] = useState<any[]>([]);
  const [currentReservationCount, setCurrentReservationCount] = useState<number | null>(null);
  const [selectedClassCapacity, setSelectedClassCapacity] = useState<number | null>(null);

  // load attendance for the chosen nextClass
  useEffect(() => {
    if (!user || !nextClass) return;
    (async () => {
      const { data: att } = await supabase
        .from('class_attendance')
        .select('id, status, checked_in')
        .eq('class_id', nextClass.id)
        .eq('user_id', user.id)
        .maybeSingle();
      setAttendance(att || null);
      // load attendance history
      const { data: aHist } = await supabase
        .from('class_attendance')
        .select('id, class_id, status, checked_in, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      setAttendanceHistory((aHist as any[]) || []);

      // load video view history
      const { data: vHist } = await supabase
        .from('video_views')
        .select('id, video_id, viewed_at')
        .eq('user_id', user.id)
        .order('viewed_at', { ascending: false })
        .limit(20);
      setVideoHistory((vHist as any[]) || []);
    })();
  }, [user, nextClass]);

  const rsvpToClass = async (classId: string) => {
    if (!user) return;
    try {
      const { data, error } = await supabase.from('class_attendance').insert([{ class_id: classId, user_id: user.id, status: 'reserved' }]);
      if (!error) setAttendance((data && data[0]) || null);
    } catch (err) {}
  };

  const checkInToClass = async (classId: string) => {
    if (!user) return;
    try {
      if (attendance?.id) {
        await supabase.from('class_attendance').update({ checked_in: true, status: 'attended' }).eq('id', attendance.id);
      } else {
        // create and mark checked_in
        const { data } = await supabase.from('class_attendance').insert([{ class_id: classId, user_id: user.id, status: 'attended', checked_in: true }]);
        setAttendance((data && data[0]) || null);
      }
    } catch (err) {}
  };

  const watchFirstPublicVideo = async () => {
    if (!user) return;
    try {
      const { data: video } = await supabase
        .from('videos')
        .select('id, title, url')
        .eq('published', true)
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (video) {
        // open video in a new tab
        window.open(video.url, '_blank');
        // record view
        await supabase.from('video_views').insert([{ video_id: video.id, user_id: user.id }]);
      }
    } catch (err) {}
  };

  if (!user) return <div className="p-8 text-gray-400">Please sign in to view your dashboard.</div>;

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-white">Welcome{profile?.full_name ? `, ${profile.full_name}` : ''}</h1>
            <p className="text-gray-400 mt-2">Your training snapshot and upcoming activities.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Program</div>
            <div className="font-bold text-white">{profile?.program || '—'}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <h3 className="text-white font-bold mb-2">Next Class</h3>
              {nextClass ? (
                <div>
                  <div className="text-lg font-semibold text-white">{nextClass.title}</div>
                  <div className="text-sm text-gray-400">{new Date(nextClass.start_time).toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{nextClass.location}</div>
                  <div className="mt-3">
                    {selectedClassCapacity !== null && (
                      <div className="text-sm text-gray-400 mb-2">Capacity: {currentReservationCount}/{selectedClassCapacity}</div>
                    )}
                    {!attendance ? (
                      <div className="flex gap-2">
                        <button onClick={() => rsvpToClass(nextClass.id)} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md" disabled={selectedClassCapacity !== null && currentReservationCount !== null && currentReservationCount >= (selectedClassCapacity ?? 0)}>
                          RSVP
                        </button>
                        <button onClick={() => checkInToClass(nextClass.id)} className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-md">
                          Join / Check in
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-green-400">You are {attendance.status}{attendance.checked_in ? ' and checked in' : ''}.</div>
                    )}
                    <div className="mt-3">
                      <button onClick={() => watchFirstPublicVideo()} className="text-sm text-gray-300 underline">Watch latest public video</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">No upcoming class.</div>
              )}
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <h3 className="text-white font-bold mb-2">Announcements</h3>
              {announcements.length === 0 ? (
                <div className="text-gray-400">No announcements.</div>
              ) : (
                <ul className="space-y-3">
                  {announcements.map((a) => (
                    <li key={a.id} className="p-2 bg-gray-800/30 rounded">
                      <div className="font-semibold text-white">{a.title}</div>
                      <div className="text-sm text-gray-400">{new Date(a.created_at).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-300 mt-1 line-clamp-3">{a.body}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <h3 className="text-white font-bold mb-2">Progress</h3>
              <div className="text-gray-400">Belt: <span className="font-bold text-white">{profile?.belt || 'White'}</span></div>
              <div className="text-gray-400 mt-2">Attendance: <span className="font-bold text-white">{profile?.metadata?.attendance ?? '—'}</span></div>
              <div className="text-gray-400 mt-2">Videos watched: <span className="font-bold text-white">{profile?.metadata?.videos_watched ?? '—'}</span></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
