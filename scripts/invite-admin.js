#!/usr/bin/env node
/*
Simple Node script to invite (assign role) to a Supabase user.
Usage: SUPABASE_URL=https://your.supabase.co SUPABASE_SERVICE_ROLE_KEY=your_service_role_key node scripts/invite-admin.js user@example.com instructor

This script must be run server-side where the service role key is safe.
*/
const { createClient } = require('@supabase/supabase-js');

async function run() {
  const [email, role] = process.argv.slice(2);
  if (!email || !role) {
    console.error('Usage: node scripts/invite-admin.js <email> <role>');
    process.exit(1);
  }

  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  try {
    // list users and find by email (acceptable for small projects)
    const { data: listResult, error: listErr } = await supabase.auth.admin.listUsers();
    if (listErr) throw listErr;
    const user = (listResult?.users || []).find((u) => u.email && u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      console.error('User not found in auth.users. The user must sign up first.');
      process.exit(1);
    }

    // Insert into user_roles
    const { data, error } = await supabase.from('user_roles').insert([{ user_id: user.id, role }]);
    if (error) throw error;
    console.log('Role assigned:', data);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
