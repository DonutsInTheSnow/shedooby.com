'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Logout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const signOut = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          router.push('/admin/login');
          return;
        }

        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error signing out:', error);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
      setLoading(false);
      router.push('/admin/login');
    };
    signOut();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-[#d7cdbc] pt-[120px] px-2 text-center">Logging out...</div>;
  }

  return null;
}