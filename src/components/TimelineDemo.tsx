import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
 
export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <h1 className="text-neutral-400 dark:text-neutral-200 text-3xl mb-4">
          Post-Launch Activities
          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜  Continuous product enhancements based on feedback.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ Partnerships with energy providers and blockchain networks.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜  Community engagement through webinars and support channels.
            </div>
          </div>
        </div>

      ),
    },
    
    {
      title: "2024",
      content: (
        <div>
          <h1 className="text-neutral-400 dark:text-neutral-200 text-3xl mb-4">
          ORION Cross-Chain Product
          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜  ORION cross-chain product development.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ Beta testing with select early adopters.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜  ORION cross-chain product launch.
            </div>
                <div className="ml-6 mb-8 flex flex-col gap-4">
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ Final Assembly & Quality Checks.
                  </div>
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ Coordination of Shipment Logistics.
                  </div>
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ Installation & Setup Tracking.
                  </div>
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ User Documentation & Technical Specifications
                  </div>
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ Final Testing & QA.
                  </div>
                  <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
                  ⬜ Certification & Compliance Checks.
                  </div>
                </div>
          </div>
        </div>

      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <h1 className="text-neutral-400 dark:text-neutral-200 text-3xl mb-4">
          ORION Remote Product

          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ ORION Remote product release.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ Onboarding process for early adopters with tutorials and setup guides.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ Remote monitoring features deployment
            </div>
          </div>
        </div>

      ),
    },

    {
      title: "June/July 2024",
      content: (
        <div>
          <h1 className="text-neutral-400 dark:text-neutral-200 text-3xl mb-4">
          General ORION Launch
          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ ORION hardware-software integration finalized.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-xl md:text-xl">
            ⬜ Early adopter engagement through targeted campaigns and pre-launch briefings.
            </div>
          </div>

          <h1 className="text-neutral-400 dark:text-neutral-200 text-2xl mb-4">
          Hardware Development
          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅ Circuit Design & PCB Printing.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅  Cooling System Design.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅   Case Design & 3D Printing.
            </div>
          </div>

          <h1 className="text-neutral-400 dark:text-neutral-200 text-2xl mb-4">
          Software Development
          </h1>
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅ AI Script Development.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅  API Integration (Location & Weather).
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅   Dashboard Interface Design.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅   Validator Node & Smart Contract Programming.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ✅   Communication Protocol Implementation.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ⬜ Beta Prototype Testing.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ⬜ System Assembly & Integration.
            </div>
            <div className="flex gap-2 items-center text-neutral-400 dark:text-neutral-300 text-md md:text-md">
            ⬜ Preliminary Field Tests.
            </div>

          </div>
        </div>

        
      ),
    },
  
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}