"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import contractJson from "../Checkout.json";
import axios from "axios";
import { countries } from "countries-list";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
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
  const [owner, setOwner] = useState<string>("");
  const smartContract = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
  if (!smartContract) {
    throw new Error("SMART_CONTRACT_ADDRESS is not defined in the environment variables.");
  }  
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
  //const smartContract = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS; // Replace with your contract address
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
      const contract = new ethers.Contract(
        smartContract,
        contractABI,
        signer
      );

      // Check the discount for the provided promo code
      try {
        const codes = await contract.getAllPromoCodes();

        // Ensure the data is properly formatted into a plain array
        const formattedCodes = codes.map((code: { toString: () => any; }) => code.toString());
        console.log("Promo Codes:", formattedCodes);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      }
    } catch (error) {
      console.error("Error verifying promo code:", error);
      setPromoStatus("Failed to verify promo code. Please try again.");
    }
  };

  addPromoCode();

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
      const contract = new ethers.Contract(
        smartContract,
        contractABI,
        signer
      );

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
      await axios.post("http://localhost:5005/api/payment-success", {
        email: shipmentDetails.email,
        fullName: shipmentDetails.fullName,
      });
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
      const contract = new ethers.Contract(
        smartContract,
        contractABI,
        signer
      );

      // Call payment function
      const transaction = await contract.pay("ORDER123", promoCode.trim(), {
        value: ethers.parseUnits(
          discountedAmount?.toString() || fixedPaymentAmount.toString(),
          "wei"
        ),
      });

      await transaction.wait(); // Wait for the transaction to be mined

      // Save user data to MongoDB
      const userData = {
        walletAddress: accounts[0],
        shipmentDetails,
        shipmentStatus: "Not Shipped",
        transactionHash: transaction.hash,
      };

      await axios.post("http://localhost:5005/api/users", userData);

      setTransactionHash(transaction.hash);
      setPaymentSuccess(true);
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Handle Form Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  return (
    <section className="bg-black mt-20 text-gray-200">
      <div className="w-full mx-auto sm:px-6 sm:py-15">

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
            <div className="mx-auto mt-20 max-w-xl flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl mt-5 font-bold sm:text-4xl text-gray-200">Payment Confirmation for ORION Beta Access</h2>
              <p className="mt-7 text-lg/8 text-gray-500">  Confirm your spot in the ORION Beta Testing Program by completing your payment. Secure your exclusive device and join us in shaping the future of renewable innovation. Thank you for being part of this journey!
              </p>
            </div>
            <form className="mx-auto max-w-2xl sm:mt-20  p-6 rounded-lg shadow-lg text-gray-200">
              <div className="w-full">
                <label className="block text-sm/6 font-semibold text-gray-300 ">
                  Full Name
                </label>
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
                <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                  Email
                </label>
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
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    Country
                  </label>
                  <select
                    name="country"
                    value={shipmentDetails.country}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select Country</option>
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
                  <label className="block mt-3 text-sm/6 font-semibold text-gray-300">
                    ZIP Code
                  </label>
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
  <PhoneInput
  country={shipmentDetails.country.toLowerCase() || "us"} // Sync with country dropdown
  value={shipmentDetails.phoneNumber}
  onChange={(value, countryData) => {
    if (countryData && "countryCode" in countryData) {
      setShipmentDetails((prev) => ({
        ...prev,
        phoneNumber: value,
        country: countryData.countryCode.toUpperCase(), // Sync with phone input
      }));
    }
  }}
  inputStyle={{
    width: "100%",
    height: "42px", // Match height with other input fields
    backgroundColor: "#0a0a0a", // Match background
    color: "#f0f0f0", // Match text color
    border: "1px solid #333333", // Match border style
    borderRadius: "6px", // Match rounded corners
    paddingLeft: "65px", // Ensure padding for flag dropdown
    fontSize: "16px", // Match font size
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)", // Subtle shadow for a polished look
  }}
  containerStyle={{
    width: "100%",
    position: "relative", // For better control of flag position
  }}
  buttonStyle={{
    backgroundColor: "transparent", // Transparent to blend with input
    border: "none", // Remove default border
    position: "absolute", // Position it over input
    left: "10px", // Align flag within the input
    top: "50%", // Center vertically
    transform: "translateY(-50%)", // Center vertically
    height: "24px", // Adjust flag size
    width: "24px", // Adjust flag size
    pointerEvents: "none", // Prevent flag from being clickable
  }}
  dropdownStyle={{
    backgroundColor: "#0a0a0a", // Match dropdown with background
    color: "#f0f0f0", // Match text color
    border: "1px solid #333333", // Match dropdown border
    borderRadius: "6px", // Match rounded corners
    zIndex: 1000, // Ensure it appears above other elements
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
        )
        }

      </div>
    </section>
  );
};

export default Pricing;
