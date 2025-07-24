'use client';

export default function Apptips() {
  return (
    <div className="bg-[#d7cdbc]"> 
       <section className="pt-[120px] pb-32 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto"> 
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">App Tips</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-4"></div>
        <div className="grid grid-cols-6 gap-4 lg:gap-12 text-black p-4 font-inter">
            <div className="col-span-6 lg:col-span-2 text-[18px] font-medium">
                <p className="text-[14px] font-semibold text-center pb-4">Troubleshooting Siri</p>
                <p className="pb-3">• Check your device&apos;s volume. Make sure it&apos;s turned up.</p>
                <p className="pb-3">• Create a Lash and activate it. Then put your device in sleep mode and say, “Siri Shedooby.”</p>
                <p className="pb-3">• Delete the Shedooby Shortcut from your Shortcuts App. Then follow the instructions to add it again. Be sure when you add the Shedooby Shortcut you&apos;re not selecting the shortcut called <em>Log Shedooby</em>.</p>
                <p>• Your device must be in sleep mode (screen black) in order to use Shedooby with Siri. While driving, for example, you may have to repeat “Siri Shedooby” more than once if Siri doesn&apos;t hear you the first time.</p>
            </div>
            <div className="bg-[#cac0b0] h-[42px] col-span-6 lg:hidden"></div>
            <div className="col-span-6 lg:col-span-4 font-semibold text-[19px]">
                <p className="text-[14px] text-center pb-4">An Effective Lash</p>
                <p className="pb-3">Because a modal only appears for 5 seconds and because you&apos;re going to hear or see your lash each time you catch yourself flitting into mind chatter, 20 words or less is optimal. </p>
                <p className="pb-3">A lash may begin with a trigger, i.e. something you&apos;re afraid of becoming if you continue old habits and you don&apos;t take corrective actions. I use “McFly.” Many in my generation enjoyed Back To The Future. I did, too, when it came out in the 1980s. Then, I was looking out at life. A long promising and prosperous future. Now, decades later, I&apos;m afraid of ending up a lifelong loser. It is no joke for me. Naturally, using Hey McFly is between me and myself. I only share it with you as an example of a personal pain point.</p>
                <p className="pb-3">“Hey McFly” is a sobering trigger. Each time Siri speaks it, or I see it in my modal, I am instantly jerked back to focus on something worthy of my attention and away from zero-value distraction. </p>
                <p className="pb-3">The trigger should be followed with a phrase or a specific task. Whether I&apos;m trying to solve a programming problem, deal with a household issue, or take responsibility for something I&apos;ve been putting off, I can modify my lashes as needed throughout the duration of the Mind Camp.</p>
                <p className="pb-3">If depression is upon me, “You can cry like Taylor Swift, or you can drop and give me 50 pushups and 50 sit-ups” says Siri. There is no perfect solution for depression. But strengthening my body beats the shit out of weeping helplessly, self-medicating, or both. Agonizing thoughts still loom, but they&apos;re given momentary pause while I exert myself with weight reps, cardio on an elliptical, running on a track, a round of yoga... Depression is a head thing. Exertion is body. Become soft and helpless, or become hard and fight?</p>
                <p>Has someone humiliated, disappointed or generally pissed you off? Screenshot rage-bait—it&apos;s fuel for focus. Use their words for your lash. If it stirs up emotion, it can lash you out of complacency. Anger is energy. Use it.</p>
            </div>
        </div>
      </section>
    </div>
  );
}