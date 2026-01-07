import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../contexts/SupabaseProvider';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useSupabaseAuth();
  const location = useLocation();

  if (loading) return <div className="p-8 text-gray-400">Checking authentication...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
