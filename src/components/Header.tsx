'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/lib/auth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ position: 'fixed', width: '100%' }} className="top-0 z-50">
      <nav style={{ boxShadow: '0 0 5px #555555' }} className="bg-[#aaaaaa] text-white p-2 md:pl-16 md:pr-16 w-full md:max-w-[800px] md:mx-auto md:rounded-tl-none md:rounded-tr-none md:rounded-bl-[75px] md:rounded-br-[75px] flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Home">
          <Image src="/brain-icon.png" alt="Brain Logo" width={55} height={55} />
        </Link>

        {/* Hamburger Icon and Menu */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg className="h-8 w-8 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-10">
          <Link href="/about" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">About</Link>
          <Link href="/apptips" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">App Tips</Link>
          <Link href="/blog" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">Blog</Link>
          <Link href="/privacypolicy" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">Privacy</Link>
          {/* Uncomment cart and merch when ready to launch store */}
          {/* <Link href="/cart" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">Cart</Link>
          <Link href="/merch" className="hover:underline text-base hover:text-[#a1211f] active:text-[#a1211f] focus:text-[#a1211f]">Merch</Link> */}
          {user?.id === 'a7560fa4-39cc-4564-a04c-e894f9ee33bd' && (
            <>
              <Link href="/admin/blog/new" className="hover:underline text-base">Create Post</Link>
              <Link href="/admin/logout" className="hover:underline text-base">Logout</Link>
            </>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className={`sm:hidden bg-[rgba(0,0,0,.75)] p-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 text-right">
            <Link href="/about" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              About
            </Link>
            <Link href="/apptips" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              App Tips
            </Link>
            <Link href="/blog" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Blog
            </Link>
            <Link href="/privacypolicy" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Privacy
            </Link>
            {/* <Link href="/cart" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Cart
            </Link>
            <Link href="/merch" onClick={toggleMenu} className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Merch
            </Link> */}
            {user?.id === 'a7560fa4-39cc-4564-a04c-e894f9ee33bd' && (
              <>
                <Link
                  href="/admin/blog/new"
                  onClick={toggleMenu}
                  className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1"
                >
                  Create Post
                </Link>
                <Link
                  href="/admin/logout"
                  onClick={toggleMenu}
                  className="text-2xl active:text-[#a1211f] focus:text-[#a1211f] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1"
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}