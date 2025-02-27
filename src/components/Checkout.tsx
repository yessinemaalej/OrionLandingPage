
"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import ArrowIcon from "@/assets/icons/arrow-w.svg"
import { getContract, checkWalletBalance } from '../utils/web3';
import contractJson from "../Checkout.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

 
export function Checkout() {
  const [amount, setAmount] = useState<bigint | null>(null);  
  const smartContractAddress = "0x85b7800448c7133d403734D6CB9C629BAd3aAEdf";
const contractABI = contractJson.abi;

  async function getAmountToPay(){
    const contract = await getContract(smartContractAddress, contractJson.abi);
    const a = await contract.fixedPaymentAmount();  
    console.log(a)
    setAmount(BigInt(ethers.parseEther(ethers.formatEther(a.toString()))));
    console.log(ethers.formatEther(a.toString()))
  }

  

  return (
   
    <div className="h-auto w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <h1 className="mt-20 mb-5 text-3xl font-bold sm:text-4xl text-center text-gray-200">
        GET YOUR ORION NOW!
        </h1>
        <div className="w-[40rem] h-20 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
    
            {/* Core component */}
            <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
            />
    
            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        <div className="text-center">
        <p className="mt-7 text-lg/8 text-gray-500">  Confirm your spot in the ORION Beta Testing Program by completing your payment.
        <br/> Secure your exclusive device and join us in shaping the future of renewable innovation. 
        <br/>Thank you for being part of this journey!
</p>
        </div>
        <button className="mt-10 p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
               <a href="#target"> Payment Confirmation for ORION Beta Access
               </a>

            </div>
            
        </button>
        <button className="mt-10 p-[3px] relative" onClick={getAmountToPay}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            
           Amount to pay: 1200 USDC equivalent in DIONE Token


            </div>
            
        </button>
    </div>
    
  );
}
