'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-[#d7cdbc] min-h-screen">
      <section className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col justify-between">
        <Image
          src="/images/drill-sergeant-mobile.webp"
          alt="Drill Sergeant mobile"
          fill
          sizes="(max-width: 640px) 100vw"
          className="object-contain opacity-10 md:block lg:hidden z-[1]"
          priority
        />
        <Image
          src="/images/drill-sergeant-tablet.webp"
          alt="The Comb Overs performing on tablet"
          fill
          sizes="(min-width: 768px) 100vw, (max-width: 1024px) 100vw"
          className="object-contain opacity-10 hidden md:hidden lg:block xl:hidden z-[1]"
          priority
        />
        <Image
          src="/images/drill-sergeant-laptop.webp"
          alt="The Comb Overs performing on desktop"
          fill
          sizes="(min-width: 1280px) 100vw"
          className="object-contain opacity-10 hidden xl:block z-[1]"
          priority
        />
        <div className="relative text-black flex flex-col items-center mt-36 z-[2]">
          <h1 className="text-[32px] md:text-[60px] italic text-center font-inter" style={{ letterSpacing: 3 }}>
            SHEDOOBY™
          </h1>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-gray-800 text-center">Your Digital Drill Sergeant</h2>
          <h3 className="text-[21px] md:text-[24px] font-semibold text-gray-800 text-center mt-32 md:mt-12">
            8-week Mind Camp
          </h3>
          <div className="bg-black w-full max-w-[905px] h-[42px] md:h-[76px] opacity-10"></div>
          <p className="text-[21px] mt-2 font-medium text-center text-[#a1211f]">—no social media, no alcohol—</p>
          <small className="text-[#a1211f] text-center leading-tight">
            ** Consult a doctor before lifestyle changes, including if<br /> you have alcohol dependency.
          </small>
        </div>
        <div className="absolute bottom-0 md:bottom-6 w-full flex justify-center z-50">
          <div className="bg-[#c9c8a1] text-center text-white md:w-[375px] md:rounded-[10px] md:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] p-4">
            <p className="text-gray-800 text-[18px] font-semibold mb-2">Follow Shedooby™ after Mind Camp</p>
            <div className="flex justify-center space-x-7">
              <Link href="https://x.com" target="blank" rel="noopener noreferrer">
                <Image src="/x-icon.png" alt="X" width={30} height={30} />
              </Link>
              <Link href="https://facebook.com" target="blank" rel="noopener noreferrer">
                <Image src="/facebook-icon.png" alt="Facebook" width={30} height={30} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}