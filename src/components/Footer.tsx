
'use client';

// import { useAuth } from '@/app/layout';
import { useAuth } from '@/lib/auth'
import Link from 'next/link';

export default function Footer() {
  const { user } = useAuth();

  return (
    <div className="md:flex md:justify-center">
      <footer className="bottom-0 w-full z-50 p-4 bg-[#c9c8a1] md:bg-[#d7cdbc] text-center text-white">
        <p className="text-[15px] mt-2">
          {!user && (
            <Link href="/admin/login">©</Link>
          )}
          {user && '©'} 2025 Rich Hudson. All rights reserved.
        </p>
      </footer>
    </div>
  );
}