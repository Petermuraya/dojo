import React from 'react';
import Register from '../components/Register';

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white">Join the Dojo</h1>
          <p className="text-gray-400 mt-2">Create your account to access training, schedules and progress tracking.</p>
        </div>

        <Register />
      </div>
    </main>
  );
}
