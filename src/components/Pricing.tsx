'use client'
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { countries } from "countries-list";
import Checkbox from "@mui/material/Checkbox";
import { useWeb3Connection } from '../hooks/useWeb3Connection';
import { usePayment } from '../hooks/usePayment';
import { Web3Modal } from './Web3Modal';
import { PaymentSuccess } from './PaymentSuccess';
import contractJson from "../Checkout.json";
import { ethers } from "ethers";
import { usePromoCode } from "@/hooks/usePromoCode";
import { PromoCodeInput } from "./PromoCodeInput";

const Pricing = () => {
  const {
    connectWallet,
    isConnecting,
    modalType,
    setModalType,
    handleInstallMetaMask
  } = useWeb3Connection();

  

  const smartContractAddress = "0xB595dcB9fc64105038230Df2695fED59A51B2735";
  const contractABI = contractJson.abi;
  if(!smartContractAddress){
    return null
  }
  const { 
    isProcessing, 
    transactionHash, 
    paymentSuccess, 
    paymentError, 
    processPayment 
  } = usePayment(contractJson, smartContractAddress);


  

  const [shipmentDetails, setShipmentDetails] = useState({
    orderId: "",
    fullName: "",
    email: "",
    country: "",
    city: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
  });


  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const fixedPaymentAmount = 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShipmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalAction = () => {
    switch (modalType) {
      case 'install':
        handleInstallMetaMask();
        break;
      case 'network':
      case 'connect':
        connectWallet();
        break;
      case 'insufficient_funds':
        setModalType(null);
        break;
    }
  };



  const { 
    promoCode,
    setPromoCode,
    promoStatus,
    isVerifying,
    verifyPromoCode,
    resetPromoCode,
  } = usePromoCode( smartContractAddress, contractJson.abi, fixedPaymentAmount);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    try {
      const account = await connectWallet();
      if (!account) return;

      const paymentAmount = promoStatus.isValid && promoStatus.discountedAmount !== null
      ? promoStatus.discountedAmount
      : fixedPaymentAmount;      const success = await processPayment(
        account,
        shipmentDetails,
        promoCode,
        paymentAmount
      );
      
      if (!success && paymentError === 'INSUFFICIENT_FUNDS') {
        setModalType('insufficient_funds');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (paymentSuccess && transactionHash) {
    return <PaymentSuccess transactionHash={transactionHash} />;
  }

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  return (
    <section id="target" className="bg-black mt-20 text-gray-200">
      <div className="w-full mx-auto sm:px-6 sm:py-15">
        <div className="mx-auto mt-20 max-w-xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl mt-5 pt-5 font-bold sm:text-4xl text-gray-200">
            Please fill this form Carefully!
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl sm:mt-20 rounded-lg shadow-lg text-gray-200"
        >
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
                  marginTop: "1px",
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


            
            <div className="flex gap-x-4">
            <PromoCodeInput
  promoCode={promoCode}
  onPromoCodeChange={setPromoCode}
  onVerify={verifyPromoCode}
  isVerifying={isVerifying}
  status={promoStatus}
/>
              
            </div>



          {discountedAmount !== null && (
            <div>
              <p className="text-sm font-medium text-green-400">
                Your discounted payment amount: {discountedAmount} DIONE
              </p>
            </div>
          )}

          <div className="flex items-center justify-center mt-5">
            <Checkbox
              required
              defaultChecked={false}
              color="secondary"
              sx={{
                "& .MuiSvgIcon-root": {
                  backgroundColor: "#0D0D0D",
                  borderRadius: "4px",
                  border: "1px solid #374151",
                },
              }}
            />
            <a
              href="/TermsOfService_ORION.pdf"
              className="inline-flex gap-3 py-1 px-2"
            >
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text [-webkit-backgound-clip:text]">
                Agree to terms and conditions
              </span>
            </a>
          </div>

          <button
            type="submit"
            disabled={isProcessing || isConnecting}
            className="w-full mt-7 p-[3px] relative disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              {isProcessing ? "Processing Payment..." : "Proceed with Payment"}
            </div>
          </button>
        </form>

        <Web3Modal
          isOpen={modalType !== null}
          onClose={() => setModalType(null)}
          type={modalType || 'connect'}
          isLoading={isConnecting}
          onAction={handleModalAction}
        />
      </div>
    </section>
  );
};

export default Pricing;