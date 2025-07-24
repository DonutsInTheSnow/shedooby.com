'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useEffect } from 'react';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#d7cdbc] pt-[120px] pb-[150px] px-2">
      <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Thank You for Your Purchase!</h2>
      <div className="bg-[#cac0b0] h-[42px] mx-4 mb-7"></div>
        <div className="flex flex-col items-center justify-center max-w-[500px] mx-auto">
          <p className="text-center text-lg text-gray-800">Your order has been successfully placed. You&apos;ll receive a confirmation email shortly with your order details. We&apos;re excited to get your Shedooby Merch shipped to you soon!</p>
          <Link href="/merch">
            <button className="bg-[#24572b] justify-center text-white px-4 py-2 mt-4 rounded hover:bg-black">
              Continue Shopping
            </button>
          </Link>
        </div>
    </div>
  );
}