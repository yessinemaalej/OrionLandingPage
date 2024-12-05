"use client"

import Image from "next/image";
import acmeLogo from "../assets/images/acme.png";
import quantumLogo from "../assets/images/quantum.png";
import echoLogo from "../assets/images/echo.png";
import celestialLogo from "../assets/images/celestial.png";
import pulseLogo from "../assets/images/pulse.png";
import apexLogo from "../assets/images/apex.png";
import { section } from "framer-motion/client";
import {motion} from "framer-motion";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: pulseLogo, alt: "Pulse Logo" },
  { src: apexLogo, alt: "Apex Logo" },
];

export const LogoTicker = () => {
  return (
    <section className="py-20 md:py-24 bg-black">
      <div className="container text-gray-200">
        <div className="flex items-center gap-5">
          <div className="flex-1 md:flex-none md:ml-10">
            <h2 className="text-xl font-bold">Trusted by top innovative teams :</h2>
          </div>
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div 
            initial={{translateX:"-50%"}}
            animate={{translateX:"0"}}
            transition={{
              repeat:Infinity,
              duration:30,
              ease:"linear",
            }}
            className="flex flex-none gap-14 pr-14 -translate-x-1/2">
            {[
            acmeLogo,
            pulseLogo, 
            echoLogo, 
            celestialLogo, 
            apexLogo, 
            quantumLogo,
            acmeLogo,
            pulseLogo, 
            echoLogo, 
            celestialLogo, 
            apexLogo, 
            quantumLogo
            ].map((logo) => (
              <Image 
                  src={logo} 
                  alt="Logo"
                  key={logo.src}
                  className="h-6 w-auto"/>
            ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
};
