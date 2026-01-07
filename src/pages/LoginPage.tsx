import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../contexts/SupabaseProvider';

export default function LoginPage() {
  const { signIn } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message || 'Login failed');
        setLoading(false);
        return;
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white">Sign in</h1>
          <p className="text-gray-400 mt-2">Access your dojo dashboard and training resources.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white" />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white" />
          </div>

          {error && <div className="text-sm text-red-400 mb-4">{error}</div>}

          <div className="flex items-center justify-between gap-4">
            <button disabled={loading} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">{loading ? 'Signing in...' : 'Sign in'}</button>
            <button type="button" onClick={() => navigate('/reset-password')} className="text-sm text-gray-400 hover:text-white">Forgot password?</button>
          </div>
        </form>
      </div>
    </main>
  );
}
