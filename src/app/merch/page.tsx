// app/merch/page.tsx
'use client';

import Image from 'next/image';
import ShopifyBuyButton from '@/components/ShopifyBuyButton';

export default function Merch() {
  return (
    <div className="bg-[#d7cdbc]">
      
      <section className="pt-[120px] pb-4 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto"> 
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Merch</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
      </section>

      <section className="max-w-[1050px] mx-auto">
        <p className="text-[14px] text-center font-semibold text-black pb-4">Official 8-Week Mind Camp gear. Designed to remind.</p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-6">
            <div className="p-6 rounded shadow-sm">
              <Image 
                src="/images/khaki-t.webp" 
                alt="Shedooby T-shirt in Khaki" 
                width={881} 
                height={1024}
                className="mx-auto rounded"
                priority
              />
            </div>
            
            <div className="p-6 rounded shadow-sm">
              <Image 
                src="/images/white-t.webp" 
                alt="Shedooby T-shirt in White" 
                width={881} 
                height={1024}
                className="mx-auto rounded"
              />
            </div>
          </div>

          <div className="lg:pt-8 p-4">
            <h2 className="font-inter text-3xl font-semibold text-black mb-2">
              Discipline Wins Inner Wars T-Shirt
            </h2>

            <div className="prose text-black/90 text-[19px] leading-relaxed mb-10">
              <p>
                Premium cotton-poly blend. Soft, durable, and made for real life. 
                Features the signature Drill Sergeant design on military beige (khaki).
              </p>
              <p className="mt-4">
                Ships directly to you.
              </p>
            </div>

            <div className="mb-10">
              <p className="font-semibold text-black mb-2">Care Instructions:</p>
              <ul className="text-sm text-black/80 space-y-1">
                <li>• Machine wash cold, inside out</li>
                <li>• Gentle cycle</li>
                <li>• Do not bleach</li>
                <li>• Tumble dry low or air dry</li>
                <li>• Do not iron directly on print</li>
              </ul>
            </div>

            <div className="mb-8">
              <ShopifyBuyButton />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}