import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import supabase from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  refreshRoles: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        // refresh roles for existing session
        if (data.session?.user) {
          refreshRoles().catch(() => {});
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
      // refresh roles on auth changes
      refreshRoles().catch(() => {});
    });

    return () => {
      mounted = false;
      // cleanup subscription
      // `listener` shape: { subscription }
      // unsubscribe if available
      try {
        // @ts-ignore
        listener?.subscription?.unsubscribe?.();
      } catch {}
    };
  }, []);

  const signUp = (email: string, password: string) => supabase.auth.signUp({ email, password });
  const signIn = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password });
  const signOut = () => supabase.auth.signOut();

  const refreshRoles = async () => {
    try {
      if (!user) {
        setIsAdmin(false);
        setIsInstructor(false);
        return;
      }

      const { data: adminRes, error: adminErr } = await supabase.rpc('is_admin');
      if (!adminErr) setIsAdmin(Boolean(adminRes));

      const { data: instrRes, error: instrErr } = await supabase.rpc('is_instructor');
      if (!instrErr) setIsInstructor(Boolean(instrRes));
    } catch (err) {
      setIsAdmin(false);
      setIsInstructor(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isInstructor, refreshRoles, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useSupabaseAuth must be used within SupabaseProvider');
  return ctx;
};

export default SupabaseProvider;
