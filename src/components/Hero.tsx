"use client";

import ArrowIcon from "@/assets/icons/arrow-w.svg";
import CountdownTimer from "@/components/CountdownTimer";
import { isDateInPast } from "@/helper";

const countdownDate = new Date("2024-12-02T13:00:00");

export const Hero = () => {
  return (
    <div
      id="hero"
      className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_40%,#4F21A1_59%,#000_82%)] py-[72px] sm:py-24 relative overflow-clip"
    >
      {/* <div className="flex items-center justify-center">
          <a href="#" className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30">
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FF)] text-transparent bg-clip-text [-webkit-backgound-clip:text]">Discover Orion here</span>
            <span className="inline-flex items-center gap-1">
            <span>Whitepaper</span>
            <ArrowIcon />
            </span>
          </a>
        </div> */}
      {/* <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-full bg-black left-1/2 -translate-x-1/2 bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div> */}
      <div className="flex justify-center">
        <h1 className="text-4xl sm:text-7xl font-bold tracking-tighter text-center mt-8 inline-flex">
          Empower Your Future with ORION
        </h1></div>
        <div className="flex justify-center">

        <h1 className="text-4xl sm:text-7xl font-bold tracking-tighter text-center mt-8 inline-flex">
          Your Gateway to Renewable Innovation!
        </h1>
      </div>
      {/* { !isDateInPast(countdownDate) && 
          <CountdownTimer 
          deadline={countdownDate}
          title={'Beta Testing Phase Begins In :'}
        />
        } */}

      <div className="container relative">
        {/* <div className="flex justify-center">
            <p className="text-center text-xl mt-8 max-w-md">
            Step into the Vanguard of Renewable Energy with ORION Dione Protocol’s Blockchain-Powered Solution.
            </p>
          </div> 
          <div className="flex justify-center mb-8">
            <button className="shadow-[inset_0_0_0_2px_#ffffff] hover:shadow-[inset_0_0_0_2px_#ffffff] text-white mt-5 px-12 py-3 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#572676] hover:text-white dark:text-neutral-200 transition duration-200">
            <a href="https://yu773y9kayu.typeform.com/to/NYY4zLRl?utm_source=xxxxx&utm_medium=xxxxx&utm_campaign=xxxxx&utm_term=xxxxx&utm_content=xxxxx">Get your Orion</a>
            </button>
          </div>*/}
      </div>
    </div>
  );
};
