'use client';

export default function About() {
  return (
    <div className="bg-[#d7cdbc]"> 
       <section className="pt-[120px] pb-32 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto"> 
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">About</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-2"></div>
        <div className="grid grid-cols-2 gap-4 lg:gap-7 text-black p-4 font-inter text-[19px] font-semibold">
            <div className="col-start-1 col-end-3 lg:col-end-2">
                <p className="pb-3">Discipline wins wars—inner wars most of all. Shedooby is your training ground. Your 56-day mission to eliminate distraction, rebuild focus, and reclaim your time.</p>
                <p className="pb-3">In this country, freedom is earned. Our Constitution guarantees it. The First Amendment gives you a voice. The Second ensures you keep it. But too many Americans are losing one freedom that&apos;s not enshrined: control over their own minds.</p>
                <p>This app was born out of necessity. I&apos;ve crossed life&apos;s 50-yard line, and the glass now looks half-empty. The time for excuses is over. No more squandering hours arguing with strangers. No more soaking in dopamine traps built to addict. No more chilling out.</p>
            </div>
            <div className="col-start-1 col-end-3 lg:col-start-2">
                <p className="pb-3">I built Shedooby as a digital drill sergeant. Every day, several times a day, it calls you to attention. It reminds you of your mission. Stay off social media. Stay sober. Show up with purpose. The weak will fall off. The committed will emerge transformed.</p>
                <p className="pb-3">Forget <em>likes</em>—this is about self-respect. Forget distractions—this is about mental armor. You&apos;ve got 56 days to complete your tour. If you make it to the end, you&apos;ll prove beyond all doubt:</p>
                <p className="pb-3">Your mind is yours to command.</p>
                <p>TEN-HUT.</p>
            </div>
        </div>
      </section>
    </div>
  );
}