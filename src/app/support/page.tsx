'use client';

export default function Support() {
  return (
    <div className="bg-[#d7cdbc]">
      <section className="pt-[120px] pb-32 sm:max-w-[500px] lg:max-w-[1050px] mx-auto">
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Support</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-2"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 text-black p-3 font-inter">
          <div className="text-[18px] font-semibold">
              <p className="text-[14px] font-semibold text-center pb-4">Troubleshooting Siri</p>
              <p className="pb-3">• Check your device&apos;s volume. Make sure it&apos;s turned up.</p>
              <p className="pb-3">• Create a Lash and activate it. Then put your device in sleep mode and say, “Siri Shedooby.”</p>
              <p className="pb-3">• Delete the Shedooby Shortcut from your Shortcuts App. Then follow the instructions to add it again. Be sure when you add the Shedooby Shortcut you select the shortcut called <em>Shedooby</em> and NOT the shortcut called <em>Log Shedooby</em>.</p>
              <p className="pb-7">• Your device must be in sleep mode (screen black) in order to use Shedooby with Siri. While driving, for example, you may have to repeat “Siri Shedooby” more than once if Siri doesn&apos;t hear you the first time.</p>
          </div>

          <div className="bg-[#cac0b0] h-[42px] col-span-6 lg:hidden"></div>

          <div className="font-semibold text-[19px]">
            <p className="text-[14px] font-semibold text-center pb-4 pt-3 lg:pt-0">Support</p>
            <p className="pb-3">If you still need help using the Shedooby app after trying the troubleshooting steps, you can reach out via email at{' '}
            <a href="mailto:ronnie.van.cognizant@gmail.com" className="underline text-[#a1211f]" target="_blank" rel="noopener noreferrer">
                support@shedooby.com
            </a>.
            </p>
            <p className="pb-3">
            <strong>Mailing Address:</strong><br />
            Shedooby Support<br />
            P.O. Box 422<br />
            Wolfeboro, NH 03894<br />
            USA
            </p>
            <p className="pb-3">
            <strong>Phone:</strong> (802) 222-6473<br />
            Available Monday - Friday, 4 PM - 8 PM EST
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
