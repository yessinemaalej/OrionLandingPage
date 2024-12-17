import { ethers } from 'ethers';
import { getContract } from './web3';
import type { PromoCodeVerificationResult } from '../types/payment';

export const verifyPromoCodeWithContract = async (
  promoCode: string,
  contractAddress: string,
  contractABI: any,
  baseAmount: number
): Promise<PromoCodeVerificationResult> => {
  try {
    const contract = await getContract(contractAddress, contractABI);
    
    // Get promo code discount
    const discount = await contract.promoCodes(promoCode);
    const discountValue = Number(discount);

    if (discountValue > 0) {
      const discountedAmount = (baseAmount * (100 - discountValue)) / 100;
      
      return {
        isValid: true,
        message: `Promo code is valid! Discount: ${discountValue}%`,
        discountPercentage: discountValue,
        discountedAmount: discountedAmount,
      };
    }

    return {
      isValid: false,
      message: 'Invalid promo code.',
      discountPercentage: null,
      discountedAmount: null,
    };
  } catch (error) {
    console.error('Error verifying promo code:', error);
    throw new Error('Failed to verify promo code');
  }
};