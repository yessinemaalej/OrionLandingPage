"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import contractJson from "../../smart-contracts/artifacts/contracts/Checkout.sol/Checkout.json";
import axios from "axios";

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
  const contractAddress = "0xBc1CD3b1055aC850C5AB6c9b38D4CA10a713ba77"; // Replace with your contract address
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
        value: ethers.parseUnits(discountedAmount?.toString() || fixedPaymentAmount.toString(), "wei"),
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
      /*await axios.post("http://localhost:5005/api/payment-success", {
        email: shipmentDetails.email,
        fullName: shipmentDetails.fullName,
      });*/
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
            <div className="text-center">
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
            </div>

            {/* Verification Form */}
            <form className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shipmentDetails.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={shipmentDetails.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Your email address"
                />
              </div>

              {/* Shipment Address Details */}
              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shipmentDetails.country}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={shipmentDetails.city}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shipmentDetails.zipCode}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="ZIP Code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={shipmentDetails.addressLine1}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Address Line 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={shipmentDetails.addressLine2}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Address Line 2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={shipmentDetails.phoneNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="Phone Number"
                />
              </div>
              <div>
            <label className="block text-sm font-medium">Promo Code (Optional)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-700 bg-black rounded-l-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter your promo code"
              />
              <button
                type="button"
                onClick={verifyPromoCode}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
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
                className="w-full py-2 mt-4 font-semibold text-black bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none"
              >
                Proceed with Payment
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
