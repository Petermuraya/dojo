import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';
import { useSupabaseAuth } from '../contexts/SupabaseProvider';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('adult');
  const [program, setProgram] = useState('Adults');
  const [location, setLocation] = useState('Main Dojo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await signUp(email, password);
      if (signUpError) {
        setError(signUpError.message || 'Unable to register');
        setLoading(false);
        return;
      }

      // If user exists immediately (no email confirmation), create a minimal profile
      const userId = data?.user?.id ?? null;
      if (userId) {
        await supabase.from('profiles').upsert({
          id: userId,
          full_name: fullName,
          role,
          program,
          location,
        });
      }

      // If email confirmation is required, inform the user
      if (!data?.user) {
        setMessage('Check your email to confirm your account.');
      } else {
        setMessage('Registration successful — redirecting...');
        setTimeout(() => navigate('/'), 900);
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-4">Create an account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-300">Full name</label>
          <input
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a secure password"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
              className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="adult">Adult Student</option>
              <option value="child">Child Student</option>
              <option value="trial">Trial</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Program</label>
            <select
              className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option>Adults</option>
              <option>Kids</option>
              <option>Teens</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-300">Location</label>
          <select
            className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Main Dojo</option>
            <option>West Branch</option>
          </select>
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}
        {message && <div className="text-sm text-green-400">{message}</div>}

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
}
