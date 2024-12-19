import Image from "next/image";
import Logo from "@/assets/images/Orion_alt_STK.png";
import XSocial from "@/assets/icons/XIcon.png";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaTelegram, FaDiscord} from "react-icons/fa";
import { X } from "lucide-react";

export const Footer = () => {
  return (
  <footer className="bg-black">
  <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
    <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
      <a
        className="inline-block rounded-full bg-purple1 p-2 text-white shadow transition hover:bg-purple1 sm:p-3 lg:p-4"
        href="#header"
      >
        <span className="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
    <div className="lg:flex lg:items-end lg:justify-between">
      <div>
        <div className="flex justify-center lg:justify-start mb-7">
        <a href="/" className="-m-1.5 p-1.5">
          <Image src={Logo} alt="logo" className="h-20 w-20 relative"/>
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
        Step into the Vanguard of Renewable Energy with ORION Dione Protocol’s Blockchain-Powered Solution.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <ul
          className="flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
        >
          <li>
            <a className="text-gray-700 transition hover:text-purple1" href="#"> Disclaimer </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-purple1" href="/PrivacyPolicy.pdf" target="blank"> Privacy Policy </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-purple1" href="/TermsOfService_ORION.pdf" target="blank"> Terms of use </a>
          </li>        
        </ul>

        <ul className="col-span-2 flex justify-center gap-6 lg:col-span-5 lg:justify-end">
            <li>
              <a
                href="https://discord.com/invite/nXZhwW7euX"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-purple1"
              >
                <span className="sr-only">Discord</span>
                <FaDiscord className="size-10" />

              </a>
            </li>
            <li>
              <a
                href="https://t.me/DioneProtocol"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-purple1"
              >
                <span className="sr-only">Telegram</span>
                <FaTelegram className="size-10" />

              </a>
            </li>
            <li>
              <a
                href="https://x.com/intent/follow?screen_name=DioneProtocol"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-purple1"
              >
                <span className="sr-only">X</span>
                <svg className="size-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.641 5H19.095L13.735 10.93L20.041 19H15.103L11.236 14.106L6.81102 19H4.35602L10.09 12.657L4.04102 5H9.10302L12.599 9.474L16.641 5Z" fill="currentColor"/>
                </svg>   
              </a>
            </li>
        </ul>
      
        <ul className="flex flex-wrap justify-center gap-2 md:gap-2 lg:mt-0 lg:justify-end lg:gap-2">
            <p className="text-gray-700 transition"> The BD Manager Contacts : </p>
          
          <li>
              <a
                href="https://t.me/Koerms"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-purple1"
              >
                <span className="sr-only">Telegram</span>
                <FaTelegram className="size-7" />

              </a>
            </li>
            <li>
              <a
                href="https://x.com/KermerStefan"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-purple1"
              >
                <span className="sr-only">X</span>
                <svg className="size-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.641 5H19.095L13.735 10.93L20.041 19H15.103L11.236 14.106L6.81102 19H4.35602L10.09 12.657L4.04102 5H9.10302L12.599 9.474L16.641 5Z" fill="currentColor"/>
                </svg>   
              </a>
            </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="flex items-center justify-center pb-4">
    <p className="px-4 mt-8 text-sm text-gray-500 lg:text-right">
      Copyright &copy; 2024. All rights reserved.
    </p>
  </div>
</footer>
  );
};
