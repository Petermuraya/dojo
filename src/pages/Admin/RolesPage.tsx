import React, { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';
import { useSupabaseAuth } from '../../contexts/SupabaseProvider';

type Profile = {
  id: string;
  full_name?: string;
  program?: string;
  location?: string;
};

export default function RolesPage() {
  const { user, loading } = useSupabaseAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, string[]>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Check admin via RPC
    (async () => {
      try {
        const { data, error } = await supabase.rpc('is_admin');
        if (error) throw error;
        setIsAdmin(Boolean(data));
      } catch (err) {
        setIsAdmin(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    // Load profiles and roles
    (async () => {
      const { data: pData } = await supabase.from('profiles').select('id, full_name, program, location').order('full_name');
      const { data: rData } = await supabase.from('user_roles').select('user_id, role');

      setProfiles((pData as Profile[]) || []);

      const map: Record<string, string[]> = {};
      (rData || []).forEach((r: any) => {
        map[r.user_id] = map[r.user_id] || [];
        map[r.user_id].push(r.role);
      });
      setRolesMap(map);
    })();
  }, [isAdmin]);

  const toggleRole = async (userId: string, role: string) => {
    setBusy(true);
    try {
      const has = (rolesMap[userId] || []).includes(role);
      if (has) {
        await supabase.from('user_roles').delete().match({ user_id: userId, role });
        setRolesMap((m) => ({ ...(m), [userId]: (m[userId] || []).filter((r) => r !== role) }));
      } else {
        await supabase.from('user_roles').insert([{ user_id: userId, role }]);
        setRolesMap((m) => ({ ...(m), [userId]: [...(m[userId] || []), role] }));
      }
    } catch (err) {
      // ignore — server will enforce policies
    } finally {
      setBusy(false);
    }
  };

  if (loading || isAdmin === null) return <div className="p-8 text-gray-400">Checking access...</div>;
  if (!isAdmin) return <div className="p-8 text-red-400">Access denied. Admins only.</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-4">Admin — Manage Roles</h1>
        <p className="text-gray-400 mb-6">Assign `admin` or `instructor` roles to user profiles.</p>

        <div className="space-y-4">
          {profiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-gray-900/40 p-4 rounded-lg border border-gray-800">
              <div>
                <div className="text-white font-bold">{p.full_name || p.id}</div>
                <div className="text-sm text-gray-400">{p.program || ''} • {p.location || ''}</div>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-300">Instructor</label>
                <input type="checkbox" checked={(rolesMap[p.id] || []).includes('instructor')} onChange={() => toggleRole(p.id, 'instructor')} disabled={busy} />
                <label className="text-sm text-gray-300">Admin</label>
                <input type="checkbox" checked={(rolesMap[p.id] || []).includes('admin')} onChange={() => toggleRole(p.id, 'admin')} disabled={busy} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
