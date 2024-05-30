import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-blue-900 overflow-hidden">
      <img
        src="/src/assets/Glow.svg"
        alt="Hero Section img"
        className="w-full h-auto absolute z-0 top-0"
      />
      <img
        src="/src/assets/image.png"
        alt="Hero Section img"
        className="absolute max-w-[272px] max-h-[272px] md:max-w-[442px] md:max-h-[441px] z-0 top-0 md:right-0 -right-20"
      />
      <div className="max-w-[1440px] mx-auto h-auto md:h-[669px] px-5 text-white">
        <div className="py-8 md:pt-36 max-w-[800px] mx-auto">
          <div className="flex flex-col gap-[17px] md:gap-6 z-10">
            <h1 className="font-medium text-2xl md:text-[60px] md:leading-[74px] font-montserrat z-10">
              Wondering how much a Snowflake Data Cloud could cost?
            </h1>
            <div className="flex flex-col gap-4 md:gap-6">
              <p className="z-10 font-montserrat text-xs md:text-base">
                Migrating your data from an on-prem to a Cloud Datawarehouse
                &#40;or from one CDW to another&#41; could be a daunting task.
                Even more when you can&apos;t estimate how much your new CDW
                could cost you. You are not alone. Most of our customers have
                shared this experience with us.
              </p>
              <p className="z-10 font-montserrat text-xs md:text-base">
                This is why we put our 1000&apos;s of hours of Snowflake
                expertise to develop this free Snowflake Cost Calculator to help
                you.
              </p>
            </div>
          </div>
          <p className="relative md:text-xs mt-8 md:mt-[43px] z-10 font-montserrat text-[10px]">
            *This calculator aims to provide you a ball park estimate for what
            to expect as a monthly cost of Snowflake. Actual costs may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
