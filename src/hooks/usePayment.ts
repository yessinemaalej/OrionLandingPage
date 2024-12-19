import { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { getContract, checkWalletBalance } from '../utils/web3';
import { verifyPromoCodeWithContract } from '../utils/promoCode';
import type { ShipmentDetails, PaymentError } from '../types/payment';

export const usePayment = (contractJson: any, smartContractAddress: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<PaymentError>(null);

  const processPayment = async (
    account: string,
    shipmentDetails: ShipmentDetails,
    promoCode: string,
    baseAmount: number
  ) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
    const contract = await getContract(smartContractAddress, contractJson.abi);
      const f = await contract.fixedPaymentAmount();
      let finalAmount = Number(f.toString());
      // Verify promo code if provided
      if (promoCode.trim()) {
        const promoResult = await verifyPromoCodeWithContract(
          promoCode,
          smartContractAddress,
          contractJson.abi,
          baseAmount
        );

        if (promoResult.isValid && promoResult.discountedAmount !== null) {
          finalAmount = Number(ethers.parseUnits(promoResult.discountedAmount.toString()));
        }

      }

      // Check wallet balance
      //const hasEnoughFunds = await checkWalletBalance(finalAmount);
      /*if (!hasEnoughFunds) {
        setPaymentError('INSUFFICIENT_FUNDS');
        return false;
      }*/

      
      const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

      const transaction = await contract.pay(orderId, promoCode.trim(), {
        value: (finalAmount.toString()),
      });

      await transaction.wait();

      const userData = {
        walletAddress: account,
        shipmentDetails: { ...shipmentDetails, orderId },
        shipmentStatus: "Not Shipped",
        transactionHash: transaction.hash,
      };
      console.log(userData)

      await axios.post("https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/payment-success", {
        email: shipmentDetails.email,
        fullName: shipmentDetails.fullName,
      });

      await axios.post("https://evening-crag-08562-ae65e95d4573.herokuapp.com/api/users", userData);

      setTransactionHash(transaction.hash);
      setPaymentSuccess(true);
      return true;
    } catch (error) {
      console.error('Payment processing failed:', error);
      setPaymentError('TRANSACTION_FAILED');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    transactionHash,
    paymentSuccess,
    paymentError,
    processPayment,
  };
};