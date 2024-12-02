"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import contractJson from "../../smart-contracts/artifacts/contracts/Checkout.sol/Checkout.json";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Pricing = () => {
  const [address, setAddress] = useState<string>(""); // User's wallet address
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // Transaction hash
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false); // Payment success status
  const [promoCode, setPromoCode] = useState<string>(""); // Promo code
  const [promoStatus, setPromoStatus] = useState<string | null>(null); // Promo code verification status
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null); // Discounted payment amount
  const fixedPaymentAmount = 100; // Fixed payment amount in DIONE (for simplicity)

  const [shipmentDetails, setShipmentDetails] = useState({
    fullName: "",
    email: "",
    country: "",
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
  });

  // Smart Contract Information
  const contractAddress = "0xAb8776314BC70952E45A2E1a24418AadA6FF9138"; // Replace with your contract address
  const contractABI = contractJson.abi;
  
  const addPromoCode = async () => {
    try {

      // Check wallet connection
      if (!window.ethereum) {
        setPromoStatus("MetaMask is not installed.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Check the discount for the provided promo code
      try {
        const codes = await contract.getAllPromoCodes();

        // Ensure the data is properly formatted into a plain array
        const formattedCodes = codes.map((code) => code.toString());
        console.log("Promo Codes:", formattedCodes);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      }
    } catch (error) {
      console.error("Error verifying promo code:", error);
      setPromoStatus("Failed to verify promo code. Please try again.");
    }
  };

  addPromoCode()

  const verifyPromoCode = async () => {
    try {
      if (!promoCode.trim()) {
        setPromoStatus("Please enter a promo code to verify.");
        return;
      }
  
      // Check wallet connection
      if (!window.ethereum) {
        setPromoStatus("MetaMask is not installed.");
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Check the discount for the provided promo code
      const discount = await contract.promoCodes(promoCode);
  
      console.log(promoCode);
      console.log(discount.toString()); // Ensure `discount` is converted to a string for logging
  
      // Convert `discount` from BigInt to a number for calculations
      const discountValue = Number(discount);
  
      if (discountValue > 0) {
        const discountedPayment =
          (fixedPaymentAmount * (100 - discountValue)) / 100;
        setDiscountedAmount(discountedPayment);
        setPromoStatus(`Promo code is valid! Discount: ${discountValue}%.`);
      } else {
        setDiscountedAmount(null);
        setPromoStatus("promo code doesn't work.");
      }
    } catch (error) {
      console.error("Error verifying promo code:", error);
      setPromoStatus("Failed to verify promo code. Please try again.");
    }
  };
  // Handle Payment
  const handlePayment = async () => {
    try {
      // Check wallet connection
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install it to proceed.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet to proceed.");
        return;
      }

      setAddress(accounts[0]); // Set the user's wallet address

      // Connect to the smart contract
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call payment function
      const transaction = await contract.pay("ORDER123", promoCode.trim(), {
        value: ethers.parseUnits(discountedAmount?.toString() || fixedPaymentAmount.toString(), "DIONE"),
      });

      await transaction.wait(); // Wait for the transaction to be mined

      setTransactionHash(transaction.hash);
      setPaymentSuccess(true);
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Handle Form Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-black min-h-screen text-gray-200 flex items-center justify-center">
      <div className="max-w-screen-md mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {!paymentSuccess ? (
          <>
            {/* <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl text-gray-200">
                Pre-Payment
              </h2>
              <p className="text-gray-400 py-4">
                To streamline your involvement, choose our pre-payment option
                to:
                <br />
                <span className="font-bold">Secure Your Spot:</span> Ensure your
                participation with early access and benefits.
                <br />
                <span className="font-bold">Customize Your Payment:</span>{" "}
                Select between paying with DIONE tokens or a different payment
                method based on your preference.
              </p>
            </div> */}

            {/* Verification Form */}
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl text-gray-200">Payment Confirmation for ORION Beta Access</h2>
              <p className="mt-7 text-lg/8 text-gray-500">As part of the ORION Beta Testing Program, <br/>
                                                    this section facilitates your payment confirmation for your assigned batch.
                                                    Please proceed with your payment securing your exclusive spot and ensuring the Orion sent out to you.
                                                    We appreciate your commitment and look forward to your valuable insights as we refine and enhance the ORION experience together!</p>
            </div>
            <form className="mx-auto max-w-2xl sm:mt-20  p-6 rounded-lg shadow-lg text-gray-200">
                <div className="w-full">
                  <label className="block text-sm/6 font-semibold text-gray-300 ">Full Name</label>
                  <div className="mt-2.5">
                    <input
                    type="text"
                    name="fullName"
                    value={shipmentDetails.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg  focus:border-purple-500 focus:outline-none text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">Email</label>
                  <div className="mt-2.5">
                    <input
                    type="email"
                    name="email"
                    value={shipmentDetails.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none text-gray-400"
                  />
                  </div>
                </div>

                {/* Shipment Address Details */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label className="block mt-3 text-sm/6 font-semibold text-gray-300">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shipmentDetails.country}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shipmentDetails.city}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={shipmentDetails.addressLine1}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  </div>
                  <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={shipmentDetails.addressLine2}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shipmentDetails.zipCode}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  </div>
                  <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={shipmentDetails.phoneNumber}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  </div>
                </div>

                
                <div>
                <label className="block mt-3 text-sm/6 font-semibold text-gray-300">Promo Code (Optional)</label>
                <div className="flex gap-x-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="min-w-0 flex-auto mt-1 p-2 rounded-md border border-gray-700 bg-white/5 rounded-l-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Enter your promo code"
                  />
                  <button
                    type="button"
                    onClick={verifyPromoCode}
                    className="flex-none rounded-md bg-indigo-500 px-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500e"
                  >
                    Verify
                  </button>
                </div>

              

              {promoStatus && (
                <p className={`mt-2 ${promoStatus.includes("valid") ? "text-green-400" : "text-red-400"}`}>
                  {promoStatus}
                </p>
              )}
            </div>

            {discountedAmount !== null && (
              <div>
                <p className="text-sm font-medium text-green-400">
                  Your discounted payment amount: {discountedAmount} DIONE
                </p>
              </div>
            )}
                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full mt-7 p-[3px] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Proceed with Payment
                  </div>
                </button>
            </form>
            
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-green-400">
              Payment Successful!
            </h2>
            <p className="mt-4 text-gray-400">
              Your transaction was successful. Your Orion is on its way!
            </p>
            <p className="mt-2 text-gray-400">
              For further information, please contact us at:{" "}
              <a
                href="mailto:orion@dioneprotocol.com"
                className="text-purple-500 underline"
              >
                orion@dioneprotocol.com
              </a>
            </p>
            <p className="mt-4 text-gray-300">
              <span className="font-bold">Transaction Hash:</span>
              <br />
              <span className="text-purple-500 break-all">
                {transactionHash}
              </span>
            </p>
            <p className="mt-4 text-gray-300">
              <a
                href={`https://testnet.odysseyscan.com/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 underline"
              >
                View on Blockchain Explorer
              </a>
            </p>
          </div>
        )}
      </div>
      
    </section>
    
  );
};

export default Pricing;
