"use client";

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { ethers } from "ethers";
import "react-phone-input-2/lib/style.css";
import contractJson from "../Checkout.json";
import { countries } from "countries-list";
import axios from "axios";

const Pricing = () => {
  const [address, setAddress] = useState<string>(""); 
  const [isClient, setIsClient] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(true);
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
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const fixedPaymentAmount = 100;

  const smartContractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
  const contractABI = contractJson.abi;

  useEffect(() => {
    setIsClient(true);
    checkMetaMaskInstallation();
  }, []);

  const checkMetaMaskInstallation = () => {
    const isInstalled = typeof window !== 'undefined' && Boolean(window.ethereum);
    setIsMetaMaskInstalled(isInstalled);
  };

  if (!isClient) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyPromoCode = async () => {
    try {
      if (!promoCode.trim()) {
        setPromoStatus("Please enter a promo code to verify.");
        return;
      }

      // Only check MetaMask when verifying promo code
      if (!window.ethereum) {
        setPromoStatus("MetaMask is required to verify promo codes. Please install it first.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        smartContractAddress as string,
        contractABI,
        signer
      );

      const discount = await contract.promoCodes(promoCode);
      const discountValue = Number(discount);

      if (discountValue > 0) {
        const discountedPayment = (fixedPaymentAmount * (100 - discountValue)) / 100;
        setDiscountedAmount(discountedPayment);
        setPromoStatus(`Promo code is valid! Discount: ${discountValue}%.`);
      } else {
        setDiscountedAmount(null);
        setPromoStatus("Invalid promo code.");
      }
    } catch (error) {
      console.error("Error verifying promo code:", error);
      setPromoStatus("Failed to verify promo code. Please try again.");
    }
  };

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  const handlePayment = async () => {
    try {
      // Check if MetaMask is installed first
      if (!window.ethereum) {
        const installMetaMask = window.confirm(
          "MetaMask is required to make payments. Would you like to install it now?"
        );
        if (installMetaMask) {
          window.open('https://metamask.io/download/', '_blank');
        }
        return;
      }

      // Proceed with payment flow
      await axios.post("https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/payment-success", {
        email: shipmentDetails.email,
        fullName: shipmentDetails.fullName,
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (!accounts || accounts.length === 0) {
        alert("Please connect your wallet to proceed.");
        return;
      }

      setAddress(accounts[0]);
      const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
      
      if (!contractAddress) {
        throw new Error("SMART_CONTRACT_ADDRESS is not defined in the environment variables.");
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.pay("ORDER123", promoCode.trim(), {
        value: ethers.parseUnits(
          discountedAmount?.toString() || fixedPaymentAmount.toString(),
          "wei"
        ),
      });

      await transaction.wait();

      const userData = {
        walletAddress: accounts[0],
        shipmentDetails,
        shipmentStatus: "Not Shipped",
        transactionHash: transaction.hash,
      };

      await axios.post("https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/users", userData);

      setTransactionHash(transaction.hash);
      setPaymentSuccess(true);
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <section id="target" className="bg-black mt-20 text-gray-200">
      <div className="w-full mx-auto sm:px-6 sm:py-15">
        {!paymentSuccess ? (
          <>
            <div className="mx-auto mt-20 max-w-xl flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl mt-5 pt-5 font-bold sm:text-4xl text-gray-200">
                Please fill this form Carefully!
              </h2>
            </div>
            <form className="mx-auto max-w-2xl sm:mt-20 rounded-lg shadow-lg text-gray-200">
              <div className="w-full">
                <label className="block text-sm/6 font-semibold text-gray-300">
                  Full Name
                </label>
                <div className="mt-2.5">
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={shipmentDetails.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    required
                    type="email"
                    name="email"
                    value={shipmentDetails.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Country
                  </label>
                  <select
                    required
                    name="country"
                    value={shipmentDetails.country}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-400 focus:outline-none"
                  >
                    <option value=""></option>
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={shipmentDetails.city}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Address Line 1
                  </label>
                  <input
                    required
                    type="text"
                    name="addressLine1"
                    value={shipmentDetails.addressLine1}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none"
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
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    ZIP Code
                  </label>
                  <input
                    required
                    type="text"
                    name="zipCode"
                    value={shipmentDetails.zipCode}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-white/5 rounded-lg focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={shipmentDetails.country.toLowerCase() || "us"}
                    value={shipmentDetails.phoneNumber}
                    onChange={(value, countryData) => {
                      if (countryData && "countryCode" in countryData) {
                        setShipmentDetails((prev) => ({
                          ...prev,
                          phoneNumber: value,
                          country: countryData.countryCode.toUpperCase(),
                        }));
                      }
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "42px",
                      backgroundColor: "#0a0a0a",
                      color: "#f0f0f0",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      paddingLeft: "65px",
                      fontSize: "16px",
                      marginTop: "1px"
                    }}
                    containerStyle={{
                      margin: "2px",
                      padding: "2px",
                      width: "100%",
                      position: "relative",
                    }}
                    buttonStyle={{
                      backgroundColor: "transparent",
                      border: "none",
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "24px",
                      width: "24px",
                      pointerEvents: "none",
                    }}
                    dropdownStyle={{
                      backgroundColor: "#0a0a0a",
                      color: "#f0f0f0",
                      border: "1px solid #333333",
                      borderRadius: "6px",
                      zIndex: 1000,
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                  Promo Code (Optional)
                </label>
                <div className="flex gap-x-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="min-w-0 flex-auto mt-1 p-2 rounded-md border border-gray-700 bg-white/5 rounded-l-lg focus:border-purple-400 focus:outline-none"
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
                  <p
                    className={`mt-2 ${
                      promoStatus.includes("valid")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
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
              <div className="flex items-center justify-center mt-5">
                <a href="/TermsOfService_ORION.pdf" className="inline-flex gap-3 py-1 px-2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">Terms Of Service</span>
                </a>
              </div>
              <button
                type="button"
                onClick={handlePayment}
                className="w-full mt-7 p-[3px] relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
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