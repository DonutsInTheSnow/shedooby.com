'use client';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#d7cdbc]">
      <section className="pt-[120px] pb-32 max-w-[1050px] md:max-w-[500px] lg:max-w-[1050px] mx-auto">
        <h2 className="font-inter text-[16px] font-semibold text-black text-center pb-4">Privacy Policy</h2>
        <div className="bg-[#cac0b0] h-[42px] mx-2"></div>
        <div className="grid grid-cols-1 gap-4 lg:gap-7 text-black p-4 font-inter text-[19px] font-semibold">
          <p className="pb-3">
            Shedooby does not collect or store any user data. A `tracker.json` file is created on your device to log timestamps of your interactions with the app. This data is yours, retained solely on your device for your benefit during the 56-day mission.
          </p>
          <p className="pb-3">
            No personal information (e.g., name, email) is gathered or shared. For EU users, your data remains under your control, aligning with GDPR principles. We have no access to this file. Contact us at ronnie.van.cognizant@gmail.com for any inquiries.
          </p>
          <p className="pb-3">
            We don&apos;t share or process your data. This policy may update; please check periodically. Using Shedooby signifies your acceptance of these terms.
          </p>
        </div>
      </section>
    </div>
  );
}