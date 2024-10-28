"use client";

import PlusIcon from  "@/assets/icons/plus.svg"
import MinusIcon from "@/assets/icons/minus.svg";
import clsx from "clsx";
import React from "react";
import { useState } from "react";

const items = [
  {
    question: "Who is leading the Orion project?",
    answer:
      "The Orion project is spearheaded by a team of blockchain experts, renewable energy specialists, and seasoned executives from the technology and finance sectors.",
  },
  {
    question: "Why is Starlink used for Orion?",
    answer:
      "Starlink provides high-speed, low-latency satellite internet, essential for maintaining reliable connectivity in remote areas where traditional internet is unavailable. This choice supports Orion's goal of true decentralization and off-grid operation.",
  },
  {
    question: "Can Orion be used with other internet providers?",
    answer:
      "While technically possible, using Orion with regular internet providers may compromise reliability and security. Starlink’s satellite system is integral to Orion’s decentralized and resilient design.",
  },
  {
    question: "When will Orion go live?",
    answer:
      "The mainnet launch is planned for December 2024. Beta access will be available beforehand for testing and feedback.",
  },
  {
    question: "How does Orion’s off-grid capability contribute to decentralization?",
    answer:
      "Orion’s off-grid operation reduces dependence on centralized power sources, enhancing network resilience and sustainability. This setup ensures uninterrupted blockchain validation even during grid failures.",
  },
  {
    question: "Can Orion be used in areas with limited grid access?",
    answer:
      " Yes, Orion’s solar power and battery storage systems make it ideal for remote locations with limited or no grid access.",
  },
  {
    question: "What are the security benefits of Orion’s off-grid operation?",
    answer:
      "By operating off-grid, Orion eliminates risks from centralized power disruptions and enhances overall network security. The use of renewable energy also supports eco-friendly practices.",
  },
  {
    question: "How does Orion’s off-grid system work?",
    answer:
      "Orion uses solar panels to generate energy, which is stored in batteries for continuous power supply. This system allows Orion to function independently of the grid.",
  },
  {
    question: "Why is it important for Orion to be off-grid?",
    answer:
      "Being off-grid ensures that Orion remains operational during power outages and reduces reliance on centralized energy sources, enhancing both reliability and decentralization.",
  },
  {
    question: "What is the purpose of Orion’s beta testing phase?",
    answer:
      "The beta testing phase allows early adopters to test Orion and provide feedback before the official launch. This helps refine the system and ensure a smooth mainnet launch.",
  },
  {
    question: "What incentives are offered to early adopters?",
    answer:
      "Early adopters receive exclusive beta access and can benefit from a rewards program, which includes discounted services and other incentives for feedback during the beta phase.",
  },
  {
    question: "How can I sign up as an early adopter?",
    answer:
      "Fill out the sign-up form with your name, email, motivation for joining, and experience level.",
  },
  {
    question: "What components will be available after the network goes live?",
    answer:
      "Validators can use the components outlined in the network documentation post-launch, following their own research and testing. ",
  },{
    question: "Is Orion easy to set up?",
    answer:
      "Orion is designed for ease of setup, but some technical expertise is required. Users should be comfortable with hardware and software configuration.",
  },
];

const AccordionItem = ({question,answer} : {question: string; answer: string;}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return(
    <div className=" py-7 border-b border-white/30" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon className="text-purple1" /> : <PlusIcon className="text-purple1" />}
      </div>
      <div className={clsx("mt-4", {
        hidden: !isOpen,
        "": isOpen === true,
      })}>{answer}
      </div>
    </div>

  )

}

 const FAQs = () => {
  return (
    <div className="bg-black text-gray-300 bg-gradient-to-b py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center text-3xl sm:text-5xl sm:max-w-[648] mx-auto font-bold tracking-tighter">Frequently Asked Questions</h2>
        <div className="mt-12 max-w-[648px] mx-auto">
          {items.map(({question,answer}) => (
            <AccordionItem question={question} answer={answer} key={question}/>
          ))}
        </div>

      </div>
    </div>
  );
};
export default FAQs;
