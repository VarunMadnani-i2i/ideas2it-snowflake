import React from "react";

export default function HeroSection() {
  return (
    <section>
      <div className="relative overflow-hidden bg-blue-900">
        <img
          src="https://uploads-ssl.webflow.com/64f810ca98a7e2ef2f6761ef/6673d3dd3bc3b8daa9776289_glow.svg"
          alt="Hero Section img"
          className="absolute top-0 z-0 w-full h-auto"
        />
        <img
          src="https://uploads-ssl.webflow.com/64f810ca98a7e2ef2f6761ef/6673d3dda2b7c4f706c037c5_hero_design.svg"
          alt="Hero Section img"
          className="absolute max-w-[272px] max-h-[272px] md:max-w-[442px] md:max-h-[441px] z-0 top-0 md:right-0 -right-20"
        />
        <div className="max-w-[1440px] mx-auto h-auto md:h-[630px] text-white">
          <div className="py-8 md:pt-24 px-5 max-w-[820px] mx-auto">
            <div className="flex flex-col gap-[17px] md:gap-6 z-10">
              <h1 className="font-medium text-2xl leading-[30px] md:text-[50px] md:leading-[60px] font-montserrat z-10">
                Wondering how much a Snowflake Data Cloud could cost?
              </h1>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="z-10 text-xs font-montserrat md:text-base">
                  Migrating your data from an on-prem to a Cloud Datawarehouse
                  &#40;or from one CDW to another&#41; could be a daunting task.
                  Even more when you can&apos;t estimate how much your new CDW
                  could cost you. You are not alone. Most of our customers have
                  shared this experience with us.
                </p>
                <p className="z-10 text-xs font-montserrat md:text-base">
                  This is why we put our 1000&apos;s of hours of Snowflake
                  expertise to develop this free Snowflake Cost Calculator to
                  help you.
                </p>
              </div>
            </div>
            <p className="relative md:text-xs mt-8 md:mt-[43px] z-10 font-montserrat text-[10px]">
              *This calculator aims to provide you a ball park estimate for what
              to expect as a monthly cost of Snowflake. Actual costs may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
