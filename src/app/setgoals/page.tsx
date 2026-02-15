'use client';

import Image from 'next/image';

export default function Lashtips() {
  return (
    <div className="bg-[#d7cdbc]"> 

       <section className="pt-[120px] pb-14 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto"> 
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Set Goals</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
        <div className="grid grid-cols-6 gap-4 lg:gap-12 text-black p-4 font-inter">
          <div className="col-span-12 font-semibold text-[19px]">
            <p className="pb-3">Saying no to social media and alcohol is real test of will power. While this alone proves you&apos;ve got mental strength, setting 3 attainable goals involving daily practice over Shedooby&apos;s 8-week duration delivers results you can build upon.</p>
            <p className="pb-3">Name your goals. A brief name that captures the essence of what you want to achieve. It should be specific, actionable, and meaningful to you.</p>
            <p className="pb-3">Define your daily practice. What are you going to do every day for 8 weeks? It must be something you can do consistently, and it must be tied to your goals. Assign a fixed amount of time daily. Even 15 minutes per day adds up over 8 weeks.</p>
          </div>
        </div>
      </section>

      <section className="pb-32 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto"> 
        <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
        <p className="text-[14px] text-center text-black font-semibold py-4">Mission Brief: 8-Week Goals</p>
        <div className="grid grid-cols-6 gap-4 lg:gap-12 text-black p-4 font-inter">
          <div className="col-span-6 lg:col-span-3 text-[19px] font-medium">
            <p className="pb-3"><strong>Goal 1 –</strong> <em>Name:</em> Build 4 Next.js and 2 Shopify apps. <em>Practice:</em> 90 minutes programming per day.</p>
            <p className="pb-3"><strong>Goal 2 –</strong> <em>Name:</em> Open Mic. <em>Practice:</em> 60 minutes per day in front of a mirror and self-video.</p>
            <p className="pb-3"><strong>Goal 3 –</strong> <em>Name:</em> Let&apos;s Get Physical. <em>Practice:</em> Elliptical/Yoga and Pushups/Weights, Situps/Leg Lifts. Alternating days.</p>
          </div>
          <div className="bg-[#cac0b0] h-[42px] col-span-6 lg:hidden"></div>
          <div className="col-span-6 lg:col-span-3 font-semibold text-[19px]">
            <div className="bg-[#c1bba9] max-w-[500px] px-3 pt-3 pb-9">
              <div className="py-9">
                <Image src="/images/letsGetPhysical.webp" alt="Olivia Newton John getting physical." className="mx-auto" width="300" height="300" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}