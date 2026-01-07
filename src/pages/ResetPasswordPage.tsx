import React, { useState } from 'react';
import supabase from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      // Supabase: send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login'
      } as any);
      if (error) {
        setError(error.message || 'Unable to send reset link');
      } else {
        setMessage('Check your email for reset instructions.');
      }
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
          <h1 className="text-3xl md:text-4xl font-black text-white">Reset password</h1>
          <p className="text-gray-400 mt-2">Enter the email on your account and we'll send reset instructions.</p>
        </div>

        <form onSubmit={handleReset} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800">
          <div className="mb-4">
            <label className="text-sm text-gray-300">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-white" />
          </div>

          {error && <div className="text-sm text-red-400 mb-4">{error}</div>}
          {message && <div className="text-sm text-green-400 mb-4">{message}</div>}

          <div className="flex items-center justify-between gap-4">
            <button disabled={loading} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-lg">{loading ? 'Sending...' : 'Send reset email'}</button>
            <button type="button" onClick={() => navigate('/login')} className="text-sm text-gray-400 hover:text-white">Back to login</button>
          </div>
        </form>
      </div>
    </main>
  );
}
