// Vercel / Netlify serverless function template to assign a role to a user.
// Deploy this to a serverless environment where SUPABASE_SERVICE_ROLE_KEY is set.
// POST body: { "email": "user@example.com", "role": "instructor" }
// Authorization: provide a server-to-server secret in `Authorization: Bearer <ADMIN_API_KEY>`

const { createClient } = require('@supabase/supabase-js');

const SERVICE_SECRET = process.env.INVITE_API_SECRET; // simple protection for the endpoint
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = (req.headers.authorization || '').split(' ')[1];
  if (!SERVICE_SECRET || auth !== SERVICE_SECRET) return res.status(401).json({ error: 'Unauthorized' });

  const { email, role } = req.body || {};
  if (!email || !role) return res.status(400).json({ error: 'Missing email or role' });

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return res.status(500).json({ error: 'Server misconfigured' });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  try {
    const { data: listResult, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) throw listErr;
    const user = (listResult?.users || []).find((u) => u.email && u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { data, error } = await supabase.from('user_roles').insert([{ user_id: user.id, role }]);
    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
};
