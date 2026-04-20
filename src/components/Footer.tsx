
'use client';

import Link from 'next/link';

export default function Footer() {

  return (
    <div className="md:flex md:justify-center">
      <footer className="bottom-0 w-full z-50 p-4 bg-[#c9c8a1] md:bg-[#d7cdbc] text-center text-white">
        <p className="text-[15px] mt-2">
          © 2026 Rich Hudson. All rights reserved. <Link href="/privacypolicy" className="hover:underline text-base hover:text-[#a1211f]">Privacy</Link>.
        </p>
      </footer>
    </div>
  );
}